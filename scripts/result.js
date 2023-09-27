import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getDatabase(app);
const tbody = document.getElementById('tbody');
const usersRef = ref(db, 'users');
let userData;
get(usersRef)
    .then((snapshot) => {
        if (snapshot.exists()) {
            userData = snapshot.val();
            const claves = Object.keys(userData);
            
            // Crear un array de usuarios a partir de los datos
            const usuarios = claves.map((item) => userData[item]);
            
            // Ordenar el array de usuarios por score de mayor a menor
            usuarios.sort((a, b) => b.score - a.score);
            
            let codigoTable = '';
            
            // Crear el HTML de la tabla utilizando los datos ordenados
            usuarios.forEach((data) => {
                codigoTable += `
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td class="px-6 py-4">
                        <div class="bg-blue-500 text-white w-[60px] h-[60px] flex items-center justify-center rounded-full cursor-pointer">
                            <img src="imgs/logos/${data.img}" alt="Icon 1" class="rounded-full w-full h-full object-cover">
                        </div>
                    </td>
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        ${data.username}
                    </th>
                    <td class="px-6 py-4">
                        ${data.team}
                    </td>
                    <td class="px-6 py-4">
                        ${data.score}
                    </td>
                </tr>
                `;
            });
            
            tbody.innerHTML = codigoTable;
            
        } else {
            console.log('No se encontraron datos en "users".');
        }
    })
    .catch((error) => {
        console.error('Error al obtener datos de "users":', error);
    });
