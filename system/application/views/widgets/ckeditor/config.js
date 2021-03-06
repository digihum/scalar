﻿/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

/** The following conforms texts originating from other sources (including Scalar's older WYSIWYG)
 * 1) Convert \n to <br /> when cut-and-paste in to 'source' mode
 * 2) Add a name="" attribute to empty <a> tags when cut-and-paste into either mode, and on load from the <textarea>
 * @author 	Craig Dietrich
 * @version	1.0
 */
$(document).on('paste', 'textarea', function (e) {  // Text is cut-and-paste into 'source' mode
	if ('undefined'!=typeof(codemirror_cke_1)) {
		var myFunc = function(obj1, obj2) {
			codemirror_cke_1.off('change', myFunc);
			// \n => <br />
			var val = codemirror_cke_1.getValue();
			val = val.replace(new RegExp('\r?\n','g'), '<br />');
			// add name="" to inline <a>
			var $val = $('<div></div>');
			$val.html(val);
			$val.find('a').each(function() {
				var $this = $(this);
				if (!$this.hasClass('inline')) return;
				if ($this.is('[name]')) return;
				$this.attr('name', 'scalar-inline-media');
			});
			// Insert
			setTimeout(function() {
				codemirror_cke_1.setValue($val.html());		
			},10);
		};
		codemirror_cke_1.on('change', myFunc);
	} 
});
CKEDITOR.on('instanceReady', function (ev) {  // Text is cut-and-paste into WYSIWYG
    ev.editor.on('paste', function (ev) {
    	var val = ev.data.dataValue;
    	if (val.length) {
	    	ev.editor.on('change', function (ev) {
	    		ev.removeListener();
	        	// add name="" to inline <a>
	        	var $val = $('<div></div>');
	    		$val.html(val);
	    		$val.find('a').each(function() {
	    			var $this = $(this);
	    			if (!$this.hasClass('inline')) return;
	    			if ($this.is('[name]')) return;
	    			$this.attr('name', 'scalar-inline-media');
	    		});
	    		// Insert
	    		ev.editor.setData($val.html()); 
	    	});
    	}
    });
});
var $textarea = $('.ckeditor:first');  // Text from <textarea>
var $val = $('<div></div>').html($textarea.val());
$val.find('a').each(function() {
	var $this = $(this);
	if (!$this.hasClass('inline')) return;
	if ($this.is('[name]')) return;
	$this.attr('name', 'scalar-inline-media');
});;
$textarea.val($val.html());

// Editor config
CKEDITOR.editorConfig = function( config ) {
	
	// %REMOVE_START%
	// The configuration options below are needed when running CKEditor from source files.
	config.plugins = 'dialogui,dialog,a11yhelp,basicstyles,blockquote,clipboard,panel,floatpanel,panelbutton,menu,button,toolbar,elementspath,enterkey,entities,wysiwygarea,indent,indentlist,list,maximize,pastetext,pastefromword,removeformat,sourcearea,specialchar,menubutton,undo,colorbutton,colordialog,codeTag,fakeobjects,iframe,codemirror,scalar';
	config.skin = 'bootstrapck';
	config.allowedContent = true;
	config.extraAllowedContent = 'code pre a[*]';
	config.disableNativeSpellChecker = false;
	config.height = 350;
	config.font_defaultLabel = 'Lucida Grande';
	config.fontSize_defaultLabel = '12px';	
	config.enterMode = CKEDITOR.ENTER_BR;
	// %REMOVE_END%

	config.toolbar = 'Scalar';
	 
	config.toolbar_Scalar =
	[
		{ name: 'document', items : [ 'Source' ] },
		/* { name: 'size', items : [ 'Maximize' ] }, */
		{ name: 'clipboard', items : [ 'PasteText','PasteFromWord','Undo','Redo' ] },
		{ name: 'basicstyles', items : [ 'Bold','Italic','Underline','TextColor', 'BGColor' ] },
		{ name: 'formatting', items : [ 'NumberedList','BulletedList','Blockquote','-','SpecialChar','Code','Iframe' ] },
		{ name: 'advanced', items : [ 'Scalar1', 'Scalar2', 'Scalar3', 'Scalar4', 'Scalar5', 'Scalar6', 'Scalar7' ] },
		{ name: 'clear', items : [ 'RemoveFormat' ] }
	];
	 

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = '';

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';
	
	config.codemirror = {
		    // Set this to the theme you wish to use (codemirror themes)
		    theme: 'default',
		    // Whether or not you want to show line numbers
		    lineNumbers: false,
		    // Whether or not you want to use line wrapping
		    lineWrapping: true,
		    // Whether or not you want to highlight matching braces
		    matchBrackets: true,
		    // Whether or not you want tags to automatically close themselves
		    autoCloseTags: false,
		    // Whether or not you want Brackets to automatically close themselves
		    autoCloseBrackets: false,
		    // Whether or not to enable search tools, CTRL+F (Find), CTRL+SHIFT+F (Replace), CTRL+SHIFT+R (Replace All), CTRL+G (Find Next), CTRL+SHIFT+G (Find Previous)
		    enableSearchTools: false,
		    // Whether or not you wish to enable code folding (requires 'lineNumbers' to be set to 'true')
		    enableCodeFolding: false,
		    // Whether or not to enable code formatting
		    enableCodeFormatting: true,
		    // Whether or not to automatically format code should be done when the editor is loaded
		    autoFormatOnStart: true,
		    // Whether or not to automatically format code should be done every time the source view is opened
		    autoFormatOnModeChange: true,
		    // Whether or not to automatically format code which has just been uncommented
		    autoFormatOnUncomment: true,
		    // Define the language specific mode 'htmlmixed' for html including (css, xml, javascript), 'application/x-httpd-php' for php mode including html, or 'text/javascript' for using java script only
		    mode: 'htmlmixed',
		    // Whether or not to show the search Code button on the toolbar
		    showSearchButton: false,
		    // Whether or not to show Trailing Spaces
		    showTrailingSpace: true,
		    // Whether or not to highlight all matches of current word/selection
		    highlightMatches: false,
		    // Whether or not to show the format button on the toolbar
		    showFormatButton: false,
		    // Whether or not to show the comment button on the toolbar
		    showCommentButton: false,
		    // Whether or not to show the uncomment button on the toolbar
		    showUncommentButton: false,
		    // Whether or not to show the showAutoCompleteButton button on the toolbar
		    showAutoCompleteButton: false,
		    // Whether or not to highlight the currently active line
		    styleActiveLine: true
		};	
	
};

