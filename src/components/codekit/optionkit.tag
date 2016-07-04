import './optiontags/optnfunc.tag'
import { codeState, signal } from '../../stores/codeStore.js'

<optionkit>

  <optnfunc if={ group == 'function' }></optnfunc>


  <script>

    this.on('update', () => {
      this.tokenLoc = codeState.optionToken.loc
      this.group = codeState.optionToken.group
    })

    signal.on( 'updateOptionToken', () => {
      console.log('updateOptionToken')
      this.update()
    })

  </script>


  <style scoped>
    :scope {
      height: 20%;
      display: block;
      background: #151821;
      border: .4vh solid #1d2233;
      position: relative;
    }
  </style>


</optionkit>
