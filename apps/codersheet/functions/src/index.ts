import * as functions from 'firebase-functions';
import * as express from 'express';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
const app = express();
app.get("/ts",(req, resp)=>{
    resp.send(`${Date.now()}`)
})
export const main = functions.https.onRequest(app)
