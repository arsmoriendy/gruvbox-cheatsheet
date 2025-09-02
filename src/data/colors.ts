import { useContext } from "solid-js";
import { SettingsContext } from "../contexts/SettingsContext";
import convert, { RGB } from "color-convert";

const braced = (format: string, str: string) => `${format}(${str})`;

const percentOf = (percent: number, of: number) => (percent / 100) * of;
const toPercent = (x: number, of: number) => (x / of) * 100;

export const Stringify = (c: RGB): string => {
  const [{ colorFormat, roundFloats, separator, usePercent, showAffix }] =
    useContext(SettingsContext);

  const percent = usePercent ? "%" : "";
  let point = roundFloats ? 0 : 2;

  switch (colorFormat) {
    case "hsl": {
      let [h, s, l] = convert.rgb.hsl.raw(c);

      if (!usePercent) {
        s = percentOf(s, 255);
        l = percentOf(l, 255);
      }

      const hs = h.toFixed(point);
      const ss = s.toFixed(point);
      const ls = l.toFixed(point);

      const str = `${hs}${separator}${ss}${percent}${separator}${ls}${percent}`;
      return showAffix ? braced(colorFormat, str) : str;
    }

    case "rgb": {
      let [r, g, b] = c;

      if (usePercent) {
        r = toPercent(r, 255);
        g = toPercent(g, 255);
        b = toPercent(b, 255);
      }

      const rs = r.toFixed(point);
      const gs = g.toFixed(point);
      const bs = b.toFixed(point);

      const str = `${rs}${percent}${separator}${gs}${percent}${separator}${bs}${percent}`;
      return showAffix ? braced(colorFormat, str) : str;
    }

    case "hex": {
      let [r, g, b] = c;

      const str = convert.rgb.hex(r, g, b);
      return showAffix ? `#${str}` : str;
    }

    case "hsv": {
      let [h, s, v] = convert.rgb.hsv.raw(c);

      if (!usePercent) {
        s = percentOf(s, 255);
        v = percentOf(v, 255);
      }

      const hs = h.toFixed(point);
      const ss = s.toFixed(point);
      const vs = v.toFixed(point);

      const str = `${hs}${separator}${ss}${percent}${separator}${vs}${percent}`;
      return showAffix ? braced(colorFormat, str) : str;
    }
  }
};

export type ColorScheme = {
  [colorName: string]: RGB;
};

export type Theme = {
  [schemeName: string]: ColorScheme;
};

export const GruvboxCanonical: Theme = {
  bright: {
    red: [251, 73, 52],
    green: [184, 187, 38],
    yellow: [250, 189, 47],
    blue: [131, 165, 152],
    purple: [211, 134, 155],
    aqua: [142, 192, 124],
    orange: [254, 128, 25],
  },
  neutral: {
    red: [204, 36, 29],
    green: [152, 151, 26],
    yellow: [215, 153, 33],
    blue: [69, 133, 136],
    purple: [177, 98, 134],
    aqua: [104, 157, 106],
    orange: [214, 93, 14],
  },
  faded: {
    red: [157, 0, 6],
    green: [121, 116, 14],
    yellow: [181, 118, 20],
    blue: [7, 102, 120],
    purple: [143, 63, 113],
    aqua: [66, 123, 88],
    orange: [175, 58, 3],
  },
  monochrome: {
    dark0Hard: [29, 32, 33],
    dark0: [40, 40, 40],
    dark0Soft: [50, 48, 47],
    dark1: [60, 56, 54],
    dark2: [80, 73, 69],
    dark3: [102, 92, 84],
    dark4: [124, 111, 100],
    gray: [146, 131, 116],
    light4: [168, 153, 132],
    light3: [189, 174, 147],
    light2: [213, 196, 161],
    light1: [235, 219, 178],
    light0Soft: [242, 229, 188],
    light0: [251, 241, 199],
    light0Hard: [249, 245, 215],
  },
};

