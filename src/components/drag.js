import { codeDo } from '../stores/codeStore.js'

var drag = {}

var currentCodeElem = null
var currentPanelElem = null
var tokenFromLoc = null
var mouseGrabDeltaTokenXY = null

drag.dragStart = ( e, tag ) => {

  currentCodeElem = e.target.parentElement.parentElement.parentElement
  currentPanelElem = currentCodeElem.parentElement

  var scrollX = currentCodeElem.scrollLeft
  var scrollY = currentCodeElem.scrollTop
  var offsetX = currentCodeElem.offsetLeft + currentPanelElem.offsetLeft
  var offsetY = currentCodeElem.offsetTop + currentPanelElem.offsetTop

  var x = e.clientX + scrollX - offsetX
  var y = e.clientY + scrollY - offsetY

  tokenFromLoc = { x: Math.floor( x/56 ), y: Math.floor( y/56 ) }
  mouseGrabDeltaTokenXY = { x: e.offsetX, y: e.offsetY }

}

drag.dragEnd = ( e ) => {

  var scrollX = currentCodeElem.scrollLeft
  var scrollY = currentCodeElem.scrollTop
  var offsetX = currentCodeElem.offsetLeft + currentPanelElem.offsetLeft
  var offsetY = currentCodeElem.offsetTop + currentPanelElem.offsetTop

  var x = e.clientX + scrollX - offsetX
  var y = e.clientY + scrollY - offsetY

  var xy = { x: x, y: y }

  var toCol = Math.floor( (x+28-mouseGrabDeltaTokenXY.x)/56 )
  var toRow = Math.floor( (y+28-mouseGrabDeltaTokenXY.y)/56 )
  var toLoc = { x: toCol, y: toRow }

  codeDo({
    action: 'moveToken',
    data: { from: tokenFromLoc, to: toLoc }
  })
}


export default drag
