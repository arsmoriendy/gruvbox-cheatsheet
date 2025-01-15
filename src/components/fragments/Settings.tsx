import { createEffect, JSXElement, useContext } from "solid-js";
import {
  Settings,
  SettingsContext,
  SettingsSchema,
  SettingsSchemaShape,
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
      <PopoverContent class="flex flex-col gap-1.5 px-0 pt-0 pb-1.5">
        <b class="p-3 border-b">Settings</b>
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

type SettingsEntryProps = {
  name: string;
  description?: string;
  id?: string;
  children: JSXElement;
};

const SettingsEntry = ({
  name,
  description,
  id,
  children,
}: SettingsEntryProps) => (
  <div class="flex justify-between items-center gap-5 hover:bg-muted p-3">
    <Label for={`${id ?? name}-input`}>
      <code class="font-bold">{name}</code>
      <p class="text-muted-foreground">
        {description ??
          SettingsSchemaShape[name as keyof typeof SettingsSchemaShape]
            ?.description}
      </p>
    </Label>
    {children}
  </div>
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

  return (
    <>
      <SettingsEntry name="usePercent">
        <Checkbox
          id="usePercent"
          checked={settings.usePercent}
          onChange={() => setSettings("usePercent", !settings.usePercent)}
        />
      </SettingsEntry>

      <SettingsEntry name="colorFormat">
        <Select
          id="colorFormat"
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
        const id = `show${capitalize(tblName)}Table`;
        return (
          <SettingsEntry
            name={id}
            description={
              SettingsSchemaShape.showTable.shape[
                tblName as keyof typeof SettingsSchemaShape.showTable.shape
              ].description
            }
          >
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

      <SettingsEntry name="roundFloats">
        <Checkbox
          id="roundFloats"
          checked={settings.roundFloats}
          onChange={() => setSettings("roundFloats", !settings.roundFloats)}
        />
      </SettingsEntry>

      <SettingsEntry name="separator">
        <Checkbox
          id="separator"
          checked={settings.separator == " "}
          onChange={() =>
            setSettings("separator", settings.separator === " " ? ", " : " ")
          }
        />
      </SettingsEntry>

      <SettingsEntry name="theme">
        <Select
          id="theme"
          disallowEmptySelection
          value={settings.theme}
          options={SettingsSchema._def.innerType.shape.theme._def.values}
          onChange={(format) => setSettings("theme", format!)}
          itemComponent={(props) => (
            <SelectItem item={props.item}>
              {capitalize(props.item.rawValue)}
            </SelectItem>
          )}
        >
          <SelectTrigger aria-label="Theme">
            <SelectValue<string>>
              {(state) => capitalize(state.selectedOption())}
            </SelectValue>
          </SelectTrigger>
          <SelectContent />
        </Select>
      </SettingsEntry>
    </>
  );
};
