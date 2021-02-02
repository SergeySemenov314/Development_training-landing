$(document).ready(function () {


  // ------------------------------header menu

  const menuToggle = document.querySelector('#menu-toggle');

  const mobileNavContainer = document.querySelector('#mobile-nav');

  const menuItems = mobileNavContainer.querySelectorAll('.mobile-nav-link');

  menuToggle.onclick = function () {
    menuToggle.classList.toggle('menu-icon-active');
    mobileNavContainer.classList.toggle('mobile-nav-active');
  };

  function menuItemClick(item) {
    item.onclick = function () {
      menuToggle.classList.remove('menu-icon-active');
      mobileNavContainer.classList.remove('mobile-nav-active');
    };

  }

  for (let i = 0; i < menuItems.length; i++) {
    menuItemClick(menuItems[i]);
  }



  // ----------------------------------скрол якорные ссылки

  $('.go-anchor').on('click', function (event) {
    event.preventDefault();

    let sc = $(this).attr("href"),
      dn = $(sc).offset().top;


    $('html, body').animate({
      scrollTop: dn
    }, 1000);

  });

  // ----------------------------latest works filter

  $('.works-top-buttons[filter = "all"]').addClass('works-button-active');

  $('.works-top-buttons[filter]').click(function () {
    if ($(this).attr('filter') === 'all') {
      if ($(this).attr('val') === 'off') {
        $('.works-top-buttons[filter]').attr('val', 'off');
        $(this).attr('val', 'on');
        $('.works-image-wrapper').show(300);

        $('.works-top-buttons').removeClass('works-button-active');
        $(this).addClass('works-button-active');
      }

    } else if ($(this).attr('val') === 'off') {
      $('.works-top-buttons[filter]').attr('val', 'off');
      $(this).attr('val', 'on');
      $('.works-image-wrapper').hide(300);
      let filter = $(this).attr('filter');
      $(".works-image-wrapper[filter = " + filter + "]").show(300);

      $('.works-top-buttons').removeClass('works-button-active');
      $(this).addClass('works-button-active');

    }
  });

  //------------------------------------ team-slider----------------------

  $('.team-slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    arrows: false,
    dots: true,
    dotsClass: "slider-dots-style",
    responsive: [{
        breakpoint: 1040,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],


  });




  //-----------------------------check  form----------

  let form = document.querySelector('.contact-form');
  let inputName = document.querySelector('#inputName');
  let inputEmail = document.querySelector('#inputEmail');
  let textarea = document.querySelector('#textarea');

  let errorRequiredName = document.querySelector('.error-required-name');

  let invalidMessagesEmail = document.querySelector('.invalid-messages-email');
  let errorRequiredEmail = document.querySelector('.error-required-email');
  let errorMinlengthEmail = document.querySelector('.error-minlength-email');
  let errorTypeEmail = document.querySelector('.error-type-email');

  let invalidMessagesTextarea = document.querySelector('.invalid-messages-textarea');
  let errorMinlengthTextarea = document.querySelector('.error-minlength-textarea');
  let errorRequiredTextarea = document.querySelector('.error-required-textarea');

  //------------------------ Функция. Попытка уменьшить код

  function checkingEmail (){
    if (inputEmail.validity.tooShort || inputEmail.validity.typeMismatch) {
      invalidMessagesEmail.style.display = "block";
    }

    if (inputEmail.validity.tooShort) {
      errorMinlengthEmail.style.display = "block";
    }

    if (inputEmail.validity.typeMismatch) {
      errorTypeEmail.style.display = "block";
    }
  }

  form.noValidate = true; // отключение HTML валидацию

  // -------------------------------------последовательная проверка элементов формы при submit

  form.addEventListener('submit', function (evt) {

    if (inputName.value.trim() === '' || !inputName.validity.valid || inputEmail.value.trim() === '' || !inputEmail.validity.valid || textarea.value.trim() === '' || !textarea.validity.valid) {

      if (inputName.value.trim() === '' || inputName.validity.tooShort) {
        errorRequiredName.style.display = "block";

      } else if (inputEmail.value.trim() === '') {
        invalidMessagesEmail.style.display = "block"
        errorRequiredEmail.style.display = "block";

      } else if (inputEmail.validity.tooShort || inputEmail.validity.typeMismatch) {
        checkingEmail ();
      } else if (textarea.value.trim() === '') {
        invalidMessagesTextarea.style.display = "block";
        errorRequiredTextarea.style.display = "block";
      } else if (textarea.validity.tooShort) {
        invalidMessagesTextarea.style.display = "block";
        errorMinlengthTextarea.style.display = "block";
      }

      setTimeout(() => invalidMessagesEmail.style.display = "none", 2000);
      setTimeout(() => errorRequiredName.style.display = "none", 2000);
      setTimeout(() => invalidMessagesTextarea.style.display = "none", 2000);

      evt.preventDefault();
    }
  });

// ------------------проверки при взаимодействии с inputEmail

  inputEmail.addEventListener('input', function () {
    invalidMessagesEmail.style.display = "none";
    errorRequiredEmail.style.display = "none";
    errorMinlengthEmail.style.display = "none";
    errorTypeEmail.style.display = "none";

    checkingEmail ()
  });

  inputEmail.addEventListener("focus", function () {
    checkingEmail ()
  });

  inputEmail.addEventListener("blur", function () {
    invalidMessagesEmail.style.display = "none";

  });

  //--------------------------------------- проверки при взаимодействии с textarea


  textarea.addEventListener('input', function () {
    invalidMessagesTextarea.style.display = "none";
    errorMinlengthTextarea.style.display = "none";
    errorRequiredTextarea.style.display = "none";

    if (textarea.validity.tooShort) {
      invalidMessagesTextarea.style.display = "block";
      errorMinlengthTextarea.style.display = "block";
    }

  });

  textarea.addEventListener("focus", function () {
    if (textarea.validity.tooShort) {
      invalidMessagesTextarea.style.display = "block";
      errorMinlengthTextarea.style.display = "block";
    }

  });

  textarea.addEventListener("blur", function () {
    invalidMessagesTextarea.style.display = "none";

  });



});