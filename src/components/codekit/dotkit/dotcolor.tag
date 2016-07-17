



<dotcolor>

  <div id="flagpoint"></div>


  <script>

    this.on("update", () => {
      if ( ! this.options ) return
      this.root.style.backgroundColor = this.options.color
    })
  </script>


  <style scoped>
    :scope {
      position: absolute;
      width: 64px;
      height: 64px;
      background-color: #007d76;
      border-radius: 50%;

    }
  </style>


</dotcolor>
