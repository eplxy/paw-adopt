function validateForm() {
    let invalidFields = "";
    let animalTypeElements = document.getElementsByName("animal_type");
    let animalSelected = false;
    for (let i = 0; i < animalTypeElements.length; i++) {
        if (animalTypeElements[i].checked) {
            animalSelected = true;
            break;
        }
    }

    if (animalSelected === false) invalidFields += "Animal Type";


    let breed = document.getElementById("breed").value;
    let age = document.getElementById("select_age").value;
    let genderElements = document.getElementsByName("gender");

    if (breed == "") invalidFields += (invalidFields !== "") ? ", Breed" : "Breed";
    if (age == "(!) Please Select (!)") invalidFields += (invalidFields !== "") ? ", Age" : "Age";

    let genderIsSelected = false;
    for (let i = 0; i < genderElements.length; i++) {
        if (genderElements[i].checked) {
            genderIsSelected = true;
            break;
        }
    }


    if (genderIsSelected === false) {
        invalidFields += (invalidFields === "") ? "Gender" : ", Gender";
    }


    let ownerFirstName = document.getElementById("owner_first_name").value;
    let ownerLastName = document.getElementById("owner_last_name").value;
    let ownerEmail = document.getElementById("owner_email").value;

    if (ownerFirstName == "") invalidFields += (invalidFields !== "") ? ", Owner's First Name" : "Owner's First Name";
    if (ownerLastName == "") invalidFields += (invalidFields !== "") ? ", Owner's Last Name" : "Owner's Last Name";
    
    if ((ownerEmail == "") || (!validateEmail(ownerEmail))) invalidFields += (invalidFields !== "") ? ", Owner's Email" : "Owner's Email";
    
    //if ((ownerEmail == "") || (!validateEmailTheLongWay(ownerEmail))) invalidFields += (invalidFields !== "") ? ", Owner's Email" : "Owner's Email";


    if (invalidFields !== "") {
        alert("Invalid entry in the following field(s): " + invalidFields);
        return false;
    } else {
        return true;
    }
}


function validateEmail(email) {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateEmailTheLongWay(email) {
    for (let i = 0; i < email.length; i++) {
        if (email[i] === "@") {
            for (let j = i + 1; j < email.length; j++) {
                if (email[j] === ".") {
                    let alphanumericRegex = /^[a-z0-9]+$/i;
                    if (alphanumericRegex.test(email.substring(j + 1))) {
                        return true;
                    } else { return false; }
                }
            }
        }
    }


}


document.getElementById("submit_button").addEventListener("click", function (event) {
    if (!validateForm()) {
        event.preventDefault();
    }
});