import { NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app'
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { lightTheme, darkTheme } from '../src/theme';

function MyApp({ Component, pageProps }: AppProps) {

	return (
		<NextThemesProvider
			defaultTheme="system"
			attribute="class"
			value={{
				light: lightTheme.className,
				dark: darkTheme.className
			}}
		>
			<NextUIProvider>
				<Component
					{...pageProps}
				/>
			</NextUIProvider>
		</NextThemesProvider>
	);
}

export default MyApp;
