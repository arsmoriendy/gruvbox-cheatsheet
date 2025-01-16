import type { Component } from "solid-js";
import { SettingsContextProvider } from "./contexts/SettingsContext";
import { ColorTables } from "./components/fragments/ColorTables";
import Settings from "./components/fragments/Settings";

const App: Component = () => {
  return (
    <SettingsContextProvider>
      <div class="flex flex-col max-w-6xl relative left-1/2 -translate-x-1/2 px-2">
        <header class="flex items-center justify-between my-2">
          <h1>Gruvbox Cheatsheet</h1>
          <Settings />
        </header>
        <ColorTables />
      </div>
    </SettingsContextProvider>
  );
};

export default App;
