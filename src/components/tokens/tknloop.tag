


<tknloop>

  <div id="parBar"></div>

  <div id="bk"></div>



  <script>

    this.on("update", () => {

      if ( this.id != 30 ) return

      this.parBar.style.transform = 'rotate(' + this.options.parPoints*90 +'deg)'
      this.parBar.style.width = this.options.parLen*56 +'px'
    })

  </script>


  <style scoped>
    :scope {
      width: 56px;
      height: 56px;
      display: inline-block;
      position: relative;

    }
    #bk {
      width: 56px;
      height: 56px;
      display: block;
      background-image: url('assets/img/tk90.svg');
      background-size: 560px 560px;
      background-position: 0px -168px;
      position: absolute;
      z-index: 10;
    }
    #parBar {
      position: absolute;
      left: 28px;
      top: 33px;
      height: 8px;
      width: 0px;
      transform-origin: left center;
      background-color: #22060d;
      z-index: 5;
    }

  </style>


</tknloop>
