


<tknif>


  <div id="ifcond"></div>
  <div id="ifo"></div>
  <div id="ifx"></div>


  <script>
    this.on("update", () => {
      if ( this.id != 22 ) return
      this.ifcond.style.transform = 'rotate(' + this.options.cond*90 +'deg)'
      this.ifo.style.transform = 'rotate(' + this.options.o*90 +'deg)'
      this.ifx.style.transform = 'rotate(' + this.options.x*90 +'deg)'
    })
  </script>


  <style scoped>
    :scope {
      width: 56px;
      height: 56px;
      display: block;
      position: absolute;
      background-image: url('assets/img/tokens/if.svg');
      background-size: 100% 100%;
      z-index: 10;
    }
    #ifcond {
      width: 56px;
      height: 56px;
      display: block;
      position: absolute;
      background-image: url('assets/img/tokens/ifcond.svg');
      background-size: 100% 100%;
      z-index: 10;
      transform-origin: 28px 33.3px;
    }
    #ifo {
      width: 56px;
      height: 56px;
      display: block;
      position: absolute;
      background-image: url('assets/img/tokens/ifo.svg');
      background-size: 100% 100%;
      z-index: 10;
      transform-origin: 28px 33.3px;
    }
    #ifx {
      width: 56px;
      height: 56px;
      display: block;
      position: absolute;
      background-image: url('assets/img/tokens/ifx.svg');
      background-size: 100% 100%;
      z-index: 10;
      transform-origin: 28px 33.3px;
    }
  </style>


</tknif>
