const request = require('supertest');

const app = require('../src/app');

describe('GET /api/v1/messages', () => {
  it('responds with json message', function(done) {
    request(app)
      get('/api/v1')
      .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
  });
});

describe('POST /api/v1/messages', () => {
  it('responds with inserted message', function(done) {
    const result = {
      FirstName: 'will',
      LastName:'cofer',
      Report: "please work",
      latitude: -90,
      longitude: 180
    };
    request(app)
      .post('/api/v1/messages')
      .send(result)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        console.log(response);
        done();
      })
  });
});
