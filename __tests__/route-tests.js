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

app.close();
