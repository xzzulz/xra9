import drag from './drag.js'
import './token.tag'


<cell  draggable="true" ondragstart={ dragstart } ondrag={ drag } ondrop={ drop } ondragover="return false">


  <token></token>


  <script>

    this.dragstart = (e) => {
      e.preventUpdate = true
      e.dataTransfer.setData("text/plain", '10');
      drag.dragStart( e, this )
      return true
    }

    this.drag = (e) => {
      e.preventUpdate = true
      return true
    }

    this.drop = (e) => {
      e.preventUpdate = true
      drag.dragEnd( e )
      return true
    }

  </script>


  <style scoped>
    :scope {
      width: 56px;
      height: 56px;
      display: inline-block;
      position: relative;
    }
  </style>


</cell>
