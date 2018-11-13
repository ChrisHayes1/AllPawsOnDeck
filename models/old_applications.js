/****************************
 * Overview: Application containes the users application and associated functionality.  
 * Author:   Todd Hayes-Birchler
 * Date:     11/11/2018
 ****************************/

/****************************
 * Imports
 ****************************/
var mongoose = require('mongoose');

/****************************
 * define the schema for our application model
 ****************************/
var appSchema = mongoose.Schema({

    Profile            : {
        firstName       : String,
        lastName        : String,
        nickName        : String,
        street1         : String,
        street2         : String,
        street3         : String,
        city            : String,
        state           : String,
        zip             : String
    },
    Contact           : {
        homePhone    : String,
        okToCallHP   : Boolean,
        workPhone    : String,
        okToCallWP   : Boolean,
        cellPhone    : String,
        emailAddress  : String,
        emailContactPref  : {
            OkForENews           : Boolean,
            OkForRecruitment     : Boolean,
            OkForSchedReminder   : Boolean
        }       
    },
    EmergContact    : {
        emcFirstName    : String,
        emcLastName     : String,
        emcTitle        : String,
        emcHomePhone    : String,
        emcWorkPhone    : String,
        emcCellPhone    : String,
        emcRelationship : String
    },
    Demographics    : {
        dateOfBirth_month   : Number,
        dateOfBirth_year    : Number,
        dateOfBirth_day     : Number,
        ageAtApp            : Number,
        gender              : String,
        education           : String
    },
    Work            : {
        employerName        : String,
        empFirstName        : String,
        empLastName         : String,
        empWorkPhone        : String,
        empEmailAddy        : String,
        empRelationship     : String,
        empNotes            : String
    },
    Details         : {
        specialSkills       : String,
        medical             : String,
        criminal            : String
    },
    Availability    : {
        avBlock : {
            sun_start   : Number,
            sun_end     : Number,
            mon_start   : Number,
            mon_end     : Number,
            tue_start   : Number,
            tue_end     : Number,
            wed_start   : Number,
            wed_end     : Number,
            thu_start   : Number,
            thu_end     : Number,
            fri_start   : Number,
            fri_end     : Number,
            sat_start   : Number,
            sat_end     : Number,
        },
        assignmentPref  : {
            pref_AdminAssistant     : Boolean,
            pref_AdoptionEvents     : Boolean,
            pref_AdoptionPromoter   : Boolean,
            pref_Baking             : Boolean,
            pref_BathBrush          : Boolean,
            pref_BoardMeetings      : Boolean,
            pref_k9comp1            : Boolean,
            pref_k9comp2            : Boolean,
            pref_CustomerService    : Boolean,
            pref_Events             : Boolean,
            pref_FelineFriend       : Boolean,
            pref_Foster             : Boolean,
            pref_Fundraising        : Boolean,
            pref_GrantWriter        : Boolean,
            pref_GraphicDesign      : Boolean,
            pref_Groomer            : Boolean,
            pref_landMaintenance    : Boolean,
            pref_MedicalAssistant   : Boolean,
            pref_AmCleanerCats      : Boolean,
            pref_AmCleanerDogs      : Boolean,
            pref_Petco              : Boolean,
            pref_Phtographer        : Boolean,
            pref_ShelterCLeaner     : Boolean,
            pref_Tabling            : Boolean,
            pref_Trainer            : Boolean,
            pref_Transporter        : Boolean,
            prefNotes               : String
        },
    },
    Commitement     : {
        hoursPer    : Number,
        hourUnit    : String,
        notes       : String
    },
    Reference       : {
        refEmpName     : String,
        refFirstName    : String,
        refLastName     : String,
        refTitle        : String,
        refHomePhone    : String,
        refOkToCallHP   : Boolean,
        refWorkPhone    : String,
        refOkToCallWP   : Boolean,
        refEmail        : String,
        refRelationship : String,
        refNotes        : String
    },
    appStatus           : String
});

/****************************
 * Public Functions
 ****************************/

 module.exports = {

    saveApplication: function(req) {

    },

    submitApplication: function() {

    },

    getApplication: function() {

    }

 };

/****************************
 * Private Helper Functions
 ****************************/

 /****
  * Verify if an application already exists
  */
 function appExists() {

 }