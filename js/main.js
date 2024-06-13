(function ($) {
    "use strict";

    // loader
    var loader = function () {
        setTimeout(function () {
            if ($('#loader').length > 0) {
                $('#loader').removeClass('show');
            }
        }, 1);
    };
    loader();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });


    //nav toggle
    $('.navTrigger').click(function () {
        $(this).toggleClass('active');
        console.log("Clicked menu");
        $("#mainListDiv").toggleClass("show_list");
        $("#mainListDiv").fadeIn();
    
    });  

    
    // Dropdown on mouse hover
    $('.navbar-nav .dropdown').hover(function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(200);
      }, function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(200);
      });

    
    // const $dropdown = $(".dropdown");
    // const $dropdownToggle = $(".dropdown-toggle");
    // const $dropdownMenu = $(".dropdown-menu");
    // const showClass = "show";
    
    // $(window).on("load resize", function(dropdown) {
    //     if (this.matchMedia("(min-width: 992px)").matches) {
    //         $dropdown.hover(
    //         function() {
    //             const $this = $(this);
    //             $this.addClass(showClass);
    //             $this.find($dropdownToggle).attr("aria-expanded", "true");
    //             $this.find($dropdownMenu).addClass(showClass);
    //         },
    //         function() {
    //             const $this = $(this);
    //             $this.removeClass(showClass);
    //             $this.find($dropdownToggle).attr("aria-expanded", "false");
    //             $this.find($dropdownMenu).removeClass(showClass);
    //         }
    //         );
    //     } else {
    //         $dropdown.off("mouseenter mouseleave");
    //     }
    // });


    // Facts counter
    // $('[data-toggle="counter-up"]').counterUp({
    //     delay: 10,
    //     time: 2000
    // });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });




    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 45,
        dots: false,
        loop: true,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:4
            },
            768:{
                items:6
            },
            992:{
                items:8
            }
        }
    });
    
})(jQuery);

  
        
/* Filter - Isotope */
/* Filter - Isotope */
const gridCheck = document.querySelector('.grid');

if (gridCheck !== null) { 
	// init Isotope
	var iso = new Isotope( '.grid', {
		itemSelector: '.element-item',
		layoutMode: 'fitRows'
	});

	// bind filter button click
	var filtersElem = document.querySelector('.filters-button-group');
	filtersElem.addEventListener( 'click', function( event ) {
		// only work with buttons
		if ( !matchesSelector( event.target, 'button' ) )  {
			return;
		}
		var filterValue = event.target.getAttribute('data-filter');
		// use matching filter function
		iso.arrange({ filter: filterValue });
	});
	
	// change is-checked class on buttons
	var buttonGroups = document.querySelectorAll('.button-group');
	for ( var i=0, len = buttonGroups.length; i < len; i++ ) {
		var buttonGroup = buttonGroups[i];
		radioButtonGroup( buttonGroup );
	}
	
	function radioButtonGroup( buttonGroup ) {
		buttonGroup.addEventListener( 'click', function( event ) {
			// only work with buttons
			if ( !matchesSelector( event.target, 'button' ) )  {
				return;
			}
			buttonGroup.querySelector('.is-checked').classList.remove('is-checked');
			event.target.classList.add('is-checked');
		});
	}
}


//paymentgate
const payButton = document.getElementById('payButton');
const payName = document.getElementById('name');
const payEmail = document.getElementById('email');
const payAmount = document.getElementById('payButton');

var paymentForm = document.getElementById('paymentForm');

if (paymentForm) {

    paymentForm.addEventListener('submit', payWithPaystack, false);

    function payWithPaystack(e) {

        e.preventDefault();

    let handler = PaystackPop.setup({
        key: 'pk_live_3ef1322f72b1725e545a43f3b16c01bbe5d437a3', 
        email: payEmail.value,
        amount: payAmount.value * 100, 
        currency: 'ZAR',
        label: payName.value,

        callback: function(response) {

            var reference = response.reference;

            // Redirect to another page with the reference in the URL
            window.location.href = '/check-out/payment-success.html?reference=' + reference;
        },

        onClose: function() {
            
            Swal.fire({
                html: '<svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 24 24"><path fill="none" stroke="#f20707" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 14.828L12.001 12m2.828-2.828L12.001 12m0 0L9.172 9.172M12.001 12l2.828 2.828M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10" /></svg><p class="sweetAlert">Payment Canceled. Please try again</p>',
                timer: 2000,
                showConfirmButton: false,
                showClass: {
                  popup: `
                    animate__animated
                    animate__zoomIn
                    animate__faster
                  `
                },
                hideClass: {
                  popup: `
                    animate__animated
                    animate__zoomOut
                    animate__faster
                  `
                }
              });

        }

    });

    handler.openIframe();

    }


}  

//success payment page 
window.onload = function() {
   
    var urlParams = new URLSearchParams(window.location.search);
    var reference = urlParams.get('reference');
    var referenceDisplay = document.getElementById('referenceDisplay')
    
    if (referenceDisplay) {
        referenceDisplay.innerText = reference;
    }
}




