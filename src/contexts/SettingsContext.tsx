import { createContext, createEffect, JSX } from "solid-js";
import { createStore } from "solid-js/store";
import { z } from "zod";
import wrapError from "../lib/wrapError";
import zsodm from "../lib/zsodm";

const SettingsSchema = z
  .object({
    colorFormat: z.enum(["hsl", "rgb", "hex"]),
    showTable: z.object({
      dark: z.boolean(),
      light: z.boolean(),
    }),
    roundFloats: z.boolean(),
    separator: z.enum([" ", ", "]),
  })
  .default({
    colorFormat: "hsl",
    showTable: {
      dark: true,
      light: true,
    },
    roundFloats: false,
    separator: ", ",
  });

export type Settings = z.infer<typeof SettingsSchema>;

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
