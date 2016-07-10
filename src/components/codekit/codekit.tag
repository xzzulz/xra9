import { toolbarState, toolbarSignal, toolbarDo } from '../../stores/toolbarStore.js'
import keySource from '../keys.js'
import './optionkit.tag'
import './toolkit.tag'
import './datakit.tag'
import './varkit/varkit.tag'
import './numkit.tag'
import './textkit.tag'
import './opkit.tag'


<codekit>

  <optionkit></optionkit>
  <toolkit></toolkit>
  <datakit></datakit>
  <varkit if={ varkitVisible }></varkit>
  <numkit if={ numkitVisible }></numkit>
  <textkit if={ textkitVisible }></textkit>
  <opkit if={ opkitVisible }></opkit>


  <script>
    this.varkitVisible = false
    this.numkitVisible = false
    this.textkitVisible = false
    this.opkitVisible = false

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

    toolbarSignal.on('opkitVisible', () => {
      this.opkitVisible = toolbarState.opkit.visible
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
