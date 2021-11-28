const btnsearch = document.querySelector('.btnsearch');
const titulo = document.querySelector('.titulo');

const pedirNoticias = async () => {
    try {
        const response = await fetch(`https://mmo-games.p.rapidapi.com/latestnews`, {
            headers: {
                "x-rapidapi-host": "mmo-games.p.rapidapi.com",
                "x-rapidapi-key": "22f373e213msh73f64ae2f4b5ed2p11d63bjsn1fe38cd9f6b8"
            },
            method: 'GET',
        })
        const json = await response.json();
        console.log(json);
        RenderNews(json);
        localStorage.setItem('noticias', JSON.stringify(json));
    }

    catch (error) {
        alert(error)
    }

}


const RenderNews = (news) => {
    const section = document.getElementById('section');
    section.innerText = '';
    if (news.length > 0) {
        news.forEach(element => {
            const div = document.createElement('div');
            div.className = "section-new";
            const hr = document.createElement('hr');
            const h2 = document.createElement('h2');
            const img = document.createElement('img');
            h2.innerText = element.title;
            const p = document.createElement('p');
            p.innerHTML = element.article_content;
            img.src = element.main_image;
            div.appendChild(h2);
            div.appendChild(img);
            div.appendChild(p);
            section.appendChild(div);
            section.appendChild(hr);
        })
    }
    else {
        const h2 = document.createElement('h2');
        h2.innerText = 'No se encontraron noticias que cumplan los requerimientos de busqueda.';
        section.appendChild(h2);
    };
}


const searchNews = (palabras) => {
    const arrayNoticias2 = JSON.parse(localStorage.getItem('noticias'));
    const nuevoArray = [];
    arrayNoticias2.map(el => {
        if (el.title.toUpperCase().includes(palabras.toUpperCase())) {
            nuevoArray.push(el);
        }
    }
    )
    RenderNews(nuevoArray);
}

btnsearch.addEventListener("keyup", function () {
    searchNews(btnsearch.value);
});

if (localStorage.getItem('token')) {
    pedirNoticias();
}
else
{
    btnsearch.disabled = true;
    titulo.innerText = 'DEBES INICIAR SESION PARA ACCEDER A LAS NOTICIAS';  
}