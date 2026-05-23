// HEADER

//header options
function ShowDiv(element) {
  const option = element.querySelector(".options");
  option.classList.toggle("options-show");
}

function HideDiv(element) {
  const option = element.querySelector(".options");
  option.classList.remove("options-show");
}

// login password check

function LogIn() {
  const name = document.querySelector(".js-user").value;
  const password = document.querySelector(".js-password").value;
  const confirmation = document.querySelector(".js-confirmation").value;
  const IncorrectText = document.querySelector(".alert");
  
  if (password != confirmation) {
    IncorrectText.innerHTML = "Passwords does not match !!!";
  } else if (password == confirmation) {
    IncorrectText.innerHTML = '';
    alert(`Loggined In. Thanks ${name}`);
  }
}
