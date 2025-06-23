import { useContext } from "solid-js";
import { SettingsContext } from "../contexts/SettingsContext";
import convert from "color-convert";

export type RGB = {
  r: number;
  g: number;
  b: number;
};

export type HSL = {
  h: number;
  s: number;
  l: number;
};

const wrapAffix = (formatPrefix: string, str: string) =>
  `${formatPrefix}(${str})`;

const percentOf = (percent: number, of: number) => (percent / 100) * of;
const toPercent = (x: number, of: number) => (x / of) * 100;

export const Stringify = (c: RGB): string => {
  const [
    { colorFormat, roundFloats, separator, usePercent, showAffix: showAffix },
  ] = useContext(SettingsContext);

  const percent = usePercent ? "%" : "";
  let point = roundFloats ? 0 : 2;

  switch (colorFormat) {
    case "hsl": {
      let [h, s, l] = convert.rgb.hsl.raw(c.r, c.g, c.b);

      if (!usePercent) {
        s = percentOf(s, 255);
        l = percentOf(l, 255);
      }

      const hs = h.toFixed(point);
      const ss = s.toFixed(point);
      const ls = l.toFixed(point);

      const str = `${hs}${separator}${ss}${percent}${separator}${ls}${percent}`;
      return showAffix ? wrapAffix(colorFormat, str) : str;
    }

    case "rgb": {
      let { r, g, b } = c;

      if (usePercent) {
        r = toPercent(r, 255);
        g = toPercent(g, 255);
        b = toPercent(b, 255);
      }

      const rs = r.toFixed(point);
      const gs = g.toFixed(point);
      const bs = b.toFixed(point);

      const str = `${rs}${percent}${separator}${gs}${percent}${separator}${bs}${percent}`;
      return showAffix ? wrapAffix(colorFormat, str) : str;
    }

    case "hex": {
      let { r, g, b } = c;
      return convert.rgb.hex(r, g, b);
    }

    case "hsv": {
      let [h, s, v] = convert.rgb.hsv.raw(c.r, c.g, c.b);

      if (!usePercent) {
        s = percentOf(s, 255);
        v = percentOf(v, 255);
      }

      const hs = h.toFixed(point);
      const ss = s.toFixed(point);
      const vs = v.toFixed(point);

      const str = `${hs}${separator}${ss}${percent}${separator}${vs}${percent}`;
      return showAffix ? wrapAffix(colorFormat, str) : str;
    }
  }
};

export type ColorValue = RGB;

export type ColorScheme = {
  [colorName: string]: ColorValue;
};

export type ColorSchemes = {
  [schemeName: string]: ColorScheme;
};

export const ColorSchemes: ColorSchemes = {
  darkMuted: {
    background: {
      r: 40,
      g: 40,
      b: 40,
    },
    red: {
      r: 204,
      g: 36,
      b: 29,
    },
    green: {
      r: 152,
      g: 151,
      b: 26,
    },
    yellow: {
      r: 215,
      g: 153,
      b: 33,
    },
    blue: {
      r: 69,
      g: 133,
      b: 136,
    },
    purple: {
      r: 177,
      g: 98,
      b: 134,
    },
    aqua: {
      r: 104,
      g: 157,
      b: 106,
    },
    orange: {
      r: 214,
      g: 93,
      b: 14,
    },
    foreground: {
      r: 168,
      g: 153,
      b: 132,
    },
  },
  darkStrong: {
    background: {
      r: 146,
      g: 131,
      b: 116,
    },
    red: {
      r: 251,
      g: 73,
      b: 52,
    },
    green: {
      r: 184,
      g: 187,
      b: 38,
    },
    yellow: {
      r: 250,
      g: 189,
      b: 47,
    },
    blue: {
      r: 131,
      g: 165,
      b: 152,
    },
    purple: {
      r: 211,
      g: 134,
      b: 155,
    },
    aqua: {
      r: 142,
      g: 192,
      b: 124,
    },
    orange: {
      r: 254,
      g: 128,
      b: 25,
    },
    foreground: {
      r: 235,
      g: 219,
      b: 178,
    },
  },
  lightMuted: {
    background: {
      r: 251,
      g: 241,
      b: 199,
    },
    red: {
      r: 204,
      g: 36,
      b: 29,
    },
    green: {
      r: 152,
      g: 151,
      b: 26,
    },
    yellow: {
      r: 215,
      g: 153,
      b: 33,
    },
    blue: {
      r: 69,
      g: 133,
      b: 136,
    },
    purple: {
      r: 177,
      g: 98,
      b: 134,
    },
    aqua: {
      r: 104,
      g: 157,
      b: 106,
    },
    orange: {
      r: 214,
      g: 93,
      b: 14,
    },
    foreground: {
      r: 124,
      g: 111,
      b: 100,
    },
  },
  lightStrong: {
    backgrond: {
      r: 146,
      g: 131,
      b: 116,
    },
    red: {
      r: 157,
      g: 0,
      b: 6,
    },
    green: {
      r: 121,
      g: 116,
      b: 14,
    },
    yellow: {
      r: 181,
      g: 118,
      b: 20,
    },
    blue: {
      r: 7,
      g: 102,
      b: 120,
    },
    purple: {
      r: 143,
      g: 63,
      b: 113,
    },
    aqua: {
      r: 66,
      g: 123,
      b: 88,
    },
    orange: {
      r: 175,
      g: 58,
      b: 3,
    },
    foreground: {
      r: 60,
      g: 56,
      b: 54,
    },
  },
  darkBackground: {
    0: {
      r: 29,
      g: 32,
      b: 33,
    },
    1: {
      r: 50,
      g: 48,
      b: 47,
    },
    2: {
      r: 60,
      g: 56,
      b: 54,
    },
    3: {
      r: 80,
      g: 73,
      b: 69,
    },
    4: {
      r: 102,
      g: 91,
      b: 84,
    },
    5: {
      r: 124,
      g: 111,
      b: 100,
    },
  },
  darkForeground: {
    0: {
      r: 251,
      g: 241,
      b: 199,
    },
    1: {
      r: 251,
      g: 241,
      b: 199,
    },
    2: {
      r: 235,
      g: 219,
      b: 178,
    },
    3: {
      r: 213,
      g: 196,
      b: 161,
    },
    4: {
      r: 189,
      g: 174,
      b: 147,
    },
    5: {
      r: 168,
      g: 153,
      b: 132,
    },
  },
  lightBackground: {
    0: {
      r: 249,
      g: 245,
      b: 215,
    },
    1: {
      r: 242,
      g: 229,
      b: 188,
    },
    2: {
      r: 235,
      g: 219,
      b: 178,
    },
    3: {
      r: 213,
      g: 196,
      b: 161,
    },
    4: {
      r: 189,
      g: 174,
      b: 147,
    },
    5: {
      r: 168,
      g: 153,
      b: 132,
    },
  },
  lightForeground: {
    0: {
      r: 40,
      g: 40,
      b: 40,
    },
    1: {
      r: 40,
      g: 40,
      b: 40,
    },
    2: {
      r: 60,
      g: 56,
      b: 54,
    },
    3: {
      r: 80,
      g: 73,
      b: 69,
    },
    4: {
      r: 102,
      g: 92,
      b: 84,
    },
    5: {
      r: 124,
      g: 111,
      b: 100,
    },
  },
};
