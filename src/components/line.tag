import './tokens/cell.tag'

<line>


  <cell each={ tokens }></cell>


  <script>
    if (this.tokens.length == 0) {
      this.root.style.backgroundColor = '#161a2a'
    }
  </script>


  <style>
    line {
      display: block;
      height: 56px;
    }

  </style>


</line>
