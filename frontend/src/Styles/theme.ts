interface Theme {
  readonly accent: string;
  readonly fontSize: FontSize;
  readonly screenSize: ScreenSize;
  readonly colors: Colors;
}

interface FontSize {
  readonly large: string;
  readonly big: string;
  readonly medium: string;
  readonly regular: string;
}

interface ScreenSize {
  readonly xl: string;
  readonly lg: string;
  readonly md: string;
  readonly sm: string;
}

interface Colors {
  readonly green: string;
  readonly darkGreen: string;
  readonly red: string;
  readonly darkRed: string;
}

const theme: Theme = {
  accent: "#2d3748",
  colors: {
    green: "#2e7d32",
    darkGreen: "#1b5e20",
    red: "#c62828",
    darkRed: "#822727",
  },
  fontSize: {
    large: "2.5rem",
    big: "1.9rem",
    medium: "1.5rem",
    regular: "1.3rem",
  },
  screenSize: {
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
  },
};

export default theme;
