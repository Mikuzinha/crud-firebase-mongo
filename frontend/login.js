import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA0bssI4BFgAboigRQehxrdvCrVz7bE55s",
  authDomain: "crud-e2693.firebaseapp.com",
  projectId: "crud-e2693",
  storageBucket: "crud-e2693.firebasestorage.app",
  messagingSenderId: "665096765604",
  appId: "1:665096765604:web:9cdf3760626d12d75e2631",
  measurementId: "G-M7D2MZV3ZQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.login = async () => {

    const email =
        document.getElementById("email").value;

    const senha =
        document.getElementById("senha").value;

    try {

        const user =
            await signInWithEmailAndPassword(
                auth,
                email,
                senha
            );

        const token =
            await user.user.getIdToken();

        localStorage.setItem(
            "token",
            token
        );

        window.location =
            "dashboard.html";

    } catch (erro) {

        alert("Email ou senha inválidos");

        console.error(erro);

    }
};