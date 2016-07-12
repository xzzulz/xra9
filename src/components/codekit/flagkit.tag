import { codeDo } from '../../stores/codeStore.js'
import color from '../../resInfo/color.js'
import '../tokens/tknflag.tag'
import './flagkitnoflag.tag'



<flagkit>


  <div id="fkflags">
    <tknflag onclick={ pink }></tknflag>
    <tknflag onclick={ red }></tknflag>
    <tknflag onclick={ oran }></tknflag>
    <tknflag onclick={ yell }></tknflag>

    <tknflag onclick={ gren }></tknflag>
    <tknflag onclick={ turq }></tknflag>
    <tknflag onclick={ blu }></tknflag>
    <tknflag onclick={ purp }></tknflag>
    <flagkitnoflag onclick={ noflag }></flagkitnoflag>
  </div>


  <script>
    this.pink = () => codeDo({ action: 'flagColor', data: color.pink })
    this.red = () => codeDo({ action: 'flagColor', data: color.red })
    this.oran = () => codeDo({ action: 'flagColor', data: color.oran })
    this.yell = () => codeDo({ action: 'flagColor', data: color.yell })

    this.gren = () => codeDo({ action: 'flagColor', data: color.gren })
    this.turq = () => codeDo({ action: 'flagColor', data: color.turq })
    this.blu = () => codeDo({ action: 'flagColor', data: color.blu })
    this.purp = () => codeDo({ action: 'flagColor', data: color.purp })

    this.noflag = () => codeDo({ action: 'flagColor', data: 0 })

    this.tags.tknflag[0].id = 96
    this.tags.tknflag[1].id = 96
    this.tags.tknflag[2].id = 96
    this.tags.tknflag[3].id = 96
    this.tags.tknflag[4].id = 96
    this.tags.tknflag[5].id = 96
    this.tags.tknflag[6].id = 96
    this.tags.tknflag[7].id = 96

    this.tags.tknflag[0].options = { color: color.pink }
    this.tags.tknflag[1].options = { color: color.red }
    this.tags.tknflag[2].options = { color: color.oran }
    this.tags.tknflag[3].options = { color: color.yell }

    this.tags.tknflag[4].options = { color: color.gren }
    this.tags.tknflag[5].options = { color: color.turq }
    this.tags.tknflag[6].options = { color: color.blu }
    this.tags.tknflag[7].options = { color: color.purp }
  </script>


  <style scoped>
    :scope {
      position: absolute;
      right: 24vh;
      top: 3vh;
      height: 32vh;
      width: 50vh;
      background: #151821;
      border: .4vh solid #1d2233;
      z-index: 200;
    }
    #fkflags {
      position: absolute;
      top: .5vh;
      right: .5vh;
      left: .5vh;
      bottom: .5vh;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;

    }
    tknflag {
      position: static;
      width: 8vh;
      height: 8vh;
      margin: 1vh;
    }
    flagkitnoflag {
      position: static;
      width: 8vh;
      height: 8vh;
      margin: 1vh;
    }
    #flagpoint {
      display: none;
    }
  </style>


</flagkit>
