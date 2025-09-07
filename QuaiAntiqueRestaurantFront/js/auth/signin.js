const mailInput = document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById("btnSignin");
const signinForm = document.getElementById("signinForm");

btnSignin.addEventListener("click", checkCredentials);


function checkCredentials(){
    let dataForm = new FormData(signinForm);
    
    // Déclaration des headers, type de contenu des données au format json
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    // Définir le body de notre application en utilisant la méthode json stringify
    // pour récupérer les données au format JSON, données récupérées depuis le formulaire
    let raw = JSON.stringify({
        "username": dataForm.get("email"),
        "password": dataForm.get("mdp")
    });

    // Ajout d'option de requêtes methode utilisé POST
    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };


    // Appel de la méthode fetch sur l'url demandé avec les options précisées précédemment
    fetch(apiUrl+"login", requestOptions)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        else{
            mailInput.classList.add("is-invalid");
            passwordInput.classList.add("is-invalid");
        }
    })
    .then(result => {
        const token = result.apiToken;
        setToken(token);
        //placer ce token en cookie

        setCookie(RoleCookieName, result.roles[0], 7);
        window.location.replace("/");
    })
    .catch(error => console.log('error', error));
}