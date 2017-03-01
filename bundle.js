/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	__webpack_require__(4);
	
	__webpack_require__(5);
	
	riot.mount('#app', 'main');
	
	document.oncontextmenu = function (e) {
	  return false;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* Riot v2.5.0, @license MIT */
	
	;(function(window, undefined) {
	  'use strict';
	var riot = { version: 'v2.5.0', settings: {} },
	  // be aware, internal usage
	  // ATTENTION: prefix the global dynamic variables with `__`
	
	  // counter to give a unique id to all the Tag instances
	  __uid = 0,
	  // tags instances cache
	  __virtualDom = [],
	  // tags implementation cache
	  __tagImpl = {},
	
	  /**
	   * Const
	   */
	  GLOBAL_MIXIN = '__global_mixin',
	
	  // riot specific prefixes
	  RIOT_PREFIX = 'riot-',
	  RIOT_TAG = RIOT_PREFIX + 'tag',
	  RIOT_TAG_IS = 'data-is',
	
	  // for typeof == '' comparisons
	  T_STRING = 'string',
	  T_OBJECT = 'object',
	  T_UNDEF  = 'undefined',
	  T_FUNCTION = 'function',
	  // special native tags that cannot be treated like the others
	  SPECIAL_TAGS_REGEX = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?|opt(?:ion|group))$/,
	  RESERVED_WORDS_BLACKLIST = /^(?:_(?:item|id|parent)|update|root|(?:un)?mount|mixin|is(?:Mounted|Loop)|tags|parent|opts|trigger|o(?:n|ff|ne))$/,
	  // SVG tags list https://www.w3.org/TR/SVG/attindex.html#PresentationAttributes
	  SVG_TAGS_LIST = ['altGlyph', 'animate', 'animateColor', 'circle', 'clipPath', 'defs', 'ellipse', 'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feFlood', 'feGaussianBlur', 'feImage', 'feMerge', 'feMorphology', 'feOffset', 'feSpecularLighting', 'feTile', 'feTurbulence', 'filter', 'font', 'foreignObject', 'g', 'glyph', 'glyphRef', 'image', 'line', 'linearGradient', 'marker', 'mask', 'missing-glyph', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'switch', 'symbol', 'text', 'textPath', 'tref', 'tspan', 'use'],
	
	  // version# for IE 8-11, 0 for others
	  IE_VERSION = (window && window.document || {}).documentMode | 0,
	
	  // detect firefox to fix #1374
	  FIREFOX = window && !!window.InstallTrigger
	/* istanbul ignore next */
	riot.observable = function(el) {
	
	  /**
	   * Extend the original object or create a new empty one
	   * @type { Object }
	   */
	
	  el = el || {}
	
	  /**
	   * Private variables
	   */
	  var callbacks = {},
	    slice = Array.prototype.slice
	
	  /**
	   * Private Methods
	   */
	
	  /**
	   * Helper function needed to get and loop all the events in a string
	   * @param   { String }   e - event string
	   * @param   {Function}   fn - callback
	   */
	  function onEachEvent(e, fn) {
	    var es = e.split(' '), l = es.length, i = 0, name, indx
	    for (; i < l; i++) {
	      name = es[i]
	      indx = name.indexOf('.')
	      if (name) fn( ~indx ? name.substring(0, indx) : name, i, ~indx ? name.slice(indx + 1) : null)
	    }
	  }
	
	  /**
	   * Public Api
	   */
	
	  // extend the el object adding the observable methods
	  Object.defineProperties(el, {
	    /**
	     * Listen to the given space separated list of `events` and
	     * execute the `callback` each time an event is triggered.
	     * @param  { String } events - events ids
	     * @param  { Function } fn - callback function
	     * @returns { Object } el
	     */
	    on: {
	      value: function(events, fn) {
	        if (typeof fn != 'function')  return el
	
	        onEachEvent(events, function(name, pos, ns) {
	          (callbacks[name] = callbacks[name] || []).push(fn)
	          fn.typed = pos > 0
	          fn.ns = ns
	        })
	
	        return el
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    },
	
	    /**
	     * Removes the given space separated list of `events` listeners
	     * @param   { String } events - events ids
	     * @param   { Function } fn - callback function
	     * @returns { Object } el
	     */
	    off: {
	      value: function(events, fn) {
	        if (events == '*' && !fn) callbacks = {}
	        else {
	          onEachEvent(events, function(name, pos, ns) {
	            if (fn || ns) {
	              var arr = callbacks[name]
	              for (var i = 0, cb; cb = arr && arr[i]; ++i) {
	                if (cb == fn || ns && cb.ns == ns) arr.splice(i--, 1)
	              }
	            } else delete callbacks[name]
	          })
	        }
	        return el
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    },
	
	    /**
	     * Listen to the given space separated list of `events` and
	     * execute the `callback` at most once
	     * @param   { String } events - events ids
	     * @param   { Function } fn - callback function
	     * @returns { Object } el
	     */
	    one: {
	      value: function(events, fn) {
	        function on() {
	          el.off(events, on)
	          fn.apply(el, arguments)
	        }
	        return el.on(events, on)
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    },
	
	    /**
	     * Execute all callback functions that listen to
	     * the given space separated list of `events`
	     * @param   { String } events - events ids
	     * @returns { Object } el
	     */
	    trigger: {
	      value: function(events) {
	
	        // getting the arguments
	        var arglen = arguments.length - 1,
	          args = new Array(arglen),
	          fns
	
	        for (var i = 0; i < arglen; i++) {
	          args[i] = arguments[i + 1] // skip first argument
	        }
	
	        onEachEvent(events, function(name, pos, ns) {
	
	          fns = slice.call(callbacks[name] || [], 0)
	
	          for (var i = 0, fn; fn = fns[i]; ++i) {
	            if (fn.busy) continue
	            fn.busy = 1
	            if (!ns || fn.ns == ns) fn.apply(el, fn.typed ? [name].concat(args) : args)
	            if (fns[i] !== fn) { i-- }
	            fn.busy = 0
	          }
	
	          if (callbacks['*'] && name != '*')
	            el.trigger.apply(el, ['*', name].concat(args))
	
	        })
	
	        return el
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    }
	  })
	
	  return el
	
	}
	/* istanbul ignore next */
	;(function(riot) {
	
	/**
	 * Simple client-side router
	 * @module riot-route
	 */
	
	
	var RE_ORIGIN = /^.+?\/\/+[^\/]+/,
	  EVENT_LISTENER = 'EventListener',
	  REMOVE_EVENT_LISTENER = 'remove' + EVENT_LISTENER,
	  ADD_EVENT_LISTENER = 'add' + EVENT_LISTENER,
	  HAS_ATTRIBUTE = 'hasAttribute',
	  REPLACE = 'replace',
	  POPSTATE = 'popstate',
	  HASHCHANGE = 'hashchange',
	  TRIGGER = 'trigger',
	  MAX_EMIT_STACK_LEVEL = 3,
	  win = typeof window != 'undefined' && window,
	  doc = typeof document != 'undefined' && document,
	  hist = win && history,
	  loc = win && (hist.location || win.location), // see html5-history-api
	  prot = Router.prototype, // to minify more
	  clickEvent = doc && doc.ontouchstart ? 'touchstart' : 'click',
	  started = false,
	  central = riot.observable(),
	  routeFound = false,
	  debouncedEmit,
	  base, current, parser, secondParser, emitStack = [], emitStackLevel = 0
	
	/**
	 * Default parser. You can replace it via router.parser method.
	 * @param {string} path - current path (normalized)
	 * @returns {array} array
	 */
	function DEFAULT_PARSER(path) {
	  return path.split(/[/?#]/)
	}
	
	/**
	 * Default parser (second). You can replace it via router.parser method.
	 * @param {string} path - current path (normalized)
	 * @param {string} filter - filter string (normalized)
	 * @returns {array} array
	 */
	function DEFAULT_SECOND_PARSER(path, filter) {
	  var re = new RegExp('^' + filter[REPLACE](/\*/g, '([^/?#]+?)')[REPLACE](/\.\./, '.*') + '$'),
	    args = path.match(re)
	
	  if (args) return args.slice(1)
	}
	
	/**
	 * Simple/cheap debounce implementation
	 * @param   {function} fn - callback
	 * @param   {number} delay - delay in seconds
	 * @returns {function} debounced function
	 */
	function debounce(fn, delay) {
	  var t
	  return function () {
	    clearTimeout(t)
	    t = setTimeout(fn, delay)
	  }
	}
	
	/**
	 * Set the window listeners to trigger the routes
	 * @param {boolean} autoExec - see route.start
	 */
	function start(autoExec) {
	  debouncedEmit = debounce(emit, 1)
	  win[ADD_EVENT_LISTENER](POPSTATE, debouncedEmit)
	  win[ADD_EVENT_LISTENER](HASHCHANGE, debouncedEmit)
	  doc[ADD_EVENT_LISTENER](clickEvent, click)
	  if (autoExec) emit(true)
	}
	
	/**
	 * Router class
	 */
	function Router() {
	  this.$ = []
	  riot.observable(this) // make it observable
	  central.on('stop', this.s.bind(this))
	  central.on('emit', this.e.bind(this))
	}
	
	function normalize(path) {
	  return path[REPLACE](/^\/|\/$/, '')
	}
	
	function isString(str) {
	  return typeof str == 'string'
	}
	
	/**
	 * Get the part after domain name
	 * @param {string} href - fullpath
	 * @returns {string} path from root
	 */
	function getPathFromRoot(href) {
	  return (href || loc.href)[REPLACE](RE_ORIGIN, '')
	}
	
	/**
	 * Get the part after base
	 * @param {string} href - fullpath
	 * @returns {string} path from base
	 */
	function getPathFromBase(href) {
	  return base[0] == '#'
	    ? (href || loc.href || '').split(base)[1] || ''
	    : (loc ? getPathFromRoot(href) : href || '')[REPLACE](base, '')
	}
	
	function emit(force) {
	  // the stack is needed for redirections
	  var isRoot = emitStackLevel == 0
	  if (MAX_EMIT_STACK_LEVEL <= emitStackLevel) return
	
	  emitStackLevel++
	  emitStack.push(function() {
	    var path = getPathFromBase()
	    if (force || path != current) {
	      central[TRIGGER]('emit', path)
	      current = path
	    }
	  })
	  if (isRoot) {
	    while (emitStack.length) {
	      emitStack[0]()
	      emitStack.shift()
	    }
	    emitStackLevel = 0
	  }
	}
	
	function click(e) {
	  if (
	    e.which != 1 // not left click
	    || e.metaKey || e.ctrlKey || e.shiftKey // or meta keys
	    || e.defaultPrevented // or default prevented
	  ) return
	
	  var el = e.target
	  while (el && el.nodeName != 'A') el = el.parentNode
	
	  if (
	    !el || el.nodeName != 'A' // not A tag
	    || el[HAS_ATTRIBUTE]('download') // has download attr
	    || !el[HAS_ATTRIBUTE]('href') // has no href attr
	    || el.target && el.target != '_self' // another window or frame
	    || el.href.indexOf(loc.href.match(RE_ORIGIN)[0]) == -1 // cross origin
	  ) return
	
	  if (el.href != loc.href) {
	    if (
	      el.href.split('#')[0] == loc.href.split('#')[0] // internal jump
	      || base != '#' && getPathFromRoot(el.href).indexOf(base) !== 0 // outside of base
	      || !go(getPathFromBase(el.href), el.title || doc.title) // route not found
	    ) return
	  }
	
	  e.preventDefault()
	}
	
	/**
	 * Go to the path
	 * @param {string} path - destination path
	 * @param {string} title - page title
	 * @param {boolean} shouldReplace - use replaceState or pushState
	 * @returns {boolean} - route not found flag
	 */
	function go(path, title, shouldReplace) {
	  if (hist) { // if a browser
	    path = base + normalize(path)
	    title = title || doc.title
	    // browsers ignores the second parameter `title`
	    shouldReplace
	      ? hist.replaceState(null, title, path)
	      : hist.pushState(null, title, path)
	    // so we need to set it manually
	    doc.title = title
	    routeFound = false
	    emit()
	    return routeFound
	  }
	
	  // Server-side usage: directly execute handlers for the path
	  return central[TRIGGER]('emit', getPathFromBase(path))
	}
	
	/**
	 * Go to path or set action
	 * a single string:                go there
	 * two strings:                    go there with setting a title
	 * two strings and boolean:        replace history with setting a title
	 * a single function:              set an action on the default route
	 * a string/RegExp and a function: set an action on the route
	 * @param {(string|function)} first - path / action / filter
	 * @param {(string|RegExp|function)} second - title / action
	 * @param {boolean} third - replace flag
	 */
	prot.m = function(first, second, third) {
	  if (isString(first) && (!second || isString(second))) go(first, second, third || false)
	  else if (second) this.r(first, second)
	  else this.r('@', first)
	}
	
	/**
	 * Stop routing
	 */
	prot.s = function() {
	  this.off('*')
	  this.$ = []
	}
	
	/**
	 * Emit
	 * @param {string} path - path
	 */
	prot.e = function(path) {
	  this.$.concat('@').some(function(filter) {
	    var args = (filter == '@' ? parser : secondParser)(normalize(path), normalize(filter))
	    if (typeof args != 'undefined') {
	      this[TRIGGER].apply(null, [filter].concat(args))
	      return routeFound = true // exit from loop
	    }
	  }, this)
	}
	
	/**
	 * Register route
	 * @param {string} filter - filter for matching to url
	 * @param {function} action - action to register
	 */
	prot.r = function(filter, action) {
	  if (filter != '@') {
	    filter = '/' + normalize(filter)
	    this.$.push(filter)
	  }
	  this.on(filter, action)
	}
	
	var mainRouter = new Router()
	var route = mainRouter.m.bind(mainRouter)
	
	/**
	 * Create a sub router
	 * @returns {function} the method of a new Router object
	 */
	route.create = function() {
	  var newSubRouter = new Router()
	  // assign sub-router's main method
	  var router = newSubRouter.m.bind(newSubRouter)
	  // stop only this sub-router
	  router.stop = newSubRouter.s.bind(newSubRouter)
	  return router
	}
	
	/**
	 * Set the base of url
	 * @param {(str|RegExp)} arg - a new base or '#' or '#!'
	 */
	route.base = function(arg) {
	  base = arg || '#'
	  current = getPathFromBase() // recalculate current path
	}
	
	/** Exec routing right now **/
	route.exec = function() {
	  emit(true)
	}
	
	/**
	 * Replace the default router to yours
	 * @param {function} fn - your parser function
	 * @param {function} fn2 - your secondParser function
	 */
	route.parser = function(fn, fn2) {
	  if (!fn && !fn2) {
	    // reset parser for testing...
	    parser = DEFAULT_PARSER
	    secondParser = DEFAULT_SECOND_PARSER
	  }
	  if (fn) parser = fn
	  if (fn2) secondParser = fn2
	}
	
	/**
	 * Helper function to get url query as an object
	 * @returns {object} parsed query
	 */
	route.query = function() {
	  var q = {}
	  var href = loc.href || current
	  href[REPLACE](/[?&](.+?)=([^&]*)/g, function(_, k, v) { q[k] = v })
	  return q
	}
	
	/** Stop routing **/
	route.stop = function () {
	  if (started) {
	    if (win) {
	      win[REMOVE_EVENT_LISTENER](POPSTATE, debouncedEmit)
	      win[REMOVE_EVENT_LISTENER](HASHCHANGE, debouncedEmit)
	      doc[REMOVE_EVENT_LISTENER](clickEvent, click)
	    }
	    central[TRIGGER]('stop')
	    started = false
	  }
	}
	
	/**
	 * Start routing
	 * @param {boolean} autoExec - automatically exec after starting if true
	 */
	route.start = function (autoExec) {
	  if (!started) {
	    if (win) {
	      if (document.readyState == 'complete') start(autoExec)
	      // the timeout is needed to solve
	      // a weird safari bug https://github.com/riot/route/issues/33
	      else win[ADD_EVENT_LISTENER]('load', function() {
	        setTimeout(function() { start(autoExec) }, 1)
	      })
	    }
	    started = true
	  }
	}
	
	/** Prepare the router **/
	route.base()
	route.parser()
	
	riot.route = route
	})(riot)
	/* istanbul ignore next */
	
	/**
	 * The riot template engine
	 * @version v2.4.0
	 */
	/**
	 * riot.util.brackets
	 *
	 * - `brackets    ` - Returns a string or regex based on its parameter
	 * - `brackets.set` - Change the current riot brackets
	 *
	 * @module
	 */
	
	var brackets = (function (UNDEF) {
	
	  var
	    REGLOB = 'g',
	
	    R_MLCOMMS = /\/\*[^*]*\*+(?:[^*\/][^*]*\*+)*\//g,
	
	    R_STRINGS = /"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'/g,
	
	    S_QBLOCKS = R_STRINGS.source + '|' +
	      /(?:\breturn\s+|(?:[$\w\)\]]|\+\+|--)\s*(\/)(?![*\/]))/.source + '|' +
	      /\/(?=[^*\/])[^[\/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[\/\\]*)*?(\/)[gim]*/.source,
	
	    FINDBRACES = {
	      '(': RegExp('([()])|'   + S_QBLOCKS, REGLOB),
	      '[': RegExp('([[\\]])|' + S_QBLOCKS, REGLOB),
	      '{': RegExp('([{}])|'   + S_QBLOCKS, REGLOB)
	    },
	
	    DEFAULT = '{ }'
	
	  var _pairs = [
	    '{', '}',
	    '{', '}',
	    /{[^}]*}/,
	    /\\([{}])/g,
	    /\\({)|{/g,
	    RegExp('\\\\(})|([[({])|(})|' + S_QBLOCKS, REGLOB),
	    DEFAULT,
	    /^\s*{\^?\s*([$\w]+)(?:\s*,\s*(\S+))?\s+in\s+(\S.*)\s*}/,
	    /(^|[^\\]){=[\S\s]*?}/
	  ]
	
	  var
	    cachedBrackets = UNDEF,
	    _regex,
	    _cache = [],
	    _settings
	
	  function _loopback (re) { return re }
	
	  function _rewrite (re, bp) {
	    if (!bp) bp = _cache
	    return new RegExp(
	      re.source.replace(/{/g, bp[2]).replace(/}/g, bp[3]), re.global ? REGLOB : ''
	    )
	  }
	
	  function _create (pair) {
	    if (pair === DEFAULT) return _pairs
	
	    var arr = pair.split(' ')
	
	    if (arr.length !== 2 || /[\x00-\x1F<>a-zA-Z0-9'",;\\]/.test(pair)) { // eslint-disable-line
	      throw new Error('Unsupported brackets "' + pair + '"')
	    }
	    arr = arr.concat(pair.replace(/(?=[[\]()*+?.^$|])/g, '\\').split(' '))
	
	    arr[4] = _rewrite(arr[1].length > 1 ? /{[\S\s]*?}/ : _pairs[4], arr)
	    arr[5] = _rewrite(pair.length > 3 ? /\\({|})/g : _pairs[5], arr)
	    arr[6] = _rewrite(_pairs[6], arr)
	    arr[7] = RegExp('\\\\(' + arr[3] + ')|([[({])|(' + arr[3] + ')|' + S_QBLOCKS, REGLOB)
	    arr[8] = pair
	    return arr
	  }
	
	  function _brackets (reOrIdx) {
	    return reOrIdx instanceof RegExp ? _regex(reOrIdx) : _cache[reOrIdx]
	  }
	
	  _brackets.split = function split (str, tmpl, _bp) {
	    // istanbul ignore next: _bp is for the compiler
	    if (!_bp) _bp = _cache
	
	    var
	      parts = [],
	      match,
	      isexpr,
	      start,
	      pos,
	      re = _bp[6]
	
	    isexpr = start = re.lastIndex = 0
	
	    while ((match = re.exec(str))) {
	
	      pos = match.index
	
	      if (isexpr) {
	
	        if (match[2]) {
	          re.lastIndex = skipBraces(str, match[2], re.lastIndex)
	          continue
	        }
	        if (!match[3]) {
	          continue
	        }
	      }
	
	      if (!match[1]) {
	        unescapeStr(str.slice(start, pos))
	        start = re.lastIndex
	        re = _bp[6 + (isexpr ^= 1)]
	        re.lastIndex = start
	      }
	    }
	
	    if (str && start < str.length) {
	      unescapeStr(str.slice(start))
	    }
	
	    return parts
	
	    function unescapeStr (s) {
	      if (tmpl || isexpr) {
	        parts.push(s && s.replace(_bp[5], '$1'))
	      } else {
	        parts.push(s)
	      }
	    }
	
	    function skipBraces (s, ch, ix) {
	      var
	        match,
	        recch = FINDBRACES[ch]
	
	      recch.lastIndex = ix
	      ix = 1
	      while ((match = recch.exec(s))) {
	        if (match[1] &&
	          !(match[1] === ch ? ++ix : --ix)) break
	      }
	      return ix ? s.length : recch.lastIndex
	    }
	  }
	
	  _brackets.hasExpr = function hasExpr (str) {
	    return _cache[4].test(str)
	  }
	
	  _brackets.loopKeys = function loopKeys (expr) {
	    var m = expr.match(_cache[9])
	
	    return m
	      ? { key: m[1], pos: m[2], val: _cache[0] + m[3].trim() + _cache[1] }
	      : { val: expr.trim() }
	  }
	
	  _brackets.array = function array (pair) {
	    return pair ? _create(pair) : _cache
	  }
	
	  function _reset (pair) {
	    if ((pair || (pair = DEFAULT)) !== _cache[8]) {
	      _cache = _create(pair)
	      _regex = pair === DEFAULT ? _loopback : _rewrite
	      _cache[9] = _regex(_pairs[9])
	    }
	    cachedBrackets = pair
	  }
	
	  function _setSettings (o) {
	    var b
	
	    o = o || {}
	    b = o.brackets
	    Object.defineProperty(o, 'brackets', {
	      set: _reset,
	      get: function () { return cachedBrackets },
	      enumerable: true
	    })
	    _settings = o
	    _reset(b)
	  }
	
	  Object.defineProperty(_brackets, 'settings', {
	    set: _setSettings,
	    get: function () { return _settings }
	  })
	
	  /* istanbul ignore next: in the browser riot is always in the scope */
	  _brackets.settings = typeof riot !== 'undefined' && riot.settings || {}
	  _brackets.set = _reset
	
	  _brackets.R_STRINGS = R_STRINGS
	  _brackets.R_MLCOMMS = R_MLCOMMS
	  _brackets.S_QBLOCKS = S_QBLOCKS
	
	  return _brackets
	
	})()
	
	/**
	 * @module tmpl
	 *
	 * tmpl          - Root function, returns the template value, render with data
	 * tmpl.hasExpr  - Test the existence of a expression inside a string
	 * tmpl.loopKeys - Get the keys for an 'each' loop (used by `_each`)
	 */
	
	var tmpl = (function () {
	
	  var _cache = {}
	
	  function _tmpl (str, data) {
	    if (!str) return str
	
	    return (_cache[str] || (_cache[str] = _create(str))).call(data, _logErr)
	  }
	
	  _tmpl.haveRaw = brackets.hasRaw
	
	  _tmpl.hasExpr = brackets.hasExpr
	
	  _tmpl.loopKeys = brackets.loopKeys
	
	  _tmpl.errorHandler = null
	
	  function _logErr (err, ctx) {
	
	    if (_tmpl.errorHandler) {
	
	      err.riotData = {
	        tagName: ctx && ctx.root && ctx.root.tagName,
	        _riot_id: ctx && ctx._riot_id  //eslint-disable-line camelcase
	      }
	      _tmpl.errorHandler(err)
	    }
	  }
	
	  function _create (str) {
	    var expr = _getTmpl(str)
	
	    if (expr.slice(0, 11) !== 'try{return ') expr = 'return ' + expr
	
	/* eslint-disable */
	
	    return new Function('E', expr + ';')
	/* eslint-enable */
	  }
	
	  var
	    CH_IDEXPR = '\u2057',
	    RE_CSNAME = /^(?:(-?[_A-Za-z\xA0-\xFF][-\w\xA0-\xFF]*)|\u2057(\d+)~):/,
	    RE_QBLOCK = RegExp(brackets.S_QBLOCKS, 'g'),
	    RE_DQUOTE = /\u2057/g,
	    RE_QBMARK = /\u2057(\d+)~/g
	
	  function _getTmpl (str) {
	    var
	      qstr = [],
	      expr,
	      parts = brackets.split(str.replace(RE_DQUOTE, '"'), 1)
	
	    if (parts.length > 2 || parts[0]) {
	      var i, j, list = []
	
	      for (i = j = 0; i < parts.length; ++i) {
	
	        expr = parts[i]
	
	        if (expr && (expr = i & 1
	
	            ? _parseExpr(expr, 1, qstr)
	
	            : '"' + expr
	                .replace(/\\/g, '\\\\')
	                .replace(/\r\n?|\n/g, '\\n')
	                .replace(/"/g, '\\"') +
	              '"'
	
	          )) list[j++] = expr
	
	      }
	
	      expr = j < 2 ? list[0]
	           : '[' + list.join(',') + '].join("")'
	
	    } else {
	
	      expr = _parseExpr(parts[1], 0, qstr)
	    }
	
	    if (qstr[0]) {
	      expr = expr.replace(RE_QBMARK, function (_, pos) {
	        return qstr[pos]
	          .replace(/\r/g, '\\r')
	          .replace(/\n/g, '\\n')
	      })
	    }
	    return expr
	  }
	
	  var
	    RE_BREND = {
	      '(': /[()]/g,
	      '[': /[[\]]/g,
	      '{': /[{}]/g
	    }
	
	  function _parseExpr (expr, asText, qstr) {
	
	    expr = expr
	          .replace(RE_QBLOCK, function (s, div) {
	            return s.length > 2 && !div ? CH_IDEXPR + (qstr.push(s) - 1) + '~' : s
	          })
	          .replace(/\s+/g, ' ').trim()
	          .replace(/\ ?([[\({},?\.:])\ ?/g, '$1')
	
	    if (expr) {
	      var
	        list = [],
	        cnt = 0,
	        match
	
	      while (expr &&
	            (match = expr.match(RE_CSNAME)) &&
	            !match.index
	        ) {
	        var
	          key,
	          jsb,
	          re = /,|([[{(])|$/g
	
	        expr = RegExp.rightContext
	        key  = match[2] ? qstr[match[2]].slice(1, -1).trim().replace(/\s+/g, ' ') : match[1]
	
	        while (jsb = (match = re.exec(expr))[1]) skipBraces(jsb, re)
	
	        jsb  = expr.slice(0, match.index)
	        expr = RegExp.rightContext
	
	        list[cnt++] = _wrapExpr(jsb, 1, key)
	      }
	
	      expr = !cnt ? _wrapExpr(expr, asText)
	           : cnt > 1 ? '[' + list.join(',') + '].join(" ").trim()' : list[0]
	    }
	    return expr
	
	    function skipBraces (ch, re) {
	      var
	        mm,
	        lv = 1,
	        ir = RE_BREND[ch]
	
	      ir.lastIndex = re.lastIndex
	      while (mm = ir.exec(expr)) {
	        if (mm[0] === ch) ++lv
	        else if (!--lv) break
	      }
	      re.lastIndex = lv ? expr.length : ir.lastIndex
	    }
	  }
	
	  // istanbul ignore next: not both
	  var // eslint-disable-next-line max-len
	    JS_CONTEXT = '"in this?this:' + (typeof window !== 'object' ? 'global' : 'window') + ').',
	    JS_VARNAME = /[,{][$\w]+:|(^ *|[^$\w\.])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g,
	    JS_NOPROPS = /^(?=(\.[$\w]+))\1(?:[^.[(]|$)/
	
	  function _wrapExpr (expr, asText, key) {
	    var tb
	
	    expr = expr.replace(JS_VARNAME, function (match, p, mvar, pos, s) {
	      if (mvar) {
	        pos = tb ? 0 : pos + match.length
	
	        if (mvar !== 'this' && mvar !== 'global' && mvar !== 'window') {
	          match = p + '("' + mvar + JS_CONTEXT + mvar
	          if (pos) tb = (s = s[pos]) === '.' || s === '(' || s === '['
	        } else if (pos) {
	          tb = !JS_NOPROPS.test(s.slice(pos))
	        }
	      }
	      return match
	    })
	
	    if (tb) {
	      expr = 'try{return ' + expr + '}catch(e){E(e,this)}'
	    }
	
	    if (key) {
	
	      expr = (tb
	          ? 'function(){' + expr + '}.call(this)' : '(' + expr + ')'
	        ) + '?"' + key + '":""'
	
	    } else if (asText) {
	
	      expr = 'function(v){' + (tb
	          ? expr.replace('return ', 'v=') : 'v=(' + expr + ')'
	        ) + ';return v||v===0?v:""}.call(this)'
	    }
	
	    return expr
	  }
	
	  // istanbul ignore next: compatibility fix for beta versions
	  _tmpl.parse = function (s) { return s }
	
	  _tmpl.version = brackets.version = 'v2.4.0'
	
	  return _tmpl
	
	})()
	
	/*
	  lib/browser/tag/mkdom.js
	
	  Includes hacks needed for the Internet Explorer version 9 and below
	  See: http://kangax.github.io/compat-table/es5/#ie8
	       http://codeplanet.io/dropping-ie8/
	*/
	var mkdom = (function _mkdom() {
	  var
	    reHasYield  = /<yield\b/i,
	    reYieldAll  = /<yield\s*(?:\/>|>([\S\s]*?)<\/yield\s*>|>)/ig,
	    reYieldSrc  = /<yield\s+to=['"]([^'">]*)['"]\s*>([\S\s]*?)<\/yield\s*>/ig,
	    reYieldDest = /<yield\s+from=['"]?([-\w]+)['"]?\s*(?:\/>|>([\S\s]*?)<\/yield\s*>)/ig
	  var
	    rootEls = { tr: 'tbody', th: 'tr', td: 'tr', col: 'colgroup' },
	    tblTags = IE_VERSION && IE_VERSION < 10
	      ? SPECIAL_TAGS_REGEX : /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?)$/
	
	  /**
	   * Creates a DOM element to wrap the given content. Normally an `DIV`, but can be
	   * also a `TABLE`, `SELECT`, `TBODY`, `TR`, or `COLGROUP` element.
	   *
	   * @param   {string} templ  - The template coming from the custom tag definition
	   * @param   {string} [html] - HTML content that comes from the DOM element where you
	   *           will mount the tag, mostly the original tag in the page
	   * @returns {HTMLElement} DOM element with _templ_ merged through `YIELD` with the _html_.
	   */
	  function _mkdom(templ, html) {
	    var
	      match   = templ && templ.match(/^\s*<([-\w]+)/),
	      tagName = match && match[1].toLowerCase(),
	      el = mkEl('div', isSVGTag(tagName))
	
	    // replace all the yield tags with the tag inner html
	    templ = replaceYield(templ, html)
	
	    /* istanbul ignore next */
	    if (tblTags.test(tagName))
	      el = specialTags(el, templ, tagName)
	    else
	      setInnerHTML(el, templ)
	
	    el.stub = true
	
	    return el
	  }
	
	  /*
	    Creates the root element for table or select child elements:
	    tr/th/td/thead/tfoot/tbody/caption/col/colgroup/option/optgroup
	  */
	  function specialTags(el, templ, tagName) {
	    var
	      select = tagName[0] === 'o',
	      parent = select ? 'select>' : 'table>'
	
	    // trim() is important here, this ensures we don't have artifacts,
	    // so we can check if we have only one element inside the parent
	    el.innerHTML = '<' + parent + templ.trim() + '</' + parent
	    parent = el.firstChild
	
	    // returns the immediate parent if tr/th/td/col is the only element, if not
	    // returns the whole tree, as this can include additional elements
	    if (select) {
	      parent.selectedIndex = -1  // for IE9, compatible w/current riot behavior
	    } else {
	      // avoids insertion of cointainer inside container (ex: tbody inside tbody)
	      var tname = rootEls[tagName]
	      if (tname && parent.childElementCount === 1) parent = $(tname, parent)
	    }
	    return parent
	  }
	
	  /*
	    Replace the yield tag from any tag template with the innerHTML of the
	    original tag in the page
	  */
	  function replaceYield(templ, html) {
	    // do nothing if no yield
	    if (!reHasYield.test(templ)) return templ
	
	    // be careful with #1343 - string on the source having `$1`
	    var src = {}
	
	    html = html && html.replace(reYieldSrc, function (_, ref, text) {
	      src[ref] = src[ref] || text   // preserve first definition
	      return ''
	    }).trim()
	
	    return templ
	      .replace(reYieldDest, function (_, ref, def) {  // yield with from - to attrs
	        return src[ref] || def || ''
	      })
	      .replace(reYieldAll, function (_, def) {        // yield without any "from"
	        return html || def || ''
	      })
	  }
	
	  return _mkdom
	
	})()
	
	/**
	 * Convert the item looped into an object used to extend the child tag properties
	 * @param   { Object } expr - object containing the keys used to extend the children tags
	 * @param   { * } key - value to assign to the new object returned
	 * @param   { * } val - value containing the position of the item in the array
	 * @returns { Object } - new object containing the values of the original item
	 *
	 * The variables 'key' and 'val' are arbitrary.
	 * They depend on the collection type looped (Array, Object)
	 * and on the expression used on the each tag
	 *
	 */
	function mkitem(expr, key, val) {
	  var item = {}
	  item[expr.key] = key
	  if (expr.pos) item[expr.pos] = val
	  return item
	}
	
	/**
	 * Unmount the redundant tags
	 * @param   { Array } items - array containing the current items to loop
	 * @param   { Array } tags - array containing all the children tags
	 */
	function unmountRedundant(items, tags) {
	
	  var i = tags.length,
	    j = items.length,
	    t
	
	  while (i > j) {
	    t = tags[--i]
	    tags.splice(i, 1)
	    t.unmount()
	  }
	}
	
	/**
	 * Move the nested custom tags in non custom loop tags
	 * @param   { Object } child - non custom loop tag
	 * @param   { Number } i - current position of the loop tag
	 */
	function moveNestedTags(child, i) {
	  Object.keys(child.tags).forEach(function(tagName) {
	    var tag = child.tags[tagName]
	    if (isArray(tag))
	      each(tag, function (t) {
	        moveChildTag(t, tagName, i)
	      })
	    else
	      moveChildTag(tag, tagName, i)
	  })
	}
	
	/**
	 * Adds the elements for a virtual tag
	 * @param { Tag } tag - the tag whose root's children will be inserted or appended
	 * @param { Node } src - the node that will do the inserting or appending
	 * @param { Tag } target - only if inserting, insert before this tag's first child
	 */
	function addVirtual(tag, src, target) {
	  var el = tag._root, sib
	  tag._virts = []
	  while (el) {
	    sib = el.nextSibling
	    if (target)
	      src.insertBefore(el, target._root)
	    else
	      src.appendChild(el)
	
	    tag._virts.push(el) // hold for unmounting
	    el = sib
	  }
	}
	
	/**
	 * Move virtual tag and all child nodes
	 * @param { Tag } tag - first child reference used to start move
	 * @param { Node } src  - the node that will do the inserting
	 * @param { Tag } target - insert before this tag's first child
	 * @param { Number } len - how many child nodes to move
	 */
	function moveVirtual(tag, src, target, len) {
	  var el = tag._root, sib, i = 0
	  for (; i < len; i++) {
	    sib = el.nextSibling
	    src.insertBefore(el, target._root)
	    el = sib
	  }
	}
	
	
	/**
	 * Manage tags having the 'each'
	 * @param   { Object } dom - DOM node we need to loop
	 * @param   { Tag } parent - parent tag instance where the dom node is contained
	 * @param   { String } expr - string contained in the 'each' attribute
	 */
	function _each(dom, parent, expr) {
	
	  // remove the each property from the original tag
	  remAttr(dom, 'each')
	
	  var mustReorder = typeof getAttr(dom, 'no-reorder') !== T_STRING || remAttr(dom, 'no-reorder'),
	    tagName = getTagName(dom),
	    impl = __tagImpl[tagName] || { tmpl: getOuterHTML(dom) },
	    useRoot = SPECIAL_TAGS_REGEX.test(tagName),
	    root = dom.parentNode,
	    ref = document.createTextNode(''),
	    child = getTag(dom),
	    isOption = tagName.toLowerCase() === 'option', // the option tags must be treated differently
	    tags = [],
	    oldItems = [],
	    hasKeys,
	    isVirtual = dom.tagName == 'VIRTUAL'
	
	  // parse the each expression
	  expr = tmpl.loopKeys(expr)
	
	  // insert a marked where the loop tags will be injected
	  root.insertBefore(ref, dom)
	
	  // clean template code
	  parent.one('before-mount', function () {
	
	    // remove the original DOM node
	    dom.parentNode.removeChild(dom)
	    if (root.stub) root = parent.root
	
	  }).on('update', function () {
	    // get the new items collection
	    var items = tmpl(expr.val, parent),
	      // create a fragment to hold the new DOM nodes to inject in the parent tag
	      frag = document.createDocumentFragment()
	
	    // object loop. any changes cause full redraw
	    if (!isArray(items)) {
	      hasKeys = items || false
	      items = hasKeys ?
	        Object.keys(items).map(function (key) {
	          return mkitem(expr, key, items[key])
	        }) : []
	    }
	
	    // loop all the new items
	    var i = 0,
	      itemsLength = items.length
	
	    for (; i < itemsLength; i++) {
	      // reorder only if the items are objects
	      var
	        item = items[i],
	        _mustReorder = mustReorder && typeof item == T_OBJECT && !hasKeys,
	        oldPos = oldItems.indexOf(item),
	        pos = ~oldPos && _mustReorder ? oldPos : i,
	        // does a tag exist in this position?
	        tag = tags[pos]
	
	      item = !hasKeys && expr.key ? mkitem(expr, item, i) : item
	
	      // new tag
	      if (
	        !_mustReorder && !tag // with no-reorder we just update the old tags
	        ||
	        _mustReorder && !~oldPos || !tag // by default we always try to reorder the DOM elements
	      ) {
	
	        tag = new Tag(impl, {
	          parent: parent,
	          isLoop: true,
	          hasImpl: !!__tagImpl[tagName],
	          root: useRoot ? root : dom.cloneNode(),
	          item: item
	        }, dom.innerHTML)
	
	        tag.mount()
	
	        if (isVirtual) tag._root = tag.root.firstChild // save reference for further moves or inserts
	        // this tag must be appended
	        if (i == tags.length || !tags[i]) { // fix 1581
	          if (isVirtual)
	            addVirtual(tag, frag)
	          else frag.appendChild(tag.root)
	        }
	        // this tag must be insert
	        else {
	          if (isVirtual)
	            addVirtual(tag, root, tags[i])
	          else root.insertBefore(tag.root, tags[i].root) // #1374 some browsers reset selected here
	          oldItems.splice(i, 0, item)
	        }
	
	        tags.splice(i, 0, tag)
	        pos = i // handled here so no move
	      } else tag.update(item, true)
	
	      // reorder the tag if it's not located in its previous position
	      if (
	        pos !== i && _mustReorder &&
	        tags[i] // fix 1581 unable to reproduce it in a test!
	      ) {
	        // update the DOM
	        if (isVirtual)
	          moveVirtual(tag, root, tags[i], dom.childNodes.length)
	        else root.insertBefore(tag.root, tags[i].root)
	        // update the position attribute if it exists
	        if (expr.pos)
	          tag[expr.pos] = i
	        // move the old tag instance
	        tags.splice(i, 0, tags.splice(pos, 1)[0])
	        // move the old item
	        oldItems.splice(i, 0, oldItems.splice(pos, 1)[0])
	        // if the loop tags are not custom
	        // we need to move all their custom tags into the right position
	        if (!child && tag.tags) moveNestedTags(tag, i)
	      }
	
	      // cache the original item to use it in the events bound to this node
	      // and its children
	      tag._item = item
	      // cache the real parent tag internally
	      defineProperty(tag, '_parent', parent)
	    }
	
	    // remove the redundant tags
	    unmountRedundant(items, tags)
	
	    // insert the new nodes
	    root.insertBefore(frag, ref)
	    if (isOption) {
	
	      // #1374 FireFox bug in <option selected={expression}>
	      if (FIREFOX && !root.multiple) {
	        for (var n = 0; n < root.length; n++) {
	          if (root[n].__riot1374) {
	            root.selectedIndex = n  // clear other options
	            delete root[n].__riot1374
	            break
	          }
	        }
	      }
	    }
	
	    // set the 'tags' property of the parent tag
	    // if child is 'undefined' it means that we don't need to set this property
	    // for example:
	    // we don't need store the `myTag.tags['div']` property if we are looping a div tag
	    // but we need to track the `myTag.tags['child']` property looping a custom child node named `child`
	    if (child) parent.tags[tagName] = tags
	
	    // clone the items array
	    oldItems = items.slice()
	
	  })
	
	}
	/**
	 * Object that will be used to inject and manage the css of every tag instance
	 */
	var styleManager = (function(_riot) {
	
	  if (!window) return { // skip injection on the server
	    add: function () {},
	    inject: function () {}
	  }
	
	  var styleNode = (function () {
	    // create a new style element with the correct type
	    var newNode = mkEl('style')
	    setAttr(newNode, 'type', 'text/css')
	
	    // replace any user node or insert the new one into the head
	    var userNode = $('style[type=riot]')
	    if (userNode) {
	      if (userNode.id) newNode.id = userNode.id
	      userNode.parentNode.replaceChild(newNode, userNode)
	    }
	    else document.getElementsByTagName('head')[0].appendChild(newNode)
	
	    return newNode
	  })()
	
	  // Create cache and shortcut to the correct property
	  var cssTextProp = styleNode.styleSheet,
	    stylesToInject = ''
	
	  // Expose the style node in a non-modificable property
	  Object.defineProperty(_riot, 'styleNode', {
	    value: styleNode,
	    writable: true
	  })
	
	  /**
	   * Public api
	   */
	  return {
	    /**
	     * Save a tag style to be later injected into DOM
	     * @param   { String } css [description]
	     */
	    add: function(css) {
	      stylesToInject += css
	    },
	    /**
	     * Inject all previously saved tag styles into DOM
	     * innerHTML seems slow: http://jsperf.com/riot-insert-style
	     */
	    inject: function() {
	      if (stylesToInject) {
	        if (cssTextProp) cssTextProp.cssText += stylesToInject
	        else styleNode.innerHTML += stylesToInject
	        stylesToInject = ''
	      }
	    }
	  }
	
	})(riot)
	
	
	function parseNamedElements(root, tag, childTags, forceParsingNamed) {
	
	  walk(root, function(dom) {
	    if (dom.nodeType == 1) {
	      dom.isLoop = dom.isLoop ||
	                  (dom.parentNode && dom.parentNode.isLoop || getAttr(dom, 'each'))
	                    ? 1 : 0
	
	      // custom child tag
	      if (childTags) {
	        var child = getTag(dom)
	
	        if (child && !dom.isLoop)
	          childTags.push(initChildTag(child, {root: dom, parent: tag}, dom.innerHTML, tag))
	      }
	
	      if (!dom.isLoop || forceParsingNamed)
	        setNamed(dom, tag, [])
	    }
	
	  })
	
	}
	
	function parseExpressions(root, tag, expressions) {
	
	  function addExpr(dom, val, extra) {
	    if (tmpl.hasExpr(val)) {
	      expressions.push(extend({ dom: dom, expr: val }, extra))
	    }
	  }
	
	  walk(root, function(dom) {
	    var type = dom.nodeType,
	      attr
	
	    // text node
	    if (type == 3 && dom.parentNode.tagName != 'STYLE') addExpr(dom, dom.nodeValue)
	    if (type != 1) return
	
	    /* element */
	
	    // loop
	    attr = getAttr(dom, 'each')
	
	    if (attr) { _each(dom, tag, attr); return false }
	
	    // attribute expressions
	    each(dom.attributes, function(attr) {
	      var name = attr.name,
	        bool = name.split('__')[1]
	
	      addExpr(dom, attr.value, { attr: bool || name, bool: bool })
	      if (bool) { remAttr(dom, name); return false }
	
	    })
	
	    // skip custom tags
	    if (getTag(dom)) return false
	
	  })
	
	}
	function Tag(impl, conf, innerHTML) {
	
	  var self = riot.observable(this),
	    opts = inherit(conf.opts) || {},
	    parent = conf.parent,
	    isLoop = conf.isLoop,
	    hasImpl = conf.hasImpl,
	    item = cleanUpData(conf.item),
	    expressions = [],
	    childTags = [],
	    root = conf.root,
	    tagName = root.tagName.toLowerCase(),
	    attr = {},
	    propsInSyncWithParent = [],
	    dom
	
	  // only call unmount if we have a valid __tagImpl (has name property)
	  if (impl.name && root._tag) root._tag.unmount(true)
	
	  // not yet mounted
	  this.isMounted = false
	  root.isLoop = isLoop
	
	  // keep a reference to the tag just created
	  // so we will be able to mount this tag multiple times
	  root._tag = this
	
	  // create a unique id to this tag
	  // it could be handy to use it also to improve the virtual dom rendering speed
	  defineProperty(this, '_riot_id', ++__uid) // base 1 allows test !t._riot_id
	
	  extend(this, { parent: parent, root: root, opts: opts}, item)
	  // protect the "tags" property from being overridden
	  defineProperty(this, 'tags', {})
	
	  // grab attributes
	  each(root.attributes, function(el) {
	    var val = el.value
	    // remember attributes with expressions only
	    if (tmpl.hasExpr(val)) attr[el.name] = val
	  })
	
	  dom = mkdom(impl.tmpl, innerHTML)
	
	  // options
	  function updateOpts() {
	    var ctx = hasImpl && isLoop ? self : parent || self
	
	    // update opts from current DOM attributes
	    each(root.attributes, function(el) {
	      var val = el.value
	      opts[toCamel(el.name)] = tmpl.hasExpr(val) ? tmpl(val, ctx) : val
	    })
	    // recover those with expressions
	    each(Object.keys(attr), function(name) {
	      opts[toCamel(name)] = tmpl(attr[name], ctx)
	    })
	  }
	
	  function normalizeData(data) {
	    for (var key in item) {
	      if (typeof self[key] !== T_UNDEF && isWritable(self, key))
	        self[key] = data[key]
	    }
	  }
	
	  function inheritFromParent () {
	    if (!self.parent || !isLoop) return
	    each(Object.keys(self.parent), function(k) {
	      // some properties must be always in sync with the parent tag
	      var mustSync = !RESERVED_WORDS_BLACKLIST.test(k) && contains(propsInSyncWithParent, k)
	      if (typeof self[k] === T_UNDEF || mustSync) {
	        // track the property to keep in sync
	        // so we can keep it updated
	        if (!mustSync) propsInSyncWithParent.push(k)
	        self[k] = self.parent[k]
	      }
	    })
	  }
	
	  /**
	   * Update the tag expressions and options
	   * @param   { * }  data - data we want to use to extend the tag properties
	   * @param   { Boolean } isInherited - is this update coming from a parent tag?
	   * @returns { self }
	   */
	  defineProperty(this, 'update', function(data, isInherited) {
	
	    // make sure the data passed will not override
	    // the component core methods
	    data = cleanUpData(data)
	    // inherit properties from the parent
	    inheritFromParent()
	    // normalize the tag properties in case an item object was initially passed
	    if (data && isObject(item)) {
	      normalizeData(data)
	      item = data
	    }
	    extend(self, data)
	    updateOpts()
	    self.trigger('update', data)
	    update(expressions, self)
	
	    // the updated event will be triggered
	    // once the DOM will be ready and all the re-flows are completed
	    // this is useful if you want to get the "real" root properties
	    // 4 ex: root.offsetWidth ...
	    if (isInherited && self.parent)
	      // closes #1599
	      self.parent.one('updated', function() { self.trigger('updated') })
	    else rAF(function() { self.trigger('updated') })
	
	    return this
	  })
	
	  defineProperty(this, 'mixin', function() {
	    each(arguments, function(mix) {
	      var instance,
	        props = [],
	        obj
	
	      mix = typeof mix === T_STRING ? riot.mixin(mix) : mix
	
	      // check if the mixin is a function
	      if (isFunction(mix)) {
	        // create the new mixin instance
	        instance = new mix()
	      } else instance = mix
	
	      // build multilevel prototype inheritance chain property list
	      do props = props.concat(Object.getOwnPropertyNames(obj || instance))
	      while (obj = Object.getPrototypeOf(obj || instance))
	
	      // loop the keys in the function prototype or the all object keys
	      each(props, function(key) {
	        // bind methods to self
	        if (key != 'init' && !self[key])
	          // apply method only if it does not already exist on the instance
	          self[key] = isFunction(instance[key]) ?
	            instance[key].bind(self) :
	            instance[key]
	      })
	
	      // init method will be called automatically
	      if (instance.init) instance.init.bind(self)()
	    })
	    return this
	  })
	
	  defineProperty(this, 'mount', function() {
	
	    updateOpts()
	
	    // add global mixins
	    var globalMixin = riot.mixin(GLOBAL_MIXIN)
	    if (globalMixin)
	      for (var i in globalMixin)
	        if (globalMixin.hasOwnProperty(i))
	          self.mixin(globalMixin[i])
	
	    // initialiation
	    if (impl.fn) impl.fn.call(self, opts)
	
	    // parse layout after init. fn may calculate args for nested custom tags
	    parseExpressions(dom, self, expressions)
	
	    // mount the child tags
	    toggle(true)
	
	    // update the root adding custom attributes coming from the compiler
	    // it fixes also #1087
	    if (impl.attrs)
	      walkAttributes(impl.attrs, function (k, v) { setAttr(root, k, v) })
	    if (impl.attrs || hasImpl)
	      parseExpressions(self.root, self, expressions)
	
	    if (!self.parent || isLoop) self.update(item)
	
	    // internal use only, fixes #403
	    self.trigger('before-mount')
	
	    if (isLoop && !hasImpl) {
	      // update the root attribute for the looped elements
	      root = dom.firstChild
	    } else {
	      while (dom.firstChild) root.appendChild(dom.firstChild)
	      if (root.stub) root = parent.root
	    }
	
	    defineProperty(self, 'root', root)
	
	    // parse the named dom nodes in the looped child
	    // adding them to the parent as well
	    if (isLoop)
	      parseNamedElements(self.root, self.parent, null, true)
	
	    // if it's not a child tag we can trigger its mount event
	    if (!self.parent || self.parent.isMounted) {
	      self.isMounted = true
	      self.trigger('mount')
	    }
	    // otherwise we need to wait that the parent event gets triggered
	    else self.parent.one('mount', function() {
	      // avoid to trigger the `mount` event for the tags
	      // not visible included in an if statement
	      if (!isInStub(self.root)) {
	        self.parent.isMounted = self.isMounted = true
	        self.trigger('mount')
	      }
	    })
	  })
	
	
	  defineProperty(this, 'unmount', function(keepRootTag) {
	    var el = root,
	      p = el.parentNode,
	      ptag,
	      tagIndex = __virtualDom.indexOf(self)
	
	    self.trigger('before-unmount')
	
	    // remove this tag instance from the global virtualDom variable
	    if (~tagIndex)
	      __virtualDom.splice(tagIndex, 1)
	
	    if (p) {
	
	      if (parent) {
	        ptag = getImmediateCustomParentTag(parent)
	        // remove this tag from the parent tags object
	        // if there are multiple nested tags with same name..
	        // remove this element form the array
	        if (isArray(ptag.tags[tagName]))
	          each(ptag.tags[tagName], function(tag, i) {
	            if (tag._riot_id == self._riot_id)
	              ptag.tags[tagName].splice(i, 1)
	          })
	        else
	          // otherwise just delete the tag instance
	          ptag.tags[tagName] = undefined
	      }
	
	      else
	        while (el.firstChild) el.removeChild(el.firstChild)
	
	      if (!keepRootTag)
	        p.removeChild(el)
	      else {
	        // the riot-tag and the data-is attributes aren't needed anymore, remove them
	        remAttr(p, RIOT_TAG_IS)
	        remAttr(p, RIOT_TAG) // this will be removed in riot 3.0.0
	      }
	
	    }
	
	    if (this._virts) {
	      each(this._virts, function(v) {
	        if (v.parentNode) v.parentNode.removeChild(v)
	      })
	    }
	
	    self.trigger('unmount')
	    toggle()
	    self.off('*')
	    self.isMounted = false
	    delete root._tag
	
	  })
	
	  // proxy function to bind updates
	  // dispatched from a parent tag
	  function onChildUpdate(data) { self.update(data, true) }
	
	  function toggle(isMount) {
	
	    // mount/unmount children
	    each(childTags, function(child) { child[isMount ? 'mount' : 'unmount']() })
	
	    // listen/unlisten parent (events flow one way from parent to children)
	    if (!parent) return
	    var evt = isMount ? 'on' : 'off'
	
	    // the loop tags will be always in sync with the parent automatically
	    if (isLoop)
	      parent[evt]('unmount', self.unmount)
	    else {
	      parent[evt]('update', onChildUpdate)[evt]('unmount', self.unmount)
	    }
	  }
	
	
	  // named elements available for fn
	  parseNamedElements(dom, this, childTags)
	
	}
	/**
	 * Attach an event to a DOM node
	 * @param { String } name - event name
	 * @param { Function } handler - event callback
	 * @param { Object } dom - dom node
	 * @param { Tag } tag - tag instance
	 */
	function setEventHandler(name, handler, dom, tag) {
	
	  dom[name] = function(e) {
	
	    var ptag = tag._parent,
	      item = tag._item,
	      el
	
	    if (!item)
	      while (ptag && !item) {
	        item = ptag._item
	        ptag = ptag._parent
	      }
	
	    // cross browser event fix
	    e = e || window.event
	
	    // override the event properties
	    if (isWritable(e, 'currentTarget')) e.currentTarget = dom
	    if (isWritable(e, 'target')) e.target = e.srcElement
	    if (isWritable(e, 'which')) e.which = e.charCode || e.keyCode
	
	    e.item = item
	
	    // prevent default behaviour (by default)
	    if (handler.call(tag, e) !== true && !/radio|check/.test(dom.type)) {
	      if (e.preventDefault) e.preventDefault()
	      e.returnValue = false
	    }
	
	    if (!e.preventUpdate) {
	      el = item ? getImmediateCustomParentTag(ptag) : tag
	      el.update()
	    }
	
	  }
	
	}
	
	
	/**
	 * Insert a DOM node replacing another one (used by if- attribute)
	 * @param   { Object } root - parent node
	 * @param   { Object } node - node replaced
	 * @param   { Object } before - node added
	 */
	function insertTo(root, node, before) {
	  if (!root) return
	  root.insertBefore(before, node)
	  root.removeChild(node)
	}
	
	/**
	 * Update the expressions in a Tag instance
	 * @param   { Array } expressions - expression that must be re evaluated
	 * @param   { Tag } tag - tag instance
	 */
	function update(expressions, tag) {
	
	  each(expressions, function(expr, i) {
	
	    var dom = expr.dom,
	      attrName = expr.attr,
	      value = tmpl(expr.expr, tag),
	      parent = expr.dom.parentNode
	
	    if (expr.bool) {
	      value = !!value
	    } else if (value == null) {
	      value = ''
	    }
	
	    // #1638: regression of #1612, update the dom only if the value of the
	    // expression was changed
	    if (expr.value === value) {
	      return
	    }
	    expr.value = value
	
	    // textarea and text nodes has no attribute name
	    if (!attrName) {
	      // about #815 w/o replace: the browser converts the value to a string,
	      // the comparison by "==" does too, but not in the server
	      value += ''
	      // test for parent avoids error with invalid assignment to nodeValue
	      if (parent) {
	        if (parent.tagName === 'TEXTAREA') {
	          parent.value = value                    // #1113
	          if (!IE_VERSION) dom.nodeValue = value  // #1625 IE throws here, nodeValue
	        }                                         // will be available on 'updated'
	        else dom.nodeValue = value
	      }
	      return
	    }
	
	    // ~~#1612: look for changes in dom.value when updating the value~~
	    if (attrName === 'value') {
	      dom.value = value
	      return
	    }
	
	    // remove original attribute
	    remAttr(dom, attrName)
	
	    // event handler
	    if (isFunction(value)) {
	      setEventHandler(attrName, value, dom, tag)
	
	    // if- conditional
	    } else if (attrName == 'if') {
	      var stub = expr.stub,
	        add = function() { insertTo(stub.parentNode, stub, dom) },
	        remove = function() { insertTo(dom.parentNode, dom, stub) }
	
	      // add to DOM
	      if (value) {
	        if (stub) {
	          add()
	          dom.inStub = false
	          // avoid to trigger the mount event if the tags is not visible yet
	          // maybe we can optimize this avoiding to mount the tag at all
	          if (!isInStub(dom)) {
	            walk(dom, function(el) {
	              if (el._tag && !el._tag.isMounted)
	                el._tag.isMounted = !!el._tag.trigger('mount')
	            })
	          }
	        }
	      // remove from DOM
	      } else {
	        stub = expr.stub = stub || document.createTextNode('')
	        // if the parentNode is defined we can easily replace the tag
	        if (dom.parentNode)
	          remove()
	        // otherwise we need to wait the updated event
	        else (tag.parent || tag).one('updated', remove)
	
	        dom.inStub = true
	      }
	    // show / hide
	    } else if (attrName === 'show') {
	      dom.style.display = value ? '' : 'none'
	
	    } else if (attrName === 'hide') {
	      dom.style.display = value ? 'none' : ''
	
	    } else if (expr.bool) {
	      dom[attrName] = value
	      if (value) setAttr(dom, attrName, attrName)
	      if (FIREFOX && attrName === 'selected' && dom.tagName === 'OPTION') {
	        dom.__riot1374 = value   // #1374
	      }
	
	    } else if (value === 0 || value && typeof value !== T_OBJECT) {
	      // <img src="{ expr }">
	      if (startsWith(attrName, RIOT_PREFIX) && attrName != RIOT_TAG) {
	        attrName = attrName.slice(RIOT_PREFIX.length)
	      }
	      setAttr(dom, attrName, value)
	    }
	
	  })
	
	}
	/**
	 * Specialized function for looping an array-like collection with `each={}`
	 * @param   { Array } els - collection of items
	 * @param   {Function} fn - callback function
	 * @returns { Array } the array looped
	 */
	function each(els, fn) {
	  var len = els ? els.length : 0
	
	  for (var i = 0, el; i < len; i++) {
	    el = els[i]
	    // return false -> current item was removed by fn during the loop
	    if (el != null && fn(el, i) === false) i--
	  }
	  return els
	}
	
	/**
	 * Detect if the argument passed is a function
	 * @param   { * } v - whatever you want to pass to this function
	 * @returns { Boolean } -
	 */
	function isFunction(v) {
	  return typeof v === T_FUNCTION || false   // avoid IE problems
	}
	
	/**
	 * Get the outer html of any DOM node SVGs included
	 * @param   { Object } el - DOM node to parse
	 * @returns { String } el.outerHTML
	 */
	function getOuterHTML(el) {
	  if (el.outerHTML) return el.outerHTML
	  // some browsers do not support outerHTML on the SVGs tags
	  else {
	    var container = mkEl('div')
	    container.appendChild(el.cloneNode(true))
	    return container.innerHTML
	  }
	}
	
	/**
	 * Set the inner html of any DOM node SVGs included
	 * @param { Object } container - DOM node where we will inject the new html
	 * @param { String } html - html to inject
	 */
	function setInnerHTML(container, html) {
	  if (typeof container.innerHTML != T_UNDEF) container.innerHTML = html
	  // some browsers do not support innerHTML on the SVGs tags
	  else {
	    var doc = new DOMParser().parseFromString(html, 'application/xml')
	    container.appendChild(
	      container.ownerDocument.importNode(doc.documentElement, true)
	    )
	  }
	}
	
	/**
	 * Checks wether a DOM node must be considered part of an svg document
	 * @param   { String }  name - tag name
	 * @returns { Boolean } -
	 */
	function isSVGTag(name) {
	  return ~SVG_TAGS_LIST.indexOf(name)
	}
	
	/**
	 * Detect if the argument passed is an object, exclude null.
	 * NOTE: Use isObject(x) && !isArray(x) to excludes arrays.
	 * @param   { * } v - whatever you want to pass to this function
	 * @returns { Boolean } -
	 */
	function isObject(v) {
	  return v && typeof v === T_OBJECT         // typeof null is 'object'
	}
	
	/**
	 * Remove any DOM attribute from a node
	 * @param   { Object } dom - DOM node we want to update
	 * @param   { String } name - name of the property we want to remove
	 */
	function remAttr(dom, name) {
	  dom.removeAttribute(name)
	}
	
	/**
	 * Convert a string containing dashes to camel case
	 * @param   { String } string - input string
	 * @returns { String } my-string -> myString
	 */
	function toCamel(string) {
	  return string.replace(/-(\w)/g, function(_, c) {
	    return c.toUpperCase()
	  })
	}
	
	/**
	 * Get the value of any DOM attribute on a node
	 * @param   { Object } dom - DOM node we want to parse
	 * @param   { String } name - name of the attribute we want to get
	 * @returns { String | undefined } name of the node attribute whether it exists
	 */
	function getAttr(dom, name) {
	  return dom.getAttribute(name)
	}
	
	/**
	 * Set any DOM attribute
	 * @param { Object } dom - DOM node we want to update
	 * @param { String } name - name of the property we want to set
	 * @param { String } val - value of the property we want to set
	 */
	function setAttr(dom, name, val) {
	  dom.setAttribute(name, val)
	}
	
	/**
	 * Detect the tag implementation by a DOM node
	 * @param   { Object } dom - DOM node we need to parse to get its tag implementation
	 * @returns { Object } it returns an object containing the implementation of a custom tag (template and boot function)
	 */
	function getTag(dom) {
	  return dom.tagName && __tagImpl[getAttr(dom, RIOT_TAG_IS) ||
	    getAttr(dom, RIOT_TAG) || dom.tagName.toLowerCase()]
	}
	/**
	 * Add a child tag to its parent into the `tags` object
	 * @param   { Object } tag - child tag instance
	 * @param   { String } tagName - key where the new tag will be stored
	 * @param   { Object } parent - tag instance where the new child tag will be included
	 */
	function addChildTag(tag, tagName, parent) {
	  var cachedTag = parent.tags[tagName]
	
	  // if there are multiple children tags having the same name
	  if (cachedTag) {
	    // if the parent tags property is not yet an array
	    // create it adding the first cached tag
	    if (!isArray(cachedTag))
	      // don't add the same tag twice
	      if (cachedTag !== tag)
	        parent.tags[tagName] = [cachedTag]
	    // add the new nested tag to the array
	    if (!contains(parent.tags[tagName], tag))
	      parent.tags[tagName].push(tag)
	  } else {
	    parent.tags[tagName] = tag
	  }
	}
	
	/**
	 * Move the position of a custom tag in its parent tag
	 * @param   { Object } tag - child tag instance
	 * @param   { String } tagName - key where the tag was stored
	 * @param   { Number } newPos - index where the new tag will be stored
	 */
	function moveChildTag(tag, tagName, newPos) {
	  var parent = tag.parent,
	    tags
	  // no parent no move
	  if (!parent) return
	
	  tags = parent.tags[tagName]
	
	  if (isArray(tags))
	    tags.splice(newPos, 0, tags.splice(tags.indexOf(tag), 1)[0])
	  else addChildTag(tag, tagName, parent)
	}
	
	/**
	 * Create a new child tag including it correctly into its parent
	 * @param   { Object } child - child tag implementation
	 * @param   { Object } opts - tag options containing the DOM node where the tag will be mounted
	 * @param   { String } innerHTML - inner html of the child node
	 * @param   { Object } parent - instance of the parent tag including the child custom tag
	 * @returns { Object } instance of the new child tag just created
	 */
	function initChildTag(child, opts, innerHTML, parent) {
	  var tag = new Tag(child, opts, innerHTML),
	    tagName = getTagName(opts.root),
	    ptag = getImmediateCustomParentTag(parent)
	  // fix for the parent attribute in the looped elements
	  tag.parent = ptag
	  // store the real parent tag
	  // in some cases this could be different from the custom parent tag
	  // for example in nested loops
	  tag._parent = parent
	
	  // add this tag to the custom parent tag
	  addChildTag(tag, tagName, ptag)
	  // and also to the real parent tag
	  if (ptag !== parent)
	    addChildTag(tag, tagName, parent)
	  // empty the child node once we got its template
	  // to avoid that its children get compiled multiple times
	  opts.root.innerHTML = ''
	
	  return tag
	}
	
	/**
	 * Loop backward all the parents tree to detect the first custom parent tag
	 * @param   { Object } tag - a Tag instance
	 * @returns { Object } the instance of the first custom parent tag found
	 */
	function getImmediateCustomParentTag(tag) {
	  var ptag = tag
	  while (!getTag(ptag.root)) {
	    if (!ptag.parent) break
	    ptag = ptag.parent
	  }
	  return ptag
	}
	
	/**
	 * Helper function to set an immutable property
	 * @param   { Object } el - object where the new property will be set
	 * @param   { String } key - object key where the new property will be stored
	 * @param   { * } value - value of the new property
	* @param   { Object } options - set the propery overriding the default options
	 * @returns { Object } - the initial object
	 */
	function defineProperty(el, key, value, options) {
	  Object.defineProperty(el, key, extend({
	    value: value,
	    enumerable: false,
	    writable: false,
	    configurable: true
	  }, options))
	  return el
	}
	
	/**
	 * Get the tag name of any DOM node
	 * @param   { Object } dom - DOM node we want to parse
	 * @returns { String } name to identify this dom node in riot
	 */
	function getTagName(dom) {
	  var child = getTag(dom),
	    namedTag = getAttr(dom, 'name'),
	    tagName = namedTag && !tmpl.hasExpr(namedTag) ?
	                namedTag :
	              child ? child.name : dom.tagName.toLowerCase()
	
	  return tagName
	}
	
	/**
	 * Extend any object with other properties
	 * @param   { Object } src - source object
	 * @returns { Object } the resulting extended object
	 *
	 * var obj = { foo: 'baz' }
	 * extend(obj, {bar: 'bar', foo: 'bar'})
	 * console.log(obj) => {bar: 'bar', foo: 'bar'}
	 *
	 */
	function extend(src) {
	  var obj, args = arguments
	  for (var i = 1; i < args.length; ++i) {
	    if (obj = args[i]) {
	      for (var key in obj) {
	        // check if this property of the source object could be overridden
	        if (isWritable(src, key))
	          src[key] = obj[key]
	      }
	    }
	  }
	  return src
	}
	
	/**
	 * Check whether an array contains an item
	 * @param   { Array } arr - target array
	 * @param   { * } item - item to test
	 * @returns { Boolean } Does 'arr' contain 'item'?
	 */
	function contains(arr, item) {
	  return ~arr.indexOf(item)
	}
	
	/**
	 * Check whether an object is a kind of array
	 * @param   { * } a - anything
	 * @returns {Boolean} is 'a' an array?
	 */
	function isArray(a) { return Array.isArray(a) || a instanceof Array }
	
	/**
	 * Detect whether a property of an object could be overridden
	 * @param   { Object }  obj - source object
	 * @param   { String }  key - object property
	 * @returns { Boolean } is this property writable?
	 */
	function isWritable(obj, key) {
	  var props = Object.getOwnPropertyDescriptor(obj, key)
	  return typeof obj[key] === T_UNDEF || props && props.writable
	}
	
	
	/**
	 * With this function we avoid that the internal Tag methods get overridden
	 * @param   { Object } data - options we want to use to extend the tag instance
	 * @returns { Object } clean object without containing the riot internal reserved words
	 */
	function cleanUpData(data) {
	  if (!(data instanceof Tag) && !(data && typeof data.trigger == T_FUNCTION))
	    return data
	
	  var o = {}
	  for (var key in data) {
	    if (!RESERVED_WORDS_BLACKLIST.test(key)) o[key] = data[key]
	  }
	  return o
	}
	
	/**
	 * Walk down recursively all the children tags starting dom node
	 * @param   { Object }   dom - starting node where we will start the recursion
	 * @param   { Function } fn - callback to transform the child node just found
	 */
	function walk(dom, fn) {
	  if (dom) {
	    // stop the recursion
	    if (fn(dom) === false) return
	    else {
	      dom = dom.firstChild
	
	      while (dom) {
	        walk(dom, fn)
	        dom = dom.nextSibling
	      }
	    }
	  }
	}
	
	/**
	 * Minimize risk: only zero or one _space_ between attr & value
	 * @param   { String }   html - html string we want to parse
	 * @param   { Function } fn - callback function to apply on any attribute found
	 */
	function walkAttributes(html, fn) {
	  var m,
	    re = /([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g
	
	  while (m = re.exec(html)) {
	    fn(m[1].toLowerCase(), m[2] || m[3] || m[4])
	  }
	}
	
	/**
	 * Check whether a DOM node is in stub mode, useful for the riot 'if' directive
	 * @param   { Object }  dom - DOM node we want to parse
	 * @returns { Boolean } -
	 */
	function isInStub(dom) {
	  while (dom) {
	    if (dom.inStub) return true
	    dom = dom.parentNode
	  }
	  return false
	}
	
	/**
	 * Create a generic DOM node
	 * @param   { String } name - name of the DOM node we want to create
	 * @param   { Boolean } isSvg - should we use a SVG as parent node?
	 * @returns { Object } DOM node just created
	 */
	function mkEl(name, isSvg) {
	  return isSvg ?
	    document.createElementNS('http://www.w3.org/2000/svg', 'svg') :
	    document.createElement(name)
	}
	
	/**
	 * Shorter and fast way to select multiple nodes in the DOM
	 * @param   { String } selector - DOM selector
	 * @param   { Object } ctx - DOM node where the targets of our search will is located
	 * @returns { Object } dom nodes found
	 */
	function $$(selector, ctx) {
	  return (ctx || document).querySelectorAll(selector)
	}
	
	/**
	 * Shorter and fast way to select a single node in the DOM
	 * @param   { String } selector - unique dom selector
	 * @param   { Object } ctx - DOM node where the target of our search will is located
	 * @returns { Object } dom node found
	 */
	function $(selector, ctx) {
	  return (ctx || document).querySelector(selector)
	}
	
	/**
	 * Simple object prototypal inheritance
	 * @param   { Object } parent - parent object
	 * @returns { Object } child instance
	 */
	function inherit(parent) {
	  function Child() {}
	  Child.prototype = parent
	  return new Child()
	}
	
	/**
	 * Get the name property needed to identify a DOM node in riot
	 * @param   { Object } dom - DOM node we need to parse
	 * @returns { String | undefined } give us back a string to identify this dom node
	 */
	function getNamedKey(dom) {
	  return getAttr(dom, 'id') || getAttr(dom, 'name')
	}
	
	/**
	 * Set the named properties of a tag element
	 * @param { Object } dom - DOM node we need to parse
	 * @param { Object } parent - tag instance where the named dom element will be eventually added
	 * @param { Array } keys - list of all the tag instance properties
	 */
	function setNamed(dom, parent, keys) {
	  // get the key value we want to add to the tag instance
	  var key = getNamedKey(dom),
	    isArr,
	    // add the node detected to a tag instance using the named property
	    add = function(value) {
	      // avoid to override the tag properties already set
	      if (contains(keys, key)) return
	      // check whether this value is an array
	      isArr = isArray(value)
	      // if the key was never set
	      if (!value)
	        // set it once on the tag instance
	        parent[key] = dom
	      // if it was an array and not yet set
	      else if (!isArr || isArr && !contains(value, dom)) {
	        // add the dom node into the array
	        if (isArr)
	          value.push(dom)
	        else
	          parent[key] = [value, dom]
	      }
	    }
	
	  // skip the elements with no named properties
	  if (!key) return
	
	  // check whether this key has been already evaluated
	  if (tmpl.hasExpr(key))
	    // wait the first updated event only once
	    parent.one('mount', function() {
	      key = getNamedKey(dom)
	      add(parent[key])
	    })
	  else
	    add(parent[key])
	
	}
	
	/**
	 * Faster String startsWith alternative
	 * @param   { String } src - source string
	 * @param   { String } str - test string
	 * @returns { Boolean } -
	 */
	function startsWith(src, str) {
	  return src.slice(0, str.length) === str
	}
	
	/**
	 * requestAnimationFrame function
	 * Adapted from https://gist.github.com/paulirish/1579671, license MIT
	 */
	var rAF = (function (w) {
	  var raf = w.requestAnimationFrame    ||
	            w.mozRequestAnimationFrame || w.webkitRequestAnimationFrame
	
	  if (!raf || /iP(ad|hone|od).*OS 6/.test(w.navigator.userAgent)) {  // buggy iOS6
	    var lastTime = 0
	
	    raf = function (cb) {
	      var nowtime = Date.now(), timeout = Math.max(16 - (nowtime - lastTime), 0)
	      setTimeout(function () { cb(lastTime = nowtime + timeout) }, timeout)
	    }
	  }
	  return raf
	
	})(window || {})
	
	/**
	 * Mount a tag creating new Tag instance
	 * @param   { Object } root - dom node where the tag will be mounted
	 * @param   { String } tagName - name of the riot tag we want to mount
	 * @param   { Object } opts - options to pass to the Tag instance
	 * @returns { Tag } a new Tag instance
	 */
	function mountTo(root, tagName, opts) {
	  var tag = __tagImpl[tagName],
	    // cache the inner HTML to fix #855
	    innerHTML = root._innerHTML = root._innerHTML || root.innerHTML
	
	  // clear the inner html
	  root.innerHTML = ''
	
	  if (tag && root) tag = new Tag(tag, { root: root, opts: opts }, innerHTML)
	
	  if (tag && tag.mount) {
	    tag.mount()
	    // add this tag to the virtualDom variable
	    if (!contains(__virtualDom, tag)) __virtualDom.push(tag)
	  }
	
	  return tag
	}
	/**
	 * Riot public api
	 */
	
	// share methods for other riot parts, e.g. compiler
	riot.util = { brackets: brackets, tmpl: tmpl }
	
	/**
	 * Create a mixin that could be globally shared across all the tags
	 */
	riot.mixin = (function() {
	  var mixins = {},
	    globals = mixins[GLOBAL_MIXIN] = {},
	    _id = 0
	
	  /**
	   * Create/Return a mixin by its name
	   * @param   { String }  name - mixin name (global mixin if object)
	   * @param   { Object }  mixin - mixin logic
	   * @param   { Boolean } g - is global?
	   * @returns { Object }  the mixin logic
	   */
	  return function(name, mixin, g) {
	    // Unnamed global
	    if (isObject(name)) {
	      riot.mixin('__unnamed_'+_id++, name, true)
	      return
	    }
	
	    var store = g ? globals : mixins
	
	    // Getter
	    if (!mixin) {
	      if (typeof store[name] === T_UNDEF) {
	        throw new Error('Unregistered mixin: ' + name)
	      }
	      return store[name]
	    }
	    // Setter
	    if (isFunction(mixin)) {
	      extend(mixin.prototype, store[name] || {})
	      store[name] = mixin
	    }
	    else {
	      store[name] = extend(store[name] || {}, mixin)
	    }
	  }
	
	})()
	
	/**
	 * Create a new riot tag implementation
	 * @param   { String }   name - name/id of the new riot tag
	 * @param   { String }   html - tag template
	 * @param   { String }   css - custom tag css
	 * @param   { String }   attrs - root tag attributes
	 * @param   { Function } fn - user function
	 * @returns { String } name/id of the tag just created
	 */
	riot.tag = function(name, html, css, attrs, fn) {
	  if (isFunction(attrs)) {
	    fn = attrs
	    if (/^[\w\-]+\s?=/.test(css)) {
	      attrs = css
	      css = ''
	    } else attrs = ''
	  }
	  if (css) {
	    if (isFunction(css)) fn = css
	    else styleManager.add(css)
	  }
	  name = name.toLowerCase()
	  __tagImpl[name] = { name: name, tmpl: html, attrs: attrs, fn: fn }
	  return name
	}
	
	/**
	 * Create a new riot tag implementation (for use by the compiler)
	 * @param   { String }   name - name/id of the new riot tag
	 * @param   { String }   html - tag template
	 * @param   { String }   css - custom tag css
	 * @param   { String }   attrs - root tag attributes
	 * @param   { Function } fn - user function
	 * @returns { String } name/id of the tag just created
	 */
	riot.tag2 = function(name, html, css, attrs, fn) {
	  if (css) styleManager.add(css)
	  //if (bpair) riot.settings.brackets = bpair
	  __tagImpl[name] = { name: name, tmpl: html, attrs: attrs, fn: fn }
	  return name
	}
	
	/**
	 * Mount a tag using a specific tag implementation
	 * @param   { String } selector - tag DOM selector
	 * @param   { String } tagName - tag implementation name
	 * @param   { Object } opts - tag logic
	 * @returns { Array } new tags instances
	 */
	riot.mount = function(selector, tagName, opts) {
	
	  var els,
	    allTags,
	    tags = []
	
	  // helper functions
	
	  function addRiotTags(arr) {
	    var list = ''
	    each(arr, function (e) {
	      if (!/[^-\w]/.test(e)) {
	        e = e.trim().toLowerCase()
	        list += ',[' + RIOT_TAG_IS + '="' + e + '"],[' + RIOT_TAG + '="' + e + '"]'
	      }
	    })
	    return list
	  }
	
	  function selectAllTags() {
	    var keys = Object.keys(__tagImpl)
	    return keys + addRiotTags(keys)
	  }
	
	  function pushTags(root) {
	    if (root.tagName) {
	      var riotTag = getAttr(root, RIOT_TAG_IS) || getAttr(root, RIOT_TAG)
	
	      // have tagName? force riot-tag to be the same
	      if (tagName && riotTag !== tagName) {
	        riotTag = tagName
	        setAttr(root, RIOT_TAG_IS, tagName)
	        setAttr(root, RIOT_TAG, tagName) // this will be removed in riot 3.0.0
	      }
	      var tag = mountTo(root, riotTag || root.tagName.toLowerCase(), opts)
	
	      if (tag) tags.push(tag)
	    } else if (root.length) {
	      each(root, pushTags)   // assume nodeList
	    }
	  }
	
	  // ----- mount code -----
	
	  // inject styles into DOM
	  styleManager.inject()
	
	  if (isObject(tagName)) {
	    opts = tagName
	    tagName = 0
	  }
	
	  // crawl the DOM to find the tag
	  if (typeof selector === T_STRING) {
	    if (selector === '*')
	      // select all the tags registered
	      // and also the tags found with the riot-tag attribute set
	      selector = allTags = selectAllTags()
	    else
	      // or just the ones named like the selector
	      selector += addRiotTags(selector.split(/, */))
	
	    // make sure to pass always a selector
	    // to the querySelectorAll function
	    els = selector ? $$(selector) : []
	  }
	  else
	    // probably you have passed already a tag or a NodeList
	    els = selector
	
	  // select all the registered and mount them inside their root elements
	  if (tagName === '*') {
	    // get all custom tags
	    tagName = allTags || selectAllTags()
	    // if the root els it's just a single tag
	    if (els.tagName)
	      els = $$(tagName, els)
	    else {
	      // select all the children for all the different root elements
	      var nodeList = []
	      each(els, function (_el) {
	        nodeList.push($$(tagName, _el))
	      })
	      els = nodeList
	    }
	    // get rid of the tagName
	    tagName = 0
	  }
	
	  pushTags(els)
	
	  return tags
	}
	
	/**
	 * Update all the tags instances created
	 * @returns { Array } all the tags instances
	 */
	riot.update = function() {
	  return each(__virtualDom, function(tag) {
	    tag.update()
	  })
	}
	
	/**
	 * Export the Virtual DOM
	 */
	riot.vdom = __virtualDom
	
	/**
	 * Export the Tag constructor
	 */
	riot.Tag = Tag
	  // support CommonJS, AMD & browser
	  /* istanbul ignore next */
	  if (typeof exports === T_OBJECT)
	    module.exports = riot
	  else if ("function" === T_FUNCTION && typeof __webpack_require__(3) !== T_UNDEF)
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return riot }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	  else
	    window.riot = riot
	
	})(typeof window != 'undefined' ? window : void 0);


/***/ },
/* 3 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var panelStoreClass = function panelStoreClass() {
	
	  this.state = {
	    panels: [{ x: 0, y: 0, w: 100, h: 100 }],
	    active: 0
	  };
	
	  var state = this.state;
	
	  this.mutations = {};
	};
	
	var panelStore = new panelStoreClass();
	
	var panelState = panelStore.state;
	var panelMutat = panelStore.mutations;
	
	exports.panelState = panelState;
	exports.panelMutat = panelMutat;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	__webpack_require__(6);
	
	__webpack_require__(14);
	
	__webpack_require__(46);
	
	riot.tag2('main', '<utilkit></utilkit> <codekit></codekit> <codepanel></codepanel>', '', '', function (opts) {});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	__webpack_require__(12);
	
	riot.tag2('utilkit', '<util each="{utils}"></util>', 'utilkit,[riot-tag="utilkit"],[data-is="utilkit"]{ position: absolute; left: 0; top: 0; width: 8vh; padding: 1vh; height: 100vh; display: flex; flex-direction: column; z-index: 20; }', '', function (opts) {
	  this.utils = _storesToolbarStoreJs.toolbarState.utilkit;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _codeStoreJs = __webpack_require__(8);
	
	var toolbarStoreClass = function toolbarStoreClass() {
	  var _this = this;
	
	  this.state = {
	
	    toolkit: [{ id: 94 }, { id: 1 }, { id: 2 }, { id: 90 }, { id: 91 }, { id: 92 }, { id: 10 }, { id: 40 }, { id: 30 }, { id: 20 }, { id: 21 }, { id: 22 }, { id: 95 }, { id: 13 }, { id: 0 }],
	
	    datakit: [{ id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 70 }, { id: 60 }],
	
	    utilkit: [{ id: 0 }, { id: 1 }],
	
	    varkit: {
	      visible: false
	    },
	    obkit: {
	      visible: false
	    },
	    numkit: {
	      visible: false
	    },
	    textkit: {
	      visible: false
	    },
	    opkit: {
	      visible: false
	    },
	    dotkit: {
	      visible: false,
	      target: ''
	    },
	    propkit: {
	      visible: false
	    },
	    typekit: {
	      visible: false
	    }
	  };
	
	  var state = this.state;
	
	  this.signal = riot.observable();
	  var signal = this.signal;
	
	  this.mutations = {
	
	    inputKitVisible: function inputKitVisible() {
	      var group = _codeStoreJs.codeUtil.cursorToken().group;
	      if (group == 'var' || group == 'array' || group == 'function') this.varkitVisible();else if (group == 'object') this.obkitVisible();else if (group == 'number') this.numkitVisible();else if (group == 'text' || group == 'comment') this.textkitVisible();else if (group == 'operator') this.opkitVisible();else if (group == 'type') this.typekitVisible();
	    },
	
	    openInputKit: function openInputKit() {
	      var group = _codeStoreJs.codeUtil.cursorToken().group;
	      if (group == 'var' || group == 'array' || group == 'function') this.openVarkit();else if (group == 'object') this.openObkit();else if (group == 'number') this.openNumkit();else if (group == 'text' || group == 'comment') this.openTextkit();else if (group == 'operator') this.openOpkit();else if (group == 'type') this.openTypekit();
	    },
	
	    varkitVisible: function varkitVisible() {
	      if (!state.varkit.visible) this.openVarkit();else this.closeVarkit();
	    },
	
	    openVarkit: function openVarkit() {
	      var group = _codeStoreJs.codeUtil.cursorToken().group;
	      if (group == 'var' || group == 'array' || group == 'function' || group == 'type') {
	        state.varkit.visible = true;
	        signal.trigger('varkitVisible');
	      }
	    },
	
	    closeVarkit: function closeVarkit() {
	      state.varkit.visible = false;
	      signal.trigger('varkitVisible');
	    },
	
	    obkitVisible: function obkitVisible() {
	      if (!state.obkit.visible) this.openObkit();else this.closeObkit();
	    },
	
	    openObkit: function openObkit() {
	      var group = _codeStoreJs.codeUtil.cursorToken().group;
	      if (group == 'object') {
	        state.obkit.visible = true;
	        signal.trigger('obkitVisible');
	      }
	    },
	
	    closeObkit: function closeObkit() {
	      state.obkit.visible = false;
	      signal.trigger('obkitVisible');
	    },
	
	    numkitVisible: function numkitVisible() {
	      if (!state.numkit.visible) this.openNumkit();else this.closeNumkit();
	    },
	
	    openNumkit: function openNumkit() {
	      var group = _codeStoreJs.codeUtil.cursorToken().group;
	      if (group == 'number') {
	        state.numkit.visible = true;
	        signal.trigger('numkitVisible');
	      }
	    },
	
	    closeNumkit: function closeNumkit() {
	      state.numkit.visible = false;
	      signal.trigger('numkitVisible');
	    },
	
	    textkitVisible: function textkitVisible() {
	      if (!state.textkit.visible) this.openTextkit();else this.closeTextkit();
	    },
	
	    openTextkit: function openTextkit() {
	      var group = _codeStoreJs.codeUtil.cursorToken().group;
	      if (group == 'text' || group == 'comment') {
	        state.textkit.visible = true;
	        signal.trigger('textkitVisible');
	      }
	    },
	
	    closeTextkit: function closeTextkit() {
	      state.textkit.visible = false;
	      signal.trigger('textkitVisible');
	    },
	
	    opkitVisible: function opkitVisible() {
	      if (!state.opkit.visible) this.openOpkit();else this.closeOpkit();
	    },
	
	    openOpkit: function openOpkit() {
	      var group = _codeStoreJs.codeUtil.cursorToken().group;
	      if (group == 'operator') {
	        state.opkit.visible = true;
	        signal.trigger('opkitVisible');
	      }
	    },
	
	    closeOpkit: function closeOpkit() {
	      state.opkit.visible = false;
	      signal.trigger('opkitVisible');
	    },
	
	    dotColor: function dotColor() {
	      state.dotkit.visible = true;
	      state.dotkit.target = 'dot';
	      signal.trigger('dotkitVisible');
	    },
	
	    propColor: function propColor() {
	      state.dotkit.visible = true;
	      state.dotkit.target = 'prop';
	      signal.trigger('dotkitVisible');
	    },
	
	    indexColor: function indexColor() {
	      state.dotkit.visible = true;
	      state.dotkit.target = 'index';
	      signal.trigger('dotkitVisible');
	    },
	
	    pinColor: function pinColor() {
	      state.dotkit.visible = true;
	      state.dotkit.target = 'pin';
	      signal.trigger('dotkitVisible');
	    },
	
	    setColor: function setColor(color) {
	      switch (state.dotkit.target) {
	        case 'dot':
	          (0, _codeStoreJs.codeDo)({ action: 'dotColor', data: color });break;
	        case 'prop':
	          (0, _codeStoreJs.codeDo)({ action: 'propColor', data: color });break;
	        case 'index':
	          (0, _codeStoreJs.codeDo)({ action: 'indexColor', data: color });break;
	        case 'pin':
	          (0, _codeStoreJs.codeDo)({ action: 'pinColor', data: color });break;
	      }
	      state.dotkit.visible = false;
	      signal.trigger('dotkitVisible');
	    },
	
	    typekitVisible: function typekitVisible() {
	      if (!state.typekit.visible) this.openTypekit();else this.closeTypekit();
	    },
	
	    openTypekit: function openTypekit() {
	      var group = _codeStoreJs.codeUtil.cursorToken().group;
	      if (group == 'type') {
	        state.typekit.visible = true;
	        signal.trigger('typekitVisible');
	      }
	    },
	
	    closeTypekit: function closeTypekit() {
	      state.typekit.visible = false;
	      signal.trigger('typekitVisible');
	    }
	
	  };
	
	  this['do'] = function (action) {
	    if (_this.mutations[action.action]) _this.mutations[action.action](action.data);
	  };
	};
	
	var toolbarStore = new toolbarStoreClass();
	
	var toolbarState = toolbarStore.state;
	var toolbarDo = toolbarStore['do'];
	var toolbarSignal = toolbarStore.signal;
	
	exports.toolbarState = toolbarState;
	exports.toolbarDo = toolbarDo;
	exports.toolbarSignal = toolbarSignal;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _storesCodeClassesJs = __webpack_require__(9);
	
	var _toolbarStoreJs = __webpack_require__(7);
	
	var _sampleDataSampleCodeDataJs = __webpack_require__(10);
	
	var _sampleDataCode01Js = __webpack_require__(11);
	
	var codeStoreClass = function codeStoreClass() {
	  var _this = this;
	
	  this.state = {
	    lines: [],
	    floats: [],
	    scopes: [],
	    vars: {},
	    cursor: { x: 0, y: 0 }
	  };
	
	  var state = this.state;
	  var util = null;
	  this.signal = riot.observable();
	  var signal = this.signal;
	
	  this.setState = function (newState) {
	    _this.state = newState;
	    state = _this.state;
	    exports.codeState = codeState = _this.state;
	  };
	
	  this.mutations = {
	    setState: function setState(lines, floats, vars, types) {
	      state.lines = lines;
	      state.floats = floats;
	      state.vars = vars, state.types = types;
	    },
	
	    setToken: function setToken(data) {
	      state.lines[state.cursor.y].tokens[state.cursor.x] = new _storesCodeClassesJs.tokenClass(data.id, data.name);
	      this.setContextOptions(state.cursor);
	      signal.trigger('forceUpdateCursorToken');
	      signal.trigger('updateOptionkit');
	    },
	
	    setContextOptions: function setContextOptions(loc) {
	      var token = state.lines[loc.y].tokens[loc.x];
	
	      if (token.group == 'block') {
	        var tokenAbove = this.getToken({ x: loc.x, y: loc.y - 1 });
	        if (!tokenAbove) return;
	        var type = 0; // basic
	        switch (tokenAbove.id) {
	          case 22:
	            token.options.type = 1;break;
	          case 21:
	            token.options.type = 2;break;
	          case 30:
	            token.options.type = 3;break;
	        }
	      }
	    },
	
	    getToken: function getToken(loc) {
	      var tokenData = state.lines[loc.y].tokens[loc.x];
	      return tokenData ? tokenData : null;
	    },
	
	    grabToken: function grabToken(loc) {
	      var tokenData = state.lines[loc.y].tokens[loc.x];
	      state.lines[loc.y].tokens[loc.x] = new _storesCodeClassesJs.tokenClass();
	      return tokenData;
	    },
	
	    putToken: function putToken(loc, tokenData) {
	      state.lines[loc.y].tokens[loc.x] = tokenData;
	    },
	
	    moveToken: function moveToken(moveData) {
	      if (state.lines[moveData.to.y].tokens[moveData.to.x].id == 0) {
	        this.putToken(moveData.to, this.grabToken(moveData.from));
	        // updateToken don't work here, suspected related to
	        // e.preventUpdate on the dragEnd handler
	        signal.trigger('forceUpdateToken', moveData.from);
	        signal.trigger('forceUpdateToken', moveData.to);
	      }
	    },
	
	    'delete': function _delete() {
	      var token = util.cursorToken();
	      token.id = 0;
	      token.group = '';
	      token.name = '';
	      token.options = {};
	      signal.trigger('forceUpdateToken', state.cursor);
	      signal.trigger('updateCursor');
	    },
	
	    moveCursor: function moveCursor(loc) {
	      if (loc.x > state.lines[0].tokens.length - 1) return;
	      if (loc.y > state.lines.length - 1) return;
	      if (state.lines[loc.y].tokens.length == 0) return;
	      state.cursor.x = loc.x;
	      state.cursor.y = loc.y;
	      signal.trigger('updateCursor');
	    },
	
	    moveCursorUp: function moveCursorUp() {
	      if (state.cursor.y == 0) return;
	      state.cursor.y--;
	      if (state.lines[state.cursor.y].tokens.length == 0) state.cursor.y--;
	      if (state.cursor.y < 0) state.cursor.y += 2;
	      signal.trigger('updateCursor');
	    },
	
	    moveCursorDown: function moveCursorDown() {
	      if (state.cursor.y == state.lines.length - 1) return;
	      state.cursor.y++;
	      if (state.lines[state.cursor.y].tokens.length == 0) state.cursor.y++;
	      if (state.cursor.y >= state.lines.length) state.cursor.y -= 2;
	      signal.trigger('updateCursor');
	    },
	
	    moveCursorLeft: function moveCursorLeft() {
	      if (state.cursor.x > 0) {
	        state.cursor.x--;
	        signal.trigger('updateCursor');
	      }
	    },
	
	    moveCursorRight: function moveCursorRight() {
	      if (state.cursor.x < state.lines[0].tokens.length - 1) {
	        state.cursor.x++;
	        signal.trigger('updateCursor');
	      }
	    },
	
	    util: function util(data) {
	      if (data.id == 0) {
	        // save
	        var stateString = JSON.stringify(state);
	        download('code.json', stateString);
	      } else if (data.id == 1) {
	        loadCode();
	      }
	    },
	
	    tokenPoints: function tokenPoints(data) {
	      var token = util.cursorToken();
	      if (token.group == 'function' || token.group == 'arrow' || token.group == 'operator' || token.group == 'pin') {
	        token.options.points = data;
	        signal.trigger('updateCursorToken');
	      }
	    },
	
	    tokenColor: function tokenColor(data) {
	      var token = util.cursorToken();
	      if (token.group == 'pin') {
	        token.options.color = data;
	        signal.trigger('updateCursorToken');
	      }
	    },
	
	    functionBubble: function functionBubble() {
	      var token = util.cursorToken();
	      if (token.group == 'function') {
	        token.options.bubble = !token.options.bubble;
	        if (token.options.bubble) {
	          token.options.parLen = 0;
	        }
	        signal.trigger('updateCursorToken');
	      }
	    },
	
	    functionParPoints: function functionParPoints(data) {
	      var token = util.cursorToken();
	      if (token.group == 'function' && !token.options.bubble || token.group == 'operator' || token.group == 'loop' || token.group == 'array') {
	        if (token.options.parPoints === data) token.options.parLen++;else {
	          token.options.parPoints = data;
	          token.options.parLen = 1;
	        }
	        signal.trigger('updateCursorToken');
	      }
	    },
	
	    functionParX: function functionParX() {
	      var token = util.cursorToken();
	      if (token.group == 'function' || token.group == 'operator' || token.group == 'loop' || token.group == 'array') {
	        token.options.parLen = 0;
	        signal.trigger('updateCursorToken');
	      }
	    },
	
	    dotColor: function dotColor(color) {
	      var token = util.cursorToken();
	      if (token.group == 'object' || token.group == 'array') {
	        token.options.dot = color;
	        signal.trigger('updateCursorToken');
	      }
	    },
	
	    typedot: function typedot() {
	      var token = util.cursorToken();
	      if (token.group == 'object' || token.group == 'var' || token.group == 'array') {
	        token.options.typedot = !token.options.typedot;
	        signal.trigger('updateCursorToken');
	      }
	    },
	
	    propColor: function propColor(color) {
	      var token = util.cursorToken();
	      if (token.group == 'object' || token.group == 'var' || token.group == 'array' || token.group == 'function') {
	        token.options.prop = color;
	        signal.trigger('updateCursorToken');
	      }
	    },
	
	    indexColor: function indexColor(color) {
	      var token = util.cursorToken();
	      if (token.group == 'array' || token.id == 4) {
	        token.options.index = color;
	        signal.trigger('updateCursorToken');
	      }
	    },
	
	    pinColor: function pinColor(color) {
	      var token = util.cursorToken();
	      if (token.group == 'pin') {
	        token.options.color = color;
	        signal.trigger('updateCursorToken');
	      }
	    },
	
	    tokenBubble: function tokenBubble() {
	      var token = util.cursorToken();
	      if (token.group == 'var' || token.group == 'object' || token.group == 'array' || token.group == 'pin') {
	        token.options.bubble = !token.options.bubble;
	        signal.trigger('updateCursorToken');
	      }
	    },
	
	    commWidth: function commWidth(data) {
	      var token = util.cursorToken();
	      if (token.group == 'comment') {
	        token.options.width += data;
	        if (token.options.width < 1) token.options.width = 1;
	        if (token.options.width > 12) token.options.width = 12;
	        signal.trigger('updateCursorToken');
	      }
	    },
	
	    opDef: function opDef() {
	      var token = util.cursorToken();
	      if (token.group == 'operator') {
	        token.options.def = !token.options.def;
	        signal.trigger('updateCursorToken');
	      }
	    },
	
	    setOp: function setOp(id) {
	      var token = util.cursorToken();
	      if (token.group == 'operator') {
	        token.options.id = id;
	        signal.trigger('updateCursorToken');
	      }
	    },
	
	    ifRotate: function ifRotate(data) {
	      var token = util.cursorToken();
	      if (token.group == 'if') {
	        var freeSlot = 0,
	            opt = token.options;
	
	        if (opt.cond != 0 && opt.o != 0 && opt.x != 0) freeSlot = 0;else if (opt.cond != 1 && opt.o != 1 && opt.x != 1) freeSlot = 1;else if (opt.cond != 2 && opt.o != 2 && opt.x != 2) freeSlot = 2;else if (opt.cond != 3 && opt.o != 3 && opt.x != 3) freeSlot = 3;
	
	        if (data == 'cond') opt.cond = freeSlot;else if (data == 'o') opt.o = freeSlot;else if (data == 'x') opt.x = freeSlot;
	
	        signal.trigger('updateCursorToken');
	      }
	    },
	
	    blokSize: function blokSize(points) {
	      var token = util.cursorToken();
	      if (token.id != 13) return;
	      if (points == 0) token.options.w++;else if (points == 1) token.options.h++;else if (points == 2 && token.options.w > 1) token.options.w--;else if (points == 3 && token.options.h > 1) token.options.h--;
	      signal.trigger('updateCursorToken');
	    },
	
	    blokLvl: function blokLvl() {
	      var token = util.cursorToken();
	      if (token.id != 13) return;
	      if (++token.options.lvl > 4) token.options.lvl = 1;
	      signal.trigger('updateCursorToken');
	    },
	
	    setAsLoopKey: function setAsLoopKey() {
	      var token = util.cursorToken();
	      if (token.group == 'var' || token.group == 'object' || token.group == 'array' || token.group == 'function') {
	        token.options.tx1 = '';
	        token.options.tx2 = '';
	        token.options.loopKey = !token.options.loopKey;
	        token.options.loopVal = false;
	        signal.trigger('updateCursorToken');
	      }
	    },
	
	    setAsLoopVal: function setAsLoopVal() {
	      var token = util.cursorToken();
	      if (token.group == 'var' || token.group == 'object' || token.group == 'array' || token.group == 'function') {
	        token.options.tx1 = '';
	        token.options.tx2 = '';
	        token.options.loopVal = !token.options.loopVal;
	        token.options.loopKey = false;
	        signal.trigger('updateCursorToken');
	      }
	    }
	
	  };
	
	  this.util = {
	    cursorToken: function cursorToken() {
	      return state.lines[state.cursor.y].tokens[state.cursor.x];
	    },
	    getLines: function getLines() {
	      return state.lines;
	    }
	  };
	  util = this.util;
	
	  this['do'] = function (action) {
	    if (_this.mutations[action.action]) _this.mutations[action.action](action.data);
	  };
	};
	
	function download(filename, text) {
	  var element = document.createElement('a');
	  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	  element.setAttribute('download', filename);
	  element.style.display = 'none';
	  document.body.appendChild(element);
	  element.click();
	  document.body.removeChild(element);
	}
	
	function loadCode() {
	  fetch('code/code01.json').then(function (response) {
	    return response.json();
	  }).then(function (json) {
	    codeStore.setState(json);
	    codeStore.signal.trigger('updateCode');
	  });
	}
	
	var codeStore = new codeStoreClass();
	
	//codeStore.mutations.setData( lines, floats, varList, typeList )
	codeStore.setState(_sampleDataCode01Js.code01);
	
	var codeState = codeStore.state;
	var codeDo = codeStore['do'];
	var signal = codeStore.signal;
	var codeUtil = codeStore.util;
	exports.codeState = codeState;
	exports.codeDo = codeDo;
	exports.signal = signal;
	exports.codeUtil = codeUtil;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 9 */
/***/ function(module, exports) {

	///////////////////////////////////////////////////////////
	
	// scopes
	
	// scope object creator
	//
	// A scope is represented by a box in the background.
	// Colored slightly lighter than its container scope.
	//
	// x0,y0: (integers) top left corner in col, subrows coordinates.
	// x1,y1: (integers) bottom right corner in col, subrows coordinates.
	// color: (string) hex color value
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var scopeClass = function scopeClass(x, y, w, h, lvl) {
	  this.x = x;
	  this.y = y;
	  this.w = w;
	  this.h = h;
	  this.lvl = lvl;
	};
	
	///////////////////////////////////////////////////////////
	
	// lines
	
	// Line object
	// height: (integer) height of this line in cells
	// tokens: (array)
	// chains: (array)
	var lineClass = function lineClass(tokens, chains) {
	  this.tokens = tokens;
	  this.chains = chains;
	};
	
	var varlistItem = function varlistItem(frame, blocks, token) {
	  this.frame = frame ? frame : 0;
	  this.blocks = blocks ? blocks : [];
	  this.token = token ? token : new tokenClass();
	};
	
	// Token object creator
	//
	// name: (string) text name
	var tokenClass = function tokenClass(id, name) {
	  this.id = id ? id : 0;
	  this.name = name ? name : '';
	  switch (this.id) {
	    case 0:
	      this.options = {};this.group = '';break;
	    case 3:
	    case 4:
	    case 5:
	      this.options = new varTokenClass(arguments[2], arguments[3], arguments[4]);this.group = 'var';break;
	    case 70:
	    case 71:
	    case 72:
	      this.options = new typeTokenClass(arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7]);this.group = 'type';break;
	    case 73:
	    case 80:
	    case 81:
	    case 82:
	      this.options = new eventTokenClass();this.group = 'event';break;
	    case 6:
	      this.options = new objectTokenClass(arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8]);this.group = 'object';break;
	    case 7:
	      this.options = new arrayTokenClass();this.group = 'array';break;
	    case 10:
	      this.options = new functionTokenClass();this.group = 'function';break;
	    case 13:
	      this.options = new blokTokenClass();this.group = 'block';break;
	    case 22:
	      this.options = new ifTokenClass();this.group = 'if';break;
	    case 30:
	      this.options = new loopTokenClass();this.group = 'loop';break;
	    case 40:
	      this.options = new operatorTokenClass();this.group = 'operator';break;
	    case 90:
	      this.options = new numberTokenClass();this.group = 'number';break;
	    case 91:
	      this.options = new textTokenClass();this.group = 'text';break;
	    case 92:
	      this.options = new commentTokenClass();this.group = 'comment';break;
	    case 94:
	      this.options = new arrowTokenClass();this.group = 'arrow';break;
	    case 95:
	      this.options = new pinTokenClass();this.group = 'pin';break;
	    case 96:
	      this.options = new flagTokenClass();this.group = 'flag';break;
	    default:
	      this.options = {};this.group = 'token';break;
	  }
	};
	
	// Token object creator
	//
	// name: (string) text name
	var objectTokenClass = function objectTokenClass(tx1, tx2, type, typeGroup, bubble, dot, prop, typedot, loopVal) {
	  this.tx1 = tx1 ? tx1 : '';
	  this.tx2 = tx2 ? tx2 : '';
	  this.type = type ? type : '';
	  this.typeGroup = typeGroup ? typeGroup : '';
	  this.bubble = bubble ? bubble : false;
	  this.dot = dot ? dot : '';
	  this.prop = prop ? prop : '';
	  this.typedot = typedot ? typedot : false;
	  this.loopVal = loopVal ? loopVal : false;
	};
	
	// Token object creator
	//
	// name: (string) text name
	var typeTokenClass = function typeTokenClass(tx1, tx2, type, typeGroup, dot, points, def) {
	  this.tx1 = tx1 ? tx1 : '';
	  this.tx2 = tx2 ? tx2 : '';
	  this.type = type ? type : '';
	  this.typeGroup = typeGroup ? typeGroup : '';
	  this.def = def ? def : false;
	  this.dot = dot ? dot : false;
	  this.points = points ? points : 0;
	};
	
	// Token object creator
	//
	// name: (string) text name
	var arrayTokenClass = function arrayTokenClass(tx1, tx2, type, typeGroup, bubble, dot, prop, typedot, index, parPoints, parLen, loopVal) {
	  this.tx1 = tx1 ? tx1 : '';
	  this.tx2 = tx2 ? tx2 : '';
	  this.type = type ? type : '';
	  this.typeGroup = typeGroup ? typeGroup : '';
	  this.bubble = bubble ? bubble : false;
	  this.dot = dot ? dot : '';
	  this.prop = prop ? prop : '';
	  this.typedot = typedot ? typedot : false;
	  this.index = index ? index : '';
	  this.parPoints = parPoints ? parPoints : 0;
	  this.parLen = parLen ? parLen : 0;
	  this.loopVal = loopVal ? loopVal : false;
	};
	
	// Token object creator
	//
	// name: (string) text name
	var functionTokenClass = function functionTokenClass(points, parPoints, parLen, bubble, tx1, tx2, prop) {
	  this.points = points ? points : 0;
	  this.parPoints = parPoints ? parPoints : 0;
	  this.parLen = parLen ? parLen : 0;
	  this.bubble = bubble ? bubble : false;
	  this.tx1 = tx1 ? tx1 : '';
	  this.tx2 = tx2 ? tx2 : '';
	  this.prop = prop ? prop : '';
	};
	
	// Token object creator
	//
	// name: (string) text name
	var operatorTokenClass = function operatorTokenClass(id, def, points, parPoints, parLen) {
	  this.id = id ? id : 20;
	  this.points = points ? points : 0;
	  this.parPoints = parPoints ? parPoints : 0;
	  this.parLen = parLen ? parLen : 0;
	  this.def = def ? def : false;
	};
	
	// Token object creator
	//
	// name: (string) text name
	var ifTokenClass = function ifTokenClass(o, x, cond) {
	  this.o = o ? o : 0;
	  this.x = x ? x : 1;
	  this.cond = cond ? cond : 2;
	};
	
	// Token object creator
	//
	// name: (string) text name
	var arrowTokenClass = function arrowTokenClass(points) {
	  this.points = points ? points : 0;
	};
	
	// Token object creator
	//
	// name: (string) text name
	var flagTokenClass = function flagTokenClass(points, color) {
	  this.points = points ? points : 0;
	  this.color = color ? color : -110;
	};
	
	// Token object creator
	//
	// name: (string) text name
	var pinTokenClass = function pinTokenClass(points, bubble, color) {
	  this.points = points ? points : 0;
	  this.bubble = bubble ? bubble : false;
	  this.color = color ? color : '#048c5d';
	};
	
	// Token object creator
	//
	// name: (string) text name
	var numberTokenClass = function numberTokenClass(value) {
	  this.value = value ? value : 0;
	};
	
	// Token object creator
	//
	// name: (string) text name
	var textTokenClass = function textTokenClass(value) {
	  this.value = value ? value : 'abc';
	};
	
	// Token object creator
	//
	// name: (string) text name
	var commentTokenClass = function commentTokenClass(value, width) {
	  this.value = value ? value : 'comm';
	  this.width = width ? width : 1;
	};
	
	// Token object creator
	//
	// name: (string) text name
	var loopTokenClass = function loopTokenClass(parPoints, parLen) {
	  this.parPoints = parPoints ? parPoints : 0;
	  this.parLen = parLen ? parLen : 0;
	};
	
	// blokTokenClass
	// type is an integer indicating the type of block, as follows:
	// 0 basic
	// 1 if
	// 2 match
	// 3 loop
	//
	// name: (string) text name
	var blokTokenClass = function blokTokenClass(w, h, lvl, type) {
	  this.w = w ? w : 1;
	  this.h = h ? h : 1;
	  this.lvl = lvl ? lvl : 1;
	  this.type = type ? type : 0;
	};
	
	// Token object creator
	//
	// name: (string) text name
	var varTokenClass = function varTokenClass(tx1, tx2, bubble, prop, typedot, index, loopKey, loopVal) {
	  this.tx1 = tx1 ? tx1 : '';
	  this.tx2 = tx2 ? tx2 : '';
	  this.bubble = bubble ? bubble : false;
	  this.prop = prop ? prop : '';
	  this.typedot = typedot ? typedot : false;
	  this.index = index ? index : '';
	  this.loopKey = loopKey ? loopKey : false;
	  this.loopVal = loopVal ? loopVal : false;
	};
	
	// todo: review this
	var eventTokenClass = function eventTokenClass(tx1, tx2, bubble) {
	  this.tx1 = tx1 ? tx1 : '';
	  this.tx2 = tx2 ? tx2 : '';
	  this.bubble = bubble ? bubble : false;
	};
	
	// floating set of tokens
	//
	//
	var floatClass = function floatClass(x, y, width, height, floatTokens) {
	  this.w = width;
	  this.h = height;
	  this.x = x;
	  this.y = y;
	  this.floatTokens = floatTokens;
	};
	
	// floating set of tokens
	//
	//
	var floatTokenClass = function floatTokenClass(token, x, y) {
	  //this.token = token
	  Object.assign(this, token);
	  this.x = x;
	  this.y = y;
	};
	
	// Step object creator
	//
	// A step is each of the cells that make a chain.
	// stepId: (integer) step block identifier, from 0 to 5
	var stepClass = function stepClass(stepId) {
	  this.stepId = stepId;
	};
	
	////////////////////////////////////////////////////////////
	exports.scopeClass = scopeClass;
	exports.lineClass = lineClass;
	exports.varlistItem = varlistItem;
	exports.tokenClass = tokenClass;
	exports.stepClass = stepClass;
	exports.floatClass = floatClass;
	exports.floatTokenClass = floatTokenClass;
	exports.typeTokenClass = typeTokenClass;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _storesCodeClassesJs = __webpack_require__(9);
	
	var scopes = [new _storesCodeClassesJs.scopeClass(2, 2, 10, 6, 1), new _storesCodeClassesJs.scopeClass(3, 3, 4, 3, 2)];
	
	var line0 = new _storesCodeClassesJs.lineClass([new _storesCodeClassesJs.tokenClass(2, '0'), new _storesCodeClassesJs.tokenClass(3, 'abcde'), new _storesCodeClassesJs.tokenClass(1, 'exampl'), new _storesCodeClassesJs.tokenClass(0, 'Simple'), new _storesCodeClassesJs.tokenClass(5, 'qust'), new _storesCodeClassesJs.tokenClass(1, 'm55'), new _storesCodeClassesJs.tokenClass(6, 'fast'), new _storesCodeClassesJs.tokenClass(0, '1234'), new _storesCodeClassesJs.tokenClass(4, '0000'), new _storesCodeClassesJs.tokenClass(3, 'xxxxx'), new _storesCodeClassesJs.tokenClass(6, 'quick'), new _storesCodeClassesJs.tokenClass(6, 'web'), new _storesCodeClassesJs.tokenClass(0, '1234'), new _storesCodeClassesJs.tokenClass(4, '0000'), new _storesCodeClassesJs.tokenClass(6, 'xxxxx'), new _storesCodeClassesJs.tokenClass(3, 'quick'), new _storesCodeClassesJs.tokenClass(5, 'qust'), new _storesCodeClassesJs.tokenClass(1, 'm55'), new _storesCodeClassesJs.tokenClass(6, 'fast'), new _storesCodeClassesJs.tokenClass(0, '1234'), new _storesCodeClassesJs.tokenClass(4, '0000'), new _storesCodeClassesJs.tokenClass(3, 'xxxxx'), new _storesCodeClassesJs.tokenClass(6, 'quick'), new _storesCodeClassesJs.tokenClass(6, 'web'), new _storesCodeClassesJs.tokenClass(0, '1234'), new _storesCodeClassesJs.tokenClass(4, '0000'), new _storesCodeClassesJs.tokenClass(6, 'xxxxx'), new _storesCodeClassesJs.tokenClass(3, 'quick'), new _storesCodeClassesJs.tokenClass(2, 'web'), new _storesCodeClassesJs.tokenClass(6, 'quick'), new _storesCodeClassesJs.tokenClass(6, 'web'), new _storesCodeClassesJs.tokenClass(3, 'quick')], [new _storesCodeClassesJs.stepClass(0), new _storesCodeClassesJs.stepClass(1), new _storesCodeClassesJs.stepClass(2), new _storesCodeClassesJs.stepClass(0), new _storesCodeClassesJs.stepClass(1), new _storesCodeClassesJs.stepClass(2)]);
	
	var line1 = new _storesCodeClassesJs.lineClass([new _storesCodeClassesJs.tokenClass(6, 'web'), new _storesCodeClassesJs.tokenClass(0, '1234'), new _storesCodeClassesJs.tokenClass(4, '0000'), new _storesCodeClassesJs.tokenClass(6, 'xxxxx'), new _storesCodeClassesJs.tokenClass(3, 'quick'), new _storesCodeClassesJs.tokenClass(2, 'web'), new _storesCodeClassesJs.tokenClass(2, '1'), new _storesCodeClassesJs.tokenClass(3, 'Exmpl'), new _storesCodeClassesJs.tokenClass(1, 'quark'), new _storesCodeClassesJs.tokenClass(0, 'Simple'), new _storesCodeClassesJs.tokenClass(5, 'qust'), new _storesCodeClassesJs.tokenClass(1, 'm55'), new _storesCodeClassesJs.tokenClass(6, 'fast'), new _storesCodeClassesJs.tokenClass(0, '1234'), new _storesCodeClassesJs.tokenClass(4, '0000'), new _storesCodeClassesJs.tokenClass(3, 'xxxxx'), new _storesCodeClassesJs.tokenClass(6, 'quick'), new _storesCodeClassesJs.tokenClass(6, 'web'), new _storesCodeClassesJs.tokenClass(0, '1234'), new _storesCodeClassesJs.tokenClass(4, '0000'), new _storesCodeClassesJs.tokenClass(6, 'xxxxx'), new _storesCodeClassesJs.tokenClass(3, 'quick'), new _storesCodeClassesJs.tokenClass(2, 'web')], [new _storesCodeClassesJs.stepClass(0), new _storesCodeClassesJs.stepClass(1), new _storesCodeClassesJs.stepClass(2), new _storesCodeClassesJs.stepClass(0), new _storesCodeClassesJs.stepClass(1), new _storesCodeClassesJs.stepClass(2)]);
	
	var line2 = new _storesCodeClassesJs.lineClass([new _storesCodeClassesJs.tokenClass(4, '0000'), new _storesCodeClassesJs.tokenClass(3, 'xxxxx'), new _storesCodeClassesJs.tokenClass(6, 'quick'), new _storesCodeClassesJs.tokenClass(6, 'web'), new _storesCodeClassesJs.tokenClass(0, '1234'), new _storesCodeClassesJs.tokenClass(2, '2'), new _storesCodeClassesJs.tokenClass(3, 'Exmpl'), new _storesCodeClassesJs.tokenClass(1, 'quark'), new _storesCodeClassesJs.tokenClass(0, 'Simple'), new _storesCodeClassesJs.tokenClass(5, 'qust'), new _storesCodeClassesJs.tokenClass(1, 'm55'), new _storesCodeClassesJs.tokenClass(6, 'fast'), new _storesCodeClassesJs.tokenClass(0, '1234'), new _storesCodeClassesJs.tokenClass(4, '0000'), new _storesCodeClassesJs.tokenClass(3, 'xxxxx'), new _storesCodeClassesJs.tokenClass(6, 'quick'), new _storesCodeClassesJs.tokenClass(6, 'web'), new _storesCodeClassesJs.tokenClass(0, '1234'), new _storesCodeClassesJs.tokenClass(4, '0000'), new _storesCodeClassesJs.tokenClass(6, 'xxxxx'), new _storesCodeClassesJs.tokenClass(3, 'quick'), new _storesCodeClassesJs.tokenClass(2, 'web')], [new _storesCodeClassesJs.stepClass(0), new _storesCodeClassesJs.stepClass(1), new _storesCodeClassesJs.stepClass(2), new _storesCodeClassesJs.stepClass(0), new _storesCodeClassesJs.stepClass(1), new _storesCodeClassesJs.stepClass(2)]);
	
	var line3 = new _storesCodeClassesJs.lineClass([new _storesCodeClassesJs.tokenClass(2, '3'), new _storesCodeClassesJs.tokenClass(6, 'quick'), new _storesCodeClassesJs.tokenClass(6, 'web'), new _storesCodeClassesJs.tokenClass(0, '1234'), new _storesCodeClassesJs.tokenClass(4, '0000'), new _storesCodeClassesJs.tokenClass(6, 'xxxxx'), new _storesCodeClassesJs.tokenClass(3, 'quick'), new _storesCodeClassesJs.tokenClass(2, 'web'), new _storesCodeClassesJs.tokenClass(3, 'Exmpl'), new _storesCodeClassesJs.tokenClass(1, 'quark'), new _storesCodeClassesJs.tokenClass(0, 'Simple'), new _storesCodeClassesJs.tokenClass(5, 'qust'), new _storesCodeClassesJs.tokenClass(1, 'm55'), new _storesCodeClassesJs.tokenClass(6, 'fast'), new _storesCodeClassesJs.tokenClass(0, '1234'), new _storesCodeClassesJs.tokenClass(4, '0000'), new _storesCodeClassesJs.tokenClass(3, 'xxxxx'), new _storesCodeClassesJs.tokenClass(6, 'quick'), new _storesCodeClassesJs.tokenClass(6, 'web'), new _storesCodeClassesJs.tokenClass(0, '1234'), new _storesCodeClassesJs.tokenClass(4, '0000'), new _storesCodeClassesJs.tokenClass(6, 'xxxxx'), new _storesCodeClassesJs.tokenClass(3, 'quick'), new _storesCodeClassesJs.tokenClass(2, 'web')], [new _storesCodeClassesJs.stepClass(0), new _storesCodeClassesJs.stepClass(1), new _storesCodeClassesJs.stepClass(2), new _storesCodeClassesJs.stepClass(0), new _storesCodeClassesJs.stepClass(1), new _storesCodeClassesJs.stepClass(2)]);
	
	var line4 = new _storesCodeClassesJs.lineClass([new _storesCodeClassesJs.tokenClass(0, '1234'), new _storesCodeClassesJs.tokenClass(4, '0000'), new _storesCodeClassesJs.tokenClass(3, 'xxxxx'), new _storesCodeClassesJs.tokenClass(6, 'quick'), new _storesCodeClassesJs.tokenClass(6, 'web'), new _storesCodeClassesJs.tokenClass(0, '1234'), new _storesCodeClassesJs.tokenClass(6, 'fast'), new _storesCodeClassesJs.tokenClass(1, 'm55'), new _storesCodeClassesJs.tokenClass(6, 'fast'), new _storesCodeClassesJs.tokenClass(0, '1234'), new _storesCodeClassesJs.tokenClass(4, '0000'), new _storesCodeClassesJs.tokenClass(3, 'xxxxx'), new _storesCodeClassesJs.tokenClass(6, 'quick'), new _storesCodeClassesJs.tokenClass(6, 'web'), new _storesCodeClassesJs.tokenClass(0, '1234'), new _storesCodeClassesJs.tokenClass(6, 'fast'), new _storesCodeClassesJs.tokenClass(0, '1234'), new _storesCodeClassesJs.tokenClass(4, '0000'), new _storesCodeClassesJs.tokenClass(0, '1234'), new _storesCodeClassesJs.tokenClass(6, 'fast'), new _storesCodeClassesJs.tokenClass(0, '1234'), new _storesCodeClassesJs.tokenClass(4, '0000'), new _storesCodeClassesJs.tokenClass(3, 'xxxxx'), new _storesCodeClassesJs.tokenClass(6, 'quick'), new _storesCodeClassesJs.tokenClass(6, 'web'), new _storesCodeClassesJs.tokenClass(0, '1234'), new _storesCodeClassesJs.tokenClass(4, '0000'), new _storesCodeClassesJs.tokenClass(6, 'xxxxx'), new _storesCodeClassesJs.tokenClass(3, 'quick'), new _storesCodeClassesJs.tokenClass(2, 'web')], [new _storesCodeClassesJs.stepClass(0), new _storesCodeClassesJs.stepClass(1), new _storesCodeClassesJs.stepClass(2), new _storesCodeClassesJs.stepClass(0), new _storesCodeClassesJs.stepClass(1), new _storesCodeClassesJs.stepClass(2)]);
	
	var line5 = new _storesCodeClassesJs.lineClass([new _storesCodeClassesJs.tokenClass(5, 'qust'), new _storesCodeClassesJs.tokenClass(1, 'm55'), new _storesCodeClassesJs.tokenClass(6, 'fast'), new _storesCodeClassesJs.tokenClass(0, '1234'), new _storesCodeClassesJs.tokenClass(4, '0000'), new _storesCodeClassesJs.tokenClass(3, 'xxxxx'), new _storesCodeClassesJs.tokenClass(6, 'quick'), new _storesCodeClassesJs.tokenClass(6, 'web'), new _storesCodeClassesJs.tokenClass(3, 'perfect'), new _storesCodeClassesJs.tokenClass(1, 'well'), new _storesCodeClassesJs.tokenClass(0, 'lets-see'), new _storesCodeClassesJs.tokenClass(3, 'Qiix'), new _storesCodeClassesJs.tokenClass(6, 'Qiix'), new _storesCodeClassesJs.tokenClass(1, 'Qiix'), new _storesCodeClassesJs.tokenClass(0, 'Qiix'), new _storesCodeClassesJs.tokenClass(3, 'Exmpl'), new _storesCodeClassesJs.tokenClass(1, 'quark'), new _storesCodeClassesJs.tokenClass(0, 'Simple'), new _storesCodeClassesJs.tokenClass(5, 'qust'), new _storesCodeClassesJs.tokenClass(1, 'm55'), new _storesCodeClassesJs.tokenClass(6, 'fast'), new _storesCodeClassesJs.tokenClass(0, '1234'), new _storesCodeClassesJs.tokenClass(4, '0000'), new _storesCodeClassesJs.tokenClass(3, 'xxxxx'), new _storesCodeClassesJs.tokenClass(6, 'quick'), new _storesCodeClassesJs.tokenClass(6, 'web'), new _storesCodeClassesJs.tokenClass(1, 'Qiix'), new _storesCodeClassesJs.tokenClass(3, 'Qiix'), new _storesCodeClassesJs.tokenClass(2, '3'), new _storesCodeClassesJs.tokenClass(3, 'Exmpl'), new _storesCodeClassesJs.tokenClass(1, 'quark')], []);
	
	var line6 = new _storesCodeClassesJs.lineClass([new _storesCodeClassesJs.tokenClass(6, 'web'), new _storesCodeClassesJs.tokenClass(2, '3'), new _storesCodeClassesJs.tokenClass(3, 'Exmpl'), new _storesCodeClassesJs.tokenClass(1, 'quark'), new _storesCodeClassesJs.tokenClass(0, 'Simple'), new _storesCodeClassesJs.tokenClass(5, 'qust'), new _storesCodeClassesJs.tokenClass(0, 'abcdefgh'), new _storesCodeClassesJs.tokenClass(3, 'Exmpl'), new _storesCodeClassesJs.tokenClass(1, 'quark'), new _storesCodeClassesJs.tokenClass(0, 'Simple'), new _storesCodeClassesJs.tokenClass(5, 'qust'), new _storesCodeClassesJs.tokenClass(1, 'm55'), new _storesCodeClassesJs.tokenClass(6, 'fast'), new _storesCodeClassesJs.tokenClass(0, '1234'), new _storesCodeClassesJs.tokenClass(4, '0000'), new _storesCodeClassesJs.tokenClass(3, 'xxxxx'), new _storesCodeClassesJs.tokenClass(6, 'quick'), new _storesCodeClassesJs.tokenClass(6, 'web'), new _storesCodeClassesJs.tokenClass(2, '3'), new _storesCodeClassesJs.tokenClass(3, 'Exmpl'), new _storesCodeClassesJs.tokenClass(1, 'quark'), new _storesCodeClassesJs.tokenClass(0, 'Simple'), new _storesCodeClassesJs.tokenClass(5, 'qust'), new _storesCodeClassesJs.tokenClass(1, 'm55'), new _storesCodeClassesJs.tokenClass(6, 'fast'), new _storesCodeClassesJs.tokenClass(5, 'qust'), new _storesCodeClassesJs.tokenClass(1, 'm55'), new _storesCodeClassesJs.tokenClass(6, 'fast'), new _storesCodeClassesJs.tokenClass(0, '1234'), new _storesCodeClassesJs.tokenClass(4, '0000'), new _storesCodeClassesJs.tokenClass(3, 'xxxxx')], []);
	
	var line7 = new _storesCodeClassesJs.lineClass([new _storesCodeClassesJs.tokenClass(0, 'lets-see'), new _storesCodeClassesJs.tokenClass(3, 'Qiix'), new _storesCodeClassesJs.tokenClass(0, '5'), new _storesCodeClassesJs.tokenClass(6, '1234'), new _storesCodeClassesJs.tokenClass(1, 'some'), new _storesCodeClassesJs.tokenClass(2, 'go'), new _storesCodeClassesJs.tokenClass(3, 'perfect'), new _storesCodeClassesJs.tokenClass(1, 'well'), new _storesCodeClassesJs.tokenClass(0, 'Qiix'), new _storesCodeClassesJs.tokenClass(1, 'quark'), new _storesCodeClassesJs.tokenClass(0, 'Simple'), new _storesCodeClassesJs.tokenClass(5, 'qust'), new _storesCodeClassesJs.tokenClass(1, 'm55'), new _storesCodeClassesJs.tokenClass(6, 'fast'), new _storesCodeClassesJs.tokenClass(0, '1234'), new _storesCodeClassesJs.tokenClass(4, '0000'), new _storesCodeClassesJs.tokenClass(3, 'xxxxx'), new _storesCodeClassesJs.tokenClass(6, 'quick'), new _storesCodeClassesJs.tokenClass(6, 'web'), new _storesCodeClassesJs.tokenClass(3, 'Exmpl'), new _storesCodeClassesJs.tokenClass(1, 'quark'), new _storesCodeClassesJs.tokenClass(0, 'Simple'), new _storesCodeClassesJs.tokenClass(5, 'qust'), new _storesCodeClassesJs.tokenClass(1, 'm55'), new _storesCodeClassesJs.tokenClass(6, 'fast'), new _storesCodeClassesJs.tokenClass(3, 'Exmpl'), new _storesCodeClassesJs.tokenClass(1, 'quark'), new _storesCodeClassesJs.tokenClass(0, 'Simple'), new _storesCodeClassesJs.tokenClass(5, 'qust'), new _storesCodeClassesJs.tokenClass(1, 'm55'), new _storesCodeClassesJs.tokenClass(6, 'fast')], []);
	
	var line8 = new _storesCodeClassesJs.lineClass([new _storesCodeClassesJs.tokenClass(6, 'web'), new _storesCodeClassesJs.tokenClass(1, 'Qiix'), new _storesCodeClassesJs.tokenClass(3, 'Qiix'), new _storesCodeClassesJs.tokenClass(0, 'Qiix'), new _storesCodeClassesJs.tokenClass(3, 'Exmpl'), new _storesCodeClassesJs.tokenClass(1, 'quark'), new _storesCodeClassesJs.tokenClass(0, 'Simple'), new _storesCodeClassesJs.tokenClass(3, 'Qiix'), new _storesCodeClassesJs.tokenClass(0, '5'), new _storesCodeClassesJs.tokenClass(6, '1234'), new _storesCodeClassesJs.tokenClass(1, 'some'), new _storesCodeClassesJs.tokenClass(2, 'go'), new _storesCodeClassesJs.tokenClass(1, 'm55'), new _storesCodeClassesJs.tokenClass(6, 'fast'), new _storesCodeClassesJs.tokenClass(3, 'Exmpl'), new _storesCodeClassesJs.tokenClass(1, 'quark'), new _storesCodeClassesJs.tokenClass(0, 'Simple'), new _storesCodeClassesJs.tokenClass(5, 'qust'), new _storesCodeClassesJs.tokenClass(3, 'perfect'), new _storesCodeClassesJs.tokenClass(1, 'well'), new _storesCodeClassesJs.tokenClass(0, 'Qiix'), new _storesCodeClassesJs.tokenClass(3, 'Exmpl'), new _storesCodeClassesJs.tokenClass(1, 'quark'), new _storesCodeClassesJs.tokenClass(0, 'Simple'), new _storesCodeClassesJs.tokenClass(6, 'quick'), new _storesCodeClassesJs.tokenClass(6, 'web'), new _storesCodeClassesJs.tokenClass(1, 'Qiix'), new _storesCodeClassesJs.tokenClass(3, 'Qiix'), new _storesCodeClassesJs.tokenClass(0, 'Qiix'), new _storesCodeClassesJs.tokenClass(3, 'Exmpl'), new _storesCodeClassesJs.tokenClass(1, 'quark')], []);
	
	var lines = [line0, line1, line2, line3, line4, line5, line6, line7, line8];
	
	lines = [];
	var alin;
	for (var i = 1; i < 48; i++) {
	  alin = new _storesCodeClassesJs.lineClass([]);
	  for (var j = 0; j < 32; j++) {
	    alin.tokens.push(new _storesCodeClassesJs.tokenClass(0, ''));
	  }
	  lines.push(alin);
	  if (i % 12 == 0) lines.push(new _storesCodeClassesJs.lineClass([]));
	}
	
	var varList = {
	  3: [new _storesCodeClassesJs.varlistItem(0, [], new _storesCodeClassesJs.tokenClass(3, 'alpha', 'alpha')), new _storesCodeClassesJs.varlistItem(0, [], new _storesCodeClassesJs.tokenClass(3, 'beta', 'beta')), new _storesCodeClassesJs.varlistItem(0, [], new _storesCodeClassesJs.tokenClass(3, 'gamma', 'gamma', 'var')), new _storesCodeClassesJs.varlistItem(0, [], new _storesCodeClassesJs.tokenClass(3, 'delta', 'delta')), new _storesCodeClassesJs.varlistItem(0, [], new _storesCodeClassesJs.tokenClass(3, 'eta', 'eta'))],
	  4: [new _storesCodeClassesJs.varlistItem(0, [], new _storesCodeClassesJs.tokenClass(4, 'number', 'number')), new _storesCodeClassesJs.varlistItem(0, [], new _storesCodeClassesJs.tokenClass(4, 'amount', 'amount', 'of stuff')), new _storesCodeClassesJs.varlistItem(0, [], new _storesCodeClassesJs.tokenClass(4, 'count', 'count')), new _storesCodeClassesJs.varlistItem(0, [], new _storesCodeClassesJs.tokenClass(4, 'ii', 'ii', 'zz')), new _storesCodeClassesJs.varlistItem(0, [], new _storesCodeClassesJs.tokenClass(4, 'val', 'some', 'val'))],
	  5: [new _storesCodeClassesJs.varlistItem(0, [], new _storesCodeClassesJs.tokenClass(5, 'text', 'text')), new _storesCodeClassesJs.varlistItem(0, [], new _storesCodeClassesJs.tokenClass(5, 'detail', 'detail')), new _storesCodeClassesJs.varlistItem(0, [], new _storesCodeClassesJs.tokenClass(5, 'info', 'info'))],
	  6: [new _storesCodeClassesJs.varlistItem(0, [], new _storesCodeClassesJs.tokenClass(6, 'moon', 'moon', '', 'planet', 'demo')), new _storesCodeClassesJs.varlistItem(0, [], new _storesCodeClassesJs.tokenClass(6, 'sun', 'sun', 'star', 'planet', 'demo')), new _storesCodeClassesJs.varlistItem(0, [], new _storesCodeClassesJs.tokenClass(6, 'apple', 'apple', '', 'apple', 'demo')), new _storesCodeClassesJs.varlistItem(0, [], new _storesCodeClassesJs.tokenClass(6, 'frog', 'frog', '', 'frog', 'demo')), new _storesCodeClassesJs.varlistItem(0, [], new _storesCodeClassesJs.tokenClass(6, 'flower', 'flower', '', 'flower', 'demo')), new _storesCodeClassesJs.varlistItem(0, [], new _storesCodeClassesJs.tokenClass(6, 'someone', 'someone', '', 'user', 'demo')), new _storesCodeClassesJs.varlistItem(0, [], new _storesCodeClassesJs.tokenClass(6, 'spaceship 5', 'space', 'ship 5', 'airplane', 'demo')), new _storesCodeClassesJs.varlistItem(0, [], new _storesCodeClassesJs.tokenClass(6, 'earth', 'earth', '', 'planet', 'demo')), new _storesCodeClassesJs.varlistItem(0, [], new _storesCodeClassesJs.tokenClass(6, 'rocket1', 'rocket1', '', 'airplane', 'demo'))]
	};
	
	var typeList = [new _storesCodeClassesJs.tokenClass(70, '', 'planet', '', 'planet', 'demo'), new _storesCodeClassesJs.tokenClass(70, '', 'apple', '', 'apple', 'demo'), new _storesCodeClassesJs.tokenClass(70, '', 'frog', '', 'frog', 'demo'), new _storesCodeClassesJs.tokenClass(70, '', 'flower', '', 'flower', 'demo'), new _storesCodeClassesJs.tokenClass(70, '', 'user', '', 'user', 'demo')];
	
	var floats = [new _storesCodeClassesJs.floatClass(540, 380, 2, 2, [new _storesCodeClassesJs.floatTokenClass(new _storesCodeClassesJs.tokenClass(2, '1234'), 0, 0), new _storesCodeClassesJs.floatTokenClass(new _storesCodeClassesJs.tokenClass(5, 'axis'), 1, 0), new _storesCodeClassesJs.floatTokenClass(new _storesCodeClassesJs.tokenClass(3, 'tick'), 1, 1)])];
	floats = [];
	
	var sampleState = {
	  lines: lines,
	  floats: floats,
	  scopes: [],
	  vars: varList,
	  types: typeList,
	  cursor: { x: 0, y: 0 }
	};
	
	exports.sampleState = sampleState;

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var code01 = { "lines": [{ "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": { "value": "Here the famous \"fizz buzz\". Write the numbers from 1 to 100, except that for multiples of 3, write \"fizz\". For multiples of 5, write \"buzz\". For multiples of both 3 and 5, write \"fizz buzz\"." }, "group": "" }, { "id": 92, "name": "", "options": { "value": "Here the famous \"fizz buzz\". Write the numbers from 1 to 100, except that for multiples of 3, write \"fizz\" instead. For multiples of 5, write \"buzz\". For multiples of both 3 and 5, write \"fizz buzz\".", "width": 11 }, "group": "comment" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 92, "name": "", "options": { "value": "This demo starts with the famous hello world", "width": 4 }, "group": "comment" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 30, "name": "", "options": { "parPoints": 0, "parLen": 2 }, "group": "loop" }, { "id": 90, "name": "", "options": { "value": "1" }, "group": "number" }, { "id": 90, "name": "", "options": { "value": "100" }, "group": "number" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 92, "name": "", "options": { "value": "This ring icon is the literal true. The \"x\" is false.", "width": 4 }, "group": "comment" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 91, "name": "", "options": { "value": "hello world!" }, "group": "text" }, { "id": 10, "name": "", "options": { "points": 0, "parPoints": 2, "parLen": 1, "bubble": false, "tx1": "write", "tx2": "", "prop": "" }, "group": "function" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 70, "name": "", "options": { "tx1": "console", "tx2": "", "type": "console", "typeGroup": "demo" }, "group": "type" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 13, "name": "", "options": { "w": 8, "h": 9, "lvl": 1, "type": 3 }, "group": "block" }, { "id": 90, "name": "", "options": { "value": "15" }, "group": "number" }, { "id": 4, "name": "", "options": { "tx1": "", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": true }, "group": "var" }, { "id": 40, "name": "", "options": { "id": "24", "points": 1, "parPoints": 2, "parLen": 2, "def": false }, "group": "operator" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 1, "name": "", "options": {}, "group": "token" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 2, "name": "", "options": {}, "group": "token" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 92, "name": "", "options": { "value": "Here various functions are chained one after other", "width": 5 }, "group": "comment" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 92, "name": "", "options": { "value": "Assigning \"1\" to number variable \"value\"", "width": 4 }, "group": "comment" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 90, "name": "", "options": { "value": 0 }, "group": "number" }, { "id": 4, "name": "", "options": { "tx1": "", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 40, "name": "", "options": { "id": "0", "points": 0, "parPoints": 2, "parLen": 2, "def": false }, "group": "operator" }, { "id": 22, "name": "", "options": { "o": 1, "x": 0, "cond": 2 }, "group": "if" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 92, "name": "", "options": { "value": "Here the literal true is assigned to boolean var gamma delta", "width": 4 }, "group": "comment" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 91, "name": "", "options": { "value": "Here" }, "group": "text" }, { "id": 5, "name": "", "options": { "tx1": "entry", "tx2": "data", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 10, "name": "", "options": { "points": 1, "parPoints": 2, "parLen": 2, "bubble": false, "tx1": "join", "tx2": "", "prop": "" }, "group": "function" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 4, "name": "", "options": { "tx1": "value", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 94, "name": "", "options": { "points": 2 }, "group": "arrow" }, { "id": 90, "name": "", "options": { "value": "1" }, "group": "number" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 13, "name": "", "options": { "w": 2, "h": 2, "lvl": 2, "type": 1 }, "group": "block" }, { "id": 91, "name": "", "options": { "value": "fizz buzz!" }, "group": "text" }, { "id": 10, "name": "", "options": { "points": 0, "parPoints": 2, "parLen": 1, "bubble": false, "tx1": "write", "tx2": "", "prop": "" }, "group": "function" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 1, "name": "", "options": {}, "group": "token" }, { "id": 94, "name": "", "options": { "points": 0 }, "group": "arrow" }, { "id": 3, "name": "gamma", "options": { "tx1": "gamma", "tx2": "delta" }, "group": "var" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 5, "name": "", "options": { "tx1": "some", "tx2": "text", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 92, "name": "", "options": { "value": "Assigning false to \"a boolean\". The bubble means that is a new var.", "width": 4 }, "group": "comment" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 90, "name": "", "options": { "value": "3" }, "group": "number" }, { "id": 4, "name": "", "options": { "tx1": "", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": true }, "group": "var" }, { "id": 40, "name": "", "options": { "id": "24", "points": 1, "parPoints": 2, "parLen": 2, "def": false }, "group": "operator" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 92, "name": "", "options": { "value": "Numbers and string literals looks like this:", "width": 4 }, "group": "comment" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 91, "name": "", "options": { "value": "xyz" }, "group": "text" }, { "id": 10, "name": "", "options": { "points": 0, "parPoints": 1, "parLen": 1, "bubble": false, "tx1": "reverse", "tx2": "", "prop": "" }, "group": "function" }, { "id": 5, "name": "", "options": { "tx1": "", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 2, "name": "", "options": {}, "group": "token" }, { "id": 94, "name": "", "options": { "points": 0 }, "group": "arrow" }, { "id": 3, "name": "", "options": { "tx1": "a", "tx2": "boolean", "bubble": true, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 90, "name": "", "options": { "value": 0 }, "group": "number" }, { "id": 4, "name": "", "options": { "tx1": "", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 40, "name": "", "options": { "id": "0", "points": 0, "parPoints": 2, "parLen": 2, "def": false }, "group": "operator" }, { "id": 22, "name": "", "options": { "o": 1, "x": 0, "cond": 2 }, "group": "if" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 90, "name": "", "options": { "value": "128" }, "group": "number" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 91, "name": "", "options": { "value": "This is a long string" }, "group": "text" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 90, "name": "", "options": { "value": "12000000000" }, "group": "number" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 10, "name": "", "options": { "points": 0, "parPoints": 3, "parLen": 3, "bubble": false, "tx1": "join", "tx2": "", "prop": "" }, "group": "function" }, { "id": 5, "name": "", "options": { "tx1": "", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 91, "name": "", "options": { "value": "qwert" }, "group": "text" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 92, "name": "", "options": { "value": "Expressions can be vertical. Assign 100 to \"another value\" variable", "width": 4 }, "group": "comment" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 13, "name": "", "options": { "w": 2, "h": 2, "lvl": 2, "type": 1 }, "group": "block" }, { "id": 91, "name": "", "options": { "value": "fizz" }, "group": "text" }, { "id": 10, "name": "", "options": { "points": 0, "parPoints": 2, "parLen": 1, "bubble": false, "tx1": "write", "tx2": "", "prop": "" }, "group": "function" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 92, "name": "", "options": { "value": "functions are blue arrows. Here the function \"sum\" takes two parameters, and the return value is assigned to the var \"total\"", "width": 7 }, "group": "comment" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 91, "name": "", "options": { "value": "zigma" }, "group": "text" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 90, "name": "", "options": { "value": "100" }, "group": "number" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 90, "name": "", "options": { "value": "5" }, "group": "number" }, { "id": 4, "name": "", "options": { "tx1": "", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": true }, "group": "var" }, { "id": 40, "name": "", "options": { "id": "24", "points": 1, "parPoints": 2, "parLen": 2, "def": false }, "group": "operator" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 90, "name": "", "options": { "value": "16" }, "group": "number" }, { "id": 4, "name": "", "options": { "tx1": "other", "tx2": "num", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 10, "name": "", "options": { "points": 0, "parPoints": 2, "parLen": 2, "bubble": false, "tx1": "sum", "tx2": "", "prop": "" }, "group": "function" }, { "id": 4, "name": "", "options": { "tx1": "total", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 10, "name": "", "options": { "points": 1, "parPoints": 0, "parLen": 2, "bubble": false, "tx1": "join", "tx2": "", "prop": "" }, "group": "function" }, { "id": 5, "name": "", "options": { "tx1": "info", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 10, "name": "", "options": { "points": 2, "parPoints": 3, "parLen": 3, "bubble": false, "tx1": "join", "tx2": "", "prop": "" }, "group": "function" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 94, "name": "", "options": { "points": 1 }, "group": "arrow" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 90, "name": "", "options": { "value": 0 }, "group": "number" }, { "id": 4, "name": "", "options": { "tx1": "", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 40, "name": "", "options": { "id": "0", "points": 0, "parPoints": 2, "parLen": 2, "def": false }, "group": "operator" }, { "id": 22, "name": "", "options": { "o": 0, "x": 1, "cond": 2 }, "group": "if" }, { "id": 91, "name": "", "options": { "value": "buzz" }, "group": "text" }, { "id": 10, "name": "", "options": { "points": 0, "parPoints": 2, "parLen": 1, "bubble": false, "tx1": "write", "tx2": "", "prop": "" }, "group": "function" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 92, "name": "", "options": { "value": "functions can flow in any direction", "width": 6 }, "group": "comment" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 5, "name": "", "options": { "tx1": "result", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 4, "name": "", "options": { "tx1": "another", "tx2": "value", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 4, "name": "", "options": { "tx1": "", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": true }, "group": "var" }, { "id": 10, "name": "", "options": { "points": 0, "parPoints": 2, "parLen": 1, "bubble": false, "tx1": "write", "tx2": "", "prop": "" }, "group": "function" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 3, "name": "", "options": { "tx1": "compar", "tx2": "ison", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 10, "name": "", "options": { "points": 2, "parPoints": 0, "parLen": 1, "bubble": false, "tx1": "larger ", "tx2": "than 10", "prop": "" }, "group": "function" }, { "id": 90, "name": "", "options": { "value": "84" }, "group": "number" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 10, "name": "", "options": { "points": 0, "parPoints": 1, "parLen": 1, "bubble": false, "tx1": "less", "tx2": "than 10", "prop": "" }, "group": "function" }, { "id": 3, "name": "", "options": { "tx1": "other", "tx2": "compar", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 90, "name": "", "options": { "value": "250" }, "group": "number" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [] }, { "tokens": [{ "id": 92, "name": "", "options": { "value": "Operators work like functions. They take parameters, and return a value. They have a litle triangle that points to the direction to where the returning value goes.", "width": 9 }, "group": "comment" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 92, "name": "", "options": { "value": "Here a loop token takes an array as parameter. It will loop on array elements, and write them to the console", "width": 7 }, "group": "comment" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 92, "name": "", "options": { "value": "Here two arrays of numbers are defined", "width": 6 }, "group": "comment" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 90, "name": "", "options": { "value": "2" }, "group": "number" }, { "id": 90, "name": "", "options": { "value": "3" }, "group": "number" }, { "id": 40, "name": "", "options": { "id": "20", "points": 0, "parPoints": 2, "parLen": 2, "def": false }, "group": "operator" }, { "id": 4, "name": "", "options": { "tx1": "total", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 30, "name": "", "options": { "parPoints": 0, "parLen": 1 }, "group": "loop" }, { "id": 7, "name": "", "options": { "tx1": "array of", "tx2": "strings", "type": "", "typeGroup": "", "bubble": false, "dot": "", "prop": "", "typedot": false, "index": "", "parPoints": 0, "parLen": 0, "loopVal": false }, "group": "array" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 7, "name": "", "options": { "tx1": "numbers", "tx2": "", "type": "", "typeGroup": "", "bubble": true, "dot": "", "prop": "", "typedot": false, "index": "", "parPoints": 0, "parLen": 6, "loopVal": false }, "group": "array" }, { "id": 90, "name": "", "options": { "value": "5" }, "group": "number" }, { "id": 90, "name": "", "options": { "value": "12" }, "group": "number" }, { "id": 90, "name": "", "options": { "value": "7" }, "group": "number" }, { "id": 90, "name": "", "options": { "value": "4" }, "group": "number" }, { "id": 90, "name": "", "options": { "value": "1" }, "group": "number" }, { "id": 90, "name": "", "options": { "value": "16" }, "group": "number" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 92, "name": "", "options": { "value": "The not equal operator will return true here, because the two strings are different.", "width": 7 }, "group": "comment" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 13, "name": "", "options": { "w": 4, "h": 1, "lvl": 1, "type": 3 }, "group": "block" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 5, "name": "", "options": { "tx1": "", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": true }, "group": "var" }, { "id": 10, "name": "", "options": { "points": 0, "parPoints": 2, "parLen": 1, "bubble": false, "tx1": "write", "tx2": "", "prop": "" }, "group": "function" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 7, "name": "", "options": { "tx1": "more", "tx2": "numbers", "type": "", "typeGroup": "", "bubble": true, "dot": "", "prop": "", "typedot": false, "index": "", "parPoints": 0, "parLen": 6, "loopVal": false }, "group": "array" }, { "id": 90, "name": "", "options": { "value": 0 }, "group": "number" }, { "id": 90, "name": "", "options": { "value": "6" }, "group": "number" }, { "id": 90, "name": "", "options": { "value": "11" }, "group": "number" }, { "id": 90, "name": "", "options": { "value": "8" }, "group": "number" }, { "id": 90, "name": "", "options": { "value": "3" }, "group": "number" }, { "id": 90, "name": "", "options": { "value": "13" }, "group": "number" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 91, "name": "", "options": { "value": "lemon" }, "group": "text" }, { "id": 91, "name": "", "options": { "value": "orange" }, "group": "text" }, { "id": 40, "name": "", "options": { "id": "1", "points": 0, "parPoints": 2, "parLen": 2, "def": false }, "group": "operator" }, { "id": 3, "name": "", "options": { "tx1": "compare", "tx2": "result", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 92, "name": "", "options": { "value": "The if token takes a conditional expression, and executes the true or the false expression based on that", "width": 7 }, "group": "comment" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 92, "name": "", "options": { "value": "This will loop through the elements of the \"numbers\" array, will sum them with corresponding elements of \"more numbers\" and write the results to the console", "width": 9 }, "group": "comment" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 92, "name": "", "options": { "value": "The red icon is a loop, and works based on the parameters that it gets. In this case will write the values from 20 to 1, and the accumulated total sum", "width": 9 }, "group": "comment" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 4, "name": "", "options": { "tx1": "a", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 4, "name": "", "options": { "tx1": "b", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 40, "name": "", "options": { "id": "0", "points": 0, "parPoints": 2, "parLen": 2, "def": false }, "group": "operator" }, { "id": 22, "name": "", "options": { "o": 0, "x": 1, "cond": 2 }, "group": "if" }, { "id": 91, "name": "", "options": { "value": "a and b are equal!" }, "group": "text" }, { "id": 10, "name": "", "options": { "points": 0, "parPoints": 2, "parLen": 1, "bubble": false, "tx1": "write", "tx2": "", "prop": "" }, "group": "function" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 30, "name": "", "options": { "parPoints": 0, "parLen": 1 }, "group": "loop" }, { "id": 7, "name": "", "options": { "tx1": "numbers", "tx2": "", "type": "", "typeGroup": "", "bubble": false, "dot": "", "prop": "", "typedot": false, "index": "", "parPoints": 0, "parLen": 0, "loopVal": false }, "group": "array" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 4, "name": "", "options": { "tx1": "total", "tx2": "", "bubble": true, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 94, "name": "", "options": { "points": 2 }, "group": "arrow" }, { "id": 90, "name": "", "options": { "value": 0 }, "group": "number" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 91, "name": "", "options": { "value": "a and b are not equal" }, "group": "text" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 13, "name": "", "options": { "w": 4, "h": 2, "lvl": 1, "type": 3 }, "group": "block" }, { "id": 4, "name": "", "options": { "tx1": "", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": true }, "group": "var" }, { "id": 7, "name": "", "options": { "tx1": "more", "tx2": "numbers", "type": "", "typeGroup": "", "bubble": false, "dot": "", "prop": "", "typedot": false, "index": "#c05b00", "parPoints": 0, "parLen": 0, "loopVal": false }, "group": "array" }, { "id": 40, "name": "", "options": { "id": "20", "points": 1, "parPoints": 2, "parLen": 2, "def": false }, "group": "operator" }, { "id": 4, "name": "", "options": { "tx1": "", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "#c05b00", "loopKey": true, "loopVal": false }, "group": "var" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 30, "name": "", "options": { "parPoints": 0, "parLen": 2 }, "group": "loop" }, { "id": 90, "name": "", "options": { "value": "20" }, "group": "number" }, { "id": 90, "name": "", "options": { "value": "1" }, "group": "number" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 10, "name": "", "options": { "points": 0, "parPoints": 3, "parLen": 1, "bubble": false, "tx1": "write", "tx2": "", "prop": "" }, "group": "function" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 10, "name": "", "options": { "points": 0, "parPoints": 3, "parLen": 1, "bubble": false, "tx1": "write", "tx2": "", "prop": "" }, "group": "function" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 13, "name": "", "options": { "w": 4, "h": 2, "lvl": 1, "type": 3 }, "group": "block" }, { "id": 4, "name": "", "options": { "tx1": "", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": true }, "group": "var" }, { "id": 4, "name": "", "options": { "tx1": "total", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 40, "name": "", "options": { "id": 20, "points": 0, "parPoints": 2, "parLen": 2, "def": false }, "group": "operator" }, { "id": 4, "name": "", "options": { "tx1": "total", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 70, "name": "", "options": { "tx1": "console", "tx2": "", "type": "console", "typeGroup": "demo" }, "group": "type" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 10, "name": "", "options": { "points": 0, "parPoints": 3, "parLen": 1, "bubble": false, "tx1": "write", "tx2": "", "prop": "" }, "group": "function" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 10, "name": "", "options": { "points": 0, "parPoints": 3, "parLen": 1, "bubble": false, "tx1": "write", "tx2": "", "prop": "" }, "group": "function" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 92, "name": "", "options": { "value": "The if below will increse \"quant\" by 1, if the var \"condit\" is true. Will do nothing if \"condit\" is false.", "width": 7 }, "group": "comment" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 3, "name": "", "options": { "tx1": "condit", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 22, "name": "", "options": { "o": 0, "x": 1, "cond": 2 }, "group": "if" }, { "id": 4, "name": "", "options": { "tx1": "quant", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 40, "name": "", "options": { "id": "30", "points": 0, "parPoints": 2, "parLen": 1, "def": false }, "group": "operator" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 92, "name": "", "options": { "value": "Multiple if can be chained as shown here. Here only one of the write function will actually be evaluated.", "width": 8 }, "group": "comment" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 92, "name": "", "options": { "value": "The match token. Here if the var quanty is 1,2 or 3, the corresponding block is evaluated. The fourth block uses an operator to test if quanty is larger than 3.", "width": 9 }, "group": "comment" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 4, "name": "", "options": { "tx1": "b", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 4, "name": "", "options": { "tx1": "a", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 40, "name": "", "options": { "id": "2", "points": 0, "parPoints": 2, "parLen": 2, "def": false }, "group": "operator" }, { "id": 22, "name": "", "options": { "o": 0, "x": 1, "cond": 2 }, "group": "if" }, { "id": 91, "name": "", "options": { "value": "a is larger than b" }, "group": "text" }, { "id": 10, "name": "", "options": { "points": 0, "parPoints": 2, "parLen": 1, "bubble": false, "tx1": "write", "tx2": "", "prop": "" }, "group": "function" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 70, "name": "", "options": { "tx1": "console", "tx2": "", "type": "console", "typeGroup": "demo" }, "group": "type" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 3, "name": "", "options": { "tx1": "fact", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 22, "name": "", "options": { "o": 0, "x": 1, "cond": 2 }, "group": "if" }, { "id": 91, "name": "", "options": { "value": "fact is true\n" }, "group": "text" }, { "id": 10, "name": "", "options": { "points": 0, "parPoints": 2, "parLen": 1, "bubble": false, "tx1": "write", "tx2": "", "prop": "" }, "group": "function" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 4, "name": "", "options": { "tx1": "quanty", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 20, "name": "", "options": {}, "group": "token" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 3, "name": "", "options": { "tx1": "other", "tx2": "fact", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 22, "name": "", "options": { "o": 0, "x": 1, "cond": 2 }, "group": "if" }, { "id": 91, "name": "", "options": { "value": "other fact is true" }, "group": "text" }, { "id": 10, "name": "", "options": { "points": 0, "parPoints": 2, "parLen": 1, "bubble": false, "tx1": "write", "tx2": "", "prop": "" }, "group": "function" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 91, "name": "", "options": { "value": "hello" }, "group": "text" }, { "id": 5, "name": "", "options": { "tx1": "one", "tx2": "word", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 40, "name": "", "options": { "id": "0", "points": 0, "parPoints": 2, "parLen": 2, "def": false }, "group": "operator" }, { "id": 22, "name": "", "options": { "o": 0, "x": 1, "cond": 2 }, "group": "if" }, { "id": 91, "name": "", "options": { "value": "one word is hello" }, "group": "text" }, { "id": 10, "name": "", "options": { "points": 0, "parPoints": 2, "parLen": 1, "bubble": false, "tx1": "write", "tx2": "", "prop": "" }, "group": "function" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 21, "name": "", "options": {}, "group": "token" }, { "id": 90, "name": "", "options": { "value": "1" }, "group": "number" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 21, "name": "", "options": {}, "group": "token" }, { "id": 90, "name": "", "options": { "value": "3" }, "group": "number" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 91, "name": "", "options": { "value": "all test were false" }, "group": "text" }, { "id": 10, "name": "", "options": { "points": 0, "parPoints": 2, "parLen": 1, "bubble": false, "tx1": "write", "tx2": "", "prop": "" }, "group": "function" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 13, "name": "", "options": { "w": 2, "h": 1, "lvl": 1, "type": 2 }, "group": "block" }, { "id": 91, "name": "", "options": { "value": "quanty is one" }, "group": "text" }, { "id": 10, "name": "", "options": { "points": 0, "parPoints": 2, "parLen": 1, "bubble": false, "tx1": "write", "tx2": "", "prop": "" }, "group": "function" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 13, "name": "", "options": { "w": 2, "h": 1, "lvl": 1, "type": 2 }, "group": "block" }, { "id": 91, "name": "", "options": { "value": "quanty is three" }, "group": "text" }, { "id": 10, "name": "", "options": { "points": 0, "parPoints": 2, "parLen": 1, "bubble": false, "tx1": "write", "tx2": "", "prop": "" }, "group": "function" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 92, "name": "", "options": { "value": "If the condition is true, The expressions in the block are evaluated. If the condition is false, nothing is done.", "width": 8 }, "group": "comment" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 90, "name": "", "options": { "value": "10" }, "group": "number" }, { "id": 4, "name": "", "options": { "tx1": "x", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 40, "name": "", "options": { "id": "4", "points": 0, "parPoints": 2, "parLen": 2, "def": false }, "group": "operator" }, { "id": 22, "name": "", "options": { "o": 1, "x": 3, "cond": 2 }, "group": "if" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 21, "name": "", "options": {}, "group": "token" }, { "id": 90, "name": "", "options": { "value": "2" }, "group": "number" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 90, "name": "", "options": { "value": "3" }, "group": "number" }, { "id": 21, "name": "", "options": {}, "group": "token" }, { "id": 40, "name": "", "options": { "id": "2", "points": 0, "parPoints": 2, "parLen": 2, "def": false }, "group": "operator" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 13, "name": "", "options": { "w": 3, "h": 3, "lvl": 1, "type": 1 }, "group": "block" }, { "id": 4, "name": "", "options": { "tx1": "val", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 94, "name": "", "options": { "points": 2 }, "group": "arrow" }, { "id": 4, "name": "", "options": { "tx1": "x", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 13, "name": "", "options": { "w": 2, "h": 1, "lvl": 1, "type": 2 }, "group": "block" }, { "id": 91, "name": "", "options": { "value": "quanty is two" }, "group": "text" }, { "id": 10, "name": "", "options": { "points": 0, "parPoints": 2, "parLen": 1, "bubble": false, "tx1": "write", "tx2": "", "prop": "" }, "group": "function" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 13, "name": "", "options": { "w": 2, "h": 1, "lvl": 1, "type": 2 }, "group": "block" }, { "id": 91, "name": "", "options": { "value": "quanty is larger than 3" }, "group": "text" }, { "id": 10, "name": "", "options": { "points": 0, "parPoints": 2, "parLen": 1, "bubble": false, "tx1": "write", "tx2": "", "prop": "" }, "group": "function" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 5, "name": "", "options": { "tx1": "one", "tx2": "word", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" }, { "id": 94, "name": "", "options": { "points": 2 }, "group": "arrow" }, { "id": 91, "name": "", "options": { "value": "hi" }, "group": "text" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 10, "name": "", "options": { "points": 0, "parPoints": 3, "parLen": 1, "bubble": false, "tx1": "write", "tx2": "", "prop": "" }, "group": "function" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 92, "name": "", "options": { "value": "Positioning of the case tokens is flexible. All that is required is that they are placed after the opening match token.", "width": 9 }, "group": "comment" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }, { "tokens": [{ "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }, { "id": 0, "name": "", "options": {}, "group": "" }] }], "floats": [], "scopes": [], "vars": { "3": [{ "frame": 0, "blocks": [], "token": { "id": 3, "name": "alpha", "options": { "tx1": "alpha", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" } }, { "frame": 0, "blocks": [], "token": { "id": 3, "name": "beta", "options": { "tx1": "beta", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" } }, { "frame": 0, "blocks": [], "token": { "id": 3, "name": "gamma", "options": { "tx1": "gamma", "tx2": "var", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" } }, { "frame": 0, "blocks": [], "token": { "id": 3, "name": "delta", "options": { "tx1": "delta", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" } }, { "frame": 0, "blocks": [], "token": { "id": 3, "name": "eta", "options": { "tx1": "eta", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" } }], "4": [{ "frame": 0, "blocks": [], "token": { "id": 4, "name": "number", "options": { "tx1": "number", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" } }, { "frame": 0, "blocks": [], "token": { "id": 4, "name": "amount", "options": { "tx1": "amount", "tx2": "of stuff", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" } }, { "frame": 0, "blocks": [], "token": { "id": 4, "name": "count", "options": { "tx1": "count", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" } }, { "frame": 0, "blocks": [], "token": { "id": 4, "name": "ii", "options": { "tx1": "ii", "tx2": "zz", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" } }, { "frame": 0, "blocks": [], "token": { "id": 4, "name": "val", "options": { "tx1": "some", "tx2": "val", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" } }], "5": [{ "frame": 0, "blocks": [], "token": { "id": 5, "name": "text", "options": { "tx1": "text", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" } }, { "frame": 0, "blocks": [], "token": { "id": 5, "name": "detail", "options": { "tx1": "detail", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" } }, { "frame": 0, "blocks": [], "token": { "id": 5, "name": "info", "options": { "tx1": "info", "tx2": "", "bubble": false, "prop": "", "typedot": false, "index": "", "loopKey": false, "loopVal": false }, "group": "var" } }], "6": [{ "frame": 0, "blocks": [], "token": { "id": 6, "name": "moon", "options": { "tx1": "moon", "tx2": "", "type": "planet", "typeGroup": "demo", "bubble": false, "dot": "", "prop": "", "typedot": false, "loopVal": false }, "group": "object" } }, { "frame": 0, "blocks": [], "token": { "id": 6, "name": "sun", "options": { "tx1": "sun", "tx2": "star", "type": "planet", "typeGroup": "demo", "bubble": false, "dot": "", "prop": "", "typedot": false, "loopVal": false }, "group": "object" } }, { "frame": 0, "blocks": [], "token": { "id": 6, "name": "apple", "options": { "tx1": "apple", "tx2": "", "type": "apple", "typeGroup": "demo", "bubble": false, "dot": "", "prop": "", "typedot": false, "loopVal": false }, "group": "object" } }, { "frame": 0, "blocks": [], "token": { "id": 6, "name": "frog", "options": { "tx1": "frog", "tx2": "", "type": "frog", "typeGroup": "demo", "bubble": false, "dot": "", "prop": "", "typedot": false, "loopVal": false }, "group": "object" } }, { "frame": 0, "blocks": [], "token": { "id": 6, "name": "flower", "options": { "tx1": "flower", "tx2": "", "type": "flower", "typeGroup": "demo", "bubble": false, "dot": "", "prop": "", "typedot": false, "loopVal": false }, "group": "object" } }, { "frame": 0, "blocks": [], "token": { "id": 6, "name": "someone", "options": { "tx1": "someone", "tx2": "", "type": "user", "typeGroup": "demo", "bubble": false, "dot": "", "prop": "", "typedot": false, "loopVal": false }, "group": "object" } }, { "frame": 0, "blocks": [], "token": { "id": 6, "name": "spaceship 5", "options": { "tx1": "space", "tx2": "ship 5", "type": "airplane", "typeGroup": "demo", "bubble": false, "dot": "", "prop": "", "typedot": false, "loopVal": false }, "group": "object" } }, { "frame": 0, "blocks": [], "token": { "id": 6, "name": "earth", "options": { "tx1": "earth", "tx2": "", "type": "planet", "typeGroup": "demo", "bubble": false, "dot": "", "prop": "", "typedot": false, "loopVal": false }, "group": "object" } }, { "frame": 0, "blocks": [], "token": { "id": 6, "name": "rocket1", "options": { "tx1": "rocket1", "tx2": "", "type": "airplane", "typeGroup": "demo", "bubble": false, "dot": "", "prop": "", "typedot": false, "loopVal": false }, "group": "object" } }] }, "types": [{ "id": 70, "name": "", "options": { "tx1": "planet", "tx2": "", "type": "planet", "typeGroup": "demo", "def": false, "dot": false, "points": 0 }, "group": "type" }, { "id": 70, "name": "", "options": { "tx1": "apple", "tx2": "", "type": "apple", "typeGroup": "demo", "def": false, "dot": false, "points": 0 }, "group": "type" }, { "id": 70, "name": "", "options": { "tx1": "console", "tx2": "", "type": "console", "typeGroup": "demo", "def": false, "dot": false, "points": 0 }, "group": "type" }, { "id": 70, "name": "", "options": { "tx1": "frog", "tx2": "", "type": "frog", "typeGroup": "demo", "def": false, "dot": false, "points": 0 }, "group": "type" }, { "id": 70, "name": "", "options": { "tx1": "flower", "tx2": "", "type": "flower", "typeGroup": "demo", "def": false, "dot": false, "points": 0 }, "group": "type" }, { "id": 70, "name": "", "options": { "tx1": "user", "tx2": "", "type": "user", "typeGroup": "demo", "def": false, "dot": false, "points": 0 }, "group": "type" }], "cursor": { "x": 26, "y": 28 } };
	exports.code01 = code01;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesUtilInfoJs = __webpack_require__(13);
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	riot.tag2('util', '', 'util,[riot-tag="util"],[data-is="util"]{ width: 6vh; height: 6vh; background-image: url(\'assets/img/util01.svg\'); background-size: 48vh 24vh; }', 'onclick="{onclick}"', function (opts) {
	  var _this = this;
	
	  this.on("update", function () {
	    _this.root.style.backgroundPosition = _storesUtilInfoJs.utilInfo[_this.id].loc.x * -6 + 'vh ' + _storesUtilInfoJs.utilInfo[_this.id].loc.y * -6 + 'vh';
	  });
	
	  this.onclick = function (e) {
	    e.preventUpdate = true;
	    (0, _storesCodeStoreJs.codeDo)({
	      action: 'util',
	      data: { id: _this.id }
	    });
	  };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var utilInfo = {
	  0: {
	    name: "save",
	    loc: { x: 0, y: 0 }
	  },
	
	  1: {
	    name: "load",
	    loc: { x: 1, y: 0 }
	  }
	
	};
	exports.utilInfo = utilInfo;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesPanelStoreJs = __webpack_require__(4);
	
	__webpack_require__(15);
	
	riot.tag2('codepanel', '<code each="{codes}"></code>', 'codepanel,[riot-tag="codepanel"],[data-is="codepanel"]{ position: absolute; left: 8vh; top: 0px; right: 24vh; height: 100vh; background-color: #1b2022; }', '', function (opts) {
	
	  this.codes = _storesPanelStoreJs.panelState.panels;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	var _scrollJs = __webpack_require__(16);
	
	var _scrollJs2 = _interopRequireDefault(_scrollJs);
	
	__webpack_require__(17);
	
	__webpack_require__(40);
	
	__webpack_require__(43);
	
	var _cursorJs = __webpack_require__(44);
	
	var _cursorJs2 = _interopRequireDefault(_cursorJs);
	
	riot.tag2('code', '<div class="codescroll" riot-style="width: {lines[0].tokens.length*56}px;"> <line each="{lines}"></line> </div> <floats></floats> <cursor></cursor>', 'code,[riot-tag="code"],[data-is="code"]{ position: absolute; background-color: #07080a; overflow: auto; } code #floats,[riot-tag="code"] #floats,[data-is="code"] #floats{ position: absolute; overflow: visible; left: 0px; top: 0px; }', 'riot-style="top:{y}%; left:{x}%; width: {w}%; height: {h}%;" onmousedown="{mousedown}" onclick="{click}"', function (opts) {
	  var _this = this;
	
	  this.lines = _storesCodeStoreJs.codeState.lines;
	  this.floats = _storesCodeStoreJs.codeState.floats;
	  var tag = this;
	  _storesCodeStoreJs.signal.on('updateLines', function (lines) {
	    lines.forEach(function (lineNumber) {
	      tag.tags.line[lineNumber].update();
	    });
	  });
	
	  _storesCodeStoreJs.signal.on('updateCursorToken', function () {
	    _this.tags.line[_storesCodeStoreJs.codeState.cursor.y].tags.cell[_storesCodeStoreJs.codeState.cursor.x].update();
	  });
	
	  _storesCodeStoreJs.signal.on('updateToken', function (loc) {
	    _this.tags.line[loc.y].tags.cell[loc.x].update();
	  });
	
	  _storesCodeStoreJs.signal.on('forceUpdateToken', function (loc) {
	    var cell = _this.tags.line[loc.y].tags.cell[loc.x];
	    Object.assign(cell, _storesCodeStoreJs.codeState.lines[loc.y].tokens[loc.x]);
	    for (var tag in cell.tags) {
	      Object.assign(cell.tags[tag], _storesCodeStoreJs.codeState.lines[loc.y].tokens[loc.x]);
	    }
	    cell.update();
	  });
	
	  _storesCodeStoreJs.signal.on('forceUpdateCursorToken', function () {
	    var cell = _this.tags.line[_storesCodeStoreJs.codeState.cursor.y].tags.cell[_storesCodeStoreJs.codeState.cursor.x];
	    Object.assign(cell, _storesCodeStoreJs.codeState.lines[_storesCodeStoreJs.codeState.cursor.y].tokens[_storesCodeStoreJs.codeState.cursor.x]);
	    for (var tag in cell.tags) {
	      Object.assign(cell.tags[tag], _storesCodeStoreJs.codeState.lines[_storesCodeStoreJs.codeState.cursor.y].tokens[_storesCodeStoreJs.codeState.cursor.x]);
	    }
	    cell.update();
	  });
	
	  _storesCodeStoreJs.signal.on('updateCursor', function () {
	    tag.tags.cursor.update();
	  });
	
	  _storesCodeStoreJs.signal.on('updateCode', function () {
	    tag.lines = _storesCodeStoreJs.codeUtil.getLines();
	    tag.update();
	  });
	
	  this.mousedown = function (e) {
	    e.preventUpdate = true;
	    _scrollJs2['default'].start(e);
	    return true;
	  };
	
	  this.click = function (e) {
	    e.preventUpdate = true;
	    if (e.button == 0) _cursorJs2['default'].click(e);
	  };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var scroll = {};
	
	var pos0 = null;
	var scroll0 = {};
	
	scroll.start = function (e) {
	  if (e.buttons != 4) return;
	  e.currentTarget.onmousemove = scroll.move;
	  pos0 = { x: e.clientX, y: e.clientY };
	  scroll0 = { sx: e.currentTarget.scrollLeft, sy: e.currentTarget.scrollTop };
	};
	
	scroll.move = function (e) {
	  if (e.buttons == 4) {
	
	    e.currentTarget.scrollLeft = scroll0.sx + pos0.x - e.clientX;
	    e.currentTarget.scrollTop = scroll0.sy + pos0.y - e.clientY;
	  } else {
	    e.currentTarget.onmousemove = null;
	  }
	};
	
	exports["default"] = scroll;
	module.exports = exports["default"];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	__webpack_require__(18);
	
	riot.tag2('line', '<cell each="{tokens}"></cell>', 'line { display: block; height: 56px; }', '', function (opts) {
	  if (this.tokens.length == 0) {
	    this.root.style.backgroundColor = '#161a2a';
	  }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _dragJs = __webpack_require__(19);
	
	var _dragJs2 = _interopRequireDefault(_dragJs);
	
	__webpack_require__(20);
	
	__webpack_require__(22);
	
	__webpack_require__(23);
	
	__webpack_require__(25);
	
	__webpack_require__(27);
	
	__webpack_require__(28);
	
	__webpack_require__(29);
	
	__webpack_require__(30);
	
	__webpack_require__(31);
	
	__webpack_require__(32);
	
	__webpack_require__(34);
	
	__webpack_require__(35);
	
	__webpack_require__(36);
	
	__webpack_require__(37);
	
	__webpack_require__(38);
	
	__webpack_require__(39);
	
	riot.tag2('cell', '<token if="{group == \'token\'}"></token> <tknvar if="{group == \'var\'}"></tknvar> <tknob if="{group == \'object\'}"></tknob> <tknarr if="{group == \'array\'}"></tknarr> <tknfunc if="{group == \'function\'}"></tknfunc> <tknarrw if="{group == \'arrow\'}"></tknarrw> <tknnum if="{group == \'number\'}"></tknnum> <tkntext if="{group == \'text\'}"></tkntext> <tkncomm if="{group == \'comment\'}"></tkncomm> <tknop if="{group == \'operator\'}"></tknop> <tknloop if="{group == \'loop\'}"></tknloop> <tknif if="{group == \'if\'}"></tknif> <tknpin if="{group == \'pin\'}"></tknpin> <tknflag if="{group == \'flag\'}"></tknflag> <tkntyp if="{group == \'type\'}"></tkntyp> <tknblok if="{group == \'block\'}"></tknblok>', 'cell,[riot-tag="cell"],[data-is="cell"]{ width: 56px; height: 56px; display: inline-block; position: relative; }', 'draggable="true" ondragstart="{dragstart}" ondrop="{drop}" ondragover="{dragover}"', function (opts) {
	  var _this = this;
	
	  this.dragstart = function (e) {
	    e.preventUpdate = true;
	    e.dataTransfer.setData("text/plain", '');
	    _dragJs2['default'].dragStart(e, _this);
	    return true;
	  };
	
	  this.dragover = function (e) {
	    e.preventUpdate = true;
	    return false;
	  };
	
	  this.drop = function (e) {
	    e.preventUpdate = true;
	    _dragJs2['default'].dragEnd(e);
	  };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	var drag = {};
	
	var currentCodeElem = null;
	var currentPanelElem = null;
	var tokenFromLoc = null;
	var mouseGrabDeltaTokenXY = null;
	
	drag.dragStart = function (e, tag) {
	
	  currentCodeElem = e.target.parentElement.parentElement.parentElement;
	  currentPanelElem = currentCodeElem.parentElement;
	
	  var scrollX = currentCodeElem.scrollLeft;
	  var scrollY = currentCodeElem.scrollTop;
	  var offsetX = currentCodeElem.offsetLeft + currentPanelElem.offsetLeft;
	  var offsetY = currentCodeElem.offsetTop + currentPanelElem.offsetTop;
	
	  var x = e.clientX + scrollX - offsetX;
	  var y = e.clientY + scrollY - offsetY;
	
	  tokenFromLoc = { x: Math.floor(x / 56), y: Math.floor(y / 56) };
	  mouseGrabDeltaTokenXY = { x: e.offsetX, y: e.offsetY };
	};
	
	drag.dragEnd = function (e) {
	
	  var scrollX = currentCodeElem.scrollLeft;
	  var scrollY = currentCodeElem.scrollTop;
	  var offsetX = currentCodeElem.offsetLeft + currentPanelElem.offsetLeft;
	  var offsetY = currentCodeElem.offsetTop + currentPanelElem.offsetTop;
	
	  var x = e.clientX + scrollX - offsetX;
	  var y = e.clientY + scrollY - offsetY;
	
	  var xy = { x: x, y: y };
	
	  var toCol = Math.floor((x + 28 - mouseGrabDeltaTokenXY.x) / 56);
	  var toRow = Math.floor((y + 28 - mouseGrabDeltaTokenXY.y) / 56);
	  var toLoc = { x: toCol, y: toRow };
	
	  (0, _storesCodeStoreJs.codeDo)({
	    action: 'moveToken',
	    data: { from: tokenFromLoc, to: toLoc }
	  });
	};
	
	exports['default'] = drag;
	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesCodeInfoJs = __webpack_require__(21);
	
	riot.tag2('token', '', 'token,[riot-tag="token"],[data-is="token"]{ width: 56px; height: 56px; display: inline-block; background-image: url(\'assets/img/tk90.svg\'); background-size: 560px 560px; position: relative; z-index: 10; }', '', function (opts) {
	  var _this = this;
	
	  this.on("update", function () {
	    _this.root.style.backgroundPosition = _storesCodeInfoJs.codeInfo[_this.id].loc.x + 'px ' + _storesCodeInfoJs.codeInfo[_this.id].loc.y + 'px';
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var codeInfo = {
	  0: {
	    name: "",
	    loc: { x: 0, y: 0 }
	  },
	
	  1: {
	    name: "true",
	    loc: { x: -56, y: 0 }
	  },
	
	  2: {
	    name: "false",
	    loc: { x: -112, y: 0 }
	  },
	
	  3: {
	    name: "boolean var",
	    loc: { x: -168, y: 0 }
	  },
	
	  4: {
	    name: "number var",
	    loc: { x: -224, y: 0 }
	  },
	
	  5: {
	    name: "string var",
	    loc: { x: -280, y: 0 }
	  },
	
	  6: {
	    name: "object var",
	    loc: { x: -336, y: 0 }
	  },
	
	  7: {
	    name: "array var",
	    loc: { x: -392, y: 0 }
	  },
	
	  8: {
	    name: "var",
	    loc: { x: -448, y: 0 }
	  },
	
	  10: {
	    name: "function",
	    loc: { x: 0, y: -56 }
	  },
	
	  11: {
	    name: "function",
	    loc: { x: -56, y: -56 }
	  },
	
	  12: {
	    name: "function",
	    loc: { x: -112, y: -56 }
	  },
	
	  13: {
	    name: "block",
	    loc: { x: -168, y: -56 }
	  },
	
	  14: {
	    name: "function definition",
	    loc: { x: -56, y: -56 }
	  },
	
	  15: {
	    name: "function definition",
	    loc: { x: -280, y: -56 }
	  },
	
	  16: {
	    name: "function definition",
	    loc: { x: -336, y: -56 }
	  },
	
	  17: {
	    name: "function definition",
	    loc: { x: -392, y: -56 }
	  },
	
	  18: {
	    name: "block",
	    loc: { x: -112, y: -56 }
	  },
	
	  20: {
	    name: "match",
	    loc: { x: 0, y: -112 }
	  },
	
	  21: {
	    name: "case",
	    loc: { x: -56, y: -112 }
	  },
	
	  22: {
	    name: "if",
	    loc: { x: -112, y: -112 }
	  },
	
	  30: {
	    name: "loop",
	    loc: { x: 0, y: -168 }
	  },
	  31: {
	    name: "key",
	    loc: { x: -56, y: -168 }
	  },
	
	  32: {
	    name: "value",
	    loc: { x: -112, y: -168 }
	  },
	
	  40: {
	    name: "plus",
	    loc: { x: 0, y: -224 }
	  },
	
	  41: {
	    name: "minus",
	    loc: { x: -56, y: -224 }
	  },
	
	  42: {
	    name: "multiplication",
	    loc: { x: -112, y: -224 }
	  },
	
	  43: {
	    name: "division",
	    loc: { x: -168, y: -224 }
	  },
	
	  44: {
	    name: "+1",
	    loc: { x: -224, y: -224 }
	  },
	
	  45: {
	    name: "-1",
	    loc: { x: -280, y: -224 }
	  },
	
	  46: {
	    name: "int division",
	    loc: { x: -336, y: -224 }
	  },
	
	  47: {
	    name: "remainder",
	    loc: { x: -392, y: -224 }
	  },
	
	  50: {
	    name: "equal",
	    loc: { x: 0, y: -280 }
	  },
	
	  51: {
	    name: "greather than",
	    loc: { x: -56, y: -280 }
	  },
	
	  52: {
	    name: "less than",
	    loc: { x: -112, y: -280 }
	  },
	
	  53: {
	    name: "greather than or equal",
	    loc: { x: -168, y: -280 }
	  },
	
	  54: {
	    name: "less than or equal",
	    loc: { x: -224, y: -280 }
	  },
	
	  60: {
	    name: "delete",
	    loc: { x: 0, y: -336 }
	  },
	
	  70: {
	    name: "type tag",
	    loc: { x: 0, y: -392 }
	  },
	
	  71: {
	    name: "option type tag",
	    loc: { x: -56, y: -392 }
	  },
	
	  72: {
	    name: "optional type tag",
	    loc: { x: -112, y: -392 }
	  },
	
	  73: {
	    name: "signal type tag",
	    loc: { x: -168, y: -392 }
	  },
	
	  80: {
	    name: "event",
	    loc: { x: 0, y: -448 }
	  },
	
	  81: {
	    name: "reaction",
	    loc: { x: -56, y: -448 }
	  },
	
	  82: {
	    name: "emition",
	    loc: { x: -112, y: -448 }
	  },
	
	  90: {
	    name: "number",
	    loc: { x: 0, y: -504 }
	  },
	
	  91: {
	    name: "text",
	    loc: { x: -56, y: -504 }
	  },
	
	  92: {
	    name: "comment",
	    loc: { x: -112, y: -504 }
	  },
	
	  93: {
	    name: "connector",
	    loc: { x: -168, y: -504 }
	  },
	
	  94: {
	    name: "assignment",
	    loc: { x: -224, y: -504 }
	  },
	  95: {
	    name: "pin",
	    loc: { x: -280, y: -504 }
	  },
	
	  96: {
	    name: "flag",
	    loc: { x: -336, y: -504 }
	  }
	
	};
	exports.codeInfo = codeInfo;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesCodeInfoJs = __webpack_require__(21);
	
	riot.tag2('tknfunc', '<div id="parBar"></div> <div id="tt0" if="{! options.tx2}">{options.tx1}</div> <div id="tt1" if="{options.tx2}">{options.tx1}</div> <div id="tt2" if="{options.tx2}">{options.tx2}</div> <div id="prop" if="{options.prop}"></div> <div id="bk"></div>', 'tknfunc,[riot-tag="tknfunc"],[data-is="tknfunc"]{ width: 56px; height: 56px; display: inline-block; position: relative; } tknfunc #bk,[riot-tag="tknfunc"] #bk,[data-is="tknfunc"] #bk{ width: 56px; height: 56px; display: block; background-image: url(\'assets/img/tk90.svg\'); background-size: 560px 560px; position: absolute; transform-origin: 28px 34px; z-index: 10; } tknfunc #tt0,[riot-tag="tknfunc"] #tt0,[data-is="tknfunc"] #tt0{ width: 56px; text-align: center; position: absolute; top: 10px; margin: 0; z-index: 10; } tknfunc #tt1,[riot-tag="tknfunc"] #tt1,[data-is="tknfunc"] #tt1{ position: absolute; top: 2px; width: 56px; text-align: center; margin: 0; z-index: 10; } tknfunc #tt2,[riot-tag="tknfunc"] #tt2,[data-is="tknfunc"] #tt2{ position: absolute; width: 56px; text-align: center; top: 12px; margin: 0; z-index: 10; } tknfunc #parBar,[riot-tag="tknfunc"] #parBar,[data-is="tknfunc"] #parBar{ position: absolute; left: 28px; top: 29px; height: 10px; width: 0px; transform-origin: left center; background-color: #163461; z-index: 5; } tknfunc #prop,[riot-tag="tknfunc"] #prop,[data-is="tknfunc"] #prop{ width: 12px; height: 12px; display: block; z-index: 10; position: absolute; left: 11px; top: 28px; border-radius: 50%; transform-origin: 17.2px 6px; }', '', function (opts) {
	  var _this = this;
	
	  this.on("update", function () {
	
	    if (_this.id != 10) return;
	
	    if (_this.options.bubble) _this.bk.style.backgroundPosition = _storesCodeInfoJs.codeInfo[_this.id].loc.x - 56 + 'px ' + _storesCodeInfoJs.codeInfo[_this.id].loc.y + 'px';else _this.bk.style.backgroundPosition = _storesCodeInfoJs.codeInfo[_this.id].loc.x + 'px ' + _storesCodeInfoJs.codeInfo[_this.id].loc.y + 'px';
	
	    _this.bk.style.transform = 'rotate(' + _this.options.points * 90 + 'deg)';
	
	    _this.parBar.style.transform = 'rotate(' + _this.options.parPoints * 90 + 'deg)';
	    _this.parBar.style.width = _this.options.parLen * 56 + 'px';
	
	    _this.prop.style.backgroundColor = _this.options.prop;
	    _this.prop.style.transform = 'rotate(' + _this.options.points * 90 + 'deg)';
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _resInfoTokenChartJs = __webpack_require__(24);
	
	var _resInfoTokenChartJs2 = _interopRequireDefault(_resInfoTokenChartJs);
	
	riot.tag2('tknvar', '<div id="prop" if="{options.prop}"></div> <div id="typdot" if="{options.typedot}"></div> <div id="ix" if="{options.index}"></div> <div id="tt0" if="{! options.tx2}">{options.tx1}</div> <div id="tt1" if="{options.tx2}">{options.tx1}</div> <div id="tt2" if="{options.tx2}">{options.tx2}</div> <div id="bk"></div> <div id="flag" if="{options.flag}"></div> <div id="key" if="{options.loopKey}"></div> <div id="val" if="{options.loopVal}"></div> <div class="varbubble" if="{options.bubble}"></div>', 'tknvar,[riot-tag="tknvar"],[data-is="tknvar"]{ width: 56px; height: 56px; display: block; position: absolute; } tknvar #bk,[riot-tag="tknvar"] #bk,[data-is="tknvar"] #bk{ width: 100%; height: 100%; display: block; background-size: 100% 100%; z-index: 10; position: absolute; } tknvar #tt0,[riot-tag="tknvar"] #tt0,[data-is="tknvar"] #tt0{ width: 100%; text-align: center; position: absolute; top: 18%; z-index: 10; } tknvar #tt1,[riot-tag="tknvar"] #tt1,[data-is="tknvar"] #tt1{ position: absolute; top: 3%; width: 100%; text-align: center; z-index: 10; } tknvar #tt2,[riot-tag="tknvar"] #tt2,[data-is="tknvar"] #tt2{ position: absolute; width: 100%; text-align: center; top: 22%; z-index: 10; } tknvar .varbubble,[riot-tag="tknvar"] .varbubble,[data-is="tknvar"] .varbubble{ position: absolute; left: -5px; top: -5px; width: 66px; height: 66px; z-index: 4; background: url(\'assets/img/varbubble.svg\'); background-size: 66px 66px; } tknvar #prop,[riot-tag="tknvar"] #prop,[data-is="tknvar"] #prop{ width: 21.875%; height: 21.875%; display: block; z-index: 10; position: absolute; left: 18.75%; top: 55.46875%; border-radius: 50%; } tknvar #typdot,[riot-tag="tknvar"] #typdot,[data-is="tknvar"] #typdot{ width: 9.375%; height: 9.375%; display: block; z-index: 10; position: absolute; left: 14.0625%; top: 48.4375%; border-radius: 50%; background-color: #518093; } tknvar #ix,[riot-tag="tknvar"] #ix,[data-is="tknvar"] #ix{ width: 14.0625%; height: 14.0625%; display: block; z-index: 10; position: absolute; left: 73.4375%; top: 59.375%; border-radius: 50%; } tknvar #key,[riot-tag="tknvar"] #key,[data-is="tknvar"] #key{ position: absolute; left: 18px; top: 15px; width: 20px; height: 10px; z-index: 10; background: url(\'assets/img/tokens/loopkey.svg\'); background-size: 100% 100%; } tknvar #val,[riot-tag="tknvar"] #val,[data-is="tknvar"] #val{ position: absolute; left: 18px; top: 15px; width: 20px; height: 9.8px; z-index: 10; background: url(\'assets/img/tokens/loopval.svg\'); background-size: 100% 100%; }', '', function (opts) {
	  var _this = this;
	
	  this.id = 3;
	  this.on("update", function () {
	    if (_this.id < 3 || _this.id > 5) return;
	    _this.bk.style.backgroundImage = _resInfoTokenChartJs2['default'][_this.id].img;
	    _this.prop.style.backgroundColor = _this.options.prop;
	
	    if (_this.id == 4) _this.ix.style.backgroundColor = _this.options.index;
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var path = 'assets/img/tokens/';
	var tokenChart = {
	
	  3: {
	    name: 'bool',
	    img: 'url(' + path + 'bool.svg)'
	  },
	  4: {
	    name: 'number',
	    img: 'url(' + path + 'num.svg)'
	  },
	  5: {
	    name: 'text',
	    img: 'url(' + path + 'tex.svg)'
	  }
	
	};
	exports['default'] = tokenChart;
	module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _utilsUtilJs = __webpack_require__(26);
	
	riot.tag2('tknob', '<div id="dot" if="{options.dot}"></div> <div id="prop" if="{options.prop}"></div> <div id="typdot" if="{options.typedot}"></div> <div id="tt0" if="{! options.tx2}">{options.tx1}</div> <div id="tt1" if="{options.tx2}">{options.tx1}</div> <div id="tt2" if="{options.tx2}">{options.tx2}</div> <div id="bk"></div> <div id="type" if="{options.typeGroup}"></div> <div id="val" if="{options.loopVal}"></div> <div class="varbubble" if="{options.bubble}"></div>', 'tknob,[riot-tag="tknob"],[data-is="tknob"]{ width: 56px; height: 56px; display: block; position: absolute; } tknob #bk,[riot-tag="tknob"] #bk,[data-is="tknob"] #bk{ width: 100%; height: 100%; display: block; background-image: url(\'assets/img/tokens/ob.svg\'); background-size: 100% 100%; z-index: 10; position: absolute; } tknob #type,[riot-tag="tknob"] #type,[data-is="tknob"] #type{ width: 53.125%; height: 46.875%; left: 23.4375%; top: 42.1875%; display: block; background-size: 100% 100%; z-index: 11; position: absolute; } tknob #dot,[riot-tag="tknob"] #dot,[data-is="tknob"] #dot{ width: 25%; height: 25%; display: block; z-index: 10; position: absolute; left: 64.0625%; top: 53.125%; border-radius: 50%; } tknob #prop,[riot-tag="tknob"] #prop,[data-is="tknob"] #prop{ width: 25%; height: 25%; display: block; z-index: 10; position: absolute; left: 10.9375%; top: 53.125%; border-radius: 50%; } tknob #typdot,[riot-tag="tknob"] #typdot,[data-is="tknob"] #typdot{ width: 9.375%; height: 9.375%; display: block; z-index: 10; position: absolute; left: 10.9375%; top: 42.1875%; border-radius: 50%; background-color: #518093; } tknob #tt0,[riot-tag="tknob"] #tt0,[data-is="tknob"] #tt0{ width: 100%; text-align: center; position: absolute; top: 18%; z-index: 10; } tknob #tt1,[riot-tag="tknob"] #tt1,[data-is="tknob"] #tt1{ position: absolute; top: 3%; width: 100%; text-align: center; z-index: 10; } tknob #tt2,[riot-tag="tknob"] #tt2,[data-is="tknob"] #tt2{ position: absolute; width: 100%; text-align: center; top: 22%; z-index: 10; } tknob .varbubble,[riot-tag="tknob"] .varbubble,[data-is="tknob"] .varbubble{ position: absolute; left: -10%; top: -10%; width: 120%; height: 120%; z-index: 4; background: url(\'assets/img/tokens/varbubble.svg\'); background-size: 100% 100%; } tknob #val,[riot-tag="tknob"] #val,[data-is="tknob"] #val{ position: absolute; left: 18px; top: 12px; width: 20px; height: 9.8px; z-index: 10; background: url(\'assets/img/tokens/loopval.svg\'); background-size: 100% 100%; }', '', function (opts) {
	  var _this = this;
	
	  this.on('update', function () {
	    if (_this.id != 6) return;
	
	    if (_this.options.typeGroup) {
	      _this.type.style.backgroundImage = (0, _utilsUtilJs.getType)(_this.options);
	    }
	
	    _this.dot.style.backgroundColor = _this.options.dot;
	    _this.prop.style.backgroundColor = _this.options.prop;
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var getType = function getType(options) {
	  return 'url(types/' + options.typeGroup + '/' + options.type + '.svg)';
	};
	exports.getType = getType;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	riot.tag2('tknarr', '<div id="parBar"></div> <div id="prop" if="{options.prop}"></div> <div id="typdot" if="{options.typedot}"></div> <div id="dot" if="{options.dot}"></div> <div id="ix" if="{options.index}"></div> <div id="tt0" if="{! options.tx2}">{options.tx1}</div> <div id="tt1" if="{options.tx2}">{options.tx1}</div> <div id="tt2" if="{options.tx2}">{options.tx2}</div> <div id="bk"></div> <div id="type" if="{options.typeGroup}"></div> <div id="val" if="{options.loopVal}"></div> <div class="varbubble" if="{options.bubble}"></div>', 'tknarr,[riot-tag="tknarr"],[data-is="tknarr"]{ width: 56px; height: 56px; display: block; position: absolute; } tknarr #bk,[riot-tag="tknarr"] #bk,[data-is="tknarr"] #bk{ width: 100%; height: 100%; display: block; background-image: url(\'assets/img/tokens/arr.svg\'); background-size: 100% 100%; z-index: 10; position: absolute; } tknarr #type,[riot-tag="tknarr"] #type,[data-is="tknarr"] #type{ width: 53.125%; height: 46.875%; left: 23.4375%; top: 42.1875%; display: block; background-size: 100% 100%; z-index: 11; position: absolute; } tknarr #tt0,[riot-tag="tknarr"] #tt0,[data-is="tknarr"] #tt0{ width: 56px; text-align: center; position: absolute; top: 10px; z-index: 10; } tknarr #tt1,[riot-tag="tknarr"] #tt1,[data-is="tknarr"] #tt1{ position: absolute; top: 2px; width: 56px; text-align: center; z-index: 10; } tknarr #tt2,[riot-tag="tknarr"] #tt2,[data-is="tknarr"] #tt2{ position: absolute; width: 56px; text-align: center; top: 12px; z-index: 10; } tknarr .varbubble,[riot-tag="tknarr"] .varbubble,[data-is="tknarr"] .varbubble{ position: absolute; left: -10%; top: -10%; width: 120%; height: 120%; z-index: 4; background: url(\'assets/img/tokens/varbubble.svg\'); background-size: 100% 100%; } tknarr #prop,[riot-tag="tknarr"] #prop,[data-is="tknarr"] #prop{ width: 25%; height: 25%; display: block; z-index: 10; position: absolute; left: 4.6875%; top: 53.125%; border-radius: 50%; } tknarr #typdot,[riot-tag="tknarr"] #typdot,[data-is="tknarr"] #typdot{ width: 9.375%; height: 9.375%; display: block; z-index: 10; position: absolute; left: 4.6875%; top: 42.1875%; border-radius: 50%; background-color: #518093; } tknarr #ix,[riot-tag="tknarr"] #ix,[data-is="tknarr"] #ix{ width: 25%; height: 25%; display: block; z-index: 10; position: absolute; left: 64.0625%; top: 53.125%; border-radius: 50%; } tknarr #dot,[riot-tag="tknarr"] #dot,[data-is="tknarr"] #dot{ width: 12.5%; height: 25%; display: block; z-index: 10; position: absolute; left: 85.9375%; top: 53.125%; border-radius: 0 8px 8px 0; } tknarr #parBar,[riot-tag="tknarr"] #parBar,[data-is="tknarr"] #parBar{ position: absolute; left: 28px; top: 34px; height: 10px; width: 0px; transform-origin: left center; background-color: #07403f; z-index: 5; } tknarr #val,[riot-tag="tknarr"] #val,[data-is="tknarr"] #val{ position: absolute; left: 18px; top: 13px; width: 20px; height: 9.8px; z-index: 10; background: url(\'assets/img/tokens/loopval.svg\'); background-size: 100% 100%; }', '', function (opts) {
	  var _this = this;
	
	  this.on('update', function () {
	    if (_this.id != 7) return;
	
	    if (_this.options.typeGroup) {
	      _this.type.style.backgroundImage = getType(_this.options);
	    }
	
	    _this.prop.style.backgroundColor = _this.options.prop;
	    _this.ix.style.backgroundColor = _this.options.index;
	    _this.dot.style.backgroundColor = _this.options.dot;
	
	    _this.parBar.style.transform = 'rotate(' + _this.options.parPoints * 90 + 'deg)';
	    _this.parBar.style.width = _this.options.parLen * 56 + 'px';
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	var _storesCodeInfoJs = __webpack_require__(21);
	
	riot.tag2('tknarrw', '', 'tknarrw,[riot-tag="tknarrw"],[data-is="tknarrw"]{ width: 56px; height: 56px; display: block; position: absolute; display: block; background-image: url(\'assets/img/tk90.svg\'); background-size: 560px 560px; z-index: 10; transform-origin: 28px 34px; }', '', function (opts) {
	  var _this = this;
	
	  this.on("update", function () {
	    if (_this.id != 94) return;
	    _this.root.style.backgroundPosition = _storesCodeInfoJs.codeInfo[_this.id].loc.x + 'px ' + _storesCodeInfoJs.codeInfo[_this.id].loc.y + 'px';
	    _this.root.style.transform = 'rotate(' + _this.options.points * 90 + 'deg)';
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	riot.tag2('tknnum', '<div id="tt0">{options.value}</div>', 'tknnum,[riot-tag="tknnum"],[data-is="tknnum"]{ width: 56px; height: 56px; display: block; position: absolute; display: flex; justify-content: center; align-items: center; flex-direction: row; z-index: 10; padding: 9px 0px 0px; box-sizing: padding-box; } tknnum #tt0,[riot-tag="tknnum"] #tt0,[data-is="tknnum"] #tt0{ max-width: 48px; line-height: 98%; color: #00f46e; word-wrap: break-word; text-align: right; }', '', function (opts) {
	  var _this = this;
	
	  this.on("update", function () {
	    if (_this.id != 90) return;
	    var length = _this.options.value.toString().length;
	    var size = 280;
	    if (length == 3) size = 210;else if (length >= 4 && length <= 6) size = 200;else if (length >= 7 && length <= 15) size = 130;else if (length > 15) size = 100;
	
	    _this.tt0.style.fontSize = size + '%';
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	riot.tag2('tkntext', '<div id="tt0">{options.value}</div>', 'tkntext,[riot-tag="tkntext"],[data-is="tkntext"]{ width: 56px; height: 56px; display: block; position: absolute; display: flex; justify-content: center; align-items: center; flex-direction: row; z-index: 10; padding: 6px 0px 0px; box-sizing: padding-box; } tkntext #tt0,[riot-tag="tkntext"] #tt0,[data-is="tkntext"] #tt0{ max-width: 48px; max-height: 42px; line-height: 98%; color: #ffdc92; word-wrap: break-word; overflow: hidden; }', '', function (opts) {
	  var _this = this;
	
	  this.on("update", function () {
	    if (_this.id != 91) return;
	    var length = _this.options.value.toString().length;
	    var size = 280;
	    if (length == 3) size = 210;else if (length >= 4 && length <= 6) size = 200;else if (length >= 7 && length <= 15) size = 130;else if (length > 15) size = 100;
	
	    _this.tt0.style.fontSize = size + '%';
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	riot.tag2('tkncomm', '<div id="tt0">{options.value}</div>', 'tkncomm,[riot-tag="tkncomm"],[data-is="tkncomm"]{ width: 56px; height: 56px; display: block; position: absolute; z-index: 10; } tkncomm #tt0,[riot-tag="tkncomm"] #tt0,[data-is="tkncomm"] #tt0{ position: absolute; top: 1px; max-height: 56px; color: #32446c; word-wrap: normal; font-size: 140%; }', '', function (opts) {
	  var _this = this;
	
	  this.on("update", function () {
	    if (_this.id != 92) return;
	    _this.tt0.style.width = 56 * _this.options.width + 'px';
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _resInfoOpChartJs = __webpack_require__(33);
	
	var _resInfoOpChartJs2 = _interopRequireDefault(_resInfoOpChartJs);
	
	riot.tag2('tknop', '<div id="parBar"></div> <div id="bk"></div> <div id="points" if="{!this.options.def}"></div>', 'tknop,[riot-tag="tknop"],[data-is="tknop"]{ width: 56px; height: 56px; display: inline-block; position: absolute; } tknop #bk,[riot-tag="tknop"] #bk,[data-is="tknop"] #bk{ width: 100%; height: 100%; display: block; background-size: 100% 100%; position: absolute; transform-origin: 28px 34px; z-index: 10; } tknop #points,[riot-tag="tknop"] #points,[data-is="tknop"] #points{ width: 100%; height: 100%; display: block; background-size: 100% 100%; position: absolute; background-image: url(\'assets/img/tokens/op/points.svg\'); transform-origin: 28px 34px; z-index: 10; } tknop #parBar,[riot-tag="tknop"] #parBar,[data-is="tknop"] #parBar{ position: absolute; left: 28px; top: 29px; height: 10px; width: 0px; transform-origin: left center; background-color: #092907; z-index: 5; }', '', function (opts) {
	  var _this = this;
	
	  this.on("update", function () {
	
	    if (_this.id != 40) return;
	
	    _this.bk.style.backgroundImage = 'url(' + _resInfoOpChartJs2['default'].path + _resInfoOpChartJs2['default'][_this.options.id].img + ')';
	
	    _this.points.style.transform = 'rotate(' + _this.options.points * 90 + 'deg)';
	    _this.parBar.style.transform = 'rotate(' + _this.options.parPoints * 90 + 'deg)';
	    _this.parBar.style.width = _this.options.parLen * 56 + 'px';
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var opChart = {
	
	  path: 'assets/img/tokens/op/',
	
	  0: {
	    name: 'equal',
	    img: 'eq.svg'
	  },
	  1: {
	    name: 'not equal',
	    img: 'neq.svg'
	  },
	  2: {
	    name: 'greather than',
	    img: 'great.svg'
	  },
	  3: {
	    name: 'less than',
	    img: 'less.svg'
	  },
	  4: {
	    name: 'greather or equal',
	    img: 'greateq.svg'
	  },
	  5: {
	    name: 'less or equal',
	    img: 'lesseq.svg'
	  },
	
	  20: {
	    name: 'plus',
	    img: 'plus.svg'
	  },
	  21: {
	    name: 'minus',
	    img: 'min.svg'
	  },
	  22: {
	    name: 'multiply',
	    img: 'mult.svg'
	  },
	  23: {
	    name: 'divide',
	    img: 'div.svg'
	  },
	  24: {
	    name: 'modulo',
	    img: 'mod.svg'
	  },
	
	  30: {
	    name: '+1',
	    img: '+1.svg'
	  },
	  31: {
	    name: '-1',
	    img: '-1.svg'
	  }
	};
	exports['default'] = opChart;
	module.exports = exports['default'];

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	riot.tag2('tknloop', '<div id="parBar"></div> <div id="bk"></div>', 'tknloop,[riot-tag="tknloop"],[data-is="tknloop"]{ width: 56px; height: 56px; display: inline-block; position: relative; } tknloop #bk,[riot-tag="tknloop"] #bk,[data-is="tknloop"] #bk{ width: 56px; height: 56px; display: block; background-image: url(\'assets/img/tk90.svg\'); background-size: 560px 560px; background-position: 0px -168px; position: absolute; z-index: 10; } tknloop #parBar,[riot-tag="tknloop"] #parBar,[data-is="tknloop"] #parBar{ position: absolute; left: 28px; top: 33px; height: 8px; width: 0px; transform-origin: left center; background-color: #22060d; z-index: 5; }', '', function (opts) {
	  var _this = this;
	
	  this.on("update", function () {
	
	    if (_this.id != 30) return;
	
	    _this.parBar.style.transform = 'rotate(' + _this.options.parPoints * 90 + 'deg)';
	    _this.parBar.style.width = _this.options.parLen * 56 + 'px';
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	riot.tag2('tknif', '<div id="ifcond"></div> <div id="ifo"></div> <div id="ifx"></div>', 'tknif,[riot-tag="tknif"],[data-is="tknif"]{ width: 56px; height: 56px; display: block; position: absolute; background-image: url(\'assets/img/tokens/if.svg\'); background-size: 100% 100%; z-index: 10; } tknif #ifcond,[riot-tag="tknif"] #ifcond,[data-is="tknif"] #ifcond{ width: 56px; height: 56px; display: block; position: absolute; background-image: url(\'assets/img/tokens/ifcond.svg\'); background-size: 100% 100%; z-index: 10; transform-origin: 28px 33.3px; } tknif #ifo,[riot-tag="tknif"] #ifo,[data-is="tknif"] #ifo{ width: 56px; height: 56px; display: block; position: absolute; background-image: url(\'assets/img/tokens/ifo.svg\'); background-size: 100% 100%; z-index: 10; transform-origin: 28px 33.3px; } tknif #ifx,[riot-tag="tknif"] #ifx,[data-is="tknif"] #ifx{ width: 56px; height: 56px; display: block; position: absolute; background-image: url(\'assets/img/tokens/ifx.svg\'); background-size: 100% 100%; z-index: 10; transform-origin: 28px 33.3px; }', '', function (opts) {
	  var _this = this;
	
	  this.on("update", function () {
	    if (_this.id != 22) return;
	    _this.ifcond.style.transform = 'rotate(' + _this.options.cond * 90 + 'deg)';
	    _this.ifo.style.transform = 'rotate(' + _this.options.o * 90 + 'deg)';
	    _this.ifx.style.transform = 'rotate(' + _this.options.x * 90 + 'deg)';
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	riot.tag2('tknpin', '<div id="pinbubble" if="{options.bubble}"></div> <div id="pinpoint"></div> <div id="pin"></div>', 'tknpin,[riot-tag="tknpin"],[data-is="tknpin"]{ display: block; width: 56px; height: 56px; z-index: 10; } tknpin #pin,[riot-tag="tknpin"] #pin,[data-is="tknpin"] #pin{ width: 43.75%; height: 43.75%; display: block; position: absolute; left: 28.125%; top: 40.625%; background-color: #048c5d; border-radius: 50%; } tknpin #pinpoint,[riot-tag="tknpin"] #pinpoint,[data-is="tknpin"] #pinpoint{ width: 12.5%; height: 12.5%; display: block; position: absolute; left: 75%; top: 56.25%; background-color: #048c5d; transform-origin: -13.5px 4px; border-radius: 50%; } tknpin #pinbubble,[riot-tag="tknpin"] #pinbubble,[data-is="tknpin"] #pinbubble{ width: 72%; height: 72%; display: block; position: absolute; left: 14.6%; top: 26.625%; background-color: #048c5d; border-radius: 50%; filter: brightness(0.4); webkit-filter: brightness(0.4); }', '', function (opts) {
	  var _this = this;
	
	  this.on("update", function () {
	    if (_this.id != 95) return;
	    _this.pinpoint.style.transform = 'rotate(' + _this.options.points * 90 + 'deg)';
	
	    _this.pin.style.backgroundColor = _this.options.color;
	    _this.pinpoint.style.backgroundColor = _this.options.color;
	    _this.pinbubble.style.backgroundColor = _this.options.color;
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	riot.tag2('tknflag', '<div id="flagpoint"></div>', 'tknflag,[riot-tag="tknflag"],[data-is="tknflag"]{ display: block; width: 56px; height: 56px; z-index: 10; position: absolute; background-image: url(\'assets/img/tokens/flag.svg\'); background-size: 100% 100%; } tknflag #flagpoint,[riot-tag="tknflag"] #flagpoint,[data-is="tknflag"] #flagpoint{ width: 56px; height: 56px; display: block; position: absolute; background-image: url(\'assets/img/tokens/flagpoint.svg\'); background-size: 100% 100%; transform-origin: 28px 36.8px; }', '', function (opts) {
	  var _this = this;
	
	  this.on("update", function () {
	    if (_this.id != 96) return;
	    _this.flagpoint.style.transform = 'rotate(' + _this.options.points * 90 + 'deg)';
	    _this.root.style.filter = 'hue-rotate(' + _this.options.color + 'deg)';
	    _this.root.style.webkitFilter = 'hue-rotate(' + _this.options.color + 'deg)';
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesCodeInfoJs = __webpack_require__(21);
	
	var _utilsUtilJs = __webpack_require__(26);
	
	riot.tag2('tkntyp', '<div id="tt0t" if="{! options.tx2}">{options.tx1}</div> <div id="tt1t" if="{options.tx2}">{options.tx1}</div> <div id="tt2t" if="{options.tx2}">{options.tx2}</div> <div id="bk"></div> <div id="type" if="{options.typeGroup}"></div> <div id="dotpoint" if="{options.dot}"></div>', 'tkntyp,[riot-tag="tkntyp"],[data-is="tkntyp"]{ width: 56px; height: 56px; display: block; position: absolute; color: #2696c1; } tkntyp #bk,[riot-tag="tkntyp"] #bk,[data-is="tkntyp"] #bk{ width: 100%; height: 100%; display: block; background-image: url(\'assets/img/tokens/typ.svg\'); background-size: 100% 100%; z-index: 10; position: absolute; } tkntyp #tt0t,[riot-tag="tkntyp"] #tt0t,[data-is="tkntyp"] #tt0t{ width: 100%; text-align: center; position: absolute; top: 18%; z-index: 10; } tkntyp #tt1t,[riot-tag="tkntyp"] #tt1t,[data-is="tkntyp"] #tt1t{ position: absolute; top: 3%; width: 100%; text-align: center; z-index: 10; } tkntyp #tt2t,[riot-tag="tkntyp"] #tt2t,[data-is="tkntyp"] #tt2t{ position: absolute; width: 100%; text-align: center; top: 22%; z-index: 10; } tkntyp #type,[riot-tag="tkntyp"] #type,[data-is="tkntyp"] #type{ width: 53.125%; height: 46.875%; left: 23.4375%; top: 42.1875%; display: block; background-size: 100% 100%; z-index: 11; position: absolute; } tkntyp #dotpoint,[riot-tag="tkntyp"] #dotpoint,[data-is="tkntyp"] #dotpoint{ width: 12.5%; height: 25%; display: block; background-image: url(\'assets/img/tokens/dot.svg\'); background-size: 100% 100%; z-index: 10; position: absolute; }', '', function (opts) {
	  var _this = this;
	
	  this.on("update", function () {
	    if (_this.id < 70 || _this.id > 73) return;
	    switch (_this.options.points) {
	      case 0:
	        _this.dotpoint.style.transform = 'translate3d(53px, 30px, 0px)';
	        break;
	      case 1:
	        _this.dotpoint.style.transform = 'translateX(24px) translateY(51px) rotate(90deg)';
	        break;
	      case 2:
	        _this.dotpoint.style.transform = 'translateX(-4px) translateY(30px) rotate(180deg)';
	        break;
	      case 3:
	        _this.dotpoint.style.transform = 'translateX(24px) translateY(-7px) rotate(270deg)';
	        break;
	    }
	    if (_this.options.typeGroup) {
	      _this.type.style.backgroundImage = (0, _utilsUtilJs.getType)(_this.options);
	    }
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	var _storesCodeInfoJs = __webpack_require__(21);
	
	riot.tag2('tknblok', '<div id="bar"></div> <div id="block"></div>', 'tknblok,[riot-tag="tknblok"],[data-is="tknblok"]{ width: 56px; height: 56px; display: block; position: absolute; display: block; } tknblok #bar,[riot-tag="tknblok"] #bar,[data-is="tknblok"] #bar{ position: absolute; left: 37.5%; top: 0; width: 25%; height: 100%; z-index: 10; } tknblok #block,[riot-tag="tknblok"] #block,[data-is="tknblok"] #block{ position: absolute; left: 100%; top: 0; width: 100%; height: 100%; background-color: #0c1018; }', '', function (opts) {
	  var _this = this;
	
	  var barColor = '';
	
	  this.on("update", function () {
	    if (_this.id != 13) return;
	    _this.bar.style.height = 56 * _this.options.h + 'px';
	    _this.block.style.width = 100 * _this.options.w + '%';
	    _this.block.style.height = 100 * _this.options.h + '%';
	    switch (_this.options.lvl) {
	      case 1:
	        _this.block.style.backgroundColor = '#0d121b';
	        _this.block.style.zIndex = 1;
	        break;
	      case 2:
	        _this.block.style.backgroundColor = '#151c27';
	        _this.block.style.zIndex = 2;
	        break;
	      case 3:
	        _this.block.style.backgroundColor = '#1b2331';
	        _this.block.style.zIndex = 3;
	        break;
	      case 4:
	        _this.block.style.backgroundColor = '#212b3b';
	        _this.block.style.zIndex = 4;
	        break;
	    }
	
	    switch (_this.options.type) {
	      case 0:
	        barColor = '#0c1d37';break;
	      case 1:
	        barColor = '#2d0050';break;
	      case 2:
	        barColor = '#431f44';break;
	      case 3:
	        _this.setLoopBar();break;
	    }
	    _this.bar.style.backgroundColor = barColor;
	  });
	
	  this.setLoopBar = function () {
	    _this.bar.style.backgroundColor = '';
	    _this.bar.style.borderColor = '#390b15';
	    _this.bar.style.borderStyle = 'solid';
	    _this.bar.style.borderWidth = '8px';
	    _this.bar.style.borderRadius = '16px';
	    _this.bar.style.left = '12px';
	    _this.bar.style.height = 56 * _this.options.h - 16 + 'px';
	  };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	__webpack_require__(41);
	
	riot.tag2('floats', '<float each="{floats}"></float>', '', '', function (opts) {
	  var _this = this;
	
	  this.floats = _storesCodeStoreJs.codeState.floats;
	
	  _storesCodeStoreJs.signal.on('floatsUpdate', function () {
	    _this.update();
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	__webpack_require__(42);
	
	riot.tag2('float', '<floattoken each="{floatTokens}"></floattoken> <div id="cover" riot-style="width:{w*56}px; height:{h*56}px;"></div>', 'float,[riot-tag="float"],[data-is="float"]{ position: absolute; background-color: rgba(10,100,10,.85); } float token,[riot-tag="float"] token,[data-is="float"] token{ position: absolute; } float #cover,[riot-tag="float"] #cover,[data-is="float"] #cover{ background-color: rgba(40,180,40,.05); position: absolute; }', 'riot-style="top: {y}px; left: {x}px; width:{w*56}px; height:{h*56}px;"', function (opts) {});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	__webpack_require__(20);
	
	riot.tag2('floattoken', '<token></token>', 'floattoken,[riot-tag="floattoken"],[data-is="floattoken"]{ position: absolute; }', 'riot-style="left: {x*56}px; top:{y*56}px;"', function (opts) {});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	riot.tag2('cursor', '', 'cursor,[riot-tag="cursor"],[data-is="cursor"]{ width: 56px; height: 56px; position: absolute; display: block; box-sizing: border-box; border: 2px solid #1292ff; border-style: solid none; z-index: 100; animation: .5s linear 0s infinite alternate cursorcolor; } @keyframes cursorcolor { from { border-color: #00007a; } to { border-color: #0069e7; } }', '', function (opts) {
	  var _this = this;
	
	  this.on('update', function () {
	    _this.x = _storesCodeStoreJs.codeState.cursor.x;
	    _this.y = _storesCodeStoreJs.codeState.cursor.y;
	    _this.root.style.left = _this.x * 56 + 'px';
	    _this.root.style.top = _this.y * 56 + 'px';
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	var _storesPanelStoreJs = __webpack_require__(4);
	
	var _keysJs = __webpack_require__(45);
	
	var _keysJs2 = _interopRequireDefault(_keysJs);
	
	var cursor = {};
	
	cursor.click = function (e) {
	
	  var currentCodeElem = e.currentTarget;
	  var currentPanelElem = currentCodeElem.parentElement;
	
	  var scrollX = currentCodeElem.scrollLeft;
	  var scrollY = currentCodeElem.scrollTop;
	  var offsetX = currentCodeElem.offsetLeft + currentPanelElem.offsetLeft;
	  var offsetY = currentCodeElem.offsetTop + currentPanelElem.offsetTop;
	
	  var x = Math.floor((e.clientX + scrollX - offsetX) / 56);
	  var y = Math.floor((e.clientY + scrollY - offsetY) / 56);
	
	  (0, _storesCodeStoreJs.codeDo)({
	    action: 'moveCursor',
	    data: { x: x, y: y }
	  });
	};
	
	_keysJs2['default'].on('arrow', function (e) {
	  e.preventDefault();
	  switch (e.code) {
	    case 'ArrowUp':
	      (0, _storesCodeStoreJs.codeDo)({ action: 'moveCursorUp' });
	      break;
	    case 'ArrowDown':
	      (0, _storesCodeStoreJs.codeDo)({ action: 'moveCursorDown' });
	      break;
	    case 'ArrowLeft':
	      (0, _storesCodeStoreJs.codeDo)({ action: 'moveCursorLeft' });
	      break;
	    case 'ArrowRight':
	      (0, _storesCodeStoreJs.codeDo)({ action: 'moveCursorRight' });
	      break;
	  }
	
	  cursor.scroll();
	});
	
	cursor.scroll = function () {
	
	  //var cur = document.getElementsByTagName("cursor")[0]
	  //cur.scrollIntoView() too rough scrolling on chrome
	
	  var cursorLoc = { x: _storesCodeStoreJs.codeState.cursor.x * 56, y: _storesCodeStoreJs.codeState.cursor.y * 56 };
	  var code = document.getElementsByTagName('code')[_storesPanelStoreJs.panelState.active];
	
	  var size = { w: code.clientWidth, h: code.clientHeight };
	  var scroll = { l: code.scrollLeft, t: code.scrollTop };
	
	  if (cursorLoc.x - 56 < scroll.l) code.scrollLeft = cursorLoc.x - 56;
	  if (cursorLoc.x + 112 > scroll.l + size.w) code.scrollLeft = cursorLoc.x + 112 - size.w;
	  if (cursorLoc.y - 56 < scroll.t) code.scrollTop = cursorLoc.y - 56;
	  if (cursorLoc.y + 112 > scroll.t + size.h) code.scrollTop = cursorLoc.y + 112 - size.h;
	};
	
	exports['default'] = cursor;
	module.exports = exports['default'];

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	/*
	var keymap = {
	  ArrowUp: 'code',
	  ArrowDown: 'code',
	  ArrowLeft: 'code',
	  ArrowRight: 'code',
	  Space: 'here',
	  Enter: 'here',
	  NumpadEnter: 'here'
	}
	
	var code = ''
	
	window.onkeydown = function( e ) {
	  code = e.code
	  if ( keymap[ code ] )
	    keys[ keymap[ code ] ] ( e )
	}
	
	
	var keys = {}
	
	keys.code = ( e ) => {
	
	}
	
	keys.here = ( e ) => {
	  code = e.code
	  if ( code == 'Space') {
	      toolbarDo({ action: 'openVarkit' })
	  }
	
	  if ( code == 'Enter' || code == 'NumpadEnter' ) {
	    toolbarDo({ action: 'varkitVisible' })
	  }
	}
	*/
	var keySource = riot.observable();
	exports['default'] = keySource;
	
	var code;
	window.onkeydown = function (e) {
	  code = e.code;
	  switch (code) {
	    case 'ArrowUp':
	    case 'ArrowDown':
	    case 'ArrowLeft':
	    case 'ArrowRight':
	      keySource.trigger('arrow', e);break;
	    case 'Enter':
	    case 'NumpadEnter':
	      keySource.trigger('enter', e);break;
	    case 'Space':
	      keySource.trigger('space', e);break;
	  }
	};
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	var _keysJs = __webpack_require__(45);
	
	var _keysJs2 = _interopRequireDefault(_keysJs);
	
	__webpack_require__(47);
	
	__webpack_require__(64);
	
	__webpack_require__(66);
	
	__webpack_require__(67);
	
	__webpack_require__(74);
	
	__webpack_require__(83);
	
	__webpack_require__(84);
	
	__webpack_require__(85);
	
	__webpack_require__(86);
	
	__webpack_require__(89);
	
	riot.tag2('codekit', '<optionkit></optionkit> <toolkit></toolkit> <datakit></datakit> <varkit if="{varkitVisible}"></varkit> <obkit if="{obkitVisible}"></obkit> <numkit if="{numkitVisible}"></numkit> <textkit if="{textkitVisible}"></textkit> <opkit if="{opkitVisible}"></opkit> <typekit if="{typekitVisible}"></typekit> <dotkit if="{dotkitVisible}"></dotkit>', 'codekit,[riot-tag="codekit"],[data-is="codekit"]{ position: absolute; right: 0; top: 0; width: 100vw; height: 100vh; }', '', function (opts) {
	  var _this = this;
	
	  this.varkitVisible = false;
	  this.obkitVisible = false;
	  this.numkitVisible = false;
	  this.textkitVisible = false;
	  this.opkitVisible = false;
	  this.dotkitVisible = false;
	  this.typekitVisible = false;
	
	  _storesToolbarStoreJs.toolbarSignal.on('varkitVisible', function () {
	    _this.varkitVisible = _storesToolbarStoreJs.toolbarState.varkit.visible;
	    _this.update();
	  });
	
	  _storesToolbarStoreJs.toolbarSignal.on('obkitVisible', function () {
	    _this.obkitVisible = _storesToolbarStoreJs.toolbarState.obkit.visible;
	    _this.update();
	  });
	
	  _storesToolbarStoreJs.toolbarSignal.on('numkitVisible', function () {
	    _this.numkitVisible = _storesToolbarStoreJs.toolbarState.numkit.visible;
	    _this.update();
	  });
	
	  _storesToolbarStoreJs.toolbarSignal.on('textkitVisible', function () {
	    _this.textkitVisible = _storesToolbarStoreJs.toolbarState.textkit.visible;
	    _this.update();
	  });
	
	  _storesToolbarStoreJs.toolbarSignal.on('opkitVisible', function () {
	    _this.opkitVisible = _storesToolbarStoreJs.toolbarState.opkit.visible;
	    _this.update();
	  });
	
	  _storesToolbarStoreJs.toolbarSignal.on('dotkitVisible', function () {
	    _this.dotkitVisible = _storesToolbarStoreJs.toolbarState.dotkit.visible;
	    _this.update();
	  });
	
	  _storesToolbarStoreJs.toolbarSignal.on('typekitVisible', function () {
	    _this.typekitVisible = _storesToolbarStoreJs.toolbarState.typekit.visible;
	    _this.update();
	  });
	
	  _keysJs2['default'].on('enter', function (e) {
	    (0, _storesToolbarStoreJs.toolbarDo)({ action: 'inputKitVisible' });
	  });
	  _keysJs2['default'].on('space', function (e) {
	    (0, _storesToolbarStoreJs.toolbarDo)({ action: 'openInputKit' });
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	__webpack_require__(48);
	
	__webpack_require__(49);
	
	__webpack_require__(50);
	
	__webpack_require__(51);
	
	__webpack_require__(52);
	
	__webpack_require__(53);
	
	__webpack_require__(54);
	
	__webpack_require__(55);
	
	__webpack_require__(56);
	
	__webpack_require__(57);
	
	__webpack_require__(59);
	
	__webpack_require__(60);
	
	__webpack_require__(61);
	
	__webpack_require__(62);
	
	__webpack_require__(63);
	
	riot.tag2('optionkit', '<optnvar if="{group == \'var\'}"></optnvar> <optnfunc if="{group == \'function\'}"></optnfunc> <optnarrw if="{group == \'arrow\'}"></optnarrw> <optnnum if="{group == \'number\'}"></optnnum> <optntext if="{group == \'text\'}"></optntext> <optncomm if="{group == \'comment\'}"></optncomm> <optnop if="{group == \'operator\'}"></optnop> <optnloop if="{group == \'loop\'}"></optnloop> <optnif if="{group == \'if\'}"></optnif> <optnpin if="{group == \'pin\'}"></optnpin> <optnflag if="{group == \'flag\'}"></optnflag> <optnob if="{group == \'object\'}"></optnob> <optntyp if="{group == \'type\'}"></optntyp> <optnblok if="{group == \'block\'}"></optnblok> <optnarry if="{group == \'array\'}"></optnarry>', 'optionkit,[riot-tag="optionkit"],[data-is="optionkit"]{ position: absolute; right: 0; top: 0vh; width: 24vh; height: 22vh; box-sizing: border-box; display: block; background: #151821; border: .4vh solid #1d2233; }', '', function (opts) {
	  var _this = this;
	
	  this.on('update', function () {
	    _this.group = _storesCodeStoreJs.codeUtil.cursorToken().group;
	  });
	
	  _storesCodeStoreJs.signal.on('updateCursor', function () {
	    _this.update();
	  });
	
	  _storesCodeStoreJs.signal.on('updateOptionkit', function () {
	    _this.update();
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	riot.tag2('optnfunc', '<div id="optfuncpointup" onclick="{up}" class="optfuncpoint"></div> <div id="optfuncpointdown" onclick="{down}" class="optfuncpoint"></div> <div id="optfuncpointleft" onclick="{left}" class="optfuncpoint"></div> <div id="optfuncpointright" onclick="{right}" class="optfuncpoint"></div> <div id="optfuncdef" onclick="{bubble}"></div> <div id="optfuncname" onclick="{name}"></div> <div id="optfuncprop" onclick="{prop}"></div> <div id="optfuncpar"></div> <div id="optfuncparup" onclick="{parup}" class="optfuncpar"></div> <div id="optfuncpardown" onclick="{pardown}" class="optfuncpar"></div> <div id="optfuncparleft" onclick="{parleft}" class="optfuncpar"></div> <div id="optfuncparright" onclick="{parright}" class="optfuncpar"></div> <div id="optfuncparx" onclick="{nopar}"></div>', 'optnfunc,[riot-tag="optnfunc"],[data-is="optnfunc"]{ width: 100%; height: 100%; display: block; transform: scale(.9); } optnfunc #optfuncdef,[riot-tag="optnfunc"] #optfuncdef,[data-is="optnfunc"] #optfuncdef{ left: .5vh; top: 10.5vh; width: 5vh; height: 5vh; position: absolute; background-image: url(\'assets/img/options/optfuncdef.svg\'); background-size: 100% 100%; } optnfunc #optfuncname,[riot-tag="optnfunc"] #optfuncname,[data-is="optnfunc"] #optfuncname{ left: 5vh; top: 17vh; width: 4vh; height: 4vh; position: absolute; background-image: url(\'assets/img/options/optname.svg\'); background-size: 100% 100%; } optnfunc #optfuncprop,[riot-tag="optnfunc"] #optfuncprop,[data-is="optnfunc"] #optfuncprop{ left: 1vh; top: 17vh; width: 2vh; height: 4vh; position: absolute; background-image: url(\'assets/img/options/optprop.svg\'); background-size: 100% 100%; } optnfunc .optfuncpoint,[riot-tag="optnfunc"] .optfuncpoint,[data-is="optnfunc"] .optfuncpoint{ width: 6vh; height: 6vh; position: absolute; background-image: url(\'assets/img/options/optfuncpinup.svg\'); background-size: 100% 100%; } optnfunc #optfuncpointup,[riot-tag="optnfunc"] #optfuncpointup,[data-is="optnfunc"] #optfuncpointup{ left: 6.6vh; top: .2vh; } optnfunc #optfuncpointdown,[riot-tag="optnfunc"] #optfuncpointdown,[data-is="optnfunc"] #optfuncpointdown{ left: 6.6vh; top: 6.6vh; transform: rotate(180deg); } optnfunc #optfuncpointleft,[riot-tag="optnfunc"] #optfuncpointleft,[data-is="optnfunc"] #optfuncpointleft{ left: .2vh; top: 3.3vh; transform: rotate(-90deg); } optnfunc #optfuncpointright,[riot-tag="optnfunc"] #optfuncpointright,[data-is="optnfunc"] #optfuncpointright{ left: 12.9vh; top: 3.3vh; transform: rotate(90deg); } optnfunc #optfuncpar,[riot-tag="optnfunc"] #optfuncpar,[data-is="optnfunc"] #optfuncpar{ position: absolute; left: 14.7vh; top: 14.5vh; background: #163461; width: 2.6vh; height: 1vh; } optnfunc .optfuncpar,[riot-tag="optnfunc"] .optfuncpar,[data-is="optnfunc"] .optfuncpar{ width: 4vh; height: 4vh; position: absolute; background-image: url(\'assets/img/options/optfuncparup.svg\'); background-size: 100% 100%; } optnfunc #optfuncparup,[riot-tag="optnfunc"] #optfuncparup,[data-is="optnfunc"] #optfuncparup{ left: 14vh; top: 10.2vh; } optnfunc #optfuncpardown,[riot-tag="optnfunc"] #optfuncpardown,[data-is="optnfunc"] #optfuncpardown{ left: 14vh; top: 15.8vh; transform: rotate(180deg); } optnfunc #optfuncparleft,[riot-tag="optnfunc"] #optfuncparleft,[data-is="optnfunc"] #optfuncparleft{ left: 9.8vh; top: 13.1vh; transform: rotate(-90deg); } optnfunc #optfuncparright,[riot-tag="optnfunc"] #optfuncparright,[data-is="optnfunc"] #optfuncparright{ left: 18.4vh; top: 13.1vh; transform: rotate(90deg); } optnfunc #optfuncparx,[riot-tag="optnfunc"] #optfuncparx,[data-is="optnfunc"] #optfuncparx{ width: 3vh; height: 3vh; position: absolute; background-image: url(\'assets/img/options/optfuncparx.svg\'); background-size: 100% 100%; left: 18.7vh; top: 9.5vh; }', '', function (opts) {
	
	    this.up = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'tokenPoints', data: 3 });
	    };
	    this.down = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'tokenPoints', data: 1 });
	    };
	    this.left = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'tokenPoints', data: 2 });
	    };
	    this.right = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'tokenPoints', data: 0 });
	    };
	
	    this.bubble = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'functionBubble' });
	    };
	    this.prop = function () {
	        return (0, _storesToolbarStoreJs.toolbarDo)({ action: 'propColor' });
	    };
	
	    this.parup = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'functionParPoints', data: 3 });
	    };
	    this.pardown = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'functionParPoints', data: 1 });
	    };
	    this.parleft = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'functionParPoints', data: 2 });
	    };
	    this.parright = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'functionParPoints', data: 0 });
	    };
	
	    this.nopar = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'functionParX' });
	    };
	
	    this.name = function () {
	        return (0, _storesToolbarStoreJs.toolbarDo)({ action: 'varkitVisible' });
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	riot.tag2('optnvar', '<div id="optvarbubble" onclick="{bubble}"></div> <div id="optvarname" onclick="{name}"></div> <div id="optvarprop" onclick="{prop}"></div> <div id="optvartypdot" onclick="{typdot}"></div> <div id="optvarixdot" onclick="{ixdot}" if="{id == 4}"></div> <div id="optloopkey" onclick="{key}"></div> <div id="optloopval" onclick="{val}"></div>', 'optnvar,[riot-tag="optnvar"],[data-is="optnvar"]{ width: 100%; height: 100%; display: block; } optnvar #optvarbubble,[riot-tag="optnvar"] #optvarbubble,[data-is="optnvar"] #optvarbubble{ left: 3vh; top: 2vh; width: 8vh; height: 8vh; position: absolute; background-image: url(\'assets/img/options/optvarbubble.svg\'); background-size: 100% 100%; } optnvar #optvarname,[riot-tag="optnvar"] #optvarname,[data-is="optnvar"] #optvarname{ left: 6vh; top: 13vh; width: 6vh; height: 6vh; position: absolute; background-image: url(\'assets/img/options/optname.svg\'); background-size: 100% 100%; } optnvar #optvarprop,[riot-tag="optnvar"] #optvarprop,[data-is="optnvar"] #optvarprop{ left: 2vh; top: 14.5vh; width: 2vh; height: 4vh; position: absolute; background-image: url(\'assets/img/options/optprop.svg\'); background-size: 100% 100%; } optnvar #optvartypdot,[riot-tag="optnvar"] #optvartypdot,[data-is="optnvar"] #optvartypdot{ left: 2vh; top: 12.5vh; width: 1.5vh; height: 1.5vh; position: absolute; background-image: url(\'assets/img/options/opttypdot.svg\'); background-size: 100% 100%; } optnvar #optvarixdot,[riot-tag="optnvar"] #optvarixdot,[data-is="optnvar"] #optvarixdot{ left: 13.5vh; top: 15vh; width: 3vh; height: 3vh; position: absolute; background-image: url(\'assets/img/options/opttypdot.svg\'); background-size: 100% 100%; } optnvar #optloopkey,[riot-tag="optnvar"] #optloopkey,[data-is="optnvar"] #optloopkey{ width: 4vh; height: 2vh; position: absolute; background-image: url(\'assets/img/options/optloopkey.svg\'); background-size: 100% 100%; left: 12vh; top: 1vh; } optnvar #optloopval,[riot-tag="optnvar"] #optloopval,[data-is="optnvar"] #optloopval{ width: 4vh; height: 2vh; position: absolute; background-image: url(\'assets/img/options/optloopval.svg\'); background-size: 100% 100%; left: 18vh; top: 1vh; }', '', function (opts) {
	  var _this = this;
	
	  this.bubble = function () {
	    return (0, _storesCodeStoreJs.codeDo)({ action: 'tokenBubble' });
	  };
	  this.name = function () {
	    return (0, _storesToolbarStoreJs.toolbarDo)({ action: 'varkitVisible' });
	  };
	  this.prop = function () {
	    return (0, _storesToolbarStoreJs.toolbarDo)({ action: 'propColor' });
	  };
	  this.typdot = function () {
	    return (0, _storesCodeStoreJs.codeDo)({ action: 'typedot' });
	  };
	  this.ixdot = function () {
	    return (0, _storesToolbarStoreJs.toolbarDo)({ action: 'indexColor' });
	  };
	
	  this.key = function () {
	    return (0, _storesCodeStoreJs.codeDo)({ action: 'setAsLoopKey' });
	  };
	  this.val = function () {
	    return (0, _storesCodeStoreJs.codeDo)({ action: 'setAsLoopVal' });
	  };
	
	  this.id = 0;
	  this.on('update', function () {
	    _this.id = _storesCodeStoreJs.codeUtil.cursorToken().id;
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	riot.tag2('optnarrw', '<div id="optup" onclick="{up}" class="opt"></div> <div id="optdown" onclick="{down}" class="opt"></div> <div id="optleft" onclick="{left}" class="opt"></div> <div id="optright" onclick="{right}" class="opt"></div>', 'optnarrw,[riot-tag="optnarrw"],[data-is="optnarrw"]{ width: 100%; height: 100%; display: block; } optnarrw .opt,[riot-tag="optnarrw"] .opt,[data-is="optnarrw"] .opt{ width: 6vh; height: 6vh; position: absolute; background-image: url(\'assets/img/options/optfuncparup.svg\'); background-size: 100% 100%; } optnarrw #optup,[riot-tag="optnarrw"] #optup,[data-is="optnarrw"] #optup{ left: 8vh; top: 4vh; } optnarrw #optdown,[riot-tag="optnarrw"] #optdown,[data-is="optnarrw"] #optdown{ left: 8vh; top: 13vh; transform: rotate(180deg); } optnarrw #optleft,[riot-tag="optnarrw"] #optleft,[data-is="optnarrw"] #optleft{ left: 2vh; top: 8.5vh; transform: rotate(-90deg); } optnarrw #optright,[riot-tag="optnarrw"] #optright,[data-is="optnarrw"] #optright{ left: 14vh; top: 8.5vh; transform: rotate(90deg); }', '', function (opts) {
	
	    this.up = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'tokenPoints', data: 3 });
	    };
	    this.down = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'tokenPoints', data: 1 });
	    };
	    this.left = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'tokenPoints', data: 2 });
	    };
	    this.right = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'tokenPoints', data: 0 });
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	riot.tag2('optnnum', '<div id="optnum" onclick="{num}"></div>', 'optnnum,[riot-tag="optnnum"],[data-is="optnnum"]{ width: 100%; height: 100%; display: block; } optnnum #optnum,[riot-tag="optnnum"] #optnum,[data-is="optnnum"] #optnum{ left: 3vh; top: 3vh; width: 15vh; height: 15vh; position: absolute; background-image: url(\'assets/img/options/optnum.svg\'); background-size: 100% 100%; }', '', function (opts) {
	    this.num = function () {
	        return (0, _storesToolbarStoreJs.toolbarDo)({ action: 'numkitVisible' });
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	riot.tag2('optntext', '<div id="opttex" onclick="{edit}"></div>', 'optntext,[riot-tag="optntext"],[data-is="optntext"]{ width: 100%; height: 100%; display: block; } optntext #opttex,[riot-tag="optntext"] #opttex,[data-is="optntext"] #opttex{ left: 3vh; top: 3vh; width: 15vh; height: 15vh; position: absolute; background-image: url(\'assets/img/options/opttex.svg\'); background-size: 100% 100%; }', '', function (opts) {
	    this.edit = function () {
	        return (0, _storesToolbarStoreJs.toolbarDo)({ action: 'textkitVisible' });
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	riot.tag2('optncomm', '<div id="optncomm" onclick="{edit}"></div> <div id="optcommsize"></div> <div id="optcommleft" onclick="{lessWidth}" class="optcommsize"></div> <div id="optcommright" onclick="{moreWidth}" class="optcommsize"></div>', 'optncomm,[riot-tag="optncomm"],[data-is="optncomm"]{ width: 100%; height: 100%; display: block; } optncomm #optncomm,[riot-tag="optncomm"] #optncomm,[data-is="optncomm"] #optncomm{ left: 6.5vh; top: 3vh; width: 10vh; height: 10vh; position: absolute; background-image: url(\'assets/img/options/opttex.svg\'); background-size: 100% 100%; } optncomm #optcommleft,[riot-tag="optncomm"] #optcommleft,[data-is="optncomm"] #optcommleft{ left: 4vh; top: 14vh; transform: rotate(-90deg); } optncomm #optcommright,[riot-tag="optncomm"] #optcommright,[data-is="optncomm"] #optcommright{ left: 14vh; top: 14vh; transform: rotate(90deg); } optncomm #optcommsize,[riot-tag="optncomm"] #optcommsize,[data-is="optncomm"] #optcommsize{ position: absolute; left: 10vh; top: 15vh; background: #163461; width: 3vh; height: 3vh; } optncomm .optcommsize,[riot-tag="optncomm"] .optcommsize,[data-is="optncomm"] .optcommsize{ width: 5vh; height: 5vh; position: absolute; background-image: url(\'assets/img/options/optfuncparup.svg\'); background-size: 100% 100%; }', '', function (opts) {
	    this.edit = function () {
	        return (0, _storesToolbarStoreJs.toolbarDo)({ action: 'textkitVisible' });
	    };
	    this.lessWidth = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'commWidth', data: -1 });
	    };
	    this.moreWidth = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'commWidth', data: 1 });
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	riot.tag2('optnop', '<div id="optfuncpointup" onclick="{up}" class="optfuncpoint"></div> <div id="optfuncpointdown" onclick="{down}" class="optfuncpoint"></div> <div id="optfuncpointleft" onclick="{left}" class="optfuncpoint"></div> <div id="optfuncpointright" onclick="{right}" class="optfuncpoint"></div> <div id="optfuncdef" onclick="{def}"></div> <div id="optopsel" onclick="{opkit}"></div> <div id="optfuncpar"></div> <div id="optfuncparup" onclick="{parup}" class="optfuncpar"></div> <div id="optfuncpardown" onclick="{pardown}" class="optfuncpar"></div> <div id="optfuncparleft" onclick="{parleft}" class="optfuncpar"></div> <div id="optfuncparright" onclick="{parright}" class="optfuncpar"></div> <div id="optfuncparx" onclick="{nopar}"></div>', 'optnop,[riot-tag="optnop"],[data-is="optnop"]{ width: 100%; height: 100%; display: block; transform: scale(.9); } optnop #optfuncdef,[riot-tag="optnop"] #optfuncdef,[data-is="optnop"] #optfuncdef{ left: .5vh; top: 10.5vh; width: 6vh; height: 6vh; position: absolute; background-image: url(\'assets/img/options/optopdef.svg\'); background-size: 100% 100%; } optnop #optopsel,[riot-tag="optnop"] #optopsel,[data-is="optnop"] #optopsel{ left: 5.5vh; top: 16vh; width: 4vh; height: 4vh; position: absolute; background-image: url(\'assets/img/options/optopsel.svg\'); background-size: 100% 100%; } optnop .optfuncpoint,[riot-tag="optnop"] .optfuncpoint,[data-is="optnop"] .optfuncpoint{ width: 6vh; height: 6vh; position: absolute; background-image: url(\'assets/img/options/optfuncpinup.svg\'); background-size: 100% 100%; } optnop #optfuncpointup,[riot-tag="optnop"] #optfuncpointup,[data-is="optnop"] #optfuncpointup{ left: 6.6vh; top: .2vh; } optnop #optfuncpointdown,[riot-tag="optnop"] #optfuncpointdown,[data-is="optnop"] #optfuncpointdown{ left: 6.6vh; top: 6.6vh; transform: rotate(180deg); } optnop #optfuncpointleft,[riot-tag="optnop"] #optfuncpointleft,[data-is="optnop"] #optfuncpointleft{ left: .2vh; top: 3.3vh; transform: rotate(-90deg); } optnop #optfuncpointright,[riot-tag="optnop"] #optfuncpointright,[data-is="optnop"] #optfuncpointright{ left: 12.9vh; top: 3.3vh; transform: rotate(90deg); } optnop #optfuncpar,[riot-tag="optnop"] #optfuncpar,[data-is="optnop"] #optfuncpar{ position: absolute; left: 14.7vh; top: 14.5vh; background: #163461; width: 2.6vh; height: 1vh; } optnop .optfuncpar,[riot-tag="optnop"] .optfuncpar,[data-is="optnop"] .optfuncpar{ width: 4vh; height: 4vh; position: absolute; background-image: url(\'assets/img/options/optfuncparup.svg\'); background-size: 100% 100%; } optnop #optfuncparup,[riot-tag="optnop"] #optfuncparup,[data-is="optnop"] #optfuncparup{ left: 14vh; top: 10.2vh; } optnop #optfuncpardown,[riot-tag="optnop"] #optfuncpardown,[data-is="optnop"] #optfuncpardown{ left: 14vh; top: 15.8vh; transform: rotate(180deg); } optnop #optfuncparleft,[riot-tag="optnop"] #optfuncparleft,[data-is="optnop"] #optfuncparleft{ left: 9.8vh; top: 13.1vh; transform: rotate(-90deg); } optnop #optfuncparright,[riot-tag="optnop"] #optfuncparright,[data-is="optnop"] #optfuncparright{ left: 18.4vh; top: 13.1vh; transform: rotate(90deg); } optnop #optfuncparx,[riot-tag="optnop"] #optfuncparx,[data-is="optnop"] #optfuncparx{ width: 3vh; height: 3vh; position: absolute; background-image: url(\'assets/img/options/optfuncparx.svg\'); background-size: 100% 100%; left: 18.7vh; top: 9.5vh; }', '', function (opts) {
	    this.def = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'opDef' });
	    };
	
	    this.up = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'tokenPoints', data: 3 });
	    };
	    this.down = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'tokenPoints', data: 1 });
	    };
	    this.left = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'tokenPoints', data: 2 });
	    };
	    this.right = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'tokenPoints', data: 0 });
	    };
	
	    this.parup = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'functionParPoints', data: 3 });
	    };
	    this.pardown = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'functionParPoints', data: 1 });
	    };
	    this.parleft = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'functionParPoints', data: 2 });
	    };
	    this.parright = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'functionParPoints', data: 0 });
	    };
	
	    this.nopar = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'functionParX' });
	    };
	
	    this.opkit = function () {
	        return (0, _storesToolbarStoreJs.toolbarDo)({ action: 'opkitVisible' });
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	riot.tag2('optnloop', '<div id="optfuncparup" onclick="{parup}" class="optfuncpar"></div> <div id="optfuncpardown" onclick="{pardown}" class="optfuncpar"></div> <div id="optfuncparleft" onclick="{parleft}" class="optfuncpar"></div> <div id="optfuncparright" onclick="{parright}" class="optfuncpar"></div> <div id="optfuncparx" onclick="{nopar}"></div>', 'optnloop,[riot-tag="optnloop"],[data-is="optnloop"]{ width: 100%; height: 100%; display: block; } optnloop .optfuncpar,[riot-tag="optnloop"] .optfuncpar,[data-is="optnloop"] .optfuncpar{ width: 6vh; height: 6vh; position: absolute; background-image: url(\'assets/img/options/optfuncparup.svg\'); background-size: 100% 100%; } optnloop #optfuncparup,[riot-tag="optnloop"] #optfuncparup,[data-is="optnloop"] #optfuncparup{ left: 8vh; top: 4.5vh; } optnloop #optfuncpardown,[riot-tag="optnloop"] #optfuncpardown,[data-is="optnloop"] #optfuncpardown{ left: 8vh; top: 11.5vh; transform: rotate(180deg); } optnloop #optfuncparleft,[riot-tag="optnloop"] #optfuncparleft,[data-is="optnloop"] #optfuncparleft{ left: 2vh; top: 8vh; transform: rotate(-90deg); } optnloop #optfuncparright,[riot-tag="optnloop"] #optfuncparright,[data-is="optnloop"] #optfuncparright{ left: 14vh; top: 8vh; transform: rotate(90deg); } optnloop #optfuncparx,[riot-tag="optnloop"] #optfuncparx,[data-is="optnloop"] #optfuncparx{ width: 4vh; height: 4vh; position: absolute; background-image: url(\'assets/img/options/optfuncparx.svg\'); background-size: 100% 100%; left: 15vh; top: 3vh; }', '', function (opts) {
	
	    this.parup = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'functionParPoints', data: 3 });
	    };
	    this.pardown = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'functionParPoints', data: 1 });
	    };
	    this.parleft = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'functionParPoints', data: 2 });
	    };
	    this.parright = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'functionParPoints', data: 0 });
	    };
	
	    this.nopar = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'functionParX' });
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	riot.tag2('optnif', '<div id="optifcond" onclick="{cond}"></div> <div id="optifo" onclick="{o}"></div> <div id="optifx" onclick="{x}"></div>', 'optnif,[riot-tag="optnif"],[data-is="optnif"]{ width: 100%; height: 100%; display: block; } optnif #optifcond,[riot-tag="optnif"] #optifcond,[data-is="optnif"] #optifcond{ left: 7vh; top: 5vh; width: 6vh; height: 6vh; position: absolute; background-image: url(\'assets/img/options/optifcond.svg\'); background-size: 100% 100%; cursor: pointer; } optnif #optifo,[riot-tag="optnif"] #optifo,[data-is="optnif"] #optifo{ left: 3vh; top: 11vh; width: 6vh; height: 6vh; position: absolute; background-image: url(\'assets/img/options/optifo.svg\'); background-size: 100% 100%; } optnif #optifx,[riot-tag="optnif"] #optifx,[data-is="optnif"] #optifx{ left: 11vh; top: 11vh; width: 6vh; height: 6vh; position: absolute; background-image: url(\'assets/img/options/optifx.svg\'); background-size: 100% 100%; }', '', function (opts) {
	
	    this.cond = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'ifRotate', data: 'cond' });
	    };
	    this.o = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'ifRotate', data: 'o' });
	    };
	    this.x = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'ifRotate', data: 'x' });
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	var _resInfoColorJs = __webpack_require__(58);
	
	var _resInfoColorJs2 = _interopRequireDefault(_resInfoColorJs);
	
	riot.tag2('optnpin', '<div id="optcolr" onclick="{colr}"></div> <div id="optup" onclick="{up}" class="opt"></div> <div id="optdown" onclick="{down}" class="opt"></div> <div id="optleft" onclick="{left}" class="opt"></div> <div id="optright" onclick="{right}" class="opt"></div> <div id="optpinbubble" onclick="{bubble}" class="opt"></div>', 'optnpin,[riot-tag="optnpin"],[data-is="optnpin"]{ width: 100%; height: 100%; display: block; } optnpin #optcolr,[riot-tag="optnpin"] #optcolr,[data-is="optnpin"] #optcolr{ width: 6vh; height: 6vh; position: absolute; top: 2vh; left: 2vh; background-image: url(\'assets/img/options/optcolr.svg\'); background-size: 100% 100%; } optnpin .opt,[riot-tag="optnpin"] .opt,[data-is="optnpin"] .opt{ width: 4vh; height: 4vh; position: absolute; background-image: url(\'assets/img/options/optfuncparup.svg\'); background-size: 100% 100%; } optnpin #optup,[riot-tag="optnpin"] #optup,[data-is="optnpin"] #optup{ left: 6vh; top: 9.5vh; } optnpin #optdown,[riot-tag="optnpin"] #optdown,[data-is="optnpin"] #optdown{ left: 6vh; top: 14.5vh; transform: rotate(180deg); } optnpin #optleft,[riot-tag="optnpin"] #optleft,[data-is="optnpin"] #optleft{ left: 2vh; top: 12vh; transform: rotate(-90deg); } optnpin #optright,[riot-tag="optnpin"] #optright,[data-is="optnpin"] #optright{ left: 10vh; top: 12vh; transform: rotate(90deg); } optnpin #optpinbubble,[riot-tag="optnpin"] #optpinbubble,[data-is="optnpin"] #optpinbubble{ left: 15vh; top: 11vh; width: 6vh; height: 6vh; position: absolute; background-image: url(\'assets/img/options/optvarbubble.svg\'); background-size: 100% 100%; }', '', function (opts) {
	    this.colr = function () {
	        return (0, _storesToolbarStoreJs.toolbarDo)({ action: 'pinColor' });
	    };
	
	    this.up = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'tokenPoints', data: 3 });
	    };
	    this.down = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'tokenPoints', data: 1 });
	    };
	    this.left = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'tokenPoints', data: 2 });
	    };
	    this.right = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'tokenPoints', data: 0 });
	    };
	    this.bubble = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'tokenBubble' });
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 58 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var colors = {
	  yellgren: '#6d7904',
	  gren: '#04790e',
	  seagren: '#048c5d',
	
	  aqua: '#04878c',
	  sky: '#1579b9',
	  royblu: '#0a45a4',
	  blu: '#0b008d',
	  purp: '#6e24ba',
	
	  pink: '#bd2179',
	  red: '#a23c3c',
	  orang: '#c05b00',
	  yell: '#b89d18'
	
	};
	exports['default'] = colors;
	module.exports = exports['default'];

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	var _resInfoColorJs = __webpack_require__(58);
	
	var _resInfoColorJs2 = _interopRequireDefault(_resInfoColorJs);
	
	riot.tag2('optnflag', '<div id="optpinpink" onclick="{pink}" class="optcolor"></div> <div id="optpinred" onclick="{red}" class="optcolor"></div> <div id="optpinoran" onclick="{oran}" class="optcolor"></div> <div id="optpinyell" onclick="{yell}" class="optcolor"></div> <div id="optpingren" onclick="{gren}" class="optcolor"></div> <div id="optpinturq" onclick="{turq}" class="optcolor"></div> <div id="optpinblu" onclick="{blu}" class="optcolor"></div> <div id="optpinpurp" onclick="{purp}" class="optcolor"></div> <div id="optup" onclick="{up}" class="opt"></div> <div id="optdown" onclick="{down}" class="opt"></div> <div id="optleft" onclick="{left}" class="opt"></div> <div id="optright" onclick="{right}" class="opt"></div>', 'optnflag,[riot-tag="optnflag"],[data-is="optnflag"]{ width: 100%; height: 100%; display: block; } optnflag .optcolor,[riot-tag="optnflag"] .optcolor,[data-is="optnflag"] .optcolor{ width: 4vh; height: 4vh; position: absolute; background-size: 100% 100%; } optnflag #optpinpink,[riot-tag="optnflag"] #optpinpink,[data-is="optnflag"] #optpinpink{ top: 1vh; left: 1.5vh; background-image: url(\'assets/img/options/optpink.svg\'); } optnflag #optpinred,[riot-tag="optnflag"] #optpinred,[data-is="optnflag"] #optpinred{ top: 1vh; left: 5.5vh; background-image: url(\'assets/img/options/optred.svg\'); } optnflag #optpinoran,[riot-tag="optnflag"] #optpinoran,[data-is="optnflag"] #optpinoran{ top: 1vh; left: 9.5vh; background-image: url(\'assets/img/options/optoran.svg\'); } optnflag #optpinyell,[riot-tag="optnflag"] #optpinyell,[data-is="optnflag"] #optpinyell{ top: 1vh; left: 13.5vh; background-image: url(\'assets/img/options/optyell.svg\'); } optnflag #optpingren,[riot-tag="optnflag"] #optpingren,[data-is="optnflag"] #optpingren{ top: 5vh; left: 1.5vh; background-image: url(\'assets/img/options/optgren.svg\'); } optnflag #optpinturq,[riot-tag="optnflag"] #optpinturq,[data-is="optnflag"] #optpinturq{ top: 5vh; left: 5.5vh; background-image: url(\'assets/img/options/optturq.svg\'); } optnflag #optpinblu,[riot-tag="optnflag"] #optpinblu,[data-is="optnflag"] #optpinblu{ top: 5vh; left: 9.5vh; background-image: url(\'assets/img/options/optblu.svg\'); } optnflag #optpinpurp,[riot-tag="optnflag"] #optpinpurp,[data-is="optnflag"] #optpinpurp{ top: 5vh; left: 13.5vh; background-image: url(\'assets/img/options/optpurp.svg\'); } optnflag .opt,[riot-tag="optnflag"] .opt,[data-is="optnflag"] .opt{ width: 4vh; height: 4vh; position: absolute; background-image: url(\'assets/img/options/optfuncparup.svg\'); background-size: 100% 100%; } optnflag #optup,[riot-tag="optnflag"] #optup,[data-is="optnflag"] #optup{ left: 6vh; top: 9.5vh; } optnflag #optdown,[riot-tag="optnflag"] #optdown,[data-is="optnflag"] #optdown{ left: 6vh; top: 14.5vh; transform: rotate(180deg); } optnflag #optleft,[riot-tag="optnflag"] #optleft,[data-is="optnflag"] #optleft{ left: 2vh; top: 12vh; transform: rotate(-90deg); } optnflag #optright,[riot-tag="optnflag"] #optright,[data-is="optnflag"] #optright{ left: 10vh; top: 12vh; transform: rotate(90deg); }', '', function (opts) {
	    this.pink = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'tokenColor', data: _resInfoColorJs2['default'].pink });
	    };
	    this.red = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'tokenColor', data: _resInfoColorJs2['default'].red });
	    };
	    this.oran = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'tokenColor', data: _resInfoColorJs2['default'].oran });
	    };
	    this.yell = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'tokenColor', data: _resInfoColorJs2['default'].yell });
	    };
	
	    this.gren = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'tokenColor', data: _resInfoColorJs2['default'].gren });
	    };
	    this.turq = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'tokenColor', data: _resInfoColorJs2['default'].turq });
	    };
	    this.blu = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'tokenColor', data: _resInfoColorJs2['default'].blu });
	    };
	    this.purp = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'tokenColor', data: _resInfoColorJs2['default'].purp });
	    };
	
	    this.up = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'tokenPoints', data: 3 });
	    };
	    this.down = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'tokenPoints', data: 1 });
	    };
	    this.left = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'tokenPoints', data: 2 });
	    };
	    this.right = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'tokenPoints', data: 0 });
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	riot.tag2('optnob', '<div id="optvarbubble" onclick="{bubble}"></div> <div id="optvarname" onclick="{name}"></div> <div id="optobdot" onclick="{dot}"></div> <div id="optobprop" onclick="{prop}"></div> <div id="opttypdot" onclick="{typdot}"></div> <div id="optloopval" onclick="{val}"></div>', 'optnob,[riot-tag="optnob"],[data-is="optnob"]{ width: 100%; height: 100%; display: block; } optnob #optvarbubble,[riot-tag="optnob"] #optvarbubble,[data-is="optnob"] #optvarbubble{ left: 2vh; top: 2vh; width: 7vh; height: 7vh; position: absolute; background-image: url(\'assets/img/options/optvarbubble.svg\'); background-size: 100% 100%; cursor: pointer; } optnob #optvarname,[riot-tag="optnob"] #optvarname,[data-is="optnob"] #optvarname{ left: 6vh; top: 13vh; width: 7vh; height: 7vh; position: absolute; background-image: url(\'assets/img/options/optname.svg\'); background-size: 100% 100%; } optnob #optobdot,[riot-tag="optnob"] #optobdot,[data-is="optnob"] #optobdot{ left: 15vh; top: 14vh; width: 2.5vh; height: 5vh; position: absolute; background-image: url(\'assets/img/options/optobdot.svg\'); background-size: 100% 100%; } optnob #optobprop,[riot-tag="optnob"] #optobprop,[data-is="optnob"] #optobprop{ left: 1.5vh; top: 14vh; width: 2.5vh; height: 5vh; position: absolute; background-image: url(\'assets/img/options/optprop.svg\'); background-size: 100% 100%; } optnob #opttypdot,[riot-tag="optnob"] #opttypdot,[data-is="optnob"] #opttypdot{ left: 1.5vh; top: 11vh; width: 2vh; height: 2vh; position: absolute; background-image: url(\'assets/img/options/opttypdot.svg\'); background-size: 100% 100%; } optnob #optloopval,[riot-tag="optnob"] #optloopval,[data-is="optnob"] #optloopval{ width: 4vh; height: 2vh; position: absolute; background-image: url(\'assets/img/options/optloopval.svg\'); background-size: 100% 100%; left: 18vh; top: 1vh; }', '', function (opts) {
	
	    this.bubble = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'tokenBubble' });
	    };
	    this.name = function () {
	        return (0, _storesToolbarStoreJs.toolbarDo)({ action: 'obkitVisible' });
	    };
	
	    this.dot = function () {
	        return (0, _storesToolbarStoreJs.toolbarDo)({ action: 'dotColor' });
	    };
	    this.prop = function () {
	        return (0, _storesToolbarStoreJs.toolbarDo)({ action: 'propColor' });
	    };
	    this.typdot = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'typedot' });
	    };
	
	    this.val = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'setAsLoopVal' });
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	riot.tag2('optntyp', '<div id="opttypdef" onclick="{def}"></div> <div id="opttypname" onclick="{name}"></div>', 'optntyp,[riot-tag="optntyp"],[data-is="optntyp"]{ width: 100%; height: 100%; display: block; } optntyp #opttypdef,[riot-tag="optntyp"] #opttypdef,[data-is="optntyp"] #opttypdef{ left: 2vh; top: 2vh; width: 7vh; height: 7vh; position: absolute; background-image: url(\'assets/img/options/opttypnew.svg\'); background-size: 100% 100%; } optntyp #opttypname,[riot-tag="optntyp"] #opttypname,[data-is="optntyp"] #opttypname{ left: 2vh; top: 14vh; width: 5vh; height: 5vh; position: absolute; background-image: url(\'assets/img/options/optname.svg\'); background-size: 100% 100%; }', '', function (opts) {
	
	    this.def = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'typeDef' });
	    };
	    this.name = function () {
	        return (0, _storesToolbarStoreJs.toolbarDo)({ action: 'typekitVisible' });
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	riot.tag2('optnblok', '<div id="optlvl" onclick="{lvl}"></div> <div id="optup" onclick="{up}" class="opt"></div> <div id="optdown" onclick="{down}" class="opt"></div> <div id="optleft" onclick="{left}" class="opt"></div> <div id="optright" onclick="{right}" class="opt"></div>', 'optnblok,[riot-tag="optnblok"],[data-is="optnblok"]{ width: 100%; height: 100%; display: block; } optnblok #optlvl,[riot-tag="optnblok"] #optlvl,[data-is="optnblok"] #optlvl{ width: 6vh; height: 6vh; position: absolute; background-image: url(\'assets/img/options/optbloklvl.svg\'); background-size: 100% 100%; left: 2vh; top: 2vh; } optnblok .opt,[riot-tag="optnblok"] .opt,[data-is="optnblok"] .opt{ width: 6vh; height: 6vh; position: absolute; background-image: url(\'assets/img/options/optfuncparup.svg\'); background-size: 100% 100%; } optnblok #optup,[riot-tag="optnblok"] #optup,[data-is="optnblok"] #optup{ left: 9vh; top: 6vh; } optnblok #optdown,[riot-tag="optnblok"] #optdown,[data-is="optnblok"] #optdown{ left: 9vh; top: 14vh; transform: rotate(180deg); } optnblok #optleft,[riot-tag="optnblok"] #optleft,[data-is="optnblok"] #optleft{ left: 3vh; top: 10vh; transform: rotate(-90deg); } optnblok #optright,[riot-tag="optnblok"] #optright,[data-is="optnblok"] #optright{ left: 15vh; top: 10vh; transform: rotate(90deg); }', '', function (opts) {
	
	    this.lvl = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'blokLvl' });
	    };
	    this.up = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'blokSize', data: 3 });
	    };
	    this.down = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'blokSize', data: 1 });
	    };
	    this.left = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'blokSize', data: 2 });
	    };
	    this.right = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'blokSize', data: 0 });
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	riot.tag2('optnarry', '<div id="optarrybubble" onclick="{bubble}"></div> <div id="optarryname" onclick="{name}"></div> <div id="optarryprop" onclick="{prop}"></div> <div id="optarrytypdot" onclick="{typdot}"></div> <div id="optarryix" onclick="{ix}"></div> <div id="optarrydot" onclick="{dot}"></div> <div id="optarryparup" onclick="{parup}" class="optarrypar"></div> <div id="optarrypardown" onclick="{pardown}" class="optarrypar"></div> <div id="optarryparleft" onclick="{parleft}" class="optarrypar"></div> <div id="optarryparright" onclick="{parright}" class="optarrypar"></div> <div id="optarryparx" onclick="{nopar}"></div> <div id="optloopval" onclick="{val}"></div>', 'optnarry,[riot-tag="optnarry"],[data-is="optnarry"]{ width: 100%; height: 100%; display: block; } optnarry #optarrybubble,[riot-tag="optnarry"] #optarrybubble,[data-is="optnarry"] #optarrybubble{ left: 2vh; top: 2vh; width: 6vh; height: 6vh; position: absolute; background-image: url(\'assets/img/options/optvarbubble.svg\'); background-size: 100% 100%; } optnarry #optarryname,[riot-tag="optnarry"] #optarryname,[data-is="optnarry"] #optarryname{ left: 5.5vh; top: 15vh; width: 5vh; height: 5vh; position: absolute; background-image: url(\'assets/img/options/optname.svg\'); background-size: 100% 100%; } optnarry #optarryprop,[riot-tag="optnarry"] #optarryprop,[data-is="optnarry"] #optarryprop{ left: 2vh; top: 16vh; width: 2vh; height: 4vh; position: absolute; background-image: url(\'assets/img/options/optprop.svg\'); background-size: 100% 100%; } optnarry #optarrytypdot,[riot-tag="optnarry"] #optarrytypdot,[data-is="optnarry"] #optarrytypdot{ left: 2vh; top: 14.5vh; width: 1.5vh; height: 1.5vh; position: absolute; background-image: url(\'assets/img/options/opttypdot.svg\'); background-size: 100% 100%; } optnarry #optarryix,[riot-tag="optnarry"] #optarryix,[data-is="optnarry"] #optarryix{ left: 12vh; top: 16vh; width: 4vh; height: 4vh; position: absolute; background-image: url(\'assets/img/options/optarryix.svg\'); background-size: 100% 100%; } optnarry #optarrydot,[riot-tag="optnarry"] #optarrydot,[data-is="optnarry"] #optarrydot{ left: 17.5vh; top: 16vh; width: 2vh; height: 4vh; position: absolute; background-image: url(\'assets/img/options/optobdot.svg\'); background-size: 100% 100%; } optnarry .optarrypar,[riot-tag="optnarry"] .optarrypar,[data-is="optnarry"] .optarrypar{ width: 4vh; height: 4vh; position: absolute; background-image: url(\'assets/img/options/optfuncparup.svg\'); background-size: 100% 100%; } optnarry #optarryparup,[riot-tag="optnarry"] #optarryparup,[data-is="optnarry"] #optarryparup{ left: 14vh; top: 6vh; } optnarry #optarrypardown,[riot-tag="optnarry"] #optarrypardown,[data-is="optnarry"] #optarrypardown{ left: 14vh; top: 11vh; transform: rotate(180deg); } optnarry #optarryparleft,[riot-tag="optnarry"] #optarryparleft,[data-is="optnarry"] #optarryparleft{ left: 9.8vh; top: 8.5vh; transform: rotate(-90deg); } optnarry #optarryparright,[riot-tag="optnarry"] #optarryparright,[data-is="optnarry"] #optarryparright{ left: 18.4vh; top: 8.5vh; transform: rotate(90deg); } optnarry #optarryparx,[riot-tag="optnarry"] #optarryparx,[data-is="optnarry"] #optarryparx{ width: 3vh; height: 3vh; position: absolute; background-image: url(\'assets/img/options/optfuncparx.svg\'); background-size: 100% 100%; left: 18.7vh; top: 5vh; } optnarry #optloopval,[riot-tag="optnarry"] #optloopval,[data-is="optnarry"] #optloopval{ width: 4vh; height: 2vh; position: absolute; background-image: url(\'assets/img/options/optloopval.svg\'); background-size: 100% 100%; left: 18vh; top: 1vh; }', '', function (opts) {
	
	    this.bubble = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'tokenBubble' });
	    };
	    this.name = function () {
	        return (0, _storesToolbarStoreJs.toolbarDo)({ action: 'varkitVisible' });
	    };
	    this.prop = function () {
	        return (0, _storesToolbarStoreJs.toolbarDo)({ action: 'propColor' });
	    };
	    this.typdot = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'typedot' });
	    };
	
	    this.ix = function () {
	        return (0, _storesToolbarStoreJs.toolbarDo)({ action: 'indexColor' });
	    };
	    this.dot = function () {
	        return (0, _storesToolbarStoreJs.toolbarDo)({ action: 'dotColor' });
	    };
	
	    this.parup = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'functionParPoints', data: 3 });
	    };
	    this.pardown = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'functionParPoints', data: 1 });
	    };
	    this.parleft = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'functionParPoints', data: 2 });
	    };
	    this.parright = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'functionParPoints', data: 0 });
	    };
	
	    this.nopar = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'functionParX' });
	    };
	
	    this.val = function () {
	        return (0, _storesCodeStoreJs.codeDo)({ action: 'setAsLoopVal' });
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	__webpack_require__(65);
	
	riot.tag2('toolkit', '<tool each="{tools}"></tool>', 'toolkit,[riot-tag="toolkit"],[data-is="toolkit"]{ position: absolute; right: 0; top: 22vh; width: 24vh; height: 35vh; padding: 1.5vh; background: #151821; border: .4vh solid #1d2233; box-sizing: border-box; display: flex; flex-wrap: wrap; justify-content: space-around; align-content: flex-start; }', '', function (opts) {
	  this.tools = _storesToolbarStoreJs.toolbarState.toolkit;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesCodeInfoJs = __webpack_require__(21);
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	riot.tag2('tool', '', 'tool,[riot-tag="tool"],[data-is="tool"]{ width: 6vh; height: 6vh; background-image: url(\'assets/img/tk90.svg\'); background-size: 60vh 60vh; }', 'onclick="{onclick}"', function (opts) {
	  var _this = this;
	
	  this.on("update", function () {
	    _this.root.style.backgroundPosition = _storesCodeInfoJs.codeInfo[_this.id].loc.x / 56 * 6 + 'vh ' + _storesCodeInfoJs.codeInfo[_this.id].loc.y / 56 * 6 + 'vh';
	  });
	
	  this.onclick = function (e) {
	    e.preventUpdate = true;
	    if (_this.id == 0) return;
	    if (_this.id == 60) {
	      (0, _storesCodeStoreJs.codeDo)({ action: 'delete' });
	      return;
	    }
	    (0, _storesCodeStoreJs.codeDo)({
	      action: 'setToken',
	      data: { id: _this.id, name: '' }
	    });
	    if (_this.id == 40) (0, _storesToolbarStoreJs.toolbarDo)({ action: 'inputKitVisible' });
	  };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	__webpack_require__(65);
	
	riot.tag2('datakit', '<tool each="{tools}"></tool>', 'datakit,[riot-tag="datakit"],[data-is="datakit"]{ position: absolute; right: 0; top: 57vh; width: 24vh; height: 21vh; padding: 1.5vh; background: #151821; border: .4vh solid #1d2233; box-sizing: border-box; display: flex; flex-wrap: wrap; justify-content: space-around; align-content: flex-start; }', '', function (opts) {
	  this.tools = _storesToolbarStoreJs.toolbarState.datakit;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	__webpack_require__(68);
	
	__webpack_require__(69);
	
	__webpack_require__(71);
	
	__webpack_require__(72);
	
	__webpack_require__(73);
	
	riot.tag2('varkit', '<varkitinfo></varkitinfo> <label id="lbsearch">search <input id="vsearch"> </label> <varkitlocal></varkitlocal> <varkitob></varkitob> <varkitextern></varkitextern> <varkitimport></varkitimport>', 'varkit,[riot-tag="varkit"],[data-is="varkit"]{ position: absolute; right: 24vh; top: 0; bottom: 0; width: 80vw; background: #151821; border: .4vh solid #1d2233; z-index: 200; font: 1vw \'Ubuntu mono\'; color: #2b4173; } varkit input,[riot-tag="varkit"] input,[data-is="varkit"] input{ width: 10vw; border: .03vw solid #0064f1; padding: .03vw; background: #0d1b26; color: #6e84b6; font-size: 1vw; } varkit label,[riot-tag="varkit"] label,[data-is="varkit"] label{ position: absolute; } varkit #lbsearch,[riot-tag="varkit"] #lbsearch,[data-is="varkit"] #lbsearch{ position: absolute; top: 15vw; right: .5vw; width: 34vw; }', '', function (opts) {});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	__webpack_require__(23);
	
	__webpack_require__(25);
	
	riot.tag2('varkitinfo', '<div></div> <tknvar if="{group == \'var\'}"></tknvar> <tknob if="{group == \'object\'}"></tknob> <label id="varlab1">abbr <input id="varin1" type="text" value="hello" maxlength="8" oninput="{change}"> <input id="varin12" type="text" value="hello" maxlength="8" oninput="{change}"> </label> <label id="varlab2">name <input id="varin2" type="text" value="hello" maxlength="32" oninput="{change}"> </label> <label id="varlab3">comments <textarea></textarea> </label>', 'varkitinfo,[riot-tag="varkitinfo"],[data-is="varkitinfo"]{ position: absolute; display: block; top: .5vw; right: .5vw; width: 36vw; height: 14vw; background-color: #1d212d; } varkitinfo label,[riot-tag="varkitinfo"] label,[data-is="varkitinfo"] label{ position: absolute; left: 13vw; text-align: right; width: 22vw; color: #2b4173; } varkitinfo input,[riot-tag="varkitinfo"] input,[data-is="varkitinfo"] input{ width: 10vw; border: .03vw solid #0064f1; padding: .03vw; background: #0d1b26; color: #6e84b6; font-size: 1vw; } varkitinfo textarea,[riot-tag="varkitinfo"] textarea,[data-is="varkitinfo"] textarea{ width: 15vw; height: 5vw; border: .03vw solid #0064f1; padding: .03vw; background: #0d1b26; color: #6e84b6; font-size: 1vw; vertical-align: sub; } varkitinfo #varlab1,[riot-tag="varkitinfo"] #varlab1,[data-is="varkitinfo"] #varlab1{ top: 1vw; } varkitinfo #varin1,[riot-tag="varkitinfo"] #varin1,[data-is="varkitinfo"] #varin1{ width: 7vw; margin-right: 0.4vw; } varkitinfo #varin12,[riot-tag="varkitinfo"] #varin12,[data-is="varkitinfo"] #varin12{ width: 7vw; } varkitinfo #varlab2,[riot-tag="varkitinfo"] #varlab2,[data-is="varkitinfo"] #varlab2{ top: 4vw; } varkitinfo #varin2,[riot-tag="varkitinfo"] #varin2,[data-is="varkitinfo"] #varin2{ width: 15vw; } varkitinfo #varlab3,[riot-tag="varkitinfo"] #varlab3,[data-is="varkitinfo"] #varlab3{ top: 7vw; } varkitinfo tknvar,[riot-tag="varkitinfo"] tknvar,[data-is="varkitinfo"] tknvar,varkitinfo tknob,[riot-tag="varkitinfo"] tknob,[data-is="varkitinfo"] tknob{ font-size: 2.3vw; top: 0vw; left: 1vw; width: 13vw; height: 13vw; color: #748396; }', '', function (opts) {
	  var _this = this;
	
	  this.change = function (e) {
	    _storesCodeStoreJs.codeUtil.cursorToken().options.tx1 = varin1.value;
	    _storesCodeStoreJs.codeUtil.cursorToken().options.tx2 = varin12.value;
	    _storesCodeStoreJs.signal.trigger('updateCursorToken');
	  };
	
	  var token;
	  this.on('update', function () {
	    token = _storesCodeStoreJs.codeUtil.cursorToken();
	    _this.group = token.group;
	    Object.assign(_this.tags.tknvar, token);
	    Object.assign(_this.tags.tknob, token);
	  });
	
	  _storesToolbarStoreJs.toolbarSignal.on('varkitVisible', function () {
	    token = _storesCodeStoreJs.codeUtil.cursorToken();
	    _this.varin1.value = token.options.tx1;
	    _this.varin12.value = token.options.tx2;
	    _this.varin1.focus();
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	__webpack_require__(70);
	
	riot.tag2('varkitlocal', '<div id="vklc">Local</div> <div id="vkllist"> <varlistitem each="{vars}"></varlistitem> </div>', 'varkitlocal,[riot-tag="varkitlocal"],[data-is="varkitlocal"]{ position: absolute; display: block; top: 17vw; right: .5vw; width: 36vw; bottom: .5vw; background-color: #1d212d; overflow: auto; } varkitlocal #vklc,[riot-tag="varkitlocal"] #vklc,[data-is="varkitlocal"] #vklc{ position: absolute; left: 1vw; top: .5vw; } varkitlocal #vkllist,[riot-tag="varkitlocal"] #vkllist,[data-is="varkitlocal"] #vkllist{ position: absolute; left: 1vw; top: 3vw; width: 30vw; display: flex; flex-wrap: wrap; }', '', function (opts) {
	  var _this = this;
	
	  this.vars = [];
	  var tag = this;
	  _storesToolbarStoreJs.toolbarSignal.on('varkitVisible', function () {
	    var id = _storesCodeStoreJs.codeUtil.cursorToken().id;
	    if (id >= 3 && id <= 6) tag.vars = _storesCodeStoreJs.codeState.vars[id];else tag.vars = [];
	    _this.update();
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	__webpack_require__(23);
	
	__webpack_require__(25);
	
	riot.tag2('varlistitem', '<tknvar if="{token.group == \'var\'}"></tknvar> <tknob if="{token.group == \'object\'}"></tknob>', 'varlistitem,[riot-tag="varlistitem"],[data-is="varlistitem"]{ display: block; width: 4vw; height: 4vw; } varlistitem tknvar,[riot-tag="varlistitem"] tknvar,[data-is="varlistitem"] tknvar,varlistitem tknob,[riot-tag="varlistitem"] tknob,[data-is="varlistitem"] tknob{ font-size: .8vw; color: #748396; width: 4vw; height: 4vw; }', 'onclick="{click}"', function (opts) {
	  var _this = this;
	
	  this.on('update', function () {
	    if (_this.token.group == 'var') {
	      _this.tags.tknvar.id = _this.token.id;
	      _this.tags.tknvar.options = {};
	      _this.tags.tknvar.options.tx1 = _this.token.options.tx1;
	      _this.tags.tknvar.options.tx2 = _this.token.options.tx2;
	    } else if (_this.token.group == 'object') {
	      _this.tags.tknob.id = _this.token.id;
	      _this.tags.tknob.options = {};
	      _this.tags.tknob.options.tx1 = _this.token.options.tx1;
	      _this.tags.tknob.options.tx2 = _this.token.options.tx2;
	    }
	  });
	
	  this.click = function () {
	    _storesCodeStoreJs.codeUtil.cursorToken().id = _this.token.id;
	    _storesCodeStoreJs.codeUtil.cursorToken().name = _this.token.name;
	    _storesCodeStoreJs.codeUtil.cursorToken().group = _this.token.group;
	    _storesCodeStoreJs.codeUtil.cursorToken().options = {
	      tx1: _this.token.options.tx1,
	      tx2: _this.token.options.tx2
	    };
	    _storesCodeStoreJs.signal.trigger('forceUpdateToken', _storesCodeStoreJs.codeState.cursor);
	    (0, _storesToolbarStoreJs.toolbarDo)({ action: 'closeVarkit' });
	  };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	__webpack_require__(23);
	
	__webpack_require__(25);
	
	riot.tag2('varkitob', '<div id="vkob">Object</div>', 'varkitob,[riot-tag="varkitob"],[data-is="varkitob"]{ position: absolute; display: block; top: .5vw; right: 37vw; width: 18vw; bottom: .5vw; background-color: #1d212d; } varkitob #vkob,[riot-tag="varkitob"] #vkob,[data-is="varkitob"] #vkob{ position: absolute; left: 1vw; top: .5vw; } varkitob tknvar,[riot-tag="varkitob"] tknvar,[data-is="varkitob"] tknvar,varkitob tknob,[riot-tag="varkitob"] tknob,[data-is="varkitob"] tknob{ font-size: 2.3vw; top: 0vw; left: 1vw; width: 13vw; height: 13vw; }', '', function (opts) {
	
	  _storesToolbarStoreJs.toolbarSignal.on('varkitVisible', function () {});
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	__webpack_require__(23);
	
	__webpack_require__(25);
	
	riot.tag2('varkitextern', '<div id="vkob">Extern</div>', 'varkitextern,[riot-tag="varkitextern"],[data-is="varkitextern"]{ position: absolute; display: block; top: .5vw; right: 55.5vw; left: .5vw; height: 48vh; background-color: #1d212d; } varkitextern #vkob,[riot-tag="varkitextern"] #vkob,[data-is="varkitextern"] #vkob{ position: absolute; left: 1vw; top: .5vw; } varkitextern tknvar,[riot-tag="varkitextern"] tknvar,[data-is="varkitextern"] tknvar,varkitextern tknob,[riot-tag="varkitextern"] tknob,[data-is="varkitextern"] tknob{ font-size: 2.3vw; top: 0vw; left: 1vw; width: 13vw; height: 13vw; }', '', function (opts) {
	
	  _storesToolbarStoreJs.toolbarSignal.on('varkitVisible', function () {});
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	__webpack_require__(23);
	
	__webpack_require__(25);
	
	riot.tag2('varkitimport', '<div id="vkob">Import</div>', 'varkitimport,[riot-tag="varkitimport"],[data-is="varkitimport"]{ position: absolute; display: block; top: 50vh; right: 55.5vw; left: .5vw; bottom: .5vh; background-color: #1d212d; } varkitimport #vkob,[riot-tag="varkitimport"] #vkob,[data-is="varkitimport"] #vkob{ position: absolute; left: 1vw; top: .5vw; } varkitimport tknvar,[riot-tag="varkitimport"] tknvar,[data-is="varkitimport"] tknvar,varkitimport tknob,[riot-tag="varkitimport"] tknob,[data-is="varkitimport"] tknob{ font-size: 2.3vw; top: 0vw; left: 1vw; width: 13vw; height: 13vw; }', '', function (opts) {
	
	  _storesToolbarStoreJs.toolbarSignal.on('varkitVisible', function () {});
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	__webpack_require__(75);
	
	__webpack_require__(76);
	
	__webpack_require__(78);
	
	__webpack_require__(79);
	
	__webpack_require__(80);
	
	__webpack_require__(81);
	
	__webpack_require__(82);
	
	riot.tag2('obkit', '<obkitinfo></obkitinfo> <label id="lbsearch">search <input id="vsearch"> </label> <obkitlocal></obkitlocal> <obkittypeinfo></obkittypeinfo> <obkitob></obkitob> <obkitextern></obkitextern> <obkitimport></obkitimport> <obkittypes></obkittypes>', 'obkit,[riot-tag="obkit"],[data-is="obkit"]{ position: absolute; right: 24vh; top: 0; bottom: 0; left: 0; background: #151821; border: .4vh solid #1d2233; z-index: 200; font: 1vw \'Ubuntu mono\'; color: #2b4173; } obkit input,[riot-tag="obkit"] input,[data-is="obkit"] input{ width: 10vw; border: .03vw solid #0064f1; padding: .03vw; background: #0d1b26; color: #6e84b6; font-size: 1vw; } obkit label,[riot-tag="obkit"] label,[data-is="obkit"] label{ position: absolute; } obkit #lbsearch,[riot-tag="obkit"] #lbsearch,[data-is="obkit"] #lbsearch{ position: absolute; top: 15vw; right: .5vw; width: 34vw; }', '', function (opts) {});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	__webpack_require__(25);
	
	riot.tag2('obkitinfo', '<div></div> <tknob></tknob> <label id="varlab1">abbr <input id="varin1" type="text" value="hello" maxlength="8" oninput="{change}"> <input id="varin12" type="text" value="hello" maxlength="8" oninput="{change}"> </label> <label id="varlab2">name <input id="varin2" type="text" value="hello" maxlength="32" oninput="{change}"> </label> <label id="varlab3">comments <textarea></textarea> </label>', 'obkitinfo,[riot-tag="obkitinfo"],[data-is="obkitinfo"]{ position: absolute; display: block; top: .5vw; right: .5vw; width: 36vw; height: 14vw; background-color: #1d212d; } obkitinfo label,[riot-tag="obkitinfo"] label,[data-is="obkitinfo"] label{ position: absolute; left: 13vw; text-align: right; width: 22vw; color: #2b4173; } obkitinfo input,[riot-tag="obkitinfo"] input,[data-is="obkitinfo"] input{ width: 10vw; border: .03vw solid #0064f1; padding: .03vw; background: #0d1b26; color: #6e84b6; font-size: 1vw; } obkitinfo textarea,[riot-tag="obkitinfo"] textarea,[data-is="obkitinfo"] textarea{ width: 15vw; height: 5vw; border: .03vw solid #0064f1; padding: .03vw; background: #0d1b26; color: #6e84b6; font-size: 1vw; vertical-align: sub; } obkitinfo #varlab1,[riot-tag="obkitinfo"] #varlab1,[data-is="obkitinfo"] #varlab1{ top: 1vw; } obkitinfo #varin1,[riot-tag="obkitinfo"] #varin1,[data-is="obkitinfo"] #varin1{ width: 7vw; margin-right: 0.4vw; } obkitinfo #varin12,[riot-tag="obkitinfo"] #varin12,[data-is="obkitinfo"] #varin12{ width: 7vw; } obkitinfo #varlab2,[riot-tag="obkitinfo"] #varlab2,[data-is="obkitinfo"] #varlab2{ top: 4vw; } obkitinfo #varin2,[riot-tag="obkitinfo"] #varin2,[data-is="obkitinfo"] #varin2{ width: 15vw; } obkitinfo #varlab3,[riot-tag="obkitinfo"] #varlab3,[data-is="obkitinfo"] #varlab3{ top: 7vw; } obkitinfo tknvar,[riot-tag="obkitinfo"] tknvar,[data-is="obkitinfo"] tknvar,obkitinfo tknob,[riot-tag="obkitinfo"] tknob,[data-is="obkitinfo"] tknob{ font-size: 2.3vw; top: 0vw; left: 1vw; width: 13vw; height: 13vw; color: #748396; }', '', function (opts) {
	  var _this = this;
	
	  this.change = function (e) {
	    _storesCodeStoreJs.codeUtil.cursorToken().options.tx1 = varin1.value;
	    _storesCodeStoreJs.codeUtil.cursorToken().options.tx2 = varin12.value;
	    _storesCodeStoreJs.signal.trigger('updateCursorToken');
	  };
	
	  var token;
	  this.on('update', function () {
	    token = _storesCodeStoreJs.codeUtil.cursorToken();
	    Object.assign(_this.tags.tknob, token);
	  });
	
	  _storesToolbarStoreJs.toolbarSignal.on('obkitVisible', function () {
	    token = _storesCodeStoreJs.codeUtil.cursorToken();
	    _this.varin1.value = token.options.tx1;
	    _this.varin12.value = token.options.tx2;
	    _this.varin1.focus();
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	__webpack_require__(77);
	
	riot.tag2('obkitlocal', '<div id="vklc">Local</div> <div id="vkllist"> <oblistitem each="{vars}"></oblistitem> </div>', 'obkitlocal,[riot-tag="obkitlocal"],[data-is="obkitlocal"]{ position: absolute; display: block; top: 17vw; right: .5vw; width: 36vw; bottom: .5vw; background-color: #1d212d; overflow: auto; } obkitlocal #vklc,[riot-tag="obkitlocal"] #vklc,[data-is="obkitlocal"] #vklc{ position: absolute; left: 1vw; top: .5vw; } obkitlocal #vkllist,[riot-tag="obkitlocal"] #vkllist,[data-is="obkitlocal"] #vkllist{ position: absolute; left: 1vw; top: 3vw; width: 30vw; display: flex; flex-wrap: wrap; }', '', function (opts) {
	  var _this = this;
	
	  this.vars = [];
	  _storesToolbarStoreJs.toolbarSignal.on('obkitVisible', function () {
	    _this.vars = _storesCodeStoreJs.codeState.vars[6];
	    _this.update();
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	__webpack_require__(25);
	
	riot.tag2('oblistitem', '<tknob></tknob>', 'oblistitem,[riot-tag="oblistitem"],[data-is="oblistitem"]{ display: block; width: 4vw; height: 4vw; } oblistitem tknvar,[riot-tag="oblistitem"] tknvar,[data-is="oblistitem"] tknvar,oblistitem tknob,[riot-tag="oblistitem"] tknob,[data-is="oblistitem"] tknob{ font-size: .8vw; color: #748396; width: 4vw; height: 4vw; }', 'onclick="{click}"', function (opts) {
	  var _this = this;
	
	  this.on('update', function () {
	    _this.tags.tknob.id = _this.token.id;
	    _this.tags.tknob.group = _this.token.group;
	    _this.tags.tknob.options = {
	      tx1: _this.token.options.tx1,
	      tx2: _this.token.options.tx2,
	      type: _this.token.options.type,
	      typeGroup: _this.token.options.typeGroup
	    };
	  });
	
	  this.click = function () {
	    _storesCodeStoreJs.codeUtil.cursorToken().id = _this.token.id;
	    _storesCodeStoreJs.codeUtil.cursorToken().name = _this.token.name;
	    _storesCodeStoreJs.codeUtil.cursorToken().group = _this.token.group;
	    _storesCodeStoreJs.codeUtil.cursorToken().options = {
	      tx1: _this.token.options.tx1,
	      tx2: _this.token.options.tx2,
	      type: _this.token.options.type,
	      typeGroup: _this.token.options.typeGroup
	    };
	    _storesCodeStoreJs.signal.trigger('forceUpdateToken', _storesCodeStoreJs.codeState.cursor);
	    (0, _storesToolbarStoreJs.toolbarDo)({ action: 'closeObkit' });
	  };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	__webpack_require__(23);
	
	__webpack_require__(25);
	
	riot.tag2('obkitob', '<div id="vkob">Object</div>', 'obkitob,[riot-tag="obkitob"],[data-is="obkitob"]{ position: absolute; display: block; top: 17vw; right: 37vw; width: 16vw; bottom: .5vw; background-color: #1d212d; } obkitob #vkob,[riot-tag="obkitob"] #vkob,[data-is="obkitob"] #vkob{ position: absolute; left: 1vw; top: .5vw; } obkitob tknvar,[riot-tag="obkitob"] tknvar,[data-is="obkitob"] tknvar,obkitob tknob,[riot-tag="obkitob"] tknob,[data-is="obkitob"] tknob{ font-size: 2.3vw; top: 0vw; left: 1vw; width: 13vw; height: 13vw; }', '', function (opts) {
	
	  _storesToolbarStoreJs.toolbarSignal.on('varkitVisible', function () {});
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	__webpack_require__(23);
	
	__webpack_require__(25);
	
	riot.tag2('obkittypeinfo', '<div id="vkob">Type</div>', 'obkittypeinfo,[riot-tag="obkittypeinfo"],[data-is="obkittypeinfo"]{ position: absolute; display: block; top: .5vw; right: 37vw; width: 16vw; height: 16vw; background-color: #1d212d; } obkittypeinfo #vkob,[riot-tag="obkittypeinfo"] #vkob,[data-is="obkittypeinfo"] #vkob{ position: absolute; left: 1vw; top: .5vw; } obkittypeinfo tknvar,[riot-tag="obkittypeinfo"] tknvar,[data-is="obkittypeinfo"] tknvar,obkittypeinfo tknob,[riot-tag="obkittypeinfo"] tknob,[data-is="obkittypeinfo"] tknob{ font-size: 2.3vw; top: 0vw; left: 1vw; width: 13vw; height: 13vw; }', '', function (opts) {
	
	  _storesToolbarStoreJs.toolbarSignal.on('varkitVisible', function () {});
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	__webpack_require__(23);
	
	__webpack_require__(25);
	
	riot.tag2('obkitextern', '<div id="vkob">Extern</div>', 'obkitextern,[riot-tag="obkitextern"],[data-is="obkitextern"]{ position: absolute; display: block; top: .5vw; right: 53.5vw; width: 16vw; height: 16vw; background-color: #1d212d; } obkitextern #vkob,[riot-tag="obkitextern"] #vkob,[data-is="obkitextern"] #vkob{ position: absolute; left: 1vw; top: .5vw; } obkitextern tknvar,[riot-tag="obkitextern"] tknvar,[data-is="obkitextern"] tknvar,obkitextern tknob,[riot-tag="obkitextern"] tknob,[data-is="obkitextern"] tknob{ font-size: 2.3vw; top: 0vw; left: 1vw; width: 13vw; height: 13vw; }', '', function (opts) {
	
	  _storesToolbarStoreJs.toolbarSignal.on('varkitVisible', function () {});
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	__webpack_require__(23);
	
	__webpack_require__(25);
	
	riot.tag2('obkitimport', '<div id="vkob">Import</div>', 'obkitimport,[riot-tag="obkitimport"],[data-is="obkitimport"]{ position: absolute; display: block; top: 17vw; right: 53.5vw; width: 16vw; bottom: .5vw; background-color: #1d212d; } obkitimport #vkob,[riot-tag="obkitimport"] #vkob,[data-is="obkitimport"] #vkob{ position: absolute; left: 1vw; top: .5vw; } obkitimport tknvar,[riot-tag="obkitimport"] tknvar,[data-is="obkitimport"] tknvar,obkitimport tknob,[riot-tag="obkitimport"] tknob,[data-is="obkitimport"] tknob{ font-size: 2.3vw; top: 0vw; left: 1vw; width: 13vw; height: 13vw; }', '', function (opts) {
	
	  _storesToolbarStoreJs.toolbarSignal.on('varkitVisible', function () {});
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	__webpack_require__(23);
	
	__webpack_require__(25);
	
	riot.tag2('obkittypes', '<div id="vkob">Types</div>', 'obkittypes,[riot-tag="obkittypes"],[data-is="obkittypes"]{ position: absolute; display: block; top: .5vw; right: 70vw; left: .5vw; bottom: .5vw; background-color: #1d212d; } obkittypes #vkob,[riot-tag="obkittypes"] #vkob,[data-is="obkittypes"] #vkob{ position: absolute; left: 1vw; top: .5vw; } obkittypes tknvar,[riot-tag="obkittypes"] tknvar,[data-is="obkittypes"] tknvar,obkittypes tknob,[riot-tag="obkittypes"] tknob,[data-is="obkittypes"] tknob{ font-size: 2.3vw; top: 0vw; left: 1vw; width: 13vw; height: 13vw; }', '', function (opts) {
	
	  _storesToolbarStoreJs.toolbarSignal.on('varkitVisible', function () {});
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	__webpack_require__(29);
	
	riot.tag2('numkit', '<div id="varnameform"> <input id="varname1" type="text" value="hello" maxlength="24" oninput="{change}"> <tknnum></tknnum> </div>', 'numkit,[riot-tag="numkit"],[data-is="numkit"]{ position: absolute; right: 24vh; top: 3vh; height: 40vh; width: 60vh; background: #151821; border: .4vh solid #1d2233; z-index: 200; } numkit #varnameform,[riot-tag="numkit"] #varnameform,[data-is="numkit"] #varnameform{ position: absolute; top: 4vh; right: 4vh; } numkit #varname1,[riot-tag="numkit"] #varname1,[data-is="numkit"] #varname1{ width: 50vh; border: 1px solid #0064f1; background: #0d1b26; color: #6e84b6; font-size: 2vh; } numkit tknvar,[riot-tag="numkit"] tknvar,[data-is="numkit"] tknvar{ font: 10.6px "ubuntu mono"; left: 6vh; top: 4vh; }', '', function (opts) {
	  var _this = this;
	
	  this.tags.tknnum.id = 0;
	
	  this.change = function (e) {
	    var token = _storesCodeStoreJs.codeUtil.cursorToken();
	    token.options.value = varname1.value;
	
	    _storesCodeStoreJs.signal.trigger('updateCursorToken');
	  };
	
	  this.on('update', function () {
	    Object.assign(_this.tags.tknnum, _storesCodeStoreJs.codeUtil.cursorToken());
	  });
	
	  var token;
	  _storesToolbarStoreJs.toolbarSignal.on('numkitVisible', function () {
	    token = _storesCodeStoreJs.codeUtil.cursorToken();
	    _this.varname1.value = token.options.value;
	    _this.varname1.focus();
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	__webpack_require__(30);
	
	riot.tag2('textkit', '<div id="varnameform"> <textarea id="varname1" oninput="{change}"></textarea> <tkntext></tkntext> </div>', 'textkit,[riot-tag="textkit"],[data-is="textkit"]{ position: absolute; right: 24vh; top: 3vh; height: 40vh; width: 60vh; background: #151821; border: .4vh solid #1d2233; z-index: 200; } textkit #varnameform,[riot-tag="textkit"] #varnameform,[data-is="textkit"] #varnameform{ position: absolute; top: 4vh; right: 4vh; } textkit #varname1,[riot-tag="textkit"] #varname1,[data-is="textkit"] #varname1{ width: 50vh; height: 12vh; border: 1px solid #0064f1; background: #0d1b26; color: #6e84b6; font-size: 2vh; } textkit tkntext,[riot-tag="textkit"] tkntext,[data-is="textkit"] tkntext{ font: 10.6px "ubuntu mono"; left: 6vh; top: 18vh; }', '', function (opts) {
	  var _this = this;
	
	  this.tags.tkntext.id = 0;
	
	  this.change = function (e) {
	    _storesCodeStoreJs.codeUtil.cursorToken().options.value = varname1.value;
	
	    _storesCodeStoreJs.signal.trigger('updateCursorToken');
	  };
	
	  this.on('update', function () {
	    Object.assign(_this.tags.tkntext, _storesCodeStoreJs.codeUtil.cursorToken());
	  });
	
	  var token;
	  _storesToolbarStoreJs.toolbarSignal.on('textkitVisible', function () {
	    _this.varname1.value = _storesCodeStoreJs.codeUtil.cursorToken().options.value;
	    _this.varname1.focus();
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesCodeClassesJs = __webpack_require__(9);
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	__webpack_require__(32);
	
	riot.tag2('opkit', '<div id="mod"> <tknop data-opid="24" onclick="{click}"></tknop> </div> <div id="incdec"> <tknop data-opid="30" onclick="{click}"></tknop> <tknop data-opid="31" onclick="{click}"></tknop> </div> <div id="arith"> <tknop data-opid="20" onclick="{click}"></tknop> <tknop data-opid="21" onclick="{click}"></tknop> <tknop data-opid="22" onclick="{click}"></tknop> <tknop data-opid="23" onclick="{click}"></tknop> </div> <div id="eq"> <tknop data-opid="0" onclick="{click}"></tknop> <tknop data-opid="1" onclick="{click}"></tknop> </div> <div id="rel"> <tknop data-opid="2" onclick="{click}"></tknop> <tknop data-opid="3" onclick="{click}"></tknop> <tknop data-opid="4" onclick="{click}"></tknop> <tknop data-opid="5" onclick="{click}"></tknop> </div>', 'opkit,[riot-tag="opkit"],[data-is="opkit"]{ position: absolute; right: 24vh; top: 3vh; height: 52vh; width: 40vh; background: #151821; border: .4vh solid #1d2233; z-index: 200; } opkit tknop,[riot-tag="opkit"] tknop,[data-is="opkit"] tknop{ width: 6vh; height: 6vh; position: relative; float: left; } opkit #mod,[riot-tag="opkit"] #mod,[data-is="opkit"] #mod{ position: absolute; width: 12vh; right: 20vh; top: 6vh; } opkit #incdec,[riot-tag="opkit"] #incdec,[data-is="opkit"] #incdec{ position: absolute; width: 12vh; right: 8vh; top: 6vh; } opkit #arith,[riot-tag="opkit"] #arith,[data-is="opkit"] #arith{ position: absolute; width: 24vh; right: 8vh; top: 16vh; } opkit #eq,[riot-tag="opkit"] #eq,[data-is="opkit"] #eq{ position: absolute; width: 12vh; right: 8vh; top: 26vh; } opkit #rel,[riot-tag="opkit"] #rel,[data-is="opkit"] #rel{ position: absolute; width: 24vh; right: 8vh; top: 36vh; }', '', function (opts) {
	
	  for (var i = 0; i < this.tags.tknop.length; i++) {
	    var data = new _storesCodeClassesJs.tokenClass(40);
	    data.options.id = this.tags.tknop[i].root.dataset.opid;
	    data.options.def = true;
	    Object.assign(this.tags.tknop[i], data);
	  }
	
	  this.click = function (e) {
	    e.preventUpdate = true;
	    (0, _storesCodeStoreJs.codeDo)({ action: 'setOp', data: e.currentTarget.dataset.opid });
	    (0, _storesToolbarStoreJs.toolbarDo)({ action: 'closeOpkit' });
	  };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	var _resInfoColorJs = __webpack_require__(58);
	
	var _resInfoColorJs2 = _interopRequireDefault(_resInfoColorJs);
	
	__webpack_require__(87);
	
	__webpack_require__(88);
	
	riot.tag2('dotkit', '<div id="dots"> <dotcolor onclick="{yellgren}"></dotcolor> <dotcolor onclick="{gren}"></dotcolor> <dotcolor onclick="{seagren}"></dotcolor> <dotcolor onclick="{aqua}"></dotcolor> <dotcolor onclick="{sky}"></dotcolor> <dotcolor onclick="{royblu}"></dotcolor> <dotcolor onclick="{blu}"></dotcolor> <dotcolor onclick="{purp}"></dotcolor> <dotcolor onclick="{pink}"></dotcolor> <dotcolor onclick="{red}"></dotcolor> <dotcolor onclick="{orang}"></dotcolor> <dotcolor onclick="{yell}"></dotcolor> <div id="dotx" onclick="{noDot}"></div> </div>', 'dotkit,[riot-tag="dotkit"],[data-is="dotkit"]{ position: absolute; right: 24vh; top: 3vh; height: 48vh; width: 50vh; background: #151821; border: .4vh solid #1d2233; z-index: 200; } dotkit #dots,[riot-tag="dotkit"] #dots,[data-is="dotkit"] #dots{ position: absolute; top: .5vh; right: .5vh; left: .5vh; bottom: .5vh; display: flex; flex-wrap: wrap; justify-content: flex-end; } dotkit dotcolor,[riot-tag="dotkit"] dotcolor,[data-is="dotkit"] dotcolor{ position: static; width: 6vh; height: 6vh; margin: 3vh; } dotkit #dotx,[riot-tag="dotkit"] #dotx,[data-is="dotkit"] #dotx{ position: static; width: 6vh; height: 6vh; margin: 3vh; background-image: url(\'assets/img/options/dotx.svg\'); background-size: 100% 100%; }', '', function (opts) {
	    this.yellgren = function () {
	        return (0, _storesToolbarStoreJs.toolbarDo)({ action: 'setColor', data: _resInfoColorJs2['default'].yellgren });
	    };
	    this.gren = function () {
	        return (0, _storesToolbarStoreJs.toolbarDo)({ action: 'setColor', data: _resInfoColorJs2['default'].gren });
	    };
	    this.seagren = function () {
	        return (0, _storesToolbarStoreJs.toolbarDo)({ action: 'setColor', data: _resInfoColorJs2['default'].seagren });
	    };
	    this.aqua = function () {
	        return (0, _storesToolbarStoreJs.toolbarDo)({ action: 'setColor', data: _resInfoColorJs2['default'].aqua });
	    };
	
	    this.sky = function () {
	        return (0, _storesToolbarStoreJs.toolbarDo)({ action: 'setColor', data: _resInfoColorJs2['default'].sky });
	    };
	    this.royblu = function () {
	        return (0, _storesToolbarStoreJs.toolbarDo)({ action: 'setColor', data: _resInfoColorJs2['default'].royblu });
	    };
	    this.blu = function () {
	        return (0, _storesToolbarStoreJs.toolbarDo)({ action: 'setColor', data: _resInfoColorJs2['default'].blu });
	    };
	    this.purp = function () {
	        return (0, _storesToolbarStoreJs.toolbarDo)({ action: 'setColor', data: _resInfoColorJs2['default'].purp });
	    };
	
	    this.pink = function () {
	        return (0, _storesToolbarStoreJs.toolbarDo)({ action: 'setColor', data: _resInfoColorJs2['default'].pink });
	    };
	    this.red = function () {
	        return (0, _storesToolbarStoreJs.toolbarDo)({ action: 'setColor', data: _resInfoColorJs2['default'].red });
	    };
	    this.orang = function () {
	        return (0, _storesToolbarStoreJs.toolbarDo)({ action: 'setColor', data: _resInfoColorJs2['default'].orang });
	    };
	    this.yell = function () {
	        return (0, _storesToolbarStoreJs.toolbarDo)({ action: 'setColor', data: _resInfoColorJs2['default'].yell });
	    };
	
	    this.noDot = function () {
	        return (0, _storesToolbarStoreJs.toolbarDo)({ action: 'setColor', data: '' });
	    };
	
	    this.tags.dotcolor[0].options = { color: _resInfoColorJs2['default'].yellgren };
	    this.tags.dotcolor[1].options = { color: _resInfoColorJs2['default'].gren };
	    this.tags.dotcolor[2].options = { color: _resInfoColorJs2['default'].seagren };
	    this.tags.dotcolor[3].options = { color: _resInfoColorJs2['default'].aqua };
	
	    this.tags.dotcolor[4].options = { color: _resInfoColorJs2['default'].sky };
	    this.tags.dotcolor[5].options = { color: _resInfoColorJs2['default'].royblu };
	    this.tags.dotcolor[6].options = { color: _resInfoColorJs2['default'].blu };
	    this.tags.dotcolor[7].options = { color: _resInfoColorJs2['default'].purp };
	
	    this.tags.dotcolor[8].options = { color: _resInfoColorJs2['default'].pink };
	    this.tags.dotcolor[9].options = { color: _resInfoColorJs2['default'].red };
	    this.tags.dotcolor[10].options = { color: _resInfoColorJs2['default'].orang };
	    this.tags.dotcolor[11].options = { color: _resInfoColorJs2['default'].yell };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	riot.tag2('dotcolor', '<div id="flagpoint"></div>', 'dotcolor,[riot-tag="dotcolor"],[data-is="dotcolor"]{ position: absolute; width: 64px; height: 64px; background-color: #007d76; border-radius: 50%; }', '', function (opts) {
	  var _this = this;
	
	  this.on("update", function () {
	    if (!_this.options) return;
	    _this.root.style.backgroundColor = _this.options.color;
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	riot.tag2('flagkitnoflag', '', 'flagkitnoflag,[riot-tag="flagkitnoflag"],[data-is="flagkitnoflag"]{ display: block; width: 56px; height: 56px; z-index: 10; position: absolute; background-image: url(\'assets/img/tokens/noflag.svg\'); background-size: 100% 100%; }', '', function (opts) {});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	__webpack_require__(90);
	
	__webpack_require__(91);
	
	__webpack_require__(93);
	
	__webpack_require__(94);
	
	__webpack_require__(95);
	
	__webpack_require__(96);
	
	riot.tag2('typekit', '<label id="lbsearch">search <input id="tsearch"> </label> <div id="typkitnew"></div> <div id="typkitok" onclick="{ok}"></div> <typekitinfo></typekitinfo> <typekitlocal></typekitlocal> <typekittypeinfo></typekittypeinfo> <typekitextern></typekitextern> <typekitimport></typekitimport> <typekittypes></typekittypes>', 'typekit,[riot-tag="typekit"],[data-is="typekit"]{ position: absolute; right: 24vh; top: 0; bottom: 0; left: 0; background: #151821; border: .4vh solid #1d2233; z-index: 200; font: 1vw \'Ubuntu mono\'; color: #2b4173; } typekit input,[riot-tag="typekit"] input,[data-is="typekit"] input{ width: 10vw; border: .03vw solid #0064f1; padding: .03vw; background: #0d1b26; color: #6e84b6; font-size: 1vw; } typekit #lbsearch,[riot-tag="typekit"] #lbsearch,[data-is="typekit"] #lbsearch{ position: absolute; top: .5vw; right: 22vw; width: 14vw; } typekit #typkitnew,[riot-tag="typekit"] #typkitnew,[data-is="typekit"] #typkitnew{ position: absolute; top: .5vw; right: 19vw; width: 1.5vw; height: 1.5vw; background-image: url(\'assets/img/options/opttypnew.svg\'); background-size: 100% 100%; } typekit #typkitok,[riot-tag="typekit"] #typkitok,[data-is="typekit"] #typkitok{ position: absolute; top: .5vw; right: .5vw; width: 1.5vw; height: 1.5vw; background-image: url(\'assets/img/options/optok.svg\'); background-size: 100% 100%; }', '', function (opts) {
	    this.ok = function () {
	        return (0, _storesToolbarStoreJs.toolbarDo)({ action: 'closeTypekit' });
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	__webpack_require__(38);
	
	riot.tag2('typekitinfo', '<div></div> <tkntyp></tkntyp> <label id="varlab1">abbr <input id="varin1" type="text" value="hello" maxlength="8" oninput="{change}"> <input id="varin12" type="text" value="hello" maxlength="8" oninput="{change}"> </label> <label id="varlab2">name <input id="varin2" type="text" value="hello" maxlength="32" oninput="{change}"> </label> <label id="varlab3">comments <textarea></textarea> </label>', 'typekitinfo,[riot-tag="typekitinfo"],[data-is="typekitinfo"]{ position: absolute; display: block; top: 2.5vw; right: .5vw; width: 36vw; height: 14vw; background-color: #1d212d; } typekitinfo label,[riot-tag="typekitinfo"] label,[data-is="typekitinfo"] label{ position: absolute; left: 13vw; text-align: right; width: 22vw; color: #2b4173; } typekitinfo input,[riot-tag="typekitinfo"] input,[data-is="typekitinfo"] input{ width: 10vw; border: .03vw solid #0064f1; padding: .03vw; background: #0d1b26; color: #6e84b6; font-size: 1vw; } typekitinfo textarea,[riot-tag="typekitinfo"] textarea,[data-is="typekitinfo"] textarea{ width: 15vw; height: 5vw; border: .03vw solid #0064f1; padding: .03vw; background: #0d1b26; color: #6e84b6; font-size: 1vw; vertical-align: sub; } typekitinfo #varlab1,[riot-tag="typekitinfo"] #varlab1,[data-is="typekitinfo"] #varlab1{ top: 1vw; } typekitinfo #varin1,[riot-tag="typekitinfo"] #varin1,[data-is="typekitinfo"] #varin1{ width: 7vw; margin-right: 0.4vw; } typekitinfo #varin12,[riot-tag="typekitinfo"] #varin12,[data-is="typekitinfo"] #varin12{ width: 7vw; } typekitinfo #varlab2,[riot-tag="typekitinfo"] #varlab2,[data-is="typekitinfo"] #varlab2{ top: 4vw; } typekitinfo #varin2,[riot-tag="typekitinfo"] #varin2,[data-is="typekitinfo"] #varin2{ width: 15vw; } typekitinfo #varlab3,[riot-tag="typekitinfo"] #varlab3,[data-is="typekitinfo"] #varlab3{ top: 7vw; } typekitinfo tkntyp,[riot-tag="typekitinfo"] tkntyp,[data-is="typekitinfo"] tkntyp{ font-size: 2.3vw; top: 0vw; left: 1vw; width: 13vw; height: 13vw; }', '', function (opts) {
	  var _this = this;
	
	  this.change = function (e) {
	    _storesCodeStoreJs.codeUtil.cursorToken().options.tx1 = varin1.value;
	    _storesCodeStoreJs.codeUtil.cursorToken().options.tx2 = varin12.value;
	    _storesCodeStoreJs.signal.trigger('updateCursorToken');
	  };
	
	  var token;
	  this.on('update', function () {
	    token = _storesCodeStoreJs.codeUtil.cursorToken();
	    Object.assign(_this.tags.tkntyp, token);
	  });
	
	  _storesToolbarStoreJs.toolbarSignal.on('typekitVisible', function () {
	    token = _storesCodeStoreJs.codeUtil.cursorToken();
	    _this.varin1.value = token.options.tx1;
	    _this.varin12.value = token.options.tx2;
	    _this.varin1.focus();
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	__webpack_require__(92);
	
	riot.tag2('typekitlocal', '<div id="vklc">Local</div> <div id="vkllist"> <typelistitem each="{types}"></typelistitem> </div>', 'typekitlocal,[riot-tag="typekitlocal"],[data-is="typekitlocal"]{ position: absolute; display: block; top: 17vw; right: .5vw; width: 36vw; bottom: .5vw; background-color: #1d212d; overflow: auto; } typekitlocal #vklc,[riot-tag="typekitlocal"] #vklc,[data-is="typekitlocal"] #vklc{ position: absolute; left: 1vw; top: .5vw; } typekitlocal #vkllist,[riot-tag="typekitlocal"] #vkllist,[data-is="typekitlocal"] #vkllist{ position: absolute; left: 1vw; top: 3vw; width: 30vw; display: flex; flex-wrap: wrap; }', '', function (opts) {
	  var _this = this;
	
	  this.types = [];
	  _storesToolbarStoreJs.toolbarSignal.on('typekitVisible', function () {
	    _this.types = _storesCodeStoreJs.codeState.types;
	    _this.update();
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesCodeStoreJs = __webpack_require__(8);
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	__webpack_require__(38);
	
	riot.tag2('typelistitem', '<tkntyp></tkntyp>', 'typelistitem,[riot-tag="typelistitem"],[data-is="typelistitem"]{ display: block; width: 4vw; height: 4vw; } typelistitem tkntyp,[riot-tag="typelistitem"] tkntyp,[data-is="typelistitem"] tkntyp{ font-size: .8vw; color: #2696c1; width: 4vw; height: 4vw; }', 'onclick="{click}"', function (opts) {
	  var _this = this;
	
	  this.on('update', function () {
	    _this.tags.tkntyp.id = _this.id;
	    _this.tags.tkntyp.group = _this.group;
	    _this.tags.tkntyp.options = {
	      tx1: _this.options.tx1,
	      tx2: _this.options.tx2,
	      type: _this.options.type,
	      typeGroup: _this.options.typeGroup
	    };
	  });
	
	  this.click = function () {
	    _storesCodeStoreJs.codeUtil.cursorToken().id = _this.id;
	    _storesCodeStoreJs.codeUtil.cursorToken().name = _this.name;
	    _storesCodeStoreJs.codeUtil.cursorToken().group = _this.group;
	    _storesCodeStoreJs.codeUtil.cursorToken().options = {
	      tx1: _this.options.tx1,
	      tx2: _this.options.tx2,
	      type: _this.options.type,
	      typeGroup: _this.options.typeGroup
	    };
	    _storesCodeStoreJs.signal.trigger('forceUpdateToken', _storesCodeStoreJs.codeState.cursor);
	    (0, _storesToolbarStoreJs.toolbarDo)({ action: 'closeTypekit' });
	  };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	__webpack_require__(23);
	
	__webpack_require__(25);
	
	riot.tag2('typekittypeinfo', '<div id="vkob">Type</div>', 'typekittypeinfo,[riot-tag="typekittypeinfo"],[data-is="typekittypeinfo"]{ position: absolute; display: block; top: .5vw; right: 37vw; width: 16vw; height: 16vw; background-color: #1d212d; } typekittypeinfo #vkob,[riot-tag="typekittypeinfo"] #vkob,[data-is="typekittypeinfo"] #vkob{ position: absolute; left: 1vw; top: .5vw; } typekittypeinfo tknvar,[riot-tag="typekittypeinfo"] tknvar,[data-is="typekittypeinfo"] tknvar,typekittypeinfo tknob,[riot-tag="typekittypeinfo"] tknob,[data-is="typekittypeinfo"] tknob{ font-size: 2.3vw; top: 0vw; left: 1vw; width: 13vw; height: 13vw; }', '', function (opts) {
	
	  _storesToolbarStoreJs.toolbarSignal.on('varkitVisible', function () {});
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	riot.tag2('typekitextern', '<div id="vkob">Extern</div>', 'typekitextern,[riot-tag="typekitextern"],[data-is="typekitextern"]{ position: absolute; display: block; top: 17vw; right: 53.5vw; width: 16vw; bottom: .5vw; background-color: #1d212d; } typekitextern #vkob,[riot-tag="typekitextern"] #vkob,[data-is="typekitextern"] #vkob{ position: absolute; left: 1vw; top: .5vw; } typekitextern tknvar,[riot-tag="typekitextern"] tknvar,[data-is="typekitextern"] tknvar,typekitextern tknob,[riot-tag="typekitextern"] tknob,[data-is="typekitextern"] tknob{ font-size: 2.3vw; top: 0vw; left: 1vw; width: 13vw; height: 13vw; }', '', function (opts) {
	  _storesToolbarStoreJs.toolbarSignal.on('varkitVisible', function () {});
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	__webpack_require__(23);
	
	__webpack_require__(25);
	
	riot.tag2('typekitimport', '<div id="vkob">Import</div>', 'typekitimport,[riot-tag="typekitimport"],[data-is="typekitimport"]{ position: absolute; display: block; top: 17vw; right: 37vw; width: 16vw; bottom: .5vw; background-color: #1d212d; } typekitimport #vkob,[riot-tag="typekitimport"] #vkob,[data-is="typekitimport"] #vkob{ position: absolute; left: 1vw; top: .5vw; } typekitimport tknvar,[riot-tag="typekitimport"] tknvar,[data-is="typekitimport"] tknvar,typekitimport tknob,[riot-tag="typekitimport"] tknob,[data-is="typekitimport"] tknob{ font-size: 2.3vw; top: 0vw; left: 1vw; width: 13vw; height: 13vw; }', '', function (opts) {
	  _storesToolbarStoreJs.toolbarSignal.on('varkitVisible', function () {});
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _storesToolbarStoreJs = __webpack_require__(7);
	
	__webpack_require__(23);
	
	__webpack_require__(25);
	
	riot.tag2('typekittypes', '<div id="vkob">Types</div>', 'typekittypes,[riot-tag="typekittypes"],[data-is="typekittypes"]{ position: absolute; display: block; top: .5vw; right: 53.5vw; width: 16vw; height: 16vw; background-color: #1d212d; } typekittypes #vkob,[riot-tag="typekittypes"] #vkob,[data-is="typekittypes"] #vkob{ position: absolute; left: 1vw; top: .5vw; } typekittypes tknvar,[riot-tag="typekittypes"] tknvar,[data-is="typekittypes"] tknvar,typekittypes tknob,[riot-tag="typekittypes"] tknob,[data-is="typekittypes"] tknob{ font-size: 2.3vw; top: 0vw; left: 1vw; width: 13vw; height: 13vw; }', '', function (opts) {
	
	  _storesToolbarStoreJs.toolbarSignal.on('varkitVisible', function () {});
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map