import Github from "lucide-solid/icons/github";
import { Button, ButtonProps } from "../elements/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../elements/tooltip";

export const GithubButton = (props: ButtonProps<"a">) => (
  <Tooltip>
    <TooltipTrigger {...props} as={GithubTooltipTriggerButton} />
    <TooltipContent>GitHub Repository</TooltipContent>
  </Tooltip>
);

const GithubTooltipTriggerButton = (props: ButtonProps<"a">) => (
  <Button
    size="icon"
    variant="outline"
    as="a"
    href="https://github.com/arsmoriendy/gruvbox-cheatsheet"
    {...props}
  >
    <Github />
  </Button>
);
