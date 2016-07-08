import { codeDo } from '../../../stores/codeStore.js'
import { toolbarDo } from '../../../stores/toolbarStore.js'



<optnloop>


  <div id="optfuncparup" onclick={ parup } class="optfuncpar"></div>
  <div id="optfuncpardown" onclick={ pardown } class="optfuncpar"></div>
  <div id="optfuncparleft" onclick={ parleft } class="optfuncpar"></div>
  <div id="optfuncparright" onclick={ parright } class="optfuncpar"></div>

  <div id="optfuncparx" onclick={ nopar }></div>


  <script>

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
    .optfuncpar {
      width: 6vh;
      height: 6vh;
      position: absolute;
      background-image: url('assets/img/options/optfuncparup.svg');
      background-size: 100% 100%;
    }
    #optfuncparup {
      left: 8vh;
      top: 4.5vh;
    }
    #optfuncpardown {
      left: 8vh;
      top: 11.5vh;
      transform: rotate(180deg);
    }
    #optfuncparleft {
      left: 2vh;
      top: 8vh;
      transform: rotate(-90deg);
    }
    #optfuncparright {
      left: 14vh;
      top: 8vh;
      transform: rotate(90deg);
    }
    #optfuncparx {
      width: 4vh;
      height: 4vh;
      position: absolute;
      background-image: url('assets/img/options/optfuncparx.svg');
      background-size: 100% 100%;
      left: 15vh;
      top: 3vh;
    }
  </style>


</optnloop>
