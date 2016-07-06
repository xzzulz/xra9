import { codeState } from './codeStore.js'


var toolbarStoreClass = function() {

  this.state = {

    toolkit: [
      { id: 94 },
      { id: 1 },
      { id: 2 },

      { id: 90 },
      { id: 91 },
      { id: 92 },

      { id: 10 },
      { id: 40 },
      { id: 18 },

      { id: 30 },
      { id: 31 },
      { id: 32 },

      { id: 20 },
      { id: 21 },
      { id: 22 },

      { id: 0 },
      { id: 95 },
      { id: 96 },

    ],

    datakit: [
      { id: 3 },
      { id: 4 },
      { id: 5 },

      { id: 6 },
      { id: 7 },
      { id: 70 },
    ],

    utilkit: [
      { id: 0 },
      { id: 1 },
    ],

    varkit: {
      visible: false
    },
    numkit: {
      visible: false
    }

  }

  var state = this.state

  this.signal = riot.observable()
  var signal = this.signal

  this.mutations = {

    inputKitVisible() {
      var group = codeState.lines[ codeState.cursor.y ].tokens[ codeState.cursor.x ].group
      if ( group == 'var' || group == 'function' ) this.varkitVisible()
      else if ( group == 'number' ) this.numkitVisible()
    },

    openInputKit() {
      var group = codeState.lines[ codeState.cursor.y ].tokens[ codeState.cursor.x ].group
      if ( group == 'var' || group == 'function' ) this.openVarkit()
      else if ( group == 'number' ) this.openNumkit()
    },

    varkitVisible() {
      if ( ! state.varkit.visible ) this.openVarkit()
      else this.closeVarkit()
      signal.trigger('varkitVisible')
    },

    openVarkit() {
      var group = codeState.lines[ codeState.cursor.y ].tokens[ codeState.cursor.x ].group
      if ( group == 'var' || group == 'function' ) {
        state.varkit.visible = true
        signal.trigger('varkitVisible')
      }
    },

    closeVarkit() {
      state.varkit.visible = false
      signal.trigger('varkitVisible')
    },


    numkitVisible() {
      if ( ! state.numkit.visible ) this.openNumkit()
      else this.closeNumkit()
      signal.trigger('numkitVisible')
    },

    openNumkit() {
      var group = codeState.lines[ codeState.cursor.y ].tokens[ codeState.cursor.x ].group
      if ( group == 'number' ) {
        state.numkit.visible = true
        signal.trigger('numkitVisible')
      }
    },

    closeNumkit() {
      state.numkit.visible = false
      signal.trigger('numkitVisible')
    }

  }

  this.do = ( action ) => {
    if ( this.mutations[ action.action ] ) this.mutations[ action.action ]( action.data )
  }

}

var toolbarStore = new toolbarStoreClass()

var toolbarState = toolbarStore.state
var toolbarDo = toolbarStore.do
var toolbarSignal = toolbarStore.signal

export { toolbarState, toolbarDo, toolbarSignal }
