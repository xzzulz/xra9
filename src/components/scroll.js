

var scroll = {}

var pos0 = null
var scroll0 = {}


scroll.start = ( e ) => {
  if ( e.buttons != 4 ) return
  e.currentTarget.onmousemove = scroll.move
  pos0 = { x: e.clientX, y: e.clientY }
  scroll0 = { sx: e.currentTarget.scrollLeft, sy: e.currentTarget.scrollTop }
}

scroll.move = ( e ) => {
  if ( e.buttons == 4 ) {

    e.currentTarget.scrollLeft = scroll0.sx + pos0.x - e.clientX
    e.currentTarget.scrollTop = scroll0.sy + pos0.y - e.clientY
  } else {
    e.currentTarget.onmousemove = null
  }
}


export default scroll
