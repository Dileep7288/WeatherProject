# ---------------------------------- PACKAGES IMPORTS --------------------------------------------------------
from flask import Flask, request, jsonify
import mysql.connector
from mysql.connector import Error
import json
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

# ---------------------------------- WRITTENED FUNCTIONS ------------------------------------------------------

def get_db_connection(mysql_password,database_name):
    try:
        
        database_connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password=str(mysql_password),
            database=str(database_name)
        )
        if database_connection.is_connected():
            return database_connection
        else:
            return None
          
    except Error as e:
        print("Error while connecting to MySQL", e)
        return None

# ----------------------------------- FLASK APPLICATION STARTS -----------------------------------------------------------

app = Flask(__name__)
CORS(app)
    

@app.route('/signup', methods=['POST'])
def signup():
    """
    Handles the signup process.
    """
    try:
        # Connect to database
        db = get_db_connection(7288, 'climate_database')
        if db is None:
            return {'error': 'Failed to connect to the database'}
        
        # Get a cursor
        cursor = db.cursor()
        
        # Create client table if not existing in database
        cursor.execute("SHOW TABLES LIKE 'client'")
        if cursor.fetchone() is None:
            cursor.execute("""
                CREATE TABLE client (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(255) UNIQUE,
                    email VARCHAR(255) UNIQUE,
                    password VARCHAR(255)
                )
            """)
            print("Client table created successfully")
        else:
            print("Client table already exists")
            
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if not username or not email or not password:
            return {'error': 'Missing required fields'}
        
        hashed_password = generate_password_hash(password)
        
        cursor.execute("SELECT * FROM client WHERE email = %s", (email,))
        if cursor.fetchone():
            return {'error': 'User with this email already exists'}
        
        cursor.execute("INSERT INTO client (username, email, password) VALUES (%s, %s, %s)", 
                       (username, email, hashed_password))
        db.commit()

        cursor.close()
        db.close()

        return {'message': 'User registered successfully'}
    except Exception as e:
        print(f"Error during signup: {e}")
        return {'error': 'Signup failed'}


@app.route('/login', methods=['POST'])
def login():
    """
    Handles the login process using email and password.
    """
    try:
        # Connect to database
        db=get_db_connection(7288,'climate_database')
        if db is None:
            return{'error':'Failed to connect to the database'}
    
        #Get a cursor
        cursor=db.cursor()
        
        # Get login data from request
        data=request.get_json()
        email=data.get('email')
        password=data.get('password')
        
        if not email or not password:
            return {'error':'Missing required fields'}
        
        # Fetch the user data based on email
        cursor.execute("SELECT * FROM client WHERE email = %s", (email,))
        user= cursor.fetchone()
        
        if user:
            user_id, username, email, stored_password=user
            # Verify the password
            if check_password_hash(stored_password,password):
                #Password is correct
                cursor.close()
                db.close()
                return {'message': 'Login successful'}
            else:
                # User not found
                cursor.close()
                db.close()
                return {'error': 'Invalid email or password'}
    except Exception as e:
            print(f"Error during login: {e}")
            return {'error': 'Login failed'}
        
