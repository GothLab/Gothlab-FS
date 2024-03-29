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
    
    $('#button-container').find('button').first().addClass('active2');
    $('#button-container').find('button').first().addClass('active2');
   
}

// Call the function to generate buttons initially



// Then, if there's a change event in the select, call the function again to regenerate the buttons
$('#font-variant').on('change', function() {
  generateButtonsForSelect();
});

//evenodd

$("#evenodd").on("click", function() {
  // Set the value of the selection to 'evenodd'
  $("#input-fill-rule").val("evenodd").trigger("change");
});

// Click event for the #nonzero button
$("#nonzero").on("click", function() {
  // Set the value of the selection to 'nonzero'
  $("#input-fill-rule").val("nonzero").trigger("change");
});