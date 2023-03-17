import {saveAffillier, getAffilliers, onGetAfilliers} from "./firebase.js"

const affillierForm = document.getElementById("affillier-form");
const inputs = document.querySelectorAll("#affillier-form input")
//Show--Data
// const afilliersContainer = document.getElementById("affilliers-container");
// window.addEventListener("DOMContentLoaded", async () => {
//     onGetAfilliers((querySnapshot) => {
//         let content = " ";
//         querySnapshot.forEach(doc => {//QuerySnapshot Datos que existen en este momento
//             const task = doc.data();
//             content += ` 
//                 <div>
//                     <h3>${task.firstName}</h3>
//                     <h3>${task.lastName}</h3>
//                     <h3>${task.phone}</h3>
//                     <h3>${task.DNI}</h3>
//                     <button>Delete</button>
//                     <br/>
//                 </div>
//             `
//         });
//         afilliersContainer.innerHTML = content;
//     });
// });
const expressions = {
	firstName: /^[a-zA-ZÀ-ÿ\s]{1,16}$/, // Letras y espacios, pueden llevar acentos.
    lastName: /^[a-zA-ZÀ-ÿ\s]{1,16}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
	DNI: /^\d{8}$/, // 8 numeros.
	phone: /^\d{9}$/ // 9 numeros.
}
const validateForm = (e) =>{
    switch (e.target.name){
        case "first-name":
            validateField(expressions.firstName, e.target, "first-name");
        break;
        case "last-name":
            validateField(expressions.lastName, e.target, "last-name");
        break;
        case "password":
            validateField(expressions.password, e.target, "password");
        break;
        case "password2":
            validatePassword2();
        break;
        case "phone":
            validateField(expressions.phone, e.target, "phone");
        break;
        case "DNI":
            validateField(expressions.DNI, e.target, "DNI");
        break;
    }

}
const validateField = (expression, input, field) =>{
    if(expression.test(input.value)){
        document.getElementById(`grupo__${field}`).classList.remove("formulario__grupo-incorrecto");
        document.getElementById(`grupo__${field}`).classList.add("formulario__grupo-correcto");
        document.querySelector(`#grupo__${field} i`).classList.add("fa-check-circle");
        document.querySelector(`#grupo__${field} i`).classList.remove("fa-times-circle");
        document.querySelector(`#grupo__${field} .formulario__input-error`).classList.remove("formulario__input-error-activo");
    }else{
        document.getElementById(`grupo__${field}`).classList.add("formulario__grupo-incorrecto");
        document.getElementById(`grupo__${field}`).classList.remove("formulario__grupo-correcto");
        document.querySelector(`#grupo__${field} i`).classList.add("fa-times-circle");
        document.querySelector(`#grupo__${field} i`).classList.remove("fa-check-circle");
        document.querySelector(`#grupo__${field} .formulario__input-error`).classList.add("formulario__input-error-activo");
    }
}
const validatePassword2 = () => {
    const inputPassword1 = document.getElementById("password");
    const inputPassword2 = document.getElementById("password2");

    if(inputPassword1.value !== inputPassword2.value){
        document.getElementById(`grupo__password2`).classList.add("formulario__grupo-incorrecto");
        document.getElementById(`grupo__password2`).classList.remove("formulario__grupo-correcto");
        document.querySelector(`#grupo__password2 i`).classList.add("fa-times-circle");
        document.querySelector(`#grupo__password2 i`).classList.remove("fa-check-circle");
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add("formulario__input-error-activo");
    }else{
        document.getElementById(`grupo__password2`).classList.remove("formulario__grupo-incorrecto");
        document.getElementById(`grupo__password2`).classList.add("formulario__grupo-correcto");
        document.querySelector(`#grupo__password2 i`).classList.add("fa-check-circle");
        document.querySelector(`#grupo__password2 i`).classList.remove("fa-times-circle");
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove("formulario__input-error-activo");
    }
}
inputs.forEach((input) => {
    input.addEventListener("keyup", validateForm);
    input.addEventListener("blur", validateForm)
})

affillierForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const firstName = affillierForm["first-name"];
    const lastName = affillierForm["last-name"];
    const password = affillierForm["password"];
    const phone = affillierForm["phone"];
    const DNI = affillierForm["DNI"];
    
    saveAffillier(firstName.value, lastName.value, password.value, phone.value, DNI.value);

});