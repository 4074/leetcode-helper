
+ function(){
	var md = Helper.getter.getQuestionMarkdown()
	var $body = $('body')
	var $title = $('.question-title h3')
	
	function init(){
		renderMdBtn()
	}
	init()
	
	function renderMdBtn() {
		var $btn = $('<a class="lch-btn-markdown" href="javascript:void(0);">').html('Copy the question')
		
		$btn.appendTo($title)
		bindMdCopy('.lch-btn-markdown', $btn)
		//bindMdPopover($btn)
	}
	
	/**
	 * bind $btn click to copy the markdown
	 */
	function bindMdCopy(selector, $btn){
		var clipboard = new Clipboard(selector, {
			text: function(){
				return md
			}
		})
		
		$btn.tooltip({
			title: 'Copy to clipboard',
		})
		
		clipboard.on('success', function() {
			$btn.data('bs.tooltip').$tip.find('.tooltip-inner').html('Copied!')
		})
	}
	
	function bindMdPopover($elem){
		var options = {
			title: 'Markdown',
			content: '<div class="lch-popover-markdown"><pre>' + md + '</pre><div>',
			html: true,
			placement: 'bottom',
			template: '<div class="popover lch-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
		}
		$elem.popover(options)
	}
	
}()
