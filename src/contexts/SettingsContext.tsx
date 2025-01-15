import { createContext, createEffect, JSX } from "solid-js";
import { createStore } from "solid-js/store";
import { z } from "zod";
import wrapError from "../lib/wrapError";
import zsodm from "../lib/zsodm";

export const SettingsSchema = z
  .object({
    colorFormat: z
      .enum(["hsl", "rgb", "hex"])
      .describe("The color format for each cell color"),
    showTable: z
      .object({
        dark: z.boolean().describe("Show dark color scheme table"),
        light: z.boolean().describe("Show light color scheme table"),
      })
      .describe("Which color scheme table(s) to show"),
    roundFloats: z.boolean().describe("Wether or not to round floats"),
    usePercent: z.boolean().describe("Wether or not to use pecentage values"),
    separator: z
      .enum([" ", ", "])
      .describe("Which color values separator to use"),
  })
  .default({
    colorFormat: "hsl",
    showTable: {
      dark: true,
      light: true,
    },
    roundFloats: false,
    usePercent: true,
    separator: ", ",
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
