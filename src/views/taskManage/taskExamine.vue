<template>
	<div class="taskManage" v-bind:style="{height:divHeight}">
		<!--搜索区-->
		<div style="margin-top: 10px;padding-bottom: 15px; border-bottom: 1px solid #E1E1E1;" v-show="isShow">
			<el-row :gutter="24">
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 90px;line-height: 36px;">任务名称</span>
					<el-input placeholder="请输入任务名称" v-model="reqParams.missionName"></el-input>
				</el-col>
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 90px;line-height: 36px;">年度：</span>
					<el-date-picker v-model="reqParams.year" align="right" type="year" value-format="yyyy" placeholder="请选择年度" style="width: 100%;" @change="setStartDate">
					</el-date-picker>
				</el-col>
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 90px;line-height: 36px;">季度：</span>
					<el-select placeholder="请选择季度" v-model="reqParams.season" style="width: 100%;">
						<el-option key="第一季度" label="第一季度" value="1"></el-option>
						<el-option key="第二季度" label="第二季度" value="2"></el-option>
						<el-option key="第三季度" label="第三季度" value="3"></el-option>
						<el-option key="第四季度" label="第四季度" value="4"></el-option>
					</el-select>
				</el-col>
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 90px;line-height: 36px;">流程状态</span>
					<el-select placeholder="请选择状态" v-model="reqParams.approveStatus" style="width: 100%;">
						<el-option v-for="item in stateList" :key="item.code" :label="item.value" :value="item.code"></el-option>
					</el-select>
				</el-col>
				<el-col :span="4" style="display: flex;">
					<el-button class="btn2" style="background: linear-gradient(34deg, #18AEFF 0%, #1B87F2 100%);" @click="search">查询</el-button>
					<el-button class="btn2" style="background: linear-gradient(34deg, #FFA450 0%, #E57640 100%);" @click="reset">重置</el-button>
					<div @click="hidden" style="flex: 1; text-align: right;line-height: 36px;"><span class="iconfont icon-dazhong-25" style="color: #BEC3E5;"></span></div>
				</el-col>
			</el-row>
			<el-row :gutter="24" style="margin-top: 10px;">
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 90px;line-height: 36px;">内部区域</span>
					<el-select placeholder="请选择内部区域" v-model="reqParams.district" style="width: 100%;">
						<el-option v-for="item in regionList" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</el-col>
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 90px;line-height: 36px;">经销商</span>
					<el-input placeholder="请输入经销商" v-model="reqParams.dealerCode"></el-input>
				</el-col>
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 90px;line-height: 36px;">网络代码</span>
					<el-input placeholder="请输入网络代码" v-model="reqParams.dealerCode"></el-input>
				</el-col>
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 90px;line-height: 36px;">检查员：</span>
					<el-input placeholder="请输入检查员" v-model="reqParams.userName"></el-input>
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
			<el-table :data="tableData" border style="width: 100%" >
				<el-table-column prop="brandName" label="品牌" align="center" width="100">
				</el-table-column>
				<el-table-column prop="district" label="内部区域" align="center" width="120">
				</el-table-column>
				<el-table-column prop="dealerCode" label="网络代码" align="center" width="120">
				</el-table-column>
				<el-table-column prop="dealerName" label="经销商" align="center" width="180">
				</el-table-column>
				<el-table-column prop="missionName" label="任务名称" align="center" width="160">
				</el-table-column>
				<el-table-column prop="year" label="年度" align="center" width="100">
				</el-table-column>
				<el-table-column prop="season" label="季度" align="center" width="100">
					<template slot-scope="scope">
						<span v-if="scope.row.season == '1'">第一季度</span>
						<span v-if="scope.row.season == '2'">第二季度</span>
						<span v-if="scope.row.season == '3'">第三季度</span>
						<span v-if="scope.row.season == '4'">第四季度</span>
					</template>
				</el-table-column>
				<el-table-column prop="realName" label="检查员" align="center" width="140">
				</el-table-column>
				<el-table-column prop="checkDate" label="检查时间" align="center" width="140">
				</el-table-column>
				<el-table-column prop="approveStatus" label="流程状态" align="center" width="140">
					<template slot-scope="scope">
						<span v-if="scope.row.approveStatus == '0'">未录入</span>
						<span v-if="scope.row.approveStatus == '1'">录入中</span>
						<span v-if="scope.row.approveStatus == '2'">已录入</span>
						<span v-if="scope.row.approveStatus == '3'">已初审</span>
						<span v-if="scope.row.approveStatus == '4'">初审退回</span>
						<span v-if="scope.row.approveStatus == '5'">已复审</span>
						<span v-if="scope.row.approveStatus == '6'">复审退回</span>
						<span v-if="scope.row.approveStatus == '7'">已平台审核</span>
						<span v-if="scope.row.approveStatus == '8'">审核退回</span>
						<span v-if="scope.row.approveStatus == '9'">已完成(发布后)</span>
						<span v-if="scope.row.approveStatus == '10'">已暂停</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" width="120" fixed="right">
					<template slot-scope="scope">
						<el-button size="small" type="text" @click="update(scope)" :disabled="scope.row.approveStatus!='0'">审核</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!--页码-->
		<div style="text-align: right;margin-top: 10px;">
			<el-pagination @current-change="handleCurrentChange" :current-page.sync="reqParams.pageNo" :page-size="reqParams.pageSize" layout="total,prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				divHeight: '',
				isShow: true, //搜索区是否显示
				btnShow: false, //显示的按钮是否显示
				tableData: [],
				stateList: [], //状态列表
				regionList:[],//内部区域列表
				reqParams: {
					pageNo: 1,
					pageSize: 5,
					brandId: '', //品牌编号
					userId:'',//用户id
					missionName:'',//任务名称
					year: '', //年度
					season: '', //季度
					approveStatusList: [{"approveStatus":0}],//行程状态
					district:'',//内部区域
					dealerName: '', //经销商
					dealerCode: '',//网络代码
					realName:'',//检查员
				},
				total: 0,
			}

		},
		created() {
			this.divHeight = window.screen.height * 0.75 + "px";
			this.getData();
			this.getStatusList(); //状态列表
		},
		methods: {
			//初始化数据
			getData() {
				var self = this;
				self.reqParams.brandId=localStorage.getItem("brandId");
				self.reqParams.userId=sessionStorage.getItem("userId");
				self.$axios.post('/vwhc/getMissionAudit', self.reqParams)
					.then(res => {
						if(res.data.success == true) {
							self.tableData = res.data.data.missionList;
							if(self.total == 0) {
								self.total = res.data.data.total;
							}
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
			reset() {
				var self = this;
				self.reqParams.missionName = '';
				self.reqParams.year = '';
				self.reqParams.season = '';
				self.reqParams.approveStatus = '';
				self.reqParams.dealerName = '';
				self.reqParams.isCheckUser = '';
				self.reqParams.dealerCode = '';
				self.reqParams.district='';
				self.getData();
			},
			//获取状态列表
			getStatusList() {
				var self = this;
				self.$axios.post('/vwhc/rest/common/getDictVal', {
						dictName: "APPROVE_TYPE"
					})
					.then(res => {
						if(res.data.success == true) {
							self.stateList = res.data.data.sysCodeResBeanList;
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
			//分页
			handleCurrentChange(val) {
				this.reqParams.pageNo = val;
				this.getData();
			},
			setStartDate(val) {
				this.reqParams.year = val;
			},
			//审核
			update(scope){
				var self=this;
				var brandId = scope.row.brandId;//品牌id
				var missionSchedualId=scope.row.missionSchedualId;//任务行程id
				var missionId=scope.row.missionId;//任务id
				self.$router.push("/examineDetail?brandId=" + brandId+"&missionSchedualId="+missionSchedualId+"&missionId="+missionId);
			},
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
		}
	}
</script>

<style scoped="scoped">
	.el-form-item {
		margin-bottom: 22px;
		display: flex;
	}
	
	.divstyle {
		display: flex;
		font-size: 14px;
		font-weight: 700;
		color: #48576a;
		line-height: 30px;
		margin-bottom: 10px;
	}
	
	#namelist {
		position: absolute;
		z-index: 99;
		left: 80px;
		top: 125px;
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
	
	.btn {
		height: 34px;
		line-height: 34px;
		padding: 0px 15px;
		color: #fff;
		border: none;
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
	
	.rotate:before {
		transform: rotate(180deg);
		display: inline-block;
	}
</style>