import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAyy6Vn_ZXlnj5vTR4AGRMwwu2JweLkkH8",
    authDomain: "english-for-work-9aee9.firebaseapp.com",
    projectId: "english-for-work-9aee9",
    storageBucket: "english-for-work-9aee9.appspot.com",
    messagingSenderId: "348429679064",
    appId: "1:348429679064:web:16ac6fa00e091190fb9aad",
    measurementId: "G-WKRFT0M7TG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getDatabase(app);

const userRef = ref(db, 'users/juan');

get(userRef).then((snapshot) => {
    if (snapshot.exists()) {
        const userData = snapshot.val();
        console.log(userData);
    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error("Error fetching data:", error);
});


//         set(ref(db, 'users/juan'), {
//     username: 'juan',
//     team: '1',
// });
buttonUser.addEventListener('click', function() {
    set(ref(db, 'users/' + dataUser.name), {
        username: dataUser.name,
        team: dataUser.team,
        img: dataUser.img,
        score: dataUser.score
    });
    localStorage.setItem('user', JSON.stringify({name: dataUser.name, score: dataUser.score, img: dataUser.img}))
    addInfoUser(dataUser);
    modal.classList.add('hidden')

  })