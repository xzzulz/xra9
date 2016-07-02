import './stores/panelStore';
import './components/main.tag'

riot.mount('#app', 'main');

document.oncontextmenu = ( e ) => {
  return false
}
