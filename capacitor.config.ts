import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'io.github.kozinakate.algospellbook',
	appName: 'Algo Spellbook',
	webDir: 'dist',
	server: {
		androidScheme: 'https',
	},
};

export default config;
