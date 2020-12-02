import { firestore, auth, storage } from "./firebase";
import { UserSchema } from "./schema";

const userRef = (uid: UserSchema["uid"]) =>
    firestore().collection("users").doc(uid);

export async function fetchUserDocument(uid: UserSchema["uid"]) {
    try {
        const userDoc = await userRef(uid).get();
        return { ...userDoc.data() };
    } catch (error) {
        console.error(error.message);
    }
}

export async function fetchUserDocFromUsername(username: UserSchema["uid"]) {
    try {
        const userRef = firestore()
            .collection("users")
            .where("username", "==", username)
            .limit(1);
        const userCollection = await userRef.get();
        const userDoc = userCollection.docs[0].data();
        return { ...userDoc };
    } catch (error) {
        console.error(error.message);
    }
}

export async function updateDarkModeSetting(darkMode: UserSchema["uid"]) {
    const userRef = firestore().collection("users").doc(auth.currentUser?.uid);
    try {
        await userRef.update({
            darkMode,
        });
    } catch (error) {
        console.error(error.message);
    }
}

export async function updateUserProfile(
    uid: UserSchema["uid"],
    photoURL: UserSchema['photoURL'],
    blurb: UserSchema["blurb"],
    githubURL: UserSchema["githubURL"],
    linkedInURL: UserSchema["linkedInURL"],
    personalURL: UserSchema["personalURL"],
    location: UserSchema["location"],
    username: UserSchema["username"]
) {
    const userRef = firestore().collection("users").doc(uid);
    await userRef.update({
        blurb,
        photoURL,
        githubURL,
        linkedInURL,
        personalURL,
        location,
        username,
    });
}

export async function updateUserAccount(
    uid: UserSchema['uid'],
    email: UserSchema['email'],
) {
    const userRef = firestore().collection("users").doc(uid);
    await userRef.update({
        email
    });
    await auth.currentUser?.updateEmail(email);
}

export async function uploadPhoto(file: File, uid: UserSchema['uid']) {
    try {
        return await storage.ref()
            .child(`photoURLs/${uid}`)
            .put(file)
            .then((snapshot) => snapshot.ref.getDownloadURL())
    } catch (error) {
        console.error(error.message);
    }
}