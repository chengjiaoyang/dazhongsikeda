<template>
	<div class="maintenance taskManage">
		<div class="form">
			<!-- 搜索区 -->
			


		<div style="height: 60px; margin-top: 10px;border-bottom: 1px solid #E1E1E1;" v-show="isShow">
			<el-row :gutter="24">
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 90px;line-height: 36px;">网络代码:</span>
					<el-input v-model="getDealers.code" placeholder="网络代码"></el-input>
				</el-col>
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 90px;line-height: 36px;">内部区域:</span>
					<!-- <el-date-picker v-model="getDealers.year" align="right" type="year" value-format="yyyy" placeholder="请选择年度" style="width: 100%;" @change="setDate"> -->
					<!-- </el-date-picker> -->
					<el-select placeholder="内部区域" v-model="getDealers.district">
							<el-option v-for="item in stateDistrict" :value="item" :key="item" :label="item" ></el-option>
					</el-select>
				</el-col>
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 116px;line-height: 36px;">经销商名称:</span>
					<el-input v-model="getDealers.name" placeholder="经销商名称" ></el-input>
				</el-col>
				<el-col :span="5" style="display: flex;">
					<span style="font-size: 14px;width: 90px;line-height: 36px;">经销商类型:</span>
					<el-select v-model="getDealers.type" placeholder="经销商类型" style="width:130px;">
						<el-option v-for="item in stateList" :key="item.code" :label="item.value" :value="item.code"></el-option>
					</el-select>
				</el-col>
				<el-col :span="4" style="display: flex;">
					<el-button class="btn2" style="background-image: linear-gradient(34deg, #18AEFF 0%, #1B87F2 100%);" @click="onSubmit">查询</el-button>
					<el-button class="btn2" style="background-image: linear-gradient(35deg, #E57640 0%, #FFA450 100%);border: none;" @click="reset">重置</el-button>
					<div @click="over" style="width: 50px; text-align: right;line-height: 36px;"><span class="iconfont icon-dazhong-25" style="color: #BEC3E5;"></span></div>
				</el-col>
			</el-row>
		</div>



			<div style="display: flex;" v-show="btnShow">
			<div style="height: 18px; flex: 1;border-bottom: 1px solid #E1E1E1;"></div>
				<div style="width: 40px;padding-left: 10px; line-height: 36px;" @click="show">
					<span class="iconfont icon-dazhong-25 rotate" style="color: #BEC3E5;"></span>
				</div>
			</div>	
		</div>

		<!-- 操作按钮 -->
		<div class="buton">
						<el-button class="btn" @click="add" style=" width:9%; height:3.1%;background-image: linear-gradient(35deg, #20E42C 0%, #07A63D 100%);"><i class="iconfont icon-dazhong-5"></i>新建</el-button>
						<el-button class="btn" style="background-image: linear-gradient(35deg, #24D3A5 0%, #08A775 100%);width:9%; height:3.1%;" @click="downLoad"><i class="iconfont icon-dazhong-10"></i>模板导出</el-button>
						<el-button class="btn" style="background-image: linear-gradient(29deg, #20E42C 0%, #07A63D 100%); width:9%; height:3.1%;" @click="upLoad"><i class="iconfont icon-dazhong-11"></i>批量导入</el-button>
						<el-button class="btn" style="background-image: linear-gradient(35deg, #FFA450 0%, #E57640 100%);width:9%; height:3.1%;" @click="deleteTask"><i class="iconfont icon-dazhong-8"></i>删除</el-button>
						<el-button class="btn" style="background-image: linear-gradient(29deg, #F38585 0%, #ED3838 100%);width:9%; height:3.1%"  @click="stop"><i class="iconfont icon-dazhong-12"></i>停用</el-button>
		</div>
		<!--表格  -->
		<div>
			<el-table border :data="tableData" style="width: 100%; text-align: center" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" style="text-align:center;">
				</el-table-column>
				<el-table-column prop="brandId" label="品牌" width="100" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.brandId == '2'">大众</span>
						<span v-if="scope.row.brandId == '3'">斯柯达</span>
					</template>
				</el-table-column>
				<el-table-column prop="code" label="网络代码" width="120" align="center">
				</el-table-column>
				<el-table-column prop="district" label="内部区域" width="160" align="center">
				</el-table-column>
				<el-table-column prop="province" label="省" width="200" align="center">
				</el-table-column>
				<el-table-column prop="city" label="市" width="200" align="center">
				</el-table-column>
				<el-table-column prop="name" label="经销商名称" width="300" align="center">
				</el-table-column>
				<el-table-column prop="type" label="经销商类型" width="120" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.type == '1'">直营店</span>
						<span v-if="scope.row.type == '2'">4S店</span>
						<span v-if="scope.row.type == '3'">D0</span>
						<span v-if="scope.row.type == '4'">D0+</span>
					</template>
				</el-table-column>
				<el-table-column prop="contacts" label="负责人" width="110" align="center">
				</el-table-column>
				<el-table-column prop="email" label="Email" width="380" align="center">
				</el-table-column>
				<el-table-column prop="mobile" label="联系方式" width="140" align="center">
				</el-table-column>
				<el-table-column prop="status" label="状态" width="100" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.status == '1'">可用</span>
						<span v-if="scope.row.status == '0'">不可用</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="120" align="center" fixed="right">
					<template slot-scope="scope">
						<el-button size="small" type="text" @click="update(scope)">修改</el-button>
						<el-button size="small" type="text" @click="deleteOne(scope)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 页码 -->
		<div class="block">
			<el-pagination @current-change="handleCurrentChange" :current-page.sync="getDealers.pageNo" :page-size="getDealers.pageSize" layout="total,prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
		<!-- 彈出 -->
		<el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :closeOnClickModal="closeModal">
			<el-form :model="addTask" :rules="rules" ref="addTask" label-width="100px">
				<el-form-item label="品牌：" prop="brandId">
					<div style="flex:1;" v-if="brandId==2">大众</div>
					<div style="flex:1;" v-if="brandId==3">斯柯达</div>
				</el-form-item>
				<el-col :span="11">
					<el-form-item label="内部区域:" prop="district">
						<el-select placeholder="内部区域" v-model="addTask.district" @change="onDistrict()">
							<el-option v-for="item in stateDistrict" :value="item" :key="item" :label="item" ></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="网络代码:" prop="code">
						<el-input v-model="addTask.code" placeholder="网络代码"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="经销商名称:" prop="name">
						<el-input v-model="addTask.name" placeholder="经销商名称"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="经销商类型:" prop="type">
						<el-select placeholder="经销商类型" v-model="addTask.type">
							<el-option v-for="item in stateList" :key="item.code" :label="item.value" :value="item.code"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="省:" prop="province">
						<el-select placeholder="省" v-model="addTask.province" @change="onProvince()">
							<el-option v-for="item in stateProvince" :key="item.province" :value="item"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="市:" prop="city">
						<el-select placeholder="市" v-model="addTask.city" >
							<el-option v-for="item in stateCity" :key="item" :label="item" :value="item"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="负责人:" prop="contacts">
						<el-input v-model="addTask.contacts" placeholder="负责人"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="email:" prop="email">
						<el-input v-model="addTask.email" placeholder="email"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="联系方式:" prop="mobile">
						<el-input v-model="addTask.mobile" placeholder="联系方式"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="地址:" prop="address">
						<el-input v-model="addTask.address" placeholder="地址"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="22">
					<el-form-item label="备注:" prop="remark">
						<el-input v-model="addTask.remark" placeholder="备注"></el-input>
					</el-form-item>
				</el-col>
			</el-form>
			<div slot="footer" class="dialog-footer" style="margin-top: 330px;">
				<el-button @click="dialogFormVisible = false" style="width:120px; height:33px; border:1px solid #1393F3;color:#1393F3;">关闭</el-button>
				<el-button type="primary" @click="addNew('addTask')" style="width:120px; height:33px;">提交</el-button>
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
				tableData: [],
				getDealers: {
					// userName: "",
					code: "", //網絡代碼/
					district: "", //內部區域/
					name: "", //經銷商名稱/
					type: "", //經銷商類型/
					pageSize: 10,
					pageNo: 1,
					brandId: "", //品牌/
					province: "", //省/
					city: "", //市/
					contacts: "", //負責人/
					email: "", //
					mobile: "", //
					address: "", //地址
					remark: "" //備註
				},
				total: 0,
				dialogTitle: '新建经销商',
				isAdd: false, //是否是新增
				dialogFormVisible: false,
				formVisible:false,//模板是否弹出隐藏
				closeModal: false, //点击弹出遮罩层 页面不关闭
				stateList: [], //状态列表
				importFormVisible: false,//导入框显示
				stateLists:[
					{code:1,value:'直营店'},
					{code:2,value:'4S店'},
					{code:3,value:'DO'},
					{code:4,value:'DO+'},
				],
				stateDistrict: [], //经销商内部区域
				stateProvince: [], //省
				stateCity: [], //市
				multipleSelection: [],
				nameList:[],//
				isShow: true, //搜索区是否显示
				btnShow: false,
				brandId:"",
				addTask: {
					brandId: "", //品牌/
					province: "", //省/
					city: "", //市/
					contacts: "", //負責人/
					email: "", //
					mobile: "", //
					code: "", //網絡代碼/
					district: "", //內部區域/
					name: "", //經銷商名稱/
					type: "", //經銷商類型/
					address: "", //地址
					remark: "", //備註
					// typeName:""
				},
				rules: {
					district: [{
						required: true,
						message: '请选择区域',
						trigger: 'change'
					}],
					code: [{
						required: true,
						message: '请选择网络代码',
						trigger: 'blur'
					}],
					name: [{
						required: true,
						message: '请输入经销商名称',
						trigger: 'blur'
					}],
					type: [{
						required: true,
						message: '请选择经销商类型',
						trigger: 'change',
					}],
					province: [{
						required: true,
						message: '请输入省',
						trigger: 'change'
					}],
					city: [{
						required: true,
						message: '请输入市',
						trigger: 'change'
					}],
					contacts: [{
						required: true,
						message: '请输入负责人',
						trigger: 'blur'
					}],
					email: [{
						required: true,
						message: '请输入email',
						trigger: 'blur'
					}],
					mobile: [{
						required: true,
						message: '请输入联系方式',
						trigger: 'blur'
					}],
					address: [{
						required: true,
						message: '请输入正确地址',
						trigger: 'blur'
					}],
				},
			};
		},
		created() {
			this.getData();
			this.getStatusList();
			this.addDistrict();
		},

		methods: {
			//初始化数据
			getData() {
				var that = this;
				// console.log(that.getDealers);
				that.getDealers.brandId=localStorage.getItem("brandId")
				that.$axios
					.post("/vwhc/getDealers", that.getDealers)
					.then(res => {
						if(res.data.success == true) {
							// console.log(res);
							that.tableData = res.data.data.dealerBeanList;
							that.total = res.data.data.total;
							if(that.total == 0) {
								that.total = res.data.data.total;
							}
						}
					})
					.catch(function(error) {
						that.$message.error("请求出错");
					});
			},
			//查询
			onSubmit() {
				var that = this;
				that.getDealers.pageNo = 1;
				that.total = 0;
				that.getData();
			},
			//重置
			reset(){
				var that = this;
				that.getDealers.code = '';
				that.getDealers.district = '';
				that.getDealers.name = '';
				that.getDealers.type = '';
				that.getData();
			},
			//搜索区隐藏
			over(){
				this.isShow = false;
				this.btnShow = true;
			},
			//搜索区显示
			show(){
				this.isShow = true;
				this.btnShow = false;
			},
			//获取状态列表
			getStatusList() {
				var that = this;
				that.$axios
					.post("/vwhc/getDealerTypes", {})
					.then(res => {
						if(res.data.success == true) {
							that.stateList = res.data.data.dealerTypeBeanList;
						}
					})
					.catch(function(error) {
						that.$message.error("请求出错");
					});
			},
			//新建
			add() {
				this.dialogFormVisible = true;
				this.brandId = localStorage.getItem("brandId")
				this.isAdd = true;
				this.dialogTitle = "新建经销商";
				this.addTask = {
					brandId: "", //品牌/
					province: "", //省/
					city: "", //市/
					contacts: "", //負責人/
					email: "", //
					mobile: "", //
					code: "", //網絡代碼/
					district: "", //內部區域/
					name: "", //經銷商名稱/
					type: "", //經銷商類型/
					address: "", //地址
					remark: "", //備註
					id: "",
					// typeName:"",
					userName: ""
				};
				this.addDistrict();
			},
			//确认新建
			addNew(formName) {

				//表单验证和rules（vue封装方法）关联    formName是一个es6方法，官网就是这样的
				this.$refs[formName].validate((valid) => {
					if(valid) {
						var that = this;
						that.addTask.userName=sessionStorage.getItem("username");
						if(that.isAdd) {
							that.$axios.post('/vwhc/addDealer', that.addTask)
								.then(res => {
									if(res.data.success == true) {
										this.dialogFormVisible = false;
										that.$message({
											type: 'success',
											message: '新建成功！'
										});
										that.getData();
									}
									else{
                                        that.$message({
										 type:'error',
										 message:res.data.msg
								    	})
									}
								}).catch(function(error) {
									that.$message.error('请求出错!');
								})
						} else {
							that.$axios.post('/vwhc/modifyDealer', that.addTask)
								.then(res => {
									if(res.data.success == true) {
										this.dialogFormVisible = false;
										that.$message({
											type: 'success',
											message: '修改成功！'
										});
										that.getData();
									}
									else{
                                        that.$message({
										 type:'error',
										 message:res.data.msg
								    	})
									}
								}).catch(function(error) {
									that.$message.error('请求出错！');
									
								});
						}
					} else {
						console.log('error submit!!');
						return false;
					}
				})
			},
			//获取经销商内部区域
			addDistrict() {
				var that = this;
				that.$axios.post('/vwhc/region/getDistrict', {})
					.then(res => {
						if(res.data.success == true) {
							that.stateDistrict = res.data.data.regionList;
						}
					})
					.catch(function(error) {
						that.$message.error("请求出错")
					})
			},
			//获取省
			addProvince() {
				var that = this;
				that.$axios.post('/vwhc/region/getProvince', {
						district: that.addTask.district
					})
					.then(res => {
						if(res.data.success == true) {
							// console.log(res)
							that.stateProvince = res.data.data.regionList;
						}
					})
					.catch(function(error) {
						that.$message.error("请求出错")
					})
			},
			//获取市
			addCity() {
				var that = this;
				that.$axios.post('/vwhc/region/getCity', {
					district: that.addTask.district,
					province: that.addTask.province
				})
					.then(res => {
						if(res.data.success == true) {
							that.stateCity = res.data.data.regionList;
						}
					})
					.catch(function(error) {
						that.$message.error("请求出错")
					})
			},
			//根据区域来确定省 change监听事件
			onDistrict() {
				var that = this;
				if(!that.addTask.district) return
				that.addProvince(that.addTask.district)
				that.addTask.province = ""
				that.addTask.city = ""
			},
			//根据省确定市
			onProvince(){
				var that = this;
				if(!that.addTask.province) return
				that.addCity(that.addTask.district,that.addTask.province)
				that.addTask.city = ""
			},
			//全选
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			//批量删除
			deleteTask() {
				var that = this;
				if(this.multipleSelection.length === 0) {
					this.$message({
						message: "请选择一条数据",
						type: "error"
					});
					return;
				}
				var lists = this.multipleSelection;
				var idList = "[";
				for(var i in lists) {
					idList += '{"id":' + lists[i].id + ',"userName":"12321"},';
				}
				idList = JSON.parse(idList.substring(0, idList.length - 1) + "]");

				that.$axios
					.post("/vwhc/delDealers", {
						dealerList: idList
					})
					.then(res => {
						console.log(res);

						if(res.data.success == true) {
							this.dialogFormVisible = false;
							that.$message({
								type: "success",
								message: "删除成功！"
							});
							that.getData();
						}
					})
					.catch(function(error) {
						that.$message.error("请求出错");
					});
			},
			//停用
			stop() {
				var that = this;
				var msg = "确定要停用吗";
				that
					.$confirm(msg, "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						closeOnClickModal: false,
						type: "warning"
					})
					.then(() => {
						var lists = this.multipleSelection;
						var idList = "[";
						for(var i in lists) {
							idList += '{"id":' + lists[i].id + ',"userName":"12321"},';
						}
						idList = JSON.parse(idList.substring(0, idList.length - 1) + "]");
						that.$axios
							.post("/vwhc/stopDealers", {
								dealerList: idList
							})
							.then(res => {
								if(res.data.success == true) {
									this.dialogFormVisible = false;
									that.$message({
										type: "success",
										message: "停用成功！"
									});
									that.getData();
								}
							});
					})
					.catch(() => {
						that.$message({
							type: "error",
							message: "请选择一条数据!"
						});
					});
			},
			//修改
			update(scope) {
				var that = this;
				this.isAdd = false;
				this.addDistrict();
				var id = scope.row.id;
				id = JSON.parse(id);
				//修改任务
				that.$axios.post('/vwhc/showDealer', {
					id: id
				}).then(res => {
					if(res.data.success == true) {
						// console.log(res)
						that.addTask = {
							id: id,
							brandId: res.data.data.brandId,
							province: res.data.data.province, //省/
							city: res.data.data.city, //市/
							contacts: res.data.data.contacts, //負責人/
							email: res.data.data.email, //
							mobile: res.data.data.mobile, //
							code: res.data.data.code, //網絡代碼/
							district: res.data.data.district, //內部區域/
							name: res.data.data.name, //經銷商名稱/
							typeName: res.data.data.typeName, //經銷商類型/
							type:res.data.data.type,
							address: res.data.data.address, //地址
							remark: res.data.data.remark
						}
						that.dialogFormVisible = true;
						that.dialogTitle = "编辑任务信息";
					}
				}).catch(function(error) {
					that.$message.error('请求出错')
				})
			},
			//单个删除
			deleteOne(scope) {
				var that = this;
				var username=sessionStorage.getItem("username");
				var msg = "确定要删除吗";
				that
					.$confirm(msg, "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						closeOnClickModal: false,
						type: "warning"
					})
					.then(() => {
						var id = scope.row.id;
						that.$axios
							.post("/vwhc/delDealer", {
								id: id,
								username:username ,
								brandId: localStorage.getItem("brandId")
							})
							.then(res => {
								if(res.data.success == true) {
									that.getData();
									that.$message({
										type: "success",
										message: "删除成功！"
									});
								}
							});
					})
					.catch(() => {
						that.$message({
							type: "info",
							message: "已取消操作"
						});
					});
			},
			//分页
			handleCurrentChange(val) {
				this.getDealers.pageNo = val;
				this.getData();
			},
			//模板导出
			downLoad(){
				window.location.href ="http://10.108.11.144:8080/vwhc/downloadTemplate"	
			},
			//模板导入
			upLoad(){
				this.importFormVisible = true;
			},
			//确定行程导入
			importConfirm(){
				var that = this;
				that.PostFile("/vwhc/addDealers", () => {},[{
					name:"userName",
					value:sessionStorage.getItem("username"),
					
				},{
					name:"brandId",
					value:localStorage.getItem("brandId"),
					
				}],document.getElementById("xcfile").files[0]);
			},
			//导入方法
			PostFile(url, success, para, file) {
				var that = this;
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
								that.importFormVisible = false;
								that.$message({
									type: 'success',
									message: '批量导入成功'
								});
								that.getData();
							} else {
								that.$message({
									type: 'error',
									message: JSON.parse(text).msg,
									
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
					fd.append("dealersExcel", file);
				}
				XMLHttpReq.setRequestHeader("enctype", "multipart/form-data");
				XMLHttpReq.send(fd);
			},
		}
	};
</script>

<style scoped="scoped">
    *{
		list-style: none;
	}
	
	.form .el-form--inline .el-form-item {
		margin-right: 0;
	}
	
	.buton {
		margin: 22px 0 20px 10px;
	}
	.block {
		margin: 10px 0 0 10px;
	}
	
	.el-dialog__header {
		background-color: #1B87F2;
		text-align: center;
		height: 50px;
	}
	
	
	.clearfix:before,.clearfix:after {
        content: "";
        display: block;
        clear: both;
        }
	
	.maintenance ul li{
		float: left;
		margin: 15px 10px;
		
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
	.btn:hover{
		color: #fff;
	}
	.btn2:hover{
		color: #fff;
	}
	.btn2{
		height: 37px;
		/* line-height: 16px; */
		width: 80px;
		text-align: center;
		color: #FFFFFF;
		border: none;
	}
	.rotate:before {
		transform: rotate(180deg);
		display: inline-block;
	}
</style>