const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");
const signInBtn = document.getElementById("sign-in-btn");
const signInForm = document.getElementById("sign-in-form");
const signUpBtn = document.getElementById("sign-up-btn");
const signUpForm = document.getElementById("sign-up-form");

inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value != "") return;
    inp.classList.remove("active");
  });
});

toggle_btn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    main.classList.toggle("sign-up-mode");
  });
});

function moveSlider() {
  let index = this.dataset.value;

  let currentImage = document.querySelector(`.img-${index}`);
  images.forEach((img) => img.classList.remove("show"));
  currentImage.classList.add("show");

  const textSlider = document.querySelector(".text-group");
  textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

  bullets.forEach((bull) => bull.classList.remove("active"));
  this.classList.add("active");
}

bullets.forEach((bullet) => {
  bullet.addEventListener("click", moveSlider);
});










const signIn = (e) => {
  e.preventDefault();
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  if (email.value === "" || password.value === "") {
    alert("Please fill all the fields");
  } else {
    fetch("https://eutopia-2.onrender.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        try {
          localStorage.setItem("token", data._tokenResponse.idToken);
          alert("Login Successful");
          window.location.pathname = "/index.html";
        } catch (err) {
          console.error(err);
          alert("Invalid Credentials");
        }
      });
  }
};

const signUp = (e) => {
  e.preventDefault();
  const email = document.getElementById("register-email");
  const password = document.getElementById("register-password");
  const firstName = document.getElementById("first-name");
  const lastName = document.getElementById("last-name");
  const phone = document.getElementById("phone");

  const data = {
    email: email.value,
    password: password.value,
    first_name: firstName.value,
    last_name: lastName.value,
    phone: phone.value,
  };

  if (
    email.value === "" ||
    password.value === "" ||
    firstName.value === "" ||
    lastName.value === "" ||
    phone.value === ""
  ) {
    alert("Please fill all the fields");
  }

  fetch("https://eutopia-2.onrender.com/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status >= 200 && res.status < 300) {
      alert("Registration Successful");
    } else {
      alert("Registration failed");
    }
  });
};

signInBtn.addEventListener("click", signIn);
signUpBtn.addEventListener("click", signUp);

signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
});
signInBtn.addEventListener("click", (e) => {
  e.preventDefault();
});
