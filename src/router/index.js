import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		//登录
		{
			path: '/',
			component: resolve => require(['../views/login.vue'], resolve),
		},
		{
			path: '/login',
			component: resolve => require(['../views/login.vue'], resolve),
		},
		//首页
		{
			path: '/index',
			component: resolve => require(['../views/Index.vue'], resolve),
			children: [{ //经销商维护
					path: '/maintenance',
					component: resolve => require(['../views/basic/maintenance.vue'], resolve),
				}, { //问卷查询
					path: '/investigate',
					component: resolve => require(['../views/basic/investigate.vue'], resolve),
				}, { //问卷调查明细
					path: '/Detailed',
					component: resolve => require(['../views/basic/Detailed.vue'], resolve),
				},
				{ //任务维护
					path: '/taskManage',
					component: resolve => require(['../views/taskManage/taskManage.vue'], resolve),
				}, { //任务行程管理
					path: '/taskScheManage',
					component: resolve => require(['../views/taskManage/taskScheManage.vue'], resolve),
				}, { //任务审核
					path: '/taskExamine',
					component: resolve => require(['../views/taskManage/taskExamine.vue'], resolve),
				},{ //任务审核详情
					path: '/examineDetail',
					component: resolve => require(['../views/taskManage/examineDetail.vue'], resolve),
				}, { //任务状态统计
					path: '/taskStatusStatic',
					component: resolve => require(['../views/taskManage/taskStatusStatic.vue'], resolve),
				}, 
				{ //得分查看
					path: '/scoreView',
					component: resolve => require(['../views/report/scoreView.vue'], resolve),
				}, { //得分统计
					path: '/scoreStatist',
					component: resolve => require(['../views/report/scoreStatist.vue'], resolve),
				}, { //行程状态得分统计
					path: '/travelState',
					component: resolve => require(['../views/report/travelState.vue'], resolve),
				}, { //问卷明细查看
					path: '/taskPreview',
					component: resolve => require(['../views/taskManage/taskPreview.vue'], resolve),
				}, { //任务行程录入
					path: '/taskScheEnter',
					component: resolve => require(['../views/taskManage/taskScheEnter.vue'], resolve),
				}, { //行程录入
					path: '/scheEnter',
					component: resolve => require(['../views/taskManage/scheEnter.vue'], resolve),
				},
				 { //免检
					path: '/taskExemption',
					component: resolve => require(['../views/taskManage/taskExemption.vue'], resolve),
				},
				{ //得分表
					path: '/scoreChart',
					component: resolve => require(['../views/report/scoreChart.vue'], resolve),
				}, { //考核明细
					path: '/checkDetail',
					component: resolve => require(['../views/report/checkDetail.vue'], resolve),
				},
				{ //申诉审核
					path: '/appealReview',
					component: resolve => require(['../views/appeal/appealReview.vue'], resolve),
				},
				{ //申诉期限设置
					path: '/termSetting',
					component: resolve => require(['../views/appeal/termSetting.vue'], resolve),
				},
				{ //申诉期限设置
					path: '/Examination',
					component: resolve => require(['../views/appeal/Examination.vue'], resolve),
				},
				

			]
		},
	]
})