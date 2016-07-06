



<tkncomm>


  <div id="tt0">{ options.value }</div>


  <script>

    this.on("update", () => {
      if ( this.id != 92 ) return
      console.log('this', this)
      console.log('this.options.width', this.options.width)
      this.tt0.style.width = 56 * this.options.width + 'px'
    })

  </script>


  <style scoped>
    :scope {
      width: 56px;
      height: 56px;
      display: block;
      position: absolute;
      z-index: 10;

    }
    #tt0 {
      position: absolute;
      top: 1px;
      max-height: 56px;
      color: #32446c;
      word-wrap: normal;
      font-size: 140%;
    }
  </style>


</tkncomm>
