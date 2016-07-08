import { toolbarDo } from '../../../stores/toolbarStore.js'



<optnnum>


  <div id="optnum" onclick={ num }></div>


  <script>
    this.num = () => toolbarDo({ action: 'numkitVisible' })
  </script>


  <style scoped>
    :scope {
      width: 100%;
      height: 100%;
      display: block;
    }
    #optnum {
      left: 3vh;
      top: 3vh;
      width: 15vh;
      height: 15vh;
      position: absolute;
      background-image: url('assets/img/options/optnum.svg');
      background-size: 100% 100%;
    }
  </style>


</optnnum>
