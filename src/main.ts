import { createApp } from 'vue';
import pinia from '@/stores';

import router from './router';
import App from './App.vue';

// antdUI
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

// antdIcon & svgIcon
import * as Icons from '@ant-design/icons-vue';
import SvgIcon from '@/components/SvgIcon/index.vue';
import 'virtual:svg-icons-register';

const app = createApp(App);

// 注册icons
Object.keys(Icons).map((key) => {
	app.component(key, Icons[key as keyof typeof Icons]);
});

app.use(router).use(pinia).use(Antd).component('svg-icon', SvgIcon).mount('#app');
