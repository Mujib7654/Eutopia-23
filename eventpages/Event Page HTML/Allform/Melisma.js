
async function onsubmit(){
  var Leadname = document.getElementById("Leadname").value;
    var Lead_collegename= document.getElementById("Lead_collegename").value;
    var Lead_whatsnum = document.getElementById("Lead_whatsnum").value;
    var Lead_Altnum = document.getElementById("Lead_Altnum").value;
    var mem1name= document.getElementById("mem1name").value;
    var mem1_collegename= document.getElementById("mem1_collegename").value;
    var mem1_whatsnum= document.getElementById("mem1_whatsnum").value;
    var mem2name= document.getElementById("mem2name").value;
    var mem2_collegename= document.getElementById("mem2_collegename").value;
    var mem2_whatsnum= document.getElementById("mem2_whatsnum").value;
    var mem3name= document.getElementById("mem3name").value;
    var mem3_collegename= document.getElementById("mem3_collegename").value;
    var mem3_whatsnum= document.getElementById("mem3_whatsnum").value;
    var lyrics = document.getElementById("lyrics").value;
    var lang= document.getElementById("lang").value;
    var details ={Leadname,Lead_collegename,Lead_whatsnum,Lead_Altnum,mem1name,mem1_collegename,mem1_whatsnum,mem2name,mem2_collegename,mem2_whatsnum,mem3name,mem3_collegename,mem3_whatsnum,lyrics,lang};

    const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);

  const dataToSend = {
    details: JSON.stringify(details),
    eventId: "177c6f7c-6341-471b-93b5-add0ed018b68",
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
          name: "Melisma Registration",
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

const submitBtn = document.getElementById("melisma_submit");

submitBtn.addEventListener("click", onsubmit);