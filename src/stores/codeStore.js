import { lines, scopes, floats } from '../sampleData/sampleCodeData.js'
import { scopeClass, lineClass, tokenClass, stepClass, floatClass, floatTokenClass } from '../stores/codeClasses.js'


var codeStoreClass = function() {

  this.state = {
    lines: [],
    floats: [],
    scopes: [],
    cursor: { x: 0, y: 0 }
  }

  var state = this.state

  this.signal = riot.observable()
  var signal = this.signal

  this.mutations = {
    setData( lines, scopes, floats ) {
      state.lines = lines
      state.scopes = scopes
      state.floats = floats
    },

    grabToken( loc ) {
      var token = state.lines[ loc.y ].tokens[ loc.x ]
      var tokenData = { id: token.id, name: token.name }
      token.id = 0
      token.name = ''
      return tokenData
    },

    putToken( loc, tokenData ) {
      state.lines[ loc.y ].tokens[ loc.x ].id = tokenData.id
      state.lines[ loc.y ].tokens[ loc.x ].name = tokenData.name
    },

    moveToken( moveData ) {
      if ( state.lines[ moveData.to.y ].tokens[ moveData.to.x ].id == 0 ) {
        this.putToken( moveData.to, this.grabToken( moveData.from ) )
        signal.trigger('updateLines', [ moveData.from.y, moveData.to.y ])
      }
    },

    moveCursor( loc ) {
      state.cursor.x = loc.x
      state.cursor.y = loc.y
      signal.trigger( 'updateCursor' )
    },

    moveCursorUp() {
      if ( state.cursor.y > 0 ) {
        state.cursor.y--
        signal.trigger( 'updateCursor' )
      }
    },

    moveCursorDown() {
      if ( state.cursor.y < state.lines.length - 1 ) {
        state.cursor.y++
        signal.trigger( 'updateCursor' )
      }
    },

    moveCursorLeft() {
      if ( state.cursor.x > 0 ) {
        state.cursor.x--
        signal.trigger( 'updateCursor' )
      }
    },

    moveCursorRight() {
      if ( state.cursor.x < state.lines[0].tokens.length - 1 ) {
        state.cursor.x++
        signal.trigger( 'updateCursor' )
      }
    },

  }

  this.do = ( action ) => {
    if ( this.mutations[ action.action ] ) this.mutations[ action.action ]( action.data )
  }
}

var codeStore = new codeStoreClass()

codeStore.mutations.setData( lines, scopes, floats )

var codeState = codeStore.state
var codeDo = codeStore.do
var signal = codeStore.signal

export { codeState, codeDo, signal }
