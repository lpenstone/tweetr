$( document ).ready(function() {
  $("textarea").on( "keyup", function( event ) {
    var count = $(this).val().length;
    var remaining = 140 - count;

    //Styling the counter
    var counter = '';
    if (remaining < 0){
      counter = `<span class="red">${remaining}</span>`;
    } else {
      counter = `<span>${remaining}</span>`
    }

    target = $(this).parent().children().last();
    target.html(counter);
  });
});