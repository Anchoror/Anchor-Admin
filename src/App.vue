<template>
	<a-config-provider>
		<router-view v-slot="{ Component }">
			<component :is="Component" />
		</router-view>
	</a-config-provider>
</template>
<script setup lang="ts"></script>
<style scoped></style>
