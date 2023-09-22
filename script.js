// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Event listener for save button
  $(".saveBtn").on("click", function() {

    let blockHour = $(this).parent().attr("id").split("-")[1];
    let eventText = $(this).siblings("textarea").val();

    // Save event to local storage
    localStorage.setItem(blockHour, eventText);

    // Creating the notification of adding to local storage
    if (!$("#notification").length) {
      let notification = $('<div id="notification">Appointment Added to local storage <i class="fas fa-check"></i></div>');
      $(".container-fluid").prepend(notification);
    }
    // Displaying the notification
    $("#notification").slideDown(300).delay(3000).slideUp(300);
  });

  let currentHour = dayjs().hour();
  console.log(currentHour);

  // Loop to each time block to compare id of current hour with block hour
  $(".time-block").each(function() {
    let blockHour = parseInt($(this).attr("id").split("-")[1]);

    if (blockHour < currentHour) {
        $(this).addClass("past");
    } else if (blockHour === currentHour) {
        $(this).removeClass("past");
        $(this).addClass("present");
    } else {
        $(this).removeClass("past");
        $(this).addClass("future");
    }
  });

  // Loop through each time block to get saved event from local storage
  $(".time-block").each(function() {
    let blockHour = $(this).attr("id").split("-")[1];
    let savedEvent = localStorage.getItem(blockHour);

    if (savedEvent) {
      $(this).find("textarea").val(savedEvent);
    }
  });

  // Display the current date in the header of the page
  let currentDate = dayjs().format('dddd, MMMM D, YYYY');
  $("#currentDay").text(currentDate);
});