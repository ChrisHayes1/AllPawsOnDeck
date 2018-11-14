/****************************
 * Overview: Application containes the users application and associated functionality.  
 *           The appropriate unit tests associated with this functionality will be carried out here
 * Author:   Todd Hayes-Birchler
 * Date:     11/11/2018
 ****************************/

/****************************
 * Imports
 ****************************/
const user = require('../models/applications.js');

/****************************
 * Globals
 ****************************/
var mApp;

/****************************
 * Setup and Teardown
 ****************************/

 beforeEach(() => {
    mApp = new application();
 })

/****************************
 * Tests
 ****************************/

test('check invalid password', () => {
    expect(newUser.validPassword(badPassword)).toBeFalsy();
});