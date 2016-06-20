import { scopeClass, lineClass, tokenClass, stepClass, floatClass, floatTokenClass } from '../stores/codeClasses.js'


var scopes = [
  new scopeClass( 0, 0, 34, 60, '#0d0f13' ),
  new scopeClass( 2, 4, 30, 42, '#14171c' ),
  new scopeClass( 8, 6, 28, 24, '#191d23' ),
  new scopeClass( 8, 30, 28, 36, '#191d23' ),
  new scopeClass( 6, 16, 7, 17, '#0d3139' ),
  new scopeClass( 8, 16, 9, 17, '#0d3139' ),
  new scopeClass( 10, 20, 11, 21, '#0d3139' )
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

var line1 = new lineClass(
  [
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
    new tokenClass( 2, '4' ),
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

var line5 = new lineClass(
  [
    new tokenClass( 0, '5' ),
    new tokenClass( 6, '1234' ),
    new tokenClass( 1, 'some' ),
    new tokenClass( 2, 'go' ),
    new tokenClass( 3, 'perfect' ),
    new tokenClass( 1, 'well' ),
    new tokenClass( 0, 'lets-see' ),
    new tokenClass( 3, 'Qiix' ),
    new tokenClass( 6, 'Qiix' ),
    new tokenClass( 2, 'Qiix' ),
    new tokenClass( 3, 'Qiix' ),
    new tokenClass( 1, 'Qiix' ),
    new tokenClass( 0, 'Qiix' ),
    new tokenClass( 1, 'Qiix' ),
    new tokenClass( 0, 'Qiix' ),
    new tokenClass( 6, 'Qiix' ),
    new tokenClass( 2, 'Qiix' ),
    new tokenClass( 1, 'Qiix' ),
    new tokenClass( 0, 'Qiix' ),
    new tokenClass( 1, 'Qiix' ),
    new tokenClass( 3, 'Qiix' ),
    new tokenClass( 0, 'Qiix' ),
    new tokenClass( 2, 'Qiix' ),
    new tokenClass( 6, 'Qiix' ),
    new tokenClass( 1, 'Qiix' ),
    new tokenClass( 2, 'Qiix' )
  ],
  []
)

var line6 = new lineClass(
  [
    new tokenClass( 0, 'abcdefgh' )
  ],[]
)

var lines = [
  line0,
  line1,
  line2,
  line3,
  line4,
  line5,
  line5,
  line4,
  line4,
  line5,
  line5,
  line4,
  line5,
  line5,
  line4,
  line5,
  line5,
  line4,
  line4,
  line4,
  line4,
  line5,
  line5,
  line5,
  line4,
  line5,
  line4,
  line5,
  line4,
  line5,
  line5,
  line5,
  line4,
  line4,
  line4,
  line5,
  line4,
  line5,
  line5,
  line4,
  line4,
  line5,
  line5,
  line4,
  line4,
  line4,
  line5,
  line5,
  line5,
  line4,
  line5,
  line4,
  line5,
  line4,
  line5,
  line4,
  line4,
  line4,
  line5,
  line4,
  line5,
  line5,
  line4,
  line4,
  line5,
  line5,
  line4,
  line4,
  line4,
  line5,
  line5,
  line5,
  line4,
  line5,
  line4,
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



export { lines, scopes, floats }