@app.route('/insert_or_update_weather_data', methods=['POST'])
def insert_or_update_weather_data():
    
    """
    Handles the update or  insert data in the weather_data database.
    """
    
    try:
        if 'file' in request.files:
            # Get the JSON file from the request
            json_file = request.files['file']
            data = json.load(json_file)
        else:
            # Get the raw JSON data from the request
            data = request.get_json()

        # Connect to the database
        db = get_db_connection(7288,'climate_database')
        # check database connection is established
        if db is None:
            db.close()
            return {'error': 'Failed to connect to the database'}
        
        # Get a cursor
        cursor = db.cursor()

        # create weather_data table if not existing in database.
        cursor.execute("SHOW TABLES LIKE 'cities_weather_data'")
        if cursor.fetchone() is None:
            # Create the cities_weather_data table
            cursor.execute("""
                CREATE TABLE cities_weather_data (
                    cityname VARCHAR(255) PRIMARY KEY,
                    temperature FLOAT,
                    humidity FLOAT,
                    air_quality FLOAT
                )
            """)
            print("cities_weather_data table created successfully.")
        else:
            print("cities_weather_data table already exists.")
            
        # Iterate through the JSON data
        for city_name, weather_data in data.items():
            # Check if the city already exists in the database
            cursor.execute("SELECT * FROM cities_weather_data WHERE cityname = %s", (city_name,))
            result = cursor.fetchone()

            if result:
                # Update the existing weather data
                cursor.execute("UPDATE cities_weather_data SET temperature = %s, humidity = %s, air_quality = %s WHERE cityname = %s", (
                    float(weather_data['temp']),
                    float(weather_data['humidity']),
                    float(weather_data['air_quality']),
                    city_name.capitalize()
                ))
            else:
                # Insert the new weather data
                cursor.execute("INSERT INTO cities_weather_data (cityname, temperature, humidity, air_quality) VALUES (%s, %s, %s, %s)", (
                    city_name.capitalize(),
                    float(weather_data['temp']),
                    float(weather_data['humidity']),
                    float(weather_data['air_quality'])
                ))


        db.commit()
        cursor.close()
        db.close()
        
        return {'message': 'Weather data updated/created successfully'}

    except Exception as e:
        print(f"Error updating/creating weather data: {e}")
        return {'error': 'Failed to update/create weather data'}
    
@app.route('/update_city_weather_data/<city_name>', methods=['PUT'])
def update_weather_data(city_name):
    
    """
    Updates the weather data for a specific city.
    """
    
    try:
        # Get the updated weather data from the request
        data = request.get_json()

        # Connect to the database
        db = get_db_connection(7288,'climate_database')
        # check database connection is established
        if db is None:
            db.close()
            return {'error': 'Failed to connect to the database'}

        # Get a cursor
        cursor = db.cursor()

        # Update the weather data for the specified city
        cursor.execute("UPDATE cities_weather_data SET temperature = %s, humidity = %s, air_quality = %s WHERE cityname = %s", (
            float(data['temp']),
            float(data['humidity']),
            float(data['air_quality']),
            city_name.capitalize()
        ))
        db.commit()
        
        cursor.execute("SELECT * FROM cities_weather_data WHERE cityname = %s", (city_name,))
        result = cursor.fetchone()
        
        cursor.close()
        db.close()

        if result:
            # Unpack the result
            city_name, temperature, humidity, air_quality = result

            # Return the updated weather data as a JSON response
            return {
                'cityname': city_name,
                'temperature': str(temperature)+'°C',
                'humidity': str(humidity)+'%',
                'air_quality': str(air_quality)+'μg/m³'
            }
        else:
            return {'error': f'No weather data found for {city_name}'}
    
    except Exception as e:
        print(f"Error updating weather data: {e}")
        return {'error': 'Failed to update weather data'}
    
@app.route('/delete_city_weather_data/<city_name>', methods=['DELETE'])
def delete_city_weather_data(city_name):
    """
    Deletes the weather data for a specific city.
    """
    try:
        # Connect to the database
        db = get_db_connection(7288,'climate_database')
        # check database connection is established
        if db is None:
            db.close()
            return {'error': 'Failed to connect to the database'}
        
        # Get a cursor
        cursor = db.cursor()

        # Delete the weather data for the specified city
        cursor.execute("DELETE FROM cities_weather_data WHERE cityname = %s", (city_name,))
        db.commit()

        # Check if the row was deleted
        if cursor.rowcount > 0:
            cursor.close()
            db.close()
            return {'message': f'Weather data for {city_name} deleted successfully'}
        else:
            cursor.close()
            db.close()
            return {'error': f'No weather data found for {city_name}'}
    except Exception as e:
        print(f"Error deleting weather data: {e}")
        return {'error': 'Failed to delete weather data'}

@app.route('/weather_data/temperature/<temperature>', methods=['GET'])
def get_weather_data_by_temperature(temperature):
    """
    Retrieves the weather data for cities with the specified temperature.
    """
    try:
         # Connect to the database
        db = get_db_connection(7288,'climate_database')
        # check database connection is established
        if db is None:
            db.close()
            return {'error': 'Failed to connect to the database'}

        # Get a cursor
        cursor = db.cursor()

        # Retrieve the weather data for cities with the specified temperature
        cursor.execute("SELECT * FROM cities_weather_data WHERE temperature = %s", (float(temperature),))
        results = cursor.fetchall()

        cursor.close()
        db.close()
        
        if results:
            # Create a dictionary to store the weather data
            weather_data = {}
            for row in results:
                city_name, temp, humidity, air_quality = row
                weather_data[city_name] = {
                    'temperature': temp,
                    'humidity': humidity,
                    'air_quality': air_quality
                }

            return weather_data
        else:
            return {'error': f'No weather data found for temperature {temperature}'}

    except Exception as e:
        print(f"Error retrieving weather data: {e}")
        return {'error': 'Failed to retrieve weather data'}

