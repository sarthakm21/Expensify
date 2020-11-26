import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD9bZgPXjIsrQVPo-uzh5J0g074cR3shkc",
  authDomain: "expensify-ed072.firebaseapp.com",
  databaseURL: "https://expensify-ed072.firebaseio.com",
  projectId: "expensify-ed072",
  storageBucket: "expensify-ed072.appspot.com",
  messagingSenderId: "1003597073852",
  appId: "1:1003597073852:web:f4579d1f62483e956e6fb9",
  measurementId: "G-QV90DQ7989",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.database();

db.ref("expenses").on("value", (snapshot) => {
  const expenses = [];
  snapshot.forEach((child) => {
    expenses.push({
      id: child.key,
      ...child.val(),
    });
  });
  console.log(expenses);
});

db.ref("expenses").on("child_removed", (snapshot) => {
  console.log("Good riddance", snapshot.key, snapshot.val());
});

db.ref("expenses").on("child_changed", (snapshot) => {
  console.log(
    "For better or for worse? Anyways..",
    snapshot.key,
    snapshot.val()
  );
});
