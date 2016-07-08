import { toolbarDo } from '../../../stores/toolbarStore.js'



<optntext>


  <div id="opttex" onclick={ edit }></div>


  <script>
    this.edit = ( e ) => {
      e.preventUpdate = true
      toolbarDo({ action: 'textkitVisible' })
    }
  </script>


  <style scoped>
    :scope {
      width: 100%;
      height: 100%;
      display: block;
    }
    #opttex {
      left: 3vh;
      top: 3vh;
      width: 15vh;
      height: 15vh;
      position: absolute;
      background-image: url('assets/img/options/opttex.svg');
      background-size: 100% 100%;
    }
  </style>


</optntext>
