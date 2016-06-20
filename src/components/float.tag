import './floattoken.tag'

<float style="top: {y}px; left: {x}px; width:{w*56}px; height:{h*56}px;">

  <floattoken each={ floatTokens }></floattoken>


  <style scoped>
    :scope {
      position: absolute;
      background: #9cf071;
    }
    token {
      position: absolute;
    }
  </style>

</float>
