import { lines, scopes, floats } from '../sampleData/sampleCodeData.js'
import { scopeClass, lineClass, tokenClass, stepClass, floatClass, floatTokenClass } from '../stores/codeClasses.js'


var codeStoreClass = function() {

  this.state = {
    lines: [],
    floats: [],
    scopes: [],
    cursor: { x: 0, y: 0 },
    optionToken: {
      loc: { x: 0, y: 0 },
      group: null
    }
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

    setToken( data ) {
      var token = state.lines[ state.cursor.y ].tokens[ state.cursor.x ] = new tokenClass( data.id, data.name )
      this.setOptionToken()
      signal.trigger('updateLines', [ state.cursor.y ])
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
      this.setOptionToken()
      signal.trigger( 'updateCursor' )
    },

    moveCursorUp() {
      if ( state.cursor.y > 0 ) {
        state.cursor.y--
        this.setOptionToken()
        signal.trigger( 'updateCursor' )
      }
    },

    moveCursorDown() {
      if ( state.cursor.y < state.lines.length - 1 ) {
        state.cursor.y++
        this.setOptionToken()
        signal.trigger( 'updateCursor' )
      }
    },

    moveCursorLeft() {
      if ( state.cursor.x > 0 ) {
        state.cursor.x--
        this.setOptionToken()
        signal.trigger( 'updateCursor' )
      }
    },

    moveCursorRight() {
      if ( state.cursor.x < state.lines[0].tokens.length - 1 ) {
        state.cursor.x++
        this.setOptionToken()
        signal.trigger( 'updateCursor' )
      }
    },

    util( data ) {
      if ( data.id == 0 ) {// save
        var stateString = JSON.stringify( state )
        console.log( stateString )
        download('code.json', stateString)
        //var uriContent = "data:text/plain," + encodeURIComponent( stateString )
        //newWindow = window.open(uriContent, 'save file')
      }
    },

    setOptionToken() {
      if ( state.lines[ state.cursor.y ].tokens[ state.cursor.x ].id != 0 ) {
        state.optionToken.loc = { x: state.cursor.x, y: state.cursor.y }
        state.optionToken.group = state.lines[ state.cursor.y ].tokens[ state.cursor.x ].group
        signal.trigger( 'updateOptionToken' )
      }
    },

    functionPoints( data ) {
      if ( state.optionToken.group == 'function' ) {
        state.lines[ state.optionToken.loc.y ].tokens[ state.optionToken.loc.x ].options.points = data
        signal.trigger('updateLines', [ state.optionToken.loc.y ])
      }
    },

    functionBubble() {
      var token = state.lines[ state.optionToken.loc.y ].tokens[ state.optionToken.loc.x ]
      if ( state.optionToken.group == 'function' ) {
        token.options.bubble = ! token.options.bubble
        if ( token.options.bubble ) {
          token.options.parLen = 0
        }
        signal.trigger('updateLines', [ state.optionToken.loc.y ])
      }
    },

    functionParPoints( data ) {
      var token = state.lines[ state.optionToken.loc.y ].tokens[ state.optionToken.loc.x ]
      if ( state.optionToken.group == 'function' && !token.options.bubble ) {

        if ( token.options.parPoints === data ) token.options.parLen++
        else {
          token.options.parPoints = data
          token.options.parLen = 1
        }
        signal.trigger('updateLines', [ state.optionToken.loc.y ])
      }
    },

    functionParX() {
      if ( state.optionToken.group == 'function' ) {
        state.lines[ state.optionToken.loc.y ].tokens[ state.optionToken.loc.x ].options.parLen = 0
        signal.trigger('updateLines', [ state.optionToken.loc.y ])
      }
    },

  }

  this.do = ( action ) => {
    if ( this.mutations[ action.action ] ) this.mutations[ action.action ]( action.data )
  }
}



function download(filename, text) {
  var element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  element.setAttribute('download', filename)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}



var codeStore = new codeStoreClass()

codeStore.mutations.setData( lines, scopes, floats )

var codeState = codeStore.state
var codeDo = codeStore.do
var signal = codeStore.signal

export { codeState, codeDo, signal }
