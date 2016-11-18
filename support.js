

	//encapsulate AJAX with an easy way
	var ajax = {};
	ajax.x = function () {
	    if (typeof XMLHttpRequest !== 'undefined') {
	        return new XMLHttpRequest();
	    }
	    var versions = [
	        "MSXML2.XmlHttp.6.0",
	        "MSXML2.XmlHttp.5.0",
	        "MSXML2.XmlHttp.4.0",
	        "MSXML2.XmlHttp.3.0",
	        "MSXML2.XmlHttp.2.0",
	        "Microsoft.XmlHttp"
	    ];

	    var xhr;
	    for (var i = 0; i < versions.length; i++) {
	        try {
	            xhr = new ActiveXObject(versions[i]);
	            break;
	        } catch (e) {
	        }
	    }
	    return xhr;
	};

	ajax.send = function (url, callback, method, data, async) {
	    if (async === undefined) {
	        async = true;
	    }
	    var x = ajax.x();
	    x.open(method, url, async);
	    x.onreadystatechange = function () {
	        if (x.readyState == 4) {
	            callback(x.responseText)
	        }
	    };
	    
    	x.setRequestHeader('X-LC-Id',settings['X-LC-Id']);
    	x.setRequestHeader('X-LC-Key',settings['X-LC-Key']);
        x.setRequestHeader('Content-type', 'application/json');

        if(method == "POST"){
	    	x.send(JSON.stringify(data))
	    } else {
	    	x.send(data)
	    }

	};

	ajax.get = function (url, data, callback, async) {
		/*
	    var query = [];
	    for (var key in data) {
	        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
	    }
	    */
	    ajax.send(url, callback, 'GET', data, async)
	};

	ajax.post = function (url, data, callback, async) {
		/*
	    var query = [];
	    for (var key in data) {
	        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
	    }
	    */
	    ajax.send(url, callback, 'POST', data, async)
	};
	//End of AJAX
