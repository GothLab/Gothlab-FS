  $('#size-range').on('input', function() {
    var value = $(this).val();  // Get the value of the range input
    $('#input-size').attr('value', value).trigger('keyup');  // Set the value attribute of the other input and trigger the change event
  });

