const { onValueWritten } = require("firebase-functions/v2/database");
const admin = require('firebase-admin');

const firestore = admin.firestore();

/**
 * A Cloud Function that triggers on writes to a specific Realtime Database path
 * and syncs the data to a Firestore collection. This is useful for migrating
 * data from RTDB to Firestore.
 *
 * This function implements a dual-write pattern. When data is written to RTDB,
 * this function will write the same data to Firestore.
 *
 * @see https://firebase.google.com/docs/database/extend-with-functions
 */
exports.dualWrite = onValueWritten("/your-rtdb-path/{id}", (event) => {
  const data = event.data.after.val();
  const id = event.params.id;

  if (!event.data.after.exists()) {
    // Data was deleted from RTDB, so delete it from Firestore as well.
    console.log(`Data with id: ${id} deleted from RTDB. Deleting from Firestore.`);
    return firestore.collection("your-firestore-collection").doc(id).delete();
  }

  // Data was created or updated in RTDB, so create or update it in Firestore.
  console.log(`Data with id: ${id} created or updated in RTDB. Writing to Firestore.`);
  return firestore.collection("your-firestore-collection").doc(id).set(data);
});
