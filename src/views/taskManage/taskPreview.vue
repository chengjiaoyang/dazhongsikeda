<template>
	<div class="taskManage">
		<div style="font-size: 24px;color: #333333;text-align: center;height: 45px;line-height: 45px;">{{tableData.name}}</div>
		<div style="text-align: center;height: 30px;line-height: 30px;font-size: 14px;color: #666666;">年度：{{tableData.year}} &nbsp;&nbsp;季度：{{tableData.season}}</div>
		<div style="display: flex; height: 40px; border: 1px solid #E5E5E5;margin-top: 15px;font-size: 14px;color: #666666;">
			<div style="width: 20%;line-height: 40px;border-right: 1px solid #E5E5E5;padding-left: 10px;">检查类目</div>
			<div style="width: 25%;line-height: 40px;border-right: 1px solid #E5E5E5;padding-left: 10px;">检查内容</div>
			<div style="width: 5%;line-height: 40px;border-right: 1px solid #E5E5E5;padding-left: 10px;">权重</div>
			<div style="width: 20%;line-height: 40px;border-right: 1px solid #E5E5E5;padding-left: 10px;">判定条款</div>
			<div style="width: 10%;line-height: 40px;border-right: 1px solid #E5E5E5;padding-left: 10px;">扣分(仅大众)</div>
			<div style="width: 10%;line-height: 40px;border-right: 1px solid #E5E5E5;padding-left: 10px;">可回溯(仅大众)</div>
			<div style="width: 10%;line-height: 20px;">检查项说明(仅老标准)</div>
		</div>
		<!--问卷-->
		<div v-if="standardTemplate!=null"  style="width: 100%;border: 1px solid #E5E5E5;border-bottom: none;">
			<div style="width: 100%;" v-for="(list,index) in standardTemplate" :key="index">
				<div style="width: auto;padding-left: 10px; background: #F3F4FC;height: 36px;line-height: 36px;border-bottom: 1px solid #E5E5E5;">{{list.checkCategory}}</div>
				<div v-for="(items,index) in list.templateDetailList" :key="index" style="display: flex;font-size: 14px;color: #666666;">
					<div class="flexcenter" style="width: 20%;border-bottom: 1px solid #E5E5E0;border-right: 1px solid #E5E5E5;">{{items.category}}</div>
					<div class="flexcenter" style="width: 25%;border-bottom: 1px solid #E5E5E0;border-right: 1px solid #E5E5E5;">{{items.checkContent}}</div>
					<div class="flexcenter" style="width: 5%;border-bottom: 1px solid #E5E5E0;border-right: 1px solid #E5E5E5;text-align: center;">{{items.weight}}</div>
					<div style="width: 20%;border-bottom: 1px solid #E5E5E0;border-right: 1px solid #E5E5E5;">
						<div v-for="(item,index) in items.templateCriterionList" :key="index" style="border-bottom: 1px solid #E5E5E5;padding-top: 10px;padding-left: 5px; padding-bottom: 10px;">
							{{item.criterion}}
						</div>
					</div>
					<div style="width: 10%;border-bottom: 1px solid #E5E5E0;border-right: 1px solid #E5E5E5;text-align: center;">
						<div v-for="(item,index) in items.templateCriterionList" :key="index" style="border-bottom: 1px solid #E5E5E5;padding-top: 10px;padding-left: 5px; padding-bottom: 10px;">
							{{item.detailScore}}
						</div>
					</div>
					<div class="flexcenter" style="width: 10%;border-bottom: 1px solid #E5E5E0;border-right: 1px solid #E5E5E5;text-align: center;">{{items.isBack}}</div>
					<div class="flexcenter" style="width: 10%;border-bottom: 1px solid #E5E5E0;">{{items.itemDesc}}</div>
				</div>
			</div>
		</div>
		<!--品牌形象调查表-->
		<div v-if="brandTemplateList!=null" style="margin-top:10px;" >
			<div style="height:37px;line-height:37px;background: #F3F4FC;font-size: 14px;color: #666666; border:1px solid #cecece;border-bottom: none; padding-left: 15px;">品牌形象调查表</div>
			<table style="width:100%;border-bottom: 1px solid #cecece;font-size: 14px;color: #666666;" cellpadding="0" cellspacing="0">
				<thead>
					<tr style="height: 36px;line-height: 36px;">
						<td style="width:10%;border:1px solid #cecece;border-bottom: none;border-right: none;">序号</td>
						<td style="width:80%;border:1px solid #cecece;border-bottom: none;border-right: none;">具体条款</td>
						<td style="width:10%;border:1px solid #cecece;border-bottom: none;">备注</td>
					</tr>
				</thead>
				<thead>
					<tr style="height: 36px;line-height: 36px;" v-for="(brand,index) in brandTemplateList" :key="index">
						<td style="width:10%;border:1px solid #cecece;border-bottom: none;border-right: none;">{{brand.number}}</td>
						<td style="width:80%;border:1px solid #cecece;border-bottom: none;border-right: none;">{{brand.checkContent}}</td>
						<td style="width:10%;border:1px solid #cecece;border-bottom: none;">{{brand.remark}}</td>
					</tr>
				</thead>
			</table>
		</div>

		<div style="text-align: right;margin-top: 10px;">
			<el-button type="primary" @click="addConfirm()">提交</el-button>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      tableData: "",
      standardTemplate: [], //问卷调查表
      brandTemplateList: [] //品牌形象调查表
    };
  },
  created() {
    this.getData();
  },
  methods: {
    //初始化数据
    getData() {
      var self = this;
      var addTask = JSON.parse(localStorage.getItem("addTask"));
      self.$axios
        .post("/vwhc/preView", {
          ids: [addTask.templateId,addTask.brandTemplateId],
          // ids: [1, 6],
          name: addTask.missionName,
          year: addTask.year,
          season: addTask.season
        })
        .then(res => {
          if (res.data.success == true) {
            //brandTemplateList 品牌形象
            //standardTemplate 问卷
            self.tableData = res.data.data;
            self.standardTemplate =res.data.data.standardTemplate.templateFatherList;
            self.brandTemplateList = res.data.data.brandTemplateList;
          }
        })
        .catch(function(error) {
          self.$message.error("请求出错");
        });
    },
    //提交
    addConfirm() {
      var self = this;
      var addTask = localStorage.getItem("addTask");
      self.$axios
        .post("/vwhc/addmission", JSON.parse(addTask))
        .then(res => {
          if (res.data.success == true) {
            this.dialogFormVisible = false;
            self.$message({
              type: "success",
              message: "新建成功!"
            });
            self.$router.push("/taskManage");
          }
        })
        .catch(function(error) {
          self.$message.error("请求出错");
        });
    }
  }
};
</script>

<style scoped="scoped">
.el-form-item {
  margin-bottom: 22px;
  display: flex;
}
</style>