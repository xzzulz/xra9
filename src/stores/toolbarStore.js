
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

      { id: 8 },
      { id: 0 },
      { id: 0 },
    ],

    utilkit: [
      { id: 0 },
      { id: 1 },
    ]

  }

  var state = this.state

  this.mutations = {
  }

}

var toolbarStore = new toolbarStoreClass()

var toolbarState = toolbarStore.state


export { toolbarState }
