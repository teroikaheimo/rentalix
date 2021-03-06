# RENTALIX
Second year school project. Objective was to make a full stack application for fictional equipment rental company. I chose NodeJS, ExpressJS and MySQL DB as my backend and React handles the frontend. Bootstrap deals with the responsive layout. This is my first time using NodeJS and React in an application so it won't be pretty and concise but a great learning experience!


## Grading
In order of importance
1. Functioning code that fulfills the minimum spec.
2. Interface responsiveness.
3. Ease of use. If REALLY bad, it influences the grade.

Interface appearance was not included in grading!


## Installation
1. Navigate to a folder where you want to clone the repo and run -> ```git clone https://github.com/teroikaheimo/rentalix.git```
2. Navigate to react-backend folder in console and run -> ```npm install```
3. Use scripts from Database folder to create MySQL schema and import the dummy data if needed.
4. Create the user account for the database and assign needed permission(All Object Rights)
5. In react-backend folder use the connection.template.js to create connection.js file with user account login data for the DB.
6. Now that the MySQL DB is running. Start the expressJS server by -> ```npm start```
7. Go to your browser and navigate to localhost:3210
#### Done.

[Demo Video on Youtube](https://youtu.be/dvGa-8Un6Gk)


## Afterthought
If i had the time as other studies require attention... 
1. I would clean-up the code and re-structure it. 
2. Cleanup the dependencies. 
3. Correct any spelling errors.
4. Fix bugs if and when they would surface during previous operations.

Looking back the code always looks like it could use some improvement and unifying as you learn new stuff.

### Main things learned in this project were
- How React is really powerful frontend technology that allows code re-use to great extent and this is what i want to improve on. Looking back, i feel i didn't use its power enough and understood the core concepts too late in the project. Anyway, this was really enlightening experience with React.
- In React the structure is REALLY important, and it would help to make some preliminary planning for this. I did some planning of course, but not knowing React i couldn't take that to account.
- Now i know A LOT more about asycn code and how to make it work. It feels pretty natural now compared to the time i started this project.
- React-router V4 was really a pain in the ass to a novice like me. Passing down properties on routes was really badly documented(NOT IN THE BASIC CASE) and required a lot of trial and error until i found the solution. This also was party my fault because Javascript is a bit of an unfamiliar language to me.
- ExpressJS is really a blast to work with. Really easy to use and well documented!
- MySQL views and queries in general are now more familiar than before. It was nice to notice that this was really one of the easy parts of this project.

