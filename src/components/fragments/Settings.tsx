import { createEffect, JSXElement, useContext } from "solid-js";
import {
  Settings,
  SettingsContext,
  SettingsSchema,
} from "../../contexts/SettingsContext";
import capitalize from "../../lib/capitalize";
import { Checkbox } from "../elements/checkbox";
import { Label } from "../elements/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../elements/select";
import { Popover, PopoverContent, PopoverTrigger } from "../elements/popover";
import { Button, ButtonProps } from "../elements/button";
import Cog from "lucide-solid/icons/cog";

export default () => {
  return (
    <Popover>
      <PopoverTrigger as={SettingsTriggerButton} />
      <PopoverContent class="flex flex-col gap-5">
        <SettingsContent />
      </PopoverContent>
    </Popover>
  );
};

const SettingsTriggerButton = (props: ButtonProps) => (
  <Button size="icon" variant="outline" {...props}>
    <Cog />
  </Button>
);

type SettingsLabelProps = { inputId: string; children: JSXElement };

const SettingsLabel = ({ inputId, children }: SettingsLabelProps) => (
  <Label for={`${inputId}-input`}>{children}</Label>
);

type SettingsEntryProps = { children: JSXElement };

const SettingsEntry = ({ children }: SettingsEntryProps) => (
  <div class="flex justify-between items-center">{children}</div>
);

const SettingsContent = () => {
  const [settings, setSettings] = useContext(SettingsContext);

  let lastToggled: keyof Settings["showTable"];

  // show at least one table
  createEffect(() => {
    const { showTable } = settings;
    const show1 = Object.values(showTable).includes(true);
    if (show1) return;
    Object.entries(settings.showTable).some(
      ([tblName, showTbl]) =>
        tblName !== lastToggled &&
        setSettings(
          "showTable",
          tblName as keyof Settings["showTable"],
          !showTbl,
        ),
    );
  });

  const ids = {
    usePercent: "usePercentCheckbox",
    colorFormat: "colorFormatSelect",
    roundFloats: "roundFloatsCheckbox",
    separator: "separatorSelect",
  };

  return (
    <>
      <SettingsEntry>
        <SettingsLabel inputId={ids.usePercent}>Use Percent</SettingsLabel>
        <Checkbox
          id={ids.usePercent}
          checked={settings.usePercent}
          onChange={() => setSettings("usePercent", !settings.usePercent)}
        />
      </SettingsEntry>

      <SettingsEntry>
        <SettingsLabel inputId={ids.colorFormat}>Color Format</SettingsLabel>
        <Select
          id={ids.colorFormat}
          disallowEmptySelection
          value={settings.colorFormat}
          options={SettingsSchema._def.innerType.shape.colorFormat._def.values}
          onChange={(format) => setSettings("colorFormat", format!)}
          itemComponent={(props) => (
            <SelectItem item={props.item}>
              {props.item.rawValue.toUpperCase()}
            </SelectItem>
          )}
        >
          <SelectTrigger aria-label="Tables">
            <SelectValue<string>>
              {(state) => state.selectedOption().toUpperCase()}
            </SelectValue>
          </SelectTrigger>
          <SelectContent />
        </Select>
      </SettingsEntry>

      {Object.entries(settings.showTable).map(([tblName, showTbl]) => {
        const id = `${tblName}TableCheckbox`;
        return (
          <SettingsEntry>
            <SettingsLabel inputId={id}>
              {capitalize(tblName)} Table
            </SettingsLabel>
            <Checkbox
              id={id}
              checked={showTbl}
              onChange={() => {
                lastToggled = tblName as keyof Settings["showTable"];
                setSettings(
                  "showTable",
                  tblName as keyof Settings["showTable"],
                  !showTbl,
                );
              }}
            />
          </SettingsEntry>
        );
      })}

      <SettingsEntry>
        <SettingsLabel inputId={ids.roundFloats}>Round Floats</SettingsLabel>
        <Checkbox
          id={ids.roundFloats}
          checked={settings.roundFloats}
          onChange={() => setSettings("roundFloats", !settings.roundFloats)}
        />
      </SettingsEntry>

      <SettingsEntry>
        <SettingsLabel inputId={ids.separator}>Space Separators</SettingsLabel>
        <Checkbox
          id={ids.separator}
          checked={settings.separator == " "}
          onChange={() =>
            setSettings("separator", settings.separator === " " ? ", " : " ")
          }
        />
      </SettingsEntry>
    </>
  );
};
