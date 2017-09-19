const {
  request,
  loadFixtures,
  clearFixtures,
  auth,
  mongoose,
} = require('../../services/test');
const User = mongoose.model('User');

describe('Statistic API', () => {
  const fixtures = {
    Challenge: [
      {
        _id: '59946e890ddfc046a2a0496a',
        name: 'Test',
        presets: ['59946e890ddfc046f2a0496e', '59946e110ddfc046f2a0496e'],
        bet: 1,
      },
    ],
    UserChallenge: [
      {
        user: '59946e890ddfc046f2a0412a',
        challenge: '59946e890ddfc046a2a0496a',
        isOver: true,
      },
    ],
    User: [
      {
        _id: '59946e890ddfc046f2a0412a',
        username: 'test',
        password: 'password',
        role: 'admin',
      }
    ],
    Preset: [
      {
        _id: '59946e890ddfc046f2a0496e',
        width: 5,
        height: 5,
        minesCount: 4,
      },
      {
        _id: '59946e110ddfc046f2a0496e',
        width: 9,
        height: 9,
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
          { y: 0, x: 2 },
          { y: 1, x: 2 },
          { y: 4, x: 1 },
        ],
        user: '59946e890ddfc046f2a0412a',
        challenge: '59946e890ddfc046a2a0496a',
        stage: 0,
        isWon: true,
        isOver: true,
      },
      {
        _id: '599c4b94ac26cb7ba1eb1b67',
        width: 9,
        height: 9,
        patSquares: [{ y: 0, x: 0 }],
        mines: [
          { isPat: true, y: 0, x: 1 },
          { y: 0, x: 2 },
          { y: 1, x: 2 },
          { y: 4, x: 1 },
        ],
        user: '59946e890ddfc046f2a0412a',
        challenge: '59946e890ddfc046a2a0496a',
        stage: 1,
        isOver: true,
        isWon: false,
      },
    ],
  };
  let token = null;

  before(() => loadFixtures(fixtures));
  before(() => auth('test', 'password').then(jwt => token = jwt));
  after(() => clearFixtures(fixtures));

  it('GET /api/stats/', () => (
    request.get('/api/stats')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        res.body.should.be.an('array').and.have.lengthOf(2);
      })
  ));
});
