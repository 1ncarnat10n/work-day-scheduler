$(function () {
  $(".saveBtn").on("click", function() {

    let blockHour = $(this).parent().attr("id").split("-")[1];
    let eventText = $(this).siblings("textarea").val();

    localStorage.setItem(blockHour, eventText);

    if (!$("#notification").length) {
      let notification = $('<div id="notification">Appointment Added to local storage <i class="fas fa-check"></i></div>');
      $(".container-fluid").prepend(notification);
    }
    $("#notification").slideDown(300).delay(3000).slideUp(300);
  });

  let currentHour = dayjs().hour();
  console.log(currentHour);

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

  $(".time-block").each(function() {
    let blockHour = $(this).attr("id").split("-")[1];
    let savedEvent = localStorage.getItem(blockHour);

    if (savedEvent) {
      $(this).find("textarea").val(savedEvent);
    }
  });

  let currentDate = dayjs().format('dddd, MMMM D, YYYY');
  $("#currentDay").text(currentDate);
});