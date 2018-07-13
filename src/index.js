$(document).ready(function () {
  const memeAdapter = new MemeAdapter()
  const userAdapter = new UserAdapter()
  const userController = new UserController()
  const gifAdapter = new GifAdapter()

//--------------------------Sidebar--------------------------//

  let trigger = $('.hamburger'),
      overlay = $('.overlay'),
      isClosed = false;
  // let botStage = 1;

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
    // $('.homepage').css('visibility','hidden')
    $('.container').html(userController.renderSignup())
  })

  document.addEventListener('submit', e => {
    if (e.target.id === 'signup-form') {
      e.preventDefault()
      userAdapter.createUser(userController.getUser())
      console.log(e.target.id);
      $('.container').html(userController.renderLogin())
    } else if(e.target.id === 'login-form'){
      e.preventDefault()
      userAdapter.getUser(userController.getUserLogin())
        .then(r=>{
          console.log(r);
          userController.renderUser(r.username,r.id)
          startChat()
          addChatListener()
        })
      console.log(e.target.id);
    }
  })

  $('#login-btn').click(()=>{
    // $('.homepage').css('visibility','hidden')
    $('.container').html(userController.renderLogin())
  })

  $('#menu-profile').click(()=>{
    // $('.homepage').css('visibility','hidden')
    $('.container').html(memeAdapter.memeController.renderMeme())
  })

  // document.querySelector('.glitch').remove()
  // $('.homepage').remove()


//--------------------------Chat--------------------------//
// source: https://bootsnipp.com/snippets/6XlB5

  let me = {};
  let you = {};

  let scrolled = false;

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
    scrolled = false;
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
            $(".frame > ul").append(control);

        }, time);

    // $(".frame > ul").scrollTo('ul > li:last', '1000') //needs scrollTo jquery plugin
    // updateScroll()

  } // end function insertChat

  function updateScroll(){
    if(!scrolled){
      let element = document.querySelector(".frame").querySelector('ul');
      element.scrollTop = element.scrollHeight;
    }
  }

  $(".frame > ul").on('scroll', function(){
    scrolled=true;
    console.log(`scrolled${scrolled}`);
  });

  $('#scroll-btn').click(()=>{
    document.querySelector(".frame").querySelector('ul').style.height = '100%'
  })


  function resetChat(){
      $("ul").empty();
  }
    console.log('line 169');
    console.log($(".stage1"));
    function addChatListener(){
      $(".stage1").on("keyup", function(e){
        console.log('KEYS PRESSED');
        if (e.which == 13){
          let text = $(this).val();
          if (text !== "") {
            insertChat("me", text);
            $(this).val('');
            insertChat("botReply", `Is this what you want as your meme?
            "${text}"`, 500); // <---  Needs to be indented like this =/
            $('.stage1').off()
            $('.stage1').switchClass('stage1','stage2')
            confirm(text)
          }
        }

      });

    }


  function confirm(textQuery){
    $(".stage2").on("keyup", function(e){
      if (e.which == 13){
        let text = $(this).val();
        if (text === "yes" || text === "yup" || text === "yeah" || text === "yea" || text === "y") {

          insertChat("me", text);
          $(this).val('');
          insertChat("botReply", "Generating your meme...", 500);

          gifAdapter.search(textQuery)
          .then(data=>{
            console.log(data.data[0]);
            const newGif = new Gif(data.data[0])
            insertChat("botReply", `<img src="${newGif.url}" />`, 500)
          })

        }else{
          insertChat("botReply", "Fine, please tell me your desired meme", 500);

        }

      }

    });
  }

  //-- Clear Chat
  // resetChat();

  //-- Print Messages
  function startChat(){ //call when user logs in
    $('.container').html(`
      <div class="row">

        <div class="col-sm-12 frame">
          <ul>
          </ul>
          <button id="scroll-btn">enable<br /> scroll</button>

          <div>
            <div class="msj-rta macro" style="margin:auto">
              <div class="text text-r">
                <input class="mytext stage1" placeholder="Type a message"/>
              </div>
            </div>
          </div>

        </div>

      </div>
    `)
    insertChat("bot", "Hello, I'm the Memebot. WELCOME TO GIMEME!", 500);
    insertChat("botReply", "GET YOUR VERY OWN FRESH GIF MEME RIGHT NOW", 1500);
    insertChat("botReply", "WHAT IS YOUR MEME?", 3500);
  }
  // insertChat("botReply", "Hi, Pablo", 1500);
  // insertChat("me", "What would you like to talk about today?", 3500);
  // insertChat("botReply", "Tell me a joke",3600);
  // insertChat("me", "Spaceman: Computer! Computer! Do we bring battery?!", 3700);
  // insertChat("botReply", "LOL", 3750);


//-- NOTE: No use time on insertChat.


}); // end document ready
