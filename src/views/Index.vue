<template>
	<div class="wrapper">
		<!--<v-head></v-head>-->
		<!--<side-menu></side-menu>-->
		<!--头部-->
		<div :class="isCollapse==false?'header':'header1'">
			<div style="width: 100%;display: flex;" :class="selected==3?'bgskd':'bgdz'">
				<div class="logo">
					<el-radio-group v-model="isCollapse">
						<el-radio :label="false" v-show="isCollapse==true"><i class="iconfont icon-dazhong-2"></i></el-radio>
						<el-radio :label="true" v-show="isCollapse==false"><i class="iconfont icon-dazhong-2"></i></el-radio>
					</el-radio-group>
					经销商网络平台管理系统
				</div>
				<div class="brand">
					<ul>
						<li :class="selected==3?'active':''" @click="getBrand('2')"><i class="iconfont icon-dazhong-35"></i>&nbsp;大众</li>
						<li >&nbsp;&nbsp;| &nbsp;&nbsp; </li>
						<li :class="selected==2?'active':''" @click="getBrand('3')"><i class="iconfont icon-dazhong--"></i>&nbsp;斯柯达</li>
					</ul>
				</div>
				<div :class="isCollapse==false?'user-info':'user-info1'" @click='quit'>退出</div>
			</div>
		</div>
		<div :class="isCollapse==false?'menu':'menu1'">
			<el-menu :default-active="$route.path" :collapse="isCollapse" :router="true" class="el-menu-vertical-demo" background-color="#24283E" text-color="#fff" active-text-color="#20a0ff">
				<el-submenu v-for="(menu,index) in menuList" :key="index" :index="menu.id | changetostr">
					<template slot="title" style="background: rgb(237, 246, 254);">
						<i class="iconfont icon-dazhong-6"></i>
						<span>{{menu.name}}</span>
					</template>
					<el-menu-item-group>
						<el-menu-item v-for="child in menu.subPermissionList" :key="child.targetPage" :index="child.targetPage" style="padding-left: 55px;">{{child.name}}</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</el-menu>
		</div>
		<div :class="isCollapse==false?'content':'content1'">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import vHead from '../components/Header.vue';
	import sideMenu from '../components/Menu.vue';
	export default {
		data() {
			return {
				isCollapse: false,
				menuList: [], //菜单列表
				selected: 2, //当前位置
			}
		},
		created() {
			// this.selected=localStorage.getItem("brandId");
			// var userRole = JSON.parse(localStorage.getItem("userRole"))[0];
			// console.log(userRole);
			// this.menuList = userRole.permissionList;

		},
		methods: {
			//退出
			quit() {
				this.$router.push('/login');
			},
			menu() {
				this.$router.push('/login');
			},
			//品牌切换
			getBrand(brandId) {
//				alert(brandId);
				localStorage.setItem("brandId",brandId);
				this.selected = brandId;
				window.location.reload();
			}
		},
		components: {
			vHead,
			sideMenu
		},
	}
</script>

<style>
	.wrapper {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	/*头部css*/

	.bgdz {
		background: #1B87F2;
	}

	.bgskd {
		background: #1FAC78;
	}

	.header {
		position: relative;
		/*box-sizing: border-box;*/
		left: 239px;
		height: 70px;
		font-size: 22px;
		line-height: 70px;
		color: #fff;
		/*padding-left: 20px;*/
		display: flex;
	}

	.header1 {
		position: relative;
		/*box-sizing: border-box;*/
		left: 64px;
		height: 70px;
		font-size: 22px;
		line-height: 70px;
		color: #fff;
		background: #1B87F2;
		padding-left: 20px;
		display: flex;
	}

	.logo {
		/*margin-left: 30px;*/
		text-align: center;
		width: 300px;
	}

	.brand {
		flex: 1;
	}

	.user-info {
		width: 339px;
		font-size: 16px;
		color: #fff;
	}

	.user-info1 {
		width: 169px;
		font-size: 16px;
		color: #fff;
	}
	/*menu的css*/

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

	.menu1 {
		display: block;
		position: absolute;
		width: 64px;
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

	.el-menu {
		border-right: none;
	}
	/*content样式*/

	.content {
		background: none repeat scroll 0 0 #F3F3F5;
		position: absolute;
		left: 239px;
		right: 0;
		top: 70px;
		bottom: 0;
		width: auto;
		overflow-x: hidden;
	}

	.content1 {
		background: none repeat scroll 0 0 #F3F3F5;
		position: absolute;
		left: 64px;
		right: 0;
		top: 70px;
		bottom: 0;
		width: auto;
		overflow-x: hidden;
	}
	/*菜单展开收起样式*/

	.el-radio__inner {
		height: 0;
		width: 0;
		border: 0;
	}

	.el-radio__inner::after {
		height: 0;
		width: 0;
	}

	.el-radio__input.is-checked .el-radio__inner {
		border-color: #FFFFFF;
		background: #FFFFFF;
	}

	.el-radio {
		color: #FFFFFF;
		font-weight: 500;
		line-height: 1;
		cursor: pointer;
		white-space: nowrap;
		outline: 0;
	}

	.el-radio__input.is-checked+.el-radio__label {
		color: #FFFFFF;
	}

	.el-radio+.el-radio {
		margin-left: 0px;
	}
	/*大众和斯柯达切换*/

	.brand {
		padding-left: 20%;
	}

	.brand ul {
		width: 100%;
	}

	.brand li {
		float: left;
		font-size: 16px;
	}

	li {
		list-style: none;
	}

	.active {
		opacity: 0.5;
	}
</style>
