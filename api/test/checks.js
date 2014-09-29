var request = require('request'),
  should = require('should');

describe('/checks', function () {

  it('GET should return all checks', function (done) {
    request({
      url: 'http://localhost:8000/checks',
      method: 'get',
      json: true
    }, function (err, res, json) {
      (json).should.be.an.Array;
      done();
    });
  });

  it('POST should create a check', function (done) {
    request({
      url: 'http://localhost:8000/checks',
      method: 'post',
      json: true
    }, function (err, res, json) {
      (json).should.be.an.Object;
      (json).should.have.properties(['created', 'updated', 'message', 'result', '_id']);
      done();
    });
  });

});
