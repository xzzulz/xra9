import { codeDo } from '../../../stores/codeStore.js'
import color from '../../../resInfo/color.js'
import './dotcolor.tag'
import '../flagkitnoflag.tag'



<dotkit>


  <div id="dots">
    <dotcolor onclick={ yellgren }></dotcolor>
    <dotcolor onclick={ gren }></dotcolor>
    <dotcolor onclick={ seagren }></dotcolor>
    <dotcolor onclick={ aqua }></dotcolor>

    <dotcolor onclick={ sky }></dotcolor>
    <dotcolor onclick={ royblu }></dotcolor>
    <dotcolor onclick={ blu }></dotcolor>
    <dotcolor onclick={ purp }></dotcolor>

    <dotcolor onclick={ pink }></dotcolor>
    <dotcolor onclick={ red }></dotcolor>
    <dotcolor onclick={ orang }></dotcolor>
    <dotcolor onclick={ yell }></dotcolor>

    <div id="dotx" onclick={ noDot }></div>
  </div>


  <script>
    this.yellgren = () => codeDo({ action: 'dotColor', data: color.yellgren })
    this.gren = () => codeDo({ action: 'dotColor', data: color.gren })
    this.seagren = () => codeDo({ action: 'dotColor', data: color.seagren })
    this.aqua = () => codeDo({ action: 'dotColor', data: color.aqua })

    this.sky = () => codeDo({ action: 'dotColor', data: color.sky })
    this.royblu = () => codeDo({ action: 'dotColor', data: color.royblu })
    this.blu = () => codeDo({ action: 'dotColor', data: color.blu })
    this.purp = () => codeDo({ action: 'dotColor', data: color.purp })

    this.pink = () => codeDo({ action: 'dotColor', data: color.pink })
    this.red = () => codeDo({ action: 'dotColor', data: color.red })
    this.orang = () => codeDo({ action: 'dotColor', data: color.orang })
    this.yell = () => codeDo({ action: 'dotColor', data: color.yell })

    this.noDot = () => codeDo({ action: 'dotColor', data: '' })


    this.tags.dotcolor[0].options = { color: color.yellgren }//yellowgreen
    this.tags.dotcolor[1].options = { color: color.gren }// green
    this.tags.dotcolor[2].options = { color: color.seagren }//sea green
    this.tags.dotcolor[3].options = { color: color.aqua }// aqua

    this.tags.dotcolor[4].options = { color: color.sky }//sky
    this.tags.dotcolor[5].options = { color: color.royblu }// blue
    this.tags.dotcolor[6].options = { color: color.blu }//darkblue
    this.tags.dotcolor[7].options = { color: color.purp }//purple

    this.tags.dotcolor[8].options = { color: color.pink }//magenta
    this.tags.dotcolor[9].options = { color: color.red }// red
    this.tags.dotcolor[10].options = { color: color.orang }//orange
    this.tags.dotcolor[11].options = { color: color.yell }//yellow

  </script>


  <style scoped>
    :scope {
      position: absolute;
      right: 24vh;
      top: 3vh;
      height: 48vh;
      width: 50vh;
      background: #151821;
      border: .4vh solid #1d2233;
      z-index: 200;
    }
    #dots {
      position: absolute;
      top: .5vh;
      right: .5vh;
      left: .5vh;
      bottom: .5vh;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;

    }
    dotcolor {
      position: static;
      width: 6vh;
      height: 6vh;
      margin: 3vh;
    }
    #dotx {
      position: static;
      width: 6vh;
      height: 6vh;
      margin: 3vh;
      background-image: url('assets/img/options/dotx.svg');
      background-size: 100% 100%;
    }
  </style>


</dotkit>
