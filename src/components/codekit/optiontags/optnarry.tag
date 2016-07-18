import { codeDo } from '../../../stores/codeStore.js'
import { toolbarDo } from '../../../stores/toolbarStore.js'



<optnarry>


  <div id="optarrybubble" onclick={ bubble }></div>
  <div id="optarryname" onclick={ name }></div>
  <div id="optarryprop" onclick={ prop }></div>
  <div id="optarrytypdot" onclick={ typdot }></div>

  <div id="optarryix" onclick={ ix }></div>

  <div id="optarrydot" onclick={ dot }></div>


  <div id="optarryparup" onclick={ parup } class="optarrypar"></div>
  <div id="optarrypardown" onclick={ pardown } class="optarrypar"></div>
  <div id="optarryparleft" onclick={ parleft } class="optarrypar"></div>
  <div id="optarryparright" onclick={ parright } class="optarrypar"></div>

  <div id="optarryparx" onclick={ nopar }></div>


  <script>

    this.bubble = () => codeDo({ action: 'tokenBubble' })
    this.name = () => toolbarDo({ action: 'varkitVisible' })
    this.prop = () => toolbarDo({ action: 'propkitVisible' })
    this.typdot = () => codeDo({ action: 'typedot' })

    this.ix = () => toolbarDo({ action: 'colorIndex' })
    this.dot = () => toolbarDo({ action: 'colorDot' })

    this.parup = () => codeDo({ action: 'functionParPoints', data: 3 })
    this.pardown = () => codeDo({ action: 'functionParPoints', data: 1 })
    this.parleft = () => codeDo({ action: 'functionParPoints', data: 2 })
    this.parright = () => codeDo({ action: 'functionParPoints', data: 0 })

    this.nopar = () => codeDo({ action: 'functionParX' })

  </script>


  <style scoped>
    :scope {
      width: 100%;
      height: 100%;
      display: block;
    }
    #optarrybubble {
      left: 2vh;
      top: 2vh;
      width: 6vh;
      height: 6vh;
      position: absolute;
      background-image: url('assets/img/options/optvarbubble.svg');
      background-size: 100% 100%;
    }
    #optarryname {
      left: 5.5vh;
      top: 13vh;
      width: 5vh;
      height: 5vh;
      position: absolute;
      background-image: url('assets/img/options/optname.svg');
      background-size: 100% 100%;
    }
    #optarryprop {
      left: 2vh;
      top: 14vh;
      width: 2vh;
      height: 4vh;
      position: absolute;
      background-image: url('assets/img/options/optprop.svg');
      background-size: 100% 100%;
    }
    #optarrytypdot {
      left: 2vh;
      top: 12.5vh;
      width: 1.5vh;
      height: 1.5vh;
      position: absolute;
      background-image: url('assets/img/options/opttypdot.svg');
      background-size: 100% 100%;
    }
    #optarryix {
      left: 12vh;
      top: 14vh;
      width: 4vh;
      height: 4vh;
      position: absolute;
      background-image: url('assets/img/options/optarryix.svg');
      background-size: 100% 100%;
    }
    #optarrydot {
      left: 17.5vh;
      top: 14vh;
      width: 2vh;
      height: 4vh;
      position: absolute;
      background-image: url('assets/img/options/optobdot.svg');
      background-size: 100% 100%;
    }
    .optarrypar {
      width: 4vh;
      height: 4vh;
      position: absolute;
      background-image: url('assets/img/options/optfuncparup.svg');
      background-size: 100% 100%;
    }

    #optarryparup {
      left: 14vh;
      top: 3vh;
    }

    #optarrypardown {
      left: 14vh;
      top: 8vh;
      transform: rotate(180deg);
    }

    #optarryparleft {
      left: 9.8vh;
      top: 5.5vh;
      transform: rotate(-90deg);
    }

    #optarryparright {
      left: 18.4vh;
      top: 5.5vh;
      transform: rotate(90deg);
    }

    #optarryparx {
      width: 3vh;
      height: 3vh;
      position: absolute;
      background-image: url('assets/img/options/optfuncparx.svg');
      background-size: 100% 100%;
      left: 18.7vh;
      top: 2vh;
    }
  </style>


</optnarry>
