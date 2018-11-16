const app = require('../server');
const request = require('supertest');

describe('Test the root path', () => {
    test('Index return 200 response', () => {
        return request(app).get("/").then(response => {
            expect(response.statusCode).toBe(200)
        })
    });
});

describe('Test login get path', () => {
    test('Login route returns 200 response', () => {
        return request(app).get("/login").then(response => {
            expect(response.statusCode).toBe(200)
        })
    });
});

describe('Test signup path', () => {
    test('Login route returns 200 response', () => {
        return request(app).get("/signup").then(response => {
            expect(response.statusCode).toBe(200)
        })
    });
});

describe('Test profile path', () => {
    test('Login route returns 302 response when not logged in', () => {
        return request(app).get("/profile").then(response => {
            expect(response.statusCode).toBe(302)
        })
    });
});

describe('Test application path', () => {
    test('Login route returns 302 response when not logged in', () => {
        return request(app).get("/application").then(response => {
            expect(response.statusCode).toBe(302)
        })
    });
});
describe('Test profile path', () => {
    test('Login route returns 302 response when not logged in', () => {

        return request(app).get("/profile").then(response => {
            expect(response.statusCode).toBe(302)
        })
    });
});

describe('Test application path', () => {
    test('Login route returns 302 response when not logged in', () => {
        return request(app).get("/application").then(response => {
            expect(response.statusCode).toBe(302)
        })
    });
});

describe('GET /api/getDir', function(){
    it('login', loginUser());
    it('uri that requires user to be logged in', function(done){
    request(app)
        .get('/profile')                       
        .expect(200)
        .end(function(err, res){
            if (err) return done(err);
            console.log(res.body);
            done()
        });
    });
});


function loginUser() {
    return function(done) {
        request(app)
            .post('/login')
            .send({ userEmail: 'Logan@email.com', userPassword: 'password' })
            .expect(302)
            .expect('Location', '/profile')
            .end(onResponse);

        function onResponse(err, res) {
           if (err) return done(err);
           return done();
        }
    };
};


app.close();
