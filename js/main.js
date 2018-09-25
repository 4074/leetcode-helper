
$(function(){
	var $body = $('body')
	var $title, $btn
	var isNewUI = false
	
	function init(){
		$title = $('.question-title h3')
		if ($title.length) {
			$title = $title.parent()
		} else {
			isNewUI = true
			$title = $('h1')
		}

		// LeetCode render question dom lazily.
		// Therefore, set a timer to render copy button.
		if ($title.length) {
			renderCopyButton()
		} else {
			setTimeout(init, 1000)
		}
	}
	init()
	
	function renderCopyButton() {
		$btn = $('<a class="lch-btn-markdown hint--top" aria-label="Copy to clipboard" href="javascript:void(0);">').html('Copy for Markdown')
		$btn.addClass(isNewUI ? 'lch-btn-cn' : 'lch-btn-en')
		
		$btn.appendTo($title)
		bindCopyButton('.lch-btn-markdown', $btn)
	}
	
	/**
	 * bind $btn click to copy the markdown
	 */
	function bindCopyButton(selector, $btn){
		var clipboard = new Clipboard(selector, {
			text: function(){
				return Helper.getter.getQuestionMarkdown(window.location.href, $body)
			}
		})
		
		clipboard.on('success', function() {
			$btn.attr("aria-label", 'Copied!')
			setTimeout(function() {
				$btn.attr("aria-label", 'Copy to clipboard')
			}, 2000)
		})
	}

})
