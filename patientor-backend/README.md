## Available Scripts

In the project directory, you can run:

### `npm install`

Install the project dependencies.

### `npm start`

Starts the Node.js server using the compiled version located at 'build/index.js'.

### `npm run dev`

Starts the server in development mode using ts-node-dev.\
This tool will automatically restart the server whenever TypeScript file changes are detected, making it easier to develop and test changes.

### `npm test`

Displays the message "Error: no test specified".\
Currently, there aren't any tests configured, so this script will simply echo an error message.

### `npm run tsc`

Compiles the TypeScript files into JavaScript using the TypeScript compiler.

### `npm run lint`

Identifies and reports on potential issues in TypeScript code, ensuring adherence to certain coding standards and style guidelines, thereby helping to maintain code quality.

## Services and Tools Needed

Node.js and npm: Since this is a Node.js application, you'll need Node.js and npm (Node Package Manager) installed on your machine to run this project.

MongoDB Account or Instance: The models use MongoDB via Mongoose for data persistence. You need access to a MongoDB database, either via a cloud service like MongoDB Atlas (which would require an account) or a local MongoDB instance.

Environment Variables: The application requires certain environment variables, which are specified in a .env file. Please refer to the .env.example file in the project's root directory for a template on the required variables. Create your own .env file in the same directory, and define the variables.
