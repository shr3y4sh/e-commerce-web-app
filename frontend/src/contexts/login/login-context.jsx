import { createContext, useContext } from 'react';

export const LoginContext = createContext({
	logged: {
		token: null,
		isLog: false
	},
	setLogged: () => {}
});

export function useLogin() {
	const { logged, setLogged } = useContext(LoginContext);

	return [logged, setLogged];
}
