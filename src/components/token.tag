import { codeInfo } from '../stores/codeInfo.js'

<token style="{ bkPos() }">

  <div id="tt0">exmpl</div>
  <div id="tt1"></div>
  <div id="tt2"></div>

  <script>
    this.bkPos = () => 'background-position:' + codeInfo[ this.id ].loc.x + 'px ' + codeInfo[ this.id ].loc.y + 'px'
  </script>


  <style>
    token {
      width: 56px;
      height: 56px;
      display: block;
      background-image: url('assets/img/tk90.svg');
      background-size: 1120px 432px;
      position: absolute;
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
