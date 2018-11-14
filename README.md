# AllPawsOnDeck

This application is used to manage volunteers for the Humane Society of Southern Wisconsin.  It utilizes Node.JS along with the NPM package manager.  Data is collected using MongoDB.  Setup instructions are as follows

1) Clone repository as local repo
2) Install Node.JS and NPM (packaged with Node)
3) Install MongoDB
    a) Install instructions can be found for a variety of OS here https://docs.mongodb.com/manual/installation/ 
    b) After you install Mongo, continue to follow the directions for your associated OS.  You must also start Mongo as a service and ensure it is running
4) Create a new Mongo database
    a) Enter mongo shell. enter the following command
        >>use apodDB
5)  within the repo in terminal run the following to install dependencies. 
        >>npm install
6) You may need to select an open port that works for your connection.  The change can be found in       server.js file on the lin 'app.listen(xxxx);'

7) Run the project from terminal with node server.js

8) Visit localhost:xxxx on your web browser to bring page up (where xxxx is the selected port reference above)