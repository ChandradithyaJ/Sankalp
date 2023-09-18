# Makefile to run React and Node together in separate folders

# React commands
react-build:
	cd client && npm run build

react-start:
	cd client && npm run start

# Node commands
node-start:
	cd ../server && node server.js

# Combine React and Node
react-node: react-start & node-start

# Default target
default: react-node