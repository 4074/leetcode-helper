
$(function(){
	var $body = $('body')
	var isCN = window.location.host.indexOf('cn') >= 0 
	var maxTryTimes = 20
	var times = 0

	listenDomChange($body[0])
	init()

	function init(){
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
			if ($title.find('a.lch-btn-markdown').length === 0) {
				renderCopyButton($title)
			}
		} else {
			times += 1
			if (times < maxTryTimes) {
				setTimeout(init, 1000)
			}
		}
	}

	function listenDomChange(element) {
		if (!MutationObserver) return;

		var observer = new MutationObserver(init)
		observer.observe(element, {
			childList: true
		})
	}
	
	function renderCopyButton($parent) {
		var $btn = $('<a class="lch-btn-markdown hint--top" aria-label="Copy to clipboard" href="javascript:void(0);">').html('Copy for Markdown')
		$btn.addClass(isCN ? 'lch-btn-cn' : 'lch-btn-en')
		$btn.appendTo($parent)
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
			console.log('success')
			$btn.attr("aria-label", 'Copied!')
			setTimeout(function() {
				$btn.attr("aria-label", 'Copy to clipboard')
			}, 2000)
		})
	}

})
