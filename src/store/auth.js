/**
 * Created by cuijinfeng on 18/1/13.
 */
import decode from 'jwt-decode'

const setToken = (token) => {

	window.sessionStorage.setItem('token', token);

}
const getToken = () => {
	return window.sessionStorage.getItem('token');

}


const decodeToken = () => {
	if(getToken()) {
		return decode(getToken())
	}
}

const getUserInfo = () => {
	
	var _tk = null;
	if(_tk = getToken()) {
		
		let userinfo = decode(_tk);
		if(userinfo) {
			return userinfo
		} else {
			return false;
		}

	} else {
		return false
	}
}

export default {
	setToken,
	getToken,
	decodeToken,
	
	
	getUserInfo
	
}