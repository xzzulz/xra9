import { codeState, signal } from '../../stores/codeStore.js'
import './optiontags/optnfunc.tag'
import './optiontags/optnvar.tag'
import './optiontags/optnarrw.tag'
import './optiontags/optnnum.tag'



<optionkit>


  <optnvar if={ group == 'var' }></optnvar>
  <optnfunc if={ group == 'function' }></optnfunc>
  <optnarrw if={ group == 'arrow' }></optnarrw>
  <optnnum if={ group == 'number' }></optnnum>


  <script>

    this.on('update', () => {
      this.group = codeState.lines[ codeState.cursor.y ].tokens[ codeState.cursor.x ].group
    })

    signal.on( 'updateCursor', () => {
      this.update()
    })

  </script>


  <style scoped>
    :scope {
      height: 20%;
      display: block;
      background: #151821;
      border: .4vh solid #1d2233;
      position: relative;
    }
  </style>


</optionkit>
