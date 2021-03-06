/**
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 *
 * Modifications by Fernando Bevilacqua <dovyski@gmail.com>
 *
 */

var CodebotEditorAce = new function() {
    this.create = function(theTab, theContent, theNode) {
        var aEditor = null;

        aEditor = ace.edit(theTab.container);
        aEditor.setTheme("ace/theme/tomorrow_night_eighties"); // TODO: get theme from Codebot?
        aEditor.getSession().setMode("ace/mode/javascript"); // TODO: choose mode based on file extension.
        aEditor.setValue(theContent);
        
        aEditor.session.selection.clearSelection();

        // TODO: remove this CODEBOT singleton call.
        for(var i in CODEBOT.preferences.get().editor) {
            aEditor.setOption(i, CODEBOT.preferences.get().editor[i]);
        }
        
        aEditor.getSession().on('change', function(e) {
            theTab.setDirty(true);
        });

        return aEditor;
    };
};