
var panelStoreClass = function() {

  this.state = {
    panels: [
      { x: 0, y:0, w: 100, h: 100 }
    ],
    active: 0
  }

  var state = this.state

  this.mutations = {
  }

}

var panelStore = new panelStoreClass()

var panelState = panelStore.state
var panelMutat = panelStore.mutations

export { panelState, panelMutat }
