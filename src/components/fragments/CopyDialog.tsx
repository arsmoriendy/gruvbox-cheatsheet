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
import { highlightJson } from "~/lib/highlighter";
import Copy from "lucide-solid/icons/copy";
import { SettingsContext } from "~/contexts/SettingsContext";
import { createSignal, useContext } from "solid-js";
import ClipboardCheck from "lucide-solid/icons/clipboard-check";

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
  const jsonString = JSON.stringify(Colors, null, 4);
  const [settings] = useContext(SettingsContext);
  const [copied, setCopied] = createSignal(false);

  return (
    <DialogContent class="max-w-lg max-h-[calc(100vh-16rem)]">
      <DialogHeader>
        <DialogTitle>Copy JSON</DialogTitle>
        <DialogDescription>
          Copy HSL, RGB and HEX color values
        </DialogDescription>
      </DialogHeader>

      <div class="relative">
        <Button
          size="sm"
          class="top-2 right-2 absolute"
          onclick={() => {
            setCopied(true);
            navigator.clipboard.writeText(jsonString);
          }}
        >
          {copied() ? (
            <>
              <ClipboardCheck /> Copied!
            </>
          ) : (
            <>
              <Copy /> Copy
            </>
          )}
        </Button>
        <div
          innerHTML={highlightJson(jsonString, {
            theme: settings.darkMode
              ? "Gruvbox Dark Medium"
              : "Gruvbox Light Medium",
            transformers: [
              {
                pre(this, hast) {
                  hast.properties.class = "p-2";
                },
              },
            ],
          })}
        />
      </div>
    </DialogContent>
  );
};
