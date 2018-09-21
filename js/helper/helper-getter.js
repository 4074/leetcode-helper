+ function () {

	var Getter = function () { };

	Getter.prototype.getQuestionMarkdown = function (url, $wrap, isCn) {
		var question = isCn ? this.getQuestionInfoCN(url, $wrap) : this.getQuestionInfoEN(url, $wrap)
		var content = this.clearContentMarkdown(this.translateToMarkdown(question.content))
		
		var md = this.translateToMarkdown(question.title) + '\n\n'
			+ this.translateToMarkdown(question.info) + '\n\n'
			+ content + '\n\n'
			+ question.answer
		return md
	}

	Getter.prototype.getQuestionInfoCN = function (url, $wrap) {

		// Title
		var $title = $wrap.find('.question-title h3').clone()
		var $originTitle = $title.find('span[data-original-title]')
		var title = $title.html()
		if ($originTitle.length) {
			var originTitle = $originTitle.attr('data-original-title')
			$originTitle.remove()
			title = $title.html() + '(' + originTitle + ')'
		}
		title = '<h3><a href="' + url + '">' + title + '</a></h3>'

		// Difficulty
		var $difficulty = $wrap.find('.side-bar-list li').first()
		var info = $difficulty.find('span:first').text() + ' **' + $difficulty.find('span:last').text() + '**'

		// Content
		var $content = this.findByClassName($wrap, 'div', 'question-description').clone()
		// Remove tranlation switch for leetcode-cn.com
		var $translation = this.findByClassName($content, 'div', 'translation-tool')
		if ($translation) {
			$translation.remove()
		}
		$content.find('a').remove()
		$content.find(':hidden').show()
		var content = $content.html()

		// Answer
		var $answer = $wrap.find('.CodeMirror-code').first().clone()
		var answer_lines = []
		var answer_language = $wrap.find('.language-select-wrapper .Select-value-label').text()
		$answer.find('.CodeMirror-linenumber').remove()
		$answer.find('.CodeMirror-line').each(function () {
			var $line = $(this)
			answer_lines.push($line.text())
		})
		var answer ='#### Solution'
		+ '\n\nLanguage: **' + answer_language + '**'
		+ '\n\n```'+ answer_language.toLowerCase()+ '\n'
			+ answer_lines.join('\n')
		+ '\n```'

		return {
			url: url,
			title: title,
			info: info,
			content: content,
			answer: answer
		}
	}

	Getter.prototype.getQuestionInfoEN = function (url, $wrap) {

		// Title
		var $title = this.findByClassName($wrap, 'h1', 'title').clone()
		$title.find('a').remove()
		var $originTitle = $title.find('span[data-original-title]')
		var title = $title.html()
		if ($originTitle.length) {
			var originTitle = $originTitle.attr('data-original-title')
			$originTitle.remove()
			title = $title.html() + '(' + originTitle + ')'
		}
		title = '<h3><a href="' + url + '">' + title + '</a></h3>'

		// Difficulty
		var $difficulty = this.findByClassName($wrap, 'div', 'tools').first()
		var $difficultySpan = $difficulty.find('span')
		var info = $difficultySpan.eq(0).text() + ' **' + $difficultySpan.eq(1).text() + '**'

		// Content
		var $content = this.findByClassName($wrap, 'div', 'content-wrapper').clone()
		// Remove tranlation switch for leetcode-cn.com
		var $translation = this.findByClassName($content, 'div', 'translation-tool')
		if ($translation) {
			$translation.remove()
		}
		$content.find('a').remove()
		$content.find(':hidden').show()
		var content = $content.html()

		// Answer
		var $answer = $wrap.find('.CodeMirror-code').first().clone()
		var answer_lines = []
		var answer_language = $wrap.find('.ant-select-selection-selected-value').first().text()
		$answer.find('.CodeMirror-linenumber').remove()
		$answer.find('.CodeMirror-line').each(function () {
			var $line = $(this)
			answer_lines.push($line.text())
		})
		var answer ='#### Solution'
		+ '\n\nLanguage: **' + answer_language + '**'
		+ '\n\n```'+ answer_language.toLowerCase()+ '\n'
			+ answer_lines.join('\n')
		+ '\n```'

		return {
			url: url,
			title: title,
			info: info,
			content: content,
			answer: answer
		}
	}

	Getter.prototype.findByClassName = function ($wrap, tag, name) {
		var $els = $wrap.find(tag)
		var $content
		$els.each(function () {
			if (!$content) {
				var $el = $(this)
				if (($el.attr('class') || '').indexOf(name) >= 0) {
					$content = $el
					return false
				}
			}
		})

		return $content
	}

	Getter.prototype.clearContentMarkdown = function (md) {
		return md.replace(/\*\*Credits[^\v]*/g, '')
			.replace(/\<pre[^\>]*\>/g, '```\n')
			.replace(/\<\/pre\>/g, '```')
			.replace(/\<sup[^\>]*\>/g, '<sup>')
			.replace(/\<div[^\>]*\>/g, '')
			.replace(/\<\/div\>/g, '')
	}

	Getter.prototype.translateToMarkdown = function (html) {
		return html ? toMarkdown(html) : ''
	}

	Helper.getter = new Getter()

}()
