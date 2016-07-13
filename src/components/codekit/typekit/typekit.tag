import { codeUtil, codeState } from '../../../stores/codeStore.js'
import { toolbarSignal } from '../../../stores/toolbarStore.js'
import './typekitinfo.tag'
import './typekitlocal.tag'
import './typekittypeinfo.tag'
import './typekitextern.tag'
import './typekitimport.tag'
import './typekittypes.tag'



<typekit>
  <label id="lbsearch">search
    <input id="tsearch">
  </label>
  <div id="typkitnew"></div>
  <div id="typkitok"></div>

  <typekitinfo></typekitinfo>

  <typekitlocal></typekitlocal>

  <typekittypeinfo></typekittypeinfo>

  <typekitextern></typekitextern>
  <typekitimport></typekitimport>

  <typekittypes></typekittypes>

  <script>

  </script>


  <style scoped>
    :scope {
      position: absolute;
      right: 24vh;
      top: 0;
      bottom: 0;
      left: 0;
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
    #lbsearch {
      position: absolute;
      top: .5vw;
      right: 22vw;
      width: 14vw;
    }
    #typkitnew {
      position: absolute;
      top: .5vw;
      right: 19vw;
      width: 1.5vw;
      height: 1.5vw;
      background-image: url('assets/img/options/opttypnew.svg');
      background-size: 100% 100%;
    }
    #typkitok {
      position: absolute;
      top: .5vw;
      right: .5vw;
      width: 1.5vw;
      height: 1.5vw;
      background-image: url('assets/img/options/optok.svg');
      background-size: 100% 100%;
    }
  </style>


</typekit>
