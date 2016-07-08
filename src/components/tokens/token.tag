import { codeInfo } from '../../stores/codeInfo.js'



<token>

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
      background-image: url('assets/img/tk90.svg');
      background-size: 560px 560px;
      position: relative;
      z-index: 10;
    }
  </style>


</token>
