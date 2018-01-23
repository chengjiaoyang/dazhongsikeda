/**
 * Created by cuijinfeng on 2018/1/13.
 */
import axios from 'axios'
let hostApi = ''
const authUrl = {
	dev: "",
	test: "",
	pro: ""
}
const getHosturl = () => {
	if(window.location.href.indexOf("gmbaby")>=0){
		hostApi = window.location.href.split('admin')[0];
	}
	

}
//getToken
const getToken = () => {
	let token = window.sessionStorage.getItem('token');
	if(token) {
		return token;
	} else {
		//window.location.href = "/#/login"
	}

}
const _post = (url, para) => {
	let query = "";

	for(let Key in para) {
		if(Key && para[Key]) {
			query += (Key + "=" + encodeURIComponent( para[Key]) + "&")
		}

	}
	if(query != "") {
		query += "r=" + Math.random()
	}
	//	if(url.indexOf("?")>0){
	//		para = "&"+query;
	//	}else{
	//		para="?"+query
	//	}
	para = query
	getHosturl();
	console.log(para)
	return axios.post(
		hostApi + url,
		para, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': getToken()
			}
		}
	)
}
const _postfile = (url, para) => {
	getHosturl();
	return axios.post(
		hostApi + url,
		para, {
			headers: {
				'Authorization': getToken()

			}
		}
	)

}
const _get = (url) => {
	getHosturl();
	return axios.get(
		hostApi + url, {
			headers: {
				'Authorization': getToken()
			}
		}
	)
}

const _login = (url, para) => {
	let query = "";

	for(let Key in para) {
		if(Key && para[Key]) {
			query += Key + "=" + para[Key] + "&"
		}
	}
	if(query != "") {
		query += "r=" + Math.random()
	}
	if(url.indexOf("?") > 0) {
		para = "&" + query;
	} else {
		para = "?" + query
	}
	getHosturl();
	return axios.post(
		hostApi + url, para
	).then((result) => {
		return result
	}, () => {
		return null
	})
}

const _put = (url, para) => {
	getHosturl();
	return axios.put(
		hostApi + url,
		para, {
			headers: {
				'Authorization': getToken()

			}
		}
	)
}
const _delete = (url, para) => {
	getHosturl();
	return axios.delete(
		hostApi + url, {
			headers: {
				'Authorization': getToken()
			}
		}
	)
}

export default {

	_post,
	_get,
	_login,
	_postfile,
	_put,
	_delete

}