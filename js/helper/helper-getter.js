+ function(){
	
	var Getter = function(){};
	
	Getter.prototype.getQuestionMarkdown = function(){
		var question = this.getQuestionInfo()
		var content = this.clearContentMarkdown(this.transToMd(question.content))
		var md = this.transToMd(question.title) + '\n\n' 
			+ this.transToMd(question.info) + '\n\n'
			+ content
		
		return md

	}
	
	Getter.prototype.getQuestionInfo = function(){
		var url = window.location.href
		
		var $title = $('.question-title h3')
		var title = '<h3><a href="' + url + '">' + $title.html() + '</a></h3>'
		
		var info = $title.parent().next('.row').find('span').last().html()
		
		var $content = $('.question-content').clone()
		$content.find('a').remove()
		$content.find(':hidden').show()
		$content.find('>div:not(.spoilers)').remove()
		var content = $content.html()
		
		return {
			url: url,
			title: title,
			info: info,
			content: content
		}
	}
	
	Getter.prototype.clearContentMarkdown = function(md){
		md = md
		.replace(/\*\*Credits[^\v]*/g, '')
		.replace(/\<pre\>/g, '```\n')
		.replace(/\<\/pre\>/g, '```')
		.replace(/\<div[^\>]*\>/g, '')
		.replace(/\<\/div\>/g, '')
		
		return md
	}
	
	Getter.prototype.transToMd = function(html){
		return html ? toMarkdown(html) : ''
	}
	
	Helper.getter = new Getter()
}()