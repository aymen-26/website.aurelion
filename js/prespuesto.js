const loader = document.getElementById("animacion-pantalla-carga");

window.addEventListener("load", () => {
  const minTime = 2000;

  setTimeout(() => {
    loader.classList.add("fade-out");

    loader.addEventListener("transitionend", () => {
      loader.remove();
    });
  }, minTime);
});

let basePrice = 41000;

let selectedOptionPrice = 0;
let selectedPiastPrice = 0;
let selectedTicketPrice = 0;

// STATE
let formSubmitted = false;
let colorSelected = false;

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".opcion-tamaño").forEach(el => {
    const randomPrice = Math.floor(Math.random() * 5000) + 1000;
    el.dataset.price = randomPrice;
  });

  updateTotal();
});



function applyOption(div) {
  const button = div.querySelector(".Ampliar-boton");
  const price = parseInt(div.dataset.price);

  const isSelected = div.classList.contains("selected");


  if (isSelected) {
    div.classList.remove("selected");
    button.textContent = "Ampliar";
    button.classList.remove("applied");
    button.disabled = false;
  
    selectedOptionPrice -= price;
  } 
  else {
    document.querySelectorAll(".opcion-tamaño.selected").forEach(el => {
      const btn = el.querySelector(".Ampliar-boton");
      const oldPrice = parseInt(el.dataset.price);
  
      el.classList.remove("selected");
      btn.textContent = "Ampliar";
      btn.classList.remove("applied");
      btn.disabled = false;
  
      selectedOptionPrice -= oldPrice;
    });
  
    div.classList.add("selected");
    button.textContent = "Seleccionado";   
    button.classList.add("applied");
    button.disabled = true;
  
    selectedOptionPrice += price;
  }

  colorSelected = document.querySelector(".opcion-tamaño.selected") !== null;

  updateTotal();
}



document.querySelectorAll(".piast").forEach((piast) => {
  const checkbox = piast.querySelector(".hty");

  if (!piast.dataset.price) {
    piast.dataset.price = Math.floor(Math.random() * 3000) + 500;
  }

  const price = parseInt(piast.dataset.price);

  function toggle(active) {
    piast.classList.toggle("active", active);

    selectedPiastPrice += active ? price : -price;

    updateTotal();
  }

  piast.addEventListener("click", (e) => {
    if (e.target.tagName !== "INPUT") {
      checkbox.checked = !checkbox.checked;
    }
    toggle(checkbox.checked);
  });

  checkbox.addEventListener("change", () => {
    toggle(checkbox.checked);
  });
});



function selectTicket(el) {
  const options = document.querySelectorAll(".opcion-tamaño-0");
  const price = parseInt(el.dataset.price);

  if (el.classList.contains("selected")) {
    el.classList.remove("selected");
    selectedTicketPrice = 0;
  } else {
    options.forEach(o => o.classList.remove("selected"));
    el.classList.add("selected");
    selectedTicketPrice = price;
  }

  updateTotal();
}



function submitForm(button) {
  let valid = true;

  function check(id, pattern, message) {
    const input = document.getElementById(id);
    const error = document.getElementById(id + "Error");

    if (!pattern.test(input.value)) {
      error.innerText = message;
      error.style.display = "block";
      input.style.border = "2px solid red";
      valid = false;
    } else {
      error.style.display = "none";
      input.style.border = "2px solid black";
    }
  }

  check("name", /^[A-Za-z]{1,15}$/, "Máximo 15 letras solamente.");
  check("surname", /^[A-Za-z]{1,40}$/, "Máximo 40 letras solamente.");
  check("phone", /^\d{9}$/, "Debe tener 9 dígitos.");
  check("email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Correo electrónico inválido.");

  if (valid) {
    button.textContent = "Enviado";
    button.classList.add("Enviado");
    button.disabled = true;

    formSubmitted = true;
  }
}


function updateTotal() {
  const duration = parseInt(document.getElementById("duration")?.value) || 1;
  const ticketCount = parseInt(document.getElementById("ticketSlider")?.value) || 1;

  const discount = Math.min(duration * 0.0025, 0.2);

  const subtotal =
    basePrice +
    selectedOptionPrice +
    selectedPiastPrice +
    selectedTicketPrice;

  const finalPrice =
    (subtotal * (1 - discount)) * ticketCount;

  const totalEl = document.getElementById("totalPrice");
  if (totalEl) {
    totalEl.innerText = finalPrice.toFixed(2);
  }
}



document.addEventListener("DOMContentLoaded", () => {
  const duration = document.getElementById("duration");
  const slider = document.getElementById("ticketSlider");

  if (duration) {
    duration.addEventListener("input", updateTotal);
  }

  if (slider) {
    slider.addEventListener("input", function () {
      const count = document.getElementById("ticketCount");
      if (count) count.innerText = this.value;

      updateTotal();
    });
  }
});



function submitPart5(button) {
  let valid = true;

  const colorError = document.getElementById("colorError");
  const checkboxPart1Error = document.getElementById("checkboxPart1Error");
  const formError = document.getElementById("formError");
  const deliveryError = document.getElementById("deliveryError");

 
  if (!colorSelected) {
    colorError.style.display = "block";
    valid = false;
  } else {
    colorError.style.display = "none";
  }

 
  const privacy = document.getElementById("privacyPolicy");
  const confirm = document.getElementById("checkbox-1");

  if (!privacy.checked || !confirm.checked) {
    checkboxPart1Error.style.display = "block";
    valid = false;
  } else {
    checkboxPart1Error.style.display = "none";
  }

 
  const deliverySelected =
    document.querySelector(".opcion-tamaño-0.selected") !== null;

  if (!deliverySelected) {
    deliveryError.style.display = "block";
    valid = false;
  } else {
    deliveryError.style.display = "none";
  }

  
  if (!formSubmitted) {
    formError.style.display = "block";
    valid = false;
  } else {
    formError.style.display = "none";
  }

  
  if (valid) {
    button.textContent = "Enviado";
    button.style.backgroundColor = "#000";
    button.style.color = "#fff";
    button.disabled = true;
  }
}




















