import { scopeClass, lineClass, varlistItem, tokenClass, stepClass, floatClass, floatTokenClass } from '../stores/codeClasses.js'


var scopes = [
  new scopeClass( 2, 2, 10, 6, 1 ),
  new scopeClass( 3, 3, 4, 3, 2 ),
]


var line0 = new lineClass(
  [
    new tokenClass( 2, '0' ),
    new tokenClass( 3, 'abcde' ),
    new tokenClass( 1, 'exampl' ),
    new tokenClass( 0, 'Simple' ),
    new tokenClass( 5, 'qust' ),
    new tokenClass( 1, 'm55' ),
    new tokenClass( 6, 'fast' ),
    new tokenClass( 0, '1234' ),

    new tokenClass( 4, '0000' ),
    new tokenClass( 3, 'xxxxx' ),
    new tokenClass( 6, 'quick' ),
    new tokenClass( 6, 'web' ),
    new tokenClass( 0, '1234' ),
    new tokenClass( 4, '0000' ),
    new tokenClass( 6, 'xxxxx' ),
    new tokenClass( 3, 'quick' ),

    new tokenClass( 5, 'qust' ),
    new tokenClass( 1, 'm55' ),
    new tokenClass( 6, 'fast' ),
    new tokenClass( 0, '1234' ),
    new tokenClass( 4, '0000' ),
    new tokenClass( 3, 'xxxxx' ),
    new tokenClass( 6, 'quick' ),
    new tokenClass( 6, 'web' ),

    new tokenClass( 0, '1234' ),
    new tokenClass( 4, '0000' ),
    new tokenClass( 6, 'xxxxx' ),
    new tokenClass( 3, 'quick' ),
    new tokenClass( 2, 'web' ),
    new tokenClass( 6, 'quick' ),
    new tokenClass( 6, 'web' ),
    new tokenClass( 3, 'quick' ),
  ],
  [
    new stepClass( 0 ),
    new stepClass( 1 ),
    new stepClass( 2 ),
    new stepClass( 0 ),
    new stepClass( 1 ),
    new stepClass( 2 )
  ]
)

var line1 = new lineClass(
  [
    new tokenClass( 6, 'web' ),
    new tokenClass( 0, '1234' ),
    new tokenClass( 4, '0000' ),
    new tokenClass( 6, 'xxxxx' ),
    new tokenClass( 3, 'quick' ),
    new tokenClass( 2, 'web' ),
    new tokenClass( 2, '1' ),
    new tokenClass( 3, 'Exmpl' ),
    new tokenClass( 1, 'quark' ),
    new tokenClass( 0, 'Simple' ),
    new tokenClass( 5, 'qust' ),
    new tokenClass( 1, 'm55' ),
    new tokenClass( 6, 'fast' ),
    new tokenClass( 0, '1234' ),
    new tokenClass( 4, '0000' ),
    new tokenClass( 3, 'xxxxx' ),
    new tokenClass( 6, 'quick' ),
    new tokenClass( 6, 'web' ),
    new tokenClass( 0, '1234' ),
    new tokenClass( 4, '0000' ),
    new tokenClass( 6, 'xxxxx' ),
    new tokenClass( 3, 'quick' ),
    new tokenClass( 2, 'web' )
  ],
  [
    new stepClass( 0 ),
    new stepClass( 1 ),
    new stepClass( 2 ),
    new stepClass( 0 ),
    new stepClass( 1 ),
    new stepClass( 2 )
  ]
)

var line2 = new lineClass(
  [
    new tokenClass( 4, '0000' ),
    new tokenClass( 3, 'xxxxx' ),
    new tokenClass( 6, 'quick' ),
    new tokenClass( 6, 'web' ),
    new tokenClass( 0, '1234' ),
    new tokenClass( 2, '2' ),
    new tokenClass( 3, 'Exmpl' ),
    new tokenClass( 1, 'quark' ),
    new tokenClass( 0, 'Simple' ),
    new tokenClass( 5, 'qust' ),
    new tokenClass( 1, 'm55' ),
    new tokenClass( 6, 'fast' ),
    new tokenClass( 0, '1234' ),
    new tokenClass( 4, '0000' ),
    new tokenClass( 3, 'xxxxx' ),
    new tokenClass( 6, 'quick' ),
    new tokenClass( 6, 'web' ),
    new tokenClass( 0, '1234' ),
    new tokenClass( 4, '0000' ),
    new tokenClass( 6, 'xxxxx' ),
    new tokenClass( 3, 'quick' ),
    new tokenClass( 2, 'web' )
  ],
  [
    new stepClass( 0 ),
    new stepClass( 1 ),
    new stepClass( 2 ),
    new stepClass( 0 ),
    new stepClass( 1 ),
    new stepClass( 2 )
  ]
)

