import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import { visualizer } from 'rollup-plugin-visualizer';
import eslintPlugin from 'vite-plugin-eslint';
import { fileURLToPath, URL } from 'url';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd());
	return {
		plugins: [
			vue(),
			VueSetupExtend(),
			visualizer({
				open: true,
				gzipSize: true,
				brotliSize: true,
			}),
			eslintPlugin({
				include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
			}),
		],
		base: env.VITE_PUBLIC_PATH,
		resolve: {
			// 设置别名
			alias: {
				'~': fileURLToPath(new URL('./', import.meta.url)),
				'@': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},
		// 引入全局的scss变量
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@import "@/styles/var.scss";`,
				},
			},
		},
		server: {
			open: true,
			proxy: {
				'/api': {
					target: env.VITE_APP_BASE_URL, //后台服务器地址
					changeOrigin: true, //是否允许不同源
					secure: false, //支持https
					rewrite: (path) => path.replace(/^\/api/, '/api'),
				},
			},
		},
	};
});
