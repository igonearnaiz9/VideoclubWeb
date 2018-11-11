
//Pongo la función entre()porque quiero que se me cargue nada más cargar la página ¡¡Es un videoclub!!
(function () {
    let xhr = new XMLHttpRequest();
    let url = "http://api.themoviedb.org/3/person/51576/movie_credits?api_key=481c79d3a33080ff40b0228db08ba1a6";
    xhr.open("GET", url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let responseObj = JSON.parse(xhr.response);
            showFilms(responseObj);
        }
    };
    xhr.send();
}());
let url2="";
function showFilms(responseObj) {
    let filmList = [];
    for (let i = 0; i < responseObj.cast.length; i++) {
        url2 = "https://image.tmdb.org/t/p/original" + responseObj.cast[i].poster_path;
        filmList.push({ title: responseObj.cast[i].title, poster_path:url2 });
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
        let texto = document.createTextNode(filmList[i].title);
        //texto.setAttribute("font-size","0,9em");
        let poster = document.createElement("IMG");
        poster.setAttribute("src", filmList[i].poster_path);
        poster.setAttribute("width", "200");
        poster.setAttribute("height", "250");
        let parrafo = document.createElement("li");
        parrafo.setAttribute("class", "film col-sm-3 list-group-item");
        parrafo.appendChild(texto);
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
function introducirDatos() {
    let boton = document.getElementById("Acceder");
    boton.addEventListener("click", getPerson);

}
function getPerson() {
    let name = document.getElementById("name").value; // con esto recogemos el valor de nombre en el html
    let surname = document.getElementById("surname").value;
    let person = { name: name, surname: surname };
    //añadimos para el index2
    localStorage.setItem("person", JSON.stringify(person));
    let comprobarPerson = JSON.parse(localStorage.getItem("person"));
    document.getElementById("showPerson").innerHTML = comprobarPerson.name + " " + comprobarPerson.surname;
    return comprobarPerson;

    //document.getElementById("showPerson").innerHTML = person.name + " " + person.surname;
}
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
                    console.log("pablito");
                    showFilmsPorTitulo(responseObj2);
                }
            }
        };
        xhr.send();
        
    }
}

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
function showFilmsPorTitulo(responseObj2) {
    let filmListPorTitulo = [];
    for (let i = 0; i < responseObj2.cast.length; i++) {
        url2 = "https://image.tmdb.org/t/p/original" + responseObj2.cast[i].poster_path;
        filmListPorTitulo.push({title:responseObj2.cast[i].title, poster_path: url2 });
    }   
    console.log(filmListPorTitulo);
    localStorage.setItem("responseObj2", JSON.stringify(filmListPorTitulo));
    for (let i = 0; i < filmListPorTitulo.length; i++) {
        let texto2 = document.createTextNode(filmListPorTitulo[i].title);
        let parrafo2 = document.createElement("li");
        parrafo2.setAttribute("class", "film col-sm-3 list-group-item");
        parrafo2.appendChild(texto2);
        document.getElementById("listadoPorTitulo").appendChild(parrafo2);
    }
}


///para sacar las imagenes de los posters https://image.tmdb.org/t/p/original/ +8BcCh0Zxq3pR948Yz7P7IQG7esB.jpg