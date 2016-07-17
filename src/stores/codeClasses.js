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
var scopeClass = function( x, y, w, h, lvl ) {
  this.x = x
  this.y = y
  this.w = w
  this.h = h
  this.lvl = lvl
}


///////////////////////////////////////////////////////////

// lines


// Line object
// height: (integer) height of this line in cells
// tokens: (array)
// chains: (array)
var lineClass = function( tokens, chains ) {
  this.tokens = tokens
  this.chains = chains
}


var varlistItem = function( frame, blocks, token ) {
  this.frame = frame ? frame : 0
  this.blocks = blocks ? blocks : []
  this.token = token ? token : new tokenClass()
}


// Token object creator
//
// name: (string) text name
var tokenClass = function( id, name, ...options ) {
  this.id = id ? id : 0
  this.name = name ? name : ''
  switch ( this.id ) {
    case 0:
      this.options = {}; this.group = ''; break
    case 3:
    case 4:
    case 5:
      this.options = new varTokenClass( options[0], options[1], options[2] ); this.group = 'var'; break
    case 70:
    case 71:
    case 72:
      this.options = new typeTokenClass( options[0], options[1], options[2], options[3], options[4], options[5] ); this.group = 'type'; break
    case 73:
    case 80:
    case 81:
    case 82:
      this.options = new eventTokenClass(); this.group = 'event'; break
    case 6:
      this.options = new objectTokenClass( options[0], options[1], options[2], options[3], options[4], options[5], options[6] ); this.group = 'object'; break
    case 7:
      this.options = new arrayTokenClass(); this.group = 'array'; break
    case 10:
      this.options = new functionTokenClass(); this.group = 'function'; break
    case 13:
      this.options = new blokTokenClass(); this.group = 'block'; break
    case 22:
      this.options = new ifTokenClass(); this.group = 'if'; break
    case 30:
      this.options = new loopTokenClass(); this.group = 'loop'; break
    case 40:
      this.options = new operatorTokenClass(); this.group = 'operator'; break
    case 90:
      this.options = new numberTokenClass(); this.group = 'number'; break
    case 91:
      this.options = new textTokenClass(); this.group = 'text'; break
    case 92:
      this.options = new commentTokenClass(); this.group = 'comment'; break
    case 94:
      this.options = new arrowTokenClass(); this.group = 'arrow'; break
    case 95:
      this.options = new pinTokenClass(); this.group = 'pin'; break
    case 96:
      this.options = new flagTokenClass(); this.group = 'flag'; break
    default:
      this.options = {}; this.group = 'token'; break
  }
}


// Token object creator
//
// name: (string) text name
var objectTokenClass = function( tx1, tx2, type, typeGroup, bubble, dot, prop, typedot ) {
  this.tx1 = tx1 ? tx1 : ''
  this.tx2 = tx2 ? tx2 : ''
  this.type = type ? type : ''
  this.typeGroup = typeGroup ? typeGroup : ''
  this.bubble = bubble ? bubble : false
  this.dot = dot ? dot : ''
  this.prop = prop ? prop : ''
  this.typedot = typedot ? typedot : false
}

// Token object creator
//
// name: (string) text name
var typeTokenClass = function( tx1, tx2, type, typeGroup, dot, points, def ) {
  this.tx1 = tx1 ? tx1 : ''
  this.tx2 = tx2 ? tx2 : ''
  this.type = type ? type : ''
  this.typeGroup = typeGroup ? typeGroup : ''
  this.def = def ? def : false
  this.dot = dot ? dot : false
  this.points = points ? points : 0
}

// Token object creator
//
// name: (string) text name
var arrayTokenClass = function( tx1, tx2, bubble ) {
  this.tx1 = tx1 ? tx1 : ''
  this.tx2 = tx2 ? tx2 : ''
  this.bubble = bubble ? bubble : false
}

// Token object creator
//
// name: (string) text name
var functionTokenClass = function( points, parPoints, parLen, bubble, tx1, tx2 ) {
  this.points = points ? points : 0
  this.parPoints = parPoints ? parPoints : 0
  this.parLen = parLen ? parLen : 0
  this.bubble = bubble ? bubble : false
  this.tx1 = tx1 ? tx1 : ''
  this.tx2 = tx2 ? tx2 : ''
}

// Token object creator
//
// name: (string) text name
var operatorTokenClass = function( id, def, points, parPoints, parLen ) {
  this.id = id ? id : 20
  this.points = points ? points : 0
  this.parPoints = parPoints ? parPoints : 0
  this.parLen = parLen ? parLen : 0
  this.def = def ? def : false
}

// Token object creator
//
// name: (string) text name
var ifTokenClass = function( o, x, cond ) {
  this.o = o ? o : 0
  this.x = x ? x : 1
  this.cond = cond ? cond : 2
}

// Token object creator
//
// name: (string) text name
var arrowTokenClass = function( points ) {
  this.points = points ? points : 0
}

// Token object creator
//
// name: (string) text name
var flagTokenClass = function( points, color ) {
  this.points = points ? points : 0
  this.color = color ? color : -110
}

// Token object creator
//
// name: (string) text name
var pinTokenClass = function( points, bubble, color ) {
  this.points = points ? points : 0
  this.bubble = bubble ? bubble : false
  this.color = color ? color : 0
}

// Token object creator
//
// name: (string) text name
var numberTokenClass = function( value ) {
  this.value = value ? value : 0
}

// Token object creator
//
// name: (string) text name
var textTokenClass = function( value ) {
  this.value = value ? value : 'abc'
}

// Token object creator
//
// name: (string) text name
var commentTokenClass = function( value, width ) {
  this.value = value ? value : 'comm'
  this.width = width ? width : 1
}

// Token object creator
//
// name: (string) text name
var loopTokenClass = function( parPoints, parLen ) {
  this.parPoints = parPoints ? parPoints : 0
  this.parLen = parLen ? parLen : 0
}

// Token object creator
//
// name: (string) text name
var blokTokenClass = function( w, h, lvl ) {
  this.w = w ? w : 1
  this.h = h ? h : 1
  this.lvl = lvl ? lvl : 1
}

// Token object creator
//
// name: (string) text name
var varTokenClass = function( tx1, tx2, bubble, prop, typedot ) {
  this.tx1 = tx1 ? tx1 : ''
  this.tx2 = tx2 ? tx2 : ''
  this.bubble = bubble ? bubble : false
  this.prop = prop ? prop : ''
  this.typedot = typedot ? typedot : false
}

// todo: review this
var eventTokenClass = function( tx1, tx2, bubble ) {
  this.tx1 = tx1 ? tx1 : ''
  this.tx2 = tx2 ? tx2 : ''
  this.bubble = bubble ? bubble : false
}

// floating set of tokens
//
//
var floatClass = function( x, y, width, height, floatTokens ) {
  this.w = width
  this.h = height
  this.x = x
  this.y = y
  this.floatTokens = floatTokens
}


// floating set of tokens
//
//
var floatTokenClass = function( token, x, y ) {
  //this.token = token
  Object.assign(this, token)
  this.x = x
  this.y = y
}


// Step object creator
//
// A step is each of the cells that make a chain.
// stepId: (integer) step block identifier, from 0 to 5
var stepClass = function( stepId ) {
  this.stepId = stepId
}

////////////////////////////////////////////////////////////
export { scopeClass, lineClass, varlistItem, tokenClass, stepClass, floatClass, floatTokenClass, typeTokenClass }
