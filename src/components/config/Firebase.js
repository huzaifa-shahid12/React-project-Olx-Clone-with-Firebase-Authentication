import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBefXhgNIyD78JUo_yK9yBeVVJ6iJ8tSaE",
  authDomain: "olx-project-b57f5.firebaseapp.com",
  projectId: "olx-project-b57f5",
  storageBucket: "olx-project-b57f5.appspot.com",
  messagingSenderId: "186300486008",
  appId: "1:186300486008:web:baf4f4f33f201da283b88d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// yaha se signup work start //
export async function register(userInfo) {
  try {
    const { email, password, age, fullname } = userInfo;
    await createUserWithEmailAndPassword(auth, email, password);
    await addDoc(collection(db, "users"), {
      fullname,
      age,
      email,
    });

    alert("REGISTERED SUCCESSFULLY!");
  } catch (error) {
    alert(error);
  }
}
// yaha par signup work End //

// login work start //
export async function login(userInfo) {
  try {
    const { email, password } = userInfo;
    await signInWithEmailAndPassword(auth, email, password);

    alert("LOGGED IN SUCCESSFULLY!");
  } catch (error) {
    alert(error);
  }
}
// login work End //

// Sell work Start //
export async function postAdToDb(ad) {
  try {
    const { brand, title, description, price, image } = ad;

    const imageArray = Array.from(image[0]);
    const arr = [];

    for (let i = 0; i < imageArray.length; i++) {
      const file = imageArray[i];
      // 1. Storage ma image ko save karwana ha //
      const storageRef = ref(storage, `ads/${file.name}`);

      // 2. Storage se url lana ha //
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      arr.push(url);
    }

    console.log("arr uploaded", arr);

    // 3. Url ko db ma set karwana ha //
    await addDoc(collection(db, "ads"), {
      brand,
      title,
      description,
      price,
      imageUrl: arr,
    });

    alert("Add posted SUCCESSFULLY!");
  } catch (error) {
    alert(error);
  }
}
// sell work End //
export async function getAds() {
  const querySnapshot = await getDocs(collection(db, "ads"));
  const ads = [];
  querySnapshot.forEach((doc) => {
    const ad = doc.data();
    ad.id = doc.id;
    ads.push(ad);
    console.log(doc.id, " => ", doc.data());
  });
  return ads;
}

//  sab se pahla kam ha Input ki fields ka andar user ka data la kar ana ha //

export const profileData = async () => {
  const postAds = [];
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    const dat = doc.data();
    dat.id = doc.id;
    postAds.push(dat);
  });
  return postAds;
};

// profile ubdation //

export async function ubdateData(e, img) {
  const userd = e[0];
  console.log(img);
  try {
    // const { brand, title, description, price, image } = ad;
    // 1. Storage ma image ko save karwana ha //
    const storageRef = ref(storage, `profile image/${img.name}`);
    // 2. Storage se url lana ha //
    await uploadBytes(storageRef, img);
    const url = await getDownloadURL(storageRef);
    // 3. Url ko db ma set karwana ha //
    console.log(url);
    await addDoc(collection(db, "users"), {
      fullname: userd.fullname,
      age: userd.age,
      email: userd.email,
      imageUrl: url,
    });

    const ver = await deleteDoc(doc(db, "users", userd.id));

    //  alert("Add posted SUCCESSFULLY!");
  } catch (error) {
    alert(error);
  }
}
