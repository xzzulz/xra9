


var keymap = {
  ArrowUp: 'code',
  ArrowDown: 'code',
  ArrowLeft: 'code',
  ArrowRight: 'code',
}

var code = ''

window.onkeydown = function( e ) {
  code = e.code
  if ( keymap[ code ] )
    keys[ keymap[ code ] ] ( e )
}


var keys = {}

keys.code = ( e ) => {

}

export default keys
