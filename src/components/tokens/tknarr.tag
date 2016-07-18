


<tknarr>

  <div id="prop" if={ options.prop }></div>
  <div id="typdot" if={ options.typedot }></div>

  <div id="dot" if={ options.dot }></div>
  <div id="ix" if={ options.index }></div>

  <div id="tt0" if={ ! options.tx2 }>{ options.tx1 }</div>
  <div id="tt1" if={ options.tx2 }>{ options.tx1 }</div>
  <div id="tt2" if={ options.tx2 }>{ options.tx2 }</div>

  <div id="bk"></div>
  <div id="type" if={ options.typeGroup }></div>

  <div class="varbubble" if={ options.bubble }></div>

  <script>
    this.on( 'update', () => {
      if ( this.id != 7 ) return

      if ( this.options.typeGroup ) {
        this.type.style.backgroundImage = getType( this.options )
      }

      this.prop.style.backgroundColor = this.options.prop
      this.ix.style.backgroundColor = this.options.index
      this.dot.style.backgroundColor = this.options.dot

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
      background-image: url('assets/img/tokens/arr.svg');
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
    #tt0 {
      width: 56px;
      text-align: center;
      position: absolute;
      top: 10px;
      z-index: 10;
    }
    #tt1 {
      position: absolute;
      top: 2px;
      width: 56px;
      text-align: center;
      z-index: 10;
    }
    #tt2 {
      position: absolute;
      width: 56px;
      text-align: center;
      top: 12px;
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
    #prop {
      width: 25%;
      height: 25%;
      display: block;
      z-index: 10;
      position: absolute;
      left: 4.6875%;
      top: 53.125%;
      border-radius: 50%;
    }
    #typdot {
      width: 9.375%;
      height: 9.375%;
      display: block;
      z-index: 10;
      position: absolute;
      left: 4.6875%;
      top: 42.1875%;
      border-radius: 50%;
      background-color: #518093;
    }
    #ix {
      width: 25%;
      height: 25%;
      display: block;
      z-index: 10;
      position: absolute;
      left: 64.0625%;
      top: 53.125%;
      border-radius: 50%;
    }
    #dot {
      width: 12.5%;
      height: 25%;
      display: block;
      z-index: 10;
      position: absolute;
      left: 85.9375%;
      top: 53.125%;
      border-radius: 0 8px 8px 0;
    }
  </style>


</tknarr>
