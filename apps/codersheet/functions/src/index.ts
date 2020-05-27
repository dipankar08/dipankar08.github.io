import * as functions from 'firebase-functions';
import * as express from 'express';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
const app = express();
app.get('/timestamp', (request, response) => {
    response.send("Hello from Express on Firebase!")
  })
exports.app = functions.https.onRequest(app);
