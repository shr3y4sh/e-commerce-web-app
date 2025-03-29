import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { LoginProvider } from './components/forms/login/login-provider';
import Home from './components/home/home';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<LoginProvider>
				<Home />
			</LoginProvider>
		</QueryClientProvider>
	);
}

export default App;
