async function onsubmit() {
  var Collegename = document.getElementById("Collegename").value;
  var Leadname = document.getElementById("Leadname").value;
  var Leadmail = document.getElementById("Leadmail").value;
  var LeadDept = document.getElementById("LeadDept").value;
  var whatsnum = document.getElementById("whatsnum").value;
  var Altnum = document.getElementById("Altnum").value;
  var mem1name = document.getElementById("mem1name").value;
  var mem1dept = document.getElementById("mem1dept").value;
  var mem2name = document.getElementById("mem2name").value;
  var mem2dept = document.getElementById("mem2dept").value;
  var mem3name = document.getElementById("mem3name").value;
  var mem3dept = document.getElementById("mem3dept").value;

  var details = {
    Leadname,
    Collegename,
    Leadmail,
    LeadDept,
    whatsnum,
    Altnum,
    mem1name,
    mem1dept,
    mem2name,
    mem2dept,
    mem3name,
    mem3dept,
  };

  console.log(details);

  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);

  const dataToSend = {
    details: JSON.stringify(details),
    eventId: "84cf6f43-30c3-48d8-af03-f851f8ab8b23",
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
      .then((t) => t.json())
      .then((data) => {
        const options = {
          key: "rzp_live_eHbQVVuI7h7HAQ",
          currency: data.currency,
          amount: data.amount,
          order_id: data.id,
          name: "What If Registration",
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

const submitBtn = document.getElementById("what_if_submit");

submitBtn.addEventListener("click", onsubmit);
