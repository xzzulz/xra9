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
    new tokenClass( 0, 'abcdefgh' ),
    new tokenClass( 3, 'abcdefgh' ),
    new tokenClass( 1, 'abcdefgh' ),
    new tokenClass( 2, 'abcdefgh' ),
    new tokenClass( 5, 'abcdefgh' ),
    new tokenClass( 1, 'abcdefgh' ),
    new tokenClass( 4, 'abcdefgh' ),
    new tokenClass( 0, 'abcdefgh' ),
    new tokenClass( 4, 'abcdefgh' ),
    new tokenClass( 3, 'abcdefgh' ),
    new tokenClass( 3, 'abcdefgh' ),
    new tokenClass( 2, 'abcdefgh' )
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


var lines = [
  line0,
  line0,
  line0,
  line0,
  line0,
  line0,
  line0,
  line0,
  line0,
  line0,
  line0,
  line0,
  line0,
  line0,
  line0,
  line0,
  line0,
  line0,
  line0,
  line0,
  line0,
  line0,
  line0,
  line0,
  line0,
  line0,
  line0,
  line0,
  line0,
  line0,
  line0
]

export { lines, scopes }
