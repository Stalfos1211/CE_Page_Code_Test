
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'url'; 

var panelControls = '<div id=\"test-code-panel\">\r\n    \t\t<div id=\"codemirror-container\"><\/div>\r\n    \t\t<button id=\"run\">run<\/button>\r\n        <\/div>';


chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		/*// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

		// Inject panel controls to body of webpage
		document.body.innerHTML += panelControls;

		var customScripts = '<script>var editorSelector = document.getElementById(\'codemirror-container\');\r\n\r\nvar editor = CodeMirror(editorSelector, {\r\n\tvalue: \"function myScript(){return 100;}\\n\",\r\n  \tmode:  \"javascript\",\r\n  \ttheme: \'ambiance\',\r\n  \tstylesheet: \"css\/CodeMirror.css\",\r\n    lineNumbers: true\r\n});'
							+ ' $(\'#run\').click(()=>{eval(editor.getValue())}); <\/script>'; 
		$('body').append(customScripts);*/
		

	}
	}, 10);

});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    if( request.message === "inject_scripts") {

    	if($('#test-code-panel').length == 0){
	      // Inject panel controls to body of webpage
			document.body.innerHTML += panelControls;

			var customScripts = '<script>var editorSelector = document.getElementById(\'codemirror-container\');\r\n\r\nvar editor = CodeMirror(editorSelector, {\r\n\tvalue: \"'
								+ 'console.log(\'test\')'
								+ '\\n\",\r\n  \tmode:  \"javascript\",\r\n  \ttheme: \'ambiance\',\r\n  \tstylesheet: \"css\/CodeMirror.css\",\r\n    lineNumbers: true\r\n});'
								//+ ' $(\'#run\').click(()=>{eval(editor.getValue())});'
								+ ' $(\'#run\').click(()=>{var f = new Function(editor.getValue()); f();});'
								+ ' <\/script>'; 
			$('body').append(customScripts);
		}
		else {
			$('#test-code-panel').remove();
		}
    }

  }
);