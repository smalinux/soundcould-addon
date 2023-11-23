#!/bin/python3

# tested from inside (base) anaconda env

# Step 0. check if node is installed or not
# node -v


# Step 1. check if the node server is running
import requests

nodejs_server_url = 'http://localhost:3000'  # Replace with your Node.js server URL

try:
    response = requests.get(nodejs_server_url)
    if response.status_code == 200:
        print("Node.js server is running and accessible.")
    else:
        print(f"Node.js server returned status code: {response.status_code}")
except requests.ConnectionError:
    print("Failed to connect to the Node.js server.")

# Step 2.
#$ npm init -y
#$ npm install --save express
#$ npm install --save-dev nodemon
#$ npm install --save uuid
#$ npm install --save sqlite3
#$ npm install --save body-parser
#$ npm install --save url
#$ touch quote.db







