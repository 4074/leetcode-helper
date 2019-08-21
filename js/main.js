$(function () {
  var $body = $('body')
  var isCN = window.location.host.indexOf('cn') >= 0

  // Try times
  var times = 0
  var maxTryTimes = 20

  var questionTitle = ''
  var currentUrl = ''
  var hasBindCopy = false

  init()

  // Listen DOM modified, call the init method
  window.addEventListener('DOMSubtreeModified', function () {
    setTimeout(init, 1000)
  })

	/**
	 * The main function.
	 * Find out the title DOM of question, render copy button behind it.
	 */
  function init() {
    // Avoid init repeatedly
    if (window.location.href === currentUrl) return;

    var $title = $('.question-title h3')
    if ($title.length) {
      $title = $title.parent()
    } else {
      if (!isCN) {
        $title = $('[data-key=description-content] div div div').eq(0)
      } else {
        $title = $('h4')
      }
    }

    // LeetCode render question dom lazily.
    // Therefore, set a timer to render copy button.
    if ($title.length) {
      if ($title.find('a.lch-btn-markdown').length === 0 || window.location.href !== currentUrl) {
        currentUrl = window.location.href
        var $c = $title.clone()
        $c.find('a.lch-btn-markdown').remove()
        questionTitle = $c.first().text()
        renderCopyButton($title)
      }
    } else {
      times += 1
      if (times < maxTryTimes) {
        setTimeout(init, 1000)
      }
    }
  }

	/**
	 * Render Copy button behind question title.
	 * 
	 * @param {jQueryDOM} $parent 
	 */
  function renderCopyButton($parent) {
    $('a.lch-btn-markdown').remove()
    var $btn = $('<a class="lch-btn-markdown hint--top" aria-label="Copy to clipboard" href="javascript:void(0);">').html('Copy for Markdown')
    $btn.addClass(isCN ? 'lch-btn-cn' : 'lch-btn-en')
    $btn.appendTo($parent)
    bindCopyButton('.lch-btn-markdown')
  }

	/**
	 * Bind button click event, copy the markdown of question to clipboard.
	 * 
	 * @param {String} selector the css selector to find button
	 */
  function bindCopyButton(selector) {
    // Clipboard bind is for window.
    // After display next question, it is already bind.
    if (hasBindCopy) return;

    hasBindCopy = true

    // Init Clipboard plugin
    var clipboard = new Clipboard(selector, {
      text: function () {
        return Helper.getter.getQuestionMarkdown(questionTitle, window.location.href, $body)
      }
    })

    clipboard.on('success', function () {
      var $btn = $(selector)

      // Set copied tips
      $btn.attr("aria-label", 'Copied!')

      // Reset tips
      setTimeout(function () {
        $btn.attr("aria-label", 'Copy to clipboard')
      }, 2000)
    })
  }

})
