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
      {
        _id: '599c4b94ac26cb7ba1eb1b67',
        width: 9,
        height: 9,
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

  it('GET /api/games/:id', () => (
    request.get('/api/games/599c4b94ac26cb7ba1eb1b66')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({
        width: 5,
        height: 5,
        minesCount: 4,
      })
  ));

  it('POST /api/games/:id/reveal (reveals square)', () => (
    request.post('/api/games/599c4b94ac26cb7ba1eb1b66/reveal')
      .send({ x: 3, y: 0 })
      .expect(200)
      .expect({
        x: 3,
        y: 0,
        adjacentMinesCount: 2,
        isMine: false,
      })
  ));

  it('POST /api/games/:id/reveal (reveals without coordinates)', () => (
    request.post('/api/games/599c4b94ac26cb7ba1eb1b66/reveal')
      .expect(400)
  ));

  it('POST /api/games/:id/reveal (reveals empty square)', () => (
    request.post('/api/games/599c4b94ac26cb7ba1eb1b66/reveal')
      .send({ x: 4, y: 4 })
      .expect(200)
      .then((res) => {
        res.body.should.include({
          x: 4,
          y: 4,
          adjacentMinesCount: 0,
          isMine: false,
        });
        res.body.revealedSquares.should.be.an('array').and.have.length(13);
      })
  ));

  it('POST /api/games/:id/reveal (reveals square with pat situation)', () => (
    request.post('/api/games/599c4b94ac26cb7ba1eb1b66/reveal')
      .send({ x: 0, y: 0 })
      .expect(200)
      .expect({
        x: 0,
        y: 0,
        adjacentMinesCount: 0,
        isMine: true,
      })
  ));

  it('POST /api/games/:id/reveal (reveals mine)', () => (
    request.post('/api/games/599c4b94ac26cb7ba1eb1b67/reveal')
      .send({ x: 1, y: 4 })
      .expect(200)
      .expect({
        x: 1,
        y: 4,
        adjacentMinesCount: 0,
        isMine: true,
      })
  ));
});
