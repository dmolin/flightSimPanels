/*  Tash! Reactive JavaScript Library, version 0.0.1
 *  (c) 2011-2012 Davide A. Molin
 *
 * Tash! is freely distributable and released under the MIT, BSD, and GPL Licenses.
 *
 *--------------------------------------------------------------------------*/
//Define or recapture tash global instance
window.tash = window.tash || {};

(function($){

	$.version = {
		major: 0,
		minor: 0,
		sub: 1
	};

	$.config = {
		namespaceRoot: '',   //base parent to use when calling namespace function
		namespaceEventsRoot: ''  //base parent namespace for events (used in require())
	};

	/**
	* This function define a new namespace, under its own containing namespace.
	* (ex.: tash.namespace( 'mine' ) will resolve to "tash.mine" )
	*/
	$.namespace = function( instance, nspace ) {
		var nspaces,
			parent = instance,
			i = 0;

		if( typeof instance == 'string' ) {
			nspace = ($.config.namespaceRoot ? $.config.namespaceRoot + '.' : '') + instance;
			parent = window;
		}

		nspaces = !nspace ? '' : nspace.split('.');

		for( i in nspaces ) {
			if( nspaces.hasOwnProperty(i) ) {
				if( typeof parent[nspaces[i]] === 'undefined' ) {
					parent[nspaces[i]] = {};
				}
				parent = parent[nspaces[i]];
			}
		}
		//let's return the innermost namespace, to allow for
		//immediate use..
		return parent;
	};

	/**
	* Determines if the passed in Object IS an Array
	*/
	$.isArray = (typeof Array.isArray === 'function' ? Array.isArray : function isArray( /* Array */ obj ){
		return obj !== undefined && Object.prototype.toString.call(obj).match(/Array/) !== null;
	});

	/**
	* Adds an object/arrat to a given array
	* Returns the number of elements added to the array. 0 if nothing has been done
	*/
	$.addToArray = function( destArray, obj ) {
		var added = 0;
		if( !$.isArray(destArray)) {
			return added;
		}

		if( $.isArray(destArray) ) {
			$.each( obj, function( o, index ) {
				destArray.push( o );
				added++;
			} );
		} else {
			destArray.push( obj );
			added++;
		}
		return added;
	};

	/**
	* Internal iterator over a collection.
	* Iterates over the collection and calls the given callback function.
	* a third argument can be passed in as the callback scope. If not present, "this"
	* will be set as the iteration element.
	*
	* NOTE: Returning false from the callback will stop the iteration.
	*/
	$.each = function each( /* Array */obj, /* Function */cb, /* object */scope ) {
		var index;

		if( !$.isArray( obj ) ) {
			return; //no array, no loop
		}

		for( index in obj ) {
			if( obj.hasOwnProperty( index ) ) {
				if( cb.call( (scope ? scope : obj[index]), obj[index], index ) === false ) {
					break;
				}
			}
		}
	};

/*
 *  Utility module
 ----------------------------------------*/
	$.util = {
		/**
		* Microtemplating facility
		*/
		template: function( tmpl, obj ) {
			var i,
				matches = tmpl.match(/\{\{(\w+)\}\}/g);
			if( matches ) {
				for( i = 0; i < matches.length; i+=1 ) {
					var matched = matches[i];
					if( matched.charAt(0) !== '{' ) {
						return; //skip non matching elements
					}
					tmpl = tmpl.replace( matched, obj[matched.substr(2, matched.length-4)]||matched );
				}
			}
			return tmpl;
		},

		trimAt: function( str, length ) {
			if( str && str.length && str.length > length ) {
				str = str.substr( 0, length-3 ) + '...';
			}
			return str;
		},

		isDefined: function( objectName ) {
			var parts = objectName.split('.'),
				parent = window,
				i;

			for( i in parts ) {
				if( parts.hasOwnProperty(i) ) {
					if( typeof parent[parts[i]] === 'undefined' ) {
						return false;
					}
					parent = parent[parts[i]];
				}
			}
			return true;
		},

		mixin: function( dest, proto ) {
			//mix an object into another
			var fun, prop;

			for( prop in proto ) {
				//console.log( "adding " + prop + " to dest" );
				if( proto.hasOwnProperty( prop ) ) {
					if (typeof dest[prop] === "function") {
						dest[prop].parent = proto[prop];
					} else if ( typeof dest[proto] !== 'undefined' ) {
						dest[prop] = proto[prop];
					}
				}
			}
			return dest;
		}

	};


}(window.tash));