var line3 = new lineClass(
  [
    new tokenClass( 2, '3' ),
    new tokenClass( 6, 'quick' ),
    new tokenClass( 6, 'web' ),
    new tokenClass( 0, '1234' ),
    new tokenClass( 4, '0000' ),
    new tokenClass( 6, 'xxxxx' ),
    new tokenClass( 3, 'quick' ),
    new tokenClass( 2, 'web' ),
    new tokenClass( 3, 'Exmpl' ),
    new tokenClass( 1, 'quark' ),
    new tokenClass( 0, 'Simple' ),
    new tokenClass( 5, 'qust' ),
    new tokenClass( 1, 'm55' ),
    new tokenClass( 6, 'fast' ),
    new tokenClass( 0, '1234' ),
    new tokenClass( 4, '0000' ),
    new tokenClass( 3, 'xxxxx' ),
    new tokenClass( 6, 'quick' ),
    new tokenClass( 6, 'web' ),
    new tokenClass( 0, '1234' ),
    new tokenClass( 4, '0000' ),
    new tokenClass( 6, 'xxxxx' ),
    new tokenClass( 3, 'quick' ),
    new tokenClass( 2, 'web' )
  ],
  [
    new stepClass( 0 ),
    new stepClass( 1 ),
    new stepClass( 2 ),
    new stepClass( 0 ),
    new stepClass( 1 ),
    new stepClass( 2 )
  ]
)

var line4 = new lineClass(
  [
    new tokenClass( 0, '1234' ),
    new tokenClass( 4, '0000' ),
    new tokenClass( 3, 'xxxxx' ),
    new tokenClass( 6, 'quick' ),
    new tokenClass( 6, 'web' ),
    new tokenClass( 0, '1234' ),
    new tokenClass( 6, 'fast' ),
    new tokenClass( 1, 'm55' ),
    new tokenClass( 6, 'fast' ),
    new tokenClass( 0, '1234' ),
    new tokenClass( 4, '0000' ),
    new tokenClass( 3, 'xxxxx' ),
    new tokenClass( 6, 'quick' ),
    new tokenClass( 6, 'web' ),
    new tokenClass( 0, '1234' ),
    new tokenClass( 6, 'fast' ),
    new tokenClass( 0, '1234' ),
    new tokenClass( 4, '0000' ),
    new tokenClass( 0, '1234' ),
    new tokenClass( 6, 'fast' ),
    new tokenClass( 0, '1234' ),
    new tokenClass( 4, '0000' ),
    new tokenClass( 3, 'xxxxx' ),
    new tokenClass( 6, 'quick' ),
    new tokenClass( 6, 'web' ),
    new tokenClass( 0, '1234' ),
    new tokenClass( 4, '0000' ),
    new tokenClass( 6, 'xxxxx' ),
    new tokenClass( 3, 'quick' ),
    new tokenClass( 2, 'web' )
  ],
  [
    new stepClass( 0 ),
    new stepClass( 1 ),
    new stepClass( 2 ),
    new stepClass( 0 ),
    new stepClass( 1 ),
    new stepClass( 2 )
  ]
)

var line5 = new lineClass(
  [
    new tokenClass( 5, 'qust' ),
    new tokenClass( 1, 'm55' ),
    new tokenClass( 6, 'fast' ),
    new tokenClass( 0, '1234' ),
    new tokenClass( 4, '0000' ),
    new tokenClass( 3, 'xxxxx' ),
    new tokenClass( 6, 'quick' ),
    new tokenClass( 6, 'web' ),
    new tokenClass( 3, 'perfect' ),
    new tokenClass( 1, 'well' ),
    new tokenClass( 0, 'lets-see' ),
    new tokenClass( 3, 'Qiix' ),
    new tokenClass( 6, 'Qiix' ),
    new tokenClass( 1, 'Qiix' ),
    new tokenClass( 0, 'Qiix' ),
    new tokenClass( 3, 'Exmpl' ),
    new tokenClass( 1, 'quark' ),
    new tokenClass( 0, 'Simple' ),
    new tokenClass( 5, 'qust' ),
    new tokenClass( 1, 'm55' ),
    new tokenClass( 6, 'fast' ),
    new tokenClass( 0, '1234' ),
    new tokenClass( 4, '0000' ),
    new tokenClass( 3, 'xxxxx' ),
    new tokenClass( 6, 'quick' ),
    new tokenClass( 6, 'web' ),
    new tokenClass( 1, 'Qiix' ),
    new tokenClass( 3, 'Qiix' ),
    new tokenClass( 2, '3' ),
    new tokenClass( 3, 'Exmpl' ),
    new tokenClass( 1, 'quark' ),
  ],
  []
)

