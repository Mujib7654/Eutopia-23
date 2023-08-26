async function onsubmit() {
	var  mem1Name= document.getElementById("mem1Name").value;
	var mem1institutename= document.getElementById("mem1institutename").value;
	var mem1standard_semester= document.getElementById("mem1standard_semester").value;
	var mem1Email = document.getElementById("mem1Email").value;
	var mem1Whatsappnum= document.getElementById("mem1Whatsappnum").value;
    var mem1Altnum = document.getElementById("mem1Altnum").value;
    var mem2Name = document.getElementById("mem2Name").value;
    var mem2institutename = document.getElementById("mem2institutename").value;
    var mem2standard_semester = document.getElementById("mem2standard_semester").value;
    var mem2Email = document.getElementById("mem2Email").value;
    var mem2Whatsappnum = document.getElementById("mem2Whatsappnum").value;
    var mem2Altnum = document.getElementById("mem2Altnum").value;
    var language= document.getElementById("language").value;
    var mem1stance= document.getElementById("mem1stance").value;
	
    var mem2stance= document.getElementById("mem2stance").value;
	
	
	var details = {
        mem1Name ,
		mem1institutename,
        mem1standard_semester,
		mem1Email,
        mem1Whatsappnum,
        mem1Altnum ,
        mem2Name,
        mem2institutename,
        mem2standard_semester,
        mem2Email ,
        mem2Whatsappnum ,
        mem2Altnum ,
        language,
        mem1stance,
        mem2stance

        ,
	};
  
	const script = document.createElement("script");
	script.src = "https://checkout.razorpay.com/v1/checkout.js";
	script.async = true;
	script.defer = true;
	document.body.appendChild(script);
  
	const dataToSend = {
	  details: JSON.stringify(details),
	  eventId: "fcb0880a-514f-4b69-8e54-62eeb6f87040",
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
			name: "Crusade of Conceptions Registration",
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
  
  const submitBtn = document.getElementById("crus_team");

  submitBtn.addEventListener("click", onsubmit);