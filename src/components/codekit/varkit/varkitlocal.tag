import { toolbarSignal } from '../../../stores/toolbarStore.js'
import '../../tokens/tknvar.tag'
import '../../tokens/tknob.tag'



<varkitlocal>


  <div id="vklc">Local</div>


  <script>

    toolbarSignal.on('varkitVisible', () => {

    })

  </script>


  <style scoped>
    :scope {
      position: absolute;
      display: block;
      top: 17vw;
      right: .5vw;
      width: 36vw;
      bottom: .5vw;
      background-color: #1d212d;
    }
    #vklc {
      position: absolute;
      left: 1vw;
      top: .5vw;
    }

    tknvar,tknob {
      font-size: 2.3vw;
      top: 0vw;
      left: 1vw;
      width: 13vw;
      height: 13vw;
    }
  </style>


</varkitlocal>
