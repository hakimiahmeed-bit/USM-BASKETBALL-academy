# Basket Academy — React + Firebase

Converted from the original PHP/MySQL site. See the deployment steps
in the chat response for full click-by-click instructions.

Firestore collections:
- users/{uid}: nom, email, categorie, dateNaissance, role, statut, dateDernierPaiement, createdAt
- messages/{id}: nom, email, sujet, message, createdAt

To make the first admin: after creating any account, open Firebase Console
-> Firestore Database -> users -> that document -> change "role" to "admin"
and "statut" to "Approuvé".
