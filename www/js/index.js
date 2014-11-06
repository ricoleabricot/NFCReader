/* 
* @Author: kafei
* @Date:   2014-11-06 14:22:56
* @Last Modified by:   kafei
* @Last Modified time: 2014-11-06 14:23:23
*/

var app = {

	initialize: function() {
		this.bindEvents();
	},

	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
		jQuery.support.cors = true;
	},

	onDeviceReady: function() {
		app.receivedEvent('deviceready');

		alert("passage 1");
		// Read NDEF formatted NFC Tags
		nfc.addNdefListener (
			function (nfcEvent) {
				alert("passage 2");
				var tag = nfcEvent.tag,
					ndefMessage = tag.ndefMessage;

				// dump the raw json of the message
				// note: real code will need to decode
				// the payload from each record
				alert(JSON.stringify(ndefMessage));

				// assuming the first record in the message has 
				// a payload that can be converted to a string.
				alert(nfc.bytesToString(ndefMessage[0].payload).substring(3));
			}, 
			function () { // success callback
				alert("Waiting for NDEF tag");
			},
			function (error) { // error callback
				alert("Error adding NDEF listener " + JSON.stringify(error));
			}
		);
	},

	receivedEvent: function(id) {
		var parentElement = document.getElementById(id);
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');

		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');

		console.log('Received Event: ' + id);
	}
};

app.initialize();