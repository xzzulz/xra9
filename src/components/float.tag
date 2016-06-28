import './floattoken.tag'

<float style="top: {y}px; left: {x}px; width:{w*56}px; height:{h*56}px;">

  <floattoken each={ floatTokens }></floattoken>

  <div id="cover" style="width:{w*56}px; height:{h*56}px;"></div>

  <style scoped>
    :scope {
      position: absolute;
      background-color: rgba(10,100,10,.85);
    }
    token {
      position: absolute;
    }
    #cover {
      background-color: rgba(40,180,40,.05);
      position: absolute;
    }
  </style>

</float>
