import { panelState } from '../stores/panelStore.js'
import './code.tag'


<codepanel>

    <code each={ codes } ></code>


  <script>

    // Array of code views
    this.codes = panelState.panels

  </script>

  <style scoped>
    :scope {
      position: absolute;
      left: 12vw;
      width: 88vw;
      height: 100vh;
      background-color: #1b2022;
    }
  </style>

</codepanel>
