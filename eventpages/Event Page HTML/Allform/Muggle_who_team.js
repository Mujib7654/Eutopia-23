async function onsubmit(){
  var mem1name = document.getElementById("mem1name").value;
    var mem1_collegename = document.getElementById("mem1_collegename").value;
    var mem1_mail= document.getElementById("mem1_mail").value;
    var mem1_stream = document.getElementById("mem1_stream").value;
    var mem1_depart= document.getElementById("mem1_depart").value;
    var Whatsappnum_mem1 = document.getElementById("Whatsappnum_mem1").value;
    var Altnum_mem1= document.getElementById("Altnum_mem1").value;
    var mem2name = document.getElementById("mem2name").value;
    var mem2_collegename = document.getElementById("mem2_collegename").value;
    var mem2_mail= document.getElementById("mem2_mail").value;
    var mem2_stream = document.getElementById("mem2_stream").value;
    var mem2_depart= document.getElementById("mem2_depart").value;
    var Whatsappnum_mem2 = document.getElementById("Whatsappnum_mem2").value;
    var Altnum_mem2= document.getElementById("Altnum_mem2").value;
    var details ={mem1name,mem1_collegename,mem1_mail,mem1_stream,mem1_depart,Whatsappnum_mem1,Altnum_mem1,mem2name,mem2_collegename,mem2_mail,mem2_stream,mem2_depart,Whatsappnum_mem2,Altnum_mem2};

    const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);

  const dataToSend = {
    details: JSON.stringify(details),
    eventId: "76471fc3-96b8-49e7-9ac3-b6328a0dbb48",
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
          name: "Muggle Who Registration",
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

const submitBtn = document.getElementById("muggle_submit");

submitBtn.addEventListener("click", onsubmit);