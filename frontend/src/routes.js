import Home from './components/home/home';
import App from './App';

export default [
	{
		path: '/',
		Component: App,

		children: [
			{
				index: true,
				Component: Home
			}
		]
	}
];
