<template>
	<div class="taskManage">
		<!--搜索区-->
		<div style="margin-top: 20px;">
			<el-row :gutter="24"  v-show="isShow">
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 120px;line-height: 36px;">网络名称：</span>
					<el-input v-model="findData.dealerCode" placeholder="请输入网络名称"></el-input>
				</el-col>
				<el-col :span="6" style="display: flex;">
					<span style="font-size: 14px;width: 120px;line-height: 36px;">内部区域：</span>
					<el-select placeholder="内部区域" v-model="findData.district">
							<el-option v-for="item in stateDistrict" :value="item" :key="item" :label="item" ></el-option>
					</el-select>
				</el-col>
        		<el-col :span="6" style="display: flex;">
					<span style="font-size: 14px;width: 130px;line-height: 36px;">经销商名称：</span>
					<el-input v-model="findData.dealerName" placeholder="请输入经销商名称"></el-input>
				</el-col>
        		<el-col :span="3" style="display: flex;">
            		<el-button class="btn2" style="background: linear-gradient(34deg, #18AEFF 0%, #1B87F2 100%);" @click="search">查询</el-button>
          		</el-col>
          		<el-col :span="2" style="display:flex;padding-left:0px;">
            		<el-button class="btn2" style="background: linear-gradient(34deg, #FFA450 0%, #E57640 100%);" @click="reset">重置</el-button>
          		</el-col>	
          		<el-col :span="2" style="display: flex;">
					<div @click="over" style=" text-align: right;line-height: 36px;"><span class="iconfont icon-dazhong-25" style="color: #BEC3E5;"></span></div>
				</el-col>			
				</el-row>
				<el-row style="padding-bottom:20px; border-bottom: 1px solid #E1E1E1;" v-show="isShow">
				<el-col :span="5" style="display: flex;margin-top:20px;">
					<span style="font-size: 14px;width: 77px;line-height: 36px;">任务名称：</span>
					<el-input v-model="findData.missionName" placeholder="请输入任务名称" style="width:132px;"></el-input>
				</el-col>
        		<el-col :span="6" style="display: flex;margin-top:20px;margin-left:5px;">
					<span style="font-size: 14px;width: 90px;line-height: 36px;">流程状态：</span>
					<el-select v-model="findData.complainStatus" placeholder="请选择流程状态" style="width:165px;">
						<el-option key="第一季度" label="第一季度" value="1"></el-option>
						<el-option key="第二季度" label="第二季度" value="2"></el-option>
						<el-option key="第三季度" label="第三季度" value="3"></el-option>
						<el-option key="第四季度" label="第四季度" value="4"></el-option>
					</el-select>
				</el-col>
				<el-col :span="6" style="display: flex;margin-top:20px;margin-left:5px;">
					<span style="font-size: 14px;width: 88px;line-height: 36px;">审核状态：</span>
					<el-select v-model="findData.complainStatus" placeholder="请选择审核状态" style="width:168px;">
						<el-option key="第一季度" label="第一季度" value="1"></el-option>
						<el-option key="第二季度" label="第二季度" value="2"></el-option>
						<el-option key="第三季度" label="第三季度" value="3"></el-option>
						<el-option key="第四季度" label="第四季度" value="4"></el-option>
					</el-select>
				</el-col>
				</el-row>
				<div style="display: flex;" v-show="btnShow">
					<div style="height: 18px; flex: 1;border-bottom: 1px solid #E1E1E1;"></div>
					<div style="width: 40px;padding-left: 10px; line-height: 36px; padding-right: 20px;" @click="show">
						<span class="iconfont icon-dazhong-25 rotate" style="color: #BEC3E5;"></span>
					</div>
				</div>
		</div>
		<!--表格-->
		<div style="margin-top: 20px;">
			<el-table :data="tableData" border >
				<el-table-column prop="missionName" label="任务名称" align="center" width="200">
				</el-table-column>
				<el-table-column prop="district" label="内部区域" align="center" width="280">
				</el-table-column>
				<el-table-column prop="dealerCode" label="网络代码" align="center" width="180">
				</el-table-column>
				<el-table-column prop="dealerName" label="经销商名称" align="center" width="280">
				</el-table-column>
				<el-table-column prop="complainStatus" label="流程状态" align="center" width="200">
					<template slot-scope="scope">
						<span v-if="scope.row.complainStatus == '0'">未提交</span>
						<span v-if="scope.row.complainStatus == '1'">已提交</span>
						<span v-if="scope.row.complainStatus == '2'">小区经理审核驳回</span>
						<span v-if="scope.row.complainStatus == '3'">小区经理已审核</span>
						<span v-if="scope.row.complainStatus == '4'">大区经理审核驳回</span>
						<span v-if="scope.row.complainStatus == '5'">大区经理已审核</span>
						<span v-if="scope.row.complainStatus == '6'">平台已审核</span>
						<span v-if="scope.row.complainStatus == '7'">品牌审核驳回</span>
						<span v-if="scope.row.complainStatus == '8'">品牌已审核</span>
						<span v-if="scope.row.complainStatus == '9'">第三方已审</span>
						<span v-if="scope.row.complainStatus == '10'">第三方审核中</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" width="200" fixed="right">
					<template slot-scope="scope">
					<el-button size="small" type="text" @click="see(scope)">审批</el-button>	
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
		  brandId:2,
        complainStatusList: [
          { complainStatus: 0 },
          { complainStatus: 1 },
          { complainStatus: 2 },
          { complainStatus: 3 },
          { complainStatus: 4 },
          { complainStatus: 5 },
          { complainStatus: 6 },
          { complainStatus: 7 },
          { complainStatus: 8 },
          { complainStatus: 9 },
          { complainStatus: 10 }
        ], //申诉流程状态
        pageNo: 1, //第几页
        pageSize: 8, //一页几行
        userName: "",
        brandId: "", //2大众 3斯柯达
        missionName: "", //任务名称
        dealerCode: "", //经销商网络代码
        dealerName: "", //经销商名称
        missionSchedualId: "", //行程ID
        district: "",
		
      },
      stateDistrict: [],
      isShow: true, //搜索区是否显示
      btnShow: false,
      total: 0,
      dialogTitle: "新建任务",
      dialogFormVisible: false
      // closeModal: false, //点击弹出遮罩层 页面不关闭
    };
  },
  created() {
    this.getData();
    this.addDistrict();
  },
  methods: {
    //初始化数据
    getData() {
      var that = this;
      var pageNos = that.findData.pageNo;
      var pageSizes = that.findData.pageSize;
      that.findData.brandId=localStorage.getItem("brandId")
      that.$axios
        .post("/vwhc/getComplainAuditList",that.findData)
        .then(res => {
          if (res.data.success == true) {
            that.tableData = res.data.data.complainAuditList;
            that.total = res.data.data.total;
            if (that.total == 0) {
              that.total = res.data.data.total;
            }
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
      that.getData();
    },
    //重置
    reset() {
      var that = this;
      that.findData.missionName = "";
      that.findData.district = "";
      that.findData.dealerCode = "";
      that.findData.dealerName = "";
      that.findData.complainStatus = "";
    },
    //获取经销商内部区域
    addDistrict() {
      var that = this;
      that.$axios
        .post("/vwhc/region/getDistrict", {})
        .then(res => {
          if (res.data.success == true) {
            that.stateDistrict = res.data.data.regionList;
          }
        })
        .catch(function(error) {
          that.$message.error("请求出错");
        });
    },
    //页码
    handleSizeChange(val) {
      this.findData.pageNo = val;
      this.getData();
    },
    //显示
    over() {
      this.isShow = false;
      this.btnShow = true;
    },
    show() {
      this.isShow = true;
      this.btnShow = false;
    },
    //查看
    see(scope) {
      this.$router.push("/Examination");
    }
  }
};
</script>
<style scoped="scoped">
.taskManage {
  width: 98%;
  padding-left: 20px;
}

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
.btn2:hover {
  color: #fff;
}
.btn2 {
  height: 33px;
  line-height: 1px;
  width: 80px;
  text-align: center;
  color: #ffffff;
  border: none;
}
.rotate:before {
  transform: rotate(180deg);
  display: inline-block;
}
</style>
