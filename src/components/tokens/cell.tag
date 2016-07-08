import drag from '../drag.js'
import './token.tag'
import './tknfunc.tag'
import './tknvar.tag'
import './tknob.tag'
import './tknarr.tag'
import './tknarrw.tag'
import './tknnum.tag'
import './tkntext.tag'
import './tkncomm.tag'
import './tknop.tag'
import './tknloop.tag'
import './tknif.tag'
import './tknpin.tag'
import './tknflag.tag'



<cell  draggable="true" ondragstart={ dragstart } ondrag={ drag } ondrop={ drop } ondragover="return false">


  <token if={ group == 'token' }></token>
  <tknvar if={ group == 'var' }></tknvar>
  <tknob if={ group == 'object' }></tknob>
  <tknarr if={ group == 'array' }></tknarr>
  <tknfunc if={ group == 'function' }></tknfunc>
  <tknarrw if={ group == 'arrow' }></tknarrw>
  <tknnum if={ group == 'number' }></tknnum>
  <tkntext if={ group == 'text' }></tkntext>
  <tkncomm if={ group == 'comment' }></tkncomm>
  <tknop if={ group == 'operator' }></tknop>
  <tknloop if={ group == 'loop' }></tknloop>
  <tknif if={ group == 'if' }></tknif>
  <tknpin if={ group == 'pin' }></tknpin>
  <tknflag if={ group == 'flag' }></tknflag>


  <script>

    this.dragstart = (e) => {
      e.preventUpdate = true
      e.dataTransfer.setData("text/plain", '10');
      drag.dragStart( e, this )
      return true
    }

    this.drag = (e) => {
      e.preventUpdate = true
      return true
    }

    this.drop = (e) => {
      e.preventUpdate = true
      drag.dragEnd( e )
      return true
    }

  </script>


  <style scoped>
    :scope {
      width: 56px;
      height: 56px;
      display: inline-block;
      position: relative;
    }
  </style>


</cell>
