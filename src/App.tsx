import { FC, useEffect, useMemo, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout';
import { PageDefault } from './components/PageDefault';

import { AppContext, ThemeModeContext } from './contexts';
import { AppClient } from './clients';
import { routes } from './config';
import { Route as AppRoute } from './types';
import { getAppTheme } from './styles/theme';
import { DARK_MODE_THEME, LIGHT_MODE_THEME } from './utils/constants';
import { parsing } from './utils/crawl';
import { Home } from './pages/Home';
import { children } from 'cheerio/lib/api/traversing';
import Search from './pages/Search';
import Detail from './pages/Detail';

function App() {
	const [mode, setMode] = useState<typeof LIGHT_MODE_THEME | typeof DARK_MODE_THEME>(DARK_MODE_THEME);
	const appClient = new AppClient();

	const themeMode = useMemo(
		() => ({
			toggleThemeMode: () => {
				setMode((prevMode) => (prevMode === LIGHT_MODE_THEME ? DARK_MODE_THEME : LIGHT_MODE_THEME));
			},
		}),
		[]
	);

	const theme = useMemo(() => getAppTheme(mode), [mode]);

	const addRoute = (route: AppRoute) => (
		<Route key={route.key} path={route.path} element={route.component || PageDefault} />
	);

	return (
		//전역상태 관리
		<AppContext.Provider value={appClient}>
			{/* 테마모드 관리 */}
			<ThemeModeContext.Provider value={themeMode}>
				{/* //테마 적용 */}
				<ThemeProvider theme={theme}>
					<CssBaseline />
					{/* 페이지 라우팅 */}
					<Routes>
						{/* 레이아웃 */}
						<Route element={<Layout />}>
							<Route path='/' element={<Home />}></Route>
							<Route path='/search' element={<Search />}></Route>
							<Route path='/detail/:id' element={<Detail />}></Route>

							{/* {routes.map((route: AppRoute) =>
									//subRoutes가 있는 경우, subRoutes에도 Route 생성
									route.subRoutes ? route.subRoutes.map((item: AppRoute) => addRoute(item)) : addRoute(route)
								)} */}
						</Route>
					</Routes>
				</ThemeProvider>
			</ThemeModeContext.Provider>
		</AppContext.Provider>
	);
}

export default App;
