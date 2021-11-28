const baseURL = 'https://back-sandbox.herokuapp.com/api';
const email = document.getElementById('email');
const password = document.getElementById('password');
const btnlogin = document.getElementById('btn-login');

const login = async () => {

     const body = {
         email: email.value,
         password: password.value
     };

     try {
         const response = await fetch(`${baseURL}/auth/login`, {
             headers:{
                 'Content-Type': 'application/json'
             },
             method: 'POST',
             body: JSON.stringify(body)
         })
         const json = await response.json();
         console.log(json);
         localStorage.setItem('token', json.token);
        

         if (json.token) {
             alert("Se inicio sesion con éxito");
             window.location.href = "../index.html";
         }

     } catch(error) {
         alert(error)
     }
 }

btnlogin.addEventListener('click', login);