import {
	Home as HomeIcon,
	BarChartOutlined as DashboardIcon,
	CodeOutlined as CodeIcon,
	GitHub as GitHubIcon,
	Public as PublicIcon,
	PublicOff as PrivateIcon,
	AccountBoxRounded as UserIcon,
	SettingsOutlined as SettingsIcon,
	ListAlt as ListIcon,
	CreditCard as BillingIcon,
} from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';

import { Home } from '../pages/Home';
import Main from '../pages/Search';

import { Route } from '../types/Route';
import Search from '../pages/Search';
import Detail from '../pages/Detail';
import { Layout } from '../components/Layout';

const routes: Array<Route> = [
	{
		key: 'router-home',
		title: 'Home',
		description: 'Home',
		path: '/',
		component: Home,
		isEnabled: true,
		icon: HomeIcon,
		appendDivider: true,
	},
	{
		key: 'router-search',
		title: 'Search',
		description: 'Search',
		path: '/search',
		component: Search,
		isEnabled: true,
		icon: SearchIcon,
		// appendDivider: true,
	},
	// {
	// 	key: 'router-detail',
	// 	title: 'Detail',
	// 	description: 'Detail',
	// 	path: '/detail/:id',
	// 	component: Detail,
	// 	isEnabled: true,
	// 	// icon: HomeIcon,
	// 	// appendDivider: true,
	// },
	// {
	// 	key: 'router-dashboard',
	// 	title: 'Dashboard',
	// 	description: 'Dashboard',
	// 	path: '/dashboard',
	// 	isEnabled: true,
	// 	icon: DashboardIcon,
	// },
	// {
	// 	key: 'router-gh',
	// 	title: 'GitHub',
	// 	description: 'GitHub',
	// 	isEnabled: true,
	// 	icon: GitHubIcon,
	// 	subRoutes: [
	// 		{
	// 			key: 'router-gh-public',
	// 			title: 'Public Repos',
	// 			description: 'Public Repos',
	// 			path: '/gh/public',
	// 			isEnabled: true,
	// 			icon: PublicIcon,
	// 		},
	// 		{
	// 			key: 'router-gh-private',
	// 			title: 'Private Repos',
	// 			description: 'Private Repos',
	// 			path: '/gh/private',
	// 			isEnabled: false,
	// 			icon: PrivateIcon,
	// 		},
	// 	],
	// },
	// {
	// 	key: 'router-code',
	// 	title: 'Code Editor',
	// 	description: 'Code Editor',
	// 	path: '/code-editor',
	// 	isEnabled: true,
	// 	icon: CodeIcon,
	// 	appendDivider: true,
	// },
	// {
	// 	key: 'router-my-account',
	// 	title: 'My Account',
	// 	description: 'My Account',
	// 	path: '/account',
	// 	isEnabled: true,
	// 	icon: UserIcon,
	// 	subRoutes: [
	// 		{
	// 			key: 'router-settings',
	// 			title: 'Settings',
	// 			description: 'Account Settings',
	// 			path: '/account/settings',
	// 			isEnabled: true,
	// 			icon: SettingsIcon,
	// 		},
	// 		{
	// 			key: 'router-preferences',
	// 			title: 'Preferences',
	// 			description: 'Account Preferences',
	// 			path: '/account/preferences',
	// 			isEnabled: true,
	// 			icon: ListIcon,
	// 		},
	// 		{
	// 			key: 'router-billing',
	// 			title: 'Billing',
	// 			description: 'Account Billing',
	// 			path: '/account/billing',
	// 			isEnabled: true,
	// 			icon: BillingIcon,
	// 		},
	// 	],
	// },
];

export default routes;
