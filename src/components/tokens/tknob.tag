import { getType } from '../../utils/util.js'



<tknob>


  <div id="dot" if={ options.dot }></div>
  <div id="prop" if={ options.prop }></div>

  <div id="tt0" if={ ! options.tx2 }>{ options.tx1 }</div>
  <div id="tt1" if={ options.tx2 }>{ options.tx1 }</div>
  <div id="tt2" if={ options.tx2 }>{ options.tx2 }</div>

  <div id="bk"></div>
  <div id="type" if={ options.typeGroup }></div>

  <div class="varbubble" if={ options.bubble }></div>


  <script>
    this.on( 'update', () => {
      if ( this.id != 6 ) return

      if ( this.options.typeGroup ) {
        this.type.style.backgroundImage = getType( this.options )
      }

      this.dot.style.backgroundColor = this.options.dot
      this.prop.style.backgroundColor = this.options.prop

    })
  </script>


  <style scoped>
    :scope {
      width: 56px;
      height: 56px;
      display: block;
      position: absolute;
    }
    #bk {
      width: 100%;
      height: 100%;
      display: block;
      background-image: url('assets/img/tokens/ob.svg');
      background-size: 100% 100%;
      z-index: 10;
      position: absolute;
    }
    #type {
      width: 53.125%;
      height: 46.875%;
      left: 23.4375%;
      top: 42.1875%;
      display: block;
      background-size: 100% 100%;
      z-index: 11;
      position: absolute;
    }
    #dot {
      width: 25%;
      height: 25%;
      display: block;
      z-index: 10;
      position: absolute;
      left: 64.0625%;
      top: 53.125%;
      border-radius: 50%;
    }
    #prop {
      width: 25%;
      height: 25%;
      display: block;
      z-index: 10;
      position: absolute;
      left: 10.9375%;
      top: 53.125%;
      border-radius: 50%;
    }
    #tt0 {
      width: 100%;
      text-align: center;
      position: absolute;
      top: 18%;
      z-index: 10;
    }
    #tt1 {
      position: absolute;
      top: 3%;
      width: 100%;
      text-align: center;
      z-index: 10;
    }
    #tt2 {
      position: absolute;
      width: 100%;
      text-align: center;
      top: 22%;
      z-index: 10;
    }
    .varbubble {
      position: absolute;
      left: -10%;
      top: -10%;
      width: 120%;
      height: 120%;
      z-index: 4;
      background:  url('assets/img/tokens/varbubble.svg');
      background-size: 100% 100%;
    }
  </style>


</tknob>
