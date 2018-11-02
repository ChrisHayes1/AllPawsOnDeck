//tests for user.js
const user = require('../models/user.js');
var newUser = new user();
var password = 'password';
var badPassword = 'pword';

test('ensure hash generation returns value', () => {
    expect(newUser.local.password = newUser.generateHash(password)).not.toBeNull();
});

test('check valid password', () => {
    expect(newUser.validPassword(password)).toBeTruthy();
});

test('check invalid password', () => {
    expect(newUser.validPassword(badPassword)).toBeFalsy();
});