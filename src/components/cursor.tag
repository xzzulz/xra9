import { codeState } from '../stores/codeStore.js'


<cursor>

  <script>

    this.on('update', () => {
      this.x = codeState.cursor.x
      this.y = codeState.cursor.y
      this.root.style.left = this.x*56+'px'
      this.root.style.top = this.y*56+'px'
    })

    var tag = this
    var visible = true
    var anim = function() {
      if (visible) {
        tag.root.style.opacity = 0.5
        visible = false
      } else {
        tag.root.style.opacity = 1
        visible = true
      }
    }

    setInterval( function() {
      anim()
    }, 500)


  </script>

  <style scoped>
    :scope {
      width: 56px;
      height: 56px;
      position: absolute;
      display: block;
      box-sizing: border-box;
      border: 1px solid #1292ff;
      border-style: solid none;
    }
  </style>

</cursor>
