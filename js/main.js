
+ function(){
	var $body = $('body')
	var $title = $('.question-title h3').parent()
	
	function init(){
		if ($title.length) {
			renderCopyButton()
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

}()
