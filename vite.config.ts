import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import eslintPlugin from 'vite-plugin-eslint';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { viteMockServe } from 'vite-plugin-mock';
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
			AutoImport({
				// 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
				// 这里除了引入 vue 以外还可以引入pinia、vue-router、vueuse等
				imports: ['vue', 'vue-router'],
				// 配置文件生成位置
				dts: 'src/auto-import.d.ts',
				eslintrc: {
					// 1、改为true用于生成eslint配置。2、生成后改回false，避免重复生成消耗
					enabled: false,
				},
			}),
			Components({
				// dirs 指定组件所在位置，默认为 src/components
				// 可以让我们使用自己定义组件的时候免去 import 的麻烦
				dirs: ['src/components/'],
				// 配置需要将哪些后缀类型的文件进行自动按需引入
				extensions: ['vue'],
				// 配置文件生成位置
				dts: 'src/components.d.ts',
			}),
			createSvgIconsPlugin({
				// 指定需要缓存的图标文件夹
				iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
				// 指定symbolId格式
				symbolId: 'icon-[dir]-[name]',
			}),
			viteMockServe({
				mockPath: './src/mock/', // 目录位置
				localEnabled: command === 'serve',
				prodEnabled: command !== 'serve' && true,
				// 这样可以控制关闭mock的时候不让mock打包到最终代码内
				injectCode: `
					import { setupProdMockServer } from '../src/mock/index';
					setupProdMockServer();
				`,
			}),
		],
		base: env.VITE_PUBLIC_PATH,
		resolve: {
			// 设置别名
			alias: {
				'~': fileURLToPath(new URL('./', import.meta.url)),
				'@': fileURLToPath(new URL('./src', import.meta.url)),
			},

			extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
		},
		// 引入全局的scss变量
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@import "@/styles/var.scss";`,
				},
				less: {
					javascriptEnabled: true,
				},
			},
		},
		server: {
			open: true,
			port: 80,
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
