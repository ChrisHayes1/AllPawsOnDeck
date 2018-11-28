/****************************
 * Overview: user contains the functionality associated with creating and manipulating users
 *           The appropriate unit tests associated with this functionality will be carried out here
 * Author:   Todd Hayes-Birchler
 * Date:     11/11/2018
 ****************************/


/****************************
 * Imports
 ****************************/
app = require('../server');
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
var request;
var req;

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


/****************************
 * Setup and Teardown
 ****************************/

afterAll((done) => {
    console.log('#######running AFTER ALL');
    return app.close(done);
});



beforeEach((done) => {
    console.log('#######running BEFORE EACH')
    email = testEmail;
    password =  testPassword;
    request = {
        "body" : {
            "firstName" : "TestFirst",
            "lastName" : "TestLast",
            "phoneNumber" : "6085555555",
            "address1" : "1930 Monroe St",
            "address2" : "Suite 200",
            "city" : "Madison",
            "state" : "WI",
            "zip" : 53711,
            "month" : 1,
            "day"  : 25,
            "year" : 1983
        }
    };
    console.log('#######returning DONE on BEFORE EACH');
    req = request;
    
    return done();
});

//Test functions exported as part of user buisiness logic        
describe('Testing User Model', () => {
    describe('Testing ability to generate new accounts', () => {

        /**
         * Test that a new account can be created with a valid email address.  
         */
        test('Verify that a new account can be created', (done) => {
            //
            User.attemptNewUser(req, email, password, function(err, user){
                if(user != null){
                    console.log('user not null');
                    expect(user.local.email).toBe(email);
                    return done();
                } 
                expect(false).toBe(true);
                return done();
            });
        },5000);
        
        /**
         * Test that if you attempt to create a new account with an existing email that the correct 
         * error is returned
         */
        test('Verify that a new account can not be created if email is already in the system', (done) => {
            User.attemptNewUser(req, email, password, function(err, user){
                if(err.message === 'Account Already Exists'){
                    expect(true).toBe(true);    
                }else {
                    expect(false).toBe(true);
                }
                done();
            });
        },8000);


        // test('ensure hash generation returns value', () => {
        //     expect(newUser.local.password = newUser.generateHash(testPassword)).not.toBeNull();
        // });
        
        // test('check valid password', () => {
        //     expect(newUser.validPassword(testPassword)).toBeTruthy();
        // });
        
        // test('check invalid password', () => {
        //     expect(newUser.validPassword(testBadPassword)).toBeFalsy();
        // });

    });

});

