//Pongo la función entre()porque quiero que se me cargue nada más cargar la página ¡¡Es un videoclub!!
(function () {
    let boton = document.getElementById("Acceder");
    boton.addEventListener("click", getPerson);

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