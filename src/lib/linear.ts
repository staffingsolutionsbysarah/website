export type LinearIssueState = 'backlog' | 'unstarted' | 'started' | 'cancelled' | 'completed';

export type LinearTaskStatus = 
  | 'new'
  | 'screening'
  | 'interviewing'
  | 'hired'
  | 'archived';

export interface LinearUser {
  id: string;
  name: string;
  email: string;
}

export interface LinearIssueStateResponse {
  name: LinearIssueState;
}

export interface LinearIssueAssigneeResponse {
  id: string;
}

export interface LinearIssueResponse {
  id: string;
  identifier: string;
  title: string;
  description: string | null;
  state: LinearIssueStateResponse;
  assignee: LinearIssueAssigneeResponse | null;
  createdAt: string;
  updatedAt: string;
}

export interface LinearIssue {
  id: string;
  identifier: string;
  title: string;
  description?: string;
  state: LinearIssueState;
  status: LinearTaskStatus;
  assigneeId?: string;
  candidateId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LinearCandidate {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  linkedIssueId?: string;
}

export interface LinearTeam {
  id: string;
  key: string;
  name: string;
}

export interface LinearCreateIssueInput {
  title: string;
  description?: string;
  status?: LinearTaskStatus;
  assigneeId?: string;
  candidateId?: string;
}

export interface LinearUpdateIssueInput {
  title?: string;
  description?: string;
  status?: LinearTaskStatus;
  assigneeId?: string | null;
}

interface LinearAPIResponse<T> {
  data?: T;
  errors?: { message: string }[];
}

const STATUS_TO_STATE: Record<LinearTaskStatus, LinearIssueState> = {
  new: 'backlog',
  screening: 'unstarted',
  interviewing: 'started',
  hired: 'completed',
  archived: 'cancelled',
};

const STATUS_LABELS: Record<LinearTaskStatus, string> = {
  new: 'Backlog',
  screening: 'In Review',
  interviewing: 'In Progress',
  hired: 'Done',
  archived: 'Cancelled',
};

function getLinearEnv() {
  const apiKey = process.env.LINEAR_API_KEY;
  const teamId = process.env.LINEAR_TEAM_ID;
  
  if (!apiKey) {
    throw new Error('LINEAR_API_KEY environment variable is required');
  }
  
  if (!teamId) {
    throw new Error('LINEAR_TEAM_ID environment variable is required');
  }
  
  return { apiKey, teamId };
}

async function linearFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const { apiKey } = getLinearEnv();
  
