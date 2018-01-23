<template>
	<div class="taskManage" v-bind:style="{height:divHeight}">
		<!--搜索区-->
		<div style="border-bottom:1px solid #E1E1E1 ;padding-bottom: 15px;" v-show="isShow">
			<el-row :gutter="24">
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 90px;line-height: 36px;">任务名称</span>
					<el-input v-model="reqParams.missionName" placeholder="请输入内容任务名称"></el-input>
				</el-col>
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 90px;line-height: 36px;">年度：</span>
					<el-date-picker v-model="reqParams.year" @change="setDate" value-format="yyyy" align="right" type="year" placeholder="请选择年度" style="width: 100%;">
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
					<span style="font-size: 14px;width: 90px;line-height: 36px;">发布状态：</span>
					<el-select placeholder="请选择状态" v-model="reqParams.isRelease">
						<el-option v-for="item in stateList" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-col>
				<el-col :span="4" style="display: flex;">
					<el-button class="btn2" style="background: linear-gradient(34deg, #18AEFF 0%, #1B87F2 100%);" @click="search">查询</el-button>
					<el-button class="btn2" style="background: linear-gradient(35deg, #FFA450 0%, #E57640 100%);" @click="reset">重置</el-button>
					<div @click="hidden" style="flex: 1; text-align: right;line-height: 36px;"><span class="iconfont icon-dazhong-25" style="color: #BEC3E5;"></span></div>
				</el-col>
			</el-row>
			<el-row :gutter="24" style="margin-top: 10px;">
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 90px;line-height: 36px;">经销商：</span>
					<el-input v-model="reqParams.dealerName" placeholder="请输入经销商"></el-input>
				</el-col>
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 90px;line-height: 36px;">网络代码</span>
					<el-input v-model="reqParams.dealerCode" placeholder="请输入网络代码"></el-input>
				</el-col>
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 90px;line-height: 36px;">检查员：</span>
					<el-input v-model="reqParams.realName" placeholder="请输入检查员"></el-input>
				</el-col>
				<el-col :span="5" style="display: flex;">
				</el-col>
				<el-col :span="4">
				</el-col>
			</el-row>
		</div>
		
		<div style="display: flex;" v-show="btnShow">
			<div style="height: 18px; flex: 1;border-bottom: 1px solid #E1E1E1;"></div>
			<div style="width: 40px;padding-left: 10px; line-height: 36px;" @click="show" >
				<span class="iconfont icon-dazhong-25 rotate" style="color: #BEC3E5;"></span>
			</div>
		</div>
		
		<div style="margin-top: 10px;display: flex;">
			<el-button class="btn" style="background-image: linear-gradient(35deg, #20E42C 0%, #07A63D 100%);" @click="insideSend"><i class="iconfont icon-dazhong-24"></i>内发</el-button>
			<el-button class="btn" style="background-image: linear-gradient(35deg, #FFA450 0%, #E57640 100%);" @click="outsideSend"><i class="iconfont icon-dazhong-24"></i>外发</el-button>
		</div>

		<!--表格-->
		<div style="margin-top: 20px;">
			<el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="80" align="center">
				</el-table-column>
				<el-table-column prop="missionName" label="任务名称" align="center">
				</el-table-column>
				<el-table-column prop="dealerCode" label="网络代码" align="center" width="160">
				</el-table-column>
				<el-table-column prop="dealerName" label="经销商" align="center">
				</el-table-column>
				<el-table-column prop="realName" label="检查员" align="center" width="120">
				</el-table-column>
				<el-table-column prop="approveStatus" label="状态" align="center" width="140">
				</el-table-column>
				<el-table-column prop="isRelease" label="发布状态" align="center" width="140">
				</el-table-column>
				<el-table-column prop="score" label="得分" align="center" width="140">
				</el-table-column>
				<el-table-column label="操作" align="center" width="200" fixed="right">
					<template slot-scope="scope">
						<el-button size="small" type="text" @click="scoreChart(scope)">得分表</el-button>
						<el-button size="small" type="text" @click="checkDetail(scope)">考核明细</el-button>
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
				divHeight:'',
				isShow: true,
				btnShow: false, //显示的按钮是否显示
				tableData: [],
				stateList: [], //状态列表
				reqParams: {
					pageNo: 1,
					pageSize: 10,
					missionName: "", //任务名称
					year: "", //年度
					season: "", //季度
					isRelease: "", //发布状态
					dealerName: "", //经销商
					realName: "", //检查员
					dealerCode: "" //网络代码
				},
				multipleSelection: [], //选择的数据
				total: 0,
			}
		},
		created() {
			
//			this.divHeight = document.body.scrollHeight   * 0.75 + "px";
			this.getData();
			this.getStatusList(); //获取状态列表
//			alert(document.documentElement.clientHeight );
//			this.divHeight = document.documentElement.clientHeight+ "px";
		},
		methods: {
			//初始化数据
			getData() {
				var self = this;
				console.log(self.reqParams);
				self.$axios.post('/vwhc/rest/MissionSchedual/getMissionSchedual', self.reqParams)
					.then(res => {
						if(res.data.success == true) {
							self.tableData = res.data.data.MissionDataList;
							if(self.total == 0) {
								self.total = res.data.data.MissionDataListCount;
							}
						}
					}).catch(function(error) {
						self.$message.error('请求出错');
					});
			},
			//获取状态列表
			getStatusList() {
				var self = this;
				self.$axios.post('/vwhc/rest/common/getDictVal', {
						dictName: "RELEASE_TYPE"
					})
					.then(res => {
						if(res.data.success == true) {
							self.stateList = res.data.data.sysCodeResBeanList;
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
				this.reqParams.year='';
				this.reqParams.season='';
				this.reqParams.isRelease='';
				this.reqParams.dealerName='';
				this.reqParams.realName='';
				this.reqParams.dealerCode='';
				this.getData();
			},
			//分页
			handleCurrentChange(val) {
				this.reqParams.pageNo = val;
				this.getData();
			},
			//全选
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			//查看得分表
			scoreChart(scope) {
				var missionSchedualId = scope.row.missionSchedualId;
				var dealerId = scope.row.dealerId;
				var missionId = scope.row.missionId;
				var missionName = scope.row.missionName;
				var district = scope.row.district;
				var dealerName = scope.row.dealerName;
				var dealerCode = scope.row.dealerCode;
				var scoreInfo = {
					missionSchedualId: scope.row.missionSchedualId,
					dealerId: scope.row.dealerId,
					missionId: scope.row.missionId,
					missionName: scope.row.missionName,
					district: scope.row.district,
					dealerName: scope.row.dealerName,
					dealerCode: scope.row.dealerCode,
				}
				localStorage.setItem("scoreInfo", JSON.stringify(scoreInfo))
				this.$router.push('/scoreChart');
			},
			//查看考核明细
			checkDetail(scope) {
				this.$router.push('/checkDetail');
			},
			//内发
			insideSend() {
				var self = this;
				if(this.multipleSelection.length === 0) {
					this.$message({
						message: '请选择一条数据',
						type: 'error'
					})
					return;
				}
			},
			//外发
			outsideSend() {
				var self = this;
				if(this.multipleSelection.length === 0) {
					this.$message({
						message: '请选择一条数据',
						type: 'error'
					})
					return;
				}
			},
			//时间转换
			setDate(val) {
				this.reqParams.year = val;
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
			}
		}
	}
</script>

<style scoped="scoped">
	.btn {
		height: 34px;
		line-height: 34px;
		width: 100px;
		text-align: center;
		padding: 0px;
		color: #fff;
        border: none;
	}
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