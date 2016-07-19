import { codeState, codeUtil, codeDo } from './codeStore.js'


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
      { id: 13 },

      { id: 30 },
      { id: 31 },
      { id: 32 },

      { id: 20 },
      { id: 21 },
      { id: 22 },

      { id: 95 },


    ],

    datakit: [
      { id: 3 },
      { id: 4 },
      { id: 5 },

      { id: 6 },
      { id: 7 },
      { id: 70 },

      { id: 60 },
    ],

    utilkit: [
      { id: 0 },
      { id: 1 },
    ],

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
    },
  }

  var state = this.state

  this.signal = riot.observable()
  var signal = this.signal

  this.mutations = {

    inputKitVisible() {
      var group = codeUtil.cursorToken().group
      if ( group == 'var' || group == 'array' || group == 'function' ) this.varkitVisible()
      else if ( group == 'object' ) this.obkitVisible()
      else if ( group == 'number' ) this.numkitVisible()
      else if ( group == 'text' || group == 'comment' ) this.textkitVisible()
      else if ( group == 'operator' ) this.opkitVisible()
      else if ( group == 'type' ) this.typekitVisible()
    },

    openInputKit() {
      var group = codeUtil.cursorToken().group
      if ( group == 'var' || group == 'array' || group == 'function' ) this.openVarkit()
      else if ( group == 'object' ) this.openObkit()
      else if ( group == 'number' ) this.openNumkit()
      else if ( group == 'text' || group == 'comment' ) this.openTextkit()
      else if ( group == 'operator' ) this.openOpkit()
      else if ( group == 'type' ) this.openTypekit()
    },

    varkitVisible() {
      if ( ! state.varkit.visible ) this.openVarkit()
      else this.closeVarkit()
    },

    openVarkit() {
      var group = codeUtil.cursorToken().group
      if ( group == 'var' || group == 'array' || group == 'function' || group == 'type' ) {
        state.varkit.visible = true
        signal.trigger('varkitVisible')
      }
    },

    closeVarkit() {
      state.varkit.visible = false
      signal.trigger('varkitVisible')
    },

    obkitVisible() {
      if ( ! state.obkit.visible ) this.openObkit()
      else this.closeObkit()
    },

    openObkit() {
      var group = codeUtil.cursorToken().group
      if ( group == 'object' ) {
        state.obkit.visible = true
        signal.trigger('obkitVisible')
      }
    },

    closeObkit() {
      state.obkit.visible = false
      signal.trigger('obkitVisible')
    },


    numkitVisible() {
      if ( ! state.numkit.visible ) this.openNumkit()
      else this.closeNumkit()
    },

    openNumkit() {
      var group = codeUtil.cursorToken().group
      if ( group == 'number' ) {
        state.numkit.visible = true
        signal.trigger('numkitVisible')
      }
    },

    closeNumkit() {
      state.numkit.visible = false
      signal.trigger('numkitVisible')
    },


    textkitVisible() {
      if ( ! state.textkit.visible ) this.openTextkit()
      else this.closeTextkit()
    },

    openTextkit() {
      var group = codeUtil.cursorToken().group
      if ( group == 'text' || group == 'comment' ) {
        state.textkit.visible = true
        signal.trigger('textkitVisible')
      }
    },

    closeTextkit() {
      state.textkit.visible = false
      signal.trigger('textkitVisible')
    },


    opkitVisible() {
      if ( ! state.opkit.visible ) this.openOpkit()
      else this.closeOpkit()
    },

    openOpkit() {
      var group = codeUtil.cursorToken().group
      if ( group == 'operator' ) {
        state.opkit.visible = true
        signal.trigger('opkitVisible')
      }
    },

    closeOpkit() {
      state.opkit.visible = false
      signal.trigger('opkitVisible')
    },

    dotColor() {
      state.dotkit.visible = true
      state.dotkit.target = 'dot'
      signal.trigger('dotkitVisible')
    },

    propColor() {
      state.dotkit.visible = true
      state.dotkit.target = 'prop'
      signal.trigger('dotkitVisible')
    },

    indexColor() {
      state.dotkit.visible = true
      state.dotkit.target = 'index'
      signal.trigger('dotkitVisible')
    },

    pinColor() {
      state.dotkit.visible = true
      state.dotkit.target = 'pin'
      signal.trigger('dotkitVisible')
    },

    setColor( color ) {
      switch ( state.dotkit.target ) {
        case 'dot': codeDo({ action: 'dotColor', data: color }) ; break
        case 'prop': codeDo({ action: 'propColor', data: color }) ; break
        case 'index': codeDo({ action: 'indexColor', data: color }) ; break
        case 'pin': codeDo({ action: 'pinColor', data: color }) ; break
      }
      state.dotkit.visible = false
      signal.trigger('dotkitVisible')
    },
/*
    dotkitVisible() {
      state.dotkit.visible = ! state.dotkit.visible
      signal.trigger('dotkitVisible')
    },

    propkitVisible() {
      state.propkit.visible = ! state.propkit.visible
      signal.trigger('propkitVisible')
    },
*/
    typekitVisible() {
      if ( ! state.typekit.visible ) this.openTypekit()
      else this.closeTypekit()
    },

    openTypekit() {
      var group = codeUtil.cursorToken().group
      if ( group == 'type' ) {
        state.typekit.visible = true
        signal.trigger('typekitVisible')
      }
    },

    closeTypekit() {
      state.typekit.visible = false
      signal.trigger('typekitVisible')
    },

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
