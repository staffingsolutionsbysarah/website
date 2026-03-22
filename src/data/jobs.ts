export type Job = {
  id: string;
  title: string;
  salary?: string;
  location: string;
  type: string;
  summary: string;
  active: boolean | string;
  public: boolean | string;
  href: string;
};

export const jobs: Job[] = [];
