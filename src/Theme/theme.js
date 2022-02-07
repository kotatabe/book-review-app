import { createTheme } from '@mui/material/styles';

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
      main: '#fafafa',
    },
  },
  typography: {
    fontFamily: ['ヒラギノ角ゴ Pro W3', 'Hiragino Kaku Gothic Pro', 'ヒラギノ角ゴ W3', 'メイリオ', 'MS Pゴシック', 'sans-serif'].join(','),
  },
  breakpoints: {
    values: {
      sm: 700,
    },
  },
});

export default theme;
