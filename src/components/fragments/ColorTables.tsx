import { createEffect, createSignal, JSX, useContext } from "solid-js";
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

const colorToString = new Map<
  Settings["colorFormat"],
  (c: HSL | RGB | string) => string
>();

export const ColorTables = () => {
  const [settings] = useContext(SettingsContext);

  colorToString.set("rgb", (c) => rgbToString(c as RGB));
  colorToString.set("hsl", (c) =>
    hslToString(c as HSL, { roundFloats: settings.roundFloats }),
  );
  colorToString.set("hex", (c) => c as string);

  return (
    <div class="lg:flex gap-5 justify-evenly">
      {Object.entries(settings.showTable).map(
        ([tblName, showTbl]) =>
          showTbl && (
            <ColorTable
              name={`${capitalize(tblName)} Table`}
              scheme={Colors[`${tblName}Mode` as keyof Colors]}
            />
          ),
      )}
    </div>
  );
};

const borderClass = "border";

const Th = ({ class: className, ...props }: JSX.IntrinsicElements["th"]) => (
  <th class={`${borderClass} ${className}`} {...props} />
);

const Td = ({ class: className, ...props }: JSX.IntrinsicElements["td"]) => (
  <td class={`${borderClass} ${className}`} {...props} />
);

const ColorTable = ({
  name,
  scheme,
  ...props
}: {
  name: string;
  scheme: ColorScheme;
}) => (
  <table class={`border-collapse ${borderClass}`} {...props}>
    <thead>
      <tr>
        <Th colspan={3}>{name}</Th>
      </tr>
    </thead>
    {Object.values(scheme).map((subTbl) => (
      <>
        <thead>
          <tr>
            <Th>Color</Th>
            {Object.keys(Object.values(subTbl)[0]).map((k) => (
              <Th>{capitalize(k)}</Th>
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

const Rows = ({ entries }: { entries: ColorEntries | MonoChromeEntry[] }) =>
  Object.entries(entries).map(
    ([clrName, clrVals]: [string, ColorEntry | MonoChromeEntry]) => (
      <tr>
        <Td>{capitalize(clrName)}</Td>
        {Object.values(clrVals).map((clrVal) => {
          const [{ colorFormat }] = useContext(SettingsContext);

          const color = clrVal[colorFormat];
          const colorStr = colorToString.get(colorFormat)!(color);

          return (
            <Td
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
            </Td>
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
