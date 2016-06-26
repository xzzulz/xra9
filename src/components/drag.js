import { codeState, signal } from '../stores/codeStore.js'


var currentCodeTag = null
var currentEl = null
var mouseMove = function( e ) {

  var x = e.pageX - currentCodeTag.parent.root.offsetLeft
  var y = e.pageY - currentCodeTag.parent.root.offsetTop

  codeState.floats[ codeState.floats.length -1 ].x = x
  codeState.floats[ codeState.floats.length -1 ].y = y
  signal.trigger('floatsUpdate')
  //currentEl.style.position = 'absolute'
  //currentEl.style.left = x + 'px'
  //currentEl.style.top = y + 'px'
  if (e.buttons == 0) currentCodeTag.root.onmousemove = null
}


var dragstart = function( e, tag ) {
  var tokenRowCol = { x: e.target.offsetLeft/56, y: e.target.offsetTop/56 }
  var mouseTokenXY = { x: e.layerX, y: e.layerY }

  var code = tag.parent.parent
  currentEl = tag.root
  currentCodeTag = code
  code.root.onmousemove = mouseMove
}


export { dragstart }
