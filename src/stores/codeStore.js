import { lines, scopes } from '../sampleData/sampleCodeData.js'


var codeStoreClass = function() {

  this.state = {
    lines: [],
    scopes: []
  }

  var state = this.state

  this.mutations = {
    setData( lines, scopes ) {
      state.lines = lines
      state.scopes = scopes
    },
  }

}

var codeStore = new codeStoreClass()

codeStore.mutations.setData( lines, scopes )


var codeState = codeStore.state
var codeMutat = codeStore.mutations

export { codeState, codeMutat }
