---
description: How to deploy Firebase Security Rules
---

# Deploy Firebase Rules

This workflow deploys the local security rules for Firestore and Storage to your Firebase project.

## Prerequisites
- Firebase CLI installed (`npm install -g firebase-tools`)
- Logged in to Firebase (`firebase login`)
- Project initialized (or `firebase.json` present)

## Steps

1.  **Deploy Rules**
    Run the following command to deploy only the rules:
    ```bash
    firebase deploy --only firestore:rules,storage
    ```

2.  **Verify Deployment**
    Check the [Firebase Console](https://console.firebase.google.com/) under Firestore > Rules and Storage > Rules to confirm the changes are active.
