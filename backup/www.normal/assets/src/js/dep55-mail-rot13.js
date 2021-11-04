
var RotateEmail = {

	rot13 : function(s){
		return s.replace(/[a-zA-Z]/g,function(c){return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);});
	},
	
	initialize : function(){	
		$('.rotate').each(function(){
			var email = RotateEmail.rot13($(this).data('rotation'));
			$(this).attr('href', 'mailto:' + email);
			$(this).html(email);
		});
	}
};
