import {saveAffillier, getAffilliers, checkIfPhoneExists, checkIfDNIExists} from "./firebase.js"

const affillierForm = document.getElementById("affillier-form");
const inputs = document.querySelectorAll("#affillier-form input")

const fields = {
    firstName: false,
    lastName: false,
    password: false,
    phone: false,
    DNI: false
}
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
            validateField2()
        break;
        case "password2":
            validateField2()
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
        fields[field] = true;
    }else{
        document.getElementById(`grupo__${field}`).classList.add("formulario__grupo-incorrecto");
        document.getElementById(`grupo__${field}`).classList.remove("formulario__grupo-correcto");
        document.querySelector(`#grupo__${field} i`).classList.add("fa-times-circle");
        document.querySelector(`#grupo__${field} i`).classList.remove("fa-check-circle");
        document.querySelector(`#grupo__${field} .formulario__input-error`).classList.add("formulario__input-error-activo");
        fields[field] = false;
    }
}
const validateField2 = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
		fields['password'] = false;
	} else {
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
		fields['password'] = true;
	}
}

inputs.forEach((input) => {
    input.addEventListener("keyup", validateForm);
    input.addEventListener("blur", validateForm)
})

affillierForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const phone = affillierForm["phone"];
    const DNI = affillierForm["DNI"];
    const firstName = affillierForm["first-name"];
    const lastName = affillierForm["last-name"];
    const password = affillierForm["password"];
    const password2 = affillierForm["password2"];


    if (firstName.value.trim() === "" || lastName.value.trim() === "" || password.value.trim() === "" || password2.value.trim() === "" || phone.value.trim() === "" || DNI.value.trim() === "" || !terms.checked) {
        document.getElementById("formulario__message").classList.add("formulario__mensaje-activo");
        setTimeout(() => {
          document.getElementById("formulario__message").classList.remove("formulario__mensaje-activo");
        }, 5000); // Ocultar el mensaje después de 5 segundos
        return;
      }

    const phoneExists = await checkIfPhoneExists(phone.value);
    const DNIExists = await checkIfDNIExists(DNI.value);

    if (phoneExists || DNIExists) {
        alert("El afiliado ya existe en la base de datos");
    } else {
        try {
            await saveAffillier(firstName.value, lastName.value, password.value, phone.value, DNI.value);
            alert("Afiliado guardado correctamente");
            affillierForm.reset();
            document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
            setTimeout(() => {
                document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
            }, 5000);
            document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
                icono.classList.remove('formulario__grupo-correcto');
            });
        } catch (error) {
            console.error(error);
            alert("Hubo un error al guardar el afiliado. Por favor, inténtalo nuevamente.");
        }
    }
});








  
  
  
  
  
  