;(function() {
	var lastTime = 0;
	var vendors = ['webkit', 'moz'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || // Webkit中此取消方法的名字变了
			window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if(!window.requestAnimationFrame) {
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
			var id = window.setTimeout(function() {
				callback(currTime + timeToCall);
			}, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	}
	if(!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
	}
})();
(function(window) {
	var Request = function(name) {
		var n_url = window.location.href;
		n_url = n_url.replace("/#", "");
		if(n_url.indexOf("?") > 0) {
			n_url = n_url.split("?")[1]
		}
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = n_url.match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}

	var loadScript = function(url, callback) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		if(script.readyState) { //IE
			script.onreadystatechange = function() {
				if(script.readyState == "loaded" ||
					script.readyState == "complete") {
					script.onreadystatechange = null;
					callback();
				}
			};
		} else { //Others: Firefox, Safari, Chrome, and Opera
			script.onload = function() {
				callback();
			};
		}
		script.src = url;
		window.document.body.appendChild(script);
	};

	window.Request = Request;
	window.loadScript = loadScript;

	var _browser = {
		versions: function() {
			var u = navigator.userAgent,
				app = navigator.appVersion;
			return { //移动终端浏览器版本信息
				trident: u.indexOf('Trident') > -1, //IE内核
				presto: u.indexOf('Presto') > -1, //opera内核
				webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
				mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
				iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
				iPad: u.indexOf('iPad') > -1, //是否iPad
				webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
			};
		}(),
		language: (navigator.browserLanguage || navigator.language).toLowerCase()
	}
	var app_browser = "";
	if(_browser.versions.webKit) {
		app_browser = "-webkit-";
	} else if(_browser.versions.gecko) {
		app_browser = "-moz-";
	} else if(_browser.versions.presto) {
		app_browser = "-o-";
	}
	window.app_browser = app_browser;
	window._browser = _browser;
})(window);
var $alert = function(options) {
	if(typeof options == "string" || typeof options == "number") {
		options = {
			title: "提示",
			msg: options,
			oktxt: "确定",
			okcb: null
		}
	} else if(typeof options == "object") {
		if(!options.hasOwnProperty("title")) {
			options.title = "提示";
		}
		if(!options.hasOwnProperty("msg")) {
			options.msg = "";
		}
		if(!options.hasOwnProperty("oktxt")) {
			options.oktxt = "确定";
		}
		if(!options.hasOwnProperty("okcb")) {
			options.okcb = null;
		}
	}
	var html = '';
	html += '<div class="walert" style=" display: block;">';
	html += '<div class="tblank"></div>';
	html += '<div class="alert">';
	html += '<div class="alerttitle">' + options.title + '</div>';
	html += '<div class="alertcontent"><div class="wico"></div>' + options.msg + '</div>';
	html += '<div class="alertbtn flex">';
	html += '<div class="okBtn flex">' + options.oktxt + '</div>';
	html += '</div></div></div>';
	$("body").append(html);
	setTimeout(function() {
		$(".okBtn").click(function() {
			if(options.okcb != null) {
				options.okcb();
			}

			$(".walert").animate({
				opacity: 0
			}, 300, function() {
				$(".walert").remove()
			});
		});

	}, 300)

}

var $confirm = function(options) {
	if(typeof options == "string" || typeof options == "number") {
		options = {
			title: "提示",
			msg: options,
			oktxt: "确定",
			okcb: null,
			canceltxt: "取消",
			cancelcb: null
		}
	} else if(typeof options == "object") {
		if(!options.hasOwnProperty("title")) {
			options.title = "提示";
		}
		if(!options.hasOwnProperty("msg")) {
			options.msg = "";
		}
		if(!options.hasOwnProperty("oktxt")) {
			options.oktxt = "确定";
		}
		if(!options.hasOwnProperty("okcb")) {
			options.okcb = null;
		}
		if(!options.hasOwnProperty("canceltxt")) {
			options.canceltxt = "取消";
		}
		if(!options.hasOwnProperty("cancelcb")) {
			options.cancelcb = null;
		}
	}
	var html = '';
	html += '<div class="walert" style=" display: block;">';
	html += '<div class="tblank"></div>';
	html += '<div class="alert">';
	html += '<div class="alerttitle">' + options.title + '</div>';
	html += '<div class="alertcontent"><div class="wico"></div>' + options.msg + '</div>';
	html += '<div class="alertbtn flex">';
	html += '<div class="confirmBtn flex">' + options.oktxt + '</div>';
	html += '<div class="cancelBtn flex">' + options.canceltxt + '</div>';
	html += '</div></div></div>';
	$("body").append(html);
	$(".confirmBtn").click(function() {
		if(options.okcb != null) {
			options.okcb();
		}
		$(".walert").animate({
			opacity: 0
		}, 300, function() {
			$(".walert").remove()
		});
	});
	$(".cancelBtn").click(function() {
		if(options.cancelcb != null) {
			options.cancelcb();
		}
		$(".walert").animate({
			opacity: 0
		}, 300, function() {
			$(".walert").remove()
		});
	});

}
var $Toast = function(msg) {
	if(msg != null && msg != "") {
		$("body").append("<div  class='toast'>" + msg + "</div>");
		setTimeout(function() {
			$(".toast").animate({
				opacity: 0
			}, 600, "linear", function() {
				$(".toast").remove();
			})
		}, 2000)
	}
}
var $GetNowDate = function() {
	var datetime = new Date();
	var year = datetime.getFullYear();
	var month = datetime.getMonth() + 1;
	var day = datetime.getDate();
	if(month < 10) {
		month = "0" + month;
	}
	if(day < 10) {
		day = "0" + day;
	}
	return year + "-" + month + "-" + day;
}
var $AddDays = function(date, days) {
	var nd = new Date(date);
	nd = nd.valueOf();
	nd = nd + days * 24 * 60 * 60 * 1000;
	nd = new Date(nd);
	var y = nd.getFullYear();
	var m = nd.getMonth() + 1;
	var d = nd.getDate();
	if(m <= 9) m = "0" + m;
	if(d <= 9) d = "0" + d;
	var cdate = y + "-" + m + "-" + d;
	return cdate;
}

var $DataCheck = function(data) {
	if(data && data.response && data.response.status == 401) {
		localStorage.clear();
		window.location.reload();
	} else {
		return data.response.status;
	}
}

var log = function(para) {
	console.log(para)
}
var PageOK = function(id) {
	$("#loadingpage").hide()
	var ele = ".page";
	if(id) {
		ele = "#" + id;
	}
	$(ele).animate({
		translate3d: "0,100px,0"
	}, 0, function() {
		$(ele).animate({
			translate3d: "0,0px,0",
			opacity: 1
		}, 300, function() {
			$(ele).css("transform","").css("-webkit-transform","")
			
		})
	})


}

var MesPlus = {
	wwidth: 0,
	wheight: 0,
	cdn:""
}
var ImageList = [];

function InitImages() {
	$(".preload").each(function(idx, ele) {

		var hasexists = false;
		var dataurl = $(ele).attr("data-url");
		for(var i = 0; i < ImageList.length; i++) {
			if(ImageList[i] == dataurl) {
				hasexists = true;
				break;
			}
		}
		if(!hasexists) {
			ImageList.push(dataurl)
		}
	});
	$(".preloadimg").each(function(idx, ele) {
		var hasexists = false;
		var dataurl = $(ele).attr("data-url");
		for(var i = 0; i < ImageList.length; i++) {
			if(ImageList[i] == dataurl) {
				hasexists = true;
				break;
			}
		}
		if(!hasexists) {
			ImageList.push(dataurl)
		}
	});
	for(var i = 0; i < ImageList.length; i++) {
		var img = new Image();
		img.onload = function() {
			var process = parseInt((i / ImageList.length) * 100);
			if(process == 100) {
				$(".preload").each(function(idx, ele) {
					if($(ele).attr("data-url").indexOf("http") >= 0) {
						$(ele).css("background-image", "url(" + $(ele).attr("data-url") + ")");
					} else {
						$(ele).css("background-image", "url(" + $(ele).attr("data-url") + ")");
					}
				});
				$(".preloadimg").each(function(idx, ele) {
					if($(ele).attr("data-url").indexOf("http") >= 0) {
						$(ele).attr("src", $(ele).attr("data-url"));
					} else {
						$(ele).attr("src", $(ele).attr("data-url"));
					}
				});
				
			}
		};
		img.onerror = function() {
			
		}
		if(ImageList[i].indexOf("//") >= 0) {
			img.src = ImageList[i];
		} else {
			img.src = MesPlus.cdn + ImageList[i];
		}
	}
}

function GetDateDiff(time1) {
	time1 = time1.replace(/-/g, "/");
	var time = new Date(time1);

	var second = new Date().getTime() - time.getTime();
	second = parseInt(second / 1000);
	if(second < 60) {
		second = second + "秒前";
	} else {
		second = parseInt(second / 60);
		if(second <= 60) {
			second = second + "分钟前";
		} else {
			second = parseInt(second / 60);
			if(second <= 24) {
				second = second + "小时前";
			} else {
				second = parseInt(second / 24);
				if(second <= 30) {
					second = second + "天前";
				} else {
					second = parseInt(second / 30);
					if(second <= 12) {
						second = second + "月前";
					} else {
						second = parseInt(second / 12);
						second = second + "年前";

					}
				}

			}
		}
	}
	return second;

}

function GetDateDiff2(time1) {
	time1 = time1.replace(/-/g, "/");
	if(!time1) {
		return;
	}
	var d = new Date(time1);

	var ndate = new Date();
	var t = "";

	var tmp_d = new Date(time1);
	var tmp_n = new Date();

	if(d.getFullYear() == ndate.getFullYear() && d.getMonth() == ndate.getMonth() && d.getDate() == ndate.getDate()) {

		var hour = d.getHours();
		var min = d.getMinutes();
		if(hour < 10) {
			hour = "0" + hour;
		}
		if(min < 10) {
			min = "0" + min;
		}
		t = hour + ":" + min;

	} else if($AddDays(tmp_n, -1) == $AddDays(tmp_d, 0)) { //昨天

		var hour = d.getHours();
		var min = d.getMinutes();
		if(hour < 10) {
			hour = "0" + hour;
		}
		if(min < 10) {
			min = "0" + min;
		}
		t = "昨天 " + hour + ":" + min;

	} else {
		var month = d.getMonth() + 1;
		var day = d.getDate();

		var hour = d.getHours();
		var min = d.getMinutes();

		if(hour < 10) {
			hour = "0" + hour;
		}
		if(min < 10) {
			min = "0" + min;
		}
		t = month + "月" + day + "日 " + hour + ":" + min;

	}
	return t;

}
var Timer = [];
$(function() {
	MesPlus.wwidth = $(window).width();
	MesPlus.wheight = $(window).height();
})