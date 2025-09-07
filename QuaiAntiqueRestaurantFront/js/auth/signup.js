// Implémenter le JS de ma page

const inputNom = document.getElementById("NomInput");
const inputPreNom = document.getElementById("PrenomInput");
const inputMail = document.getElementById("EmailInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidationPassword = document.getElementById("ValidatePasswordInput");
const btnValidation = document.getElementById("btn-validation-inscription");
const formInscription = document.getElementById("formulaireInscription");

inputNom.addEventListener("keyup", validateForm);
inputPreNom.addEventListener("keyup", validateForm);
inputMail.addEventListener("keyup", validateForm);
inputPassword.addEventListener("keyup", validateForm);
inputValidationPassword.addEventListener("keyup", validateForm);

btnValidation.addEventListener("click", InscrireUtilisateur);


//Function permettant de valider tout le formulaire
function validateConfirmationPassword(inputPwd, inputConfirmPwd){
    if(inputPwd.value == inputConfirmPwd.value){
        inputConfirmPwd.classList.add("is-valid");
        inputConfirmPwd.classList.remove("is-invalid"); 
        return true;  
    }
    else{
        inputConfirmPwd.classList.add("is-invalid");
        inputConfirmPwd.classList.remove("is-invalid");    
        return false;    
    }
}


function validateForm(){
    const nomOk = validateRequired(inputNom);
    const prenomOk = validateRequired(inputPreNom);
    const mailOk = validateMail(inputMail);
    const passwordOk = validatePassword(inputPassword);
    const passwordConfirmOk = validateConfirmationPassword(inputPassword, inputValidationPassword);

    if(nomOk && prenomOk && mailOk && passwordOk && passwordConfirmOk){
        btnValidation.disabled = false;
    }
    else{
        btnValidation.disabled = true;
    }
}

function validatePassword(input){
    // Définir mon regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const passwordUser = input.value;
    if(passwordUser.match(passwordRegex)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");  
        return false;
    }
}

function validateMail(input){
    // Définir mon regex
    const emailRegex = `^[^s@]+@[^s@]+\.[^\s@]+$`;
    const mailUser = input.value;
    if(mailUser.match(emailRegex)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");  
        return false;
    }
}

function validateRequired(input){
        if(input.value != ''){
            input.classList.add("is-valid");
            input.classList.remove("is-invalid");
            return true;
        }
        else{
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
            return false;
        }
    }

    function InscrireUtilisateur(){
        let dataForm = new FormData(formInscription);

        // Déclaration des headers, type de contenu des données au format json
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // Définir le body de notre application en utilisant la méthode json stringify pour renvoyer ces
        // données au format JSON, données récupérés depuis le formulaire
        let raw = JSON.stringify({
        "firstName": dataForm.get("nom"),
        "lastName": dataForm.get("prenom"),
        "email": dataForm.get("Email"),
        "password": dataForm.get("mdp"),
        });

        // Ajout d'option de requêtes methode utilisé POST
        let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
        };

        // Appel de la méthode fetch sur l'url demandé avec les options précisées précédemment
        fetch(apiUrl+"registration", requestOptions)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            else{
                alert("Erreur lors de l'inscription");
            }
        })
        .then((result) => {
            alert("Bravo, "+dataForm.get("prenom")+" vous êtes maintenant inscrit, vous pouvez vous connecter.");
            document.location.href="/signin";
        })
        .catch(error => console.log('error', error));
}