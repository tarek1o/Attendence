import {getData, postData} from "./crud.js"

let form = document.querySelector(".registeration form");
let firstname = document.querySelector(".registeration input[name = 'fname']");
let lastname = document.querySelector(".registeration input[name = 'lname']");
let email = document.querySelector(".registeration input[type = 'email']");
let address = document.querySelector(".registeration [placeholder='Address']");
let age = document.querySelector(".registeration input[type = 'number']");
let min = age.getAttribute("min");
let max = age.getAttribute("max");

//firstname and lastname
let nameRegex = /^[a-zA-Z ][^ ]+$/;
firstname.addEventListener("blur", function() {
	checkName(this);
});
lastname.addEventListener("blur", function() {
	checkName(this);
});
function checkName(target) {
	if(target.value.trim().length != 0 && nameRegex.test(target.value.trim())) {
		target.classList.add("valid");
		target.classList.remove("not_valid");
		addValidationMark(target, "valid");
		removeError(target);
		}
	else {
		target.classList.remove("valid");
		target.classList.add("not_valid");
		addValidationMark(target, "not");
		if(target.value.trim().length == 0) {
			createMessage(target.parentElement, "This Field is required*")
		}
		else {
			createMessage(target.parentElement, "Invalid name")
		}
	}
}

//Email
let emailRegex = /^[a-z]+[a-z0-9]+@[a-z]+\.[a-z]{2,3}/i;
email.addEventListener("blur", function() {
	checkEmail(this, true);
})
function checkEmail(target, checkExistance) {
	if(target.value.trim().length != 0 && emailRegex.test(target.value))
	{
		if(checkExistance) {
			let emailsEmployee = getData(`http://localhost:3000/employee?email=${email.value}`);
			emailsEmployee.then(function(data) {
				if(data.length == 0) {
					let emailsRequest = getData(`http://localhost:3000/request?email=${email.value}`);
					emailsRequest.then(function(data) {
						if(data.length == 0) {
							target.classList.add("valid");
							target.classList.remove("not_valid");
							addValidationMark(target, "valid")
							removeError(target);
						}
						else {
							target.classList.remove("valid");
							target.classList.add("not_valid");
							addValidationMark(target, "not");
							createMessage(target.parentElement, "This email is used before");
						}
					})				
				}
				else {
					target.classList.remove("valid");
					target.classList.add("not_valid");
					addValidationMark(target, "not");
					createMessage(target.parentElement, "This email is used before");
				}
			})
		}
		else {
			target.classList.add("valid");
			target.classList.remove("not_valid");
			addValidationMark(target, "valid")
			removeError(target);
		}
	}
	else {
		target.classList.remove("valid");
		target.classList.add("not_valid");
		addValidationMark(target, "not");
		if(target.value.trim().length == 0) {
			createMessage(target.parentElement, "This Field is required*");
		}
		else {
			createMessage(target.parentElement, "Invalid Email");
		}
	}
}

//Address
address.addEventListener("blur", function() {
	checkAddress(this);
})
function checkAddress(target) {
	if(target.value.trim().length > 5) {
		target.classList.add("valid");
		target.classList.remove("not_valid");
		addValidationMark(target, "valid")
		removeError(target);
	}
	else {
		target.classList.remove("valid");
		target.classList.add("not_valid");
		addValidationMark(target, "not");
		if(target.value.trim().length == 0) {
			createMessage(target.parentElement, "This Field is required*");
		}
		else {
			createMessage(target.parentElement, "Invalid Address");
		}
	}
}

//Age
age.addEventListener("blur", function() {
	checkAge(this);
})
function checkAge(target) {
	if(+target.value >= min && +target.value <= max) {
		target.classList.add("valid");
		target.classList.remove("not_valid");
		addValidationMark(target, "valid")
		removeError(target);
	}
	else {
		target.classList.remove("valid");
		target.classList.add("not_valid");
		addValidationMark(target, "not");
		if(+target.value == 0) {
			createMessage(target.parentElement, "This Field is required*");
		}
		else {
			createMessage(target.parentElement, "between 20 and 65");
		}
	}
}

function addValidationMark(target, validation) {
	let exclamation = document.createElement("i");
	exclamation.setAttribute("class", "fa-solid fa-exclamation");

	let check = document.createElement("i");
	check.setAttribute("class", "fa-solid fa-check")
	
	if(validation == "valid") {
		if(target.parentElement.querySelector("i.fa-check") == null) {
			target.parentElement.appendChild(check);
		}
		if(target.parentElement.querySelector("i.fa-exclamation") != null) {
			target.parentElement.removeChild(target.parentElement.querySelector("i.fa-exclamation"));
		}
	}
	else {
		if(target.parentElement.querySelector("i.fa-exclamation") == null) {
			target.parentElement.appendChild(exclamation);
		}
		if(target.parentElement.querySelector("i.fa-check") != null) {
			target.parentElement.removeChild(target.parentElement.querySelector("i.fa-check"));
		}	
	}
}

form.addEventListener("submit", function(e) {
	e.preventDefault();
	checkName(firstname);
	checkName(lastname);
	checkEmail(email, false);
	checkAddress(address);
	checkAge(age);
	let result = Array.from(form.querySelectorAll("input:not([type='submit'])")).every(function(item) {
		return item.classList.contains("valid");
	})
	if(result) {
		console.log(form.getAttribute("action"));
		let waitingObject = {
			"username": "haswkdawwds",
			"firstname": firstname.value.trim(),
			"lastname": lastname.value.trim(),
			"email": email.value.trim(),
			"address": address.value.trim(),
			"age": +age.value.trim()
		}
		confirmMessage(waitingObject);
	}
})

function createMessage(target, info) {
	if(target.classList.contains("error")) {
		let message = target.querySelector(".message");
		message.textContent = info;
	}
	else {
		let message = document.createElement("span");
		message.textContent = info;
		message.classList.add("message");
		target.append(message);
		target.classList.add("error");
	}
}

function removeError(target) {
	if(target.parentElement.classList.contains("error")) {
		target.parentElement.classList.remove("error");
		target.parentElement.querySelector(".message").remove();
	}
}

function confirmMessage(waitingObject) {
	Swal.fire({
		title: "Registeration completed successfully",
		html: `Your request is send to the admin, We'll send you an email through <span class="fst-italic text-primary">${waitingObject.email}</span> soon to confirm our verification`,
		icon: 'success',
		showCancelButton: false,
		confirmButtonColor: '#3085d6',
		confirmButtonText: 'OK'
	}).then((result) => {
		postData("http://localhost:3000/request", waitingObject);
		window.location.replace("logoin.html")
	})
}