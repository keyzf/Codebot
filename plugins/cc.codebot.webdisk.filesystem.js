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

var CodebotWebDiskFilesystem = function() {
	const API_URL = 'plugins/webdisk-filesystem/api.php';

	this.driver = 'Web Disk FileSystem';

	var runCommand = function(theParams, theDataType, theCallback) {
		$.ajax({
			url: API_URL,
			method: 'post',
			data: theParams,
			dataType: theDataType
		}).done(function(theData) {
			theCallback(theData);

		}).fail(function(theJqXHR, theTextStatus, theError) {
			console.error('Error: ' + theTextStatus + ', ' + theError);
		});
	};

	this.init = function() {
		console.debug('CodebotWebDiskFilesystem::init()');
	};

    this.move = function(theOldNode, theNewNode, theCallback) {
        console.log('Move \''+theOldNode.path+'\' to \''+theNewNode.path+'\'');
        theOldNode.path = theNewNode.path;

        theCallback();
    };

    this.getTempDirectory = function(theCallback) {
        theCallback({title: "tmp", path: "/tmp", name: "tmp", folder: true, key: "tmp"});
    };

    this.readDirectory = function(thePath, theCallback) {
		runCommand({method: 'ls'}, 'json', theCallback);
    };

	this.chooseDirectory = function(theCallback) {
        theCallback({path: 'chosenDir', title: 'chosenDir', name: 'chosenDir'});
	};

	this.readFile = function(theNode, theCallback) {
		runCommand({method: 'read', path: theNode.path}, 'text', theCallback);
	};

	this.writeFile = function(theNode, theData, theCallback) {
		runCommand(
			{
				method: 'write',
				path: theNode.node.path,
				data: theData
			},
			'json',
			function(theResponse) {
				console.log(theResponse);
				theCallback();
			}
		);
	};

	this.createFile = function(theName, theNode, theData, theCallback) {
        console.log('CodebotFS.createFile(' + theNode + '/'+theName+')');
		theCallback();
	};

    this.delete = function(theNode, theCallback) {
        console.log('CodebotFS.delete(' + theNode.path +')');
		theCallback();
	};

	this.createDirectory = function(theName, theNode, theCallback) {
		console.log('CodebotFS.createDirectory(' + theNode + '/'+theName+')');
        theCallback();
	};

	this.build = function(theCallback) {
		console.log('Start build...');
		$.ajax({
			url: API_URL,
			method: 'post',
			data: {method: 'build'},
			dataType: 'json'
		}).done(function(theData) {
			theCallback(theData);

		}).fail(function(theJqXHR, theTextStatus, theError) {
			console.error('Error: ' + theTextStatus + ', ' + theError);
		});
	};
};

/**
* Plugin to enable a database-filesystem.
*/

var WebFileSystemPlugin = function() {
	this.id         = 'cc.codebot.webdisk.filesystem';

	var mSelf       = null;
	var mContext    = null;

	this.init = function(theContext) {
		console.debug('WebFileDiskSystemPlugin::init()');

		mSelf = this;
		mContext = theContext;

		mContext.setIODriver(new CodebotWebDiskFilesystem());
	};
};

CODEBOT.addPlugin(new WebFileSystemPlugin());
