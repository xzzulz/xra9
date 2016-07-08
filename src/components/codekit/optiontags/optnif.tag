import { codeDo } from '../../../stores/codeStore.js'



<optnif>


  <div id="optifcond" onclick={ cond }></div>
  <div id="optifo" onclick={ o }></div>
  <div id="optifx" onclick={ x }></div>

  <script>

    this.cond = () => codeDo({ action: 'ifRotate', data: 'cond' })
    this.o = () => codeDo({ action: 'ifRotate', data: 'o' })
    this.x = () => codeDo({ action: 'ifRotate', data: 'x' })

  </script>


  <style scoped>
    :scope {
      width: 100%;
      height: 100%;
      display: block;
    }

    #optifcond {
      left: 7vh;
      top: 5vh;
      width: 6vh;
      height: 6vh;
      position: absolute;
      background-image: url('assets/img/options/optifcond.svg');
      background-size: 100% 100%;
      cursor: pointer;
    }
    #optifo {
      left: 3vh;
      top: 11vh;
      width: 6vh;
      height: 6vh;
      position: absolute;
      background-image: url('assets/img/options/optifo.svg');
      background-size: 100% 100%;
    }
    #optifx {
      left: 11vh;
      top: 11vh;
      width: 6vh;
      height: 6vh;
      position: absolute;
      background-image: url('assets/img/options/optifx.svg');
      background-size: 100% 100%;
    }
  </style>


</optnif>
