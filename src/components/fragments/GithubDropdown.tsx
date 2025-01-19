import { For } from "solid-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../elements/dropdown-menu";
import { GithubButton } from "./GithubButton";

export const GithubDropdown = () => {
  const repos: RepoItemProps[] = [
    { user: "arsmoriendy", repo: "gruvbox-cheatsheet" },
    { user: "morhetz", repo: "gruvbox" },
  ];

  return (
    <DropdownMenu placement="bottom-end">
      <DropdownMenuTrigger as={GithubButton} />
      <DropdownMenuContent class="bg-background/85 backdrop-blur">
        <DropdownMenuLabel>Github Repositories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <For each={repos}>{(props) => <RepoItem {...props} />}</For>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

type RepoItemProps = {
  user: string;
  repo: string;
};

const RepoItem = ({ user, repo }: RepoItemProps) => {
  const repoPath = `${user}/${repo}`;

  return (
    <DropdownMenuItem
      as="a"
      class="cursor-pointer"
      href={`https://github.com/${repoPath}`}
    >
      <span class="font-mono">{repoPath}</span>
    </DropdownMenuItem>
  );
};
