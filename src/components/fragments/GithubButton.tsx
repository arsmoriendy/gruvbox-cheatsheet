import Github from "lucide-solid/icons/github";
import { Button, ButtonProps } from "../elements/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../elements/tooltip";

export const GithubButton = (props: ButtonProps<"a">) => (
  <Tooltip>
    <TooltipTrigger {...props} as={GithubTooltipTriggerButton} />
    <TooltipContent>GitHub Repositories</TooltipContent>
  </Tooltip>
);

const GithubTooltipTriggerButton = (props: ButtonProps) => (
  <Button size="icon" variant="outline" {...props}>
    <Github />
  </Button>
);
