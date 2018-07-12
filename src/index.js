$(document).ready(function () {
  const memeAdapter = new MemeAdapter()
  const userAdapter = new UserAdapter()
  const userController = new UserController()

//--------------------------Sidebar--------------------------//

  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     isClosed = false;

    trigger.click(function () {
      hamburger_cross();
    });

    function hamburger_cross() {

      if (isClosed == true) {
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }

  $('[data-toggle="offcanvas"]').click(function () {
    $('#wrapper').toggleClass('toggled');
  });

//--------------------------APP--------------------------//
  $('#signup-btn').click(()=>{
    $('.homepage').css('visibility','hidden')
    $('#container').html(userController.renderSignup())
  })

  $('#login-btn').click(()=>{
    $('.homepage').css('visibility','hidden')
    $('#container').html(userController.renderLogin())
  })

  document.querySelector('.glitch').remove()
  $('.homepage').css('visibility','hidden')



});
