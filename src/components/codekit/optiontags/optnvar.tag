import { codeDo } from '../../../stores/codeStore.js'
import { toolbarDo } from '../../../stores/toolbarStore.js'

<optnvar>


  <div id="optvarbubble" onclick={ bubble }></div>
  <div id="optvarname" onclick={ name }></div>

  <script>

    this.bubble = ( e ) => {
      e.preventUpdate = true
      codeDo({ action: 'tokenBubble' })
    }
    this.name = ( e ) => {
      e.preventUpdate = true
      toolbarDo({ action: 'varkitVisible' })
    }

  </script>


  <style scoped>
    :scope {
      width: 100%;
      height: 100%;
      display: block;
    }

    #optvarbubble {
      left: 7vh;
      top: 2vh;
      width: 15vh;
      height: 15vh;
      position: absolute;
      background-image: url('assets/img/options/optvarbubble.svg');
      background-size: 100% 100%;
      cursor: pointer;
    }

    #optvarname {
      left: 2vh;
      top: 14vh;
      width: 4vh;
      height: 4vh;
      position: absolute;
      background-image: url('assets/img/options/optname.svg');
      background-size: 100% 100%;
    }

  </style>


</optnvar>
