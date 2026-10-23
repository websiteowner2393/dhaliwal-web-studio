'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    if (select) elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

if (lastClickedBtn) {
  for (let i = 0; i < filterBtn.length; i++) {

    filterBtn[i].addEventListener("click", function () {

      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;

    });

  }
}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input fields for live validation
if (form && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }

  // Handle form submission honestly (No fake success message)
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const statusBox = document.querySelector("[data-form-status]");
    if (statusBox) {
      const nameVal = encodeURIComponent(document.querySelector("#contact-name")?.value || "");
      const subjectVal = encodeURIComponent(document.querySelector("#contact-subject")?.value || "Project Inquiry");
      const messageVal = encodeURIComponent(document.querySelector("#contact-message")?.value || "");
      const mailtoLink = `mailto:jotdaman2393@gmail.com?subject=${subjectVal}&body=Hi%20Dhaliwal%20Web%20Studio,%0A%0A${messageVal}%0A%0AFrom:%20${nameVal}`;

      statusBox.innerHTML = `
        <div class="status-notice-content">
          <div class="status-notice-header">
            <ion-icon name="information-circle-outline"></ion-icon>
            <span>Notice: Direct Form Delivery Not Configured</span>
          </div>
          <p class="status-notice-desc">
            Your form inputs are valid! However, this website is currently a static frontend running without a connected form backend or email service, so direct transmission is not yet configured. No message has been delivered automatically.
          </p>
          <p class="status-notice-help">
            You can send your message directly to <strong>jotdaman2393@gmail.com</strong> using your default email client:
          </p>
          <div class="status-notice-actions">
            <a href="${mailtoLink}" class="btn-mailto-fallback">
              <ion-icon name="mail-outline"></ion-icon>
              <span>Send via Email Client to jotdaman2393@gmail.com</span>
            </a>
          </div>
        </div>
      `;
      statusBox.style.display = "block";
      statusBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// navigation function
const navigateToPage = function (targetPageName) {
  let target = (targetPageName || "").trim().toLowerCase();
  if (target === "projects") target = "portfolio";

  for (let i = 0; i < pages.length; i++) {
    if (pages[i].dataset.page === target) {
      pages[i].classList.add("active");
      window.scrollTo(0, 0);
    } else {
      pages[i].classList.remove("active");
    }
  }

  for (let i = 0; i < navigationLinks.length; i++) {
    if (navigationLinks[i].textContent.trim().toLowerCase() === target) {
      navigationLinks[i].classList.add("active");
    } else {
      navigationLinks[i].classList.remove("active");
    }
  }
};

// add event to all nav links
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    navigateToPage(this.textContent.trim().toLowerCase());
  });
}

// add event to all CTA buttons with data-nav-to
const navToButtons = document.querySelectorAll("[data-nav-to]");
for (let i = 0; i < navToButtons.length; i++) {
  navToButtons[i].addEventListener("click", function (e) {
    e.preventDefault();
    navigateToPage(this.dataset.navTo);
  });
}

// project modal functionality
const projectModalContainer = document.querySelector("[data-project-modal-container]");
const projectModalCloseBtn = document.querySelector("[data-project-modal-close-btn]");
const projectModalBtns = document.querySelectorAll("[data-project-modal-btn]");

for (let i = 0; i < projectModalBtns.length; i++) {
  projectModalBtns[i].addEventListener("click", function (e) {
    e.preventDefault();
    if (projectModalContainer) projectModalContainer.classList.add("active");
  });
}

if (projectModalCloseBtn && projectModalContainer) {
  projectModalCloseBtn.addEventListener("click", function () {
    projectModalContainer.classList.remove("active");
  });
}

if (projectModalContainer) {
  projectModalContainer.addEventListener("click", function (e) {
    if (e.target === this || e.target.hasAttribute("data-project-overlay")) {
      this.classList.remove("active");
    }
  });
}