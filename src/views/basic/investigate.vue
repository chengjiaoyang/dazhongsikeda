<template>
	<div class="taskManage">
		<!--搜索区-->
		<div style="margin-top: 20px;  ">
			<el-row :gutter="24" style="border-bottom: 1px solid #E1E1E1; padding-bottom:20px;" v-show="isShow">
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 120px;line-height: 36px;">问卷名称：</span>
					<el-input v-model="findData.missionName" placeholder="请输入问卷名称"></el-input>
				</el-col>
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 120px;line-height: 36px;">年度：</span>
					<el-select v-model="findData.year" placeholder="请选择年度">
						<el-option key="2018" label="2018" value="2018"></el-option>
						<el-option key="2019" label="2019" value="2019"></el-option>
						<el-option key="2020" label="2020" value="2020"></el-option>
						<el-option key="2021" label="2021" value="2021"></el-option>
					</el-select>
				</el-col>
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 120px;line-height: 36px;">季度：</span>
					<el-select v-model="findData.season" placeholder="请选择季度">
						<el-option key="第一季度" label="第一季度" value="1"></el-option>
						<el-option key="第二季度" label="第二季度" value="2"></el-option>
						<el-option key="第三季度" label="第三季度" value="3"></el-option>
						<el-option key="第四季度" label="第四季度" value="4"></el-option>
					</el-select>
				</el-col>
				<el-col :span="2">
					<!-- <el-button type="primary" @click="search">查询</el-button> -->
					<el-button class="btn2" style="background: linear-gradient(34deg, #18AEFF 0%, #1B87F2 100%);" @click="search">查询</el-button>
				</el-col>
				<el-col :span="3" style="text-align: center;">
					<el-button class="btn2" style="background: linear-gradient(34deg, #FFA450 0%, #E57640 100%);" @click="reset">重置</el-button>
				</el-col>
				<el-col :span="4">
					<div @click="over" style=" text-align: right;line-height: 36px;"><span class="iconfont icon-dazhong-25" style="color: #BEC3E5;"></span></div>
				</el-col>				
			</el-row>
				<div style="display: flex;" v-show="btnShow">
					<div style="height: 18px; flex: 1;border-bottom: 1px solid #E1E1E1;"></div>
					<div style="width: 40px;padding-left: 10px; line-height: 36px;" @click="show">
						<span class="iconfont icon-dazhong-25 rotate" style="color: #BEC3E5;"></span>
					</div>
				</div>
		</div>
		<!--表格-->
		<div style="margin-top: 20px;">
			<el-table :data="tableData" border >
				<el-table-column prop="brandId" label="品牌" align="center" width="200">
					<template slot-scope="scope">
        				<span v-if="scope.row.brandId == '2'">大众</span>
        				<span v-if="scope.row.brandId == '3'">斯柯达</span>
      				</template>
				</el-table-column>
				<el-table-column prop="name" label="问卷" align="center" width="280">
				</el-table-column>
				<el-table-column prop="year" label="年度" align="center" width="180">
				</el-table-column>
				<el-table-column prop="season" label="季度" align="center" width="200">
				</el-table-column>
				<el-table-column prop="type" label="类型" align="center" width="200">
					<template slot-scope="scope">
						<span v-if="scope.row.type == '1'">问卷</span>
						<span v-if="scope.row.type == '2'">形象调查</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" width="200" fixed="right">
					<template slot-scope="scope">
					<el-button size="small" type="text" @click="see(scope)">查看</el-button>	
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
					userName:"",
					brandId:"",//2大众 3斯柯达
					id:"",//标识
					name:"",//经销商类型
					missionName:"",//查询条件问卷名称
					year:"",//年
					season:"",//季度
					type:1
				},
				isShow: true, //搜索区是否显示
				btnShow: false,
				total: 0,
				dialogTitle: '新建任务',
				dialogFormVisible: false,
				// closeModal: false, //点击弹出遮罩层 页面不关闭
				multipleSelection: [],
			}
		},
		created() {
			this.getData();
		},
		methods: {
			//初始化数据
			getData() {
				var that =this;
				that.findData.brandId = localStorage.getItem("brandId")
				that.$axios.post("/vwhc/missionQuery",that.findData)
				.then(res =>{
					if(res.data.success == true){
						that.tableData = res.data.data.missionBeanList;
						that.total =res.data.data.total;
						if(that.total == 0){
							that.total = res.data.data.pageSum;
						}
					}
				}).catch(function(error) {
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
				that.getData();
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
			//查看
			see(scope){
				var rowId = scope.row.id;
				this.$router.push('/Detailed')
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
	.btn2:hover{
		color: #fff;
	}
	.btn2{
		height: 33px;
		/* line-height: 16px; */
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