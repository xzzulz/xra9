import { codeDo, codeState } from '../stores/codeStore.js'
import { panelState } from '../stores/panelStore.js'
import keySource from './keys.js'



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

keySource.on( 'arrow', ( e ) => {
  e.preventDefault()
  switch ( e.code ) {
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

  cursor.scroll()
})


cursor.scroll = () => {

  //var cur = document.getElementsByTagName("cursor")[0]
  //cur.scrollIntoView() too rough scrolling on chrome

  var cursorLoc = { x: codeState.cursor.x*56, y: codeState.cursor.y*56 }
  var code = document.getElementsByTagName('code')[ panelState.active ]

  var size = { w: code.clientWidth, h: code.clientHeight }
  var scroll = { l: code.scrollLeft, t: code.scrollTop }

  if ( cursorLoc.x - 56 < scroll.l ) code.scrollLeft = cursorLoc.x - 56
  if ( cursorLoc.x + 112 > scroll.l + size.w ) code.scrollLeft = cursorLoc.x + 112 - size.w
  if ( cursorLoc.y - 56 < scroll.t ) code.scrollTop = cursorLoc.y - 56
  if ( cursorLoc.y + 112 > scroll.t + size.h ) code.scrollTop = cursorLoc.y + 112 - size.h

}



export default cursor
