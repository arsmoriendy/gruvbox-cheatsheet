import { createEffect, useContext } from "solid-js";
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

export default () => {
  const [settings, setSettings] = useContext(SettingsContext);

  let lastToggled: keyof Settings["showTable"];

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
      <Select
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
        <SelectTrigger aria-label="Tables" class="w-[180px]">
          <SelectValue<string>>
            {(state) => state.selectedOption().toUpperCase()}
          </SelectValue>
        </SelectTrigger>
        <SelectContent />
      </Select>

      {Object.entries(settings.showTable).map(([tblName, showTbl]) => {
        const id = `${tblName}TableCheckbox`;
        return (
          <>
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
            <Label for={`${id}-input`}>{capitalize(tblName)} Table</Label>
          </>
        );
      })}

      <Checkbox
        id="roundFloatsCheckbox"
        checked={settings.roundFloats}
        onChange={() => setSettings("roundFloats", !settings.roundFloats)}
      />
      <Label for="roundFloatsCheckbox-input">Round Floats</Label>

      <Checkbox
        id="spaceSeparatorsCheckbox"
        checked={settings.separator == " "}
        onChange={() =>
          setSettings("separator", settings.separator === " " ? ", " : " ")
        }
      />
      <Label for="spaceSeparatorsCheckbox-input">Space Separators</Label>

      <Checkbox
        id="usePercentCheckbox"
        checked={settings.usePercent}
        onChange={() => setSettings("usePercent", !settings.usePercent)}
      />
      <Label for="usePercentCheckbox-input">Use Percent</Label>
    </>
  );
};