if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
		"use strict";
		if (this === void 0 || this === null) {
			throw new TypeError();
		}
		var t = [].concat( this );
		var len = t.length >>> 0;
		if (len === 0) {
			return -1;
		}
		var n = 0;
		if (arguments.length > 0) {
			n = Number(arguments[1]);
			if (n !== n) { // shortcut for verifying if it's NaN
				n = 0;
			} else if (n !== 0 && n !== Infinity && n !== -Infinity) {
				n = (n > 0 || -1) * Math.floor(Math.abs(n));
			}
		}
		if (n >= len) {
			return -1;
		}
		var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
		for (; k < len; k++) {
			if (k in t && t[k] === searchElement) {
				return k;
			}
		}
		return -1;
	};
}
/**
* Module used for Publishing/Subscribing to events
*
* Note: the pub/sub logic, though simple, is HEAVILY based on Peter Higgins (dante@dojotoolkit.org) implementation,
*       Loosely based on Dojo publish/subscribe API, limited in scope.
*       Original is (c) Dojo Foundation 2004-2009. Released under either AFL or new BSD, see:
*       http://dojofoundation.org/license for more information.
*
* @author D.Molin
*/
(function($){

	$.namespace( $, 'events' );

	/*----------------------------------------
	* Internal privileged functions
	*-----------------------------------------*/

	// the topic/subscription hash
	var cache = {};

	function _publish(/* String */topic, /* Array? */args){
		// summary:
		//    Publish some data on a named topic.
		// topic: String
		//    The channel to publish on
		// args: Array?
		//    The data to publish. Each array item is converted into an ordered
		//    arguments on the subscribed functions.
		//
		// example:
		//    Publish stuff on '/some/topic'. Anything subscribed will be called
		//    with a function signature like: function(a,b,c){ ... }
		//
		//  |   tash.events.publish("/some/topic", ["a","b","c"]);
		if( !cache[topic]) {
			return;
		}

		$.each( cache[topic], function( elem, index ){
			elem.callback.apply( elem.scope, args || []);
		});
	}

	function _subscribe(/* String */topic, /* Function */callback, /* Object */scope ){
		// summary:
		//    Register a callback on a named topic.
		// topic: String
		//    The channel to subscribe to (accept also namespaced topics)
		// callback: Function
		//    The handler event. Anytime something is $.publish'ed on a
		//    subscribed channel, the callback will be called with the
		//    published array as ordered arguments.
		// scope: Object
		//    the scope to use as 'this' when invoking the callback. if not given, the scope will be Tash
		//
		// returns: Array
		//    A handle which can be used to unsubscribe this particular subscription or false if subscription fails.
		//
		// example:
		//  | tash.events.subscribe("/some/topic", function(a, b, c){ /* handle data */ });
		//
		if( !topic || typeof callback !== 'function' ) {
			return false;
		}

		if(!cache[topic]){
			cache[topic] = [];
		}
		cache[topic].push( { callback: callback, scope: (scope ? scope : $) } );
		return [topic, callback ]; // Array
	}

	function _unsubscribe(/* Array */handle){
		// summary:
		//    Disconnect a subscribed function for a topic.
		// handle: Array
		//    The return value from a $.subscribe call.
		// example:
		//  | var handle = $.subscribe("/something", function(){});
		//  | $.unsubscribe(handle);
		var t;

		if( typeof handle === 'undefined' || !$.isArray(handle) ) {
			return;
		}

		t = handle[0];
		if( cache[t] ) {
			$.each(cache[t], function(elem, idx){
				if( elem == handle[1]) {
					cache[t].splice(idx, 1);
				}
			});
		}
	}

	/*----------------------------------------
	* Exposed API interface
	*-----------------------------------------*/

	/**
	* Verify that the required scoped event namespace object exists.
	* If not, it is created with the corresponding publishing/subscribing functions
	* Example: if you want to have tash.events.game.GameInfo with publish, subscribe, unsubscribe,
	* you just need to call (before actually using it):
	*
	*   tash.events.require( "game.GameInfo" );
	*
	* After that, you will be able to access:
	*
	*	tash.events.game.GameInfo.publish()/subscribe()/unsubscribe()
	*
	* that's all!
	*/
	$.events.require = function( namespacedEvent ) {
		var completeNamespace = $.config.namespaceEventsRoot || $.config.namespaceRoot,
			nspace;

		if( !namespacedEvent || namespacedEvent.length === 0 ) {
			return; //no-op
		}

		completeNamespace += completeNamespace ? ( namespacedEvent.charAt(0) === '.' ? namespacedEvent : "." + namespacedEvent ) : namespacedEvent;

		nspace = $.namespace( completeNamespace );

		//if namespace function is already in place, nothing happens
		if( typeof nspace.publish === 'function' ) {
			return nspace; //nothing to do, namespace already existing
		}

		//create the publish/subscribe/unsubscribe functions in the namespace
		nspace.publish = function( data ) { _publish( namespacedEvent, ( $.isArray(data) ? data : [data]) ); };
		nspace.subscribe = function( callback, scope ) { return _subscribe( namespacedEvent, callback, scope ); };
		nspace.unsubscribe = function( handleFromSubscribe ) { return _unsubscribe( handleFromSubscribe ); };

		return nspace; //let's allow chaining
	};

}(tash));