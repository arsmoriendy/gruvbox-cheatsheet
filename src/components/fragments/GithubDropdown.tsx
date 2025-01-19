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
import {
  createQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/solid-query";
import { gql, GraphQLClient } from "graphql-request";
import { asyncWrapError } from "~/lib/wrapError";
import { Badge } from "../elements/badge";
import Star from "lucide-solid/icons/star";

const queryClient = new QueryClient();

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
        <For each={repos}>
          {(props) => (
            <QueryClientProvider client={queryClient}>
              <RepoItem {...props} />
            </QueryClientProvider>
          )}
        </For>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

type RepoItemProps = {
  user: string;
  repo: string;
};

const gqlClient = new GraphQLClient("https://api.github.com/graphql", {
  headers: {
    authorization: `Bearer ${import.meta.env["VITE_GITHUB_TOKEN"]}`,
  },
});

const gqlStarQuery = gql`
  query getStars($user: String!, $repo: String!) {
    repository(owner: $user, name: $repo) {
      stargazerCount
    }
  }
`;

type GqlStarRes = {
  repository: {
    stargazerCount: number;
  };
};

const RepoItem = ({ user, repo }: RepoItemProps) => {
  const repoPath = `${user}/${repo}`;

  const res = createQuery(() => ({
    queryKey: [repoPath],
    queryFn: async () => {
      const { success, data, error } = await asyncWrapError<GqlStarRes>(
        async () => await gqlClient.request(gqlStarQuery, { user, repo }),
      );

      if (success) return data;

      console.error("failed fetching github repository stars", error);
      throw error;
    },
  }));

  return (
    <DropdownMenuItem
      as="a"
      class="cursor-pointer"
      href={`https://github.com/${repoPath}`}
    >
      <span class="font-mono">{repoPath}</span>
      <RepoStars stars={res.data?.repository.stargazerCount} />
    </DropdownMenuItem>
  );
};

const formatter = Intl.NumberFormat("en", { notation: "compact" });

const RepoStars = (props: { stars?: number }) => (
  <Badge class="bg-muted text-muted-foreground">
    <Star size={12} class="text-accent mr-2" />
    {props.stars === undefined ? "?" : formatter.format(props.stars)}
  </Badge>
);
