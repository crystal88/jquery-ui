(function ($) {
	
	$.widget("ui.treeview", {

	'rootNode' : null,
	
	'currentSelection' : null,
	
	'options' : {
		'checkable' : false,
		'autoCheckChildNodes' : true
	},
	
	'_init' : function(options) {
		this.options = $.extend(this.options, options);
		var domelem = this.element[0];
		this.rootNode = domelem;
		domelem.setAttribute('class', 'ui-widget ui-widget-content ui-corner-all');
		$('h1', domelem).attr('class', 'ui-widget-header ui-corner-all ui-helper-reset-ui-helper-clearfix');
		$('h1', domelem).attr('style', 'font-size: 100%; margin-top: 2px');
		this.init(domelem);
		this.initOpen(this.rootNode);
	},
	
	'initOpen' : function(rootNode) {
		var treeview = this;
		$('> ul > li', rootNode).each(function(){
			var isOpen = $(this).attr('data-open');
			console.log(isOpen);
			if (isOpen == 'true' || isOpen == 'yes' || isOpen == '1') {
				$('> ul', this).show();
			} else {
				$('> ul', this).hide();
			}
			treeview.initOpen(this);
		})
	},
	
	'isChecked' : function(liElem) {
		chval = liElem.attr('data-checked');
		return chval === 'yes' || chval === 'true' || chval == '1';
	},
	
	'init' : function(domelem) {
		var treeview = this;
		
		$('ul > li', domelem).each(function() {
				if (this.parentNode.parentNode == domelem) {
					parent = this;
					if (treeview.options.checkable) {
						$(this).prepend('<input type="checkbox"/>');
						if (treeview.isChecked($(this))) {
							$('input', this).attr('checked', 'yes');
							$(this).attr('data-checked', 'true');
						}
						if (treeview.options.autoCheckChildNodes) {
							$('input', this).click(function(){
								treeview.checkChildNodes($(this));
							});
						}
					}
					if ($('ul', this).length) {
						$(this).prepend('<span class="ui-icon ui-icon-carat-1-e" style="display:inline-block; margin-left: -16px; cursor:pointer"></span>');
					}
					$('span', this).click(treeview.createClickListener(parent, treeview));
					$('a', this).each((function(parent) {
						return function() {
							if (this.parentNode == parent) {
								$(this).attr('class','ui-priority-primary');
								$(this).css({
									'text-decoration' : 'none', 
									'bottom' : '3px',
									'position' : 'relative',
									'cursor' : 'pointer'
								});								
								$(this).click(treeview.createClickListener(parent, treeview));
							}
						}
					})(parent)
					
					)
					node = {'element' : this};
					treeview.init(this);
				}
		});
		$(domelem).attr('style', 'list-style-type:none; list-style-position:inside; margin-left: -10px');
	},
	
	'createClickListener' : function(parent, treeview){
					return function() {
						treeview.changeSelection($('> a', parent));
						hiddens = $('> ul:hidden', parent);
						if (hiddens.length == 1) {
							hiddens.show('fast');
							$('> span', parent).attr('class', 'ui-icon ui-icon-carat-1-s');
						} else {
							$('> ul:visible', parent).hide('fast');
							$('> span', parent).attr('class', 'ui-icon ui-icon-carat-1-e');
						}
					}
				},
				
	'result' : function() {
		return this.rootNodes;
	},
	
	'changeSelection' : function(newSel) {
		var selectionClass = 'ui-state-focus';
		if (this.currentSelection != null) {
			this.currentSelection.removeClass(selectionClass);
		}
		this.currentSelection = newSel;
		//treeview.currentSelection.addClass(selectionClass);
	},
	
	'checkChildNodes' : function(liElem) {
		$('> ul input', liElem.parent()).attr('checked', liElem.attr('checked'));
	},
	

})

})(jQuery);