// FORM SUBMIT
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('form');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      if(validateInputs()){
          sendEmail();
      }
    });
  
    function validateInputs(){
      var name = document.getElementById('name');
      var email = document.getElementById('email');
      var message = document.getElementById('message');
      var subject = document.getElementById('subject');
      
      var nameValue = name.value.trim();
      var emailValue = email.value.trim();
      var subjectValue = subject.value.trim();
      var messageValue = message.value.trim();
      
      let isFormValid = true;
      
      // name validation
      if(nameValue === '') {
          setError(name, 'Your name or company name is required');
          isFormValid = false;
      } else {
          setSuccess(name);
      }
  
      // Email validation
      if(emailValue === '') {
          setError(email, 'Email is required');
          isFormValid = false;
      } else if (!isValidEmail(emailValue)) {
          setError(email, 'Provide a valid email address');
          isFormValid = false;
      } else {
          setSuccess(email);
      }
  
        // subject validation
        if(subjectValue === '') {
            setError(subject, 'Please write your subject');
            isFormValid = false;
        } else {
            setSuccess(subject);
        }
  
      // Message validation
      if(messageValue === '') {
          setError(message, 'Please write your message');
          isFormValid = false;
      } else if (messageValue.length < 5 ) {
          setError(message, "Please write a longer message");
          isFormValid = false;
      } else {
          setSuccess(message);
      }
      
      return isFormValid && checkInputContainers();
    }
  
    function checkInputContainers(){
      const inputContainers = form.querySelectorAll('.input-wrap');
      let result = true;
      inputContainers.forEach((container)=>{
          if(container.classList.contains('error')){
              result = false;
          }
      });
      return result;
    }
  
    // ERROR
    const setError = (element, message) => {
      const inputControl = element.parentElement;
      const errorDisplay = inputControl.querySelector('.error');
  
      errorDisplay.innerText = message;
      inputControl.classList.add('error');
      inputControl.classList.remove('success');
    }
  
    // SUCCESS
    const setSuccess = element => {
      const inputControl = element.parentElement;
      const errorDisplay = inputControl.querySelector('.error');
  
      errorDisplay.innerText = '';
      inputControl.classList.add('success');
      inputControl.classList.remove('error');
    };
  
    // EMAIL FORMAT
    const isValidEmail = email => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  
    function sendEmail() {
      // Get the values from the form inputs
      var nameValue = document.getElementById('name').value.trim();
      var emailValue = document.getElementById('email').value.trim();
      var subjectValue = document.getElementById('subject').value.trim();
      var messageValue = document.getElementById('message').value.trim();
  
      // Check if all fields are filled
      if(nameValue && emailValue && messageValue) {
        // Create a FormData object and append the form values
        var formData = new FormData();
        formData.append('name', nameValue);
        formData.append('email', emailValue);
        formData.append('subject', subjectValue);
        formData.append('message', messageValue);
  
        // Send the form data to 'sendmail.php'
        fetch('sendmail.php', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          if(data.success) {
            // Show success message using SweetAlert2
            Swal.fire({
                icon: 'success',
                html: '<p class="sweetAlert">Your message has been sent</p>',
                timer: 4000,
                showConfirmButton: false,
                showClass: {
                popup: `
                    animate__animated
                    animate__zoomIn
                    animate__faster
                `
                },
                hideClass: {
                popup: `
                    animate__animated
                    animate__zoomOut
                    animate__faster
                `
                }
            })
            form.reset();
          } else {
            // Show error message
            Swal.fire({
            icon: 'error',
            html: '<p class="sweetAlert">There was an error sending your message</p>',
            timer: 4000,
            showConfirmButton: false,
            showClass: {
            popup: `
                animate__animated
                animate__zoomIn
                animate__faster
            `
            },
            hideClass: {
            popup: `
                animate__animated
                animate__zoomOut
                animate__faster
            `
            }
        })
          }
        })
        .catch(error => {
          console.error('Error:', error);
          // Show error message
          Swal.fire({
            icon: 'error',
            html: '<p class="sweetAlert">There was an error sending your message</p>',
            timer: 4000,
            showConfirmButton: false,
            showClass: {
            popup: `
                animate__animated
                animate__zoomIn
                animate__faster
            `
            },
            hideClass: {
            popup: `
                animate__animated
                animate__zoomOut
                animate__faster
            `
            }
        })
        });
      } else {
        // If any field is empty, show an error
        Swal.fire({
            icon: 'error',
            html: '<p class="sweetAlert">Please fill all the fields.</p>',
            timer: 4000,
            showConfirmButton: false,
            showClass: {
            popup: `
                animate__animated
                animate__zoomIn
                animate__faster
            `
            },
            hideClass: {
            popup: `
                animate__animated
                animate__zoomOut
                animate__faster
            `
            }
        })
  
      }
    }
  });
  