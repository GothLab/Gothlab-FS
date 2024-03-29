$(document).ready(function() {
  $(".font-preview-folder img").click(function() {
	  
	  $('#font-upload-remove').click();
	  
    var src = $(this).attr("src");  // Get the src attribute of the clicked image
    var fontName = src.split("/").pop().replace(/\..+$/, "");  // Extract the font name from the src
    console.log(fontName);
	  // Find and select the input with the matching font name
   // Find and select the option with the matching font name
    var selectedOption = $("#font-select option").filter(function() {
      return $(this).val().replace(/\s/g, "") === fontName.replace(/\s/g, "");
    });

    if (selectedOption.length > 0) {
      selectedOption.prop("selected", true); // Select the option with the matching value
      $('#font-select').trigger('change');
			  generateButtonsForSelect();// Trigger the change event
    }
  });

});