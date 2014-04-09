var app = require('../src/server'),
	request = require('supertest');

describe('Server heartbeat api', function() {
	describe('when requesting resource /heartbeat', function(){
		it('should respond with 200', function(done) {
			request(app)
				.get('/heartbeat')
				.expect('Content-Type', /json/)
				.expect(200, done);
		});
	});

	describe('when requesting resource /missing', function() {
		it('should respond with 404', function(done) {
			request(app)
				.get('/missing')
				.expect('Content-Type', /json/)
				.expect(404, done);
		});
	});
});