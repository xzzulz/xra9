import { panelState } from '../stores/panelStore.js'
import './code.tag'
import keys from './keys.js'


<codepanel>

    <code each={ codes } ></code>


  <script>

    // Array of code views
    this.codes = panelState.panels

    var tag = this
    keys.code = ( code ) => {
      tag.tags.code[ panelState.active ].key( code )
    }

  </script>

  <style scoped>
    :scope {
      position: absolute;
      left: 5vw;
      top: 0px;
      right: 24.8vh;
      height: 100vh;
      background-color: #1b2022;
    }
  </style>

</codepanel>
