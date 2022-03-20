+function () {

  var Getter = function () { }

  /**
   * Return markdown for question
   * 
   * @param {String} title
   * @param {String} url
   * @param {jQueryDOM} $wrap
   * @return {String}
   * @api public
   */
  Getter.prototype.getQuestionMarkdown = function (title, url, $wrap) {
    var isContest = url.indexOf('.com/contest/') >= 0

    var question = isContest
      ? this.getQuestionInfoForContest(title, url, $wrap)
      : this.getQuestionInfoForProblem(title, url, $wrap)

    var markdown = this.translateToMarkdown(question.title) + '\n\n'
      + this.translateToMarkdown(question.info) + '\n\n'
      + this.clearContentMarkdown(this.translateToMarkdown(question.content)) + '\n\n'

    // Clear more \n
    markdown = markdown.replace(/\n{4,}/g, '\n\n\n') + question.answer

    return markdown
  }

  /**
   * Get question info for problem page
   * 
   * @param {String} title
   * @param {String} url
   * @param {jQueryDOM} $wrap
   * @return {Object<String>} info {url, title, info, content, answer}
   * @api private
   * 
   */
  Getter.prototype.getQuestionInfoForProblem = function (title, url, $wrap) {
    var $description = $('[data-key=description-content]')
    

    // Difficulty
    var $difficulty = $description.find('div div div').eq(1).find('div').first()
    var difficultyText = $difficulty.text()
    // For CN UI
    if (window.location.origin.includes('leetcode-cn.com')) {
      difficultyText = $('[data-degree=easy],[data-degree=medium],[data-degree=hard]').first().text()
    }
    var info = ''

    // Title
    title = '<h1><a href="' + url + '">' + title + ' --- ' + difficultyText + '</a></h1>'

    // Content
    var content = '<br><br>' + this.getContentFromDOM(
      this.findByClassName(this.findByClassName($description, 'div', 'description'), 'div', 'content')
    )

    // Answer
    var answer = this.getAnswerFromDOM(
      $wrap.find('.CodeMirror-code').first(),
      $wrap.find('.ant-select-selection-selected-value').first().text()
    )

    // Related Topics
    var topics = this.getTopicsFromDOM($description)
    if (topics) {
      info += topics + '<br><br>'
    }
    
    
    return {
      url: url,
      title: title,
      info: info,
      content: content,
      answer: answer
    }
  }

  /**
   * Get question info for contest page
   * 
   * @param {String} title
   * @param {String} url
   * @param {jQueryDOM} $wrap
   * @return {Object<String>} info {url, title, info, content, answer}
   * @api private
   * 
   */
  Getter.prototype.getQuestionInfoForContest = function (title, url, $wrap) {
    //Title in parameter is not right
    title = $wrap.find('h3').text()
    

    // Info
    var difficultyText = $wrap.find('div.contest-question-info.pull-right > ul > li:nth-child(5) > span').text()
    var info = '<br>'

    title = '<h1><a href="' + url + '">' + title + ' --- ' + difficultyText + '</a></h1>'
    // Content
    var content = this.getContentFromDOM(
      this.findByClassName($wrap, 'div', 'question-content')
    )

    // Answer
    var answer = this.getAnswerFromDOM(
      $wrap.find('.CodeMirror-code').first(),
      $wrap.find('.Select-value-label').first().text()
    )

    return {
      url: url,
      title: title,
      info: info,
      content: content,
      answer: answer
    }
  }

  /**
   * Get question content from DOM
   * 
   * @param {jQueryDOM} $content
   * @return {String} content
   * @api private
   */
  Getter.prototype.getContentFromDOM = function ($content) {
    // Clone
    $content = $content.clone()

    // Remove tranlation switch for leetcode-cn.com
    var $translation = this.findByClassName($content, 'div', 'translation-tool')
    if ($translation) {
      $translation.remove()
    }
    $content.find('a').remove()
    $content.find(':hidden').show()
    $content.find('pre').each(function () {
      var $pre = $(this)
      $pre.html($pre.text())
    })
    // Clear extra span tag
    $content.find('p').each(function () {
      var $p = $(this), $children = $p.children()
      if ($children.length === 1 && $children.get(0).tagName === 'SPAN') {
        $p.html($children.get(0).innerHTML)
      }
    })

    return $content.html()
  }

  /**
   * Get question answer from DOM
   * 
   * @param {jQueryDOM} $answer
   * @param {String} language answer code language
   * @return {String} answer
   * @api private
   */
  Getter.prototype.getAnswerFromDOM = function ($answer, language) {
    $answer = $answer.clone()
    var answerLines = []
    $answer.find('.CodeMirror-linenumber').remove()
    $answer.find('.CodeMirror-line').each(function () {
      var $line = $(this)
      answerLines.push($line.text())
    })

    return '\n\n'+ '## 解法'
      + '\n\n```' + language.toLowerCase() + '\n'
      + answerLines.join('\n')
      + '\n```'
  }

  /**
   * Get question related topics from DOM
   * 
   * @param {jQueryDOM} $wrap
   * @return {String} related topics
   * @api private
   */
  Getter.prototype.getTopicsFromDOM = function ($wrap) {
    var topics = []

    var $title = this.findByClassName($wrap, 'div', function ($el) {
      if (window.location.origin.includes('leetcode-cn.com')) {
        return $el.html().indexOf('相关标签') === 0
      }
      return $el.html().indexOf('Related Topics') === 0
    })



    if (!$title || !$title.length) return ''

    $title.parent().parent().parent().find('div:last').find('a').each(function () {
      var $el = $(this)
      topics.push(
        '<a href="' + location.origin + $el.attr('href') + '">' +  $el.text() + '</a>'
      )
    })

    return 'Related Topics: ' + topics.join(', ')
  }

  /**
   * Find DOM by fuzzy class name
   * Because of front end build tools, class names of DOM has a surfix string.
   * Looks like 'question-content__JfgR'.
   * This method can find out it by prefix 'question-content'
   * 
   * @param {jQueryDOM} $wrap
   * @param {String} tag tag name of DOM
   * @param {String|Function} name prefix of actual class name
   * @return {jQueryDOM} $target
   * @api private
   */
  Getter.prototype.findByClassName = function ($wrap, tag, name) {
    var $els = $wrap.find(tag)
    var $target
    $els.each(function () {
      if (!$target) {
        var $el = $(this)
        if (typeof name === 'function') {
          if (name($el)) {
            $target = $el
            return false
          }
        } else {
          if (($el.attr('class') || '').indexOf(name) >= 0) {
            $target = $el
            return false
          }
        }
      }
    })

    return $target
  }

  /**
   * Translate html to markdown using to-markdown.js
   * 
   * @param {String} html
   * @return {String} markdown
   * @api private
   */
  Getter.prototype.translateToMarkdown = function (html) {
    return html ? toMarkdown(html) : ''
  }

  /**
   * Clear markdown string for question content
   * 
   * @param {String} markdown
   * @return {String} clean markdown
   * @api private
   */
  Getter.prototype.clearContentMarkdown = function (markdown) {
    return markdown.replace(/\*\*Credits[^\v]*/g, '')
      .replace(/\<pre[^\>]*\>/g, '```\n')
      .replace(/\<\/pre\>/g, '```')
      .replace(/\<sup[^\>]*\>/g, '<sup>')
      .replace(/\<div[^\>]*\>/g, '')
      .replace(/\<\/div\>/g, '')
      // Make sure has \n before ```
      .replace(/([^\n])```/g, '$1\n```')
  }

  Helper.getter = new Getter()

}()
