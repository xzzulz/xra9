


<tknpin>

  <div id="pinbubble" if={ options.bubble }></div>
  <div id="pinpoint"></div>
  <div id="bkpin"></div>


  <script>

    this.on("update", () => {
      if ( this.id != 95 ) return
      this.pinpoint.style.transform = 'rotate(' + this.options.points*90 +'deg)'
      this.root.style.filter = 'hue-rotate(' + this.options.color + 'deg)'
      this.root.style.webkitFilter = 'hue-rotate(' + this.options.color + 'deg)'
    })

  </script>


  <style scoped>
    :scope {
      display: block;
      width: 56px;
      height: 56px;
      z-index: 10;
    }
    #bkpin {
      width: 56px;
      height: 56px;
      display: block;
      position: absolute;
      background-image: url('assets/img/tokens/pin.svg');
      background-size: 100% 100%;


    }
    #pinpoint {
      width: 56px;
      height: 56px;
      display: block;
      position: absolute;
      background-image: url('assets/img/tokens/pinpoint.svg');
      background-size: 100% 100%;

      transform-origin: 28px 35px;
    }
    #pinbubble {
      width: 56px;
      height: 56px;
      display: block;
      position: absolute;
      background-image: url('assets/img/tokens/pinbubble.svg');
      background-size: 100% 100%;
    }
  </style>


</tknpin>
