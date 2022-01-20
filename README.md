# customer-detials-node-js

customer-detials-node-js is a basic user management system made using node.js, express.js, passport and sequelize(mysql).


### Getting Started
To run the application on your local machine you need to have node.js and mongodb installed, up and running. 
Once you have installed node.js and mongodb, you can now download this repository as **```.zip```** and extract it into a folder.
After extracting, open the repository directory in a terminal / cmd and run the following command:
```
npm install
```
This should install all the dependencies needed for the application to run.

### Setting up Environment Variables
Application requires only one environment variable to make it run. To setup environment variables create a **```.env```** file in the repository folder's root directory. Now, open the ```.env``` file in a text editor and enter the following:
```
JWT_SECRET=<Your secret key>
JWT_LIFETIME = 10d
DB_USER_NAME = <username of your db>
DB_PASSWORD = <password of your db>
DB_PORT = <port number of your db>
DB_HOST = <host name of your db>
```
replace ```<Your secret key>``` with a random string that must be kept secret. You can now save this file and exit the text editor.
This should satisfy all the needs of the application.

### Starting the Server
Once all the dependencies are finished installing run the following command in the terminal to start the application:
```
npm start
```
Application should now be up and running at port ```5000```.
To access the application simply open your preffered browser and type the following in the url bar:
```
http://localhost:5000
```
To stop the server press ```Ctrl + C``` on the server terminal.

## API Collection
The application uses multiple Restful APIs to perform various actions. APIs working in this application are listed as follows:

|API                               | Request      | Operation
| -------------------------------- | ------------ | ------------------------------------
|```/```                           | ```GET```    | Redirect to ```/auth``` 
|```/register```                   | ```POST```   | Register a new user 
|```/login```                      | ```POST```   | Authenticate the user and redirect to ```/```
|```/logout```                     | ```GET```    | Logout user
|```/detials/:id```                | ```GET```    | Return detial of a user
|```/update/:id```                 | ```PUT```    | Update a user with new data
|```/image/:id```                  | ```GET```    | Return image of a user
|```/insert```                     | ```POST```   | Insert a new user to the database
|```/delete/:id```                 | ```DELETE``` | Delete a user
|```/customers```                  | ```GET```    | Return all the customers in the database
