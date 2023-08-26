async function onsubmit(){
  var Name = document.getElementById("Name").value;
    var Email= document.getElementById("Email").value;
    var Whatsappnum = document.getElementById("Whatsappnum").value;
    var Institutename = document.getElementById("Institutename").value;
    var standard= document.getElementById("standard").value;
    var Guardname= document.getElementById("Guardname").value;
    var Guardnum= document.getElementById("Guardnum").value;
    var experience= document.getElementById("experience").value;
    var graffiti= document.getElementById("graffiti").value; 
    var details ={Name,Email,Whatsappnum,Institutename,standard,Guardname,Guardnum,experience,graffiti};

    const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);

  const dataToSend = {
    details: JSON.stringify(details),
    eventId: "c6ce27d8-600a-42f4-aa05-aa67544e99f3",
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
        return t.json();
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
          name: "Open Graffiti Session Registration",
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
        console.log("error", e);
        alert("Something went wrong please log in again and try again");
        window.location.pathname = "/sign-in/signIN.html";
        console.error(e);
        return;
      });
  };
}

const submitBtn = document.getElementById("graffiti_submit");

submitBtn.addEventListener("click", onsubmit);