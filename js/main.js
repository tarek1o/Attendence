$(".password input").on("input", function() {
	if($(this).val().length == 0) {
		$(this).css("display", "block");
		$(this).siblings(".show-password").css("display", "none");
		$(this).siblings(".fa-eye").css("display", "none");
		$(this).siblings(".fa-eye-slash").css("display", "none");
	}
	else {
		$(this).siblings(".fa-eye-slash").css("display", "block");
		$(this).siblings(".fa-eye").css("display", "none");
	}
})

$(".show-password").on("input", function() {
	if($(this).val().length == 0) {
		$(this).css("display", "none");
		$(this).siblings("input[type = 'password']").css("display", "block");
		$(this).siblings("input[type = 'password']").val("");
		$(this).siblings(".fa-eye").css("display", "none");
		$(this).siblings(".fa-eye-slash").css("display", "none");
	}
	else {
		$(this).siblings(".fa-eye").css("display", "block");
		$(this).siblings(".fa-eye-slash").css("display", "none");
	}
})

$(".fa-eye-slash").on("click", function() {
	$(this).css("display", "none");
	$(this).siblings(".fa-eye").css("display", "block");
	$(this).siblings("input[type = 'password']").css("display", "none");
	$(this).siblings(".show-password").css("display", "block");
	$(this).siblings(".show-password").val($(this).siblings("input[type = 'password']").val())
})

$(".fa-eye").on("click", function() {
	$(this).css("display", "none");
	$(this).siblings(".fa-eye-slash").css("display", "block");
	$(this).siblings("input[type = 'password']").css("display", "block");
	$(this).siblings(".show-password").css("display", "none");
	$(this).siblings("input[type = 'password']").val($(this).siblings(".show-password").val())
})

// let registration = document.querySelector(" input[type = 'submit']");
// registration.addEventListener("click", function(e) {
// 	e.preventDefault();

// 	Email.send({
// 		Host : "smtp.elasticemail.com",
// 		Username : "tarekeslam33456@gmail.com",
// 		Password : "59503B7EA8DE406A351C1B80DEB90BA863B0",
// 		To : 'tarekeslam159@gmail.com',
// 		From : "tarekeslam33456@gmail.com",
// 		Subject : "This is the subject",
// 		Body : "And this is the body"
// 	}).then(
// 		message => alert(message)
// 	);
// })