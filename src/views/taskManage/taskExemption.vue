<template>
	<div class="taskManage">
		<div style="height: 50px; border-bottom: 1px solid #f5f5f5;display: flex;">
			<div style="line-height: 35px;font-size: 16px;">当前位置：任务行程管理 &nbsp;/&nbsp; <span style="color: #1393F3;;">免检设置</span></div>
			<div style="flex: 1;text-align: right;">
				<el-button class="btn" style="background: linear-gradient(29deg, #20E42C 0%, #07A63D 100%);" @click="save"><i class="iconfont icon-dazhong-17"></i>保存</el-button>
				<el-button class="btn" style="background: linear-gradient(29deg, #F38585 0%, #ED3838 100%);" @click="retun"><i class="iconfont icon-dazhong-18"></i>返回</el-button>
			</div>
		</div>
		<div style="height:60px;line-height:60px;color:#666666;font-size:16px;">
			经销商名称：<span style="color:#333;">{{exempData.dealerName}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 任务名称：
			<span style="color:#333;">{{exempData.missionName}}</span>
		</div>
		<div style="display: flex; height: 30px;line-height:30px;text-align: center;font-size: 13px;color:#666; border-top: 1px solid #CECECE;border-left: 1px solid #cecece;border-right: 1px solid #cecece;border-bottom: 1px solid #cecece;">
			<div style="width: 15%;border-right: 1px solid #E5E5E5;">检查类目</div>
			<div style="width: 75%;border-right: 1px solid #E5E5E5;">检查内容</div>
			<div style="width: 10%;">免检</div>
		</div>
		<div v-for="(list,index) in tempList" :key="index" style="width: 100%;border: 1px solid #E5E5E5;border-bottom: none;">
			<div style="width: auto;background: #F3F4FC;;height: 37px;line-height: 37px;padding-left: 10px; border-bottom: 1px solid #E5E5E5;font-size: 13.5px;color: #2a2a2a;">{{list.checkCategory}}</div>
			<div v-for="(items,index) in list.templateDetailList" :key="index" style="display: flex; border-bottom: 1px solid #ececec;font-size: 14px;color: #2a2a2a;">
				<div class="flexcenter" style="width: 15%;border-right: 1px solid #E5E5E5;text-align: center;padding-top: 10px;padding-bottom: 10px;">{{items.category}}</div>
				<div  style="width: 75%;border-right: 1px solid #E5E5E5;padding-left: 10px;"><!--{{items.tid}}，{{items.isNoCheck}}，-->{{items.checkContent}}</div>
				<div class="flexcenter" style="width:10%;border-right: 1px solid #E5E5E5;text-align: center;">
					<el-checkbox v-model="items.isNoCheck"></el-checkbox>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				exempData: '',
				tempList: [], //数据列表
			}
		},
		created() {
			var id=this.$route.query.id;
			this.getData(id);
		},
		methods: {
			//初始化数据
			getData(id) {
				var self = this;
				self.$axios.get('/vwhc/rest/MissionSchedualTrip/getIsNoCheck?id='+id)
					.then(res => {
						if(res.data.success == true) {
							self.exempData = res.data.data;
							self.tempList = res.data.data.templateFatherList;
						}
					}).catch(function(error) {
						self.$message.error('请求出错');
					});
			},
			//保存
			save() {
				var self = this;
				var datalist = self.tempList; //数据列表
				var itemList = "[";
				for(var i in datalist) {
					for(var j in datalist[i].templateDetailList) {
						if(datalist[i].templateDetailList[j].isNoCheck===true) {
							itemList += datalist[i].templateDetailList[j].tid + ",";
						} else {
							itemList += "";
						}
					}
				}
				itemList = itemList.substring(0, itemList.length - 1) + "]";
				var data = {
					lastUpdateUser: sessionStorage.getItem("username"), //用户名
					idList:JSON.parse(itemList)
				}
				self.$axios.post('/vwhc/rest/MissionSchedualTrip/updateIsNoCheck', data)
					.then(res => {
						if(res.data.success == true) {
							self.$message({
								type: 'success',
								message: '免检成功!'
							});
							self.$router.push("/taskScheManage");
						} else {
							self.$message.error(res.data.msg);
						}
					}).catch(function(error) {
						self.$message.error('请求出错');
					});

				console.log(data);

			},
			//返回
			retun() {
				this.$router.push("/taskScheManage");
			},
		
		}
	}
</script>

<style scoped="scoped">
	.btn {
		height: 33px;
		line-height: 33px;
		padding: 0px 15px;
		color: #fff;
		border: none;
	}
	
	.aa {
		border-bottom: 1px solid #E5E5E5;
	}
	
	input {
		width: 90%;
		height: 30px;
		margin-top: 5px;
		margin-left: 5%;
	}
</style>