import { toolbarState, toolbarSignal, toolbarDo } from '../../stores/toolbarStore.js'
import keySource from '../keys.js'
import './optionkit.tag'
import './toolkit.tag'
import './datakit.tag'
import './varkit.tag'


<codekit>

  <optionkit></optionkit>
  <toolkit></toolkit>
  <datakit></datakit>
  <varkit if={ varkitVisible }></varkit>

  <script>
    this.varkitVisible = false

    toolbarSignal.on('varkitVisible', () => {
      this.varkitVisible = toolbarState.varkit.visible
      this.update()
    })

    keySource.on( 'enter', ( e ) => {
      toolbarDo({ action: 'varkitVisible' })
    })
    keySource.on( 'space', ( e ) => {
      toolbarDo({ action: 'openVarkit' })
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
