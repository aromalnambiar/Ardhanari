$(document).ready(function () {
  var envelope = $("#envelope");
  var btn_open = $("#open");
  var btn_reset = $("#reset");
  var musicBtn = $("#play-music");
  var music = document.getElementById("bg-music");
  var isPlaying = false;

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

  musicBtn.click(function() {
    if (isPlaying) {
      music.pause();
      musicBtn.text("🎵 Play Music");
    } else {
      // Note: User needs to provide a valid audio source or user interaction first for some browsers
      music.play().catch(e => console.log("Audio play failed (user interaction needed or no src):", e));
      musicBtn.text("⏸️ Pause Music");
    }
    isPlaying = !isPlaying;
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
