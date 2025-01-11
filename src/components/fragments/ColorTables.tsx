import { createEffect, createSignal, useContext } from "solid-js";
import { SettingsContext, Settings } from "../../contexts/SettingsContext";
import {
  ColorEntries,
  ColorEntry,
  Colors,
  ColorScheme,
  HSL,
  hslToString,
  MonoChromeEntry,
  RGB,
  rgbToString,
} from "../../data/colors";
import capitalize from "../../lib/capitalize";
import Copy from "lucide-solid/icons/copy";
import ClipboardCheck from "lucide-solid/icons/clipboard-check";

export const ColorTables = () => {
  const [{ showTable }] = useContext(SettingsContext);

  return (
    <>
      {Object.entries(showTable).map(
        ([tblName, showTbl]) =>
          showTbl && (
            <ColorTable
              name={`${capitalize(tblName)} Table`}
              scheme={Colors[`${tblName}Mode` as keyof Colors]}
            />
          ),
      )}
    </>
  );
};

const ColorTable = ({
  name,
  scheme,
  ...props
}: {
  name: string;
  scheme: ColorScheme;
}) => (
  <table class="border-collapse border" {...props}>
    <thead>
      <tr>
        <th colspan={3}>{name}</th>
      </tr>
    </thead>
    {Object.values(scheme).map((subTbl) => (
      <>
        <thead>
          <tr>
            <th>Color</th>
            {Object.keys(Object.values(subTbl)[0]).map((k) => (
              <th>{capitalize(k)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <Rows entries={subTbl} />
        </tbody>
      </>
    ))}
  </table>
);

const colorToString = new Map<
  Settings["colorFormat"],
  (c: HSL | RGB | string) => string
>();
colorToString.set("rgb", (c) => rgbToString(c as RGB));
colorToString.set("hsl", (c) => hslToString(c as HSL));
colorToString.set("hex", (c) => c as string);

const Rows = ({ entries }: { entries: ColorEntries | MonoChromeEntry[] }) =>
  Object.entries(entries).map(
    ([clrName, clrVals]: [string, ColorEntry | MonoChromeEntry]) => (
      <tr>
        <td>{capitalize(clrName)}</td>
        {Object.values(clrVals).map((clrVal) => {
          const [{ colorFormat }] = useContext(SettingsContext);

          const color = clrVal[colorFormat];
          const colorStr = colorToString.get(colorFormat)!(color);

          return (
            <td
              style={{
                "background-color": clrVal.hex,
              }}
              classList={{
                "text-white": clrVal.hsl.s < 20 || clrVal.hsl.l < 50,
              }}
              class="relative group"
            >
              {colorStr}
              <CopyBtn value={colorStr} />
            </td>
          );
        })}
      </tr>
    ),
  );

const CopyBtn = ({ value }: { value: string }) => {
  const [copied, setCopied] = createSignal(false);

  createEffect(() => {
    copied() && setTimeout(() => setCopied(false), 1000);
  });

  return (
    <button
      onclick={() => {
        setCopied(true);
        navigator.clipboard.writeText(value);
      }}
      class="hidden group-hover:block absolute right-0 top-1/2 -translate-y-1/2"
    >
      {copied() ? <ClipboardCheck /> : <Copy />}
    </button>
  );
};
