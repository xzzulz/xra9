import { codeDo } from '../../../stores/codeStore.js'



<optnarrw>


  <div id="optup" onclick={ up } class="opt"></div>
  <div id="optdown" onclick={ down } class="opt"></div>
  <div id="optleft" onclick={ left } class="opt"></div>
  <div id="optright" onclick={ right } class="opt"></div>


  <script>

    this.up = () => codeDo({ action: 'tokenPoints', data: 3 })
    this.down = () => codeDo({ action: 'tokenPoints', data: 1 })
    this.left = () => codeDo({ action: 'tokenPoints', data: 2 })
    this.right = () => codeDo({ action: 'tokenPoints', data: 0 })

  </script>


  <style scoped>
    :scope {
      width: 100%;
      height: 100%;
      display: block;
    }

    .opt {
      width: 6vh;
      height: 6vh;
      position: absolute;
      background-image: url('assets/img/options/optfuncparup.svg');
      background-size: 100% 100%;
    }

    #optup {
      left: 8vh;
      top: 4vh;
    }

    #optdown {
      left: 8vh;
      top: 13vh;
      transform: rotate(180deg);
    }

    #optleft {
      left: 2vh;
      top: 8.5vh;
      transform: rotate(-90deg);
    }

    #optright {
      left: 14vh;
      top: 8.5vh;
      transform: rotate(90deg);
    }

  </style>


</optnarrw>
