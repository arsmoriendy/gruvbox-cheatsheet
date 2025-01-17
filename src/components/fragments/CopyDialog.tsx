import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../elements/dialog";
import { Colors } from "~/data/colors";
import { Tooltip, TooltipContent, TooltipTrigger } from "../elements/tooltip";
import { Button, ButtonProps } from "../elements/button";
import Braces from "lucide-solid/icons/braces";

export default () => {
  return (
    <Dialog>
      <CopyTrigger />
      <CopyContent />
    </Dialog>
  );
};

const CopyTrigger = () => (
  <DialogTrigger
    as={(props: ButtonProps) => (
      <Tooltip>
        <TooltipTrigger
          {...props}
          as={(props: ButtonProps) => <CopyTriggerButton {...props} />}
        />
        <TooltipContent>Copy JSON</TooltipContent>
      </Tooltip>
    )}
  />
);

const CopyTriggerButton = (props: ButtonProps) => (
  <Button variant="outline" size="icon" {...props}>
    <Braces />
  </Button>
);

const CopyContent = () => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Copy JSON</DialogTitle>
        <DialogDescription>
          Copy HSL, RGB and HEX color values
        </DialogDescription>
      </DialogHeader>

      <code>{JSON.stringify(Colors)}</code>
    </DialogContent>
  );
};
