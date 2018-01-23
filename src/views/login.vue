<template>
	<div class="login-wrap">
		<div class="ms-title">经销商网络平台管理系统</div>
		<div class="ms-login">
			<el-form :model="ruleForm2" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
				<el-form-item label="用户名" prop="userName">
					<el-input v-model="ruleForm2.userName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item>

					<el-button @click="resetForm('ruleForm2')">重置</el-button>
					<el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else {
					if(this.ruleForm2.password !== '') {
						this.$refs.ruleForm2.validateField('password');
					}
					callback();
				}
			};
			var validateUser = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入用户名'));
				} else {
					if(this.ruleForm2.userName !== '') {
						this.$refs.ruleForm2.validateField('userName');
					}
					callback();
				}
			};
			return {
				ruleForm2: {
					userName: '',
					password: '',
				},
				rules2: {
					password: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					userName: [{
						validator: validateUser,
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						var self=this;
						self.$axios.post('/vwhc/rest/user/login', self.ruleForm2)
							.then(res => {
								if(res.data.success == true) {
									sessionStorage.setItem("username",res.data.data.userName);
									sessionStorage.setItem("userId",res.data.data.id);
									localStorage.setItem("userRole",JSON.stringify(res.data.data.userRoleList));
									localStorage.setItem("brandId",2);
									self.$router.push('/index');
								} else {
									self.$message.error(res.data.msg);
								}
							}).catch(function(error) {
								self.$message.error(error);
							});
												
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style scoped="scoped">
	.login-wrap {
		width: 100%;
		height: 100%;
		background: #1c2438;
	}
	
	.ms-title {
		position: absolute;
		top: 50%;
		width: 100%;
		margin-top: -230px;
		text-align: center;
		font-size: 30px;
		color: #fff;
	}
	
	.ms-login {
		position: absolute;
		left: 53%;
		top: 50%;
		width: 300px;
		height: auto;
		margin: -150px 0 0 -210px;
		padding: 40px 40px 40px 0px;
		border-radius: 5px;
		background: #fff;
	}
	
	.login-btn {
		text-align: center;
	}
	
	.login-btn button {
		width: 100%;
		height: 36px;
	}
	
	.ivu-form .ivu-form-item-label {
		text-align: left;
		vertical-align: middle;
		float: left;
		font-size: 12px;
		color: #495060;
		line-height: 1;
		padding: 10px 12px 10px 0;
	}
</style>