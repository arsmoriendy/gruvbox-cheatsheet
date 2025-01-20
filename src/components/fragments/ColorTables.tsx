import { JSX, onMount, useContext } from "solid-js";
import { SettingsContext } from "../../contexts/SettingsContext";
import * as colors from "../../data/colors";
import capitalize from "../../lib/capitalize";
import { Button } from "../elements/button";
import { showToast } from "../elements/toast";
import Lightbulb from "lucide-solid/icons/lightbulb";
import { toaster } from "@kobalte/core";
import ClipboardCheck from "lucide-solid/icons/clipboard-check";
import { cn } from "~/lib/utils";

export const ColorTables = () => {
  const [settings, setSettings] = useContext(SettingsContext);

  onMount(() => {
    !settings.ignoreToasts.cellCopy &&
      showToast((toastId) => {
        return {
          icon: (iconProps) => <Lightbulb class="text-info" {...iconProps} />,
          title: "Tip",
          description: (
            <>
              <p class="my-2">Click on any color cell to copy its value</p>
              <Button
                variant="outline"
                size="sm"
                onclick={() => {
                  toaster.dismiss(toastId);
                  setSettings("ignoreToasts", "cellCopy", true);
                }}
              >
                Hide Forever
              </Button>
            </>
          ),
        };
      });
  });

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
  <th class={cn(borderClass, className)} {...props} />
);

const Td = ({ class: className, ...props }: JSX.IntrinsicElements["td"]) => (
  <td class={cn(borderClass, "px-2", className)} {...props} />
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
          const textColor =
            clrVal.hsl.s < 20 || clrVal.hsl.l < 50
              ? "hsl(48 87% 88%)"
              : "hsl(0 0% 16%)";

          return (
            <Td
              style={{
                "background-color": clrVal.hex,
                color: textColor,
              }}
              class="relative font-mono py-2 cursor-pointer hover:z-50 hover:scale-110"
              onclick={() => {
                navigator.clipboard.writeText(colorStr);
                showToast(() => ({
                  icon: (iconProps) => <ClipboardCheck {...iconProps} />,
                  title: <>Copied to clipboard</>,
                  style: {
                    "background-color": clrVal.hex,
                    color: textColor,
                    "border-color": textColor,
                  },
                  class: "border",
                }));
              }}
            >
              {colorStr}
            </Td>
          );
        })}
      </tr>
    ),
  );
