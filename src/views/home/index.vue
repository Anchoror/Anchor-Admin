<template>
	<h1>首页{{ name }}</h1>
	<h1>{{ phone }}</h1>

	<StepBackwardOutlined />

	<svg-icon name="vue" />
</template>

<script lang="ts" setup name="home">
import { useUserStore } from '@/stores';

const name = useUserStore().name;

const phone = ref('2323');
</script>
