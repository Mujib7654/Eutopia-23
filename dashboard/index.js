const Name = document.getElementById("name");
const email = document.getElementById("email");
const contact = document.getElementById("contact");
const house = document.getElementById("house");
const event_registered = document.getElementById("event");

fetch("https://eutopia-2.onrender.com/auth/user", {
  method: "GET",
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
  .then((res) =>
    res.json().then((data) => {
      console.log(data);
      Name.innerHTML = data.name;
      email.innerHTML = data.email;
      contact.innerHTML = data.phone_number;
      house.innerHTML = data.user.house;

      const event_ids = data.user.orders.map((order) => order.eventId);
      try {
        fetch("https://eutopia-2.onrender.com/event", {
          method: "GET",
        }).then((res) =>
          res.json().then((data) => {
            console.log(data);
            const event_names = [];
            data.map((event) => {
              if (event_ids.includes(event.id)) event_names.push(event.name);
            });

            event_registered.innerHTML = event_names.join(", ");
          })
        );
      } catch (err) {
        event_registered.innerHTML = "No event registered";
      }
    })
  )
  .catch((err) => {
    alert("No events registered");
    window.location.pathname = "/sign-in/signIN.html";
    console.error(err);
  });

console.log(Name, email, contact, event_registered);

const logOutBtn = document.getElementById("log-out-btn");

logOutBtn.addEventListener("click", () => {
  localStorage.clear();
  alert("Logged out successfully");
  window.location.pathname = "/sign-in/signIN.html";
});
