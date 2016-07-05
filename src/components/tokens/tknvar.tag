import { codeDo } from '../../stores/codeStore.js'
import { codeInfo } from '../../stores/codeInfo.js'



<tknvar>

  <div id="tt0">{name}</div>
  <div id="tt1"></div>
  <div id="tt2"></div>

  <div id="bk"></div>

  <div class="varbubble" if={ options.bubble }></div>

  <script>

    this.on("update", () => {
      this.bk.style.backgroundPosition = codeInfo[ this.id ].loc.x + 'px ' + codeInfo[ this.id ].loc.y + 'px'
    })

  </script>


  <style scoped>
    :scope {
      width: 56px;
      height: 56px;
      display: block;
      position: absolute;
    }
    #bk {
      width: 56px;
      height: 56px;
      display: block;
      background-image: url('assets/img/tk90.svg');
      background-size: 560px 560px;
      z-index: 10;
      position: absolute;
    }
    :scope #tt0 {
      width: 56px;
      text-align: center;
      position: absolute;
      top: 5px;
      margin: 0;
      z-index: 10;
    }
    :scope #tt1 {
      width: 56px;
      text-align: center;
      margin: 0;
      z-index: 10;
    }
    :scope #tt2 {
      width: 56px;
      text-align: center;
      position: relative;
      top: -2px;
      margin: 0;
      z-index: 10;
    }
    .varbubble {
      position: absolute;
      left: -5px;
      top: -5px;
      width: 66px;
      height: 66px;
      z-index: 4;
      background:  url('assets/img/varbubble.svg');
      background-size: 66px 66px;
    }
  </style>


</tknvar>
