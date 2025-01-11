import { useContext } from "solid-js";
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
  <table {...props}>
    <thead>
      <tr>
        <th colspan={3}>{name}</th>
      </tr>
      <tr>
        <th>Color</th>
        <th>Muted</th>
        <th>Strong</th>
      </tr>
    </thead>
    <tbody>
      <Rows entries={scheme.colors} />
    </tbody>
    <thead>
      <tr>
        <th>Monochrome</th>
        <th>Foreground</th>
        <th>Background</th>
      </tr>
    </thead>
    <tbody>
      <Rows entries={scheme.monochrome} />
    </tbody>
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

          let color = clrVal[colorFormat];

          return (
            <td
              style={{
                "background-color": clrVal.hex,
              }}
              classList={{
                "text-white": clrVal.hsl.s < 20 || clrVal.hsl.l < 50,
              }}
            >
              {colorToString.get(colorFormat)!(color)}
            </td>
          );
        })}
      </tr>
    ),
  );
