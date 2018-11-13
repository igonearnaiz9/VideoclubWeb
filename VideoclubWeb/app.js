let url2="";
function showFilms(responseObj) {
    let filmList = [];
    for (let i = 0; i < responseObj.cast.length; i++) {
        url2 = "https://image.tmdb.org/t/p/original" + responseObj.cast[i].poster_path;
        filmList.push({/* title: responseObj.cast[i].title,*/poster_path:url2 });
    }
    console.log(filmList);
    localStorage.setItem("responseObj", JSON.stringify(filmList));
    //var br = document.createElement("br");
    for (let i = 0; i < filmList.length; i++) {
        //let texto;
        //if (filmList[i].title.length < 36) {
        //    //texto = texto + "\n";
        //    //texto += ;
        //    texto = document.createTextNode (filmList[i].title);
        //   // texto.appendChild(br);
        //    //texto += "\n Tachan";
        //}
        //else
        //{
        //    texto = document.createTextNode(filmList[i].title);
        //}
        //let texto = document.createTextNode(filmList[i].title);
        //texto.setAttribute("font-size","0,9em");
        let poster = document.createElement("IMG");
        poster.setAttribute("src", filmList[i].poster_path);
        poster.setAttribute("width", "175");
        poster.setAttribute("height", "225");
        poster.setAttribute("class", "efectoimg");
        let parrafo = document.createElement("li");
        parrafo.setAttribute("class", "film col-sm-3 list-group-item");
       //parrafo.appendChild(texto);
        //parrafo.appendChild(document.createElement("\n"));
        parrafo.appendChild(poster);
        //parrafo.setAttribute("font-size", "0,5");
        document.getElementById("filmList").appendChild(parrafo);
    }
}

//if (button !== null) {
//    button.addEventListener("click", getPerson)
//} else {
//    console.log("no se ha encontrado el botón")



function showPerson() {
    let personaGuardada = JSON.parse(localStorage.getItem("person"));
    document.getElementById("showPerson").innerHTML = personaGuardada.name + " " + personaGuardada.surname;   
    //document.getElementById("showPerson").innerHTML = "mngeriojhriohepgeruighperuighierurhripeuerhieh";
}

function showPersonGuardada() {
    let personaGuardada = JSON.parse(localStorage.getItem("person"));
    document.getElementById("mostrarPersonGuardada").innerHTML =
        "Bienvenido a tu espacio personal " + personaGuardada.name + " " + personaGuardada.surname;
    //let eleccionDropdown = document.getElementById("select");    
    document.getElementById("select").addEventListener("change", getOption);
}
//function selectSearch() {

//    //document.getElementById("mostrarOpcionSeleccionada").innerHTML = eleccionDropdown;
//}
function getOption() {//eleccionDropdown) {
    //alert("Has elegido algo en el combo " + document.getElementById("select").value);comprobado que funciona
    let eleccionDropdown = document.getElementById("select").value;    
    let cajaTexto = document.getElementById("textoSearch").value;
    if (eleccionDropdown !== "" && cajaTexto !== "") {
        let xhr = new XMLHttpRequest();
        let url = "http://api.themoviedb.org/3/person/51576/movie_credits?api_key=481c79d3a33080ff40b0228db08ba1a6";
        xhr.open("GET", url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let responseObj2 = JSON.parse(xhr.response);
                if (eleccionDropdown === "titulo") {
                    //console.log("pablito");
                    showFilmsPorTitulo(responseObj2,cajaTexto);
                }
                else if (eleccionDropdown === "protagonista") {
                    //console.log("pablito");
                    showFilmsPorProtagonista(responseObj2, cajaTexto);
                }
            }
        };
        xhr.send();
        
    }
}

