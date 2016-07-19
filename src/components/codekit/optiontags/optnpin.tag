import { codeDo } from '../../../stores/codeStore.js'
import { toolbarDo } from '../../../stores/toolbarStore.js'
import color from '../../../resInfo/color.js'


<optnpin>


  <div id="optcolr" onclick={ colr } ></div>

  <div id="optup" onclick={ up } class="opt"></div>
  <div id="optdown" onclick={ down } class="opt"></div>
  <div id="optleft" onclick={ left } class="opt"></div>
  <div id="optright" onclick={ right } class="opt"></div>

  <div id="optpinbubble" onclick={ bubble } class="opt"></div>


  <script>
    this.colr = () => toolbarDo({ action: 'pinColor' })

    this.up = () => codeDo({ action: 'tokenPoints', data: 3 })
    this.down = () => codeDo({ action: 'tokenPoints', data: 1 })
    this.left = () => codeDo({ action: 'tokenPoints', data: 2 })
    this.right = () => codeDo({ action: 'tokenPoints', data: 0 })
    this.bubble = () => codeDo({ action: 'tokenBubble' })
  </script>


  <style scoped>
    :scope {
      width: 100%;
      height: 100%;
      display: block;
    }
    #optcolr {
      width: 6vh;
      height: 6vh;
      position: absolute;
      top: 2vh;
      left: 2vh;
      background-image: url('assets/img/options/optcolr.svg');
      background-size: 100% 100%;
    }
    .opt {
      width: 4vh;
      height: 4vh;
      position: absolute;
      background-image: url('assets/img/options/optfuncparup.svg');
      background-size: 100% 100%;
    }
    #optup {
      left: 6vh;
      top: 9.5vh;
    }

    #optdown {
      left: 6vh;
      top: 14.5vh;
      transform: rotate(180deg);
    }

    #optleft {
      left: 2vh;
      top: 12vh;
      transform: rotate(-90deg);
    }
    #optright {
      left: 10vh;
      top: 12vh;
      transform: rotate(90deg);
    }
    #optpinbubble {
      left: 15vh;
      top: 11vh;
      width: 6vh;
      height: 6vh;
      position: absolute;
      background-image: url('assets/img/options/optvarbubble.svg');
      background-size: 100% 100%;
    }
  </style>


</optnpin>
