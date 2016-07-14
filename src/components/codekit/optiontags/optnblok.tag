import { codeDo } from '../../../stores/codeStore.js'



<optnblok>

  <div id="optlvl" onclick={ lvl }></div>

  <div id="optup" onclick={ up } class="opt"></div>
  <div id="optdown" onclick={ down } class="opt"></div>
  <div id="optleft" onclick={ left } class="opt"></div>
  <div id="optright" onclick={ right } class="opt"></div>


  <script>

    this.lvl = () => codeDo({ action: 'blokLvl' })
    this.up = () => codeDo({ action: 'blokSize', data: 3 })
    this.down = () => codeDo({ action: 'blokSize', data: 1 })
    this.left = () => codeDo({ action: 'blokSize', data: 2 })
    this.right = () => codeDo({ action: 'blokSize', data: 0 })

  </script>


  <style scoped>
    :scope {
      width: 100%;
      height: 100%;
      display: block;
    }
    #optlvl {
      width: 6vh;
      height: 6vh;
      position: absolute;
      background-image: url('assets/img/options/optbloklvl.svg');
      background-size: 100% 100%;
      left: 2vh;
      top: 2vh;
    }
    .opt {
      width: 6vh;
      height: 6vh;
      position: absolute;
      background-image: url('assets/img/options/optfuncparup.svg');
      background-size: 100% 100%;
    }
    #optup {
      left: 9vh;
      top: 6vh;
    }
    #optdown {
      left: 9vh;
      top: 14vh;
      transform: rotate(180deg);
    }
    #optleft {
      left: 3vh;
      top: 10vh;
      transform: rotate(-90deg);
    }
    #optright {
      left: 15vh;
      top: 10vh;
      transform: rotate(90deg);
    }
  </style>


</optnblok>
