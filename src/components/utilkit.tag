import { toolbarState } from '../stores/toolbarStore.js'
import './util.tag'



<utilkit>

  <util each={ utils }></util>


  <script>
    this.utils = toolbarState.utilkit
  </script>


  <style scoped>
    :scope {
      position: absolute;
      left: 0;
      top: 0;
      width: 8vh;
      height: 100vh;
      display: flex;
      flex-direction: column;

    }
  </style>


</utilkit>
