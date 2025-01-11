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

export const rgbToString = (rgb: RGB) => `rgb(${rgb.r}, ${rgb.b}, ${rgb.b})`;
export const hslToString = (hsl: HSL) => `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

export type ColorValues = {
  hex: string;
  rgb: RGB;
  hsl: HSL;
};

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
          hex: "#282828",
          rgb: {
            r: 40,
            g: 40,
            b: 40,
          },
          hsl: {
            h: 0,
            s: 0,
            l: 16,
          },
        },
        strong: {
          hex: "#928374",
          rgb: {
            r: 146,
            g: 131,
            b: 116,
          },
          hsl: {
            h: 30,
            s: 12,
            l: 51,
          },
        },
      },
      red: {
        muted: {
          hex: "#CC241D",
          rgb: {
            r: 204,
            g: 36,
            b: 29,
          },
          hsl: {
            h: 2,
            s: 75,
            l: 46,
          },
        },
        strong: {
          hex: "#FB4934",
          rgb: {
            r: 251,
            g: 73,
            b: 52,
          },
          hsl: {
            h: 6,
            s: 96,
            l: 59,
          },
        },
      },
      green: {
        muted: {
          hex: "#98971A",
          rgb: {
            r: 152,
            g: 151,
            b: 26,
          },
          hsl: {
            h: 60,
            s: 71,
            l: 35,
          },
        },
        strong: {
          hex: "#B8BB26",
          rgb: {
            r: 184,
            g: 187,
            b: 38,
          },
          hsl: {
            h: 61,
            s: 66,
            l: 44,
          },
        },
      },
      yellow: {
        muted: {
          hex: "#D79921",
          rgb: {
            r: 215,
            g: 153,
            b: 33,
          },
          hsl: {
            h: 40,
            s: 73.4,
            l: 48.6,
          },
        },
        strong: {
          hex: "#FABD2F",
          rgb: {
            r: 250,
            g: 189,
            b: 47,
          },
          hsl: {
            h: 42,
            s: 95.3,
            l: 58.2,
          },
        },
      },
      blue: {
        muted: {
          hex: "#458588",
          rgb: {
            r: 69,
            g: 133,
            b: 136,
          },
          hsl: {
            h: 183,
            s: 32.7,
            l: 40.2,
          },
        },
        strong: {
          hex: "#83A598",
          rgb: {
            r: 131,
            g: 165,
            b: 152,
          },
          hsl: {
            h: 157,
            s: 15.9,
            l: 58,
          },
        },
      },
      purple: {
        muted: {
          hex: "#B16286",
          rgb: {
            r: 177,
            g: 98,
            b: 134,
          },
          hsl: {
            h: 333,
            s: 33.6,
            l: 53.9,
          },
        },
        strong: {
          hex: "#D3869B",
          rgb: {
            r: 211,
            g: 134,
            b: 155,
          },
          hsl: {
            h: 344,
            s: 46.7,
            l: 67.6,
          },
        },
      },
      aqua: {
        muted: {
          hex: "#689D6A",
          rgb: {
            r: 104,
            g: 157,
            b: 106,
          },
          hsl: {
            h: 122,
            s: 21.3,
            l: 51.2,
          },
        },
        strong: {
          hex: "#8EC07C",
          rgb: {
            r: 142,
            g: 192,
            b: 124,
          },
          hsl: {
            h: 104,
            s: 35.1,
            l: 62,
          },
        },
      },
      orange: {
        muted: {
          hex: "#D65D0E",
          rgb: {
            r: 214,
            g: 93,
            b: 14,
          },
          hsl: {
            h: 24,
            s: 87.7,
            l: 44.7,
          },
        },
        strong: {
          hex: "#FE8019",
          rgb: {
            r: 254,
            g: 128,
            b: 25,
          },
          hsl: {
            h: 27,
            s: 99.1,
            l: 54.7,
          },
        },
      },
      foreground: {
        muted: {
          hex: "#A89984",
          rgb: {
            r: 168,
            g: 153,
            b: 132,
          },
          hsl: {
            h: 35,
            s: 17.1,
            l: 58.8,
          },
        },
        strong: {
          hex: "#EBDBB2",
          rgb: {
            r: 235,
            g: 219,
            b: 178,
          },
          hsl: {
            h: 43,
            s: 58.8,
            l: 81,
          },
        },
      },
    },
    monochrome: [
      {
        background: {
          hex: "#1D2021",
          rgb: {
            r: 29,
            g: 32,
            b: 33,
          },
          hsl: {
            h: 195,
            s: 6.5,
            l: 12.2,
          },
        },
        foreground: {
          hex: "#FBF1C7",
          rgb: {
            r: 251,
            g: 241,
            b: 199,
          },
          hsl: {
            h: 48,
            s: 86.7,
            l: 88.2,
          },
        },
      },
      {
        background: {
          hex: "#32302F",
          rgb: {
            r: 50,
            g: 48,
            b: 47,
          },
          hsl: {
            h: 20,
            s: 3.1,
            l: 19,
          },
        },
        foreground: {
          hex: "#FBF1C7",
          rgb: {
            r: 251,
            g: 241,
            b: 199,
          },
          hsl: {
            h: 48,
            s: 86.7,
            l: 88.2,
          },
        },
      },
      {
        background: {
          hex: "#3C3836",
          rgb: {
            r: 60,
            g: 56,
            b: 54,
          },
          hsl: {
            h: 20,
            s: 5.3,
            l: 22.4,
          },
        },
        foreground: {
          hex: "#EBDBB2",
          rgb: {
            r: 235,
            g: 219,
            b: 178,
          },
          hsl: {
            h: 43,
            s: 58.8,
            l: 81,
          },
        },
      },
      {
        background: {
          hex: "#504945",
          rgb: {
            r: 80,
            g: 73,
            b: 69,
          },
          hsl: {
            h: 22,
            s: 7.4,
            l: 29.2,
          },
        },
        foreground: {
          hex: "#D5C4A1",
          rgb: {
            r: 213,
            g: 196,
            b: 161,
          },
          hsl: {
            h: 40,
            s: 38.2,
            l: 73.3,
          },
        },
      },
      {
        background: {
          hex: "#665C54",
          rgb: {
            r: 102,
            g: 91,
            b: 84,
          },
          hsl: {
            h: 27,
            s: 9.7,
            l: 36.5,
          },
        },
        foreground: {
          hex: "#BDAE93",
          rgb: {
            r: 189,
            g: 174,
            b: 147,
          },
          hsl: {
            h: 39,
            s: 24.1,
            l: 65.9,
          },
        },
      },
      {
        background: {
          hex: "#7C6F64",
          rgb: {
            r: 124,
            g: 111,
            b: 100,
          },
          hsl: {
            h: 28,
            s: 10.7,
            l: 43.9,
          },
        },
        foreground: {
          hex: "#A89984",
          rgb: {
            r: 168,
            g: 153,
            b: 132,
          },
          hsl: {
            h: 35,
            s: 17.1,
            l: 58.8,
          },
        },
      },
    ],
  },
  lightMode: {
    colors: {
      background: {
        muted: {
          hex: "#FBF1C7",
          rgb: {
            r: 251,
            g: 241,
            b: 199,
          },
          hsl: {
            h: 48,
            s: 86.7,
            l: 88.2,
          },
        },
        strong: {
          hex: "#928374",
          rgb: {
            r: 146,
            g: 131,
            b: 116,
          },
          hsl: {
            h: 30,
            s: 12.1,
            l: 51.4,
          },
        },
      },
      red: {
        muted: {
          hex: "#CC241D",
          rgb: {
            r: 204,
            g: 36,
            b: 29,
          },
          hsl: {
            h: 2,
            s: 75.1,
            l: 45.7,
          },
        },
        strong: {
          hex: "#9d0006",
          rgb: {
            r: 157,
            g: 0,
            b: 6,
          },
          hsl: {
            h: 358,
            s: 100,
            l: 30.8,
          },
        },
      },
      green: {
        muted: {
          hex: "#98971A",
          rgb: {
            r: 152,
            g: 151,
            b: 26,
          },
          hsl: {
            h: 60,
            s: 70.8,
            l: 34.9,
          },
        },
        strong: {
          hex: "#79740E",
          rgb: {
            r: 121,
            g: 116,
            b: 14,
          },
          hsl: {
            h: 57,
            s: 79.3,
            l: 26.5,
          },
        },
      },
      yellow: {
        muted: {
          hex: "#D79921",
          rgb: {
            r: 215,
            g: 153,
            b: 33,
          },
          hsl: {
            h: 40,
            s: 73.4,
            l: 48.6,
          },
        },
        strong: {
          hex: "#B57614",
          rgb: {
            r: 181,
            g: 118,
            b: 20,
          },
          hsl: {
            h: 37,
            s: 80.1,
            l: 39.4,
          },
        },
      },
      blue: {
        muted: {
          hex: "#458588",
          rgb: {
            r: 69,
            g: 133,
            b: 136,
          },
          hsl: {
            h: 183,
            s: 32.7,
            l: 40.2,
          },
        },
        strong: {
          hex: "#076678",
          rgb: {
            r: 7,
            g: 102,
            b: 120,
          },
          hsl: {
            h: 190,
            s: 89,
            l: 24.9,
          },
        },
      },
      purple: {
        muted: {
          hex: "#B16286",
          rgb: {
            r: 177,
            g: 98,
            b: 134,
          },
          hsl: {
            h: 333,
            s: 33.6,
            l: 53.9,
          },
        },
        strong: {
          hex: "#8F3F71",
          rgb: {
            r: 143,
            g: 63,
            b: 113,
          },
          hsl: {
            h: 323,
            s: 38.8,
            l: 40.4,
          },
        },
      },
      aqua: {
        muted: {
          hex: "#689D6A",
          rgb: {
            r: 104,
            g: 157,
            b: 106,
          },
          hsl: {
            h: 122,
            s: 21.3,
            l: 51.2,
          },
        },
        strong: {
          hex: "#427B58",
          rgb: {
            r: 66,
            g: 123,
            b: 88,
          },
          hsl: {
            h: 143,
            s: 30.2,
            l: 37.1,
          },
        },
      },
      orange: {
        muted: {
          hex: "#D65D0E",
          rgb: {
            r: 214,
            g: 93,
            b: 14,
          },
          hsl: {
            h: 24,
            s: 87.7,
            l: 44.7,
          },
        },
        strong: {
          hex: "#AF3A03",
          rgb: {
            r: 175,
            g: 58,
            b: 3,
          },
          hsl: {
            h: 19,
            s: 96.6,
            l: 34.9,
          },
        },
      },
      foreground: {
        muted: {
          hex: "#7C6F64",
          rgb: {
            r: 124,
            g: 111,
            b: 100,
          },
          hsl: {
            h: 28,
            s: 10.7,
            l: 43.9,
          },
        },
        strong: {
          hex: "#3C3836",
          rgb: {
            r: 60,
            g: 56,
            b: 54,
          },
          hsl: {
            h: 20,
            s: 5.3,
            l: 22.4,
          },
        },
      },
    },
    monochrome: [
      {
        background: {
          hex: "#F9F5D7",
          rgb: {
            r: 249,
            g: 245,
            b: 215,
          },
          hsl: {
            h: 53,
            s: 73.9,
            l: 91,
          },
        },
        foreground: {
          hex: "#282828",
          rgb: {
            r: 40,
            g: 40,
            b: 40,
          },
          hsl: {
            h: 0,
            s: 0,
            l: 15.7,
          },
        },
      },
      {
        background: {
          hex: "#F2E5BC",
          rgb: {
            r: 242,
            g: 229,
            b: 188,
          },
          hsl: {
            h: 46,
            s: 67.5,
            l: 84.3,
          },
        },
        foreground: {
          hex: "#282828",
          rgb: {
            r: 40,
            g: 40,
            b: 40,
          },
          hsl: {
            h: 0,
            s: 0,
            l: 15.7,
          },
        },
      },
      {
        background: {
          hex: "#EBDBB2",
          rgb: {
            r: 235,
            g: 219,
            b: 178,
          },
          hsl: {
            h: 43,
            s: 58.8,
            l: 81,
          },
        },
        foreground: {
          hex: "#3C3836",
          rgb: {
            r: 60,
            g: 56,
            b: 54,
          },
          hsl: {
            h: 20,
            s: 5.3,
            l: 22.4,
          },
        },
      },
      {
        background: {
          hex: "#D5C4A1",
          rgb: {
            r: 213,
            g: 196,
            b: 161,
          },
          hsl: {
            h: 40,
            s: 38.2,
            l: 73.3,
          },
        },
        foreground: {
          hex: "#504945",
          rgb: {
            r: 80,
            g: 73,
            b: 69,
          },
          hsl: {
            h: 22,
            s: 7.4,
            l: 29.2,
          },
        },
      },
      {
        background: {
          hex: "#BDAE93",
          rgb: {
            r: 189,
            g: 174,
            b: 147,
          },
          hsl: {
            h: 39,
            s: 24.1,
            l: 65.9,
          },
        },
        foreground: {
          hex: "#665C54",
          rgb: {
            r: 102,
            g: 92,
            b: 84,
          },
          hsl: {
            h: 27,
            s: 9.7,
            l: 36.5,
          },
        },
      },
      {
        background: {
          hex: "#A89984",
          rgb: {
            r: 168,
            g: 153,
            b: 132,
          },
          hsl: {
            h: 35,
            s: 17.1,
            l: 58.8,
          },
        },
        foreground: {
          hex: "#7C6F64",
          rgb: {
            r: 124,
            g: 111,
            b: 100,
          },
          hsl: {
            h: 28,
            s: 10.7,
            l: 43.9,
          },
        },
      },
    ],
  },
};
