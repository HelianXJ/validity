/**
 *
 */
(function() {
	var xml = {};

	//	Public Methods

	/**
	 * @function
	 * @public
	 * @name parseResponse
	 */
	xml.parseResponse = function(xmlDom) {
		var response = {"url": undefined, "messages": undefined, "source": {"encoding": undefined, "type": "text/html"}},
			messages = [],
			errorNodes;

		response.url = _getFirstTagName(xmlDom, 'uri').textContent;
		response.source.encoding = _getFirstTagName(xmlDom, 'charset').textContent;

		errorNodes = _getFirstTagName(xmlDom, 'errorlist').childNodes;
		//	Loop through errors
		for (var i = 0; i < errorNodes.length; i++) {
			//	Create object for error
			messages[i] = {};

			messages[i].lastLine = parseInt(_getFirstTagName(errorNodes[i], 'line').textContent, 10);
			messages[i].lastColumn = parseInt(_getFirstTagName(errorNodes[i], 'col').textContent, 10);
			messages[i].message = _getFirstTagName(errorNodes[i], 'message').textContent;
			messages[i].messageid = _getFirstTagName(errorNodes[i], 'messageid').textContent;
			messages[i].explanation = _getFirstTagName(errorNodes[i], 'explanation').textContent;
			messages[i].type = 'error';
		}

		response.messages = messages;

		return response;
	}

	//	Private Functions

	/**
	 * @private
	 * @function
	 * @name _getFirstTagName
	 */
	function _getFirstTagName(dom ,tagName) {
		return dom.getElementsByTagName(tagName)[0];
	}

	window.validity.xml = xml;
})();