var pathXX; 

$(document).ready(function() {
    // Load saved settings if available
    loadSavedSettings();

    // Update localStorage on input change
    $('input[type="text"], input[name="tempOption"]').on('input', function() {
      saveSettings();
    });

    // Show/hide custom path input based on radio button state
    $('input[name="tempOption"]').on('change', function() {
      $('#customPathInput').toggle($('#tempCustomPath').prop('checked'));
    });

     
     
     
     
     /*
    function loadSavedSettings() {
      // Load saved settings from localStorage
      const googleApi = localStorage.getItem('googleApi');
      const localLibrary = localStorage.getItem('localLibrary');
      const tempOption = localStorage.getItem('tempOption');
      const customPath = localStorage.getItem('customPath');

      // Set values in the form
      $('#googleApi').val(googleApi);
      $('#localLibrary').val(localLibrary);

      if (tempOption) {
        $(`#temp${tempOption}`).prop('checked', true);
      }

      if (customPath) {
        $('#customPathInput').val(customPath);
      }

      // Show/hide custom path input based on radio button state
      $('#customPathInput').toggle($('#tempCustomPath').prop('checked'));
    }*/
     
     function loadSavedSettings() {
    // Load saved settings from localStorage
    const googleApi = localStorage.getItem('googleApi');
    const localLibrary = localStorage.getItem('localLibrary');
    let tempOption = localStorage.getItem('tempOption');
    const customPath = localStorage.getItem('customPath');

    // Set values in the form
    $('#googleApi').val(googleApi);
    $('#localLibrary').val(localLibrary);

    if (tempOption) {
        // Check the corresponding radio button based on the loaded value
        $(`input[name="tempOption"][value="${tempOption}"]`).prop('checked', true);
    } else {
        // If tempOption is not saved in localStorage, set a default value or handle it as needed
        tempOption = 'documentsPath'; // For example, set a default value
        $('#tempDocumentsPath').prop('checked', true); // Check the default radio button
    }

    // Show/hide custom path input based on radio button state
    $('#customPathInput').toggle($('#tempCustomPath').prop('checked'));

    // Set custom path value if it exists
    if (customPath) {
        $('#customPathInput').val(customPath);
    }
}


     
     
     
     
     
     
     
    function saveSettings() {
      // Get values from the form
      const googleApi = $('#googleApi').val();
      const localLibrary = $('#localLibrary').val();
      const tempOption = $('input[name="tempOption"]:checked').val();
      const customPath = $('#customPathInput').val();

      // Save settings to localStorage
      localStorage.setItem('googleApi', googleApi);
      localStorage.setItem('localLibrary', localLibrary);
      localStorage.setItem('tempOption', tempOption);
      localStorage.setItem('customPath', customPath);
    }
     
     
     
     $('#cog, #inverter').click();
     $('#test9').click();
      pathXX = $('#customPathInput').val();
    
    
    
    ///active for styles
    $('#fill-buttons').find('button').on('click',function(){
        
      $(this).parent().find('.active2').removeClass('active2');
        $(this).addClass('active2')
        
    })
    //active for fill rule
    
    //active for 
    
  });

