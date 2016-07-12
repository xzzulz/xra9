import { toolbarState } from '../../stores/toolbarStore.js'
import './tool.tag'

<datakit>

  <tool each={ tools }></tool>


  <script>
    this.tools = toolbarState.datakit
  </script>


  <style scoped>
    :scope {
      position: absolute;
      right: 0;
      top: 62vh;
      width: 24vh;
      height: 17vh;
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


</datakit>
