export type Job = {
  id: string;
  title: string;
  location: string;
  type: string;
  summary: string;
  active: boolean;
  public: boolean;
  href: string;
};

export const jobs: Job[] = [];
