User Email Verification:
Since we do not have production access in amazon ses so before we can send verification email the sender's email 
and receiver's email must be verified with amazon ses. So if you need to test this implementation you need to make
some changes to user.controller.js line 50 and line 51.

install node and mongodb

you can check to see if you have node with this command “node -v”

if you don’t have node head over to http://nodejs.org/download/

once you have node, install mongodb

follow the instructions here to install mongodb http://docs.mongodb.org/manual/installation/

once you have mongodb running follow the instructions below:

fork out the bitbucket gaheen repo

clone that repo in your local machine

cd into the directory where your repo is

globally install angular-generator-fullstack, grunt, and bower

run "npm install"

run “bower install”

run “grunt serve”

if everything went fine, your app will be running at http://localhost:9000/