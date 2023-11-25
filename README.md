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
#$ npm install --save redis
#$ npm install --save mongodb
#$ npm install --save cors
#$ touch quote.db


#$ sudo apt install redis




# https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/
#
# https://www.mongodb.com/try/download/shell

# mongodump --port 27017 --db myMongoDB --out . && bsondump --outFile=collection.json myMongoDB/redisData.bson && cat collection.json

___________

###### Run MongoDB on startup:
```bash
sudo systemctl enable mongod
sudo systemctl start mongod
```

###### Add these to crontab
$ "`sudo crontab -e`"
```bash
#################################
# SoundCloud tracker
#################################

# node redis_server.js
@reboot /usr/local/bin/node /home/smalinux/repos/soundcould-addon/redis_server.js &

# npm start
@reboot cd /home/smalinux/repos/soundcould-addon/ && /usr/local/bin/npm start

# Take Snapshot
@reboot /usr/bin/mongodump --port 27017 --db myMongoDB --out /home/smalinux/repos/sc-backup
```
then: "`sudo systemctl enable cron.service`"
