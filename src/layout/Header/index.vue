<template>
	<a-layout-header class="header">
		<section class="fold-btn-wrapper">
			<a-button size="mini" @click="appStore.setMenuCollapse(!appStore.menuCollapse)">
				<template #icon>
					<MenuFoldOutlined v-if="!appStore.menuCollapse" />
					<MenuUnfoldOutlined v-else />
				</template>
			</a-button>
		</section>

		<a-row align="middle" class="h-100 header-right">
			<a-col :xs="0" :md="10" :lg="10" :xl="12" :xxl="12">
				<Breadcrumb></Breadcrumb>
			</a-col>
			<a-col :xs="24" :md="14" :lg="14" :xl="12" :xxl="12">
				<a-row justify="end" align="middle">
					<a-space size="middle">
						<!-- 项目配置 -->
						<a-tooltip placement="bottom" title="项目配置" arrow-point-at-center>
							<a-button size="mini" type="text">
								<template #icon>
									<SettingOutlined />
								</template>
							</a-button>
						</a-tooltip>

						<!-- 消息通知 -->
						<a-tooltip placement="bottom" title="消息通知" arrow-point-at-center>
							<a-button size="mini" type="text">
								<template #icon>
									<BellOutlined />
								</template>
							</a-button>
						</a-tooltip>

						<!-- 全屏切换 -->
						<a-tooltip placement="bottom" title="全屏切换" arrow-point-at-center>
							<a-button size="mini" type="text">
								<template #icon>
									<ExpandOutlined />
								</template>
							</a-button>
						</a-tooltip>

						<!-- 操作帮助 -->
						<a-tooltip placement="bottom" title="操作帮助" arrow-point-at-center>
							<a-button size="mini" type="text">
								<template #icon>
									<QuestionCircleOutlined />
								</template>
							</a-button>
						</a-tooltip>

						<!-- 管理员账户 -->
						<a-dropdown placement="bottom" @open-change="handleHover">
							<a-row align="middle" :wrap="false" class="user">
								<!-- 管理员头像 -->
								<a-avatar shape="square" :size="34" :src="avatar">
									<template #icon><UserOutlined /></template>
								</a-avatar>
								<span class="username">{{ '管理员' }}</span>
								<DownOutlined class="user-icon-down" :class="{ hasHover: hasHover }" />
							</a-row>
							<template #overlay>
								<a-menu>
									<a-menu-item>
										<template #icon>
											<svg-icon name="menu-people"></svg-icon>
										</template>
										<span>个人中心</span>
									</a-menu-item>
									<a-menu-item>
										<template #icon>
											<svg-icon name="menu-leaf"></svg-icon>
										</template>
										<span>项目地址</span>
									</a-menu-item>
									<a-menu-divider />
									<a-menu-item @click="handleLogout">
										<template #icon>
											<svg-icon name="menu-logout"></svg-icon>
										</template>
										<span>退出登录</span>
									</a-menu-item>
								</a-menu>
							</template>
						</a-dropdown>
					</a-space>
				</a-row>
			</a-col>
		</a-row>
	</a-layout-header>
</template>

<script lang="ts" setup name="Header">
import avatar from '@/assets/images/avatar.jpg';
import router from '@/router';
import { useAppStore, useUserStore } from '@/stores';
import { Modal } from 'ant-design-vue';
// import { useFullScreen } from '@/hooks';

const appStore = useAppStore();
const userStore = useUserStore();
// const { isFullScreen, onToggleFullScreen } = useFullScreen();

// 控制下方向箭头的旋转
const hasHover = ref<boolean>(false);
const handleHover = () => {
	hasHover.value = !hasHover.value;
};

const handleLogout = () => {
	Modal.confirm({
		title: '提示',
		content: h('p', '确定要退出登录？'),
		okText: '确认',
		cancelText: '取消',
		maskClosable: true,
		centered: true,
		onOk() {
			userStore.logout().then(() => {
				router.push('/login');
			});
		},
		onCancel() {},
	});
};
</script>

<style lang="scss" scoped>
.header {
	display: flex;
	align-items: center;
	height: 56px;
	line-height: 56px;
	padding: 0 $padding;
	overflow: hidden;
	background-color: $color-bg-box;
	border-bottom: 1px solid $color-border;

	.header-right {
		flex: 1;
		overflow: hidden;
		margin-left: $padding;
		.user {
			cursor: pointer;
			// &:hover {
			// 	.user-icon-down {
			// 		transform: rotate(180deg);
			// 	}
			// }
			.username {
				margin-left: 10px;
				white-space: nowrap;
				// font-size: ;
			}
			.user-icon-down {
				transition: all 0.4s;
				margin-left: 4px;
				font-size: 10px;
			}
			.hasHover {
				transform: rotate(180deg);
			}
		}
	}
}
</style>
