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
import './tkntyp.tag'



<cell  draggable="true" ondragstart={ dragstart } ondrop={ drop } ondragover={ dragover }>


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
  <tkntyp if={ group == 'type' }></tkntyp>


  <script>

    this.dragstart = (e) => {
      e.preventUpdate = true
      e.dataTransfer.setData("text/plain", '');
      drag.dragStart( e, this )
      return true
    }

    this.dragover = (e) => {
      e.preventUpdate = true
      return false
    }

    this.drop = (e) => {
      e.preventUpdate = true
      drag.dragEnd( e )
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
