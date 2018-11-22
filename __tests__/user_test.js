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
var mongoose = require('mongoose');
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

// var testReqBody =  {
//     body : {
//         firstName       : String,
//         lastName        : String,
//         phoneNumber     : String,

//         address1        : String,
//         address2        : String,
//         city            : String,
//         state           : String,
//         zip             : Number,

//         year            : Number,
//         month           : Number,
//         day             : Number
//     }
// }


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
describe('Testing User Model', () => {
    describe('Testing ability to generate new accounts', () => {

        /****************************
 * Setup and Teardown
 ****************************/

        beforeAll((done) => {
            console.log('#######running BEFORE ALL')
            var options = {
                server: { socketOptions: { keepAlive: 30000, connectTimeoutMS: 30000, reconnectTries: 30, reconnectInterval: 2000 } },
                replset: { socketOptions: { keepAlive: 30000, connectTimeoutMS: 30000, reconnectTries: 30, reconnectInterval: 2000 } }
              };
            mongoose.connect('mongodb://localhost:27017/apodDBTest',  options, { useNewUrlParser: true }, err=> {
                if(err) {
                    console.log('connection to mongo.db threw the following error ' + err);
                } else {
                    console.log('Connection to mongo.db succesful')
                }
                return done();
            }); // connect to our database
            console.log('disconnect connection state prior : ' + mongoose.connection.readyState);
            
        });

        afterAll((done) => {
            console.log('#######running AFTER ALL')
            console.log('disconnecting from server')
            console.log('disconnect connection state prior : ' + mongoose.connection.readyState);
            mongoose.disconnect(done);
            console.log('disconnect connection post : ' + mongoose.connection.readyState);
            return done();
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
            }
            
            //request = "[" + request + "]";
            //req = JSON.stringify(request);
            req = request;
            //jest.setTimeout(10000);
            function clearDB() {
                for (var i in mongoose.connection.collections) {
                  mongoose.connection.collections[i].remove(function() {});
                }
                return done();
              }

            return clearDB();
        })


        

        test('Verify that a new account can be created', (done) => {
            //function callback() {
                console.log('TEST STARTED:');
                console.log('connection state : ' + mongoose.connection.readyState);

                User.attemptNewUser(req, email, password, function(err, user){
                    console.log('validateUser called back - checking undefined on err - ' + err);
                    console.log('verify user');
                    if(user != null)
                        expect(user.local.email).toBe(email);
                    else {
                        expect(err).toBeNull();
                    }
                    console.log('test about to call done');
                    done();
                }).catch(() => {
                    console.log('## RUNNING CATCH BLOCK ##');
                    expect(false).toBe(true);
                    expect(user).toBeNull();
                    return done();
                });
           
            
        //    fetchData(callback);

        },15000);
        
        // test('Verify that a new account can not be created if email is already in the system', (done) => {
        //     User.attemptNewUser(req, email, password, function(err, user){
        //         expect(false).toBe(true);
        //         done();
        //     }).catch((err) => {
        //         expect(err.message).toBe('Account Already Exists');
        //         expect(user).toBeNull();
        //         done();
        //     });
        // },8000);


        // test('ensure hash generation returns value', () => {
        //     expect(newUser.local.password = newUser.generateHash(testPassword)).not.toBeNull();
        // });
        
        // test('check valid password', () => {
        //     expect(newUser.validPassword(testPassword)).toBeTruthy();
        // });
        
        // test('check invalid password', () => {
        //     expect(newUser.validPassword(testBadPassword)).toBeFalsy();
        // });
    })
})
