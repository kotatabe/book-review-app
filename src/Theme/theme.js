import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	typography: {
		fontFamily: [ "ヒラギノ角ゴ Pro W3","Hiragino Kaku Gothic Pro","ヒラギノ角ゴ W3", "メイリオ", "MS Pゴシック", "sans-serif" ].join(','),
	},
});

export default theme;