import { codeDo } from '../../../stores/codeStore.js'
import { toolbarDo } from '../../../stores/toolbarStore.js'

<optnob>


  <div id="optvarbubble" onclick={ bubble }></div>
  <div id="optvarname" onclick={ name }></div>
  <div id="optobdot" onclick={ dot }></div>
  <div id="optobprop" onclick={ prop }></div>


  <script>

    this.bubble = () => codeDo({ action: 'tokenBubble' })
    this.name = () => toolbarDo({ action: 'obkitVisible' })

    this.dot = () => toolbarDo({ action: 'dotkitVisible' })
    this.prop = () => toolbarDo({ action: 'propkitVisible' })

  </script>


  <style scoped>
    :scope {
      width: 100%;
      height: 100%;
      display: block;
    }

    #optvarbubble {
      left: 2vh;
      top: 2vh;
      width: 7vh;
      height: 7vh;
      position: absolute;
      background-image: url('assets/img/options/optvarbubble.svg');
      background-size: 100% 100%;
      cursor: pointer;
    }

    #optvarname {
      left: 6vh;
      top: 13vh;
      width: 7vh;
      height: 7vh;
      position: absolute;
      background-image: url('assets/img/options/optname.svg');
      background-size: 100% 100%;
    }
    #optfuncpar {
      position: absolute;
      left: 14.7vh;
      top: 14.5vh;
      background: #163461;
      width: 2.6vh;
      height: 1vh;
    }
    #optobdot {
      left: 15vh;
      top: 14vh;
      width: 2.5vh;
      height: 5vh;
      position: absolute;
      background-image: url('assets/img/options/optobdot.svg');
      background-size: 100% 100%;
    }
    #optobprop {
      left: 1.5vh;
      top: 14vh;
      width: 2.5vh;
      height: 5vh;
      position: absolute;
      background-image: url('assets/img/options/optprop.svg');
      background-size: 100% 100%;
    }
  </style>


</optnob>
