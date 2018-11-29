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
        events: events(),
        defaultTimedEventDuration: '00:30:00',
        forceEventDuration: true,
        eventBackgroundColor: '#337ab7',
        editable: false,
        height: screen.height - 160,
        timezone: 'America/Chicago',
      });
  }
  var getCalendars = function() {
    $cal = $('.cal');
  }
  var loadEvents = function() {
    $.getScript("events.js", function(){
    });
  }