# Tech-Blog
  
## Description
Tech blog that uses MVC, and  allows users to post messages and interact with each other.

## Technologies Used 
* JavaScript
* MYSQL
* Handlebars
* NodeJS
* Sequelize
* Dotenv
* Bcrypt
* Express

## Installation
Note: users are expected to know some JavaScript

* Install NodeJS
* Pull the Repository
* On your project directory, you will initialize npm by typing ```npm init```
* After that command runs a series of processes, you're ready to use npm.
* Type ```npm i``` on the root of the repo you've just pulled. This will fetch all of the project dependencies making it possible for Node to use the functionality provided by the project. 
* At this point, the project is ready but before that, make sure you've set up:
    * 1. A ```.env``` file at the root of the project directory with the following properties:
            * DB_NAME='tech_blog_db'
            * DB_USER='root'
            * DB_PW='Your DB password'
    * 2. MYSQL locally, it's important as it's the basis for this project.
* After you've successfully met the conditions outlined above, follow these steps:
    * run ```Mysql -u root -p```
        * if you get an error, make sure your MYSQL is working fine (I typically like using the GUI). If all checks out here
          run ```export PATH=${PATH}:/usr/local/mysql-8.0.25-macos11-x86_64/bin/``` then run the command on the bullet right above this one.
        * Once prompted, enter the password you created when you setup MYSQL. 
    * Once you're in and see ```mysql>``` on your command line, populate your application by:
        * run ```source db/schema.sql```
        * terminate the session by typing ```quit;``` and run ```Npm run start``` to ensure you got a connection. If successful, terminate that session (mac: CMD + K/windows: CTRL + K...I think).
        * run ```npm run seed``` then run ```npm run start``` again and go to your local test environment (this app is set up to go to http://localhost:3001/).
        * if you'd like to deploy to heroku, follow these [Instructions](https://devcenter.heroku.com/articles/git)
        * NOTE: you'll need to add JAWS DB to your heroku app if you want this app published on heroku without fail.


## **_Heroku Deployment_**  


