import type { Component } from "solid-js";
import { SettingsContextProvider } from "./contexts/SettingsContext";
import { ColorTables } from "./components/fragments/ColorTables";
import Settings from "./components/fragments/Settings";

const App: Component = () => {
  return (
    <SettingsContextProvider>
      <Settings />
      <ColorTables />
    </SettingsContextProvider>
  );
};

export default App;
