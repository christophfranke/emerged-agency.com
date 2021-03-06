
var Ajax = {

	get: function(url, onResponse, onError){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				if(typeof onResponse === 'function')
					onResponse(this.responseText);
			}
			if (this.readyState == 4 && this.status != 200) {
				if(typeof onError === 'function')
					onError(this.responseText);
			}
		};
		xhttp.open("GET", url, true);
		xhttp.send();
	},

	getJSON: function(url, onResponse){
		jQuery.getJSON(url, onResponse);
	}
}