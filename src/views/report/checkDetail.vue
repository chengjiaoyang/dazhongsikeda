<template>
	<div class="taskManage">
		<div style="font-size: 24px;text-align: center;height: 50px;line-height: 50px;">详细得分</div>
		<div style="text-align: right;">
			<el-button type="primary" :disabled="releaseDate<'0'">提交申诉</el-button>&nbsp;&nbsp;&nbsp;&nbsp;<br />
			<span style="font-size: 13px;" v-if="releaseDate>'0'">（申诉时间剩余{{releaseDate}}天）</span>
		</div>
		<div style="display: flex;height: 50px;line-height: 50px;">
			<div style="flex: 1;">检查性质：{{scoreInfo.missionName}}</div>
			<div style="flex: 1;">经销商名称：{{scoreInfo.dealerName}}</div>
		</div>
		<table cellspacing="0" cellpadding="0" style="width: 100%;border: 1px solid #E5E5E5;border-top: none;">
			<thead>
				<tr style="height: 30px;line-height: 30px;background: #c1ffff;">
					<td style="width: 5%;" class="bcb">序号</td>
					<td style="width: 15%;" class="bcb">检查项目</td>
					<td style="width: 25%;" class="bcb">检查内容</td>
					<td style="width: 5%;" class="bcb">权重</td>
					<td style="width: 5%;" class="bcb">编号</td>
					<td style="width: 15%;" class="bcb">未达到原因</td>
					<td style="width: 5%;" class="bcb">判断结果</td>
					<td style="width: 15%;" class="bcb">描述</td>
					<td style="width: 10%;text-align: center;border-bottom: 1px solid #E5E5E5;">申诉</td>
				</tr>
			</thead>
			<tbody>
				<tr style="height: 30px;line-height: 30px;" :class="item.number.length=='1'?'bg1':''" v-for="item in tableData">
					<td style="width: 5%;" class="bcb">{{item.number}}</td>
					<td style="width: 15%;" class="bcb">{{item.checkCategory}}</td>
					<td style="width: 25%;" class="bcb">{{item.checkContent}}</td>
					<td style="width: 5%;" class="bcb">{{item.weight}}</td>
					<td style="width: 5%;" class="bcb">{{item.id}}</td>
					<td style="width: 15%;" class="bcb">
						<div class="criterion" v-for="it in item.templateContentDetailList">{{it.criterion}}</div>
						<!--<div class="criterion" v-for="it in item.templateContentDetailList" >{{it.checkResult |capitalize}}</div>-->
					</td>
					<td style="width: 5%;" class="bcb">
						<div class="criterion" v-for="it in item.templateContentDetailList">{{it.checkResult |capitalize}}</div>
					</td>
					<td style="width: 15%;" class="bcb">{{item.itemDesc}}</td>
					<td style="width: 10%;text-align: center;border-bottom: 1px solid #E5E5E5;">
						<div class="criterion" v-if="releaseDate<'0'& it.id==null " v-for="it in item.templateContentDetailList">
							<el-button type="text" @click="complain(it.criterion,it.imgUrl)">申诉</el-button>
							<el-button type="text" v-if="it.id!=null" disabled> 已填写</el-button>
						</div>

					</td>
				</tr>
			</tbody>
		</table>
		<!--申诉弹出框-->
		<el-dialog title="不合格申诉" :visible.sync="dialogFormVisible" :closeOnClickModal="closeModal">
			<el-form label-width="100px">
				<el-form-item label="不合格项：">
					<div style="flex:1;">{{criterion}}</div>
				</el-form-item>
				<el-form-item label="不合格图片：">
					<div style="flex:1;">预览</div>
				</el-form-item>
				<el-form-item label="申诉说明：">
					<el-input v-model="addComp.explain" placeholder="请输入申诉说明"></el-input>
				</el-form-item>
				<el-form-item label="图片上传：">

				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align: center;">
				<el-button type="primary" @click="addComplain()">保存</el-button>
				<el-button @click="dialogFormVisible = false">返回</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				releaseDate: '', //申诉剩余时间
				scoreInfo: '',
				dialogFormVisible: false,
				closeModal: false,
				criterion: '', //不合格项信息
				imgUrl: '', //不合格项图片
				addComp: {
					explain: '', //申诉说明：
					img_url: '', //图片地址
					schedualId: 1, //任务想程id
					templateContentDetailId: 1, //检查项ID
				}
			}
		},
		filters: {
			capitalize: function(value) {
				if(value == 0) {
					return '0';
				} else if(value == 1) {
					return '1';
				} else {
					return 'a';
				}

			}
		},
		created() {
			this.getData();
		},
		methods: {
			//初始化数据
			getData() {
				var self = this;
				self.scoreInfo = JSON.parse(localStorage.getItem("scoreInfo"));
				self.$axios.post('/vwhc/rest/MissionSchedual/selectMissionSchedualScoreDetail', {
						missionSchedualId: 1,
						dealerId: 1,
						missionId: 1
					})
					.then(res => {
						if(res.data.success == true) {
							self.tableData = res.data.data.dataList;
							self.releaseDate = res.data.data.releaseDate;
						}
					}).catch(function(error) {
						self.$message.error('请求出错');
					});
			},
			//申诉
			complain(criterion, imgUrl) {
				this.dialogFormVisible = true;
				this.criterion = criterion;
				this.imgUrl = imgUrl;
			},
			//保存申诉
			addComplain() {
				var self = this;
				self.$axios.post('/vwhc/rest/MissionSchedual/addCompResult', self.addComp)
					.then(res => {
						if(res.data.success == true) {
							self.$message({
								type: 'success',
								message: '申诉成功!'
							});
							self.dialogFormVisible=false;
							self.getData();
						}
					}).catch(function(error) {
						self.$message.error('请求出错');
					});
			}
		}
	}
</script>

<style scoped="scoped">
	.bcb {
		text-align: center;
		border-right: 1px solid #E5E5E5;
		border-bottom: 1px solid #E5E5E5;
	}
	
	.bcc {
		text-align: center;
		border-right: 1px solid #E5E5E5;
	}
	
	.bg1 {
		background: #f2f2f2;
	}
	
	.criterion {
		border-bottom: 1px solid #e5e5e5;
		height: 60px;
	}
	
	.criterion:last-child {
		border-bottom: none;
	}
</style>