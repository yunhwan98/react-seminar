import { createTheme, responsiveFontSizes, Theme } from '@mui/material';

import { DARK_MODE_THEME, LIGHT_MODE_THEME } from '../utils/constants';
import { amber, deepOrange, grey, green, lightGreen } from '@mui/material/colors';

export const getAppTheme = (mode: typeof LIGHT_MODE_THEME | typeof DARK_MODE_THEME): Theme => {
	let theme = createTheme({
		palette: {
			mode,
			...(mode === 'light' && {
				// palette values for light mode
				primary: lightGreen,
				divider: lightGreen[200],
				text: {
					primary: grey[900],
					secondary: grey[800],
				},
			}),
		},
	});
	theme = responsiveFontSizes(theme);
	return theme;
};
