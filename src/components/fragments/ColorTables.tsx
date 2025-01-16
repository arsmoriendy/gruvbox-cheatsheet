import { createEffect, createSignal, JSX, useContext } from "solid-js";
import { SettingsContext } from "../../contexts/SettingsContext";
import * as colors from "../../data/colors";
import capitalize from "../../lib/capitalize";
import Copy from "lucide-solid/icons/copy";
import ClipboardCheck from "lucide-solid/icons/clipboard-check";
import { Button } from "../elements/button";

export const ColorTables = () => {
  const [settings] = useContext(SettingsContext);

  return (
    <div class="flex flex-col gap-2 xl:flex-row xl:justify-between">
      {Object.entries(settings.showTable).map(
        ([tblName, showTbl]) =>
          showTbl && (
            <ColorTable
              name={`${capitalize(tblName)} Table`}
              scheme={colors.Colors[`${tblName}Mode` as keyof colors.Colors]}
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
  <td class={`${borderClass} px-2 ${className}`} {...props} />
);

const ColorTable = ({
  name,
  scheme,
  ...props
}: {
  name: string;
  scheme: colors.ColorScheme;
}) => (
  <table class={`border-collapse grow ${borderClass}`} {...props}>
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

const Rows = ({
  entries,
}: {
  entries: colors.ColorEntries | colors.MonoChromeEntry[];
}) =>
  Object.entries(entries).map(
    ([clrName, clrVals]: [
      string,
      colors.ColorEntry | colors.MonoChromeEntry,
    ]) => (
      <tr>
        <Td>{capitalize(clrName)}</Td>
        {Object.values(clrVals).map((clrVal) => {
          const [{ colorFormat }] = useContext(SettingsContext);

          const color = clrVal[colorFormat];
          const colorStr = colors.Stringify(color);

          return (
            <Td
              style={{
                "background-color": clrVal.hex,
                color:
                  clrVal.hsl.s < 20 || clrVal.hsl.l < 50
                    ? "hsl(48 87% 88%)"
                    : "hsl(0 0% 16%)",
              }}
              class="relative font-mono group py-2"
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
    <Button
      size="icon"
      variant="outline"
      onclick={() => {
        setCopied(true);
        navigator.clipboard.writeText(value);
      }}
      class="opacity-0 group-hover:opacity-100 absolute right-1 top-1/2 -translate-y-1/2 bg-background text-foreground size-7"
    >
      {copied() ? <ClipboardCheck /> : <Copy />}
    </Button>
  );
};
