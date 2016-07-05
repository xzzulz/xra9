import { toolbarState, toolbarSignal } from '../../stores/toolbarStore.js'
import './optionkit.tag'
import './toolkit.tag'
import './datakit.tag'
import './varkit.tag'


<codekit>

  <optionkit></optionkit>
  <toolkit></toolkit>
  <datakit></datakit>
  <varkit if={ varkitVisible}></varkit>

  <script>
    toolbarSignal.on('varkitVisible', () => {
      this.varkitVisible = toolbarState.varkit.visible
      this.update()
    })

  </script>


  <style scoped>
    :scope {
      position: absolute;
      right: 0;
      top: 0;
      width: 24vh;
      height: 100vh;
    }
  </style>


</codekit>
