import { toolbarDo } from '../../../stores/toolbarStore.js'
import { codeDo } from '../../../stores/codeStore.js'



<optncomm>


  <div id="optncomm" onclick={ edit }></div>

  <div id="optcommsize"></div>
  <div id="optcommleft" onclick={ lessWidth } class="optcommsize"></div>
  <div id="optcommright" onclick={ moreWidth } class="optcommsize"></div>


  <script>
    this.edit = () => toolbarDo({ action: 'textkitVisible' })
    this.lessWidth = () => codeDo({ action: 'commWidth', data: -1 })
    this.moreWidth = () => codeDo({ action: 'commWidth', data: 1 })
  </script>


  <style scoped>
    :scope {
      width: 100%;
      height: 100%;
      display: block;
    }
    #optncomm {
      left: 6.5vh;
      top: 3vh;
      width: 10vh;
      height: 10vh;
      position: absolute;
      background-image: url('assets/img/options/opttex.svg');
      background-size: 100% 100%;
    }
    #optcommleft {
      left: 4vh;
      top: 14vh;
      transform: rotate(-90deg);
    }
    #optcommright {
      left: 14vh;
      top: 14vh;
      transform: rotate(90deg);
    }
    #optcommsize {
      position: absolute;
      left: 10vh;
      top: 15vh;
      background: #163461;
      width: 3vh;
      height: 3vh;
    }

    .optcommsize {
      width: 5vh;
      height: 5vh;
      position: absolute;
      background-image: url('assets/img/options/optfuncparup.svg');
      background-size: 100% 100%;
    }
  </style>


</optncomm>
