import { scopeClass, lineClass, tokenClass, stepClass } from '../stores/codeClasses.js'


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
    new tokenClass( 2, 'WM_WMWMW' ),
    new tokenClass( 3, 'EXAMPLE8' ),
    new tokenClass( 1, 'example4' ),
    new tokenClass( 0, 'Simple' ),
    new tokenClass( 5, 'QUESTION' ),
    new tokenClass( 1, 'Motion55' ),
    new tokenClass( 6, 'fast' ),
    new tokenClass( 0, '12345678' ),
    new tokenClass( 4, '00000000' ),
    new tokenClass( 3, 'XXXXXXXX' ),
    new tokenClass( 6, 'Quicker2' ),
    new tokenClass( 6, 'Website' ),
    new tokenClass( 0, '12345678' ),
    new tokenClass( 4, '00000000' ),
    new tokenClass( 6, 'XXXXXXXX' ),
    new tokenClass( 3, 'Quicker2' ),
    new tokenClass( 2, 'Website' )
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
    new tokenClass( 0, 'abcdefgh' ),
    new tokenClass( 6, '1234' ),
    new tokenClass( 1, 'some' ),
    new tokenClass( 2, 'go' ),
    new tokenClass( 3, 'perfect' ),
    new tokenClass( 1, 'well' ),
    new tokenClass( 0, 'lets-see' ),
    new tokenClass( 3, 'WM_WMWMW' ),
    new tokenClass( 6, 'WM_WMWMW' ),
    new tokenClass( 2, 'WM_WMWMW' ),
    new tokenClass( 3, 'WM_WMWMW' ),
    new tokenClass( 1, 'WM_WMWMW' ),
    new tokenClass( 0, 'WM_WMWMW' ),
    new tokenClass( 1, 'WM_WMWMW' ),
    new tokenClass( 0, 'WM_WMWMW' ),
    new tokenClass( 6, 'WM_WMWMW' ),
    new tokenClass( 2, 'WM_WMWMW' ),
    new tokenClass( 1, 'WM_WMWMW' ),
    new tokenClass( 0, 'WM_WMWMW' ),
    new tokenClass( 1, 'WM_WMWMW' ),
    new tokenClass( 3, 'WM_WMWMW' ),
    new tokenClass( 0, 'WM_WMWMW' ),
    new tokenClass( 2, 'WM_WMWMW' ),
    new tokenClass( 6, 'WM_WMWMW' ),
    new tokenClass( 1, 'WM_WMWMW' ),
    new tokenClass( 2, 'WM_WMWMW' )
  ],
  []
)

var lineE = new lineClass(
  [
    new tokenClass( 0, 'abcdefgh' )
  ],[]
)

var lines = [
  line1,
  line0,
  line1,
  line1,
  line0,
  line0,
  lineE,
  line0,
  line1,
  line0,
  line0,
  line1,
  line0,
  lineE,
  line1,
  line0,
  line0,
  line1,
  line1,
  line1,
  line0,
  lineE,
  lineE,
  line0,
  line1,
  line0,
  line1,
  line0,
  line1,
  lineE,
  line1,
  line0,
  line1,
  line0,
  line1,
  line0,
  line0,
  line0,
  line1,
  line0,
  line1,
  line0,
  line0,
  line1,
  line1,
  line1,
  line0,
  line0,
  line1,
  line0,
  line0,
  line1,
  line1,
  line0,
  line1,
  line0,
  line1,
  line1,
  line0,
  line0,
  line1,
  line0,
  line1,
  line0,
  line1,
  line1,
  line0,
  line0,
  line1,
  line1,
  line0,
  line0,
  line0,
  line1,
  line0,
  line0,
]

export { lines, scopes }
