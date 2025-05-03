import { JSX, onMount, useContext } from "solid-js";
import { SettingsContext } from "../../contexts/SettingsContext";
import * as colors from "../../data/colors";
import { Button } from "../elements/button";
import { showToast } from "../elements/toast";
import Lightbulb from "lucide-solid/icons/lightbulb";
import { toaster } from "@kobalte/core";
import ClipboardCheck from "lucide-solid/icons/clipboard-check";
import convert from "color-convert";

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
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
      {Object.entries(colors.ColorSchemes).map(([schemeName, scheme]) => (
        <ColorTable schemeName={schemeName} scheme={scheme} />
      ))}
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
  schemeName: name,
  scheme,
  ...props
}: {
  schemeName: string;
  scheme: colors.ColorScheme;
}) => (
  <table class={`border-collapse grow ${borderClass}`} {...props}>
    <thead>
      <tr>
        <Th>{name}</Th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(scheme).map(([_, value]) => {
        const colorStr = colors.Stringify(value);
        const hsl = convert.rgb.hsl(value.r, value.g, value.b);
        const hex = `#${convert.rgb.hex(value.r, value.g, value.b)}`;

        const textColor =
          hsl[1] < 20 || hsl[2] < 50 ? "hsl(48 87% 88%)" : "hsl(0 0% 16%)";

        return (
          <tr>
            <Td
              style={{
                "background-color": hex,
                color: textColor,
              }}
              class="relative font-mono py-2 cursor-pointer hover:z-50 hover:scale-110"
              onclick={() => {
                navigator.clipboard.writeText(colorStr);
                showToast(() => ({
                  icon: (iconProps) => <ClipboardCheck {...iconProps} />,
                  title: <>Copied to clipboard</>,
                  style: {
                    "background-color": hex,
                    color: textColor,
                    "border-color": textColor,
                  },
                  class: "border",
                }));
              }}
            >
              {colorStr}
            </Td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
