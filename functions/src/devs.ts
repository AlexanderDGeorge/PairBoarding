import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

const db = admin.firestore();

export const addTokenToDev = functions.https.onCall((data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError(
            'unauthenticated',
            'must be authenticated',
        );
    }
    if (!data.token) {
        throw new functions.https.HttpsError(
            'invalid-argument',
            'token required',
        );
    }

    db.collection('devs').doc(context.auth.uid).update({
        token: data.token,
    });
});

export const createDevProfile = functions.firestore
    .document('devs/{devId}')
    .onCreate(async (snapshot) => {
        const data = snapshot.data();
        await db
            .collection('devs')
            .doc(snapshot.id)
            .collection('profile')
            .doc(snapshot.id)
            .set({
                ...data.profile,
            });
    });

export const updateDevProfile = functions.firestore
    .document('devs/{devId}')
    .onUpdate(async (snapshot) => {
        const data = snapshot.after.data();
        if (!data) return;
        db.collection('devs')
            .doc(snapshot.after.id)
            .collection('profile')
            .doc(snapshot.after.id)
            .set({
                ...data.profile,
            });
        // need to update all documents that contain dev profile
        // posts.created_by
        const postsQuery = await db
            .collection('posts')
            .where('created_by.uid', '==', snapshot.after.id)
            .get();
        postsQuery.forEach((doc) => {
            doc.ref.update({
                created_by: data.profile,
            });
        });
    });
