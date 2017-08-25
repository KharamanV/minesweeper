const {
  request,
  loadFixtures,
  clearFixtures,
} = require('../../services/test');

describe('Game API', () => {
  const fixtures = {
    Preset: [
      {
        _id: '59946e890ddfc046f2a0496e',
        width: 5,
        height: 5,
        minesCount: 4,
      },
    ],
    Game: [
      {
        _id: '599c4b94ac26cb7ba1eb1b66',
        width: 5,
        height: 5,
        patSquares: [{ y: 0, x: 0 }],
        mines: [
          { isPat: true, y: 0, x: 1 },
          { y : 0, x : 2 },
          { y : 1, x : 2 },
          { y : 4, x : 1 },
        ],
      },
    ],
  };

  before(() => loadFixtures(fixtures));
  after(() => clearFixtures(fixtures));

  it('POST /api/games', () => (
    request.post('/api/games')
      .send({ preset: '59946e890ddfc046f2a0496e' })
      .expect(201)
      .expect('Content-Type', /json/)
      .then(res => {
        res.body.should.include({ width: 5, height: 5 });
        res.body.board.should.be.an('array').and.have.length(5);
      })
  ));

  it('POST /api/games without preset', () => request.post('/api/games').expect(400));
});
