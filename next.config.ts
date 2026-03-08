import type { NextConfig } from "next";

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const repository = process.env.GITHUB_REPOSITORY ?? "";
const repositoryOwner = process.env.GITHUB_REPOSITORY_OWNER ?? "";
const repoName = repository.split("/")[1] ?? "";
const isUserOrOrgPagesRepo =
  repoName.length > 0 &&
  repositoryOwner.length > 0 &&
  repoName.toLowerCase() === `${repositoryOwner}.github.io`.toLowerCase();
const hasCustomDomain = process.env.GH_PAGES_CUSTOM_DOMAIN === "true";
const useRepoBasePath =
  isGitHubActions &&
  repoName.length > 0 &&
  !isUserOrOrgPagesRepo &&
  !hasCustomDomain;
const basePath = useRepoBasePath ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
