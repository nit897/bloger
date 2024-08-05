

// form button 
document.querySelector('.btn').addEventListener('click', (evt) => {
    evt.target.classList.add('loading')
  
    setTimeout(() => {
      evt.target.classList.remove('loading')
    }, 3000);
  })



// contact form information send in to gmail

const form = document.querySelector('form');
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

function sendEmail() {
    const bodyMessage = `Full Name: ${fullName.value} <br> Email: ${email.value} <br> Message: ${message.value}`;

    Email.send({
        SecureToken : "f7cd604b-fe37-4540-9c37-0bfb98a90107",
        To: 'nazmultamim921@gmail.com',
        From: "nazmultamim921@gmail.com",
        Subject: subject.value,
        Body: bodyMessage
    }).then(
        message => {
            if (message === "OK") {
                // Show success message or perform any desired action
                showCustomAlert();
                
                // Reset the form
                form.reset();
                
                // Remove error styles
                const errorFields = document.querySelectorAll(".error");
                errorFields.forEach(field => {
                    field.classList.remove("error");
                });
            }
        }
    );
}



// check input validation 

function checkInputs() {
    const items = document.querySelectorAll(".item");

    for (const item of items) {
        if (item.value == "") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }

        if (items[1].value != "") {
            checkEmail();
        }

        items[1].addEventListener("keyup", () => {
            checkEmail();
        });

        item.addEventListener("keyup", () => {
            if (item.value != "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            }
            else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        })
    }
}

// check the email validation 

function checkEmail() {
    const emailRegex = /^([a-z\d\-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2, 3})?$/;

    const errorTextEmail = document.querySelector(".error-text.email");

    if (!email.value.match(emailRegex)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");

        if (email.value != "") {
            errorTextEmail.innerText = "Invalid email"
        }
        else {
            errorTextEmail.innerText = "Email is blank"
        }
    }
    else {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
}





form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Check if the user is online
    if (!isOnline()) {
        alert("Please check your internet connection");
        return;
    }
    
    // If online, proceed with form validation and email sending
    checkInputs();

    if (!fullName.classList.contains("error") && !email.classList.contains("error") && !subject.classList.contains("error") && !message.classList.contains("error")) {
        sendEmail();
       
        form.reset();
        return false;
    }
});

// Function to check if the user is online
function isOnline() {
    return navigator.onLine;
}



// custom alert box 
function showCustomAlert() {
    document.getElementById("customAlert").style.display = "flex";
}


document.getElementById("closeAlert").onclick = function() {
    var alertContent = document.querySelector(".custom-alert-content");
    alertContent.classList.add("scale-down");

    alertContent.addEventListener('animationend', function() {
        document.getElementById("customAlert").style.display = "none";
        alertContent.classList.remove("scale-down"); // Reset for next time
    }, { once: true });
}


