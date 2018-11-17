/****************************
 * Overview: user contains the functionality associated with creating and manipulating users
 *           The appropriate unit tests associated with this functionality will be carried out here
 * Author:   Todd Hayes-Birchler
 * Date:     11/11/2018
 ****************************/
// jest.resetModules();
// jest.unmock('mongoose');
// jest.unmock('../models/user.js');
// jest.dontMock('../models/user.js');

/****************************
 * Imports
 ****************************/
const User = require.requireActual('../models/user.js');

/****************************
 * Globals
 ****************************/
var newUser; 

var testPassword = 'password';
var testBadPassword = 'pword';
var testEmail = "testTestNameThatWillNeverBeAccidentlyUsed@gmail.faketest.com";

var email;
var password;
var testReqBody =  {
    body : {
        firstName       : String,
        lastName        : String,
        phoneNumber     : String,

        address1        : String,
        address2        : String,
        city            : String,
        state           : String,
        zip             : Number,

        year            : Number,
        month           : Number,
        day             : Number,
    }
}
/****************************
 * Setup and Teardown
 ****************************/

 beforeEach(() => {
    email = testEmail;
    password =  testPassword;
    req = testReqBody;
    req.firstName = "TestFirst";
    req.lastName = "TestLast";
    req.phoneNumber = "6085555555";
    req.address1 = "Address 1";
    req.address2 = "Address 2";
    req.city = "City";
    req.state = "State";
    req.zip = 53711;
    req.month = 1;
    req.day  = 25;
    req.year = 1983;
 })

/****************************
 * Tests
 ****************************/

/**
 * Creating Accounts
 * - Verify that a new account can be created
 * - Verify that if you attempt to create an account for an email that already exists that you get 'User Not Found' error
 * - Verify Hash returns valid response
 * Accessing Account
 * - Verify that password can be validated
 * - Verify that bad password returns error
 * - Verify that invalid email address returns error
 * - Verify that an obsolete account can be deleted
 * - Verify that you can access a user by ID
 * Editing Account
 * - Verify that you can edit fields in an account and that they update appropriatly
 * Deleting Account
 * - Verify that you can delete account by ID
 * - Verify that you can delete an account by email addy?
 */

 /****************************
 * Tests - Creating Accounts
 ****************************/
// describe('Testing User Model', () => {
//     describe('Testing ability to generate new accounts', () => {

        test('Verify that a new account can be created', (done) => {
            console.log('TEST STARTED:');
            User.attemptNewUser(req, email, password, function(err, user){
                console.log('validateUser called back');
                expect(err).toBeNull();
                expect(user.local.firstname).toBe(req.firstName);
                expect(user.local.lastname).toBe(req.lastName);
                expect(user.local.phoneNumber).toBe(req.phoneNumber);
                expect(user.local.address1).toBe(req.address1);
                expect(user.local.address2).toBe(req.address2);
                expect(user.local.city).toBe(req.city);
                expect(user.local.state).toBe(req.state);
                expect(user.local.zip).toBe(req.zip);
                expect(user.local.day).toBe(req.day);
                expect(user.local.month).toBe(req.month);
                expect(user.local.year).toBe(req.year);
                return done();
            });
        },3000);
        
        test('Verify that a new account can not be created if email is already in the system', (done) => {
            User.attemptNewUser(req, email, password, function(err, user){
                expect(err.message).toBe('Account Already Exists');
                expect(user).toBeNull();
                done();
            });
        },3000);


        // test('ensure hash generation returns value', () => {
        //     expect(newUser.local.password = newUser.generateHash(testPassword)).not.toBeNull();
        // });
        
        // test('check valid password', () => {
        //     expect(newUser.validPassword(testPassword)).toBeTruthy();
        // });
        
        // test('check invalid password', () => {
        //     expect(newUser.validPassword(testBadPassword)).toBeFalsy();
        // });
//     })
// })
