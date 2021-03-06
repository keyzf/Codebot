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

var CodebotShortcuts = function() {
    var mCodebot    = null;
    var mSelf       = null;
    
    var saveActiveTab = function() {
        var aTab = mCodebot.ui.tabs.active;
        
        if(aTab) {
            mCodebot.writeTabToDisk(aTab);
        }
        
        console.debug('Save active tab to disk.');
    };
    
    var newFile = function() {
        console.debug('Open new tab with empty file');
    };
    
    var chooseFile = function() {
        console.debug('Show dialog to open file');
    };
    
    var renameNode = function() {
        mCodebot.ui.filesPanel.renameFocusedNode();
        console.debug('Rename node');
    };
    
    var exit = function() {
        console.debug('Exit application!');
        return false;
    };
    
    var closeTab = function() {
        var aTab = mCodebot.ui.tabs.active;

        if(aTab) {
            mCodebot.ui.tabs.remove(aTab);
        }
        
        console.debug('Close current tab!');
        return false; // prevent browser's default behavior
    };
	
    var createKeyBindings = function() {
        var aShortcuts = mCodebot.preferences.get().shortcuts;
        var aCommand = null;
        var aKey = null;
        var aShortcutsMethods = {
            'saveActiveTab':    saveActiveTab,
            'newFile':          newFile,
            'chooseFile':       chooseFile,
            'closeTab':         closeTab,
            'renameNode':       renameNode,
            'exit':             exit
        };

        for(aCommand in aShortcuts) {
            aKey = aShortcuts[aCommand];
            // TODO: better error handling when no method is available (key binding error)
            Mousetrap.bindGlobal(aKey, aShortcutsMethods[aCommand]);
            
            console.debug('CODEBOT [keybind] ' + aKey + ' = ' + aCommand);
        }
    };
    
    this.init = function(theCodebot) {
        mSelf    = this;
        mCodebot = theCodebot;
        
        createKeyBindings();
    };
};