<template>
	<div class="login">
		<div class="login-box">
			<div class="login-left">
				<img class="login-img" :src="loginImg" />
			</div>
			<div class="login-right">
				<a-form ref="formRef" :model="formState" name="normal_login" class="login-form" :rules="rules">
					<h3 class="login-form-title"><span>Admin Pro</span></h3>
					<a-form-item name="username">
						<a-input v-model:value="formState.username" placeholder="账号">
							<template #prefix>
								<UserOutlined />
							</template>
						</a-input>
					</a-form-item>

					<a-form-item name="password">
						<a-input-password v-model:value="formState.password" placeholder="密码">
							<template #prefix>
								<LockOutlined />
							</template>
						</a-input-password>
					</a-form-item>

					<a-form-item>
						<a-row justify="space-between" align="center" class="w-100">
							<a-form-item name="remember" no-style>
								<a-checkbox v-model:checked="formState.remember">记住密码</a-checkbox>
							</a-form-item>
							<a href="">忘记密码</a>
						</a-row>
					</a-form-item>

					<a-form-item>
						<a-space direction="vertical" class="w-100">
							<a-button :disabled="disabled" type="primary" block @click="handleLogin"> 登录 </a-button>
							<a-button :disabled="disabled" type="info" block> 注册 </a-button>
						</a-space>
					</a-form-item>
				</a-form>
			</div>
		</div>

		<div class="login-footer">
			<span>Copyright © 2018-2023 anchor.cn All Rights Reserved.</span>
		</div>
		<LoginBg></LoginBg>
	</div>
</template>

<script lang="ts" setup name="login">
import LoginBg from './loginBg/index.vue';
import loginImg from '@/assets/images/login-img.png';
import type { Rule } from 'ant-design-vue/es/form';
import { useUserStore } from '@/stores';
import { message } from 'ant-design-vue';

// 类型声明
interface loginForm {
	username: string;
	password: string;
	remember: boolean;
}
const router = useRouter();
const formRef = ref();
const formState = ref<loginForm>({
	username: 'admin',
	password: '123456',
	remember: false,
});
const disabled = ref<boolean>(false);

const handleLogin = () => {
	formRef.value
		.validate()
		.then(() => {
			// console.log('yes');
			useUserStore()
				.login({
					username: formState.value.username,
					password: formState.value.password,
				})
				.then((res) => {
					console.log('res', res);
					router.push({
						path: '/',
					});
					message.success('登录成功');
				});
		})
		.catch((error: any) => {
			console.log('error', error);
		});
};

const rules: Record<string, Rule[]> = {
	username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};
</script>

<style lang="scss" scoped>
.login {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	&-box {
		width: 720px;
		height: 380px;
		display: flex;
		z-index: 999;
		box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.08);
		border-radius: $radius-box;
	}
	&-footer {
		position: absolute;
		top: auto;
		bottom: 12px;
		color: $color-text-5;
		font-size: 12px;
		z-index: 10;
	}
}
.login-left {
	flex: 1;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	overflow: hidden;
	background: linear-gradient(60deg, $color-theme, $color-theme-sub1);
	border-radius: $radius-box 0 0 $radius-box;
	.login-img {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		transition: all 0.3s;
		object-fit: cover;
	}
}
.login-right {
	width: 270px;
	height: 100%;
	background: $color-bg-box;
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 30px;
	box-sizing: border-box;
	border-radius: 0 $radius-box $radius-box 0;
	.login-form-title {
		color: $color-text-1;
		font-weight: 500;
		font-size: 20px;
		line-height: 32px;
		margin-bottom: 20px;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		.logo {
			width: 32px;
			height: 32px;
			margin-right: 6px;
		}
	}
}
</style>
