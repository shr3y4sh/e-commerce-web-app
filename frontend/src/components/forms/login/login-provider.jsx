import { useState } from 'react';

import { LoginContext } from './login-context';

export function LoginProvider({ children }) {
	const [logged, setLogged] = useState({
		token: null,
		isLog: false
	});

	return (
		<LoginContext.Provider value={{ logged, setLogged }}>
			{children}
		</LoginContext.Provider>
	);
}
