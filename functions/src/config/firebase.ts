import * as functions from "firebase-functions";
import admin from "firebase-admin";
import {getApps} from "firebase-admin/app";

console.log("Project ID:", functions.config().taskmanager.project_id);
console.log("Client Email:", functions.config().taskmanager.client_email);

if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: functions.config().taskmanager.project_id,
      clientEmail: functions.config().taskmanager.client_email,
      privateKey: functions
        .config()
        .taskmanager.private_key?.replace(/\\n/g, "\n"),
    }),
  });
}

export const db = admin.firestore();
