PROJECT :

Title : Weather Data Management System

Description:
A web application that allows users to manage weather data for different cities. Users can upload weather information, update existing data, and retrieve or delete weather data.

Key Features:
Accepts weather data in JSON format, either through file uploads or raw JSON input.
Stores and manages weather data in a MySQL database.
Supports creating, updating, retrieving, and deleting weather data.
Retrieves weather data for a specific city or for cities with the same temperature.

Technologies Used:
Python
Flask web framework
MySQL Connector/Python library
Visual Studio Code (VSCode)
Postman (for testing the application's APIs)

This project demonstrates my skills in web development, data management, and working with various tools and technologies, including Python, Flask, MySQL, and Postman. It showcases my ability to build functional applications that handle and manipulate data effectively.

# --------------------------------------------------------------------------------------------------------------------

Step - 1 : Install python in your local system or in linux.

1. Url : https://www.python.org/downloads/release/python-3119/ (Go to this website and dowload windows 64bit python version.)
2. Install the python and give set of permissions to it.
3. Check version of python : python --version
4. Check pip version : python -m pip --version
5. Install mysql in you local system. create account. set passowrd for root user and remember for further use in db connection.
6. Need to install VSCode for build code and making changes in code.
7. Need to install postman for checking api's.

# ------------------------------------------------------------------------------------------------------------------------

Step - 2 : Go to the documents folder. create one sepearate folder in it. eg: python_project. copy the all shared files in this current folder.

# ------------------------------------------------------------------------------------------------------------------------

Step - 3 :

- Create a environment -> python -m venv myenv
- Activate the environment -> myenv\Scripts\activate

- Install packages

  cmd :

  - pip install flask
  - pip install mysql-connector-python
    or
  - run in cmd : pip install -r requirements.txt

- Open VS Code from cmd -> type in cmd like : code .

- Open mysql and create a database with name : climate_database

- Enter and run these queries in sql file/ notebook.

1. Create database climate_database;

2. Use climate_database;

# --------------------------------------------------------------------------------------------------------------------------------

Step 4 : Now make changes in app.py file.

- Enter your database name. enter your password in db_connection function.

- After making changes. run python code. : python app.py

- Check apis using postman. you can refer postman_urls.txt for more information about urls and paramerts.
