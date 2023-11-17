<template>
	<div class="logo">
		<svg-icon name="logo1" class="logo-svg" />
		<span>nchor</span>
	</div>
</template>

<script lang="ts" setup name="logo"></script>
<style lang="scss" scoped>
.logo {
	display: flex;
	align-items: flex-end;
	position: relative;
	width: 100%;
	&-svg {
		font-size: 20px;
	}
	span {
		color: $color-text-5;
		font-size: 26px;
		font-weight: bold;
		position: relative;
		top: -16px;
		left: -14px;
		pointer-events: none;
	}
}
</style>
