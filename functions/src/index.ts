import * as functions from 'firebase-functions';
import wiki from 'wikijs';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const getWikiPage = functions.https.onCall(async (data, context) => {
  const pageName = data.page;
  const page = await wiki().page(pageName);
  const fullHtml = await page.html();
  return fullHtml;
});
