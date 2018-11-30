$(function() {
    loadEvents();
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
        events: events(),
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
  var loadEvents = function() {
    $.getScript("events.js", function(){
    });
  }
  var signUpForEvent = function(calEvent) {
    //query event to see if
    if(window.confirm("Sign up for "+calEvent.title+" at "+calEvent.start.format("YYYY-MM-DD")+"?")){
      window.alert("Signed Up");
    }
    else {
      //do nothing canceled
    }
  }