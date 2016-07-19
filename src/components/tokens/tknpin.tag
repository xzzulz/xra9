


<tknpin>

  <div id="pinbubble" if={ options.bubble }></div>
  <div id="pinpoint"></div>
  <div id="pin"></div>


  <script>

    this.on("update", () => {
      if ( this.id != 95 ) return
      this.pinpoint.style.transform = 'rotate(' + this.options.points*90 +'deg)'
      //this.root.style.filter = 'hue-rotate(' + this.options.color + 'deg)'
      //this.root.style.webkitFilter = 'hue-rotate(' + this.options.color + 'deg)'
      this.pin.style.backgroundColor = this.options.color
      this.pinpoint.style.backgroundColor = this.options.color
      this.pinbubble.style.backgroundColor = this.options.color
    })

  </script>


  <style scoped>
    :scope {
      display: block;
      width: 56px;
      height: 56px;
      z-index: 10;
    }
    #pin {
      width: 43.75%;
      height: 43.75%;
      display: block;
      position: absolute;
      left: 28.125%;
      top: 40.625%;
      background-color: #048c5d;
      border-radius: 50%;
    }
    #pinpoint {
      width: 12.5%;
      height: 12.5%;
      display: block;
      position: absolute;
      left: 75%;
      top: 56.25%;
      background-color: #048c5d;
      transform-origin: -13.5px 4px;
      border-radius: 50%;
    }
    #pinbubble {
      width: 72%;
      height: 72%;
      display: block;
      position: absolute;
      left: 14.6%;
      top: 26.625%;
      background-color: #048c5d;
      border-radius: 50%;
      filter: brightness(0.4);
      webkit-filter: brightness(0.4);
    }
  </style>


</tknpin>
