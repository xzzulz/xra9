import { codeDo } from '../../stores/codeStore.js'
import { codeInfo } from '../../stores/codeInfo.js'



<tknob>

  <div id="tt0" if={ ! options.tx2 }>{ options.tx1 }</div>
  <div id="tt1" if={ options.tx2 }>{ options.tx1 }</div>
  <div id="tt2" if={ options.tx2 }>{ options.tx2 }</div>

  <div id="bk"></div>

  <div class="varbubble" if={ options.bubble }></div>

  <script>

  </script>


  <style scoped>
    :scope {
      width: 56px;
      height: 56px;
      display: block;
      position: absolute;
    }
    #bk {
      width: 100%;
      height: 100%;
      display: block;
      background-image: url('assets/img/tokens/ob.svg');
      background-size: 100% 100%;
      z-index: 10;
      position: absolute;
    }
    #tt0 {
      width: 56px;
      text-align: center;
      position: absolute;
      top: 10px;
      z-index: 10;
    }
    #tt1 {
      position: absolute;
      top: 2px;
      width: 56px;
      text-align: center;
      z-index: 10;
    }
    #tt2 {
      position: absolute;
      width: 56px;
      text-align: center;
      top: 12px;
      z-index: 10;
    }
    .varbubble {
      position: absolute;
      left: -10%;
      top: -10%;
      width: 120%;
      height: 120%;
      z-index: 4;
      background:  url('assets/img/tokens/varbubble.svg');
      background-size: 100% 100%;
    }
  </style>


</tknob>
