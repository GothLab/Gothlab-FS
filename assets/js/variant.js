function generateButtonsForSelect() {
  var select = document.getElementById("font-variant");
  var options = select.options;

  // Clear any existing buttons
  var buttonContainer = document.getElementById("button-container");
  buttonContainer.innerHTML = "";

  // Generate buttons for each option
  for (var i = 0; i < options.length; i++) {
    var option = options[i];
    var button = document.createElement("button");
    button.textContent = option.textContent;
    button.setAttribute("data-value", option.value);

    button.onclick = function() {
      select.value = this.getAttribute("data-value");
      $(select).trigger("change");
    };

    buttonContainer.appendChild(button);
  }
}

// Call the function to generate buttons initially



// Then, if there's a change event in the select, call the function again to regenerate the buttons
$('#font-variant').on('change', function() {
  generateButtonsForSelect();
});