function createElements(tag = "div", attributes = {}, othersAttributes = {}, childrens = []) {
  const element = document.createElement(tag);
  Object.keys(attributes).forEach(attribute => element.setAttribute(attribute, attributes[attribute]));
  Object.keys(othersAttributes).forEach(attribute => element[attribute] = othersAttributes[attribute]);
  childrens.forEach(child => element.appendChild(createElements(child.tag, child.attributes, child.othersAttributes, child.childrens)));

  return element;
}

document.querySelectorAll("[data-modal-controller]").forEach(function (button) {
  button.addEventListener("click", function () {
    var modal = document.querySelector("[data-modal='" + this.dataset.modalController + "']");

    if (modal){
      modal.classList.add("open");
      const close = modal.querySelector(".modal-close");
      if (close) close.addEventListener("click", () => modal.classList.remove("open"));
    }
  });
});

document.querySelectorAll("[data-modal]").forEach(function (modal) {
  document.addEventListener("keyup", (event) => (event.keyCode === 27) ? modal.classList.remove("open") : null);
  modal.addEventListener("click", (event) => (event.target === modal) ? modal.classList.remove("open") : null);
});

document.querySelectorAll("[data-modal-conclude]").forEach(function (button) {
  button.addEventListener("click", function () {
    var modal = document.querySelector("[data-modal='" + this.dataset.modalConclude + "']");
    modal.classList.remove("open");
  });
});

document.querySelectorAll("[data-modal-cancel]").forEach(function (button) {
  button.addEventListener("click", function () {
    var modal = document.querySelector("[data-modal='" + this.dataset.modalCancel + "']");
    modal.classList.remove("open");

    if (modal) modal.querySelectorAll("input").forEach((input) => input.value = "");
  });
});