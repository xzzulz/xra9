import { toolbarSignal } from '../../../stores/toolbarStore.js'
import '../../tokens/tknvar.tag'
import '../../tokens/tknob.tag'



<obkitob>


  <div id="vkob">Object</div>


  <script>

    toolbarSignal.on('varkitVisible', () => {

    })

  </script>


  <style scoped>
    :scope {
      position: absolute;
      display: block;
      top: .5vw;
      right: 37.5vw;
      width: 17.5vw;
      bottom: .5vw;
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


</obkitob>
