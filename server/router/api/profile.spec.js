const {
  request,
  loadFixtures,
  clearFixtures,
  auth,
  mongoose,
} = require('../../services/test');
const User = mongoose.model('User');

describe('Profile API', () => {
  const fixtures = {
    User: [
      {
        _id: '59946e890ddfc046f2a0412a',
        username: 'test',
        name: 'Test',
        password: 'password',
        role: 'admin',
      }
    ],
  };
  let token = null;

  before(() => loadFixtures(fixtures));
  before(() => auth('test', 'password').then(jwt => token = jwt));
  after(() => clearFixtures(fixtures));

  it('GET /api/profile', () => {
    request.get('/api/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(202)
      .expect('Content-Type', /json/)
      .expect({
        _id: '59946e890ddfc046f2a0412a',
        username: 'test',
        role: 'admin',
      })
  });

  it('PUT /api/profile/update', () => (
    request.put('/api/profile/update')
    .set('Authorization', `Bearer ${token}`)
    .send({ username: 'Test2' })
    .expect(202)
    .expect('Content-Type', /json/)
    .then(({ body }) => {
      body.should.include({ username: 'Test2' }).and.have.property('_id');
      Object.keys(body).should.be.an('array').and.have.length(6);

      return User.findById('59946e890ddfc046f2a0412a');
    })
    .then(user => user.name.toString().should.be.a('string'))
  ));

  it('PUT /api/profile/update without body', () => (
    request.put('/api/profile/update')
    .set('Authorization', `Bearer ${token}`)
    .expect(400)
  ));

});
