



<tknnum>


  <div id="tt0">{ options.value }</div>


  <script>

    this.on("update", () => {
      if ( this.id != 90 ) return
      var length = this.options.value.toString().length
      var size = 280
      if ( length == 3 ) size = 210
      else if ( length >= 4 && length <= 6 ) size = 200
      else if ( length >= 7 && length <= 15 ) size = 130
      else if ( length > 15 ) size = 100

      this.tt0.style.fontSize = size + '%'
    })

  </script>


  <style scoped>
    :scope {
      width: 56px;
      height: 56px;
      display: block;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      z-index: 10;
      padding: 9px 0px 0px;
      box-sizing: padding-box;
    }
    #tt0 {
      max-width: 48px;
      line-height: 98%;
      color: #00f46e;
      word-wrap: break-word;
      text-align: right;
    }
  </style>


</tknnum>
