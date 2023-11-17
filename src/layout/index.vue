<template>
	<a-layout class="layout">
		<Asider />
		<a-layout>
			<Header />
			<Tabs />
			<Main />
		</a-layout>
	</a-layout>
</template>
<script lang="ts" setup name="layout">
import Asider from './Asider/index.vue';
import Header from './Header/index.vue';
import Tabs from './Tabs/index.vue';
import Main from './Main/index.vue';
</script>

<style lang="scss" scoped>
.layout {
	height: 100%;
	width: 100%;
	background-color: $color-bg;
}
</style>
