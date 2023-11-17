<template>
	<div>
		<router-view v-slot="{ Component, route }">
			<keep-alive>
				<component :is="Component" :key="route.path" />
			</keep-alive>
		</router-view>
	</div>
</template>

<script setup lang="ts" name="ParentView"></script>

<style lang="scss" scoped></style>