var line6 = new lineClass(
  [
    new tokenClass( 6, 'web' ),
    new tokenClass( 2, '3' ),
    new tokenClass( 3, 'Exmpl' ),
    new tokenClass( 1, 'quark' ),
    new tokenClass( 0, 'Simple' ),
    new tokenClass( 5, 'qust' ),
    new tokenClass( 0, 'abcdefgh' ),
    new tokenClass( 3, 'Exmpl' ),
    new tokenClass( 1, 'quark' ),
    new tokenClass( 0, 'Simple' ),
    new tokenClass( 5, 'qust' ),
    new tokenClass( 1, 'm55' ),
    new tokenClass( 6, 'fast' ),
    new tokenClass( 0, '1234' ),
    new tokenClass( 4, '0000' ),
    new tokenClass( 3, 'xxxxx' ),
    new tokenClass( 6, 'quick' ),
    new tokenClass( 6, 'web' ),
    new tokenClass( 2, '3' ),
    new tokenClass( 3, 'Exmpl' ),
    new tokenClass( 1, 'quark' ),
    new tokenClass( 0, 'Simple' ),
    new tokenClass( 5, 'qust' ),
    new tokenClass( 1, 'm55' ),
    new tokenClass( 6, 'fast' ),
    new tokenClass( 5, 'qust' ),
    new tokenClass( 1, 'm55' ),
    new tokenClass( 6, 'fast' ),
    new tokenClass( 0, '1234' ),
    new tokenClass( 4, '0000' ),
    new tokenClass( 3, 'xxxxx' ),
  ],[]
)



var line7 = new lineClass(
  [

    new tokenClass( 0, 'lets-see' ),
    new tokenClass( 3, 'Qiix' ),
    new tokenClass( 0, '5' ),
    new tokenClass( 6, '1234' ),
    new tokenClass( 1, 'some' ),
    new tokenClass( 2, 'go' ),
    new tokenClass( 3, 'perfect' ),
    new tokenClass( 1, 'well' ),
    new tokenClass( 0, 'Qiix' ),
    new tokenClass( 1, 'quark' ),
    new tokenClass( 0, 'Simple' ),
    new tokenClass( 5, 'qust' ),
    new tokenClass( 1, 'm55' ),
    new tokenClass( 6, 'fast' ),
    new tokenClass( 0, '1234' ),
    new tokenClass( 4, '0000' ),
    new tokenClass( 3, 'xxxxx' ),
    new tokenClass( 6, 'quick' ),
    new tokenClass( 6, 'web' ),
    new tokenClass( 3, 'Exmpl' ),
    new tokenClass( 1, 'quark' ),
    new tokenClass( 0, 'Simple' ),
    new tokenClass( 5, 'qust' ),
    new tokenClass( 1, 'm55' ),
    new tokenClass( 6, 'fast' ),
    new tokenClass( 3, 'Exmpl' ),
    new tokenClass( 1, 'quark' ),
    new tokenClass( 0, 'Simple' ),
    new tokenClass( 5, 'qust' ),
    new tokenClass( 1, 'm55' ),
    new tokenClass( 6, 'fast' ),
  ],
  []
)


var line8 = new lineClass(
  [

    new tokenClass( 6, 'web' ),
    new tokenClass( 1, 'Qiix' ),
    new tokenClass( 3, 'Qiix' ),
    new tokenClass( 0, 'Qiix' ),
    new tokenClass( 3, 'Exmpl' ),
    new tokenClass( 1, 'quark' ),
    new tokenClass( 0, 'Simple' ),
    new tokenClass( 3, 'Qiix' ),
    new tokenClass( 0, '5' ),
    new tokenClass( 6, '1234' ),
    new tokenClass( 1, 'some' ),
    new tokenClass( 2, 'go' ),
    new tokenClass( 1, 'm55' ),
    new tokenClass( 6, 'fast' ),
    new tokenClass( 3, 'Exmpl' ),
    new tokenClass( 1, 'quark' ),
    new tokenClass( 0, 'Simple' ),
    new tokenClass( 5, 'qust' ),
    new tokenClass( 3, 'perfect' ),
    new tokenClass( 1, 'well' ),
    new tokenClass( 0, 'Qiix' ),
    new tokenClass( 3, 'Exmpl' ),
    new tokenClass( 1, 'quark' ),
    new tokenClass( 0, 'Simple' ),
    new tokenClass( 6, 'quick' ),
    new tokenClass( 6, 'web' ),
    new tokenClass( 1, 'Qiix' ),
    new tokenClass( 3, 'Qiix' ),
    new tokenClass( 0, 'Qiix' ),
    new tokenClass( 3, 'Exmpl' ),
    new tokenClass( 1, 'quark' ),
  ],
  []
)


