import { codeDo } from '../../../stores/codeStore.js'
import { toolbarDo } from '../../../stores/toolbarStore.js'

<optntyp>


  <div id="opttypdef" onclick={ def }></div>
  <div id="opttypname" onclick={ name }></div>


  <script>

    this.def = () => codeDo({ action: 'typeDef' })
    this.name = () => toolbarDo({ action: 'typekitVisible' })

  </script>


  <style scoped>
    :scope {
      width: 100%;
      height: 100%;
      display: block;
    }
    #opttypdef {
      left: 2vh;
      top: 2vh;
      width: 7vh;
      height: 7vh;
      position: absolute;
      background-image: url('assets/img/options/opttypnew.svg');
      background-size: 100% 100%;
    }
    #opttypname {
      left: 2vh;
      top: 14vh;
      width: 5vh;
      height: 5vh;
      position: absolute;
      background-image: url('assets/img/options/optname.svg');
      background-size: 100% 100%;
    }
  </style>


</optntyp>
