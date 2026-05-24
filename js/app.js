(function () {
  "use strict";

  // --- Slogan ---
  var slogans = ["THINK DIFFENT"];
  var idx = Math.floor(Math.random() * slogans.length);
  document.getElementById("slogan").textContent = slogans[idx];

  // --- Starfield ---
  var canvas = document.getElementById("startrack");
  var offscreen = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  var offCtx = offscreen.getContext("2d");

  var W = canvas.offsetWidth;
  var H = canvas.offsetHeight;
  var scale = 2.6;
  var maxDim = Math.max(W, H);

  canvas.width = offscreen.width = W;
  canvas.height = offscreen.height = H;
  offscreen.width = scale * maxDim;
  offscreen.height = scale * maxDim;

  var stars = [];
  var frame = 0;
  var rotationSpeed = 0.025;

  function rand(min, max) {
    return min + Math.round(Math.random() * (max - min));
  }

  for (var i = 20000; i--; ) {
    stars.push({
      x: rand(-offscreen.width, offscreen.width),
      y: rand(-offscreen.height, offscreen.height),
      size: 1.2,
      color:
        "rgba(" +
        rand(120, 255) +
        "," +
        rand(120, 255) +
        "," +
        rand(120, 255) +
        "," +
        rand(30, 100) / 100 +
        ")",
    });
  }

  function drawStars() {
    for (var i = stars.length; i--; ) {
      var s = stars[i];
      offCtx.beginPath();
      offCtx.arc(s.x, s.y, s.size, 0, 2 * Math.PI, true);
      offCtx.fillStyle = s.color;
      offCtx.closePath();
      offCtx.fill();
    }
  }

  drawStars();

  ctx.fillStyle = "rgba(21,21,21,1)";
  ctx.fillRect(0, 0, W, H);
  ctx.lineCap = "round";
  ctx.translate(W, 0);

  function draw() {
    ctx.drawImage(offscreen, -offscreen.width / 2, -offscreen.height / 2);
    frame++;
    if (frame > 150 && frame % 8 === 0) {
      ctx.fillStyle = "rgba(0,0,0,.04)";
      ctx.fillRect(-3 * maxDim, -3 * maxDim, 6 * maxDim, 6 * maxDim);
    }
    ctx.rotate((rotationSpeed * Math.PI) / 180);
  }

  function loop() {
    requestAnimationFrame(loop);
    draw();
  }

  loop();

  window.addEventListener("resize", function () {
    W = canvas.offsetWidth;
    H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;
    ctx.fillStyle = "rgba(21,21,21,1)";
    ctx.fillRect(0, 0, W, H);
  });

  // --- Scroll behavior ---
  window.addEventListener("scroll", function () {
    var bg = document.querySelector(".background");
    if (window.scrollY > 0.6 * window.innerHeight) {
      bg.classList.add("fixed");
    } else {
      bg.classList.remove("fixed");
    }
  });

  console.log("Nekotora's Flag.Moe Homepage");
})();