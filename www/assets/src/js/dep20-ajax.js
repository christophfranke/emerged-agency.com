
var Ajax = {

	get: function(url, onResponse){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				onResponse(this.responseText);
			}
		};
		xhttp.open("GET", url, true);
		xhttp.send();
	},

	getJSON: function(url, onResponse){
		jQuery.getJSON(url, onResponse);
	}
}