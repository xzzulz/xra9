import { codeState } from '../stores/codeStore.js'


<cursor>

  <script>

    this.on('update', () => {
      this.x = codeState.cursor.x
      this.y = codeState.cursor.y
      this.root.style.left = this.x*56+'px'
      this.root.style.top = this.y*56+'px'
    })

  </script>

  <style scoped>
    :scope {
      width: 56px;
      height: 56px;
      position: absolute;
      display: block;
      box-sizing: border-box;
      border: 2px solid #1292ff;
      border-style: solid none;
      animation: .5s linear 0s infinite alternate cursorcolor;
    }
    @keyframes cursorcolor { from { border-color: #00007a; } to { border-color: #0069e7; }  }
  </style>

</cursor>