@app.route('/weather_data/humidity/<humidity>', methods=['GET'])
def get_weather_data_by_humidity(humidity):
    """
    Retrieves the weather data for cities with the specified temperature.
    """
    try:
         # Connect to the database
        db = get_db_connection(7288,'climate_database')
        # check database connection is established
        if db is None:
            db.close()
            return {'error': 'Failed to connect to the database'}

        # Get a cursor
        cursor = db.cursor()

        # Retrieve the weather data for cities with the specified temperature
        cursor.execute("SELECT * FROM cities_weather_data WHERE humidity = %s", (float(humidity),))
        results = cursor.fetchall()

        cursor.close()
        db.close()
        
        if results:
            # Create a dictionary to store the weather data
            weather_data = {}
            for row in results:
                city_name, temp, humidity1, air_quality = row
                weather_data[city_name] = {
                    'temperature': temp,
                    'humidity': humidity1,
                    'air_quality': air_quality
                }

            return weather_data
        else:
            return {'error': f'No weather data found for humidity {humidity}'}

    except Exception as e:
        print(f"Error retrieving weather data: {e}")
        return {'error': 'Failed to retrieve weather data'}
    
@app.route('/weather_data/airquality/<air_quality>', methods=['GET'])
def get_weather_data_by_airquality(air_quality):
    
    """
    Retrieves the weather data for cities with the specified temperature.
    """
    try:
         # Connect to the database
        db = get_db_connection(7288,'climate_database')
        # check database connection is established
        if db is None:
            db.close()
            return {'error': 'Failed to connect to the database'}

        # Get a cursor
        cursor = db.cursor()

        # Retrieve the weather data for cities with the specified temperature
        cursor.execute("SELECT * FROM cities_weather_data WHERE air_quality = %s", (float(air_quality),))
        results = cursor.fetchall()

        cursor.close()
        db.close()
        
        if results:
            # Create a dictionary to store the weather data
            weather_data = {}
            for row in results:
                city_name, temp, humidity, air_quality1 = row
                weather_data[city_name] = {
                    'temperature': temp,
                    'humidity': humidity,
                    'air_quality': air_quality1
                }

            return weather_data
        else:
            return {'error': f'No weather data found for air quality {air_quality}'}

    except Exception as e:
        print(f"Error retrieving weather data: {e}")
        return {'error': 'Failed to retrieve weather data'}
    
@app.route('/weather_data/city/<city_name>', methods=['GET'])
def get_weather_data_by_cityname(city_name):
    
    """
    Get the weather data for a specific city.
    """
    
    try:
        # Connect to the database
        db = get_db_connection(7288,'climate_database')
        # check database connection is established
        if db is None:
            db.close()
            return {'error': 'Failed to connect to the database'}

        # Get a cursor
        cursor = db.cursor()

        # Retrieve the weather data for the specified city
        cursor.execute("SELECT * FROM cities_weather_data WHERE cityname = %s", (city_name.capitalize(),))
        result = cursor.fetchone()
        
        cursor.close()
        db.close()

        if result:
            # Unpack the result
            name_of_the_city, temperature, humidity, air_quality = result

            # Return the weather data as a JSON response
            return {
                'cityname': name_of_the_city,
                'temperature': str(temperature)+'°C',
                'humidity': str(humidity)+'%',
                'air_quality': str(air_quality)+'μg/m³'
            }
        else:
            return {'error': f'No weather data found for {city_name}'}
        
    except Exception as e:
        print(f"Error retrieving weather data: {e}")
        return {'error': 'Failed to retrieve weather data'}

# @app.route('/hello', methods=['GET'])
# def hello_world():
#     return "<html> <body> hi </body> </html>"

# -------------------------------- Main Function Execution --------------------------------   

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000,debug=True)