function showFilmsPorTitulo(responseObj2, cajaTexto) {
    //borrar listado por titulo.TODO:

    let filmListPorTitulo = [];
    for (let i = 0; i < responseObj2.cast.length; i++) {
        if (responseObj2.cast[i].title.toLowerCase().indexOf(cajaTexto.toLowerCase()) !== -1) {
            url2 = "https://image.tmdb.org/t/p/original" + responseObj2.cast[i].poster_path;
            filmListPorTitulo.push({
                                title: responseObj2.cast[i].title,
                                poster_path: url2,
                                overview: responseObj2.cast[i].overview });
        }
    }   
    console.log(filmListPorTitulo);
    localStorage.setItem("responseObj2", JSON.stringify(filmListPorTitulo));
    let pelisGuardadas = JSON.parse(localStorage.getItem("pelisElegidas"));
    let peliculaClickadaList;
    if (pelisGuardadas === null) {
        peliculaClickadaList = [];
    } else {
        peliculaClickadaList = pelisGuardadas;
    }
    document.getElementById("listadoPorOpcion").innerHTML = "";//me vacía la lista antes de empezar
    for (let i = 0; i < filmListPorTitulo.length; i++) {
        let texto2 = document.createTextNode(filmListPorTitulo[i].title);
        let poster2 = document.createElement("IMG");
        let argumento2 = document.createTextNode(filmListPorTitulo[i].overview);
        poster2.setAttribute("src", filmListPorTitulo[i].poster_path);
        poster2.setAttribute("width", "200");
        poster2.setAttribute("height", "250");
        poster2.addEventListener("click", function () {
            peliculaClickadaList.push({ title: filmListPorTitulo[i].title});
            localStorage.setItem("pelisElegidas", JSON.stringify(peliculaClickadaList));
            for (let i = 0; i < peliculaClickadaList.length; i++) {
                console.log(peliculaClickadaList[i].title);
                document.getElementById("pelisElegidas").innerHTML= pelisGuardadas[i].title;
            }
            
           // showPelisClickadas(peliculaClickadaList);
        })
        let parrafo2 = document.createElement("li");
        parrafo2.setAttribute("class", "film col-sm-3 list-group-item");
        parrafo2.appendChild(texto2);
        parrafo2.appendChild(poster2);
        parrafo2.appendChild(argumento2);
        document.getElementById("listadoPorOpcion").appendChild(parrafo2);
    }
    document.getElementById("textoSearch").value = "";
    document.getElementById("select").value = "";
}

function showFilmsPorProtagonista(responseObj2, cajaTexto) {
    let filmListPorProtagonista = [];
    for (let i = 0; i < responseObj2.cast.length; i++) {
        if (responseObj2.cast[i].title.toLowerCase().indexOf(cajaTexto.toLowerCase()) !== -1) {
            url2 = "https://image.tmdb.org/t/p/original" + responseObj2.cast[i].poster_path;
            filmListPorProtagonista.push({
                title: responseObj2.cast[i].title,
                poster_path: url2,
                overview: responseObj2.cast[i].overview
            });
        }
    }
    console.log(filmListPorProtagonista);
    document.getElementById("listadoPorOpcion").innerHTML = ""; 
    localStorage.setItem("responseObj2", JSON.stringify(filmListPorProtagonista));
    for (let i = 0; i < filmListPorProtagonista.length; i++) {
        let texto2 = document.createTextNode(filmListPorProtagonista[i].title);
        let poster2 = document.createElement("IMG");
        let argumento2 = document.createTextNode(filmListPorProtagonista[i].overview);
        poster2.setAttribute("src", filmListPorProtagonista[i].poster_path);
        poster2.setAttribute("width", "200");
        poster2.setAttribute("height", "250");
        let parrafo2 = document.createElement("li");
        parrafo2.setAttribute("class", "film col-sm-3 list-group-item");
        parrafo2.appendChild(texto2);
        parrafo2.appendChild(poster2);
        parrafo2.appendChild(argumento2);
        document.getElementById("listadoPorOpcion").appendChild(parrafo2);
    }
    document.getElementById("textoSearch").value = "";
    document.getElementById("select").value = "";

}

//function showPelisClickadas(peliculaClickadaList) {
//    for (let i = 0; i < peliculaClickadaList.length; i++) {
//        console.log(peliculaClickadaList[i].title);
//    }
//}



///para sacar las imagenes de los posters https://image.tmdb.org/t/p/original/ +8BcCh0Zxq3pR948Yz7P7IQG7esB.jpg
//function apiCall() {
//    let xhr = new XMLHttpRequest();
//    let url = "http://api.themoviedb.org/3/person/51576/movie_credits?api_key=481c79d3a33080ff40b0228db08ba1a6";
//    xhr.open("GET", url);
//    xhr.onreadystatechange = function () {
//        if (xhr.readyState === 4 && xhr.status === 200) {
//            let responseObj = JSON.parse(xhr.response);
//            showFilms(responseObj);
//        }
//    };
//    xhr.send();
//};
//let url2 = "";