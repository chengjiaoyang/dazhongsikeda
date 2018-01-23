<template>
	<div class="taskManage">
		<!--搜索区-->

		<div style="margin-top: 10px;padding-bottom: 15px; border-bottom: 1px solid #E1E1E1;" v-show="isShow">
			<el-row :gutter="24">
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 120px;line-height: 36px;">任务1名称：</span>
					<el-input v-model="findData.missionName" placeholder="请输入任务名称"></el-input>
				</el-col>
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 90px;line-height: 36px;">年度：</span>
					<el-date-picker v-model="findData.year" align="right" type="year" value-format="yyyy" placeholder="请选择年度" style="width: 100%;">
					</el-date-picker>
				</el-col>
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 90px;line-height: 36px;">季度：</span>
					<el-select placeholder="请选择季度" v-model="findData.season" style="width: 100%;">
						<el-option key="第一季度" label="第一季度" value="1"></el-option>
						<el-option key="第二季度" label="第二季度" value="2"></el-option>
						<el-option key="第三季度" label="第三季度" value="3"></el-option>
						<el-option key="第四季度" label="第四季度" value="4"></el-option>
					</el-select>
				</el-col>
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 90px;line-height: 36px;">网络代码:</span>
					<el-input placeholder="请输入网络代码" v-model="findData.dealerCode"></el-input>
				</el-col>
				<el-col :span="4" style="display: flex;">
					<el-button class="btn2" style="background: linear-gradient(34deg, #18AEFF 0%, #1B87F2 100%);" @click="search">查询</el-button>
					<el-button class="btn2" style="background: linear-gradient(34deg, #FFA450 0%, #E57640 100%);" @click="reset">重置</el-button>
					<div @click="over" style="flex: 1; text-align: right;line-height: 36px;"><span class="iconfont icon-dazhong-25" style="color: #BEC3E5;"></span></div>
				</el-col>
			</el-row>
			<el-row :gutter="24" style="margin-top: 10px;">
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 90px;line-height: 36px;">经销商名称:</span>
					<el-input placeholder="请输入经销商" v-model="findData.dealerName" style="width:155px;"></el-input>
				</el-col>

				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 97px;line-height: 36px;">内部区域:</span>
					<el-select placeholder="内部区域" v-model="findData.district">
							<el-option v-for="item in stateDistrict" :value="item" :key="item" :label="item" ></el-option>
					</el-select>
				</el-col>
			</el-row>
		</div>
		<div style="display: flex;" v-show="btnShow">
			<div style="height: 18px; flex: 1;border-bottom: 1px solid #E1E1E1;"></div>
			<div style="width: 40px;padding-left: 10px; line-height: 36px;" @click="show">
				<span class="iconfont icon-dazhong-25 rotate" style="color: #BEC3E5;"></span>
			</div>
		</div>
		<div style="margin-top: 10px;display: flex;">
		</div>
		<!--表格-->
		<div style="margin-top: 20px;">
			<el-table :data="tableData" border >

				<el-table-column prop="dealerCode" label="网络代码" align="center" width="280">
				</el-table-column>
				<el-table-column prop="dealerName" label="经销商名称" align="center" width="200">
				</el-table-column>
				<el-table-column prop="missionName" label="任务名称" align="center" width="200">
				</el-table-column>
				<el-table-column prop="commitCompDeadline" label="提交申诉期限" align="center" width="200">
				<template slot-scope="scope" v-show="isSeach ==false">
					<div class="block">
						<el-date-picker type="datetime" placeholder="选择日期时间" v-model="scope.row.commitCompDeadline" :disabled="disabled">
						</el-date-picker>
					</div>
				</template>
				</el-table-column>
        	<el-table-column prop="firstCompDeadline" label="小区经理申诉期限" align="center" width="180">
				<template slot-scope="scope"  v-show="isSeach ==false">
					<div class="block">
						<el-date-picker type="datetime" placeholder="选择日期时间" v-model="scope.row.firstCompDeadline" :disabled="disabled">
						</el-date-picker>
					</div>
				</template>
			</el-table-column>
        	<el-table-column prop="secondCompDeadline" label="区经理申诉期限" align="center" width="180">

				<template slot-scope="scope"  v-show="isSeach ==false">
					<div class="block">
						<el-date-picker type="datetime" placeholder="选择日期时间" v-model="scope.row.secondCompDeadline" :disabled="disabled">
						</el-date-picker>
					</div>
				</template>

			</el-table-column>
			<el-table-column label="操作" align="center" width="200" fixed="right">
				<template slot-scope="scope" >
					<el-button size="small" type="text"  v-show="isSeach==!scope.row.guguji" >确定</el-button>
					<el-button size="small" type="text" v-show="isSeach==!scope.row.guguji" @click="btnsee(scope.$index,scope.row)">取消</el-button>
					<el-button size="small" type="text" v-show="isSeach ==scope.row.guguji" @click="see(scope.$index,scope.row)" >设1置</el-button>
				</template>
			</el-table-column>

			</el-table>
		</div>
		<!--页码-->
	<div class="block">
			<el-pagination @current-change="handleSizeChange" :current-page.sync="findData.pageNo" :page-size="findData.pageSize" layout="prev, pager, next, jumper" :total="total">
			</el-pagination>
  	</div>
		<!--弹出添加-->

	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				findData: {
					pageNo: 1,//第几页
					pageSize: 8,//一页几行
					brandId:"",//2大众 3斯柯达
					missionName:"",//任务名称
					year:"",//年
					season:"",//季度

					dealerName:"",//经销商名称
					dealerCode:"",//经销商网络代码
					district:"",//地区
					commitCompDeadline:"",//提交申诉期限
					firstCompDeadline:"",//小区申诉审核期限
					secondCompDeadline:"",//大区申诉审核期限

				},
				isSeach: true,
				disabled:true,
				isShow: true, //搜索区是否显示
				btnShow: false,
				// isShows: true,
				total: 0,
				dialogTitle: '新建任务',
				dialogFormVisible: false,
				stateDistrict:[],
				multipleSelection: [],
			}
		},
		created() {
			this.getData();
			this.addDistrict();
		},
		methods: {
			//初始化数据
			getData() {
				var that =this;
				that.findData.brandId=localStorage.getItem("brandId")
				that.$axios.post("/vwhc/getComplainDeadlineQueryList",that.findData)
				.then(



					res =>{
					if(res.data.success == true){
						that.tableData = res.data.data.complainDeadlineQueryList;
						that.total =res.data.data.total;
						if(that.total == 0){
							that.total = res.data.data.pageNo;
						}
					}
				}).catch(function(error) {
					var sushan={
		     "data": {
		         "complainDeadlineQueryList": [
		             {
		                 "commitCompDeadline": null,
		                 "dealerCode": "2211324",
		                 "dealerName": "昆山建睿汽车销售服务有限公司",
		                 "district": "江苏销售服务中心",
		                 "firstCompDeadline": null,
		                 "missionName": "大众 2018 Q1 4S店",
		                 "missionSchedualId": 3,
		                 "secondCompDeadline": null
		             },
		             {
		                 "commitCompDeadline": "2018-01-22 00:00:00",
		                 "dealerCode": "32112",
		                 "dealerName": "哈哈",
		                 "district": "大东南区",
		                 "firstCompDeadline": "2018-01-22 00:00:00",
		                 "missionName": "大众 2018 Q1 4S店",
		                 "missionSchedualId": 1,
		                 "secondCompDeadline": "2018-01-22 00:00:00"
		             },
		             {
		                 "commitCompDeadline": null,
		                 "dealerCode": "2310216",
		                 "dealerName": "奉化澳泊森汽车销售服务有限公司",
		                 "district": "西北销售服务中心",
		                 "firstCompDeadline": null,
		                 "missionName": "大众 2018 Q1 新4S店",
		                 "missionSchedualId": 2,
		                 "secondCompDeadline": null
		             },
		             {
		                 "commitCompDeadline": null,
		                 "dealerCode": "2251406",
		                 "dealerName": "临沭远通汽车销售服务有限公司",
		                 "district": "西北销售服务中心",
		                 "firstCompDeadline": null,
		                 "missionName": "大众 2018 Q1 4S店",
		                 "missionSchedualId": 4,
		                 "secondCompDeadline": null
		             },
		             {
		                 "commitCompDeadline": null,
		                 "dealerCode": "2251006",
		                 "dealerName": "泰安润之福汽车销售有限公司",
		                 "district": "西北销售服务中心",
		                 "firstCompDeadline": null,
		                 "missionName": "大众 2018 Q1 4S店",
		                 "missionSchedualId": 5,
		                 "secondCompDeadline": null
		             }
		         ],
		         "total": 5
		     },
		     "success": true
		 }
		 sushan.data.complainDeadlineQueryList.map(item=>item.guguji=true)
		 that.tableData = sushan.data.complainDeadlineQueryList;
		 that.total =sushan.data.total;
		 console.log('')
					that.$message.error("请求出错1111111111");
				});
			},
		//获取经销商内部区域
			addDistrict() {
			var that = this;
			that.$axios
				.post("/vwhc/region/getDistrict", {})
				.then(res => {
				if (res.data.success == true) {
					// console.log(res)
					that.stateDistrict = res.data.data.regionList;
				}
				})
				.catch(function(error) {


				that.$message.error("请求出错");
				});
			},
			//查询
			search() {
				var that = this;
				that.findData.pageNo = 1;
				that.total = 0;
				that.getData()
			},
			reset(){
				var that =this;
				that.findData.missionName = '';
				that.findData.year = '';
				that.findData.season = '';
				that.findData.dealerName = '';
				that.findData.district = '';
				that.findData.dealerCode = '';
			},
			//页码
			handleSizeChange(val) {
			this.findData.pageNo =val;
			this.getData();
			},
			//显示
			over(){
				this.isShow = false;
				this.btnShow = true;
			},
			show(){
				this.isShow = true;
				this.btnShow = false;
			},
			setDate(val){
				this.findData.year = val
			},
			//查看
			see(index,row){
				var that = this;
				console.log(index);
				console.log(row)
				row.guguji=!row.guguji

				that.disabled = false;
			},
			//取消
			btnsee(index,row){
				var that = this;
				row.guguji=!row.guguji
				that.disabled = true;
			}
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
	.btn2:hover{
		color: #fff;
	}
	.btn2{
		height: 33px;
		line-height: 16px;
		width: 80px;
		text-align: center;
		color: #FFFFFF;
		border: none;
	}
	.rotate:before {
		transform: rotate(180deg);
		display: inline-block;
	}
</style>
