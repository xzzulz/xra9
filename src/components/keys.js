import { toolbarDo } from '../stores/toolbarStore.js'

/*
var keymap = {
  ArrowUp: 'code',
  ArrowDown: 'code',
  ArrowLeft: 'code',
  ArrowRight: 'code',
  Space: 'here',
  Enter: 'here',
  NumpadEnter: 'here'
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

keys.here = ( e ) => {
  code = e.code
  if ( code == 'Space') {
      toolbarDo({ action: 'openVarkit' })
  }

  if ( code == 'Enter' || code == 'NumpadEnter' ) {
    toolbarDo({ action: 'varkitVisible' })
  }
}
*/
var keySource = riot.observable()
export default keySource

var code
window.onkeydown = function( e ) {
  code = e.code
  switch ( code ) {
    case 'ArrowUp':
    case 'ArrowDown':
    case 'ArrowLeft':
    case 'ArrowRight':
      keySource.trigger( 'arrow', e ); break
    case 'Enter':
    case 'NumpadEnter':
      keySource.trigger( 'enter', e ); break
    case 'Space':
      keySource.trigger( 'space', e ); break
  }
}