  const response = await fetch('https://api.linear.app/graphql', {
    method: 'POST',
    headers: {
      Authorization: apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
  
  if (!response.ok) {
    throw new Error(`Linear API error: ${response.status} ${response.statusText}`);
  }
  
  const result: LinearAPIResponse<T> = await response.json();
  
  if (result.errors?.length) {
    throw new Error(`Linear GraphQL error: ${result.errors[0].message}`);
  }
  
  if (!result.data) {
    throw new Error('Linear API returned no data');
  }
  
  return result.data;
}

function mapIssueResponse(issue: LinearIssueResponse): LinearIssue {
  const stateToStatus = Object.fromEntries(
    Object.entries(STATUS_TO_STATE).map(([status, state]) => [state, status])
  ) as Record<LinearIssueState, LinearTaskStatus>;
  
  return {
    id: issue.id,
    identifier: issue.identifier,
    title: issue.title,
    description: issue.description || undefined,
    state: issue.state.name,
    status: stateToStatus[issue.state.name] || 'new',
    assigneeId: issue.assignee?.id,
    createdAt: issue.createdAt,
    updatedAt: issue.updatedAt,
  };
}

export async function getTeamMembers(): Promise<LinearUser[]> {
  const { teamId } = getLinearEnv();
  
  const query = `
    query GetTeamMembers($teamId: String!) {
      team(id: $teamId) {
        members {
          nodes {
            id
            name
            email
          }
        }
      }
    }
  `;
  
  const data = await linearFetch<{
    team: { members: { nodes: LinearUser[] } };
  }>(query, { teamId });
  
  return data.team.members.nodes;
}

export async function createIssue(input: LinearCreateIssueInput): Promise<LinearIssue> {
  const { teamId } = getLinearEnv();
  
  const query = `
    mutation CreateIssue($teamId: String!, $input: IssueCreateInput!) {
      issueCreate(input: $input) {
        success
        issue {
          id
          identifier
          title
          description
          state {
            name
          }
          assignee {
            id
          }
          createdAt
          updatedAt
        }
      }
    }
  `;
  
  const state = STATUS_TO_STATE[input.status || 'new'];
  
  const variables = {
    input: {
      teamId,
      title: input.title,
      description: input.description,
      state: { name: state },
      assigneeId: input.assigneeId,
    },
  };
  
  const data = await linearFetch<{
    issueCreate: { success: boolean; issue: LinearIssueResponse };
  }>(query, variables);
  
  if (!data.issueCreate.success) {
    throw new Error('Failed to create Linear issue');
  }
  
  return {
    ...mapIssueResponse(data.issueCreate.issue),
    candidateId: input.candidateId,
  };
}

export async function updateIssue(
  issueId: string,
  input: LinearUpdateIssueInput
): Promise<LinearIssue> {
  const query = `
    mutation UpdateIssue($issueId: String!, $input: IssueUpdateInput!) {
      issueUpdate(id: $issueId, input: $input) {
        success
        issue {
          id
          identifier
          title
          description
          state {
            name
          }
          assignee {
            id
          }
          createdAt
          updatedAt
        }
      }
    }
  `;
  
  const updateInput: Record<string, unknown> = {};
  
  if (input.title !== undefined) {
    updateInput.title = input.title;
  }
  
  if (input.description !== undefined) {
    updateInput.description = input.description;
  }
  
  if (input.status !== undefined) {
    updateInput.state = { name: STATUS_TO_STATE[input.status] };
  }
  
  if (input.assigneeId !== undefined) {
    if (input.assigneeId === null) {
      updateInput.assigneeId = null;
    } else {
      updateInput.assigneeId = input.assigneeId;
    }
  }
  
  const data = await linearFetch<{
    issueUpdate: { success: boolean; issue: LinearIssueResponse };
  }>(query, { issueId, input: updateInput });
  
  if (!data.issueUpdate.success) {
    throw new Error('Failed to update Linear issue');
  }
  
  return mapIssueResponse(data.issueUpdate.issue);
}

export async function getIssue(issueId: string): Promise<LinearIssue | null> {
  const query = `
    query GetIssue($issueId: String!) {
      issue(id: $issueId) {
        id
        identifier
        title
        description
        state {
          name
        }
        assignee {
          id
        }
        createdAt
        updatedAt
      }
    }
  `;
  
  const data = await linearFetch<{
    issue: LinearIssueResponse | null;
  }>(query, { issueId });
  
  if (!data.issue) {
    return null;
  }
  
  return mapIssueResponse(data.issue);
}

export async function listIssues(options?: {
  status?: LinearTaskStatus;
  assigneeId?: string;
  limit?: number;
}): Promise<LinearIssue[]> {
  const query = `
    query ListIssues($filter: IssueFilter, $first: Int) {
      issues(filter: $filter, first: $first) {
        nodes {
          id
          identifier
          title
          description
          state {
            name
          }
          assignee {
            id
          }
          createdAt
          updatedAt
        }
      }
    }
  `;
  
  const filter: Record<string, unknown> = {};
  
  if (options?.assigneeId) {
    filter.assignee = { id: { eq: options.assigneeId } };
  }
  
  const variables = {
    filter,
    first: options?.limit || 50,
  };
  
  const data = await linearFetch<{
    issues: { nodes: LinearIssueResponse[] };
  }>(query, variables);
  
  return data.issues.nodes.map(mapIssueResponse);
}

export async function updateIssueStatus(
  issueId: string,
  status: LinearTaskStatus
): Promise<LinearIssue> {
  return updateIssue(issueId, { status });
}

export async function linkCandidateToIssue(
  issueId: string,
  candidateId: string
): Promise<LinearIssue> {
  const description = `Candidate ID: ${candidateId}`;
  
  const existing = await getIssue(issueId);
  if (!existing) {
    throw new Error(`Issue ${issueId} not found`);
  }
  
  const existingDesc = existing.description || '';
  const hasCandidateId = existingDesc.includes(`Candidate ID: ${candidateId}`);
  
  return updateIssue(issueId, {
    description: hasCandidateId ? existingDesc : `${existingDesc}\n\n${description}`.trim(),
  });
}

export async function createIssueForBooking(bookingData: {
  candidateName: string;
  candidateEmail?: string;
  position: string;
  company?: string;
  notes?: string;
}): Promise<LinearIssue> {
  const description = [
    `**Candidate:** ${bookingData.candidateName}`,
    bookingData.candidateEmail ? `**Email:** ${bookingData.candidateEmail}` : null,
    `**Position:** ${bookingData.position}`,
    bookingData.company ? `**Company:** ${bookingData.company}` : null,
    bookingData.notes ? `**Notes:** ${bookingData.notes}` : null,
  ].filter(Boolean).join('\n');
  
  return createIssue({
    title: `${bookingData.candidateName} - ${bookingData.position}`,
    description,
    status: 'new',
  });
}

export function getStatusLabel(status: LinearTaskStatus): string {
  return STATUS_LABELS[status];
}

export function getNextStatus(currentStatus: LinearTaskStatus): LinearTaskStatus | null {
  const flow: LinearTaskStatus[] = ['new', 'screening', 'interviewing', 'hired', 'archived'];
  const currentIndex = flow.indexOf(currentStatus);
  
  if (currentIndex === -1 || currentIndex >= flow.length - 1) {
    return null;
  }
  
  return flow[currentIndex + 1];
}

// Example usage:
/*
import { 
  createIssue, 
  updateIssueStatus, 
  getTeamMembers, 
  createIssueForBooking,
  linkCandidateToIssue 
} from '@/lib/linear';

// Get available team members for assignment
const members = await getTeamMembers();
// [{ id: 'user_123', name: 'Sarah Fell', email: 'sarah@example.com' }]

// Create a new issue for a booking
const issue = await createIssueForBooking({
  candidateName: 'John Doe',
  candidateEmail: 'john@example.com',
  position: 'Software Engineer',
  company: 'Tech Corp',
  notes: 'Referred by Jane Smith'
});
// { id: 'issue_abc', identifier: 'SF-101', title: 'John Doe - Software Engineer', ... }

// Update issue status through the pipeline
const updated = await updateIssueStatus(issue.id, 'screening');
// Status changed from 'new' to 'screening'

// Continue through pipeline
await updateIssueStatus(issue.id, 'interviewing');
await updateIssueStatus(issue.id, 'hired');

// Link additional candidate info
await linkCandidateToIssue(issue.id, 'candidate_xyz');

// Create custom issue with specific assignee
const customIssue = await createIssue({
  title: 'Urgent: Senior Developer Position',
  description: 'Client needs this filled by end of month',
  status: 'new',
  assigneeId: members[0].id,
  candidateId: 'candidate_789'
});
*/