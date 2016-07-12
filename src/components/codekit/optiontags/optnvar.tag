import { codeDo } from '../../../stores/codeStore.js'
import { toolbarDo } from '../../../stores/toolbarStore.js'

<optnvar>


  <div id="optvarbubble" onclick={ bubble }></div>
  <div id="optvarname" onclick={ name }></div>
  <div id="optvarflag" onclick={ flag }></div>

  <script>

    this.bubble = () => codeDo({ action: 'tokenBubble' })
    this.name = () => toolbarDo({ action: 'varkitVisible' })
    this.flag = () => toolbarDo({ action: 'flagkitVisible' })

  </script>


  <style scoped>
    :scope {
      width: 100%;
      height: 100%;
      display: block;
    }
    #optvarbubble {
      left: 3vh;
      top: 3vh;
      width: 8vh;
      height: 8vh;
      position: absolute;
      background-image: url('assets/img/options/optvarbubble.svg');
      background-size: 100% 100%;
      cursor: pointer;
    }
    #optvarname {
      left: 5.5vh;
      top: 13vh;
      width: 5vh;
      height: 5vh;
      position: absolute;
      background-image: url('assets/img/options/optname.svg');
      background-size: 100% 100%;
    }
    #optvarflag {
      left: 2vh;
      top: 13vh;
      width: 2vh;
      height: 2vh;
      position: absolute;
      background-image: url('assets/img/options/optflag.svg');
      background-size: 100% 100%;
    }
  </style>


</optnvar>
