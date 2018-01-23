<template>
	<div class="taskManage" v-bind:style="{height:divHeight}">
		<!--搜索区-->
		<div style="margin-top: 10px;padding-bottom: 15px; border-bottom: 1px solid #E1E1E1;" v-show="isShow">
			<el-row :gutter="24">
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 90px;line-height: 36px;">任务名称</span>
					<el-input placeholder="请输入任务名称" v-model="reqParams.missionName"></el-input>
				</el-col>
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 90px;line-height: 36px;">年度：</span>
					<el-date-picker v-model="reqParams.year" align="right" type="year" value-format="yyyy" placeholder="请选择年度" style="width: 100%;" @change="setStartDate">
					</el-date-picker>
				</el-col>
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 90px;line-height: 36px;">季度：</span>
					<el-select placeholder="请选择季度" v-model="reqParams.season" style="width: 100%;">
						<el-option key="第一季度" label="第一季度" value="1"></el-option>
						<el-option key="第二季度" label="第二季度" value="2"></el-option>
						<el-option key="第三季度" label="第三季度" value="3"></el-option>
						<el-option key="第四季度" label="第四季度" value="4"></el-option>
					</el-select>
				</el-col>
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 90px;line-height: 36px;">状态：</span>
					<el-select placeholder="请选择状态" v-model="reqParams.approveStatus">
						<el-option v-for="item in stateList" :key="item.code" :label="item.value" :value="item.code"></el-option>
					</el-select>
				</el-col>
				<el-col :span="4" style="display: flex;">
					<el-button class="btn2" style="background: linear-gradient(34deg, #18AEFF 0%, #1B87F2 100%);" @click="search">查询</el-button>
					<el-button class="btn2" style="background: linear-gradient(34deg, #FFA450 0%, #E57640 100%);" @click="reset">重置</el-button>
					<div @click="hidden" style="flex: 1; text-align: right;line-height: 36px;"><span class="iconfont icon-dazhong-25" style="color: #BEC3E5;"></span></div>
				</el-col>
			</el-row>
			<el-row :gutter="24" style="margin-top: 10px;">
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 90px;line-height: 36px;">经销商：</span>
					<el-input placeholder="请输入经销商" v-model="reqParams.dealerName"></el-input>
				</el-col>
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 90px;line-height: 36px;">网络代码</span>
					<el-input placeholder="请输入网络代码" v-model="reqParams.dealerCode"></el-input>
				</el-col>
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 90px;line-height: 36px;">检查员：</span>
					<el-input placeholder="请输入检查员" v-model="reqParams.userName"></el-input>
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
			<el-button class="btn" style="background-image: linear-gradient(35deg, #18AEFF 0%,#1B87F2  100%);" @click="assignTask"><i class="iconfont icon-dazhong-"></i>分配任务</el-button>
			<el-button class="btn" style="background-image: linear-gradient(35deg, #24D3A5 0%, #08A775 100%);" @click="templateExport"><i class="iconfont icon-dazhong-11"></i>模板导出</el-button>
			<el-button class="btn" style="background-image: linear-gradient(29deg, #20E42C 0%, #07A63D 100%);" @click="travelImport"><i class="iconfont icon-dazhong-10"></i>行程导入</el-button>
			<el-button class="btn" style="background-image: linear-gradient(35deg, #FFA450 0%, #E57640 100%);" @click="deleteTask"><i class="iconfont icon-dazhong-8"></i>删除任务</el-button>
			<el-button class="btn" style="background-image: linear-gradient(29deg, #F38585 0%, #ED3838 100%);" @click="stopTask"><i class="iconfont icon-dazhong-12"></i>暂停任务</el-button>
		</div>
		<!--表格-->
		<div style="margin-top: 20px;">
			<el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="80" align="center">
				</el-table-column>
				<el-table-column prop="brandName" label="品牌" align="center" width="100">
				</el-table-column>
				<el-table-column prop="dealerCode" label="网络代码" align="center" width="120">
				</el-table-column>
				<el-table-column prop="dealerName" label="经销商" align="center" width="180">
				</el-table-column>
				<el-table-column prop="missionName" label="任务名称" align="center" width="160">
				</el-table-column>
				<el-table-column prop="year" label="年度" align="center" width="100">
				</el-table-column>
				<el-table-column prop="season" label="季度" align="center" width="100">
					<template slot-scope="scope">
						<span v-if="scope.row.season == '1'">第一季度</span>
						<span v-if="scope.row.season == '2'">第二季度</span>
						<span v-if="scope.row.season == '3'">第三季度</span>
						<span v-if="scope.row.season == '4'">第四季度</span>
					</template>
				</el-table-column>
				<el-table-column prop="realName" label="检查员" align="center" width="140">
				</el-table-column>
				<el-table-column prop="checkDate" label="检查时间" align="center" width="140">
				</el-table-column>
				<el-table-column prop="approveStatus" label="状态" align="center" width="140">
					<template slot-scope="scope">
						<span v-if="scope.row.approveStatus == '0'">未录入</span>
						<span v-if="scope.row.approveStatus == '1'">录入中</span>
						<span v-if="scope.row.approveStatus == '2'">已录入</span>
						<span v-if="scope.row.approveStatus == '3'">已初审</span>
						<span v-if="scope.row.approveStatus == '4'">初审退回</span>
						<span v-if="scope.row.approveStatus == '5'">已复审</span>
						<span v-if="scope.row.approveStatus == '6'">复审退回</span>
						<span v-if="scope.row.approveStatus == '7'">已平台审核</span>
						<span v-if="scope.row.approveStatus == '8'">审核退回</span>
						<span v-if="scope.row.approveStatus == '9'">已完成(发布后)</span>
						<span v-if="scope.row.approveStatus == '10'">已暂停</span>
					</template>
				</el-table-column>
				<el-table-column prop="payStatus" label="检查量" align="center" width="160">
				</el-table-column>
				<el-table-column label="操作" align="center" width="240" fixed="right">
					<template slot-scope="scope">
						<el-button size="small" type="text" @click="update(scope)" :disabled="scope.row.approveStatus!='0'">修改</el-button>
						<el-button size="small" type="text" @click="deleteOne(scope)">删除</el-button>
						<el-button size="small" type="text" @click="enter(scope)" :disabled="scope.row.approveStatus!='0'">录入</el-button>
						<el-button size="small" type="text" @click="exemption(scope)" :disabled="scope.row.approveStatus!='0'  && scope.row.approveStatus!='1'">免检</el-button>
						<el-button size="small" type="text" @click="dataDownload(scope)" :disabled="scope.row.approveStatus=='10'">数据下载</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!--页码-->
		<div style="text-align: right;margin-top: 10px;">
			<el-pagination @current-change="handleCurrentChange" :current-page.sync="reqParams.pageNo" :page-size="reqParams.pageSize" layout="total,prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>

		<!--弹出分配任务-->
		<el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :closeOnClickModal="closeModal">
			<el-form :model="addTask" :rules="rules" ref="addTask">
				<div class="divstyle">
					<div style="width: 100px;">品牌：</div>
					<div style="flex: 1;" v-if="brandId==2">大众</div>
					<div style="flex: 1;" v-if="brandId==3">斯柯达</div>
				</div>
				<div class="divstyle">
					<div style="width: 100px;">任务名称：</div>
					<div style="flex: 1;display: flex;">
						<el-input v-model="addTask.missionName" auto-complete="off" @keyup.enter.native="getmissionName($event)" style="width: 60%;margin-right: 10px;"></el-input>
						<el-button>预览</el-button>
					</div>
					<ul v-show="nameShow" id="namelist">
						<li v-for="name in nameList" @click="getName(name.missionName,name.id)">{{name.missionName}}</li>
					</ul>
				</div>
				<div class="divstyle">
					<div style="width: 100px;">检查老师：</div>
					<div style="flex: 1;">
						<el-select placeholder="请选择检查老师" v-model="addTask.userId" style="width: 60%;">
							<el-option v-for="item in teacherList" :key="item.id" :label="item.realName" :value="item.id"></el-option>
						</el-select>
					</div>
				</div>
				<div class="divstyle">
					<div style="width: 100px;">经销商：</div>
					<div style="flex: 1;" v-if="isAdd==true">
						<el-select v-model="dealerValue" multiple placeholder="请选择" style="width: 80%;">
							<el-option v-for="item in dealerList" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</div>
					<div style="flex: 1;" v-if="isAdd==false">
						<div>{{addTask.dealerName}}</div>
					</div>
				</div>
				<div class="divstyle">
					<div style="width: 100px;">检查时间：</div>
					<div style="flex: 1;">
						<el-date-picker v-model="addTask.checkDate" type="date" value-format="yyyy-MM-dd" @change="setDate" placeholder="开始时间"></el-date-picker>
					</div>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">关闭</el-button>
				<el-button type="primary" @click="addConfirm">提交</el-button>
			</div>
		</el-dialog>
		<!--模板导出弹出框-->
		<el-dialog title="模板导出" :visible.sync="mobanFormVisible" style="width: 80%;margin: 0 auto;">
			<div style="border-bottom: 1px solid #E1E1E1;padding-bottom: 10px;display: flex;">
				<span style="font-size: 14px;width: 90px;line-height: 36px;">选择任务：</span>
				<el-input v-model="missionName" placeholder="请输入任务名称" @keyup.enter.native="getmissionName1($event)" clearable></el-input>
				<ul v-show="nameShow" id="namelist">
					<li v-for="name in nameList" @click="getName1(name.missionName,name.id)">{{name.missionName}}</li>
				</ul>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="mobanFormVisible = false">取消</el-button>
				<el-button type="primary" @click="mobanConfirm">确定</el-button>
			</div>
		</el-dialog>
		<!--暂停弹出框-->
		<el-dialog title="暂停任务" :visible.sync="stopFormVisible" style="width: 80%;    margin: 0 auto;">
			<div style="border-bottom: 1px solid #E1E1E1;padding-bottom: 10px;display: flex;">
				<span style="font-size: 14px;width: 90px;line-height: 36px;">备注：</span>
				<el-input v-model="remark" placeholder="请输入备注信息" clearable></el-input>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="stopFormVisible = false">取消</el-button>
				<el-button type="primary" @click="stopConfirm">确定</el-button>
			</div>
		</el-dialog>
		<!--行程导入弹出框-->
		<el-dialog title="行程导入" :visible.sync="importFormVisible" style="width: 80%;    margin: 0 auto;">
			<div style="border-bottom: 1px solid #E1E1E1;padding-bottom: 10px;display: flex;">
				<span style="font-size: 14px;width: 90px;line-height: 36px;">批量导入：</span>
				<input type="file" id="xcfile" />
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="importFormVisible = false">取消</el-button>
				<el-button type="primary" @click="importConfirm">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				divHeight: '',
				nameList: [], //智能下拉列表
				nameShow: false,
				missionName: '', //模板导出的任务名称
				missionId: '', //模板导出的任务id
				isShow: true, //搜索区是否显示
				btnShow: false, //显示的按钮是否显示
				tableData: [],
				dealerList: [], //经销商列表
				stateList: [], //状态列表
				teacherList: [], //检查老师列表
				reqParams: {
					pageNo: 1,
					pageSize: 5,
					brandId: '', //品牌编号
					year: '', //年度
					season: '', //季度
					userName: '',
					approveStatus: '',
					missionName: '', //任务名称
					dealerName: '', //经销商名称
					isCheckUser: 0, //当前用户是否是检查老师1检查老师  0其他用户
					dealerCode: ''
				},
				dealerValue: '',
				value1: '',
				value2: '',
				isAdd: false, //是否是新增
				total: 0,
				dialogTitle: '分配任务',
				dialogFormVisible: false,
				closeModal: false, //点击弹出遮罩层 页面不关闭
				formLabelWidth: '120px',
				multipleSelection: [],
				multipleSelection2: [], //分配任务中的选择多项
				addTask: { //分配任务
					missionName: '', //不需要传
					missionId: '', //任务id
					userId: '', //检查老师id
					dealerIdList: [], //经销商id
					checkDate: '', //检查时间
					createUser: '',
					id: ''
				},
				rules: {
					name: [{
							required: true,
							message: '请输入用户名称',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 8,
							message: '用户名长度在1到8个字符',
							trigger: 'blur'
						}
					],
				},
				mobanFormVisible: false,
				stopFormVisible: false,
				importFormVisible: false,
				remark: '',
				brandId:'',
			}

		},
		created() {
			this.divHeight = window.screen.height * 0.75 + "px";
			this.getData();
			this.getStatusList(); //状态列表
		},
		methods: {
			//初始化数据
			getData() {
				var self = this;
				self.reqParams.brandId=localStorage.getItem("brandId");
				self.$axios.post('/vwhc/rest/MissionSchedual/findAllMissionSchedual', self.reqParams)
					.then(res => {
						if(res.data.success == true) {
							self.tableData = res.data.data.resFindAllBeans;
							if(self.total == 0) {
								self.total = res.data.data.total;
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
				self.reqParams.brandId = '';
				self.reqParams.year = '';
				self.reqParams.season = '';
				self.reqParams.userName = '';
				self.reqParams.approveStatus = '';
				self.reqParams.dealerName = '';
				self.reqParams.isCheckUser = '';
				self.reqParams.dealerCode = '';
				self.getData();
			},
			//检查老师列表
			getCheckTeacher() {
				var self = this;
				self.$axios.post('/vwhc/rest/MissionSchedual/getUserName')
					.then(res => {
						if(res.data.success == true) {
							self.teacherList = res.data.data.nameBeans;
						}
					}).catch(function(error) {
						//						self.$message.error('请求出错');
					});
			},
			//获取状态列表
			getStatusList() {
				var self = this;
				self.$axios.post('/vwhc/rest/common/getDictVal', {
						dictName: "APPROVE_TYPE"
					})
					.then(res => {
						if(res.data.success == true) {
							self.stateList = res.data.data.sysCodeResBeanList;
						}
					}).catch(function(error) {
						self.$message.error('请求出错');
					});
			},
			//分配任务
			assignTask() {
				this.isAdd = true;
				this.brandId=localStorage.getItem("brandId");
				this.dialogTitle = "分配任务";
				this.dialogFormVisible = true;
				this.addTask.missionName = '';
				this.addTask.missionId = '';
				this.addTask.userId = '';
				this.addTask.checkDate = '';
				this.getCheckTeacher(); //获取检查老师列表
			},
			//获取经销商
			getDealer(brandId, missionId) {
				var self = this;
				self.$axios.post('/vwhc/getNameId', {
						brandId: brandId,
						missionId: missionId
					})
					.then(res => {
						if(res.data.success == true) {
							self.dealerList = res.data.data.beans;
						}
					}).catch(function(error) {
						self.$message.error('请求出错');
					});
			},
			//确定分配
			addConfirm() {
				var self = this;
				self.addTask.dealerIdList = JSON.parse("[" + self.dealerValue + "]");
				self.addTask.createUser = sessionStorage.getItem("username");
				if(self.isAdd) {
					//新增分配任务
					self.$axios.post('/vwhc/rest/MissionSchedual/addMissionSchedual', self.addTask)
						.then(res => {
							if(res.data.success == true) {
								this.dialogFormVisible = false;
								self.$message({
									type: 'success',
									message: '分配成功!'
								});
							}
						}).catch(function(error) {
							self.$message.error('请求出错');
						});

				} else {
					//修改分配任务
					self.$axios.post('/vwhc/rest/MissionSchedualTrip/update', self.addTask)
						.then(res => {
							if(res.data.success == true) {
								this.dialogFormVisible = false;
								self.$message({
									type: 'success',
									message: '修改成功!'
								});
							}
						}).catch(function(error) {
							self.$message.error('请求出错');
						});
				}

			},
			//模板导出
			templateExport() {
				var self = this;
				self.mobanFormVisible = true;

			},
			//模板确定导出
			mobanConfirm() {
				var self = this;
				var brandId = localStorage.getItem("brandId");
				var missionId = self.missionId;
				var missionName = self.missionName;
				if(missionName != "" && missionId != "") {
					self.mobanFormVisible = false;
					window.location.href = "http://10.108.11.144:8080/vwhc/rest/MissionSchedual/getMissionScheduleTemplate?brandId=" + brandId + "&missionId=" + missionId + "&missionName=" + missionName;

				} else {
					self.$message.error('任务名称不能为空');
				}

			},
			//行程导入
			travelImport() {
				this.importFormVisible = true;
			},
			//确定行程导入
			importConfirm() {
				var self = this;
				self.PostFile("/vwhc/rest/MissionSchedualTrip/uploadMissionSchedule", () => {}, [{
					name: "userName",
					value: sessionStorage.getItem("username")
				}], document.getElementById("xcfile").files[0]);
				//参数 userName   uploadFile

			},
			//导入方法
			PostFile(url, success, para, file) {
				var self = this;
				var XMLHttpReq;
				try {
					XMLHttpReq = new ActiveXObject("Msxml2.XMLHTTP"); //IE高版本创建XMLHTTP  
				} catch(E) {
					try {
						XMLHttpReq = new ActiveXObject("Microsoft.XMLHTTP"); //IE低版本创建XMLHTTP  
					} catch(E) {
						XMLHttpReq = new XMLHttpRequest(); //兼容非IE浏览器，直接创建XMLHTTP对象  
					}
				}

				//创建XMLHttpRequest对象  
				XMLHttpReq.open("post", url, true);
				XMLHttpReq.onreadystatechange = function() {
					if(XMLHttpReq.readyState == 4) {
						if(XMLHttpReq.status == 200) {
							var text = XMLHttpReq.responseText;
							if(JSON.parse(text).success == true) {
								self.importFormVisible = false;
								self.$message({
									type: 'success',
									message: '批量导入成功'
								});
							} else {
								self.$message({
									message: JSON.parse(text).msg,
									type: 'error'
								})
							}
							success(text);
						}
					}
				}; //指定响应函数

				var fd = new FormData();
				if(para != null && para != undefined) {
					for(var i = 0; i < para.length; i++) {
						fd.append(para[i].name, para[i].value)
					}
				}
				if(file != null) {
					fd.append("uploadFile", file);
				} else {
					self.$message({
						message: "请选择一个文件",
						type: 'error'
					});
					return;
				}
				XMLHttpReq.setRequestHeader("enctype", "multipart/form-data");
				XMLHttpReq.send(fd);
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			handleSelectionChange2(val) {
				this.multipleSelection2 = val;
				console.log(val);
			},
			//批量删除任务
			deleteTask() {
				if(this.multipleSelection.length === 0) {
					this.$message({
						message: '请选择一条数据',
						type: 'error'
					})
					return;
				}
				var msg = '确定要删除吗';
				var self = this;
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
					self.$axios.post('/vwhc/rest/MissionSchedualTrip/delete', {
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
			//暂停任务
			stopTask() {
				if(this.multipleSelection.length === 0) {
					this.$message({
						message: '请选择一条数据',
						type: 'error'
					})
					return;
				}
				this.remark = '';
				this.stopFormVisible = true;
			},
			//确认暂停
			stopConfirm() {
				var lists = this.multipleSelection;
				var idList = "[";
				for(var i in lists) {
					idList += lists[i].id + ",";
				}
				idList = JSON.parse(idList.substring(0, idList.length - 1) + "]");
				var self = this;
				self.$axios.post('/vwhc/rest/MissionSchedualTrip/stop', {
					idList: idList,
					userName: sessionStorage.getItem("username"),
					remark: self.remark
				}).then(res => {
					if(res.data.success == true) {
						self.stopFormVisible = false;
						self.$message({
							type: 'success',
							message: '暂停成功!'
						});

						self.getData();
					} else {
						self.$message.error(res.data.msg);
					}
				}).catch(function(error) {
					self.$message.error('请求出错');
				});
			},
			//修改
			update(scope) {
				var self = this;
				self.isAdd = false;
				self.dialogFormVisible = true;
				self.dialogTitle = "修改任务";
				self.addTask.id = scope.row.id; //获取当前任务id
				self.getCheckTeacher(); //获取检查老师列表
				var id = scope.row.id;
				self.$axios.get('/vwhc/rest/MissionSchedualTrip/getUpdateTo?id=' + id).then(res => {
					if(res.data.success == true) {
						self.addTask = res.data.data;
						self.addTask.dealerIdList = JOSN.parse("[" + res.data.data.dealerId + "]");
					}
				}).catch(function(error) {});
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
					var idList = JSON.parse("[" + scope.row.id + "]");
					self.$axios.post('/vwhc/rest/MissionSchedualTrip/delete', {
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
			//智能下拉
			getmissionName(event) {

				var self = this;
				self.nameShow = true;
				self.$axios.post('/vwhc/getmissionNameAll', {
						missionName: self.reqParams.missionName
					})
					.then(res => {
						if(res.data.success == true) {
							self.nameList = res.data.data.nameList;
						}
					}).catch(function(error) {
						self.$message.error('请求出错');
					});

			},
			getmissionName1(event) {

				var self = this;
				self.nameShow = true;
				self.$axios.post('/vwhc/getUseAbleMission', {
						missionName: self.missionName
					})
					.then(res => {
						if(res.data.success == true) {
							self.nameList = res.data.data.nameList;
						}
					}).catch(function(error) {
						self.$message.error('请求出错');
					});

			},
			//选择名称
			getName(missionName, missionId) {
				this.addTask.missionName = missionName;
				this.addTask.missionId = missionId;
				this.nameShow = false;
				this.getDealer(2, missionId); //获取经销商列表

			},
			getName1(missionName, missionId) {
				this.missionName = missionName;
				this.missionId = missionId;
				this.nameShow = false;
			},
			//录入
			enter(scope) {
				var self = this;
				console.log(scope);
				var id = scope.row.id;
				self.$router.push("/scheEnter?id="+id);
			},
			//免检
			exemption(scope) {
				var self = this;
				var id = scope.row.id;
				self.$router.push("/taskExemption?id=" + id);
			},
			//数据下载
			dataDownload(scope) {

			},
			//分页
			handleCurrentChange(val) {
				this.reqParams.pageNo = val;
				this.getData();
			},
			//时间转换
			setDate(val) {
				this.addTask.checkDate = val;
			},
			setStartDate(val) {
				this.reqParams.year = val;
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

			//			handleRemove(file, fileList) {
			//				console.log(file, fileList);
			//			},
			//			handlePreview(file) {
			//				console.log(file);
			//			},
			//			handleExceed(files, fileList) {
			//				this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			//			},
			//			beforeRemove(file, fileList) {
			//				return this.$confirm(`确定移除 ${ file.name }？`);
			//			}
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
		left: 80px;
		top: 125px;
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
	
	.btn {
		height: 34px;
		line-height: 34px;
		padding: 0px 15px;
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
</style>