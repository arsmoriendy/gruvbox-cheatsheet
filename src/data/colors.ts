export type ColorValues = {
  hex: string;
  rgb: string;
  hsl: string;
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
          rgb: "rgb(40,40,40)",
          hsl: "hsl(0,0%,16%)",
        },
        strong: {
          hex: "#928374",
          rgb: "rgb(146,131,116)",
          hsl: "hsl(30,12%,51%)",
        },
      },
      red: {
        muted: {
          hex: "#CC241D",
          rgb: "rgb(204,36,29)",
          hsl: "hsl(2,75%,46%)",
        },
        strong: {
          hex: "#FB4934",
          rgb: "rgb(251,73,52)",
          hsl: "hsl(6,96%,59%)",
        },
      },
      green: {
        muted: {
          hex: "#98971A",
          rgb: "rgb(152,151,26)",
          hsl: "hsl(60,71%,35%)",
        },
        strong: {
          hex: "#B8BB26",
          rgb: "rgb(184,187,38)",
          hsl: "hsl(61,66%,44%)",
        },
      },
      yellow: {
        muted: {
          hex: "#D79921",
          rgb: "rgb(215,153,33)",
          hsl: "hsl(40,73.4%,48.6%)",
        },
        strong: {
          hex: "#FABD2F",
          rgb: "rgb(250,189,47)",
          hsl: "hsl(42,95.3%,58.2%)",
        },
      },
      blue: {
        muted: {
          hex: "#458588",
          rgb: "rgb(69,133,136)",
          hsl: "hsl(183,32.7%,40.2%)",
        },
        strong: {
          hex: "#83A598",
          rgb: "rgb(131,165,152)",
          hsl: "hsl(157,15.9%,58%)",
        },
      },
      purple: {
        muted: {
          hex: "#B16286",
          rgb: "rgb(177,98,134)",
          hsl: "hsl(333,33.6%,53.9%)",
        },
        strong: {
          hex: "#D3869B",
          rgb: "rgb(211,134,155)",
          hsl: "hsl(344,46.7%,67.6%)",
        },
      },
      aqua: {
        muted: {
          hex: "#689D6A",
          rgb: "rgb(104,157,106)",
          hsl: "hsl(122,21.3%,51.2%)",
        },
        strong: {
          hex: "#8EC07C",
          rgb: "rgb(142,192,124)",
          hsl: "hsl(104,35.1%,62%)",
        },
      },
      orange: {
        muted: {
          hex: "#D65D0E",
          rgb: "rgb(214,93,14)",
          hsl: "hsl(24,87.7%,44.7%)",
        },
        strong: {
          hex: "#FE8019",
          rgb: "rgb(254,128,25)",
          hsl: "hsl(27,99.1%,54.7%)",
        },
      },
      foreground: {
        muted: {
          hex: "#A89984",
          rgb: "rgb(168,153,132)",
          hsl: "hsl(35,17.1%,58.8%)",
        },
        strong: {
          hex: "#EBDBB2",
          rgb: "rgb(235,219,178)",
          hsl: "hsl(43,58.8%,81%) ",
        },
      },
    },
    monochrome: [
      {
        background: {
          hex: "#1D2021",
          rgb: "rgb(29,32,33)",
          hsl: "hsl(195,6.5%,12.2%)",
        },
        foreground: {
          hex: "#FBF1C7",
          rgb: "rgb(251,241,199)",
          hsl: "hsl(48,86.7%,88.2%)",
        },
      },
      {
        background: {
          hex: "#32302F",
          rgb: "rgb(50,48,47)",
          hsl: "hsl(20,3.1%,19%)",
        },
        foreground: {
          hex: "#FBF1C7",
          rgb: "rgb(251,241,199)",
          hsl: "hsl(48,86.7%,88.2%)",
        },
      },
      {
        background: {
          hex: "#3C3836",
          rgb: "rgb(60,56,54)",
          hsl: "hsl(20,5.3%,22.4%)",
        },
        foreground: {
          hex: "#EBDBB2",
          rgb: "rgb(235,219,178)",
          hsl: "hsl(43,58.8%,81%)",
        },
      },
      {
        background: {
          hex: "#504945",
          rgb: "rgb(80,73,69)",
          hsl: "hsl(22,7.4%,29.2%)",
        },
        foreground: {
          hex: "#D5C4A1",
          rgb: "rgb(213,196,161)",
          hsl: "hsl(40,38.2%,73.3%)",
        },
      },
      {
        background: {
          hex: "#665C54",
          rgb: "rgb(102,92,84)",
          hsl: "hsl(27,9.7%,36.5%)",
        },
        foreground: {
          hex: "#BDAE93",
          rgb: "rgb(189,174,147)",
          hsl: "hsl(39,24.1%,65.9%)",
        },
      },
      {
        background: {
          hex: "#7C6F64",
          rgb: "rgb(124,111,100)",
          hsl: "hsl(28,10.7%,43.9%)",
        },
        foreground: {
          hex: "#A89984",
          rgb: "rgb(168,153,132)",
          hsl: "hsl(35,17.1%,58.8%)",
        },
      },
    ],
  },
  lightMode: {
    colors: {
      background: {
        muted: {
          hex: "#FBF1C7",
          rgb: "rgb(251,241,199)",
          hsl: "hsl(48,86.7%,88.2%)",
        },
        strong: {
          hex: "#928374",
          rgb: "rgb(146,131,116)",
          hsl: "hsl(30,12.1%,51.4%)",
        },
      },
      red: {
        muted: {
          hex: "#CC241D",
          rgb: "rgb(204,36,29)",
          hsl: "hsl(2,75.1%,45.7%)",
        },
        strong: {
          hex: "#9d0006",
          rgb: "rgb(157,0,6)",
          hsl: "hsl(358,100%,30.8%)",
        },
      },
      green: {
        muted: {
          hex: "#98971A",
          rgb: "rgb(152,151,26)",
          hsl: "hsl(60,70.8%,34.9%)",
        },
        strong: {
          hex: "#79740E",
          rgb: "rgb(121,116,14)",
          hsl: "hsl(57,79.3%,26.5%)",
        },
      },
      yellow: {
        muted: {
          hex: "#D79921",
          rgb: "rgb(215,153,33)",
          hsl: "hsl(40,73.4%,48.6%)",
        },
        strong: {
          hex: "#B57614",
          rgb: "rgb(181,118,20)",
          hsl: "hsl(37,80.1%,39.4%)",
        },
      },
      blue: {
        muted: {
          hex: "#458588",
          rgb: "rgb(69,133,136)",
          hsl: "hsl(183,32.7%,40.2%)",
        },
        strong: {
          hex: "#076678",
          rgb: "rgb(7,102,120)",
          hsl: "hsl(190,89%,24.9%)",
        },
      },
      purple: {
        muted: {
          hex: "#B16286",
          rgb: "rgb(177,98,134)",
          hsl: "hsl(333,33.6%,53.9%)",
        },
        strong: {
          hex: "#8F3F71",
          rgb: "rgb(143,63,113)",
          hsl: "hsl(323,38.8%,40.4%)",
        },
      },
      aqua: {
        muted: {
          hex: "#689D6A",
          rgb: "rgb(104,157,106)",
          hsl: "hsl(122,21.3%,51.2%)",
        },
        strong: {
          hex: "#427B58",
          rgb: "rgb(66,123,88)",
          hsl: "hsl(143,30.2%,37.1%)",
        },
      },
      orange: {
        muted: {
          hex: "#D65D0E",
          rgb: "rgb(214,93,14)",
          hsl: "hsl(24,87.7%,44.7%)",
        },
        strong: {
          hex: "#AF3A03",
          rgb: "rgb(175,58,3)",
          hsl: "hsl(19,96.6%,34.9%)",
        },
      },
      foreground: {
        muted: {
          hex: "#7C6F64",
          rgb: "rgb(124,111,100)",
          hsl: "hsl(28,10.7%,43.9%)",
        },
        strong: {
          hex: "#3C3836",
          rgb: "rgb(60,56,54)",
          hsl: "hsl(20,5.3%,22.4%)",
        },
      },
    },
    monochrome: [
      {
        background: {
          hex: "#F9F5D7",
          rgb: "rgb(249,245,215)",
          hsl: "hsl(53,73.9%,91%)",
        },
        foreground: {
          hex: "#282828",
          rgb: "rgb(40,40,40)",
          hsl: "hsl(0,0%,15.7%)",
        },
      },
      {
        background: {
          hex: "#F2E5BC",
          rgb: "rgb(242,229,188)",
          hsl: "hsl(46,67.5%,84.3%)",
        },
        foreground: {
          hex: "#282828",
          rgb: "rgb(40,40,40)",
          hsl: "hsl(0,0%,15.7%)",
        },
      },
      {
        background: {
          hex: "#EBDBB2",
          rgb: "rgb(235,219,178)",
          hsl: "hsl(43,58.8%,81%)",
        },
        foreground: {
          hex: "#3C3836",
          rgb: "rgb(60,56,54)",
          hsl: "hsl(20,5.3%,22.4%)",
        },
      },
      {
        background: {
          hex: "#D5C4A1",
          rgb: "rgb(213,196,161)",
          hsl: "hsl(40,38.2%,73.3%)",
        },
        foreground: {
          hex: "#504945",
          rgb: "rgb(80,73,69)",
          hsl: "hsl(22,7.4%,29.2%)",
        },
      },
      {
        background: {
          hex: "#BDAE93",
          rgb: "rgb(189,174,147)",
          hsl: "hsl(39,24.1%,65.9%)",
        },
        foreground: {
          hex: "#665C54",
          rgb: "rgb(102,92,84)",
          hsl: "hsl(27,9.7%,36.5%)",
        },
      },
      {
        background: {
          hex: "#A89984",
          rgb: "rgb(168,153,132)",
          hsl: "hsl(35,17.1%,58.8%)",
        },
        foreground: {
          hex: "#7C6F64",
          rgb: "rgb(124,111,100)",
          hsl: "hsl(28,10.7%,43.9%) ",
        },
      },
    ],
  },
};
