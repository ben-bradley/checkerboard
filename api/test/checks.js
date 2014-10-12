var request = require('request'),
  should = require('should');

var headers = {
  account_id: 'fdf2e4d6-9e6e-4380-b2d3-84fe82cee9a6',
  account_secret: 'fdf2e4d6-0e6e-4380-b2d3-84fe82cee9a6'
};

describe('/checks', function () {

  it('GET /checks should return all checks for account', function (done) {
    request({
      url: 'http://localhost:8000/checks',
      method: 'get',
      headers: headers,
      json: true
    }, function (err, res, json) {
      (err === null).should.equal(true, (err || {}).message);
      (json).should.be.an.Array;
      done();
    });
  });

  it('GET /checks/{id} should return a specific check', function (done) {
    request({
      url: 'http://localhost:8000/checks/f3310056-72c2-4bc0-a917-9920af82190b',
      method: 'get',
      headers: headers,
      json: true
    }, function (err, res, json) {
      (err === null).should.equal(true, (err || {}).message);
      (json).should.be.an.Object;
      (json).should.have.properties(['created', 'updated', 'message', 'result', '_id']);
      done();
    });
  });

  it('POST /checks should create a check', function (done) {
    request({
      url: 'http://localhost:8000/checks',
      method: 'post',
      headers: headers,
      json: true
    }, function (err, res, json) {
      (err === null).should.equal(true, (err || {}).message);
      (json).should.be.an.Object;
      (json).should.have.properties(['created', 'updated', 'message', 'result', '_id']);
      done();
    });
  });

  it('PUT /checks/{id} should update a check', function (done) {
    var now = new Date().getTime();
    request({
      url: 'http://localhost:8000/checks/f3310056-72c2-4bc0-a917-9920af82190b',
      method: 'put',
      headers: headers,
      body: {
        message: '' + now
      },
      json: true
    }, function (err, res, json) {
      (err === null).should.equal(true, (err || {}).message);
      (json).should.be.an.Object;
      (json).should.have.properties(['created', 'updated', 'message', 'result', '_id']);
      (json.message).should.equal('' + now);
      done();
    });
  });

});
