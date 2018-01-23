<template>
	<div class="taskManage">
		<div>标题：{{tableData.name}}</div>
		<div>年度：{{tableData.year}} &nbsp;&nbsp;季度：{{tableData.season}}</div>
		<div style="display: flex; height: 50px;text-align: center; border: 1px solid #E5E5E5;">
			<div style="width: 20%;line-height: 50px;border-right: 1px solid #E5E5E5;">检查类目</div>
			<div style="width: 25%;line-height: 50px;border-right: 1px solid #E5E5E5;">检查内容</div>
			<div style="width: 5%;line-height: 50px;border-right: 1px solid #E5E5E5;">权重</div>
			<div style="width: 20%;line-height: 50px;border-right: 1px solid #E5E5E5;">判定条款</div>
			<div style="width: 10%;line-height: 50px;border-right: 1px solid #E5E5E5;">扣分(仅大众)</div>
			<div style="width: 10%;line-height: 50px;border-right: 1px solid #E5E5E5;">可回溯(仅大众)</div>
			<div style="width: 10%;line-height: 25px;">检查项说明(仅老标准)</div>
		</div>
		<div v-for="list in lists" style="width: 100%;border: 1px solid #E5E5E5;">
			<div style="width: 100%;">
				<div style="width: 100%;background: yellow;height: 45px;line-height: 45px;border-bottom: 1px solid #E5E5E5;">{{list.checkCategory}}</div>
				<div v-for="items in list.templateDetailList" style="display: flex;">
					<div style="width: 20%;border-bottom: 1px solid #E5E5E0;border-right: 1px solid #E5E5E5;">{{items.category}}</div>
					<div style="width: 25%;border-bottom: 1px solid #E5E5E0;border-right: 1px solid #E5E5E5;">{{items.checkContent}}</div>
					<div style="width: 5%;border-bottom: 1px solid #E5E5E0;border-right: 1px solid #E5E5E5;text-align: center;">{{items.weight}}</div>
					<div style="width: 20%;border-bottom: 1px solid #E5E5E0;border-right: 1px solid #E5E5E5;">
						<div v-for="item in items.templateCriterionList" style="border-bottom: 1px solid #E5E5E5;">
							{{item.criterion}}
						</div>
					</div>
					<div style="width: 10%;border-bottom: 1px solid #E5E5E0;border-right: 1px solid #E5E5E5;text-align: center;">
						<div v-for="item in items.templateCriterionList" style="border-bottom: 1px solid #E5E5E5;">
							{{item.detailScore}}
						</div>
					</div>
					<div style="width: 10%;border-bottom: 1px solid #E5E5E0;border-right: 1px solid #E5E5E5;text-align: center;">{{items.isBack}}</div>
					<div style="width: 10%;border-bottom: 1px solid #E5E5E0;">{{items.itemDesc}}</div>
				</div>
			</div>
		</div>

		<div>
			<el-button type="primary" @click="addConfirm()">提交</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: '',
				lists: [],
			}
		},
		created() {
			this.getData();
		},
		methods: {
			//初始化数据
			getData() {
				var self = this;
				self.$axios.post('/vwhc/preView', {
						ids: [1, 13],
						name: "2321321",
						year: "2018",
						season: "2"

					})
					.then(res => {
						if(res.data.success == true) {
							self.tableData = res.data.data;
							self.lists = res.data.data.templateDetailsList[0].templateFatherList;
						}
					}).catch(function(error) {
						self.$message.error('请求出错');
					});
			},
			//提交
			addConfirm() {
				var self=this;
				var addTask = localStorage.getItem("addTask");
				self.$axios.post('/vwhc/addmission', JSON.parse(addTask))
					.then(res => {
						if(res.data.success == true) {
							this.dialogFormVisible = false;
							self.$message({
								type: 'success',
								message: '新建成功!'
							});
							
						}
					}).catch(function(error) {
						self.$message.error('请求出错');
					});
			}
		}
	}
</script>

<style scoped="scoped">
	
	.el-form-item {
		margin-bottom: 22px;
		display: flex;
	}
</style>