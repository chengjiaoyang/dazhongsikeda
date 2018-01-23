<template>
	<div class="taskManage">
		<div style="height: 50px; border-bottom: 1px solid #f5f5f5;display: flex;">
			<div style="line-height: 35px;font-size: 16px;">当前位置：任务行程管理 &nbsp;/&nbsp; <span style="color: #1393F3;;">录入</span></div>
			<div style="flex: 1;text-align: right;">
				<el-button class="btn" style="background: linear-gradient(29deg, #20E42C 0%, #07A63D 100%);" @click="save"><i class="iconfont icon-dazhong-17"></i>保存</el-button>
				<el-button class="btn" style="background: linear-gradient(35deg, #FFA450 0%,#E57640  100%);" @click="submit"><i class="iconfont icon-dazhong-20"></i>提交</el-button>
				<el-button class="btn" style="background: linear-gradient(29deg, #F38585 0%, #ED3838 100%);"><i class="iconfont icon-dazhong-18"></i>返回</el-button>
			</div>
		</div>
		<div style="display: flex;height: 50px;line-height: 50px;">
			<div style="font-size: 24px;color:#333">{{enterData.dealerName}}</div>
			<div style="flex: 1;font-size: 16px;color: #666666;text-align: right;">
				<span>入店时间</span>
				<el-date-picker type="date" @change="setStartDate" value-format="yyyy-MM-dd" v-model="enter.arriveDate" placeholder="入店时间"></el-date-picker>
				<span>离店时间</span>
				<el-date-picker type="date" @change="setEndDate" value-format="yyyy-MM-dd" v-model="enter.leaveDate" placeholder="离店时间"></el-date-picker>
			</div>
		</div>
		<div style="display: flex; height: 30px;line-height:30px;text-align: center;font-size: 13px;color:#666; border-top: 1px solid #CECECE;border-left: 1px solid #cecece;border-right: 1px solid #cecece;">
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
		<div v-for="list in tempList" style="width: 100%;border: 1px solid #E5E5E5;">
			<div style="width: 100%;background: #F3F4FC;;height: 37px;line-height: 37px; border-bottom: 1px solid #E5E5E5;font-size: 13.5px;color: #2A2A2A;">{{list.checkCategory}}</div>
			<div v-for="items in list.templateContentList" style="display: flex; border-bottom: 1px solid #ececec;color:#666666;font-size: 14px;">
				<div class="flexcenter" style="width: 15%;border-right: 1px solid #E5E5E5;text-align: center;">{{items.checkCategory}}</div>
				<div class="flexcenter" style="width: 20%;border-right: 1px solid #E5E5E5;">{{items.checkContent}}</div>
				<div class="flexcenter" style="width: 5%;border-right: 1px solid #E5E5E5;text-align: center;">
					<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
						<img v-if="imageUrl" :src="items.imgUrl" class="avatar">
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
					<div  v-for="item in items.details" class="aa" style="height: 40px;">
						<el-checkbox v-model="item.checkResult"></el-checkbox>{{item.criterion}}
					</div>
				</div>
				<div style="width: 10%;border-right: 1px solid #E5E5E5;">
					<div v-for="item in items.details" style="border-bottom: 1px solid #E5E5E5;height: 40px;line-height: 40px;">
						<input v-model="item.description" style="height: 24px;"></input>
					</div>
				</div>
				<div style="width: 10%;border-right: 1px solid #E5E5E5;">
					<div class="flexcenter" v-for="item in items.details" style="border-bottom: 1px solid #E5E5E5;height: 40px;line-height: 40px;">
						<input v-model="item.dealerComp" style="height: 24px;"></input>
					</div>
				</div>
				<div style="width: 10%;height: 40px;">
					<div class="flexcenter" v-for="item in items.details" style="border-bottom: 1px solid #E5E5E5;height: 40px;text-align: center;">
						<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
							<img v-if="imageUrl" :src="item.imgUrl" class="avatar">
							<i v-else class="iconfont icon-dazhong-11" style="color: #1CC112;;"></i>
						</el-upload>
					</div>
				</div>
			</div>
		</div>

		<div style="margin-top: 10px;display: flex;">
			<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/">
				<el-button>问卷照片上传</el-button>
			</el-upload>
			&nbsp;&nbsp;
			<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/">
				<el-button>报备照片上传</el-button>
			</el-upload>
			&nbsp;&nbsp;
			<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/">
				<el-button>陪同人员照片上传</el-button>
			</el-upload>
			&nbsp;&nbsp;
			<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/">
				<el-button>合影照片上传</el-button>
			</el-upload>
			&nbsp;&nbsp;
			<el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/">
				<el-button>图片压缩包上传</el-button>
			</el-upload>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				enterData: '',
				tempList: [],
				input: '',
				checked: '',
				imageUrl: '',
				enter: {
					userId: '', //用户id
					userName: '', //用户名
					brandId: '', //品牌id
					missionSchedualId: '', //任务行程ID
					arriveDate: '', //入店时间
					leaveDate: '', //离店时间
					submitType: '', //1暂存  2提交
					itemList: [{
						templateContentId: '', //模板内容项id
						imgUrl: '', //图片地址
						checkResult: 1, //0不合格 1合格
						isInvolve: '', //0不涉及 1 涉及
						details: [{
							templateContentDetailId: '', //模板内容明细id
							checkResult: 1, //0不合格 1合格
							description: '', //描述
							dealerComp: '', //经销商申诉
							imgUrl: '', //图片路径
						}]

					}],
					brandItemList: []
				},

			}
		},
		created() {
			var id=this.$route.query.id;//任务行程id
			this.getData(id);
		},
		methods: {
			//初始化数据
			getData(id) {
				var self = this;
				self.$axios.post('/vwhc/rest/common/getTemplateContent', {
						missionSchedualId: id,
						type: 1
					})
					.then(res => {
						if(res.data.success == true) {
							self.enterData = res.data.data;
							self.tempList = res.data.data.templateFirstCategoryList;
						}
					}).catch(function(error) {
						self.$message.error('请求出错');
					});
			},
			//保存
			save() {
				var self = this;
				var datalist = self.tempList;
				var itemList = "[";
				for(var i in datalist) { //、、、1
					for(var j in datalist[i].templateContentList) { //、、、2
						//itemList---
						var templateContentId = datalist[i].templateContentList[j].id; //模板內容項id
						var imgUrl = datalist[i].templateContentList[j].imgUrl; //图片地址
						var checkResult = 1; //不合格
						//						alert(datalist[i].templateContentList[j].checkResult);
						if(datalist[i].templateContentList[j].checkResult == 1) { //1合格未选中   0 不合格选中 
							checkResult = 1;
						} else {
							checkResult = 0;
						}
						var isInvolve = 1; //不涉及
						if(datalist[i].templateContentList[j].isInvolve == 1) {
							isInvolve = 1;
						} else {
							isInvolve = 0;
						}
						var details = "[";
						for(var k in datalist[i].templateContentList[j].details) { //、、、3
							//details---
							var templateContentDetailId = datalist[i].templateContentList[j].details[k].id; //模板内容明细id
							var checkResult1 = 1;
							//							alert(datalist[i].templateContentList[j].details[k].checkResult);
							if(datalist[i].templateContentList[j].details[k].checkResult == 1) {
								checkResult1 = 1;
							} else {
								checkResult1 = 0;
							}
							var description = datalist[i].templateContentList[j].details[k].description;
							var dealerComp = datalist[i].templateContentList[j].details[k].dealerComp;
							var imgUrl = datalist[i].templateContentList[j].details[k].imgUrl;
							details += '{"templateContentDetailId":"' + templateContentDetailId + '","checkResult":"' + checkResult1 + '","description":"' + description + '","dealerComp": "' + dealerComp + '","imgUrl": "' + imgUrl + '"},';
						}
						details = details.substring(0, details.length - 1) + "]";
						itemList += '{"templateContentId": "' + templateContentId + '", "imgUrl": "' + imgUrl + '", "checkResult": "' + checkResult + '", "isInvolve":"' + isInvolve + '","details":' + details + '},';
					}
				}
				itemList = itemList.substring(0, itemList.length - 1) + "]";
				var data = {
					userId: sessionStorage.getItem("userId"), //用户id
					userName: sessionStorage.getItem("username"), //用户名
					brandId: '2', //品牌id
					missionSchedualId: self.$route.query.id, //任务行程ID
					arriveDate: self.enter.arriveDate, //入店时间
					leaveDate: self.enter.leaveDate, //离店时间
					submitType: 1, //1暂存  2提交
					itemList: JSON.parse(itemList),
					brandItemList: []
				}
				console.log(JSON.stringify(data));
				self.$axios.post('/vwhc/rest/mission/input', data)
					.then(res => {
						if(res.data.success == true) {
							self.$message({
								type: 'success',
								message: '保存成功!'
							});
							self.$router.push("/taskScheManage");
						} else {
							self.$message.error(res.data.msg);
						}
					}).catch(function(error) {
						self.$message.error('请求出错');
					});

			},
			//提交
			submit() {
				var self = this;
				var datalist = self.tempList;
				var itemList = "[";
				for(var i in datalist) { //、、、1
					for(var j in datalist[i].templateContentList) { //、、、2
						//itemList---
						var templateContentId = datalist[i].templateContentList[j].id; //模板內容項id
						var imgUrl = datalist[i].templateContentList[j].imgUrl; //图片地址
						var checkResult = 1; //不合格
						//						alert(datalist[i].templateContentList[j].checkResult);
						if(datalist[i].templateContentList[j].checkResult == 1) { //1合格未选中   0 不合格选中 
							checkResult = 1;
						} else {
							checkResult = 0;
						}
						var isInvolve = 1; //不涉及
						if(datalist[i].templateContentList[j].isInvolve == 1) {
							isInvolve = 1;
						} else {
							isInvolve = 0;
						}
						var details = "[";
						for(var k in datalist[i].templateContentList[j].details) { //、、、3
							//details---
							var templateContentDetailId = datalist[i].templateContentList[j].details[k].id; //模板内容明细id
							var checkResult1 = 1;
							//							alert(datalist[i].templateContentList[j].details[k].checkResult);
							if(datalist[i].templateContentList[j].details[k].checkResult == 1) {
								checkResult1 = 1;
							} else {
								checkResult1 = 0;
							}
							var description = datalist[i].templateContentList[j].details[k].description;
							var dealerComp = datalist[i].templateContentList[j].details[k].dealerComp;
							var imgUrl = datalist[i].templateContentList[j].details[k].imgUrl;
							details += '{"templateContentDetailId":"' + templateContentDetailId + '","checkResult":"' + checkResult1 + '","description":"' + description + '","dealerComp": "' + dealerComp + '","imgUrl": "' + imgUrl + '"},';
						}
						details = details.substring(0, details.length - 1) + "]";
						itemList += '{"templateContentId": "' + templateContentId + '", "imgUrl": "' + imgUrl + '", "checkResult": "' + checkResult + '", "isInvolve":"' + isInvolve + '","details":' + details + '},';
					}
				}
				itemList = itemList.substring(0, itemList.length - 1) + "]";
				var data = {
					userId: sessionStorage.getItem("userId"), //用户id
					userName: sessionStorage.getItem("username"), //用户名
					brandId: '2', //品牌id
					missionSchedualId: self.$route.query.id, //任务行程ID
					arriveDate: self.enter.arriveDate, //入店时间
					leaveDate: self.enter.leaveDate, //离店时间
					submitType: 2, //1暂存  2提交
					itemList: JSON.parse(itemList),
					brandItemList: []
				}
				console.log(JSON.stringify(data));
				self.$axios.post('/vwhc/rest/mission/input', data)
					.then(res => {
						if(res.data.success == true) {
							self.$message({
								type: 'success',
								message: '提交成功!'
							});
							self.$router.push("/taskScheManage");
						} else {
							self.$message.error(res.data.msg);
						}
					}).catch(function(error) {
						self.$message.error('请求出错');
					});

			},
			//时间转换
			setStartDate(val) {
				this.enter.arriveDate = val;
			},
			setEndDate(val) {
				this.enter.leaveDate = val;
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