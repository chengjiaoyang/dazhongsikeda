<template>
	<div class="taskManage">
		<!--搜索区-->
		<div style="height: 60px; margin-top: 10px;border-bottom: 1px solid #E1E1E1;" v-show="isShow">
			<el-row :gutter="24">
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 90px;line-height: 36px;">所属任务</span>
					<el-input v-model="reqParams.missionName" placeholder="请输入所属任务" @keyup.enter.native="getmissionName($event)"></el-input>
					<ul v-show="nameShow" id="namelist">
						<li v-for="name in nameList" @click="getName(name.missionName)">{{name.missionName}}</li>
					</ul>
				</el-col>
				<el-col :span="19" style="display: flex;">
					<el-button class="btn2" style="background: linear-gradient(34deg, #18AEFF 0%, #1B87F2 100%);" @click="search">查询</el-button>
					<el-button class="btn2" style="background: linear-gradient(35deg, #FFA450 0%, #E57640 100%);" @click="reset">重置</el-button>
					<div @click="hidden" style="flex: 1; text-align: right;line-height: 36px;"><span class="iconfont icon-dazhong-25" style="color: #BEC3E5;"></span></div>
				</el-col>
			</el-row>
		</div>
		<div style="display: flex;" v-show="btnShow">
			<div style="height: 18px; flex: 1;border-bottom: 1px solid #E1E1E1;"></div>
			<div style="width: 40px;padding-left: 10px; line-height: 36px;" @click="show">
				<span class="iconfont icon-dazhong-25 rotate" style="color: #BEC3E5;"></span>
			</div>
		</div>
		<!--表格-->
		<div style="margin-top: 20px;">
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column prop="regionName" label="区域" align="center">
				</el-table-column>
				<el-table-column prop="amount0" label="未录入" align="center" width="100">
				</el-table-column>
				<el-table-column prop="amount1" label="暂存" align="center" width="100">
				</el-table-column>
				<el-table-column prop="amount2" label="已录入" align="center" width="100">
				</el-table-column>
				<el-table-column prop="amount3" label="已初审" align="center" width="100">
				</el-table-column>
				<el-table-column prop="amount4" label="初审失败" align="center" width="100">
				</el-table-column>
				<el-table-column prop="amount5" label="已复审" align="center" width="100">
				</el-table-column>
				<el-table-column prop="amount6" label="复审失败" align="center" width="100">
				</el-table-column>
				<el-table-column prop="amount7" label="已平台审核" align="center" width="100">
				</el-table-column>
				<el-table-column prop="amount8" label="审核失败" align="center" width="100">
				</el-table-column>
				<el-table-column prop="amount9" label="已生成报告" align="center" width="100">
				</el-table-column>
				<el-table-column prop="amount" label="总数" align="center" width="100">
				</el-table-column>
			</el-table>
		</div>
		<!--页码-->
		<!--<div style="text-align: right;margin-top: 10px;">
			<el-pagination @current-change="handleCurrentChange" :current-page.sync="reqParams.pageNo" :page-size="reqParams.pageSize" layout="total,prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>-->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				regionList: [], //内部区域列表
				reqParams: {
					missionName: '',
					brandId: ''
				},
				nameList: [], //智能下拉列表
				nameShow: false,
				isShow: true,
				btnShow: false, //显示的按钮是否显示
			}
		},
		created() {
			//			this.getData();
		},
		methods: {
			//初始化数据
			getData() {
				var self = this;
				if(self.reqParams.missionName != "") {
					self.reqParams.brandId=localStorage.getItem("brandId");
					self.$axios.post('/vwhc/getMissionStatusStatisticsList', self.reqParams)
						.then(res => {
							if(res.data.success == true) {
								self.tableData = res.data.data.regionNameList;
							}
						}).catch(function(error) {
							self.$message.error('请求出错');
						});
				} else {
					self.$message.error('所属任务不能为空');
				}
			},
			//查询
			search() {
				var self = this;
				//				self.reqParams.pageNo = 1;
				//				self.total = 0;
				self.getData();
			},
			//			handleCurrentChange(val) {
			//				this.reqParams.pageNo = val;
			//				this.getData();
			//			},
			//搜索区隐藏
			hidden() {
				this.isShow = false;
				this.btnShow = true;
			},
			//搜索区显示
			show() {
				this.isShow = true;
				this.btnShow = false;
			},
			//重置
			reset() {
				this.reqParams.missionName = '';
				this.tableData = [];
			},
			//智能下拉
			getmissionName(event) {

				var self = this;
				self.nameShow = true;
				self.$axios.post('/vwhc/getmissionNameAll', {
						missionName: self.reqParams.missionName
					})
					.then(res => {
						if(res.data.success == true) {
							if(res.data.data.nameList.length>0){
								self.nameList = res.data.data.nameList;
							}else{
								this.reqParams.missionName="";
								this.nameShow = false;
							}
							
						}
					}).catch(function(error) {
						self.$message.error('请求出错');
					});

			},
			//选择名称
			getName(missionName) {
				this.reqParams.missionName = missionName;
				this.nameShow = false;
			}
		}
	}
</script>

<style scoped="scoped">
	.el-form-item {
		margin-bottom: 22px;
		display: flex;
	}
		#namelist {
		position: absolute;
		z-index: 99;
		left: 40px;
		top: 25px;
		width: 230px;
		/*border: 1px solid #E5E5E0;*/
	}
	
	#namelist li {
		list-style: none;
		background: #fff;
		border: 1px solid #E5E5E0;
		border-bottom: none;
		height: 24px;
		line-height: 24px;
		font-size: 12px;
	}
	.divstyle {
		display: flex;
		font-size: 14px;
		font-weight: 700;
		color: #48576a;
		line-height: 30px;
		margin-bottom: 10px;
	}
	
	.btn2 {
		height: 33px;
		line-height: 33px;
		width: 80px;
		text-align: center;
		padding: 0;
		color: #FFFFFF;
		border: none;
	}
</style>