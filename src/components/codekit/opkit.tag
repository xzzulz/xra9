import { tokenClass } from '../../stores/codeClasses.js'
import { codeDo } from '../../stores/codeStore.js'
import { toolbarDo } from '../../stores/toolbarStore.js'
import '../tokens/tknop.tag'



<opkit>


  <div id="mod">
    <tknop data-opid="24" onclick={ click }></tknop>
  </div>

  <div id="incdec">
    <tknop data-opid="30" onclick={ click }></tknop>
    <tknop data-opid="31" onclick={ click }></tknop>
  </div>

  <div id="arith">
    <tknop data-opid="20" onclick={ click }></tknop>
    <tknop data-opid="21" onclick={ click }></tknop>
    <tknop data-opid="22" onclick={ click }></tknop>
    <tknop data-opid="23" onclick={ click }></tknop>
  </div>

  <div id="eq">
    <tknop data-opid="0" onclick={ click }></tknop>
    <tknop data-opid="1" onclick={ click }></tknop>
  </div>

  <div id="rel">
    <tknop data-opid="2" onclick={ click }></tknop>
    <tknop data-opid="3" onclick={ click }></tknop>
    <tknop data-opid="4" onclick={ click }></tknop>
    <tknop data-opid="5" onclick={ click }></tknop>
  </div>


  <script>
    // provide data to tknop tags
    for ( var i=0; i<this.tags.tknop.length; i++ ) {
      var data = new tokenClass( 40 )
      data.options.id = this.tags.tknop[i].root.dataset.opid
      data.options.def = true
      Object.assign( this.tags.tknop[i], data )
    }

    this.click = ( e ) => {
      e.preventUpdate = true
      codeDo({ action: 'setOp', data: e.currentTarget.dataset.opid })
      toolbarDo({ action: 'closeOpkit' })
    }

  </script>


  <style scoped>
    :scope {
      position: absolute;
      right: 24vh;
      top: 3vh;
      height: 52vh;
      width: 40vh;
      background: #151821;
      border: .4vh solid #1d2233;
      z-index: 200;
    }
    :scope tknop {
      width: 6vh;
      height: 6vh;
      position: relative;
      float: left;
    }
    #mod {
      position: absolute;
      width: 12vh;
      right: 20vh;
      top: 6vh;
    }
    #incdec {
      position: absolute;
      width: 12vh;
      right: 8vh;
      top: 6vh;
    }
    #arith {
      position: absolute;
      width: 24vh;
      right: 8vh;
      top: 16vh;
    }
    #eq {
      position: absolute;
      width: 12vh;
      right: 8vh;
      top: 26vh;
    }
    #rel {
      position: absolute;
      width: 24vh;
      right: 8vh;
      top: 36vh;
    }
  </style>


</opkit>
