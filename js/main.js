
$(function(){
	var $body = $('body')
	var $title
	
	function init(){
		$title = $('.question-title h3').parent()

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
		var $btn = $('<a class="lch-btn-markdown" href="javascript:void(0);">').html('Copy for Markdown')
		
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
		
		$btn.tooltip({
			title: 'Copy to clipboard',
		})
		
		clipboard.on('success', function() {
			$btn.data('bs.tooltip').$tip.find('.tooltip-inner').html('Copied!')
		})
	}

})
