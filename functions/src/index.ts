import * as functions from 'firebase-functions';
import wiki from 'wikijs';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest(async (request, response) => {
  const page = await wiki().page('Batman');
  const fullHtml = await page.html();
  response.send(fullHtml);
});
