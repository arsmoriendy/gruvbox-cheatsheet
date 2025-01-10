import { createContext, createEffect, JSX } from "solid-js";
import { createStore } from "solid-js/store";

export type Settings = {
  colorFormat: "hsl" | "rgb" | "hex";
};

const lsKey = "gruvboxCheatsheetSettings";
const lsSettings = localStorage[lsKey];

const defaultSettings: Settings = lsSettings
  ? JSON.parse(lsSettings)
  : {
      colorFormat: "hsl",
    };

const settingsStore = createStore(defaultSettings);

createEffect(() => {
  localStorage[lsKey] = JSON.stringify(settingsStore[0]);
});

export const SettingsContext = createContext(settingsStore);
export const SettingsContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => (
  <SettingsContext.Provider value={settingsStore}>
    {children}
  </SettingsContext.Provider>
);
