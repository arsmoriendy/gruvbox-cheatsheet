import { useContext } from "solid-js";
import { Settings, SettingsContext } from "../../contexts/SettingsContext";

export default () => {
  const [settings, setSettings] = useContext(SettingsContext);

  return (
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
  );
};
