document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const toast = document.getElementById("toast");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const errorMessages = form.querySelectorAll(".error-msg");
      errorMessages.forEach(msg => msg.remove());
      const errorBorders = form.querySelectorAll(".error-border");
      errorBorders.forEach(el => el.classList.remove("border-red-500", "focus:ring-red-500"));
  
      let isValid = true;
  
      const firstName = form.querySelector("input[name='first-name']");
      const lastName = form.querySelector("input[name='last-name']");
      const email = form.querySelector("input[type='email']");
      const message = form.querySelector("textarea");
      const consent = form.querySelector("#consent");
  
      function showError(input, msg) {
        input.classList.add("border-red-500", "focus:ring-red-500", "error-border");
        const error = document.createElement("p");
        error.textContent = msg;
        error.className = "error-msg text-sm text-red-600 mt-1";
        input.parentElement.appendChild(error);
        isValid = false;
      }
  
      if (!firstName.value.trim()) {
        showError(firstName, "This field is required");
      }
  
      if (!lastName.value.trim()) {
        showError(lastName, "This field is required");
      }
  
      if (!email.value.trim()) {
        showError(email, "This field is required");
      } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
        showError(email, "Please enter a valid email address");
      }
  
      if (!message.value.trim()) {
        showError(message, "This field is required");
      }
  
      const queryRadios = form.querySelectorAll("input[name='query']");
      const queryWrapper = form.querySelector("#query-wrapper");
      const selectedQuery = Array.from(queryRadios).some(r => r.checked);
      if (!selectedQuery) {
        const error = document.createElement("p");
        error.textContent = "Please select a query type";
        error.className = "error-msg text-sm text-red-600 mt-1";
        queryWrapper.appendChild(error);
        isValid = false;
      }
  
      if (!consent.checked) {
        const error = document.createElement("p");
        error.textContent = "To submit this form, please consent to being contacted";
        error.className = "error-msg text-sm text-red-600 mt-1";
        consent.parentElement.appendChild(error);
        isValid = false;
      }
  
      if (!isValid) return;
  
      // Show toast
      toast.innerHTML = `
        <strong class="block font-semibold"> Message Sent!</strong>
        <span class="text-sm">Thanks for completing the form. We'll be in touch soon!</span>
      `;
      toast.classList.remove("hidden");
      setTimeout(() => toast.classList.add("hidden"), 4000);
  
      form.reset();
    });
  });