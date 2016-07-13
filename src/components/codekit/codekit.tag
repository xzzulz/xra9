import { toolbarState, toolbarSignal, toolbarDo } from '../../stores/toolbarStore.js'
import keySource from '../keys.js'
import './optionkit.tag'
import './toolkit.tag'
import './datakit.tag'
import './varkit/varkit.tag'
import './obkit/obkit.tag'
import './numkit.tag'
import './textkit.tag'
import './opkit.tag'
import './flagkit.tag'
import './typekit/typekit.tag'



<codekit>

  <optionkit></optionkit>
  <toolkit></toolkit>
  <datakit></datakit>
  <varkit if={ varkitVisible }></varkit>
  <obkit if={ obkitVisible }></obkit>
  <numkit if={ numkitVisible }></numkit>
  <textkit if={ textkitVisible }></textkit>
  <opkit if={ opkitVisible }></opkit>
  <flagkit if={ flagkitVisible }></flagkit>
  <typekit if={ typekitVisible }></typekit>


  <script>
    this.varkitVisible = false
    this.obkitVisible = false
    this.numkitVisible = false
    this.textkitVisible = false
    this.opkitVisible = false
    this.flagkitVisible = false
    this.typekitVisible = false

    toolbarSignal.on('varkitVisible', () => {
      this.varkitVisible = toolbarState.varkit.visible
      this.update()
    })

    toolbarSignal.on('obkitVisible', () => {
      this.obkitVisible = toolbarState.obkit.visible
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

    toolbarSignal.on('flagkitVisible', () => {
      this.flagkitVisible = toolbarState.flagkit.visible
      this.update()
    })

    toolbarSignal.on('typekitVisible', () => {
      this.typekitVisible = toolbarState.typekit.visible
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
      width: 100vw;
      height: 100vh;
    }
  </style>


</codekit>
