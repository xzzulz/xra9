import { codeDo } from '../../stores/codeStore.js'
import { codeInfo } from '../../stores/codeInfo.js'



<tknvar>

  <div id="tt0">{name}</div>
  <div id="tt1"></div>
  <div id="tt2"></div>


  <script>

    this.on("update", () => {
      this.root.style.backgroundPosition = codeInfo[ this.id ].loc.x + 'px ' + codeInfo[ this.id ].loc.y + 'px'
    })

  </script>


  <style scoped>
    :scope {
      width: 56px;
      height: 56px;
      display: inline-block;
      position: relative;
      background-image: url('assets/img/tk90.svg');
      background-size: 560px 560px;
    }
    :scope #tt0 {
      width: 56px;
      text-align: center;
      position: absolute;
      top: 5px;
      margin: 0;
    }
    :scope #tt1 {
      width: 56px;
      text-align: center;
      margin: 0;
    }
    :scope #tt2 {
      width: 56px;
      text-align: center;
      position: relative;
      top: -2px;
      margin: 0;
    }
  </style>


</tknfunc>
