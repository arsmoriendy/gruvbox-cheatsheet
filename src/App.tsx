import type { Component } from "solid-js";
import { SettingsContextProvider } from "./contexts/SettingsContext";
import { ColorTables } from "./components/fragments/ColorTables";
import Settings from "./components/fragments/Settings";
import { Toaster } from "./components/elements/toast";
import { Button, ButtonProps } from "./components/elements/button";
import Bug from "lucide-solid/icons/bug";
import Github from "lucide-solid/icons/github";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./components/elements/tooltip";

const App: Component = () => {
  return (
    <SettingsContextProvider>
      <div class="flex flex-col max-w-2xl xl:max-w-7xl relative left-1/2 -translate-x-1/2 px-2">
        <header class="flex items-center justify-between my-2">
          <h1 class="font-bold text-xl">Gruvbox Cheatsheet</h1>
          <div class="flex gap-2">
            <Tooltip>
              <TooltipTrigger
                as={(props: ButtonProps<"a">) => (
                  <Button
                    size="icon"
                    variant="outline"
                    as="a"
                    href="https://github.com/arsmoriendy/gruvbox-cheatsheet"
                    {...props}
                  >
                    <Github />
                  </Button>
                )}
              />
              <TooltipContent>GitHub Repository</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                as={(props: ButtonProps<"a">) => (
                  <Button
                    size="icon"
                    variant="outline"
                    as="a"
                    href="https://github.com/arsmoriendy/gruvbox-cheatsheet/issues"
                    {...props}
                  >
                    <Bug />
                  </Button>
                )}
              />
              <TooltipContent>Report a Bug</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger as={Settings} />
              <TooltipContent>Settings</TooltipContent>
            </Tooltip>
          </div>
        </header>
        <ColorTables />
        <Toaster />
      </div>
    </SettingsContextProvider>
  );
};

export default App;
