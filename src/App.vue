<template>
	<a-config-provider>
		<div class="app-container">
			<router-view v-slot="{ Component }">
				<component :is="Component" />
			</router-view>
		</div>
	</a-config-provider>
</template>
<script setup lang="ts"></script>
<style scoped>
.app-container {
	width: 100%;
	min-height: 400px;
}
</style>
