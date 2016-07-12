import { codeUtil, signal } from '../../stores/codeStore.js'
import './optiontags/optnfunc.tag'
import './optiontags/optnvar.tag'
import './optiontags/optnarrw.tag'
import './optiontags/optnnum.tag'
import './optiontags/optntext.tag'
import './optiontags/optncomm.tag'
import './optiontags/optnop.tag'
import './optiontags/optnloop.tag'
import './optiontags/optnif.tag'
import './optiontags/optnpin.tag'
import './optiontags/optnflag.tag'
import './optiontags/optnob.tag'


<optionkit>


  <optnvar if={ group == 'var' || group == 'array' }></optnvar>
  <optnfunc if={ group == 'function' }></optnfunc>
  <optnarrw if={ group == 'arrow' }></optnarrw>
  <optnnum if={ group == 'number' }></optnnum>
  <optntext if={ group == 'text' }></optntext>
  <optncomm if={ group == 'comment' }></optncomm>
  <optnop if={ group == 'operator' }></optnop>
  <optnloop if={ group == 'loop' }></optnloop>
  <optnif if={ group == 'if' }></optnif>
  <optnpin if={ group == 'pin' }></optnpin>
  <optnflag if={ group == 'flag' }></optnflag>
  <optnob if={ group == 'object' }></optnob>


  <script>

    this.on('update', () => {
      this.group = codeUtil.cursorToken().group
    })

    signal.on( 'updateCursor', () => {
      this.update()
    })

    signal.on( 'updateOptionkit', () => {
      this.update()
    })

  </script>


  <style scoped>
    :scope {
      position: absolute;
      right: 0;
      top: 0vh;
      width: 24vh;
      height: 22vh;
      box-sizing: border-box;
      display: block;
      background: #151821;
      border: .4vh solid #1d2233;
    }
  </style>


</optionkit>
