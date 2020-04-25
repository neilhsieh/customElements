class SmileRating extends HTMLElement {
  _value = null;

  get value() {
    return this._value;
  }

  set value(v) {
    this._value = parseInt(v);
    this._updateClasses();
  }

  // Private
  _shadow = null;

  // Retrieves list of emojies
  get _buttons() {
    return [...this._shadow.querySelectorAll("li")];
  }
  connectedCallback() {
    // Set inner html (template) when the component is put/inserted
    this._shadow = this.attachShadow({
      mode: "closed", // Can i access inside the shadow dom with JS (open = yes)
    });

    // Assign initial HTML template
    this._shadow.innerHTML = `
    <style>
    li { 
      display: inline-block;
      opacity: 0.4;
    }

    li.active {
      opacity: 1;
    }
    </style>
    <ul>
      <li data-value="-2">😡</li>
      <li data-value="-1">☹️</li>
      <li data-value="0">😐</li>
      <li data-value="1">🙂</li>
      <li data-value="2">😁</li>
    </ul>`;

    // Set up all event listeners
    this._buttons.forEach((li) => {
      li.addEventListener("click", () => {
        this.value = parseInt(li.getAttribute("data-value"));
      });
    });
  }

  // Listener for button events (ie. like a lifecycle)
  _updateClasses() {
    this._buttons.forEach((li) => {
      const v = parseInt(li.getAttribute("data-value"));
      if (this.value === v) {
        li.classList.add("active");
      } else {
        li.classList.remove("active");
      }
    });
  }
}

window.customElements.define("smile-rating", SmileRating);
