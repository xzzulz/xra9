import { codeState, signal } from '../stores/codeStore.js'
import './float.tag'

<floats>

  <float each={ floats }></float>

  <script>
    this.floats = codeState.floats

    signal.on('floatsUpdate', () => {
      this.update()
    })
  </script>

  <style scoped>

  </style>

</floats>
