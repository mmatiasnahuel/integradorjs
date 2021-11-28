const baseURL = 'https://back-sandbox.herokuapp.com/api';

const firstname = document.getElementById('name');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const btnregistro = document.getElementById('btn-registro');

const registrar = async () => {
    const body = {
        email: email.value,
        password: password.value,
        name: firstname.value,
        lastName: lastname.value
    };
    try {
        const response = await fetch(`${baseURL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const json = await response.json();
        console.log(json);
        localStorage.setItem('token', json.token);
        if (response.status === 201) {
            alert("El registro se realizó con exito")
            window.location.href = "../index.html";
        }
    } catch (error){
        alert(error)
    }
}

btnregistro.addEventListener('click', registrar)