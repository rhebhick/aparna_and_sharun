// Interactive Logic for Sharun & Aparna Gen-Z Romantic Engagement Invitation
document.addEventListener("DOMContentLoaded", () => {
  const openInvitationButton = document.getElementById("openInvitation");
  const homeScreen = document.getElementById("screen-home");
  const coupleScreen = document.getElementById("screen-couple");
  const petalLayer = document.getElementById("petalLayer");
  const goldParticles = document.getElementById("goldParticles");
  const toast = document.getElementById("toast");
  const scratchCanvas = document.getElementById("scratchCanvas");
  const scratchRevealFallback = document.getElementById("scratchRevealFallback");
  const googleCalendarButton = document.getElementById("googleCalendar");
  const icsCalendarButton = document.getElementById("icsCalendar");
  const ringShowcase = document.getElementById("ringShowcase");
  const countdownGrid = document.getElementById("countdownGrid");
  const mapPreview = document.getElementById("mapPreview");
  const bgMusic = document.getElementById("bgMusic");
  const soundToggle = document.getElementById("soundToggle");
  const venueMapsUrl = "https://maps.app.goo.gl/aL6wdp8vqfWK5ATL8";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let envelopeOpened = false;
  let scratchReady = false;
  let scratchRevealed = false;

  // Lock scrolling initially until user taps the envelope
  document.body.classList.add("is-locked");

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function bounce(element) {
    if (!element) return;
    element.classList.remove("tap-bounce");
    void element.offsetWidth;
    element.classList.add("tap-bounce");
  }

  function makeTappable(element, onActivate) {
    if (!element) return;
    element.addEventListener("click", onActivate);
    element.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onActivate();
      }
    });
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove("hidden");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.add("hidden"), 2600);
  }

  // Burst of Sparkling Gold Particles
  function burstGold(count = 24) {
    if (!goldParticles) return;
    const total = reducedMotion ? Math.min(6, count) : count;
    for (let index = 0; index < total; index += 1) {
      const particle = document.createElement("span");
      particle.className = "gold-particle";
      const duration = 800 + Math.random() * 900;
      particle.style.left = `${20 + Math.random() * 60}%`;
      particle.style.top = `${30 + Math.random() * 40}%`;
      goldParticles.appendChild(particle);

      requestAnimationFrame(() => {
        particle.style.transition = `transform ${duration}ms cubic-bezier(.22,1,.36,1), opacity ${duration}ms ease`;
        particle.style.opacity = "1";
        particle.style.transform = `translate(${(Math.random() - 0.5) * 160}px, ${-40 - Math.random() * 140}px) scale(${0.5 + Math.random()})`;
      });

      window.setTimeout(() => particle.remove(), duration + 120);
    }
  }

  // Audio Music Controller
  function playMusic() {
    if (!bgMusic) return;
    bgMusic.volume = 0.6;
    const playPromise = bgMusic.play();

    if (playPromise !== undefined) {
      playPromise.then(() => {
        if (soundToggle) {
          soundToggle.classList.remove("hidden");
          soundToggle.setAttribute("aria-pressed", "false");
        }
      }).catch((error) => {
        console.warn("Autoplay interaction fallback triggered:", error);
        if (soundToggle) {
          soundToggle.classList.remove("hidden");
          soundToggle.setAttribute("aria-pressed", "true");
        }
        const retryAudio = () => {
          bgMusic.play().then(() => {
            if (soundToggle) soundToggle.setAttribute("aria-pressed", "false");
          }).catch(() => {});
        };
        document.addEventListener("pointerdown", retryAudio, { once: true });
      });
    }
  }

  if (soundToggle) {
    soundToggle.addEventListener("click", () => {
      if (bgMusic.paused) {
        bgMusic.play();
        soundToggle.setAttribute("aria-pressed", "false");
        showToast("Playing Music 🎶");
      } else {
        bgMusic.pause();
        soundToggle.setAttribute("aria-pressed", "true");
        showToast("Music Paused");
      }
    });
  }

  // Simple Envelope Tap Opening Trigger
  if (openInvitationButton) {
    openInvitationButton.addEventListener("click", () => {
      if (envelopeOpened) return;
      envelopeOpened = true;

      homeScreen.classList.add("is-opening");
      burstGold(28);

      // Play song immediately when envelope is tapped
      playMusic();

      // Unlock scroll & smooth navigate to couple section after flap animation
      window.setTimeout(() => {
        document.body.classList.remove("is-locked");
        if (coupleScreen) {
          coupleScreen.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
        }
      }, 1050);
    });
  }

  // Scroll Reveal Observer for Cards & Text
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".data-reveal").forEach((element) => {
    revealObserver.observe(element);
  });

  // Live Countdown Update (24 September 2026)
  function updateCountdown() {
    const targetDate = new Date("2026-09-24T00:00:00+05:30").getTime();
    const now = Date.now();
    const diff = Math.max(0, targetDate - now);

    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");

    if (days) days.textContent = pad(Math.floor(diff / 86400000));
    if (hours) hours.textContent = pad(Math.floor(diff / 3600000) % 24);
    if (minutes) minutes.textContent = pad(Math.floor(diff / 60000) % 60);
    if (seconds) seconds.textContent = pad(Math.floor(diff / 1000) % 60);
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  // Calendar Event Integration
  if (googleCalendarButton) {
    googleCalendarButton.addEventListener("click", () => {
      const params = new URLSearchParams({
        action: "TEMPLATE",
        text: "Sharun KS & Aparna Muralidharan - Engagement",
        dates: "20260924/20260925",
        details: "Join us for the engagement celebration of Sharun KS & Aparna Muralidharan.",
        location: "Their Home - https://maps.app.goo.gl/aL6wdp8vqfWK5ATL8"
      });
      window.open(`https://calendar.google.com/calendar/render?${params}`, "_blank", "noopener");
    });
  }

  if (icsCalendarButton) {
    icsCalendarButton.addEventListener("click", () => {
      const lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Sharun Aparna Engagement//EN",
        "BEGIN:VEVENT",
        "UID:sharun-aparna-engagement-20260924@example.com",
        "DTSTART;VALUE=DATE:20260924",
        "DTEND;VALUE=DATE:20260925",
        "SUMMARY:Sharun KS & Aparna Muralidharan - Engagement",
        "LOCATION:Their Home",
        "DESCRIPTION:https://maps.app.goo.gl/aL6wdp8vqfWK5ATL8",
        "END:VEVENT",
        "END:VCALENDAR"
      ];
      const url = URL.createObjectURL(new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" }));
      const link = Object.assign(document.createElement("a"), { href: url, download: "sharun-aparna-engagement.ics" });
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    });
  }

  // Tappable Components
  makeTappable(ringShowcase, () => {
    bounce(ringShowcase);
    burstGold(22);
    showToast("Two hearts, one journey");
  });

  makeTappable(countdownGrid, () => {
    bounce(countdownGrid);
    burstGold(18);
    showToast("Counting down every second");
  });

  makeTappable(mapPreview, () => {
    bounce(mapPreview);
    window.open(venueMapsUrl, "_blank", "noopener");
  });

  // Premium Scratch Card Implementation
  function initializeScratchCard() {
    if (scratchReady || !scratchCanvas) return;
    scratchReady = true;

    const ctx = scratchCanvas.getContext("2d");
    const ratio = window.devicePixelRatio || 1;
    const SIZE = 320;
    scratchCanvas.width = SIZE * ratio;
    scratchCanvas.height = SIZE * ratio;
    ctx.scale(ratio, ratio);

    const baseGrad = ctx.createRadialGradient(SIZE * 0.34, SIZE * 0.28, 8, SIZE * 0.5, SIZE * 0.52, SIZE * 0.74);
    baseGrad.addColorStop(0, "#FFF4C6");
    baseGrad.addColorStop(0.18, "#F0D170");
    baseGrad.addColorStop(0.46, "#D4AF37");
    baseGrad.addColorStop(0.72, "#B48A22");
    baseGrad.addColorStop(1, "#7A5A0C");
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, SIZE, SIZE);

    for (let s = -SIZE; s < SIZE * 2; s += 18) {
      const stripGrad = ctx.createLinearGradient(s, 0, s + 14, SIZE);
      stripGrad.addColorStop(0, "rgba(255,255,255,0)");
      stripGrad.addColorStop(0.45, "rgba(255,255,255,0.28)");
      stripGrad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = stripGrad;
      ctx.fillRect(s, 0, 7, SIZE);
    }

    ctx.strokeStyle = "rgba(90, 60, 10, 0.12)";
    ctx.lineWidth = 1;
    for (let r = 28; r < SIZE - 24; r += 22) {
      ctx.beginPath();
      ctx.arc(SIZE / 2, SIZE / 2, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.save();
    ctx.translate(SIZE / 2, SIZE / 2 - 8);
    ctx.strokeStyle = "rgba(255, 248, 220, 0.55)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(-18, 0);
    ctx.lineTo(-6, 0);
    ctx.moveTo(6, 0);
    ctx.lineTo(18, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -7);
    ctx.lineTo(4, 0);
    ctx.lineTo(0, 7);
    ctx.lineTo(-4, 0);
    ctx.closePath();
    ctx.fillStyle = "rgba(255, 248, 220, 0.72)";
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.translate(SIZE / 2, SIZE / 2 + 18);
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(62, 42, 8, 0.78)";
    ctx.font = "700 12px 'Plus Jakarta Sans', sans-serif";
    ctx.letterSpacing = "0.18em";
    ctx.fillText("SCRATCH TO REVEAL", 0, 0);
    ctx.font = "500 11px 'Cormorant Garamond', serif";
    ctx.fillStyle = "rgba(62, 42, 8, 0.55)";
    ctx.fillText("A date waits beneath the foil", 0, 22);
    ctx.restore();

    // Progress bar reference
    const progressFill = document.getElementById("scratchProgressFill");
    const hintText = document.getElementById("scratchHintText");
    const heartEl = document.getElementById("scratchHeart");

    let drawing = false;
    let lastX = 0;
    let lastY = 0;
    let scratchParticles = [];

    // Spawn sparkle on scratch
    function spawnScratchSparkle(x, y) {
      if (reducedMotion) return;
      const rect = scratchCanvas.getBoundingClientRect();
      const absX = rect.left + (x / SIZE) * rect.width;
      const absY = rect.top + (y / SIZE) * rect.height;
      const spark = document.createElement("span");
      spark.textContent = ["✦", "✧", "•", "✦"][Math.floor(Math.random() * 4)];
      spark.style.cssText = `
        position:fixed; left:${absX}px; top:${absY}px;
        pointer-events:none; font-size:${10 + Math.random() * 10}px;
        z-index:999; transform:translate(-50%,-50%) scale(0);
        transition: transform 0.4s ease, opacity 0.5s ease 0.1s;
        opacity: 1;
      `;
      document.body.appendChild(spark);
      requestAnimationFrame(() => {
        spark.style.transform = `translate(-50%,-100%) scale(${0.8 + Math.random() * 0.6}) rotate(${(Math.random() - 0.5) * 40}deg)`;
        spark.style.opacity = "0";
      });
      setTimeout(() => spark.remove(), 600);
    }

    let sparkleThrottle = 0;

    function eraseAt(x, y) {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 52, 0, Math.PI * 2);
      ctx.fill();

      if (lastX && lastY) {
        ctx.lineWidth = 104;
        ctx.lineCap = "round";
        ctx.strokeStyle = "rgba(0,0,0,1)";
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
      lastX = x;
      lastY = y;

      // Sparkle every ~60ms
      const now = Date.now();
      if (now - sparkleThrottle > 60) {
        sparkleThrottle = now;
        spawnScratchSparkle(x, y);
      }

      checkProgress();
    }

    function checkProgress() {
      if (scratchRevealed) return;
      // Sample every 8th pixel for performance
      const pixels = ctx.getImageData(0, 0, scratchCanvas.width, scratchCanvas.height).data;
      let transparent = 0;
      let total = 0;
      for (let i = 3; i < pixels.length; i += 32) {
        total++;
        if (pixels[i] < 64) transparent++;
      }
      const pct = transparent / total;

      // Update progress bar
      if (progressFill) progressFill.style.width = `${Math.min(100, Math.round(pct * 100 / 0.25 * 100))}%`;
      if (hintText && pct > 0.05) hintText.textContent = `${Math.min(100, Math.round(pct / 0.25 * 100))}% revealed`;

      if (pct > 0.25) reveal();
    }

    const onPointerMove = (e) => {
      if (!drawing || scratchRevealed) return;
      e.preventDefault();
      const pt = e.touches ? e.touches[0] : e;
      const rect = scratchCanvas.getBoundingClientRect();
      const x = (pt.clientX - rect.left) / rect.width * SIZE;
      const y = (pt.clientY - rect.top) / rect.height * SIZE;
      eraseAt(x, y);
    };

    const onPointerDown = (e) => {
      drawing = true;
      lastX = 0;
      lastY = 0;
      if (heartEl) heartEl.classList.add("is-scratching");
      onPointerMove(e);
    };

    const onPointerUp = () => {
      drawing = false;
      lastX = 0;
      lastY = 0;
      if (heartEl) heartEl.classList.remove("is-scratching");
    };

    scratchCanvas.addEventListener("pointerdown", onPointerDown);
    scratchCanvas.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    if (scratchRevealFallback) {
      scratchRevealFallback.addEventListener("click", reveal);
    }

    function reveal() {
      if (scratchRevealed) return;
      scratchRevealed = true;

      // Fade canvas out smoothly
      scratchCanvas.style.opacity = "0";
      if (heartEl) heartEl.classList.add("is-revealed");
      setTimeout(() => scratchCanvas.classList.add("hidden"), 500);

      const bar = document.getElementById("scratchProgressBar");
      if (bar) bar.style.opacity = "0";
      if (hintText) hintText.style.display = "none";

      burstGold(40);
      showToast("24 September 2026 — save the date");

      // Extra sparkle burst around heart
      setTimeout(() => burstGold(20), 400);
    }
  }

  // Observe Scratch Section Arrival
  const scratchSection = document.getElementById("screen-scratch");
  if (scratchSection) {
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          initializeScratchCard();
        }
      });
    }, { threshold: 0.15 }).observe(scratchSection);
  }

  // Floating Rose Petals Loop
  function seedPetals() {
    if (!petalLayer) return;
    const count = reducedMotion ? 4 : 10;
    for (let index = 0; index < count; index += 1) {
      const petal = document.createElement("span");
      petal.className = "petal";
      petal.style.left = `${Math.random() * window.innerWidth}px`;
      petal.style.top = `${-40 - Math.random() * window.innerHeight}px`;
      petal.dataset.speed = String(0.35 + Math.random() * 0.75);
      petal.dataset.swing = String((Math.random() - 0.5) * 0.8);
      petal.dataset.rotation = String(Math.random() * 360);
      petalLayer.appendChild(petal);
    }
  }

  seedPetals();
  let lastFrame = performance.now();

  function animatePetals(timestamp) {
    const delta = timestamp - lastFrame;
    lastFrame = timestamp;

    if (petalLayer) {
      petalLayer.querySelectorAll(".petal").forEach((petal) => {
        const top = Number.parseFloat(petal.style.top);
        const left = Number.parseFloat(petal.style.left);
        const speed = Number.parseFloat(petal.dataset.speed);
        const swing = Number.parseFloat(petal.dataset.swing);
        const nextTop = top + speed * delta * 0.04;
        petal.style.top = `${nextTop > window.innerHeight + 60 ? -40 : nextTop}px`;
        petal.style.left = `${left + Math.sin(timestamp * 0.001 + left * 0.01) * swing}px`;
        petal.style.transform = `rotate(${Number(petal.dataset.rotation) + speed}deg)`;
        petal.dataset.rotation = String(Number(petal.dataset.rotation) + speed);
      });
    }

    requestAnimationFrame(animatePetals);
  }

  requestAnimationFrame(animatePetals);
});
