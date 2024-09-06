# Payments Service

A simple stateless service to handle payment processing using the Stitch API.

## Prerequisites

- Node.js (version 18 or later)
- npm or yarn
- Docker and Docker Compose (for containerized deployment)

## Local Development

1. Clone the repository:
   ```
   git clone https://github.com/brianchiruka/payment-service
   cd payments-service-stitch
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```
   NODE_ENV=test
   PORT=4000
   STITCH_API_URL=your_stitch_api_url
   STITCH_CLIENT_ID=your_stitch_client_id
   STITCH_CLIENT_SECRET=your_stitch_client_secret
   ```

   You can also paste the client.json in the project root for the Stitch credentials to be loaded from there instead.

   Any environment other than `test` will require KEYCLOAK and GOOGLE KMS credentials for JWT authentication and dycrypting secret.

4. Run the development server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

   This will start the server using nodemon, which will automatically restart the server when file changes are detected.

## Building for Production

To build the project for production:

```
npm run build
```
or
```
yarn build
```

This will compile TypeScript files into JavaScript in the `dist` directory.

## Running Tests

Removed test suite for this quick proof of concept. Will add later if the project starts to get complex.

### Test Environment

To enable the test environment, set the `NODE_ENV` to `test`. In this mode:
- Environment validation is skipped
- Encrypted values are not used
- JWT token verification is bypassed, allowing unauthenticated calls

## Linting and Formatting

To lint the codebase:
```
npm run lint
```
or
```
yarn lint
```

To format the codebase:
```
npm run format
```
or
```
yarn format
```

## Docker Deployment

1. Build the Docker image:
   ```
   docker build -t payments-service .
   ```

2. Run the container:
   ```
   docker run -p 4000:4000 -e PORT=4000 -e STITCH_API_URL=stitch_api_url -e STITCH_CLIENT_ID=your_id -e STITCH_CLIENT_SECRET=your_secret payments-service
   ```

## Docker Compose

To run the service along with the Stitch API using Docker Compose:

1. Ensure your environment variables are set in a `.env` file or in your environment.

2. Run:
   ```
   docker-compose up
   ```

This will start both the payments service and the Stitch API container.

## Contributing

I welcome contributions to this project! Here are some guidelines to help you get started:

Fork the Repository: Start by forking the repository and then clone your fork locally.
Create a Branch: Create a new branch for each feature or bugfix you're working on.
Code Style: Follow the existing code style. I use ESLint and Prettier to maintain consistency.
Commit Messages: Write clear, concise commit messages. Start with a verb in the present tense, e.g., "Add feature" or "Fix bug".
Testing: Add or update tests for any new or modified functionality.
Documentation: Update the README.md or other documentation if your changes require it.
Pull Requests: Submit a pull request with a clear description of your changes and why they're necessary.
Code Review: Be open to feedback and be responsive during the code review process.
Keep it Simple: Try to submit smaller, focused pull requests rather than large, sweeping changes.
Be Respectful: Remember that this is an open-source project. Be respectful and constructive in your communication with other contributors.

Before contributing, please read through the existing issues and pull requests to ensure you're not duplicating effort.
