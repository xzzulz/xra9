import { codeUtil, codeState } from '../../../stores/codeStore.js'
import { toolbarSignal } from '../../../stores/toolbarStore.js'
import './obkitinfo.tag'
import './obkitlocal.tag'
import './obkitob.tag'



<obkit>

  <obkitinfo></obkitinfo>
  <label id="lbsearch">obkit search
    <input id="vsearch">
  </label>
  <obkitlocal></obkitlocal>
  <obkitob></obkitob>

  <script>

  </script>


  <style scoped>
    :scope {
      position: absolute;
      right: 24vh;
      top: 3vh;
      height: 94vh;
      width: 80vw;
      background: #151821;
      border: .4vh solid #1d2233;
      z-index: 200;
      font: 1vw 'Ubuntu mono';
      color: #2b4173;
    }
    input {
      width: 10vw;
      border: .03vw solid #0064f1;
      padding: .03vw;
      background: #0d1b26;
      color: #6e84b6;
      font-size: 1vw;
    }
    label {
      position: absolute;
    }
    #lbsearch {
      position: absolute;
      top: 15vw;
      right: .5vw;
      width: 34vw;
    }
  </style>


</obkit>
