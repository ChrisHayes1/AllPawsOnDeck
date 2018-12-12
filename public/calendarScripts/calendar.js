$(function() {
    document.getElementById("theevents").style.display = "none";
    //showTodaysDate();
    initializeCalendar();
    getCalendars();
    
    //initializeRightCalendar();
    //initializeLeftCalendar();
    //disableEnter();
  });
  
  /* --------------------------initialize calendar-------------------------- */
  var initializeCalendar = function() {
    $('.cal').fullCalendar({
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        // create events
        slotEventOverlap: false,
        events: JSON.parse(document.getElementById('theevents').innerHTML),
        eventBackgroundColor: '#337ab7',
        editable: false,
        height: screen.height - 160,
        timezone: 'America/Chicago',
        eventClick: function(calEvent, jsEvent, view) {
          signUpForEvent(calEvent);
        } 
      });
  }
  var getCalendars = function() {
    $cal = $('.cal');
  }
  var signUpForEvent = function(calEvent) {
    //query event to see if
    if (window.confirm("Sign up for " + calEvent.title + " at " + calEvent.start.format("YYYY-MM-DD") + "?")) {
      //window.alert("Signed Up");

      // The rest of this code assumes you are not using a library.
      // It can be made less wordy if you use one.
      var form = document.createElement("form");
      form.setAttribute("method", "post");
      form.setAttribute("action", "/signupuserforevent");


 
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("event", calEvent);
        form.appendChild(hiddenField);

        var hidden = document.createElement('INPUT');
        hidden.type = 'HIDDEN';
        hidden.name = 'event';
        hidden.value = calEvent.id;
        form.appendChild(hidden);

      //document.body.appendChild(form);
      document.getElementsByTagName('body')[0].appendChild(form);
      form.submit();
    }
    else {
      //do nothing canceled
    }

  }
