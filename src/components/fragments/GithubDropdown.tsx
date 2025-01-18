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
  const repos = ["arsmoriendy/gruvbox-cheatsheet", "morhetz/gruvbox"];

  return (
    <DropdownMenu placement="bottom-end">
      <DropdownMenuTrigger as={GithubButton} />
      <DropdownMenuContent class="bg-background/85 backdrop-blur">
        <DropdownMenuLabel>Github Repositories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <For each={repos}>{(repo) => <RepoItem name={repo} />}</For>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const RepoItem = (props: { name: string }) => (
  <DropdownMenuItem
    as="a"
    class="cursor-pointer"
    href={`https://github.com/${props.name}`}
  >
    {props.name}
  </DropdownMenuItem>
);
