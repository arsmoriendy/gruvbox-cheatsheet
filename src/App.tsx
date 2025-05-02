import type { Component } from "solid-js";
import { SettingsContextProvider } from "./contexts/SettingsContext";
import { ColorTables } from "./components/fragments/ColorTables";
import Settings from "./components/fragments/Settings";
import { Toaster } from "./components/elements/toast";
import { Button, ButtonProps } from "./components/elements/button";
import Bug from "lucide-solid/icons/bug";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./components/elements/tooltip";
import CopyDialog from "./components/fragments/CopyDialog";
import { GithubDropdown } from "./components/fragments/GithubDropdown";

const App: Component = () => {
  return (
    <SettingsContextProvider>
      <div class="flex flex-col max-w-2xl xl:max-w-[90rem] relative left-1/2 -translate-x-1/2 px-2">
        <header class="flex items-center justify-between my-2">
          <h1 class="font-bold text-xl">Gruvbox Cheatsheet</h1>
          <div class="flex gap-2">
            <CopyDialog />

            <GithubDropdown />

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

            <Settings />
          </div>
        </header>
        <ColorTables />
        <Toaster />
      </div>
    </SettingsContextProvider>
  );
};

export default App;
