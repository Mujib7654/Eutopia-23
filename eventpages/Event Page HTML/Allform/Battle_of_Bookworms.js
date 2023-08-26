async function onsubmit() {
  var Teamname = document.getElementById("Teamname").value;
  var mem1name = document.getElementById("mem1name").value;
  var mem1collegename = document.getElementById("mem1collegename").value;
  var mem1mail = document.getElementById("mem1mail").value;
  var mem1num = document.getElementById("mem1num").value;
  var mem1age = document.getElementById("mem1age").value;
  var mem2name = document.getElementById("mem2name").value;
  var mem2collegename = document.getElementById("mem2collegename").value;
  var mem2mail = document.getElementById("mem2mail").value;
  var mem2num = document.getElementById("mem2num").value;
  var mem2age = document.getElementById("mem2age").value;

  var details = {
    Teamname,
    mem1name,
    mem1collegename,
    mem1mail,
    mem1num,
    mem1age,
    mem2name,
    mem2collegename,
    mem2mail,
    mem2num,
    mem2age,

  };

  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);

  const dataToSend = {
    details: JSON.stringify(details),
    eventId: "c2a6b80f-62d7-4207-a2e9-9c11991b1afe",
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
          name: "Battle of Bookworms Registration",
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

const submitBtn = document.getElementById("book_worm");

submitBtn.addEventListener("click", onsubmit);