async function onsubmit(e) {
  e.preventDefault();

  const Name = document.getElementById("Name").value;
  const Schoolname = document.getElementById("Schoolname").value;
  const Email = document.getElementById("Email").value;
  const standard = document.getElementById("standard").value;
  const Whatsappnum = document.getElementById("Whatsappnum").value;
  const Parentname = document.getElementById("Parentname").value;
  const Parentnum = document.getElementById("Parentnum").value;
  const Guardianname = document.getElementById("Guardianname").value;
  const Guardiannum = document.getElementById("Guardiannum").value;

  var details = {
    Name,
    Schoolname,
    Email,
    Whatsappnum,
    standard,
    Parentname,
    Parentnum,
    Guardianname,
    Guardiannum,
  };

  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);

  const dataToSend = {
    details: JSON.stringify(details),
    eventId: "56c3c5ef-a75c-49f0-8768-f41db83707ed",
  };

  console.log(dataToSend);

  script.onload = async () => {
    await fetch("https://eutopia-2.onrender.com/register/create-order", {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((t) => {
        if (t.status === 400) {
          alert("Already registered");
          return;
        }
        t.json();
      })
      .then((data) => {
        if (data.currency === undefined) {
          alert("Free Event! You are now registered");
          return;
        }
        const options = {
          key: "rzp_live_eHbQVVuI7h7HAQ",
          currency: data.currency,
          amount: data.amount,
          order_id: data.id,
          name: "Yule Ball 2.0 Registration",
          description: "Thank you for Registering!",
          notes: data.notes,
          handler: function (response) {
            alert("Payment Successful");
            window.location.pathname("/index.html")
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      })
      .catch((e) => {
        alert("Something went wrong please log in again and try again");
        localStorage.removeItem("token");
        window.location.pathname = "/sign-in/signIN.html";
        console.error(e);
        return;
      });
  };
}

const submitBtn = document.getElementById("yule_submit");

submitBtn.addEventListener("click", onsubmit);
