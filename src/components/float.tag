import './floattoken.tag'

<float style="top: {y}px; left: {x}px; width:{w*56}px; height:{h*56}px;">

  <floattoken each={ floatTokens }></floattoken>

  <div id="cover" style="width:{w*56}px; height:{h*56}px;"></div>

  <style scoped>
    :scope {
      position: absolute;
      background: #9cf071;
    }
    token {
      position: absolute;
    }
    #cover {
      background-color: rgba(120,200,0,.2);
      position: absolute;
    }
  </style>

</float>
