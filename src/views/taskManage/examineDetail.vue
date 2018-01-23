<template>
	<div class="taskManage">
		<div style="height: 50px; border-bottom: 1px solid #f5f5f5;display: flex;">
			<div style="line-height: 35px;font-size: 16px;">当前位置：任务审核&nbsp;/&nbsp; <span style="color: #1393F3;;">审核内容</span></div>
			<div style="flex: 1;text-align: right;">
				<el-button class="btn" style="background: linear-gradient(29deg, #20E42C 0%, #07A63D 100%);" @click="save"><i class="iconfont icon-dazhong-22"></i>审核通过</el-button>
				<el-button class="btn" style="background: linear-gradient(29deg, #FFA450 0%, #E57640 100%);" @click="save"><i class="iconfont icon-dazhong-21"></i>审核失败</el-button>
				<el-button class="btn" style="background: linear-gradient(29deg, #F38585 0%, #ED3838 100%);" @click="retun"><i class="iconfont icon-dazhong-18"></i>返回</el-button>
			</div>
		</div>
		<div style="height:50px;line-height:50px;color:#666666;font-size:16px;">
			经销商名称：<span style="color:#333;">{{exempData.dealerName}}</span> 不合格项：
			<span style="color:#333;">{{exempData.disqualificationItem}}</span> 不涉及项：
			<span style="color:#333;">{{exempData.isInvolve}}</span> 入店时间：
			<span style="color:#333;">{{exempData.arriveDate}}</span> 离店时间：
			<span style="color:#333;">{{exempData.leftDate}}</span>
		</div>
		<div style="display: flex; height: 30px;line-height:30px;text-align: center;font-size: 13px;color:#666; border-top: 1px solid #CECECE;border-left: 1px solid #cecece;border-right: 1px solid #cecece;border-bottom: 1px solid #cecece;">
			<div style="width: 15%;border-right: 1px solid #E5E5E5;">检查类目</div>
			<div style="width: 20%;border-right: 1px solid #E5E5E5;">检查内容</div>
			<div style="width: 5%;border-right: 1px solid #E5E5E5;">照片</div>
			<div style="width: 7%;border-right: 1px solid #E5E5E5;">不合格</div>
			<div style="width: 8%;border-right: 1px solid #E5E5E5;">不涉及</div>
			<div style="width: 15%;border-right: 1px solid #E5E5E5;">判定标准</div>
			<div style="width: 10%;border-right: 1px solid #E5E5E5;">描述</div>
			<div style="width: 10%;border-right: 1px solid #E5E5E5;">经销商申诉</div>
			<div style="width: 10%;">不合格照片</div>
		</div>
		<div v-for="(list,index) in tempList" :key="index" style="width: 100%;border: 1px solid #E5E5E5;border-bottom: none;">
			<div style="width: 100%;background: #F3F4FC;;height: 37px;line-height: 37px; border-bottom: 1px solid #E5E5E5;font-size: 13.5px;color: #2A2A2A;">{{list.checkCategory}}</div>
			<div v-for="items in list.missionAuditParticularsList" style="display: flex; border-bottom: 1px solid #ececec;color:#666666;font-size: 14px;">
				<div class="flexcenter" style="width: 15%;border-right: 1px solid #E5E5E5;text-align: center;">{{items.checkCategory}}</div>
				<div class="flexcenter" style="width: 20%;border-right: 1px solid #E5E5E5;">{{items.checkContent}}</div>
				<div class="flexcenter" style="width: 5%;border-right: 1px solid #E5E5E5;text-align: center;">
					<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
						<img v-if="imageUrl" :src="items.itemImg" class="avatar">
						<i v-else class="iconfont icon-dazhong-11" style="color: #1CC112;;"></i>
					</el-upload>
				</div>
				<div class="flexcenter" style="width: 7%;border-right: 1px solid #E5E5E5;text-align: center;">
					<el-checkbox v-model="items.checkResult"></el-checkbox>
				</div>
				<div class="flexcenter" style="width: 8%;border-right: 1px solid #E5E5E5;text-align: center;">
					<el-checkbox v-model="items.isInvolve"></el-checkbox>
				</div>
				<div style="width: 15%;border-right: 1px solid #E5E5E5; ">
					<div v-for="item in items.missionAuditDetailBean" class="aa " style="height: 40px;">
						<el-checkbox v-model="item.checkResult"></el-checkbox>{{item.criterion}}
					</div>
				</div>
				<div style="width: 10%;border-right: 1px solid #E5E5E5;">
					<div class="flexcenter"  v-for="item in items.missionAuditDetailBean" style="border-bottom: 1px solid #E5E5E5;height: 40px;line-height: 40px;">
						<input v-model="item.description" style="height: 24px;"></input>
					</div>
				</div>
				<div style="width: 10%;border-right: 1px solid #E5E5E5;">
					<div class="flexcenter" v-for="item in items.missionAuditDetailBean" style="border-bottom: 1px solid #E5E5E5;height: 40px;">
						<input v-model="item.dealerComp" style="height: 24px;"></input>
					</div>
				</div>
				<div style="width: 10%;height: 40px;">
					<div class="flexcenter" v-for="item in items.missionAuditDetailBean" style="border-bottom: 1px solid #E5E5E5;height: 40px;text-align: center;">
						<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
							<img v-if="imageUrl" :src="item.detailImg" class="avatar">
							<i v-else class="iconfont icon-dazhong-11" style="color: #1CC112;;"></i>
						</el-upload>
					</div>
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
				brandTempList:[],
				imageUrl:false,
			}
		},
		created() {
			var brandId = this.$route.query.brandId; //品牌id
			var missionSchedualId = this.$route.query.missionSchedualId; //任务行程id
			var missionId = this.$route.query.missionId; //任务id
			this.getData(brandId, missionSchedualId, missionId);
		},
		methods: {
			//初始化数据
			getData(brandId, missionSchedualId, missionId) {
				var self = this;
				self.$axios.post('/vwhc/getMissionAuditParticularsList', {
						brandId: brandId,
						missionSchedualId: missionSchedualId,
						missionId: missionId
					})
					.then(res => {
						if(res.data.success == true) {
							self.exempData = res.data.data;
							self.tempList = res.data.data.missionAuditCategoryBean;
							self.brandTempList=res.data.data.missionAuditBrandList;
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
						if(datalist[i].templateDetailList[j].isNoCheck === true) {
							itemList += datalist[i].templateDetailList[j].tid + ",";
						} else {
							itemList += "";
						}
					}
				}
				itemList = itemList.substring(0, itemList.length - 1) + "]";
				var data = {
					lastUpdateUser: sessionStorage.getItem("username"), //用户名
					idList: JSON.parse(itemList)
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
				this.$router.push("/taskExamine");
			},
			//上传图片
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if(!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			}
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