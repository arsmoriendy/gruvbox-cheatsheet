import {
  createEffect,
  createSignal,
  For,
  JSX,
  onMount,
  useContext,
} from "solid-js";
import {
  SettingsContext,
  SettingsSchemaShape,
} from "../../contexts/SettingsContext";
import * as colors from "../../data/colors";
import capitalize from "../../lib/capitalize";
import { Button } from "../elements/button";
import { showToast } from "../elements/toast";
import Lightbulb from "lucide-solid/icons/lightbulb";
import { toaster } from "@kobalte/core";
import ClipboardCheck from "lucide-solid/icons/clipboard-check";
import { cn } from "~/lib/utils";
import { animate, stagger } from "motion";

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

const animateCellsDrop = (cells: NodeListOf<Element>) => {
  animate(cells, { opacity: [0, 100], y: [-100, 0] }, { delay: stagger(0.1) });
};

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
          const otherColorFormats: (keyof colors.ColorValues)[] =
            SettingsSchemaShape.colorFormat._def.values.filter(
              (fmt) => fmt !== colorFormat,
            );

          const color = clrVal[colorFormat];
          const colorStr = colors.Stringify(color);
          const textColor =
            clrVal.hsl.s < 20 || clrVal.hsl.l < 50
              ? "hsl(48 87% 88%)"
              : "hsl(0 0% 16%)";

          // hocus: hovered/focused
          const [hocus, setHocus] = createSignal(false);

          let ul!: HTMLUListElement;

          createEffect(() => {
            hocus() && animateCellsDrop(ul.querySelectorAll("&>div"));
          });

          return (
            <Td class="p-0">
              <button
                class={cn("relative w-full text-left group", hocus() && "z-40")}
                onmouseenter={() => setHocus(true)}
                onfocusin={() => setHocus(true)}
                onmouseleave={() => setHocus(false)}
                onfocusout={() => setHocus(false)}
              >
                <div
                  class={cn(
                    "hidden fixed top-0 left-0 w-full h-full bg-background/50 pointer-events-none",
                    hocus() && "block",
                  )}
                />
                <Cell class="relative" bg={colorStr} fg={textColor} />
                <ul
                  ref={ul}
                  class={cn(
                    "absolute w-full hidden flex-col",
                    hocus() && "flex",
                  )}
                >
                  <For each={otherColorFormats}>
                    {(fmt) => (
                      <Cell
                        bg={colors.Stringify(clrVal[fmt])}
                        fg={textColor}
                        class="truncate"
                      />
                    )}
                  </For>
                </ul>
              </button>
            </Td>
          );
        })}
      </tr>
    ),
  );

type CellProps = {
  bg: string;
  fg: string;
} & JSX.IntrinsicElements["div"];

const Cell = ({ bg, fg, class: className }: CellProps) => {
  return (
    <div
      style={{
        "background-color": bg,
        color: fg,
      }}
      class={cn("font-mono p-2 cursor-pointer", className)}
      onclick={() => {
        navigator.clipboard.writeText(bg);
        showToast(() => ({
          icon: (iconProps) => <ClipboardCheck {...iconProps} />,
          title: <>Copied to clipboard</>,
          style: {
            "background-color": bg,
            color: fg,
            "border-color": fg,
          },
          class: "border",
        }));
      }}
    >
      {bg}
    </div>
  );
};
