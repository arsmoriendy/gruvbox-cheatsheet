import type { Component } from "solid-js";
import { SettingsContextProvider } from "./contexts/SettingsContext";
import { ColorTables } from "./components/fragments/ColorTables";
import Settings from "./components/fragments/Settings";
import { Toaster } from "./components/elements/toast";
import { Button } from "./components/elements/button";
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
              <TooltipTrigger>
                <Button
                  size="icon"
                  variant="outline"
                  as="a"
                  href="https://github.com/arsmoriendy/gruvbox-cheatsheet"
                >
                  <Github />
                </Button>
              </TooltipTrigger>
              <TooltipContent>GitHub Repository</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Button
                  size="icon"
                  variant="outline"
                  as="a"
                  href="https://github.com/arsmoriendy/gruvbox-cheatsheet/issues"
                >
                  <Bug />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Report a Bug</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Settings />
              </TooltipTrigger>
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
