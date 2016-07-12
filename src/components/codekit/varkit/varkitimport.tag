import { toolbarSignal } from '../../../stores/toolbarStore.js'
import '../../tokens/tknvar.tag'
import '../../tokens/tknob.tag'



<varkitimport>


  <div id="vkob">Import</div>


  <script>

    toolbarSignal.on('varkitVisible', () => {

    })

  </script>


  <style scoped>
    :scope {
      position: absolute;
      display: block;
      top: 50vh;
      right: 55.5vw;
      left: .5vw;
      bottom: .5vh;
      background-color: #1d212d;
    }
    #vkob {
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


</varkitimport>
