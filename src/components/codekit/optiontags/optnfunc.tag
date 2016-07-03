

<optnfunc>


  <div id="optfuncpointup" class="optfuncpoint"></div>
  <div id="optfuncpointdown" class="optfuncpoint"></div>
  <div id="optfuncpointleft" class="optfuncpoint"></div>
  <div id="optfuncpointright" class="optfuncpoint"></div>

  <div id="optfuncdef" ></div>

  <div id="optfuncpar"></div>
  <div id="optfuncparup" class="optfuncpar"></div>
  <div id="optfuncpardown" class="optfuncpar"></div>
  <div id="optfuncparleft" class="optfuncpar"></div>
  <div id="optfuncparright" class="optfuncpar"></div>

  <div id="optfuncparx"></div>

  <script>

  </script>


  <style scoped>
    :scope {
      width: 100%;
      height: 100%;
      display: block;
      transform: scale(.9);
    }

    #optfuncdef {
      left: 1vh;
      top: 12vh;
      width: 7vh;
      height: 7vh;
      position: absolute;
      background-image: url('assets/img/options/optfuncdef.svg');
      background-size: 100% 100%;
      cursor: pointer;
    }

    .optfuncpoint {
      width: 6vh;
      height: 6vh;
      position: absolute;
      background-image: url('assets/img/options/optfuncpinup.svg');
      background-size: 100% 100%;
      cursor: pointer;
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
      cursor: pointer;
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
      cursor: pointer;
      left: 18.7vh;
      top: 9.5vh;

    }

  </style>


</optnfunc>