var lines = [
  line0,
  line1,
  line2,
  line3,
  line4,
  line5,
  line6,
  line7,
  line8,
]
var alin
for ( var i=0; i<16; i++ ) {
  alin = new lineClass([])
  for (var j = 0; j < 32; j++) {
    alin.tokens.push( new tokenClass( 0, '' ) )
  }
  lines.push( alin )
  if ( i%8 == 0 ) lines.push( new lineClass([]) )
}




var varList = {
  3: [
      new varlistItem( 0, [], new tokenClass( 3, 'alpha', 'alpha' ) ),
      new varlistItem( 0, [], new tokenClass( 3, 'beta', 'beta' ) ),
      new varlistItem( 0, [], new tokenClass( 3, 'gamma', 'gamma', 'var' ) ),
      new varlistItem( 0, [], new tokenClass( 3, 'delta', 'delta' ) ),
      new varlistItem( 0, [], new tokenClass( 3, 'eta', 'eta' ) ),
  ],
  4: [
      new varlistItem( 0, [], new tokenClass( 4, 'number', 'number' ) ),
      new varlistItem( 0, [], new tokenClass( 4, 'amount', 'amount','of stuff' ) ),
      new varlistItem( 0, [], new tokenClass( 4, 'count', 'count' ) ),
      new varlistItem( 0, [], new tokenClass( 4, 'ii', 'ii', 'zz' ) ),
      new varlistItem( 0, [], new tokenClass( 4, 'val', 'some', 'val' ) ),
  ],
  5: [
      new varlistItem( 0, [], new tokenClass( 5, 'text', 'text' ) ),
      new varlistItem( 0, [], new tokenClass( 5, 'detail', 'detail' ) ),
      new varlistItem( 0, [], new tokenClass( 5, 'info', 'info' ) ),
  ],
  6: [
      new varlistItem( 0, [], new tokenClass( 6, 'moon', 'moon', '', 'planet', 'demo' ) ),
      new varlistItem( 0, [], new tokenClass( 6, 'sun', 'sun', 'star', 'planet', 'demo' ) ),
      new varlistItem( 0, [], new tokenClass( 6, 'apple', 'apple', '', 'apple', 'demo' ) ),
      new varlistItem( 0, [], new tokenClass( 6, 'frog', 'frog', '', 'frog', 'demo' ) ),

      new varlistItem( 0, [], new tokenClass( 6, 'flower', 'flower', '', 'flower', 'demo' ) ),
      new varlistItem( 0, [], new tokenClass( 6, 'someone', 'someone', '', 'user', 'demo' ) ),
      new varlistItem( 0, [], new tokenClass( 6, 'spaceship 5', 'space', 'ship 5', 'airplane', 'demo' ) ),
      new varlistItem( 0, [], new tokenClass( 6, 'earth', 'earth', '', 'planet', 'demo' ) ),

      new varlistItem( 0, [], new tokenClass( 6, 'rocket1', 'rocket1', '', 'airplane', 'demo' ) ),
  ],
}

var typeList = [
  new tokenClass( 70, '', 'planet', '', 'planet', 'demo' ),
  new tokenClass( 70, '', 'apple', '', 'apple', 'demo' ),
  new tokenClass( 70, '', 'frog', '', 'frog', 'demo' ),
  new tokenClass( 70, '', 'flower', '', 'flower', 'demo' ),
  new tokenClass( 70, '', 'user', '', 'user', 'demo' ),
]


var floats = [
  new floatClass( 540,380, 2, 2,
    [
      new floatTokenClass( new tokenClass( 2, '1234' ), 0 ,0 ),
      new floatTokenClass( new tokenClass( 5, 'axis' ), 1 ,0 ),
      new floatTokenClass( new tokenClass( 3, 'tick' ), 1 ,1 ),
    ]
  )
]
floats = []


export { lines, floats, varList, typeList }
