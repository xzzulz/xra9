import { codeDo } from '../stores/codeStore.js'
import { codeInfo } from '../stores/codeInfo.js'
import { dragstart } from './drag.js'

<token  draggable="true" ondragstart={ dragstart } ondrag={ drag }>

  <div id="tt0">{name}</div>
  <div id="tt1"></div>
  <div id="tt2"></div>

  <script>

    this.on("mount", () => {
      //console.log('pos:', this.col, this.opts.row)
      this.root.style.backgroundPosition = codeInfo[ this.id ].loc.x + 'px ' + codeInfo[ this.id ].loc.y + 'px'
    })


    this.dragstart = (e) => {

      e.preventUpdate = true
      //e.dataTransfer.setDragImage(new Image(), 0, 0);
      e.dataTransfer.setData("text/plain", '10');
      //var loc = { x: e.target.offsetLeft/56, y: e.target.offsetTop/56 }
      /*codeDo({
        action: 'startDrag',
        data: loc
      })
      dragstart( e, this )*/
      return true
    }

    this.drag = (e) => {
      e.preventUpdate = true
      //var loc = { x: e.target.offsetLeft, y: e.target.offsetTop }

      return true
    }

  </script>


  <style>
    token {
      width: 56px;
      height: 56px;
      display: inline-block;
      background-image: url('assets/img/tk90.svg');
      background-size: 1120px 432px;
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
