+ function(){

	var Getter = function(){};

	Getter.prototype.getQuestionMarkdown = function(){
		var question = this.getQuestionInfo()
		var content = this.clearContentMarkdown(this.transToMd(question.content))

		var md = this.transToMd(question.title) + '\n\n'
			+ this.transToMd(question.info) + '\n\n'
			+ content + '\n\n'
			+ question.answer

		return md

	}

	Getter.prototype.getQuestionInfo = function(){
		var url = window.location.href

		var $title = $('.question-title h3')
		var title = '<h3><a href="' + url + '">' + $title.html() + '</a></h3>'

		var $difficulty = $('.side-bar-list li').first()
		var info = $difficulty.find('span:first').text() + ' **' + $difficulty.find('span:last').text() + '**'

		// Content
		var $content = $('.question-description').clone()
		$content.find('a').remove()
		$content.find(':hidden').show()
		var content = $content.html()

		// Answer
		var $answer = $('#submission-form-app .CodeMirror-code').clone()
		$answer.find('.CodeMirror-linenumber').remove()
		var answer_lines = []
		$answer.find('.CodeMirror-line').each(function() {
			var $line = $(this)
			answer_lines.push($line.text())
		})
		var answer = '#### My Solution' + '\n```\n' + answer_lines.join('\n') + '\n```'

		return {
			url: url,
			title: title,
			info: info,
			content: content,
			answer: answer
		}
	}

	Getter.prototype.clearContentMarkdown = function(md){
		md = md
		.replace(/\*\*Credits[^\v]*/g, '')
		.replace(/\<pre[^\>]*\>/g, '```\n')
		.replace(/\<\/pre\>/g, '```')
		.replace(/\<sup[^\>]*\>/g, '<sup>')
		.replace(/\<div[^\>]*\>/g, '')
		.replace(/\<\/div\>/g, '')
		return md
	}

	Getter.prototype.transToMd = function(html){
		return html ? toMarkdown(html) : ''
	}

	Helper.getter = new Getter()
}()
