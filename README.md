# AllPawsOnDeck


-------------------------------
Getting everything running
-------------------------------

This application is used to manage volunteers for the Humane Society of Southern Wisconsin.  It utilizes Node.JS along with the NPM package manager.  Data is collected using MongoDB.  Setup instructions are as follows

1) Clone repository as local repo
2) Install Node.JS and NPM (packaged with Node) Downloads can be found here
    https://nodejs.org/en/download/
3) Install MongoDB
    a) Install instructions can be found for a variety of OS here https://docs.mongodb.com/manual/installation/ 
    b) After you install Mongo, continue to follow the directions for your associated OS.  You must also start Mongo as a service and ensure it is running
4) Create a new Mongo database
    a) Enter mongo shell. (Directions can be found in the manual listed above)
     enter the following command
        >>use apodDB
5)  within the repo in terminal run the following to install dependencies. 
        >>npm install
6) You may need to select an open port that works for your connection.  The change can be found in       
    server.js file on the line 'var port     = XXXX'

    Currently the default port is 3001

7) Run the project from terminal with node server.js

8) Visit localhost:xxxx on your web browser to bring page up (where xxxx is the selected port reference above)


-------------------------------
Initial run through
-------------------------------

Your local version of the application will be running on a blank databasse. After getting the program running there are a few steps you will want to follow to be able to get the most out of your experience

1) Create a new user
    a) From the index page (localhost:XXXX) select 'Sign Up'
    b) Enter first and last name, email addy and password. Email is the primary key, so can not be repeated
    c) Select Sign Up

2) Change yourself to be an administrator - You can go back and forth between being a user and administrator using the following process
    a) On the profile page (or coordinator dashboard if going back to standard user) select 'Edit Profile' within the Profile box
    b) From either view if you want to be a coordinator check the 'Is Coordinator?' box, alternativly if you want to be a standard user leave the box unchecked
        <b>Note:  This is a temporary feature and is a little bugy.  it does not pull in your actual value.  This means if you are a coordinator and hit edit, you NEED to check the box before you hit save to stay a coordinator</b>
    c) Select save

3) Add Trainings - All volunteer positions should have required trainings that need to be completed in order to qualify for the position.  So the first step is to add the trainings
    a) As coordinator, go to the trainings tab
    b) Add training name and description
    c) Click Add

4) Add volunteer positions
    a) As coordinator, go to Position Details
    b) Add position Name and role Description.  Select the trainings associated with the position (these trainings must be completed prior to a user qualifying for a position)
    c) Select Add

5) Add additional users - This application is designed to allow a coordinator to manage volunteers.  In order for all features to be available you need at least on coordinator, and one standard user.  To add additional users log out of the coordinator user and repeate the signup process for one or more volunteer positions




-------------------------------
Additional Notes:
-------------------------------

* If you pull new versions of the repo from github you may need to run 'npm install' in terminal within the project folder. This will ensure you have all required dependancies