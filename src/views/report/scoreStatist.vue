<template>
	<div class="taskManage">
		<!--搜索区-->
		<div style="height: 60px; margin-top: 10px;border-bottom: 1px solid #E1E1E1;" v-show="isShow">
			<el-row :gutter="24">
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 100px;line-height: 36px;">所属任务：</span>
					<el-input v-model="reqParams.missionName" placeholder="请输入任务名称" clearable></el-input>
				</el-col>
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 100px;line-height: 36px;">内部区域：</span>
					<el-select placeholder="请选择内部区域" v-model="reqParams.district">
						<el-option v-for="item in regionList" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</el-col>
				<el-col :span="14" style="display: flex;">
					<el-button class="btn2" style="background: linear-gradient(34deg, #18AEFF 0%, #1B87F2 100%);" @click="search">查询</el-button>
					<el-button class="btn2" style="background: linear-gradient(34deg, #FFA450 0%, #E57640 100%);" @click="reset">重置</el-button>
					<div @click="hidden" style="flex: 1; text-align: right;line-height: 36px;"><span class="iconfont icon-dazhong-25" style="color: #BEC3E5;"></span></div>
				</el-col>
			</el-row>
		</div>
		<div style="display: flex;" v-show="btnShow">
			<div style="height: 18px; flex: 1;border-bottom: 1px solid #E1E1E1;"></div>
			<div style="width: 40px;padding-left: 10px; line-height: 36px;" @click="show" >
				<span class="iconfont icon-dazhong-25 rotate" style="color: #BEC3E5;"></span>
			</div>
		</div>
		<!--表格-->
		<div style="margin-top: 20px;">
			<el-table :data="tableData" border style="width: 100%" >
				<el-table-column prop="missionName" label="任务名称" align="center" >
				</el-table-column>
				<el-table-column prop="brandName" label="品牌" align="center" width="160">
				</el-table-column>
				<el-table-column prop="startDate" label="开始时间" align="center" width="200">
				</el-table-column>
				<el-table-column prop="endDate" label="结束时间" align="center" width="200">
				</el-table-column>
				<el-table-column label="不合格原因" align="center" width="150">
					<template slot-scope="scope">
						<el-button size="small" type="text">下载</el-button>
					</template>
				</el-table-column>
				<el-table-column label="最终得分" align="center" width="150">
					<template slot-scope="scope">
						<el-button size="small" type="text">下载</el-button>
					</template>
				</el-table-column>
				<el-table-column label="申诉信息" align="center" width="150">
					<template slot-scope="scope">
						<el-button size="small" type="text">下载</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!--页码-->
		<div style="text-align: right;margin-top: 10px;">
			<el-pagination @current-change="handleCurrentChange" :current-page.sync="reqParams.pageNo" :page-size="reqParams.pageSize" layout="total, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				regionList: [], //状态列表
				reqParams: {
					pageNo: 1,
					pageSize: 10,
					missionName: "",//任务
					district:''//内部区域
				},
				total: 0,
				isShow:true,//搜索区是否显示
				btnShow:false,
			}
		},
		created() {
			this.getData();
			this.getStatusList(); //获取状态列表
		},
		methods: {
			//初始化数据
			getData() {
				var self = this;
				console.log(self.reqParams);
				self.$axios.post('/vwhc/rest/MissionSchedual/selectMissionStatistics', self.reqParams)
					.then(res => {
						if(res.data.success == true) {
							self.tableData = res.data.data.dataList;
							if(self.total == 0) {
								self.total = res.data.data.count;
							}
						}
					}).catch(function(error) {
						self.$message.error('请求出错');
					});
			},
			//获取内部区域列表
			getStatusList() {
				var self = this;
				self.$axios.post('/vwhc/region/getDistrict')
					.then(res => {
						if(res.data.success == true) {
							self.regionList = res.data.data.regionList;
						}
					}).catch(function(error) {
						self.$message.error('请求出错');
					});
			},
			//查询
			search() {
				var self = this;
				self.reqParams.pageNo = 1;
				self.total = 0;
				self.getData();
			},
			//重置
			reset(){
				this.reqParams.missionName='';
				this.reqParams.district='';
				this.getData();
			},
			//分页
			handleCurrentChange(val) {
				this.reqParams.pageNo = val;
				this.getData();
			},
			//搜索区显示
			show() {
				this.isShow = true;
				this.btnShow = false;
			},
			//搜索区隐藏
			hidden() {
				this.isShow = false;
				this.btnShow = true;
			},
		}
	}
</script>

<style scoped="scoped">
	.btn2{
		height: 33px;
		line-height: 33px;
		width: 80px;
		text-align: center;
		padding: 0;
		color: #FFFFFF;
		border: none;
	}
	.rotate:before {
		transform: rotate(180deg);
		display: inline-block;
	}
</style>