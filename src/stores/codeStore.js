import { lines, scopes, floats } from '../sampleData/sampleCodeData.js'
import { scopeClass, lineClass, tokenClass, stepClass, floatClass, floatTokenClass } from '../stores/codeClasses.js'


var codeStoreClass = function() {

  this.state = {
    lines: [],
    floats: [],
    scopes: [],
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
      this.putToken( moveData.to, this.grabToken( moveData.from ) )
      signal.trigger('updateTokens', [ moveData.from, moveData.to ])
    }

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