export const Gruvbox: Theme = {
  darkMuted: {
    background: GruvboxCanonical["monochrome"]["dark0"],
    red: GruvboxCanonical["neutral"]["red"],
    green: GruvboxCanonical["neutral"]["green"],
    yellow: GruvboxCanonical["neutral"]["yellow"],
    blue: GruvboxCanonical["neutral"]["blue"],
    purple: GruvboxCanonical["neutral"]["purple"],
    aqua: GruvboxCanonical["neutral"]["aqua"],
    orange: GruvboxCanonical["neutral"]["orange"],
    foreground: GruvboxCanonical["monochrome"]["light4"],
  },
  darkStrong: {
    background: GruvboxCanonical["monochrome"]["gray"],
    red: GruvboxCanonical["bright"]["red"],
    green: GruvboxCanonical["bright"]["green"],
    yellow: GruvboxCanonical["bright"]["yellow"],
    blue: GruvboxCanonical["bright"]["blue"],
    purple: GruvboxCanonical["bright"]["purple"],
    aqua: GruvboxCanonical["bright"]["aqua"],
    orange: GruvboxCanonical["bright"]["orange"],
    foreground: GruvboxCanonical["monochrome"]["light1"],
  },
  lightMuted: {
    background: GruvboxCanonical["monochrome"]["light0"],
    red: GruvboxCanonical["neutral"]["red"],
    green: GruvboxCanonical["neutral"]["green"],
    yellow: GruvboxCanonical["neutral"]["yellow"],
    blue: GruvboxCanonical["neutral"]["blue"],
    purple: GruvboxCanonical["neutral"]["purple"],
    aqua: GruvboxCanonical["neutral"]["aqua"],
    orange: GruvboxCanonical["neutral"]["orange"],
    foreground: GruvboxCanonical["monochrome"]["dark4"],
  },
  lightStrong: {
    backgrond: GruvboxCanonical["monochrome"]["gray"],
    red: GruvboxCanonical["faded"]["red"],
    green: GruvboxCanonical["faded"]["green"],
    yellow: GruvboxCanonical["faded"]["yellow"],
    blue: GruvboxCanonical["faded"]["blue"],
    purple: GruvboxCanonical["faded"]["purple"],
    aqua: GruvboxCanonical["faded"]["aqua"],
    orange: GruvboxCanonical["faded"]["orange"],
    foreground: GruvboxCanonical["monochrome"]["dark1"],
  },
  darkBackground: {
    0: GruvboxCanonical["monochrome"]["dark0Hard"],
    1: GruvboxCanonical["monochrome"]["dark0Soft"],
    2: GruvboxCanonical["monochrome"]["dark1"],
    3: GruvboxCanonical["monochrome"]["dark2"],
    4: GruvboxCanonical["monochrome"]["dark3"],
    5: GruvboxCanonical["monochrome"]["dark4"],
  },
  darkForeground: {
    0: GruvboxCanonical["monochrome"]["light0"],
    1: GruvboxCanonical["monochrome"]["light0"],
    2: GruvboxCanonical["monochrome"]["light1"],
    3: GruvboxCanonical["monochrome"]["light2"],
    4: GruvboxCanonical["monochrome"]["light3"],
    5: GruvboxCanonical["monochrome"]["light4"],
  },
  lightBackground: {
    0: GruvboxCanonical["monochrome"]["light0Hard"],
    1: GruvboxCanonical["monochrome"]["light0Soft"],
    2: GruvboxCanonical["monochrome"]["light1"],
    3: GruvboxCanonical["monochrome"]["light2"],
    4: GruvboxCanonical["monochrome"]["light3"],
    5: GruvboxCanonical["monochrome"]["light4"],
  },
  lightForeground: {
    0: GruvboxCanonical["monochrome"]["dark0"],
    1: GruvboxCanonical["monochrome"]["dark0"],
    2: GruvboxCanonical["monochrome"]["dark1"],
    3: GruvboxCanonical["monochrome"]["dark2"],
    4: GruvboxCanonical["monochrome"]["dark3"],
    5: GruvboxCanonical["monochrome"]["dark4"],
  },
};
