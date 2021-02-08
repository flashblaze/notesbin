# client

Client is built using:

- [react](https://reactjs.org/)
- [nextjs](https://nextjs.org/)
- [chakra](https://chakra-ui.com/)

## Installation

1. Creacte `.env.local`, copy the contents from `.env.example` to it and replace the contents accordingly.

If you're running the app locally, you'll need to change the urls in [constants.js](https://github.com/FlashBlaze/notesbin/blob/main/client/src/helpers/constants.js)

- `NODE_URL`: Replace `http://localhost:5001` by url on which server is running

- `APP_UR`: Replace `http://localhost:3001` by url on which client is running

2. Since next.js overrides all the environment variables by `.env.local` as menitioned [here](https://nextjs.org/docs/basic-features/environment-variables#default-environment-variables). You'll need to modify variables accordingly when running the app locally and when running on the server.

3. Install the dependencies by running `yarn`

## Running locally

Run `npm run dev` to start the app on port `3001`

## Running on server

Run `npm start` to start the app on port `3000`
