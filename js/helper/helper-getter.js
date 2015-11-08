+ function(){
	
	var Getter = function(){};
	
	Getter.prototype.getQuestionMarkdown = function(){
		var question = this.getQuestionInfo()
		var content = this.clearContentMarkdown(this.transToMd(question.content))
		var md = this.transToMd(question.title)+ '\n\n' + content
		
		return md

	}
	
	Getter.prototype.getQuestionInfo = function(){
		var url = window.location.href
		var title = '<h3>' + $('.question-title h3').html() + '</h3>'
		var content = $('.question-content').html()
		
		return {
			url: url,
			title: title,
			content: content
		}
	}
	
	Getter.prototype.clearContentMarkdown = function(md){
		md = md.replace(/\*\*Credits[^\v]*/g, '')
		.replace(/\<pre\>/g, '```\n')
		.replace(/\<\/pre\>/g, '```')
		
		return md
	}
	
	Getter.prototype.transToMd = function(html){
		return html ? toMarkdown(html) : ''
	}
	
	Helper.getter = new Getter()
}()