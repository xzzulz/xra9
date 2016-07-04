


///////////////////////////////////////////////////////////

// code model



export var CodeModel = function( lines, scopes ) {

  this.lines = lines
  this.scopes = scopes
  this.dragging= {
    x: 0,
    y: 0,
    token: null
  }

  this.insertToken = ( token, line, col ) => {
    lines[line].tokens[col] = token
  }

  this.removeToken = ( line, col ) => {
    var token = lines[line].tokens[col]
    delete lines[line].tokens[col]
    return token
  }

  this.tokenToDragging = function( line, col ) {
    this.dragging.x = col
    this.dragging.y = line
    var token = this.removeToken( line, col )
    this.dragging.token = token
  }

}



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
    case 10: this.options = new functionTokenClass(); break
    default: this.options = {}; break
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
