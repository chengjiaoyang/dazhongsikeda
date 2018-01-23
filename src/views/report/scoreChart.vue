<template>
	<div class="taskManage">
		<div style="font-size: 24px;text-align: center;height: 50px;line-height: 50px;">经销商现场检查得分卡</div>
		<div style="display: flex;height: 50px;line-height: 50px;">
			<div style="flex: 1;">检查性质：{{scoreInfo.missionName}}</div>
			<div style="flex: 1;">RSSC：{{scoreInfo.district}}</div>
		</div>
		<div style="display: flex;">
			<div style="flex: 1;">经销商名称：{{scoreInfo.dealerName}}</div>
			<div style="flex: 1;">网络代码：{{scoreInfo.dealerCode}}</div>
		</div>
		<div style=" display: flex;height: 30px;line-height: 30px; border: 1px solid #E5E5E5;text-align: center;margin-top: 10px;">
			<div style="flex: 1;border-right: 1px solid #E5E5E5;"></div>
			<div style="flex: 1;border-right: 1px solid #E5E5E5;">经销商</div>
			<div style="flex: 1;border-right: 1px solid #E5E5E5;">RSSC</div>
			<div style="flex: 1;">全国</div>
		</div>
		<div style="display: flex;height: 30px;line-height: 30px;border: 1px solid #E5E5E5;border-top: none;text-align: center;">
			<div style="flex: 1;border-right: 1px solid #E5E5E5;">总体得分</div>
			<div style="flex: 1;border-right: 1px solid #E5E5E5;">90</div>
			<div style="flex: 1;border-right: 1px solid #E5E5E5;">80</div>
			<div style="flex: 1;">81</div>
		</div>
		<table cellspacing="0" cellpadding="0" style="margin-top:10px;width: 100%;border: 1px solid #E5E5E5;">
			<thead>
				<tr style="height: 30px;line-height: 30px;background: #c1ffff;">
					<td style="width: 8%;" class="bcb">序号</td>
					<td style="width: 22%;" class="bcb">检查项目</td>
					<td style="width: 30%;" class="bcb">检查内容</td>
					<td style="width: 10%;" class="bcb">权重</td>
					<td style="width: 10%;" class="bcb">得分</td>
					<td style="width: 10%;" class="bcb">RSSC</td>
					<td style="width: 10%;text-align: center;border-bottom: 1px solid #E5E5E5;">全国</td>
				</tr>
			</thead>
			<tbody>
				<tr style="height: 30px;line-height: 30px;" :class="item.number.length=='1'?'bg1':''" v-for="item in tableData" >
					<td style="width: 8%;" class="bcb">{{item.number}}</td>
					<td style="width: 22%;" class="bcb">{{item.checkCategory}}</td>
					<td style="width: 30%;" class="bcb">{{item.checkContent}}</td>
					<td style="width: 10%;" class="bcb">{{item.weight}}</td>
					<td style="width: 10%;" class="bcb">{{item.score}}</td>
					<td style="width: 10%;" class="bcb">{{item.rssc}}</td>
					<td style="width: 10%;text-align: center;border-bottom: 1px solid #E5E5E5;">{{item.global}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				scoreInfo:'',
			}
		},
		created() {
			this.getData();
		},
		methods: {
			//初始化数据
			getData() {
				var self = this;
				self.scoreInfo=JSON.parse(localStorage.getItem("scoreInfo"));
				self.$axios.post('/vwhc/rest/MissionSchedual/getMissionSchedualScore', {
						missionSchedualId: 1,
						dealerId: 1,
						missionId: 1
					})
					.then(res => {
						if(res.data.success == true) {
							self.tableData = res.data.data;
						}
					}).catch(function(error) {
						self.$message.error('请求出错');
					});
			},
		}
	}
</script>

<style scoped="scoped">
	
	.bcb {
		text-align: center;
		border-right: 1px solid #E5E5E5;
		border-bottom: 1px solid #E5E5E5;
	}
	.bg1{
		background: #f2f2f2;
	}
</style>