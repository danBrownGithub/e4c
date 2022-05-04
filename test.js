/* 
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
 */

var assert = require('assert');
const express = require('express');
var request = require('request');
var expect = require('chai').expect;

const testURL = 'http://localhost:8080';

describe('DB Connection', function() {
  it('should connect', function (done) {
    const {MongoClient} = require('mongodb');
    const uri = "mongodb+srv://e4cadmin:4ICXqpSg8T7W8v7e@cluster0.lu0kf.mongodb.net/sample_airbnb?retryWrites=true&w=majority"
    const client = new MongoClient(uri);
    async function run() {
      try {
        await client.connect();
        //console.log("Connected correctly to server");
        done();
      } catch (err) {
        //console.log(err.stack);
        done(err);
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
    });
  });

describe('Express endpoint: \'/\' test', function() {
  it('should connect to home endpoint succesfully', function (done) {
    let tempURL = testURL+'/';
    request({method: 'GET', uri: tempURL}, function(err, res, body) {
      expect(res.statusCode).to.equal(200);
      done();
    })
  })
});

describe('Express endpoint: \'/login\' test', function() {
  it('should login to a test user', function(done) {
    let tempURL = testURL+'/login';
    request({method: 'POST', uri: tempURL, headers: {'content-type':'application/json'},
    body: {email: 'testemail@test.test',password: 'testpass'},json:true
    },function(err,res,body) {
      expect(res.statusCode).to.equal(200);
      done();
      
    })
  })
});

describe('Express endpoint: \'/usr/id\' test', function() {
  it('should get user information given a certain id', function(done) {
    let tempURL = testURL+'/usr/id';
    request({method: 'POST', uri: tempURL, headers: {'content-type':'application/json'}, body: {id:'623ded69a00640e1e561c6b4',tokenID:'62360e0a76896f6bd0fa1fb5'},json:true}
    ,function(err,res,body) {
      expect(res.statusCode).to.equal(200);
      done();
    })
  })
});

describe('Express endpoint: \'/classroom\' test', function() {
  it(`test should create new classroom and push change to test user. 
    This does break puts definition in vitro. 
    However behaviour will be as expected in vivo`, function(done) {
    let tempURL = testURL+'/classroom';
    request({method: 'PUT', uri: tempURL, headers: {'content-type':'application/json'}, body: {id:'623ded69a00640e1e561c6b4',tokenID:'62360e0a76896f6bd0fa1fb5'},json:true}
    ,function(err,res,body) {
      expect(res.statusCode).to.equal(200);
      done();
    })
  })
});

describe('Express endpoint: \'/classroom\' test.  GET', function() {
  it(`test should get classroom as long as requester is member`, function(done) {
    let tempURL = testURL+'/classroom';
    request({method: 'GET', uri: tempURL, headers: {'content-type':'application/json'}, body: {id:'623ded69a00640e1e561c6b4',classID:'624b67bdcddaefd2b674dd5e',tokenID:'62360e0a76896f6bd0fa1fb5'},json:true}
    ,function(err,res,body) {
      expect(res.statusCode).to.equal(200);
      done();
    })
  })
});

describe('Express endpoint: \'/classroom/usr\' test.  PUT', function() {
  it(`test should add test user to classroom as well as update user info to include class`, function(done) {
    let tempURL = testURL+'/classroom/usr';
    request({method: 'PUT', uri: tempURL, headers: {'content-type':'application/json'}, body: {email:'testemail@test.test',classID:'624b67bdcddaefd2b674dd5e',tokenID:'62360e0a76896f6bd0fa1fb5'},json:true}
    ,function(err,res,body) {
      expect(res.statusCode).to.equal(200);
      done();
    })
  })
});

//GROUP PUT
describe('Express endpoint: \'/classroom/group\' test.  PUT', function() {
  it(`test should create group`, function(done) {
    let tempURL = testURL+'/classroom/group';
    request({method: 'PUT', uri: tempURL, headers: {'content-type':'application/json'}, body: {tokenID:'62360e0a76896f6bd0fa1fb5', owner:'623ded69a00640e1e561c6b4', member:'623ded69a00640e1e561c6b4', groupName:'Testy'},json:true}
        ,function(err,res,body) {
          expect(res.statusCode).to.equal(200);
          done();
        })
  })
});
//GROUP GET
describe('Express endpoint: \'/classroom/group\' test.  GET', function() {
  it(`test should create group`, function(done) {
    let tempURL = testURL+'/classroom/group';
    request({method: 'GET', uri: tempURL, headers: {'content-type':'application/json'}, body: {tokenID:'62360e0a76896f6bd0fa1fb5', groupID:'625a02fea2d604f526f2daed', owner:'623ded69a00640e1e561c6b4', id:'623ded69a00640e1e561c6b4'},json:true}
        ,function(err,res,body) {
          expect(res.statusCode).to.equal(200);
          done();
        })
  })
});

//ACTIVITY PUT
describe('Express endpoint: \'/activity\' test.  PUT', function() {
  it(`test should create activity`, function(done) {
    let tempURL = testURL+'/activity';
    request({method: 'PUT', uri: tempURL, headers: {'content-type':'application/json'}, body: {tokenID:'62360e0a76896f6bd0fa1fb5', name:'test hw', description:'do this now'},json:true}
        ,function(err,res,body) {
          expect(res.statusCode).to.equal(200);
          done();
        })
  })
});

//ACTIVITY GET
describe('Express endpoint: \'/activity\' test.  GET', function() {
  it(`test should get activity if it exists`, function(done) {
    let tempURL = testURL+'/activity';
    request({method: 'GET', uri: tempURL, headers: {'content-type':'application/json'}, body: {tokenID:'62360e0a76896f6bd0fa1fb5', id:'6251eb2e2aa2e7539f6ad8a9'},json:true}
        ,function(err,res,body) {
          expect(res.statusCode).to.equal(200);
          done();
        })
  })
});
