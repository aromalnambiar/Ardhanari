$(document).ready(function () {
  var envelope = $("#envelope");
  var btn_open = $("#open");
  var btn_reset = $("#reset");
  var music = document.getElementById("bg-music");
  var isPlaying = false;

  // Loading Screen Logic
  setTimeout(() => {
    $("#loading-text").text("For My Dearest Pappu...");
    $("#start-btn").fadeIn().removeClass("hidden");
    $(".loading-sticker").css("animation", "none"); // Stop bouncing for a calmer feel
  }, 2000); // Simulate 2s loading

  $("#start-btn").click(function() {
    // 1. Play Music (User interaction allows this)
    music.play().then(() => {
        console.log("Music started");
    }).catch(e => console.log("Music failed:", e));

    // 2. Hide Loading Screen
    $("#loading-screen").fadeOut(500, function() {
        $(this).remove(); // Remove from DOM
        
        // 3. Open Envelope automatically after screen is gone
        setTimeout(() => {
            open();
        }, 500);
    });
  });

  // Removed auto-play attempts since valid interaction is now enforced via start button


  envelope.click(function () {
    open();
  });
  btn_open.click(function () {
    open();
  });
  btn_reset.click(function () {
    close();
  });

  function open() {
    envelope.addClass("open").removeClass("close");
    createFloatingHearts();
    // Wait for the envelope open animation to finish, then show modal
    setTimeout(() => {
        $("#full-letter").addClass("visible");
    }, 1500);
  }

  function close() {
    envelope.addClass("close").removeClass("open");
    $("#full-letter").removeClass("visible");
  }

  $(".letter-close").click(function(e) {
      $("#full-letter").removeClass("visible");
  });

  function createFloatingHearts() {
    const container = $(".floating-hearts");
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = $('<div class="float-heart">❤</div>');
            const startLeft = Math.random() * 100;
            const duration = 3 + Math.random() * 4;
            
            heart.css({
                left: startLeft + "%",
                animationDuration: duration + "s"
            });
            
            container.append(heart);
            
            // Remove after animation
            setTimeout(() => {
                heart.remove();
            }, duration * 1000);
        }, i * 300);
    }
  }

  // Create some background floating hearts occasionally
  setInterval(() => {
    const heart = $('<div class="float-heart" style="opacity:0.5; font-size: 15px;">❤</div>');
    const startLeft = Math.random() * 100;
    const duration = 5 + Math.random() * 5;
    
    heart.css({
        left: startLeft + "%",
        animationDuration: duration + "s"
    });
    
    $(".floating-hearts").append(heart);
    
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
  }, 2000);

});
