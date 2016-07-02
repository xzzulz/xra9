import { codeDo } from '../stores/codeStore.js'
import { codeInfo } from '../stores/codeInfo.js'
import drag from './drag.js'

<token  draggable="true" ondragstart={ dragstart } ondrag={ drag } ondrop={ drop }  ondragover="return false">

  <div id="tt0">{name}</div>
  <div id="tt1"></div>
  <div id="tt2"></div>

  <script>

    this.on("update", () => {
      this.root.style.backgroundPosition = codeInfo[ this.id ].loc.x + 'px ' + codeInfo[ this.id ].loc.y + 'px'
    })


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


  <style>
    token {
      width: 56px;
      height: 56px;
      display: inline-block;
      background-image: url('assets/img/tk90.svg');
      background-size: 560px 560px;
      position: relative;
    }

    token #tt0 {
      width: 56px;
      text-align: center;
      position: absolute;
      top: 5px;
      margin: 0;
    }
    token #tt1 {
      width: 56px;
      text-align: center;
      margin: 0;
    }
    token #tt2 {
      width: 56px;
      text-align: center;
      position: relative;
      top: -2px;
      margin: 0;
    }

  </style>


</token>
