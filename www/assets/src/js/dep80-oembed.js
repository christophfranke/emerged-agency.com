

function Oembed(){
	"use strict";

	var selector = '[data-oembed-url]';
	var providersURL = '/assets/json/providers.json';
	var proxyURLPrefix  = '/oembed-proxy?url=';
	var providerData = null;
	var waitingForData = [];

	var self = this;
	var $ =jQuery;

	function getProviders(onComplete){
		//no on is waiting, we need to send request
		if(waitingForData.length == 0)
		{
			Ajax.getJSON(providersURL, function(response){
				providerData = response;
				for(var i=0; i < waitingForData.length; i++)
					waitingForData[i]();
				//nobody waiting now
				waitingForData = [];
			});
			waitingForData.push(onComplete);
		}
		else{
			//request has been sent alread, only register as waiting
			waitingForData.push(onComplete);
		}
	}

	function fetchHTMLfromEndpoint(endpoint, url, onComplete){
		var queryURL = proxyURLPrefix + endpoint.replace('{format}', 'json').replace('&', '%26') + '?url=' + url + '%26format=json';
		Ajax.getJSON(queryURL, function(response){
			onComplete(response.html);
		});
	}

	function embedHTMLinElement(html, element){
		$(element).html(html);
	}

	function schemeMatchesURL(scheme, url){
		var scheme = scheme.split('*').join('.+');//.split('.').join('\\.');
		var schemeRegex = new RegExp(scheme, 'i');
		return url.match(schemeRegex);
	}

	function domainMatchesURL(domain, url){
		var domain = domain.split('.').join('\\.');
		var domainRegex = new RegExp(domain, 'i');
		return url.match(domainRegex);
	}

	self.goState = function(url, onComplete){
		if(onComplete === 'function')
			onComplete();
	}

	self.resolveURL = function(element){
		//when data not fetched yet, get it and try again
		if(providerData == null){			
			getProviders(function(){
				self.resolveURL(element);
			});
			return;
		}
		var url = $(element).data('oembed-url');

		for(var i=0; i<providerData.length; i++){
			var endpoints = providerData[i].endpoints;

			for(var j=0; j<endpoints.length; j++){
				var endpoint = endpoints[j];

				var schemes = endpoint.schemes || [];
				var providerMatched = false
				for(var k=0; k<schemes.length; k++){
					var scheme = schemes[k];
					if(schemeMatchesURL(scheme, url)){
						providerMatched = true;
						break;
					}
				}
				//no schemes provided, so we match everything from that domain
				if(schemes.length == 0){
					var providerURL = providerData[i].provider_url;
					var providerDomain = providerURL.replace('http:', '').replace('https:', '').replace('//', '').split('/').join('');
					if(domainMatchesURL(providerDomain, url))
						providerMatched = true;
				}

				//take action if provider matched
				if(providerMatched){				
					fetchHTMLfromEndpoint(endpoint.url, url, function(html){
						embedHTMLinElement(html, element);
					});
					return; //we are done here
				}
			}
		}
		console.error('OEmbed: Could not find provider for ' + url);
		embedHTMLinElement('<a href="' + url + '" target="_blank">' + url + '</a>', element);
	}

	self.embed = function(){
		var elems = $(selector);
		for(var i=0; i < elems.length; i++)
			this.resolveURL(elems[i]);
	}
}