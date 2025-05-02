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

const wrapSuffix = (formatPrefix: string, str: string) =>
  `${formatPrefix}(${str})`;

export const Stringify = (c: RGB): string => {
  const [{ colorFormat, roundFloats, separator, usePercent, showSuffix }] =
    useContext(SettingsContext);

  const cRound = (x: number) => (roundFloats ? x.toFixed() : x.toFixed(2));
  const percent = usePercent ? "%" : "";

  let str: string;
  let h, s, l, v: number;

  switch (colorFormat) {
    case "hsl":
      [h, s, l] = convert.rgb.hsl.raw(c.r, c.g, c.b);
      str = `${cRound(h)}${separator}${cRound(s)}${percent}${separator}${cRound(l)}${percent}`;
      return showSuffix ? wrapSuffix(colorFormat, str) : str;

    case "rgb":
      const cPercent = (x: number) => {
        if (usePercent) {
          const xp = (x / 255) * 100;
          return `${roundFloats ? Math.round(xp) : xp.toFixed(1)}%`;
        }

        return x;
      };
      str = `${cPercent(c.r)}${separator}${cPercent(c.g)}${separator}${cPercent(c.b)}`;
      return showSuffix ? wrapSuffix(colorFormat, str) : str;

    case "hex":
      return convert.rgb.hex(c.r, c.g, c.b);

    case "hsv":
      [h, s, v] = convert.rgb.hsv.raw(c.r, c.g, c.b);
      str = `${cRound(h)}${separator}${cRound(s)}${percent}${separator}${cRound(v)}${percent}`;
      return showSuffix ? wrapSuffix(colorFormat, str) : str;
  }
};

export type ColorValues = RGB;

export type ColorEntry = {
  muted: ColorValues;
  strong: ColorValues;
};

export type MonoChromeEntry = {
  background: ColorValues;
  foreground: ColorValues;
};

export type ColorEntries = {
  [key: string]: ColorEntry;
};

export type ColorScheme = {
  colors: ColorEntries;
  monochrome: MonoChromeEntry[];
};

export type Colors = {
  darkMode: ColorScheme;
  lightMode: ColorScheme;
};

export const Colors: Colors = {
  darkMode: {
    colors: {
      background: {
        muted: {
          r: 40,
          g: 40,
          b: 40,
        },
        strong: {
          r: 146,
          g: 131,
          b: 116,
        },
      },
      red: {
        muted: {
          r: 204,
          g: 36,
          b: 29,
        },
        strong: {
          r: 251,
          g: 73,
          b: 52,
        },
      },
      green: {
        muted: {
          r: 152,
          g: 151,
          b: 26,
        },
        strong: {
          r: 184,
          g: 187,
          b: 38,
        },
      },
      yellow: {
        muted: {
          r: 215,
          g: 153,
          b: 33,
        },
        strong: {
          r: 250,
          g: 189,
          b: 47,
        },
      },
      blue: {
        muted: {
          r: 69,
          g: 133,
          b: 136,
        },
        strong: {
          r: 131,
          g: 165,
          b: 152,
        },
      },
      purple: {
        muted: {
          r: 177,
          g: 98,
          b: 134,
        },
        strong: {
          r: 211,
          g: 134,
          b: 155,
        },
      },
      aqua: {
        muted: {
          r: 104,
          g: 157,
          b: 106,
        },
        strong: {
          r: 142,
          g: 192,
          b: 124,
        },
      },
      orange: {
        muted: {
          r: 214,
          g: 93,
          b: 14,
        },
        strong: {
          r: 254,
          g: 128,
          b: 25,
        },
      },
      foreground: {
        muted: {
          r: 168,
          g: 153,
          b: 132,
        },
        strong: {
          r: 235,
          g: 219,
          b: 178,
        },
      },
    },
    monochrome: [
      {
        background: {
          r: 29,
          g: 32,
          b: 33,
        },
        foreground: {
          r: 251,
          g: 241,
          b: 199,
        },
      },
      {
        background: {
          r: 50,
          g: 48,
          b: 47,
        },
        foreground: {
          r: 251,
          g: 241,
          b: 199,
        },
      },
      {
        background: {
          r: 60,
          g: 56,
          b: 54,
        },
        foreground: {
          r: 235,
          g: 219,
          b: 178,
        },
      },
      {
        background: {
          r: 80,
          g: 73,
          b: 69,
        },
        foreground: {
          r: 213,
          g: 196,
          b: 161,
        },
      },
      {
        background: {
          r: 102,
          g: 91,
          b: 84,
        },
        foreground: {
          r: 189,
          g: 174,
          b: 147,
        },
      },
      {
        background: {
          r: 124,
          g: 111,
          b: 100,
        },
        foreground: {
          r: 168,
          g: 153,
          b: 132,
        },
      },
    ],
  },
  lightMode: {
    colors: {
      background: {
        muted: {
          r: 251,
          g: 241,
          b: 199,
        },
        strong: {
          r: 146,
          g: 131,
          b: 116,
        },
      },
      red: {
        muted: {
          r: 204,
          g: 36,
          b: 29,
        },
        strong: {
          r: 157,
          g: 0,
          b: 6,
        },
      },
      green: {
        muted: {
          r: 152,
          g: 151,
          b: 26,
        },
        strong: {
          r: 121,
          g: 116,
          b: 14,
        },
      },
      yellow: {
        muted: {
          r: 215,
          g: 153,
          b: 33,
        },
        strong: {
          r: 181,
          g: 118,
          b: 20,
        },
      },
      blue: {
        muted: {
          r: 69,
          g: 133,
          b: 136,
        },
        strong: {
          r: 7,
          g: 102,
          b: 120,
        },
      },
      purple: {
        muted: {
          r: 177,
          g: 98,
          b: 134,
        },
        strong: {
          r: 143,
          g: 63,
          b: 113,
        },
      },
      aqua: {
        muted: {
          r: 104,
          g: 157,
          b: 106,
        },
        strong: {
          r: 66,
          g: 123,
          b: 88,
        },
      },
      orange: {
        muted: {
          r: 214,
          g: 93,
          b: 14,
        },
        strong: {
          r: 175,
          g: 58,
          b: 3,
        },
      },
      foreground: {
        muted: {
          r: 124,
          g: 111,
          b: 100,
        },
        strong: {
          r: 60,
          g: 56,
          b: 54,
        },
      },
    },
    monochrome: [
      {
        background: {
          r: 249,
          g: 245,
          b: 215,
        },
        foreground: {
          r: 40,
          g: 40,
          b: 40,
        },
      },
      {
        background: {
          r: 242,
          g: 229,
          b: 188,
        },
        foreground: {
          r: 40,
          g: 40,
          b: 40,
        },
      },
      {
        background: {
          r: 235,
          g: 219,
          b: 178,
        },
        foreground: {
          r: 60,
          g: 56,
          b: 54,
        },
      },
      {
        background: {
          r: 213,
          g: 196,
          b: 161,
        },
        foreground: {
          r: 80,
          g: 73,
          b: 69,
        },
      },
      {
        background: {
          r: 189,
          g: 174,
          b: 147,
        },
        foreground: {
          r: 102,
          g: 92,
          b: 84,
        },
      },
      {
        background: {
          r: 168,
          g: 153,
          b: 132,
        },
        foreground: {
          r: 124,
          g: 111,
          b: 100,
        },
      },
    ],
  },
};
