/// <reference path="http://code.jquery.com/jquery-1.10.1.js" />

(function ($) {
	
	var defaults = {
		maxHeight : 42,
		duration : 1000,
		moreText : "see more",
		lessText : "see less"
	};
	
	function SeeMore(element, options) {
		this.options = options;
		this.panel = $(element);
		this._init();
	}
	
	SeeMore.prototype = {
	
		_init : function() {
			var plugin = this;
			var $panel = this.panel;
		
			if ($panel.children().length > 1) {
				$panel.children().wrapAll($('<div />'));
			}
			this.contents = $panel.children();
			this.moreLink = $('<a href="#" data-ajax="false" class="view-toggle closed"></a>')
				.text(this.options.moreText)
				.bind('click', function() {
					if (plugin.moreLink.hasClass("closed") ) {
						plugin.open();
					} else {
						plugin.close();
					}
				});
			
			var $contents = this.contents;
			var $moreLink = this.moreLink;
			var height = $contents.height();
			$panel.data('height', height);
			if (height > this.options.maxHeight) {
				$contents.css('height', this.options.maxHeight + 'px').css('overflow', 'hidden');
				$panel.append($moreLink);
			}
		},
		
		open : function() {
			var $panel = this.panel;
			var $contents = this.contents;
			var $link = this.moreLink;
			
			console.log('the height is', $contents.parent() );
			var height = +$panel.data("height");
			$contents.animate({ height : height }, { duration: this.options.duration });
			$link.text(this.options.lessText).removeClass('closed');
		},
		
		close : function() {
			var $panel = this.panel;
			var $contents = this.contents;
			var $link = this.moreLink;
			
			$contents.animate({ height: this.options.maxHeight }, { duration: this.options.duration });
			$link.text(this.options.moreText).addClass('closed');
		}
	};

	$.fn.seeMore = function(options) {
		return this.each(function() {
			if (typeof options == 'string') {
				//commands
				var plugin = $(this).data('seeMore');
				if (!plugin) {
					throw new Error('seeMore plugin not defined on ' + this.selector);
				}
				var command = plugin[options];
				if (command) {
					command.call(plugin);
				} else {
					throw new Error('seeMore plugin does not contain a command for ' + options);
				}
				
			} else {
				options = $.extend(defaults, options);
				var plugin = new SeeMore(this, options);
				$(this).data('seeMore', plugin);
			}
		});
	};
	
	$(function() {
		$('.seeMore').seeMore();
	});

})(jQuery);
