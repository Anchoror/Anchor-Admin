<template>
	<div class="login-bg">
		<div class="bg-logo">
			<svg-icon name="logo1" :size="320" class="bg-logo-svg" />
		</div>
		<div class="bg-circle">
			<div class="bg-circle-content1"></div>
			<div class="bg-circle-content2"></div>
			<div class="fly bg-circle-content3"></div>
			<div class="fly bg-circle-content4"></div>
		</div>
		<div class="bg-text">
			<div class="bg-text-content">ANCHOR</div>
		</div>
	</div>
</template>
<script lang="ts" setup name="loginBg"></script>
<style lang="scss" scoped>
.login-bg {
	width: 100%;
	height: 100%;
	position: fixed;
	overflow: hidden;
	z-index: 1;
	background-color: $color-theme;
	.bg-circle {
		width: 100%;
		height: 100%;
		&-content1 {
			background: linear-gradient(45deg, $color-theme, rgb(105, 158, 255));
			height: 110%;
			aspect-ratio: 1/1;
			border-radius: 50%;
			position: absolute;
			top: 0;
			bottom: auto;
			left: auto;
			right: 0;
			transform: translate(25%, -25%);
		}
		&-content2 {
			background: linear-gradient(45deg, $color-theme, rgb(105, 158, 255));
			height: 170%;
			aspect-ratio: 1/1;
			border-radius: 50%;
			position: absolute;
			top: auto;
			bottom: 0;
			left: 0;
			right: auto;
			transform: translate(-40%, 86%);
		}
		&-content3 {
			background: linear-gradient(45deg, $color-theme, rgb(105, 158, 255));
			height: 18%;
			aspect-ratio: 1/1;
			border-radius: 50%;
			position: absolute;
			top: 40%;
			bottom: auto;
			left: 8%;
			right: auto;
		}
		&-content4 {
			background: linear-gradient(45deg, $color-theme, rgb(105, 158, 255));
			height: 26%;
			aspect-ratio: 1/1;
			border-radius: 50%;
			position: absolute;
			top: 8%;
			bottom: auto;
			left: 28%;
			right: auto;
		}
	}
	.bg-text {
		position: absolute;
		top: 0;
		left: auto;
		right: 0;
		bottom: auto;
		transform: translate(85%, 0);
		&-content {
			font-size: 200px;
			font-weight: bolder;
			transform-origin: top left;
			transform: rotate(90deg);
			color: rgb(105, 158, 255);
			user-select: none;
			pointer-events: none;
		}
	}
	.bg-logo {
		width: 320px;
		height: 180px;
		padding: 0 40px;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1000;
		&-svg {
			width: 100% !important;
			height: 100% !important;
		}
	}

	.fly {
		animation: move 2.5s linear infinite;
	}
}

@keyframes move {
	0% {
		transform: translateY(0px) scale(1);
	}

	50% {
		transform: translateY(25px) scale(1.1);
	}

	100% {
		transform: translateY(0px) scale(1);
	}
}
</style>
