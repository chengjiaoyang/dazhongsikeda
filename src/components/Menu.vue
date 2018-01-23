<template>
	<div class="menu">
		<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
			<el-radio-button :label="false">展开</el-radio-button>
			<el-radio-button :label="true">收起</el-radio-button>
		</el-radio-group>
		<!--<el-row class="tac">
			<el-col :span="12">-->
				<el-menu :default-active="$route.path"  :collapse="isCollapse" background-color="#24283E" text-color="#fff" active-text-color="#20a0ff" :router="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
					<el-submenu index="1">
						<template slot="title" style="background: rgb(237, 246, 254);">
							<i class=" iconfont icon-dazhong-6"></i>
							<span>基础信息</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="/maintenance" style="padding-left: 55px;">经销商维护</el-menu-item>
							<el-menu-item index="/investigate" style="padding-left: 55px;">问卷查询</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="2">
						<template slot="title">
							<i class="iconfont icon-dazhong-1 "></i>
							<span>任务管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="/taskManage" style="padding-left: 55px;">任务维护</el-menu-item>
							<el-menu-item index="/taskScheManage" style="padding-left: 55px;">任务行程管理</el-menu-item>
							<el-menu-item index="/taskExamine" style="padding-left: 55px;">任务审核</el-menu-item>
							<el-menu-item index="/taskStatusStatic" style="padding-left: 55px;">任务状态统计</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title">
							<i class="iconfont icon-dazhong-4"></i>
							<span>报表</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="/scoreView" style="padding-left: 55px;">得分查看</el-menu-item>
							<el-menu-item index="/scoreStatist" style="padding-left: 55px;">得分统计</el-menu-item>
							<el-menu-item index="/travelState" style="padding-left: 55px;">行程状态得分统计</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title">
							<i class="iconfont icon-dazhong-3"></i>
							<span>申诉</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="/appealReview" style="padding-left: 55px;">申诉审核</el-menu-item>
							<el-menu-item index="/termSetting" style="padding-left: 55px;">申诉期限设置</el-menu-item>
						</el-menu-item-group>
					</el-submenu>

				</el-menu>
			<!--</el-col>
		</el-row>-->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isCollapse: false,
			}
		},

		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			menu() {
				this.$router.push('/login');
			}
		}
	}
</script>

<style scoped="scoped">
	.menu {
		display: block;
		position: absolute;
		width: 239px;
		left: 0;
		top: 0px;
		bottom: 0;
		background-image: linear-gradient(0deg, #24283E 0%, #485173 100%);
		overflow-y: auto;
		overflow-x: hidden;
	}
	
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 240px;
		min-height: 400px;
	}
	
	.el-col-12 {
		width: 240px;
	}
	
	.el-submenu__title i {
		/*color: #02b9e3;*/
		font-size: 28px;
	}
	
	.el-submenu__title span {
		margin-left: 15px;
	}
	
	.el-menu-item.is-active {
		background: rgb(237, 246, 254);
		color: #333;
	}
	
	.el-menu-item:active {
		background: rgb(237, 246, 254);
		color: #333;
	}
	
	.el-menu-item-group__title {
		padding: 0px;
	}
	
	.el-submenu__title {
		background: rgb(237, 246, 254);
	}
	
	.el-menu-item {
		margin-left: 19px;
	}
	
	.el-menu {
		border-right: none;
	}
</style>