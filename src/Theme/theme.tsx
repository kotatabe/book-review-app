import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    border: {
      main: string;
    };
  }
  interface PaletteOptions {
    border?: {
      main?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#4ea6cc',
    },
    secondary: {
      main: '#e6ee9c',
    },
    border: {
      main: '#e0e0e0',
    },
    background: {
      default: '#fafafa',
    },
  },
  typography: {
    fontFamily: [
      'ヒラギノ角ゴ Pro W3',
      'Hiragino Kaku Gothic Pro',
      'ヒラギノ角ゴ W3',
      'メイリオ',
      'MS Pゴシック',
      'sans-serif',
    ].join(','),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 700,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
