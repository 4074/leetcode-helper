+ function(){

	var Getter = function(){};

	Getter.prototype.getQuestionMarkdown = function(url, $wrap){
		var question = this.getQuestionInfo(url, $wrap)
		var content = this.clearContentMarkdown(this.translateToMarkdown(question.content))

		var md = this.translateToMarkdown(question.title) + '\n\n'
			+ this.translateToMarkdown(question.info) + '\n\n'
			+ content + '\n\n'
			+ question.answer

		return md
	}

	Getter.prototype.getQuestionInfo = function(url, $wrap){

    // Title
		var $title = $wrap.find('.question-title h3')
		var title = '<h3><a href="' + url + '">' + $title.html() + '</a></h3>'

    // Difficulty
		var $difficulty = $wrap.find('.side-bar-list li').first()
		var info = $difficulty.find('span:first').text() + ' **' + $difficulty.find('span:last').text() + '**'

		// Content
		var $content = $wrap.find('.question-description').clone()
		$content.find('a').remove()
		$content.find(':hidden').show()
		var content = $content.html()

		// Answer
    var $answer = $wrap.find('#submission-form-app .CodeMirror-code').clone()
    var answer_lines = []

		$answer.find('.CodeMirror-linenumber').remove()
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
		return md.replace(/\*\*Credits[^\v]*/g, '')
      .replace(/\<pre[^\>]*\>/g, '```\n')
      .replace(/\<\/pre\>/g, '```')
      .replace(/\<sup[^\>]*\>/g, '<sup>')
      .replace(/\<div[^\>]*\>/g, '')
      .replace(/\<\/div\>/g, '')
	}

	Getter.prototype.translateToMarkdown = function(html){
		return html ? toMarkdown(html) : ''
	}

  Helper.getter = new Getter()
  
}()
