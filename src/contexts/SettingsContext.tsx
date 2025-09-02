import { createContext, createEffect, JSX } from "solid-js";
import { createStore } from "solid-js/store";
import { z } from "zod";
import wrapError from "../lib/wrapError";
import zsodm from "../lib/zsodm";

export const SettingsSchema = z
  .object({
    colorFormat: z
      .enum(["hsl", "hsv", "rgb", "hex"])
      .describe("The color format for each cell color"),
    roundFloats: z.boolean().describe("Wether or not to round floats"),
    usePercent: z.boolean().describe("Wether or not to use pecentage values"),
    separator: z
      .enum([" ", ", "])
      .describe("Which color values separator to use"),
    theme: z
      .enum(["light", "dark", "system"])
      .describe("Which color scheme to use for this website"),
    darkMode: z
      .boolean()
      .describe(
        "Wether or not this website is in dark mode, accounting for system theme",
      ),
    ignoreToasts: z.object({
      cellCopy: z.boolean(),
    }),
    showAffix: z.boolean().describe("Show surrounding indicators"),
    canonicalColors: z.boolean().describe("Use canonical colors"),
  })
  .default({
    showAffix: true,
    colorFormat: "hsl",
    roundFloats: false,
    usePercent: true,
    separator: ", ",
    theme: "system",
    ignoreToasts: {
      cellCopy: false,
    },
    darkMode: false,
    canonicalColors: true,
  });

export type Settings = z.infer<typeof SettingsSchema>;

export const SettingsSchemaShape = SettingsSchema._def.innerType.shape;

const lsKey = "gruvboxCheatsheetSettings";

const parseLs = (): Settings => {
  const lsStr = localStorage[lsKey];
  const defaultSettings = SettingsSchema._def.defaultValue();

  var { success, data: lsObj } = wrapError(() => JSON.parse(lsStr));
  if (!success) return defaultSettings;

  var { success, data } = SettingsSchema.safeParse(lsObj);
  if (success) return data!;

  return zsodm(lsObj, SettingsSchema) as Settings;
};

const parsedLs = parseLs();
const settingsStore = createStore(parsedLs);

createEffect(() => {
  localStorage[lsKey] = JSON.stringify(settingsStore[0]);
});

namespace theme {
  const htmlClasses = document.documentElement.classList;
  export const lighten = () => {
    htmlClasses.remove("dark");
  };
  export const darken = () => {
    htmlClasses.contains("dark") || htmlClasses.add("dark");
  };
  export function isSystemDark() {
    const { matches } = window.matchMedia("(prefers-color-scheme:dark)");
    return matches;
  }
}

createEffect(() => {
  switch (settingsStore[0].theme) {
    case "dark":
      settingsStore[1]("darkMode", true);
      break;
    case "light":
      settingsStore[1]("darkMode", false);
      break;
    case "system":
      theme.isSystemDark()
        ? settingsStore[1]("darkMode", true)
        : settingsStore[1]("darkMode", false);
      break;
  }
});

createEffect(() =>
  settingsStore[0].darkMode ? theme.darken() : theme.lighten(),
);

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
