import { codeDo } from '../../../stores/codeStore.js'
import { toolbarDo } from '../../../stores/toolbarStore.js'



<optnop>

  <div id="optfuncpointup" onclick={ up } class="optfuncpoint"></div>
  <div id="optfuncpointdown" onclick={ down } class="optfuncpoint"></div>
  <div id="optfuncpointleft" onclick={ left } class="optfuncpoint"></div>
  <div id="optfuncpointright" onclick={ right } class="optfuncpoint"></div>

  <div id="optfuncdef" onclick={ def } ></div>
  <div id="optopsel" onclick={ opkit }></div>

  <div id="optfuncpar"></div>
  <div id="optfuncparup" onclick={ parup } class="optfuncpar"></div>
  <div id="optfuncpardown" onclick={ pardown } class="optfuncpar"></div>
  <div id="optfuncparleft" onclick={ parleft } class="optfuncpar"></div>
  <div id="optfuncparright" onclick={ parright } class="optfuncpar"></div>

  <div id="optfuncparx" onclick={ nopar }></div>


  <script>
    this.def = ( e ) => {
      e.preventUpdate = true
      codeDo({ action: 'opDef' })
    }
    this.up = ( e ) => {
      e.preventUpdate = true
      codeDo({ action: 'tokenPoints', data: 3 })
    }
    this.down = ( e ) => {
      e.preventUpdate = true
      codeDo({ action: 'tokenPoints', data: 1 })
    }
    this.left = ( e ) => {
      e.preventUpdate = true
      codeDo({ action: 'tokenPoints', data: 2 })
    }
    this.right = ( e ) => {
      e.preventUpdate = true
      codeDo({ action: 'tokenPoints', data: 0 })
    }
    this.parup = ( e ) => {
      e.preventUpdate = true
      codeDo({ action: 'functionParPoints', data: 3 })
    }
    this.pardown = ( e ) => {
      e.preventUpdate = true
      codeDo({ action: 'functionParPoints', data: 1 })
    }
    this.parleft = ( e ) => {
      e.preventUpdate = true
      codeDo({ action: 'functionParPoints', data: 2 })
    }
    this.parright = ( e ) => {
      e.preventUpdate = true
      codeDo({ action: 'functionParPoints', data: 0 })
    }
    this.nopar = ( e ) => {
      e.preventUpdate = true
      codeDo({ action: 'functionParX' })
    }
    this.opkit = ( e ) => {
      e.preventUpdate = true
      toolbarDo({ action: 'opkitVisible' })
    }
  </script>


  <style scoped>
    :scope {
      width: 100%;
      height: 100%;
      display: block;
      transform: scale(.9);
    }

    #optfuncdef {
      left: .5vh;
      top: 10.5vh;
      width: 6vh;
      height: 6vh;
      position: absolute;
      background-image: url('assets/img/options/optopdef.svg');
      background-size: 100% 100%;
    }

    #optopsel {
      left: 5.5vh;
      top: 16vh;
      width: 4vh;
      height: 4vh;
      position: absolute;
      background-image: url('assets/img/options/optopsel.svg');
      background-size: 100% 100%;
    }

    .optfuncpoint {
      width: 6vh;
      height: 6vh;
      position: absolute;
      background-image: url('assets/img/options/optfuncpinup.svg');
      background-size: 100% 100%;
    }

    #optfuncpointup {
      left: 6.6vh;
      top: .2vh;
    }

    #optfuncpointdown {
      left: 6.6vh;
      top: 6.6vh;
      transform: rotate(180deg);
    }

    #optfuncpointleft {
      left: .2vh;
      top: 3.3vh;
      transform: rotate(-90deg);
    }

    #optfuncpointright {
      left: 12.9vh;
      top: 3.3vh;
      transform: rotate(90deg);
    }



    #optfuncpar {
      position: absolute;
      left: 14.7vh;
      top: 14.5vh;
      background: #163461;
      width: 2.6vh;
      height: 1vh;
    }

    .optfuncpar {
      width: 4vh;
      height: 4vh;
      position: absolute;
      background-image: url('assets/img/options/optfuncparup.svg');
      background-size: 100% 100%;
    }

    #optfuncparup {
      left: 14vh;
      top: 10.2vh;
    }

    #optfuncpardown {
      left: 14vh;
      top: 15.8vh;
      transform: rotate(180deg);
    }

    #optfuncparleft {
      left: 9.8vh;
      top: 13.1vh;
      transform: rotate(-90deg);
    }

    #optfuncparright {
      left: 18.4vh;
      top: 13.1vh;
      transform: rotate(90deg);
    }

    #optfuncparx {
      width: 3vh;
      height: 3vh;
      position: absolute;
      background-image: url('assets/img/options/optfuncparx.svg');
      background-size: 100% 100%;
      left: 18.7vh;
      top: 9.5vh;

    }

  </style>


</optnop>
