import { codeDo, codeUtil } from '../../../stores/codeStore.js'
import { toolbarDo } from '../../../stores/toolbarStore.js'

<optnvar>


  <div id="optvarbubble" onclick={ bubble }></div>
  <div id="optvarname" onclick={ name }></div>
  <div id="optvarprop" onclick={ prop }></div>
  <div id="optvartypdot" onclick={ typdot }></div>

  <div id="optvarixdot" onclick={ ixdot } if={ id == 4 }></div>

  <script>

    this.bubble = () => codeDo({ action: 'tokenBubble' })
    this.name = () => toolbarDo({ action: 'varkitVisible' })
    this.prop = () => toolbarDo({ action: 'propColor' })
    this.typdot = () => codeDo({ action: 'typedot' })
    this.ixdot = () => toolbarDo({ action: 'indexColor' })

    this.id = 0
    this.on( 'update', () => {
      this.id = codeUtil.cursorToken().id
    })
  </script>


  <style scoped>
    :scope {
      width: 100%;
      height: 100%;
      display: block;
    }
    #optvarbubble {
      left: 3vh;
      top: 2vh;
      width: 8vh;
      height: 8vh;
      position: absolute;
      background-image: url('assets/img/options/optvarbubble.svg');
      background-size: 100% 100%;
    }
    #optvarname {
      left: 6vh;
      top: 13vh;
      width: 6vh;
      height: 6vh;
      position: absolute;
      background-image: url('assets/img/options/optname.svg');
      background-size: 100% 100%;
    }
    #optvarprop {
      left: 2vh;
      top: 14.5vh;
      width: 2vh;
      height: 4vh;
      position: absolute;
      background-image: url('assets/img/options/optprop.svg');
      background-size: 100% 100%;
    }
    #optvartypdot {
      left: 2vh;
      top: 12.5vh;
      width: 1.5vh;
      height: 1.5vh;
      position: absolute;
      background-image: url('assets/img/options/opttypdot.svg');
      background-size: 100% 100%;
    }
    #optvarixdot {
      left: 13.5vh;
      top: 15vh;
      width: 3vh;
      height: 3vh;
      position: absolute;
      background-image: url('assets/img/options/opttypdot.svg');
      background-size: 100% 100%;
    }
  </style>


</optnvar>
