import { codeDo } from '../stores/codeStore.js'

var cursor = {}

cursor.click = ( e ) => {

  var currentCodeElem = e.currentTarget
  var currentPanelElem = currentCodeElem.parentElement

  var scrollX = currentCodeElem.scrollLeft
  var scrollY = currentCodeElem.scrollTop
  var offsetX = currentCodeElem.offsetLeft + currentPanelElem.offsetLeft
  var offsetY = currentCodeElem.offsetTop + currentPanelElem.offsetTop

  var x = Math.floor( ( e.clientX + scrollX - offsetX ) / 56 )
  var y = Math.floor( ( e.clientY + scrollY - offsetY ) / 56 )

  codeDo({
    action: 'moveCursor',
    data: { x, y }
  })

}

cursor.key = ( code ) => {
  switch (code) {
    case 'ArrowUp':
      codeDo({ action: 'moveCursorUp' })
      break
    case 'ArrowDown':
      codeDo({ action: 'moveCursorDown' })
      break
    case 'ArrowLeft':
      codeDo({ action: 'moveCursorLeft' })
      break
    case 'ArrowRight':
      codeDo({ action: 'moveCursorRight' })
      break
  }
}

export default cursor
