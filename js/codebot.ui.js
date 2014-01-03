/*
	The MIT License (MIT)

	Copyright (c) 2013 Fernando Bevilacqua

	Permission is hereby granted, free of charge, to any person obtaining a copy of
	this software and associated documentation files (the "Software"), to deal in
	the Software without restriction, including without limitation the rights to
	use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
	the Software, and to permit persons to whom the Software is furnished to do so,
	subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
	FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
	COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
	IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
	CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var CODEBOT = CODEBOT || {};

CODEBOT.ui = new function() {
	var mTabs = null;
	
	var filePanelClick = function(theEvent, theItem) {
		var aData = theItem.node.data;
		
		console.log('File panel click: ' + theEvent + ' : ' + theItem.node.folder);
		
		if(!theItem.node.folder) {
			CODEBOT.ui.tabs.addNewTab(mTabs, {
				favicon: 'http://g.etfv.co/https://www.hubspot.com',
				title: aData.path,
				data: {
					timeAdded: +new Date()
				}
			});
		}
	};
	
	var transform3d = function(theElementId, theX, theY, theZ) {
		document.getElementById(theElementId).style.WebkitTransform = 'translate3d('+ theX +','+ theY +','+ theZ +')';
	};
		
	this.showConfigDialog = function(theStatus, theContent) {
		if(theStatus) {
			$('#config-dialog').html(theContent);
			
			// TODO: remove the hardcoded value
			transform3d('content', '-600px', '0', '0');
			transform3d('config-dialog', '-600px', '0', '0');
		} else {
			transform3d('content', '0', '0', '0');
			transform3d('config-dialog', '0', '0', '0');
		}
	};
	
	this.refreshFilesPanel = function(theData) {
		if(theData && theData.length > 0) {
			$("#folders").fancytree({
				click: filePanelClick,
				source: theData,
				checkbox: false,
				selectMode: 3
			});
			
			var aDirs = $("#folders").fancytree("getTree");
			aDirs.reload();
			
		} else {
			$("#folders").html('<div class="">no</div>');
		}
	};

	this.addPlugin = function(theId, theObj) {
		$('#config-bar').html(
			$('#config-bar').html() +
			'<a href="#" data-plugin="'+theId+'"><i class="fa fa-'+theObj.icon+'"></i></a>'
		);
		
		$('#config-bar a').click(function() {
			CODEBOT.handlePluginClick($(this).data('plugin'));
		});
	};
	
	this.init = function() {
		// TODO: read data from disk
		CODEBOT.ui.refreshFilesPanel([
			{title: "Test.as", path: "/proj/folder/Test.as"},
			{title: "Folder 2", folder: true, key: "folder2",
			  children: [
				{title: "Test2.as", path: "/proj/folder/Test2.as"},
				{title: "Test3.as", path: "/proj/folder/Test3.as"}
			  ]
			},
			{title: "Test4.as", path: "/proj/folder/Test4.as"}
		]);
		
		mTabs = $('.chrome-tabs-shell');
		
		CODEBOT.ui.tabs.init({
			$shell: mTabs,
			minWidth: 20,
			maxWidth: 100
		});
		
		mTabs.bind('chromeTabRender', function(){
			var $currentTab = mTabs.find('.chrome-tab-current');
			if ($currentTab.length && window['console'] && console.log) {
				console.log('Current tab index', $currentTab.index(), 'title', $.trim($currentTab.text()), 'data', $currentTab.data('tabData').data);
			}
		});
	};
};