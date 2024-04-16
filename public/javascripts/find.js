const fieldsetCat = document.getElementById("fieldset_cat");
const fieldsetDog = document.getElementById("fieldset_dog");
var selectedAnimalIndex; //0 is cat, 1 is dog.

function selectCat() {
    fieldsetCat.style.display = 'block';
    fieldsetCat.disabled = false;
    fieldsetDog.style.display = 'none';
    fieldsetDog.disabled = true;

    selectedAnimalIndex = 0;
}


function selectDog() {
    fieldsetDog.style.display = 'block';
    fieldsetDog.disabled = false;
    fieldsetCat.style.display = 'none';
    fieldsetCat.disabled = true;

    selectedAnimalIndex = 1;
}

function validateForm() {


    let breed = document.getElementsByName("breed")[selectedAnimalIndex].value;
    let age = document.getElementsByName("age")[selectedAnimalIndex].value;
    let genderElements = document.getElementsByName("gender");
    let missingFields = "";

    if (!(genderElements[selectedAnimalIndex * 3].checked || genderElements[selectedAnimalIndex * 3 + 1].checked || genderElements[selectedAnimalIndex * 3 + 2].checked)) {
        missingFields += (missingFields !== "") ? ", Gender" : "Gender";
    }

    if (breed == "(!) Please select (!)") missingFields += (missingFields !== "") ? ", Breed" : "Breed";
    if (age == "(!) Please select (!)") missingFields += (missingFields !== "") ? ", Age" : "Age";


    if (missingFields !== "") {
        alert("Please fill in the following field(s): " + missingFields);
        return false;
    } else {
        return true;
    }

}


document.getElementById("submit_button").addEventListener("click", function (event) {
    if (selectedAnimalIndex === undefined || !validateForm()) {
        event.preventDefault();
    }
});