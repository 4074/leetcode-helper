
+ function(){
	var styles = ['css/main.css']
	var md = Helper.getter.getQuestionMarkdown()
	var $body = $('body')
	
	
	
	function init(){
		importStyle(styles)
		renderHelper()
		
		console.log(md)
	}
	init()
	
	function renderHelper() {
		var $container = $('<div class="lch-container">').html('lch-container').appendTo($body)
	}
	
	
	
	function importStyle(arr) {
		var $head = $('head')
		arr.forEach(function(v){
			$head.append('<link rel="stylesheet" href="' + v + '">')
		})
	}
	
}()
