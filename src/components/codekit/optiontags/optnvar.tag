import { codeDo } from '../../../stores/codeStore.js'

<optnvar>


  <div id="optvarbubble" onclick={ bubble }></div>


  <script>

    this.bubble = () => codeDo({ action: 'varBubble' })


  </script>


  <style scoped>
    :scope {
      width: 100%;
      height: 100%;
      display: block;
    }

    #optvarbubble {
      left: 3vh;
      top: 3vh;
      width: 15vh;
      height: 15vh;
      position: absolute;
      background-image: url('assets/img/options/optvarbubble.svg');
      background-size: 100% 100%;
      cursor: pointer;
    }

  </style>


</optnvar>
