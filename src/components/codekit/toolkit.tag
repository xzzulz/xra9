import { toolbarState } from '../../stores/toolbarStore.js'
import './tool.tag'

<toolkit>

  <tool each={ tools }></tool>


  <script>
    this.tools = toolbarState.toolkit
  </script>


  <style scoped>
    :scope {
      position: absolute;
      right: 0;
      top: 22vh;
      width: 24vh;
      height: 40vh;
      padding: 1.5vh;

      background: #151821;
      border: .4vh solid #1d2233;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-content: flex-start;
    }
  </style>


</toolkit>
