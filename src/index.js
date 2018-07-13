$(document).ready(function () {
  const memeAdapter = new MemeAdapter()
  const userAdapter = new UserAdapter()
  const userController = new UserController()

//--------------------------Sidebar--------------------------//

  let trigger = $('.hamburger'),
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

//--------------------------Chat--------------------------//
// source: https://bootsnipp.com/snippets/6XlB5

  let me = {};

  let you = {};

  function formatAMPM(date) {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      let strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
  }

  //-- No use time. It is a javaScript effect.
  function insertChat(who, text, time = 0){
      let control = "";
      let date = formatAMPM(new Date());

      if (who == "me"){
        control = '<li style="width:100%;">' +
                    '<div class="msj-rta macro">' +
                      '<div class="text text-r">' +
                        '<p>'+text+'</p>' +
                        '<p><small>'+date+'</small></p>' +
                      '</div>' +
                    `<div class="avatar" style="padding:0px 0px 0px 10px !important">
                      <img src="./imgs/avatar_placeholder-3104431c573177705f4946f586a4eab5.png"></img>
                    </div>` +
                  '</li>';
      }else if (who=="bot") {
        control = `
        <li style="width:100%">
          <div class="side-crop">
            <div><!-- padding for the gif --></div>
            <img id="gif-bot"src="./imgs/babygif.gif" alt="gif-bot">
          </div>
          <div class="msj macro">
            <div class="text text-l">
              <p>${text}</p>
              <p><small>${date}</small></p>
            </div>
          </div>

        </li>
        `
      }else{
        control = '<li style="width:100%">' +
                    '<div class="msj macro">' +
                      '<div class="text text-l">' +
                        '<p>'+ text +'</p>' +
                        '<p><small>'+date+'</small></p>' +
                      '</div>' +
                    '</div>' +
                  '</li>';
      }

      setTimeout(
          function(){
              $("ul").append(control);

          }, time);

  }

  function resetChat(){
      $("ul").empty();
  }

  $(".mytext").on("keyup", function(e){
      if (e.which == 13){
          let text = $(this).val();
          if (text !== ""){
              insertChat("me", text);
              $(this).val('');
          }
      }
  });

  //-- Clear Chat
  // resetChat();

  //-- Print Messages
  insertChat("bot", "WELCOME TO GIMEME, GET YOUR FRESH GIF MEME BY REPLYING WITH A SEARCH", 500);
  insertChat("you", "Hi, Pablo", 1500);
  insertChat("me", "What would you like to talk about today?", 3500);
  insertChat("you", "Tell me a joke",4000);
  insertChat("me", "Spaceman: Computer! Computer! Do we bring battery?!", 5500);
  insertChat("you", "LOL", 6500);


//-- NOTE: No use time on insertChat.


});
