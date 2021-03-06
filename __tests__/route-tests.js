const app = require('../server');
const request = require('supertest');
var mUser = require('../models/user');
var User = mUser.userData;
var agent = request.agent(app);

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

describe('Go to profile if after successful log in', () => {
    it('login', loginUser(true));
});

describe('Go to / if failed log in', () => {
    it('login', loginUser(false));
});

describe('Redirect to / if not logged in', function(){
    it('uri that requires user to be logged in', function(done){
    request(app)
        .get('/profile')                       
        .expect(302)
        .expect('Location','/')
        .end(function(err, res){
            if (err) return done(err);
            console.log(res.body);
            done()
        });
    });
});

function loginUser(correct) {
    var password;
    var expect;
    if(correct == true){
        password = 'password';
        expect = '/profile';
    }
    else {
        password = 'wrongpassword';
        expect = '/login';
    }

    User.findOne({ 'local.email' :  'test@test.com' }, function(err, user) {
        // if there are any errors, return the error before anything else
        if (err)
            return done(err);

        // if no user is found, make the user
        if (!user){
            var newUser            = new User();

            // set the user's local credentials
            newUser.local.email    = 'test@test.com';
            newUser.local.password = newUser.generateHash('password');
            newUser.local.firstname = 'Test';
            newUser.local.lastname = 'Tester';
            newUser.local.completedTraining = false;
            newUser.local.isCoordinator = false;

            // save the user
            newUser.save(function(err) {
                if (err)
                    throw(err);
                return done(null, newUser);
            });
        }
    });
    return function(done) {
        request(app)
            .post('/login')
            .send({ userEmail: 'test@test.com', userPassword: password })
            .expect(302)
            .expect('Location', expect)
            .end(onResponse);

        function onResponse(err, res) {
           if (err) return done(err);
           return done();
        }
    };
};


app.close();
