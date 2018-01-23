<template>
	<div class="header">
		<div class="logo">经销商网络平台管理系统</div>
		<div class="brand"></div>
		<div class="user-info" @click='quit'>退出</div>
	</div>
</template>

<script>
	export default{
		data() {
			return {
			}
		},
		created() {
			
		},
		methods: {
			//退出
			quit(){
				this.$router.push('/login');
			},
		}
	}
</script>

<style scoped>
	.header {
		position: relative;
		/*box-sizing: border-box;*/
		left: 239px;
		height: 70px;
		font-size: 22px;
		line-height: 70px;
		color: #fff;
		background: #1B87F2;
		padding-left: 20px;
		display: flex;
	}
	.logo {
		margin-left: 30px;
		text-align: center;
		width: 300px;
	}
	.brand{
		flex: 1;
	}
	.user-info {
		width: 339px;
		font-size: 16px;
		color: #fff;
	}
</style>