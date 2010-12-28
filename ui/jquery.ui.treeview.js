(function ($) {
	
	$.widget("ui.treeview", {

	'rootNodes' : {},
	
	'currentSelection' : null,
	
	'_init' : function() {
		domelem = this.element[0];
		domelem.setAttribute('class', 'ui-widget ui-widget-content ui-corner-all');
		$('h1', domelem).attr('class', 'ui-widget-header ui-corner-all ui-helper-reset-ui-helper-clearfix');
		$('h1', domelem).attr('style', 'font-size: 100%; margin-top: 2px');
		treeview = this;
		this.init(domelem, this.rootNodes);
		$('ul li ul', domelem).hide();
	},
	
	'init' : function(domelem, container) {
		var treeview = this;
		container['children'] = {};
		
		$('ul > li', domelem).each((function(nodecont) {
		
			return function() {
				if (this.parentNode.parentNode == domelem) {
					parent = this;
					$('> input', this).each(function(){
						nodecont[$(this).attr('name')] = $(this).val();
					});
					if ($('ul', this).length) {
						$(this).prepend('<span class="ui-icon ui-icon-carat-1-e" style="display:inline-block; margin-left: -16px; cursor:pointer"></span>');
					}
					$('span', this).click(treeview.createClickListener(parent, treeview));
					$('a', this).each((function(parent) {
						return function() {
							if (this.parentNode == parent) {
								$(this).attr('class','ui-priority-primary');
								$(this).attr('style', 'text-decoration:none; bottom: 3px; position: relative; cursor:pointer');								
								$(this).click(treeview.createClickListener(parent, treeview));
							}
						}
					})(parent)
					
					);
					treeview.init(this, nodecont);
				}
		}})(container['children']));
		$(domelem).attr('style', 'list-style-type:none; list-style-position:inside; margin-left: -10px');
	},
	
	'createClickListener' : function(parent, treeview){
					return function() {
						treeview.changeSelection($('> a', parent));
						hiddens = $('> ul:hidden', parent);
						if (hiddens.length == 1) {
							hiddens.show();
							$('> span', parent).attr('class', 'ui-icon ui-icon-carat-1-s');
						} else {
							$('> ul:visible', parent).hide();
							$('> span', parent).attr('class', 'ui-icon ui-icon-carat-1-e');
						}
					}
				},
				
	'result' : function() {
		return this.rootNodes;
	},
	
	'changeSelection' : function(newSel) {
		var selectionClass = 'ui-state-focus';
		if (treeview.currentSelection != null) {
			treeview.currentSelection.removeClass(selectionClass);
		}
		treeview.currentSelection = newSel;
		treeview.currentSelection.addClass(selectionClass);
	},
	
	'sg' : function(a) {
		console.log('hello: '+a);
	}
})

})(jQuery);


