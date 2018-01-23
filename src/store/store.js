// index.js
import Vue from 'vue'
import Vuex from 'vuex'
import req from './httprequest.js'
import auth from './auth'
Vue.use(Vuex)

const state = {

}

const mutations = {

}

const actions = {

	LOGIN: ({
		dispatch,
		state
	}, payload) => {
		console.log(payload)
		let _url = payload.url
		
		let query = payload.query;

		return req._login(_url, query);
	},
	//解码用户信息
	DECODEINFO: ({
		dispatch,
		state
	}, payload) => {
			
		return auth.getUserInfo();
	},
	SETTOKEN: ({
		dispatch,
		state
	}, payload) => {

		return auth.setToken(payload.query);
	},
	
	/*前端使用的*/
	GET: ({
		dispatch,
		state
	}, payload) => {
		let _url = payload.url
		if(payload.query) {
			if(_url.indexOf("?")>0){
				_url += '&'
			}else{
				_url+="?";
			}
			
			for(let idx in payload.query) {
				_url += idx + '=' + encodeURIComponent(payload.query[idx]) + '&'
			}
			_url = _url.substring(0, _url.length - 1)

		}

		return req._get(_url);

	},

	POST: ({
		dispatch,
		state
	}, payload) => {
		let _url = payload.url
		let query = payload.query;

		return req._post(_url, query);

	},
	POSTFILE: ({
		dispatch,
		state
	}, payload) => {
		let _url = payload.url

		let query = payload.query;
		var formData = new FormData();
		formData.append('image', query.image);
		return req._postfile(_url, formData);

	},
	SHARE: ({
		dispatch,
		state
	}, payload) => {
		let _url = "/api/jssdk";
		let query = payload.query;
		let shareOpt = payload.opt;

		req._post(_url, query).then(result => {

			result.data.jsApiList.push("getLocation")
			if(result.data) {
				var options = {
					debug: false,
					appId: result.data.appId,
					timestamp: result.data.timestamp,
					nonceStr: result.data.nonceStr,
					signature: result.data.signature,
					jsApiList: result.data.jsApiList
				}

				wx.config(options);
				let img = shareOpt.imgUrl;
				if(img.indexOf("http") < 0) {
					if(window.location.href.indexOf("https") == 0) {
						img = "https:" + img
					} else {
						img = "http:" + img
					}
				}
//				wx.ready(function() {
//					var op = {
//						title: shareOpt.title, // 分享标题
//						desc: shareOpt.desc,
//						link: shareOpt.link, // 分享链接
//						imgUrl: img, // 分享图标
//						success: shareOpt.success,
//						type: "link"
//					}
//					wx.onMenuShareTimeline(op);
//					wx.onMenuShareAppMessage(op);
//
//				});
			}

		});

	},
	RESHARE: ({
		dispatch,
		state
	}, payload) => {
		let shareOpt = payload.opt;

		wx.ready(function() {
			let img = shareOpt.imgUrl;
			if(img.indexOf("http") < 0) {
				if(window.location.href.indexOf("https") == 0) {
					img = "https:" + img
				} else {
					img = "http:" + img
				}
			}
			var op = {
				title: shareOpt.title, // 分享标题
				desc: shareOpt.desc,
				link: shareOpt.link, // 分享链接
				imgUrl: img, // 分享图标
				success: shareOpt.success,
				type: "link"
			}
			wx.onMenuShareTimeline(op);
			wx.onMenuShareAppMessage(op);

		});

	},
}

export default new Vuex.Store({
	state,
	mutations,
	actions
})