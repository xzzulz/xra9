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
var scopeClass = function( x0, y0, x1, y1, color ) {
  this.x0 = x0
  this.y0 = y0
  this.x1 = x1
  this.y1 = y1
  this.color = color
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

// Token object creator
//
// name: (string) text name
var tokenClass = function( id, name ) {
  this.id = id
  this.name = name
  switch ( id ) {
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 70:
    case 71:
    case 72:
    case 73:
    case 80:
    case 81:
      this.options = new varTokenClass(); this.group = 'var'; break
    case 10:
      this.options = new functionTokenClass(); this.group = 'function'; break
    default:
      this.options = {}; this.group = 'token'; break
  }
}


// Token object creator
//
// name: (string) text name
var functionTokenClass = function( points, parPoints, parLen, bubble ) {
  this.points = points ? points : 0
  this.parPoints = parPoints ? parPoints : 0
  this.parLen = parLen ? parLen : 0
  this.bubble = bubble ? bubble : false
}


// Token object creator
//
// name: (string) text name
var varTokenClass = function( tx1, tx2, bubble ) {
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
export { scopeClass, lineClass, tokenClass, stepClass, floatClass, floatTokenClass }
