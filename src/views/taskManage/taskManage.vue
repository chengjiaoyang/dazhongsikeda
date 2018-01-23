<template>
	<div class="taskManage" v-bind:style="{height:divHeight}">
		<!--搜索区-->
		<div style="height: 60px; margin-top: 10px;border-bottom: 1px solid #E1E1E1;" v-show="isShow">
			<el-row :gutter="24">
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 90px;line-height: 36px;">任务名称</span>
					<el-input v-model="reqParams.missionName" placeholder="请输入任务名称" @keyup.enter.native="getmissionName($event)" clearable></el-input>
					<ul v-show="nameShow" id="namelist">
						<li v-for="name in nameList" @click="getName(name.missionName)">{{name.missionName}}</li>
					</ul>
				</el-col>
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 90px;line-height: 36px;">年度：</span>
					<el-date-picker v-model="reqParams.year" align="right" type="year" value-format="yyyy" placeholder="请选择年度" style="width: 100%;" @change="setDate">
					</el-date-picker>
				</el-col>
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 90px;line-height: 36px;">季度：</span>
					<el-select placeholder="请选择季度" v-model="reqParams.season">
						<el-option key="第一季度" label="第一季度" value="1"></el-option>
						<el-option key="第二季度" label="第二季度" value="2"></el-option>
						<el-option key="第三季度" label="第三季度" value="3"></el-option>
						<el-option key="第四季度" label="第四季度" value="4"></el-option>
					</el-select>
				</el-col>
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 90px;line-height: 36px;">状态：</span>
					<el-select placeholder="请选择状态" v-model="reqParams.status">
						<el-option v-for="item in stateList" :key="item.code" :label="item.value" :value="item.code"></el-option>
					</el-select>
				</el-col>
				<el-col :span="4" style="display: flex;">
					<el-button class="btn2" style="background-image: linear-gradient(34deg, #18AEFF 0%, #1B87F2 100%);" @click="search">查询</el-button>
					<el-button class="btn2" style="background-image: linear-gradient(35deg, #E57640 0%, #FFA450 100%);border: none;" @click="reset">重置</el-button>
					<div @click="hidden" style="width: 50px; text-align: right;line-height: 36px;"><span class="iconfont icon-dazhong-25" style="color: #BEC3E5;"></span></div>
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
			<el-button class="btn" @click="add" style="background-image: linear-gradient(35deg, #20E42C 0%, #07A63D 100%);"><i class="iconfont icon-dazhong-5"></i>新建</el-button>
			<el-button class="btn" @click="deleteTask" style="background-image: linear-gradient(35deg, #FFA450 0%, #E57640 100%);"><i class="iconfont icon-dazhong-8"></i>删除</el-button>

		</div>

		<!--表格-->
		<div style="margin-top: 20px;">
			<el-table :data="tableData" border style="width: 100%" v-loading="tableLoading" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="80" align="center">
				</el-table-column>
				<el-table-column prop="brandName" label="品牌" align="center" width="160">
				</el-table-column>
				<el-table-column prop="missionName" label="任务名称" align="center" width="160">
				</el-table-column>
				<el-table-column prop="year" label="年度" align="center" width="120">
				</el-table-column>
				<el-table-column prop="season" label="季度" align="center" width="120">
					<template slot-scope="scope">
						<span v-if="scope.row.season == '1'">第一季度</span>
						<span v-if="scope.row.season == '2'">第二季度</span>
						<span v-if="scope.row.season == '3'">第三季度</span>
						<span v-if="scope.row.season == '4'">第四季度</span>
					</template>
				</el-table-column>
				<el-table-column prop="startDate" label="开始时间" align="center" width="140">
				</el-table-column>
				<el-table-column prop="endDate" label="结束时间" align="center" width="140">
				</el-table-column>
				<el-table-column prop="value" label="状态" align="center" width="140">
				</el-table-column>
				<el-table-column prop="dealerQty" label="检查量" align="center" width="160">
				</el-table-column>
				<el-table-column label="操作" align="center" width="200" fixed="right">
					<template slot-scope="scope">
						<el-button size="small" type="text" @click="update(scope)">修改</el-button>
						<el-button size="small" type="text" @click="deleteOne(scope)">删除</el-button>
						<el-button size="small" type="text" @click="see(scope)">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!--页码-->
		<div style="text-align: right;margin-top: 10px;">
			<el-pagination @current-change="handleCurrentChange" :current-page.sync="reqParams.pageNo" :page-size="reqParams.pageSize" layout="total,prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>

		<!--弹出添加-->
		<el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :closeOnClickModal="closeModal">
			<el-form :model="addTask" :rules="rules" ref="addTask" label-width="100px">
				<el-form-item label="品牌：" prop="brandId">
					<div style="flex:1;" v-if="brandId==2">大众</div>
					<div style="flex:1;" v-if="brandId==3">斯柯达</div>
				</el-form-item>
				<el-form-item label="年度：" prop="year">
					<el-select placeholder="请选择年度" v-model="addTask.year">
						<el-option key="2018" label="2018" value="2018"></el-option>
						<el-option key="2019" label="2019" value="2019"></el-option>
						<el-option key="2020" label="2020" value="2020"></el-option>
						<el-option key="2021" label="2021" value="2021"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="季度：" prop="season">
					<el-select placeholder="请选择季度" v-model="addTask.season" @change="getOtherInfo()">
						<el-option key="第一季度" label="第一季度" value="1"></el-option>
						<el-option key="第二季度" label="第二季度" value="2"></el-option>
						<el-option key="第三季度" label="第三季度" value="3"></el-option>
						<el-option key="第四季度" label="第四季度" value="4"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="标题：" prop="missionName">
					<el-input v-model="addTask.missionName" auto-complete="off" style="width: 200%;"></el-input>
				</el-form-item>
				<el-form-item label="说明：">
					<el-input type="textarea" v-model="addTask.description" style="width: 200%;"></el-input>
				</el-form-item>
				<el-form-item label="开始时间：" prop="startDate">
					<el-date-picker v-model="startendtimes" value-format="yyyy-MM-dd" @change="setStartDate" style="width: 100%;" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="问卷：" prop="templateId">
					<el-select placeholder="请选择问卷" style="width: 200%;" v-model="addTask.templateId">
						<el-option v-for="item in quesList" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="形象检查：">
					<el-select placeholder="请选择形象检查" style="width: 200%;" v-model="addTask.brandTemplateId">
						<el-option v-for="item in figureList" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">关闭</el-button>
				<el-button type="success" @click="priview('addTask')">预览</el-button>
				<el-button type="primary" @click="addConfirm('addTask')">提交</el-button>
			</div>
		</el-dialog>
		<!--显示任务详情-->
		<el-dialog title="任务详细信息" :visible.sync="DetaildialogVisible" :closeOnClickModal="closeModal">
			<el-form :model="taskInfo">
				<el-form-item label="品牌" :label-width="formLabelWidth">
					<el-input v-model="taskInfo.brandId" :disabled="true" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="年度" :label-width="formLabelWidth">
					<el-input v-model="taskInfo.year" :disabled="true" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="季度" :label-width="formLabelWidth">
					<el-input v-model="taskInfo.season" :disabled="true" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="标题" :label-width="formLabelWidth">
					<el-input v-model="taskInfo.missionName" :disabled="true" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="说明" :label-width="formLabelWidth">
					<el-input v-model="taskInfo.description" :disabled="true" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="开始时间" :label-width="formLabelWidth">
					<el-input v-model="taskInfo.startDate" :disabled="true" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="结束时间" :label-width="formLabelWidth">
					<el-input v-model="taskInfo.endDate" :disabled="true" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="问卷" :label-width="formLabelWidth">
					<el-select style="width: 70%;" v-model="taskInfo.templateId" :disabled="true">
						<el-option v-for="item in quesList" :key="item.id" :label="item.name" :value="item.id">{{item.name}}</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="形象检查" :label-width="formLabelWidth">
					<el-select style="width: 70%;" v-model="taskInfo.brandTemplateId" :disabled="true">
						<el-option v-for="item in figureList" :key="item.id" :label="item.name" :value="item.id">{{item.name}}</el-option>
					</el-select>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				//				isshow: true,
				//				missionName: "",
				//				citys: ['北京', '北海', '东北', '上海', '武汉', '东京', '广州', '广元市', '上饶', '上水市'],
				//				selectCitys: [],

				divHeight: '',
				nameList: [], //智能下拉列表
				nameShow: false,
				isShow: true, //搜索区是否显示
				btnShow: false, //显示的按钮是否显示
				startendtimes: '',
				isAdd: false, //是否是新增
				DetaildialogVisible: false,
				tableData: [], //表格数据
				reqParams: {
					pageNo: 1,
					pageSize: 6,
					missionName: "",
					year: "",
					season: "",
					status: "",
					brandId:'',
				},
				stateList: [], //状态列表
				quesList: [], //问卷列表
				figureList: [], //形象检查列表
				tableLoading: false, //默认有loading
				total: 0,
				dialogTitle: '新建任务',
				dialogFormVisible: false,
				closeModal: false, //点击弹出遮罩层 页面不关闭
				formLabelWidth: '120px',
				multipleSelection: [],
				addTask: {
					brandId: '',
					year: '',
					templateId: '',
					brandTemplateId: '',
					season: '',
					missionName: '', //标题
					description: '', //说明
					startDate: '',
					endDate: '',
					createUser: '',
					id: '',
				},
				brandId:'',
				taskInfo: {},
				//添加的规则校验
				rules: {
					year: [{
						required: true,
						message: '请选择年度',
						trigger: 'change'
					}],
					season: [{
						required: true,
						message: '请选择季度',
						trigger: 'change'
					}],
					missionName: [{
						required: true,
						message: '请输入标题',
						trigger: 'blur'
					}],
					templateId: [{
						required: true,
						message: '请选择问卷',
						trigger: 'change',
						type: 'number'
					}],
					startDate: [{
						required: true,
						message: '请输入日期',
						trigger: 'blur'
					}]
				},
			}
		},
		created() {
			this.divHeight = document.documentElement.clientHeight * 0.88 + "px";
			this.getData();
			this.getStatusList(); //获取状态列表
		},
		methods: {
			//初始化数据
			getData() {
				var self = this;
				self.reqParams.brandId=localStorage.getItem("brandId");
				self.$axios.post('/vwhc/getMissionAll', self.reqParams)
					.then(res => {
						if(res.data.success == true) {
							self.tableData = res.data.data.missionBeanlist;
							if(self.total == 0) {
								self.total = res.data.data.pageSum;
							}
						}
					}).catch(function(error) {
						self.$message.error('请求出错');
					});
			},
			//查询
			search() {
				var self = this;
				self.reqParams.pageNo = 1;
				self.total = 0;
				self.getData();
			},
			//重置
			reset() {
				var self = this;
				self.reqParams.missionName = '';
				self.reqParams.year = '';
				self.reqParams.season = '';
				self.reqParams.status = '';
				self.reqParams.brandId = '';
				self.getData();
			},
			//获取状态列表
			getStatusList() {
				var self = this;
				self.$axios.post('/vwhc/rest/common/getDictVal', {
						dictName: "MISSION_TYPE"
					})
					.then(res => {
						if(res.data.success == true) {
							self.stateList = res.data.data.sysCodeResBeanList;
						}
					}).catch(function(error) {
						self.$message.error('请求出错');
					});
			},
			//获取问卷和形象调查模板
			getTemplate(brandId, year, season) {
				var self = this;
				self.$axios.post('/vwhc/getTemplate', {
						brandId: brandId,
						year: year,
						season: season
					})
					.then(res => {
						if(res.data.success == true) {
							self.quesList = res.data.data.templatetype1;
							self.figureList = res.data.data.templatetype2;
						}
					}).catch(function(error) {
						self.$message.error('请求出错');
					});
			},
			//新建
			add() {
				this.brandId=localStorage.getItem("brandId");
				this.dialogFormVisible = true;
				this.isAdd = true;
				this.dialogTitle = "新建任务";
				this.addTask = {
					brandId: '',
					year: '',
					templateId: '',
					brandTemplateId: '',
					season: '',
					missionName: '', //标题
					description: '', //说明
					startDate: '',
					endDate: '',
					createUser: '',
					id: '',
				}
			},
			//确定新建
			addConfirm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						var self = this;
						self.addTask.createUser=sessionStorage.getItem("username");
						//先判断任务名称是否重复
						//						self.$axios.post('/vwhc/isMissionName', {
						//							missionName:self.addTask.missionName
						//						})
						//								.then(res => {
						//									if(res.data.success == true) {
						//										
						//									}
						//								}).catch(function(error) {
						//									self.$message.error('请求出错');
						//								});
                        self.addTask.brandId=localStorage.getItem("brandId");
						if(self.isAdd) {
							self.$axios.post('/vwhc/addmission', self.addTask)
								.then(res => {
									if(res.data.success == true) {
										this.dialogFormVisible = false;
										self.$message({
											type: 'success',
											message: '新建成功!'
										});
										self.getData();
									}
								}).catch(function(error) {
									self.$message.error('请求出错');
								});
						} else {
							self.$axios.post('/vwhc/update', self.addTask)
								.then(res => {
									if(res.data.success == true) {
										this.dialogFormVisible = false;
										self.$message({
											type: 'success',
											message: '修改成功!'
										});
										self.getData();
									}
								}).catch(function(error) {
									self.$message.error('请求出错');
								});
						}
					} else {
						console.log('error submit!!');
						return false;
					}
				})

			},
			//全选
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			//根据品牌 年度季度问卷 形象检查
			getOtherInfo() {
				var self = this;
                self.addTask.brandId=localStorage.getItem("brandId");
				if(!self.addTask.year) return
				//获取问卷和形象调查模板
				self.getTemplate(self.addTask.brandId, self.addTask.year, self.addTask.season);
			},
			//批量删除
			deleteTask() {
				var self = this;
				if(this.multipleSelection.length === 0) {
					this.$message({
						message: '请选择一条数据',
						type: 'error'
					})
					return;
				}
				var msg = '确定要删除吗';
				self.$confirm(msg, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					closeOnClickModal: false,
					type: 'warning'
				}).then(() => {

					var lists = this.multipleSelection;
					var idList = "[";
					for(var i in lists) {
						idList += lists[i].id + ",";
					}
					idList = JSON.parse(idList.substring(0, idList.length - 1) + "]");
					console.log(idList)
					self.$axios.post('/vwhc/detele', {
						idList: idList,
						userName: sessionStorage.getItem("username")
					}).then(res => {
						if(res.data.success == true) {
							this.dialogFormVisible = false;
							self.$message({
								type: 'success',
								message: '删除成功!'
							});
							self.getData();
						}
					}).catch(function(error) {
						self.$message.error('请求出错');
					});

				}).catch(() => {
					self.$message({
						type: 'info',
						message: '已取消操作'
					});
				});
			},
			//修改
			update(scope) {
				var self = this;
				this.isAdd = false;
				var id = scope.row.id;
				//查询任务详情信息
				self.$axios.post('/vwhc/updateTo', {
						id: id
					})
					.then(res => {
						if(res.data.success == true) {
							var brandId = res.data.data.toBeansList[0].brandId;
							var year = res.data.data.toBeansList[0].year;
							var season = res.data.data.toBeansList[0].season;
							self.getTemplate(brandId, year, season)
							self.addTask = {
								id: id,
								brandId: brandId,
								year: year,
								templateId: res.data.data.toBeansList[0].templateId,
								brandTemplateId: res.data.data.toBeansList[0].brandTemplateId,
								season: season,
								missionName: res.data.data.toBeansList[0].missionName, //标题
								description: res.data.data.toBeansList[0].description, //说明
								startDate: res.data.data.toBeansList[0].startDate,
								endDate: res.data.data.toBeansList[0].endDate
							}
							self.startendtimes = ['' + res.data.data.toBeansList[0].startDate + '', '' + res.data.data.toBeansList[0].endDate + ''];

							self.dialogFormVisible = true;

							self.dialogTitle = "编辑任务信息";
						}
					}).catch(function(error) {
						self.$message.error('请求出错');
					});
			},
			//删除一个
			deleteOne(scope) {
				var self = this;
				var msg = '确定要删除吗';
				self.$confirm(msg, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					closeOnClickModal: false,
					type: 'warning'
				}).then(() => {
					var id = '[' + scope.row.id + ']';
					//删除一条数据
					self.$axios.post('/vwhc/detele', {
							idList: JSON.parse(id),
							userName: sessionStorage.getItem("username")
						})
						.then(res => {
							if(res.data.success == true) {
								self.getData();
								self.$message({
									type: 'success',
									message: '删除成功!'
								});
							}
						}).catch(function(error) {
							self.$message.error('请求出错');
						});

				}).catch(() => {
					self.$message({
						type: 'info',
						message: '已取消操作'
					});
				});
			},
			//查看
			see(scope) {
				var self = this;
				self.taskInfo = {};
				var id = scope.row.id;
				//查询任务详情信息
				self.$axios.post('/vwhc/updateTo', {
						id: id
					})
					.then(res => {
						if(res.data.success == true) {
							var brandId = res.data.data.toBeansList[0].brandId;
							var season = res.data.data.toBeansList[0].season;
							var year = res.data.data.toBeansList[0].year;
							self.getTemplate(brandId, year, season)
							self.taskInfo = {
								brandId: res.data.data.toBeansList[0].brandId,
								brandTemplateId: res.data.data.toBeansList[0].brandTemplateId,
								description: res.data.data.toBeansList[0].description,
								endDate: res.data.data.toBeansList[0].endDate,
								missionName: res.data.data.toBeansList[0].missionName,
								season: res.data.data.toBeansList[0].season,
								startDate: res.data.data.toBeansList[0].startDate,
								templateId: res.data.data.toBeansList[0].templateId,
								year: res.data.data.toBeansList[0].year
							}
						}
					}).catch(function(error) {
						self.$message.error('请求出错');
					});
				self.DetaildialogVisible = true;
			},
			//分页
			handleCurrentChange(val) {
				this.reqParams.pageNo = val;
				this.getData();
			},
			//时间转换
			setStartDate(val) {
				this.addTask.startDate = val[0];
				this.addTask.endDate = val[1];
			},
			setDate(val) {
				this.reqParams.year = val;
			},
			//预览
			priview(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						var self = this;
						localStorage.setItem("addTask", JSON.stringify(self.addTask));
						self.$router.push('/taskpreview');
					}
				});
			},
			//搜索区隐藏
			hidden() {
				this.isShow = false;
				this.btnShow = true;
			},
			//搜索区显示
			show() {
				this.isShow = true;
				this.btnShow = false;
			},
			//智能下拉
			getmissionName(event) {

				var self = this;
				self.nameShow = true;
				self.$axios.post('/vwhc/getmissionNameAll', {
						missionName: self.reqParams.missionName
					})
					.then(res => {
						if(res.data.success == true) {
							if(res.data.data.nameList.length > 0) {
								self.nameList = res.data.data.nameList;
							} else {
								this.reqParams.missionName = "";
								this.nameShow = false;
							}
						}
					}).catch(function(error) {
						self.$message.error('请求出错');
					});

			},
			//选择名称
			getName(missionName) {
				this.reqParams.missionName = missionName;
				this.nameShow = false;
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
	
	#namelist {
		position: absolute;
		z-index: 99;
		left: 40px;
		top: 25px;
		width: 230px;
		/*border: 1px solid #E5E5E0;*/
	}
	
	#namelist li {
		list-style: none;
		background: #fff;
		border: 1px solid #E5E5E0;
		border-bottom: none;
		height: 24px;
		line-height: 24px;
		font-size: 12px;
	}
	
	li:nth-last-child {
		border-bottom: 1px solid #E5E5E0;
	}
	
	i {
		font-size: 18px;
	}
	
	.btn {
		height: 34px;
		line-height: 34px;
		width: 100px;
		text-align: center;
		padding: 0px;
		color: #fff;
		border: none;
	}
	
	.btn2 {
		height: 33px;
		line-height: 33px;
		width: 80px;
		text-align: center;
		padding: 0;
		color: #FFFFFF;
		border: none;
	}
	
	.rotate:before {
		transform: rotate(180deg);
		display: inline-block;
	}
	/*ul {
		border: 1px solid red;
	}
	
	li {
		height: 40px;
		line-height: 40px;
	}
	
	/*.bindingbtn input {
		border: 1px solid #333;
		height: 44px;
		line-height: 44px;
	}*/
</style>