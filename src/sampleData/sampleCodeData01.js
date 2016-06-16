import { scopeClass, Line, tokenClass, stepClass, CodeModel } from '../stores/codeClasses.js'



var scopes = [
  new scopeClass( 0, 0, 34, 60, '#0d0f13' ),
  new scopeClass( 2, 4, 30, 42, '#14171c' ),
  new scopeClass( 8, 6, 28, 24, '#191d23' ),
  new scopeClass( 8, 30, 28, 36, '#191d23' ),
  new scopeClass( 6, 16, 7, 17, '#0d3139' ),
  new scopeClass( 8, 16, 9, 17, '#0d3139' ),
  new scopeClass( 10, 20, 11, 21, '#0d3139' ),
]


var line0 = {
  tokens: {
    0: new tokenClass( 0, 'abcdefgh' ),
    1: new tokenClass( 3, 'abcdefgh' ),
    2: new tokenClass( 1, 'abcdefgh' ),
    3: new tokenClass( 2, 'abcdefgh' ),
    4: new tokenClass( 5, 'abcdefgh' ),
    5: new tokenClass( 1, 'abcdefgh' ),
    6: new tokenClass( 4, 'abcdefgh' ),
    7: new tokenClass( 0, 'abcdefgh' ),
    8: new tokenClass( 4, 'abcdefgh' ),
    9: new tokenClass( 3, 'abcdefgh' ),
    10: new tokenClass( 3, 'abcdefgh' ),
    11: new tokenClass( 2, 'abcdefgh' ),
  },
  chains: {
    0: new stepClass( 'a' ),
    1: new stepClass( 'b' ),
    2: new stepClass( 'c' ),
    5: new stepClass( 'a' ),
    6: new stepClass( 'b' ),
    7: new stepClass( 'c' ),
  }
}

var line1 = {
  tokenClasss: {
    0: new tokenClass( 0, 'abcdefgh' ),
    1: new tokenClass( 2, 'abcdefgh' ),
    2: new tokenClass( 5, 'abcdefgh' ),
    3: new tokenClass( 3, 'abcdefgh' ),
    4: new tokenClass( 3, 'abcdefgh' ),
    5: new tokenClass( 5, 'abcdefgh' ),
    6: new tokenClass( 0, 'abcdefgh' ),
  },
  chains: {
    0: new stepClass( 'a' ),
    1: new stepClass( 'b' ),
    2: new stepClass( 'c' ),
  }
}

var line11 = {
  tokenClasss: {
    2: new tokenClass( 3, 'abcdefgh' ),
  },
  chains: {
    2: new stepClass( 'a' ),
  }
}

var line12 = {
  tokenClasss: {
    2: new tokenClass( 0, 'abcdefgh' ),
    3: new tokenClass( 1, 'abcdefgh' ),
    4: new tokenClass( 5, 'abcdefgh' ),
    5: new tokenClass( 3, 'abcdefgh' )
  },
  chains: {
      2: new stepClass( 'b' ),
  }
}

var line2 = {
  tokenClasss: {
    0: new tokenClass( 1, 'abcdefgh' ),
    1: new tokenClass( 0, 'abcdefgh' ),
    2: new tokenClass( 4, 'abcdefgh' ),
    3: new tokenClass( 5, 'abcdefgh' ),
    4: new tokenClass( 3, 'abcdefgh' ),
    5: new tokenClass( 3, 'abcdefgh' ),
    6: new tokenClass( 2, 'abcdefgh' ),
    7: new tokenClass( 4, 'abcdefgh' ),
    8: new tokenClass( 5, 'abcdefgh' ),
    9: new tokenClass( 0, 'abcdefgh' ),
  },
  chains: {
    2: new stepClass( 'c' ),
    3: new stepClass( 'a' ),
    4: new stepClass( 'b' ),
    5: new stepClass( 'c' ),
  }
}

var line21 = {
  tokenClasss: {
    1: new tokenClass( 1, 'abcdefgh' ),
    6: new tokenClass( 3, 'abcdefgh' ),
  },
  chains: {
  }
}

var line22 = {
  tokenClasss: {
    1: new tokenClass( 3, 'abcdefgh' ),
    2: new tokenClass( 3, 'abcdefgh' ),
    3: new tokenClass( 5, 'abcdefgh' ),
    6: new tokenClass( 2, 'abcdefgh' ),
    7: new tokenClass( 3, 'abcdefgh' ),
    8: new tokenClass( 5, 'abcdefgh' ),
    9: new tokenClass( 0, 'abcdefgh' ),
  }
}


var lines = [
  line0,
  line1,
  line11,
  line12,
  line2,
  line21,
  line22,
  line0,
  line1,
  line11,
  line12,
  line0,
  line0,
  line1,
  line11,
  line12,
  line0,
  line2,
  line21,
  line22,
  line0,
  line1,
  line11,
  line12,
  line1,
  line0,
  line1,
  line0,
  line0,
  line0,
  line2,
  line21,
  line22,
  line2,
  line0,
  line1,
  line1,
  line11,
  line12,
  line0,
  line0,
  line0,
  line2,
  line0,
  line0,
  line1,
]

//export var codeModel = new CodeModel( lines, scopeClasss )
export default () => new CodeModel( lines, scopeClasss )
