import { codeState, codeUtil } from '../../../stores/codeStore.js'
import { toolbarSignal } from '../../../stores/toolbarStore.js'
import './oblistitem.tag'



<obkitlocal>


  <div id="vklc">Local</div>
  <div id="vkllist">
    <oblistitem each={ vars }></oblistitem>
  </div>


  <script>
    this.vars = []
    toolbarSignal.on('obkitVisible', () => {
      this.vars = codeState.vars[6]
      this.update()
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
      overflow: auto;
    }
    #vklc {
      position: absolute;
      left: 1vw;
      top: .5vw;
    }
    #vkllist {
      position: absolute;
      left: 1vw;
      top: 3vw;
      width: 30vw;
      display: flex;
      flex-wrap: wrap;
    }

  </style>


</obkitlocal>
