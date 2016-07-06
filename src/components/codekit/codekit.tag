import { toolbarState, toolbarSignal, toolbarDo } from '../../stores/toolbarStore.js'
import keySource from '../keys.js'
import './optionkit.tag'
import './toolkit.tag'
import './datakit.tag'
import './varkit.tag'
import './numkit.tag'
import './textkit.tag'


<codekit>

  <optionkit></optionkit>
  <toolkit></toolkit>
  <datakit></datakit>
  <varkit if={ varkitVisible }></varkit>
  <numkit if={ numkitVisible }></numkit>
  <textkit if={ textkitVisible }></textkit>

  <script>
    this.varkitVisible = false
    this.numkitVisible = false
    this.textkitVisible = false

    toolbarSignal.on('varkitVisible', () => {
      this.varkitVisible = toolbarState.varkit.visible
      this.update()
    })

    toolbarSignal.on('numkitVisible', () => {
      this.numkitVisible = toolbarState.numkit.visible
      this.update()
    })

    toolbarSignal.on('textkitVisible', () => {
      this.textkitVisible = toolbarState.textkit.visible
      this.update()
    })

    keySource.on( 'enter', ( e ) => {
      toolbarDo({ action: 'inputKitVisible' })
    })
    keySource.on( 'space', ( e ) => {
      toolbarDo({ action: 'openInputKit' })
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
