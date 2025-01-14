import { createEffect, useContext } from "solid-js";
import { Settings, SettingsContext } from "../../contexts/SettingsContext";
import capitalize from "../../lib/capitalize";

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
      <select
        oninput={(e) => {
          const colorFormat = e.currentTarget.value as Settings["colorFormat"];
          setSettings("colorFormat", colorFormat);
        }}
        value={settings.colorFormat}
      >
        <option value="hsl">hsl</option>
        <option value="rgb">rgb</option>
        <option value="hex">hex</option>
      </select>

      {Object.entries(settings.showTable).map(([tblName, showTbl]) => {
        const id = `${tblName}TableCheckbox`;
        return (
          <>
            <input
              type="checkbox"
              id={id}
              checked={showTbl}
              oninput={() => {
                lastToggled = tblName as keyof Settings["showTable"];
                setSettings(
                  "showTable",
                  tblName as keyof Settings["showTable"],
                  !showTbl,
                );
              }}
            />
            <label for={id}>{capitalize(tblName)} Table</label>
          </>
        );
      })}

      <input
        type="checkbox"
        id="roundFloatsCheckbox"
        checked={settings.roundFloats}
        oninput={() => setSettings("roundFloats", !settings.roundFloats)}
      />
      <label for="roundFloatsCheckbox">Round Floats</label>

      <input
        type="checkbox"
        id="spaceSeparatorsCheckbox"
        checked={settings.separator == " "}
        oninput={() =>
          setSettings("separator", settings.separator === " " ? ", " : " ")
        }
      />
      <label for="spaceSeparatorsCheckbox">Space Separators</label>

      <input
        type="checkbox"
        id="usePercentCheckbox"
        checked={settings.usePercent}
        oninput={() => setSettings("usePercent", !settings.usePercent)}
      />
      <label for="usePercentCheckbox">Use Percent</label>
    </>
  );
};
