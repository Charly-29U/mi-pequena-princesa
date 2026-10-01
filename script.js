/**
 * MI PEQUEÑA PRINCESA - LÓGICA E INTERACTIVIDAD
 * Animaciones de partículas, reproductor con fallback, QR en corazón y efectos mágicos
 */

document.addEventListener('DOMContentLoaded', () => {
  initAmbientCanvas();
  initFallingLoveWords();
  initFallingPetals();
  initMusicPlayer();
  initBouquetTransition();
  initHeartQR();
  initQRModal();
  initMediaAndGallery();
  initDocBandages();

  // Las 5 Nuevas Funciones Románticas
  initNightMode();
  initSunflower();
  initScratchCard();
  initPromisesJar();
  initLoveMeter();
  initWaxSealEnvelope();
  initFairyDustTrail();
  initPersonalVoiceNote();
});

/* ==========================================================
   FÍSICA DE CAÍDA DE PÉTALOS EN LA CÚPULA DE CRISTAL
   ========================================================== */
function initFallingPetals() {
  const canvas = document.getElementById('falling-petals-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const parent = canvas.parentElement;

  function updateSize() {
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
  }
  updateSize();
  window.addEventListener('resize', updateSize);

  const petals = [];
  const maxPetals = 7;

  function spawnPetal() {
    const w = canvas.width;
    const h = canvas.height;
    return {
      x: w * 0.5 + (Math.random() - 0.5) * 45,
      y: h * 0.22 + Math.random() * 20,
      size: Math.random() * 4 + 7,
      vx: (Math.random() - 0.5) * 0.4,
      vy: Math.random() * 0.7 + 0.8,
      oscillation: Math.random() * Math.PI * 2,
      oscSpeed: Math.random() * 0.03 + 0.02,
      oscAmplitude: Math.random() * 1.4 + 0.8,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.035,
      alpha: 1
    };
  }

  // Iniciar con pétalos en diferentes alturas
  for (let i = 0; i < 3; i++) {
    const p = spawnPetal();
    p.y += (canvas.height * 0.2) * (i + 1);
    petals.push(p);
  }

  setInterval(() => {
    if (petals.length < maxPetals) {
      petals.push(spawnPetal());
    }
  }, 1400);

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);

    // Resplandor neón idéntico
    ctx.shadowColor = '#ff0055';
    ctx.shadowBlur = 10;

    ctx.beginPath();
    ctx.moveTo(0, -p.size);
    ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.3, p.size * 0.6, p.size * 0.8, 0, p.size);
    ctx.bezierCurveTo(-p.size * 0.6, p.size * 0.8, -p.size * 0.8, -p.size * 0.3, 0, -p.size);
    ctx.closePath();

    ctx.fillStyle = `rgba(255, 0, 85, ${p.alpha * 0.95})`;
    ctx.fill();

    ctx.strokeStyle = `rgba(255, 180, 215, ${p.alpha})`;
    ctx.lineWidth = 1.3;
    ctx.stroke();

    ctx.restore();
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = petals.length - 1; i >= 0; i--) {
      const p = petals[i];
      p.oscillation += p.oscSpeed;
      p.x += Math.sin(p.oscillation) * p.oscAmplitude + p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;

      // Cerca de la base se desvanece
      if (p.y > canvas.height * 0.88) {
        p.alpha -= 0.025;
        if (p.alpha <= 0) {
          petals.splice(i, 1);
          continue;
        }
      }

      drawPetal(p);
    }

    requestAnimationFrame(loop);
  }

  loop();
}

/* Modal del Código QR */
function initQRModal() {
  const openBtn = document.getElementById('open-qr-modal-btn');
  const modal = document.getElementById('qr-heart-modal');
  const closeBtn = document.getElementById('close-qr-btn');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => modal.showModal());
  }
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.close());
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.close();
    });
  }
}

/* ==========================================================
   1. CANVAS DE CIELO ESTRELLADO, PÉTALOS Y LUCIÉRNAGAS (RAY & EVANGELINE)
   ========================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initStars();
  });

  // 1. ESTRELLAS DEL CIELO NOCTURNO (ESTRELLAS TITILANTES Y DIAMANTES ✦)
  const isClassicPage = document.body.classList.contains('rose-classic-page');
  const starCount = isClassicPage ? 110 : (window.innerWidth < 768 ? 40 : 75);
  let stars = [];

  function initStars() {
    stars = [];
    for (let i = 0; i < starCount; i++) {
      const isCross = Math.random() < 0.18; // 18% son estrellas con destello de 4 puntas ✦
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: isCross ? (Math.random() * 2 + 1.8) : (Math.random() * 1.5 + 0.6),
        baseAlpha: Math.random() * 0.5 + 0.35,
        twinkleSpeed: Math.random() * 0.035 + 0.015,
        phase: Math.random() * Math.PI * 2,
        isCross: isCross,
        color: Math.random() > 0.3 ? '255, 255, 255' : (Math.random() > 0.5 ? '255, 234, 167' : '255, 204, 213')
      });
    }
  }
  initStars();

  // 2. LUCIÉRNAGAS DE RAY (CÁLIDAS Y BRILLANTES)
  const fireflyCount = isClassicPage ? (window.innerWidth < 768 ? 24 : 38) : (window.innerWidth < 768 ? 14 : 24);
  const fireflies = [];
  for (let i = 0; i < fireflyCount; i++) {
    fireflies.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.8 + 1.6,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.03 + 0.015,
      vx: (Math.random() - 0.5) * 0.9,
      vy: (Math.random() - 0.5) * 0.9,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.04 + 0.02
    });
  }

  // 3. PÉTALOS DE ROSA FLOTANTES
  const petalCount = window.innerWidth < 768 ? 14 : 26;
  const petals = [];
  for (let i = 0; i < petalCount; i++) {
    petals.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 7 + 5,
      speedX: (Math.random() - 0.5) * 1.0,
      speedY: Math.random() * 1.0 + 0.5,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 1.3,
      color: Math.random() > 0.4 ? 'rgba(230, 57, 86, 0.45)' : 'rgba(255, 179, 193, 0.55)'
    });
  }

  // Interacción suave con ratón o toque
  let pointerX = -9999;
  let pointerY = -9999;
  window.addEventListener('pointermove', (e) => {
    pointerX = e.clientX;
    pointerY = e.clientY;
  }, { passive: true });

  function render() {
    ctx.clearRect(0, 0, width, height);

    // DIBUJAR ESTRELLAS
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.phase += s.twinkleSpeed;
      const alpha = Math.max(0.1, s.baseAlpha + Math.sin(s.phase) * 0.45);

      if (s.isCross) {
        // Estrella diamante con 4 puntas relucientes (✦)
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.fillStyle = `rgba(${s.color}, ${alpha})`;

        const rayLen = s.radius * 3.5;
        ctx.beginPath();
        // Rayo vertical
        ctx.moveTo(0, -rayLen);
        ctx.lineTo(s.radius * 0.35, 0);
        ctx.lineTo(0, rayLen);
        ctx.lineTo(-s.radius * 0.35, 0);
        ctx.closePath();
        ctx.fill();

        // Rayo horizontal
        ctx.beginPath();
        ctx.moveTo(-rayLen, 0);
        ctx.lineTo(0, s.radius * 0.35);
        ctx.lineTo(rayLen, 0);
        ctx.lineTo(0, -s.radius * 0.35);
        ctx.closePath();
        ctx.fill();

        // Núcleo brillante
        ctx.beginPath();
        ctx.arc(0, 0, s.radius * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, alpha + 0.3)})`;
        ctx.fill();

        ctx.restore();
      } else {
        // Estrella circular suave
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color}, ${alpha})`;
        ctx.fill();
      }
    }

    // DIBUJAR PÉTALOS
    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotSpeed;

      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }
      if (p.x > width + 20) p.x = -20;
      if (p.x < -20) p.x = width + 20;
    }

    // DIBUJAR LUCIÉRNAGAS
    for (let i = 0; i < fireflies.length; i++) {
      const f = fireflies[i];
      f.pulse += f.pulseSpeed;
      const alpha = Math.max(0.15, Math.abs(Math.sin(f.pulse)));

      // Movimiento ondulante natural
      f.angle += f.speed;
      f.x += f.vx + Math.cos(f.angle) * 0.5;
      f.y += f.vy + Math.sin(f.angle) * 0.5;

      // Suave reacción con cursor o toque
      const dx = pointerX - f.x;
      const dy = pointerY - f.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 120 && dist > 10) {
        f.x -= (dx / dist) * 0.8;
        f.y -= (dy / dist) * 0.8;
      }

      if (f.x < -20) f.x = width + 20;
      if (f.x > width + 20) f.x = -20;
      if (f.y < -20) f.y = height + 20;
      if (f.y > height + 20) f.y = -20;

      // 1. Resplandor exterior cálido de luciérnaga
      const glowRadius = f.radius * 5.5;
      const gradient = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, glowRadius);
      gradient.addColorStop(0, `rgba(255, 235, 120, ${alpha * 0.9})`);
      gradient.addColorStop(0.35, `rgba(255, 183, 3, ${alpha * 0.45})`);
      gradient.addColorStop(0.7, `rgba(255, 140, 0, ${alpha * 0.15})`);
      gradient.addColorStop(1, 'rgba(255, 183, 3, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(f.x, f.y, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // 2. Núcleo incandescente de la luciérnaga
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, alpha + 0.2)})`;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.radius * 0.9, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================
   2. REPRODUCTOR DE MÚSICA AUTOMÁTICO (AUDIO INVISIBLE SIN YOUTUBE)
   Canción: Ma Belle Evangeline - La Princesa y el Sapo
   ========================================================== */
function initMusicPlayer() {
  const audio = document.getElementById('site-audio');
  const toggleButtons = document.querySelectorAll('[data-music-toggle]');
  const musicLabels = document.querySelectorAll('[data-music-label]');
  const musicBars = document.querySelectorAll('.music-player-bar');
  const musicPills = document.querySelectorAll('.dark-music-btn');
  const musicPath = 'assets/cancion.mp3';

  if (!audio) return;

  audio.src = musicPath;
  audio.loop = true;
  audio.volume = 0.85;

  let isPlaying = false;
  let userInteracted = false;

  function updateUIMusic(playing, labelText) {
    isPlaying = playing;
    const text = labelText || (playing ? 'Pausar canción (La Princesa y el Sapo)' : 'Nuestra Canción 🎵');
    musicLabels.forEach(lbl => (lbl.textContent = text));
    musicBars.forEach(bar => {
      if (playing) {
        bar.classList.add('music-playing');
      } else {
        bar.classList.remove('music-playing');
      }
    });
    musicPills.forEach(pill => {
      if (playing) {
        pill.classList.add('music-playing');
      } else {
        pill.classList.remove('music-playing');
      }
    });
  }

  async function tryPlay() {
    try {
      await audio.play();
      updateUIMusic(true, 'Pausar canción (Evangeline)');
      return true;
    } catch (e) {
      // Bloqueado temporalmente por política del navegador hasta el primer toque del usuario
      return false;
    }
  }

  // 1. Intentar reproducir automáticamente de inmediato
  tryPlay().then(success => {
    if (!success) {
      // 2. Si el navegador bloqueó el autoplay sin interacción,
      // reproducir automáticamente al PRIMER toque o clic en cualquier parte de la pantalla
      function onFirstUserGesture() {
        if (userInteracted) return;
        userInteracted = true;
        tryPlay();
        window.removeEventListener('click', onFirstUserGesture, true);
        window.removeEventListener('touchstart', onFirstUserGesture, true);
        window.removeEventListener('pointerdown', onFirstUserGesture, true);
      }

      window.addEventListener('click', onFirstUserGesture, true);
      window.addEventListener('touchstart', onFirstUserGesture, true);
      window.addEventListener('pointerdown', onFirstUserGesture, true);
    }
  });

  // 3. Botones para pausar o reanudar manualmente
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      userInteracted = true;
      if (!isPlaying) {
        try {
          await audio.play();
          updateUIMusic(true, 'Pausar canción (Evangeline)');
        } catch (err) {
          console.warn('Audio play failed, activating hidden fallback:', err);
          initHiddenYouTubeFallback();
        }
      } else {
        audio.pause();
        if (ytFallbackPlayer && typeof ytFallbackPlayer.pauseVideo === 'function') {
          ytFallbackPlayer.pauseVideo();
        }
        updateUIMusic(false, 'Escuchar nuestra canción 🎵');
      }
    });
  });

  // Respaldo invisible de YouTube (por si el navegador no soporta el archivo de audio local)
  let ytFallbackPlayer = null;
  function initHiddenYouTubeFallback() {
    if (ytFallbackPlayer) {
      ytFallbackPlayer.playVideo();
      updateUIMusic(true, 'Pausar canción (Evangeline)');
      return;
    }

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
      window.onYouTubeIframeAPIReady = createYt;
    } else {
      createYt();
    }

    function createYt() {
      let holder = document.getElementById('yt-hidden-audio');
      if (!holder) {
        holder = document.createElement('div');
        holder.id = 'yt-hidden-audio';
        holder.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;';
        document.body.appendChild(holder);
      }
      ytFallbackPlayer = new YT.Player('yt-hidden-audio', {
        height: '1',
        width: '1',
        videoId: 'rLSeD33M4tQ',
        playerVars: {
          autoplay: 1,
          controls: 0,
          loop: 1,
          playlist: 'rLSeD33M4tQ',
          playsinline: 1
        },
        events: {
          onReady: (evt) => {
            evt.target.playVideo();
            updateUIMusic(true, 'Pausar canción (Evangeline)');
          }
        }
      });
    }
  }
}

/* ==========================================================
   3. ANIMACIÓN DEL RAMO Y TRANSICIÓN DE PÉTALOS
   ========================================================== */
function initBouquetTransition() {
  const bouquetLink = document.getElementById('bouquet-action');
  const btnMemories = document.getElementById('btn-to-memories');

  function handleBouquetClick(e) {
    e.preventDefault();
    const targetUrl = bouquetLink.getAttribute('href') || 'recuerdos.html';

    // Generar estallido de corazones y pétalos
    const rect = bouquetLink.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 25; i++) {
      createBurstParticle(centerX, centerY);
    }

    // Suave vibración y redirección
    if (bouquetLink.classList.contains('rose-interactive-anchor')) {
      bouquetLink.style.transform = 'translate(-50%, -46%) scale(0.96)';
    } else {
      bouquetLink.style.transform = 'scale(0.96)';
    }
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 450);
  }

  const beautyBeastDuo = document.querySelector('.beauty-beast-duo');
  if (beautyBeastDuo && bouquetLink) {
    beautyBeastDuo.style.cursor = 'pointer';
    beautyBeastDuo.addEventListener('click', handleBouquetClick);
  }

  if (bouquetLink) bouquetLink.addEventListener('click', handleBouquetClick);
  if (btnMemories) {
    btnMemories.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'recuerdos.html';
    });
  }
}

function createBurstParticle(x, y) {
  const elem = document.createElement('div');
  const symbols = ['🌸', '💖', '✨', '🌹', '🩹', '👑', '🐸'];
  elem.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  elem.style.position = 'fixed';
  elem.style.left = `${x}px`;
  elem.style.top = `${y}px`;
  elem.style.fontSize = `${Math.random() * 16 + 18}px`;
  elem.style.pointerEvents = 'none';
  elem.style.zIndex = '9999';
  elem.style.transition = 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
  document.body.appendChild(elem);

  const destX = (Math.random() - 0.5) * 320;
  const destY = (Math.random() - 0.5) * 320 - 40;

  requestAnimationFrame(() => {
    elem.style.transform = `translate(${destX}px, ${destY}px) scale(1.4) rotate(${Math.random() * 60 - 30}deg)`;
    elem.style.opacity = '0';
  });

  setTimeout(() => {
    elem.remove();
  }, 650);
}

/* ==========================================================
   4. CÓDIGO QR EN CORAZÓN & DESCARGA
   ========================================================== */
function initHeartQR() {
  const qrContainers = document.querySelectorAll('.qr-code-holder');
  if (qrContainers.length === 0) return;

  // La URL a la que dirigirá el QR: portada con el ramo
  const fullUrl = window.location.origin + window.location.pathname.replace('recuerdos.html', 'index.html');

  qrContainers.forEach(container => {
    if (window.QRCode) {
      container.innerHTML = '';
      new QRCode(container, {
        text: fullUrl,
        width: 140,
        height: 140,
        colorDark: '#4a1525',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      });
    }
  });

  // Botón Copiar Enlace
  const copyBtn = document.getElementById('copy-link-btn');
  const toast = document.getElementById('copy-toast');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(fullUrl);
        if (toast) toast.textContent = '¡Enlace copiado al portapapeles con éxito! 💖';
      } catch (err) {
        if (toast) toast.textContent = 'Enlace: ' + fullUrl;
      }
      setTimeout(() => {
        if (toast) toast.textContent = '';
      }, 3500);
    });
  }

  // Botón Descargar QR con Marco de Corazón
  const downloadBtn = document.getElementById('download-qr-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      downloadHeartQRImage(fullUrl);
    });
  }
}

function downloadHeartQRImage(url) {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');

  // Fondo suave
  ctx.fillStyle = '#fdf8f5';
  ctx.fillRect(0, 0, 600, 600);

  // Dibujar silueta de corazón
  ctx.save();
  ctx.beginPath();
  const d = Math.min(600, 600);
  const k = 300;
  // Curva bezier de corazón
  ctx.moveTo(300, 520);
  ctx.bezierCurveTo(120, 400, 40, 300, 40, 180);
  ctx.bezierCurveTo(40, 90, 110, 40, 200, 40);
  ctx.bezierCurveTo(255, 40, 285, 75, 300, 105);
  ctx.bezierCurveTo(315, 75, 345, 40, 400, 40);
  ctx.bezierCurveTo(490, 40, 560, 90, 560, 180);
  ctx.bezierCurveTo(560, 300, 480, 400, 300, 520);
  ctx.closePath();

  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = 'rgba(217, 79, 101, 0.35)';
  ctx.shadowBlur = 25;
  ctx.shadowOffsetY = 8;
  ctx.fill();

  ctx.lineWidth = 8;
  ctx.strokeStyle = '#e63956';
  ctx.stroke();
  ctx.restore();

  // Texto arriba en el corazón
  ctx.fillStyle = '#9d2b40';
  ctx.font = 'bold 22px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('Para Ti, Mi Princesa', 300, 150);

  // Generar QR dentro
  const tempDiv = document.createElement('div');
  new QRCode(tempDiv, {
    text: url,
    width: 200,
    height: 200,
    colorDark: '#4a1525',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });

  setTimeout(() => {
    const qrImg = tempDiv.querySelector('img') || tempDiv.querySelector('canvas');
    if (qrImg) {
      ctx.drawImage(qrImg, 200, 185, 200, 200);

      // Texto de pie
      ctx.fillStyle = '#6a4c52';
      ctx.font = '16px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Escanea para ver nuestro ramo y recuerdos ♡', 300, 425);

      // Descargar enlace
      const link = document.createElement('a');
      link.download = 'QR-Corazon-Mi-Princesa.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  }, 200);
}

/* ==========================================================
   5. GALERÍA DE RECUERDOS & MODAL LIGHTBOX & VIDEO
   ========================================================== */
function initMediaAndGallery() {
  // Carga automática de fotos
  const images = document.querySelectorAll('.memory-photo-asset');
  images.forEach(img => {
    img.addEventListener('load', () => {
      img.hidden = false;
      const placeholder = img.parentElement.querySelector('.photo-placeholder-art');
      if (placeholder) placeholder.hidden = true;
    });
    if (img.dataset.src) {
      img.src = img.dataset.src;
    }
  });

  // Modal Lightbox
  const modal = document.getElementById('photo-modal');
  const modalImgContainer = document.getElementById('modal-img-container');
  const modalCaption = document.getElementById('modal-caption');
  const closeBtn = document.getElementById('close-modal-btn');

  document.querySelectorAll('.polaroid-frame').forEach(frame => {
    frame.addEventListener('click', (e) => {
      // Si hizo clic en el botón de video, no abrir modal
      if (e.target.closest('[data-video-toggle]') || e.target.closest('video')) return;

      const img = frame.querySelector('.memory-photo-asset');
      const caption = frame.querySelector('.polaroid-caption');

      if (modal && modalImgContainer && modalCaption) {
        modalImgContainer.innerHTML = '';
        if (img && !img.hidden && img.src) {
          const clone = document.createElement('img');
          clone.src = img.src;
          clone.alt = img.alt || 'Recuerdo';
          modalImgContainer.appendChild(clone);
        } else {
          // Mostrar placeholder embellecido
          const notice = document.createElement('div');
          notice.style.padding = '40px 20px';
          notice.style.textAlign = 'center';
          notice.style.fontSize = '16px';
          notice.style.color = '#784c56';
          notice.innerHTML = '🌸 <strong>Un recuerdo imborrable en mi mente</strong><br><small style="color:#999;">Coloca tu foto en la carpeta assets/ para verla aquí.</small>';
          modalImgContainer.appendChild(notice);
        }

        modalCaption.textContent = caption ? caption.textContent : 'Nuestro momento especial';
        modal.showModal();
      }
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.close());
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.close();
    });
  }

  // Soporte para polaroids de recuerdos en el Lightbox
  document.querySelectorAll('.polaroid-card, .mini-polaroid').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const fullSrc = card.dataset.full || (img ? img.src : '');
      const captionText = card.dataset.caption || (card.querySelector('.polaroid-title') ? card.querySelector('.polaroid-title').textContent : 'Nuestro momento especial');

      if (modal && modalImgContainer && modalCaption && fullSrc) {
        modalImgContainer.innerHTML = `<img src="${fullSrc}" alt="Foto Recuerdo">`;
        modalCaption.textContent = captionText;
        modal.showModal();
      }
    });
  });

  // Manejo del Reproductor de Cine (8 Videos)
  const mainVideo = document.getElementById('main-memory-video');
  const currentTitle = document.getElementById('current-video-title');
  const videoChips = document.querySelectorAll('.video-chip');

  if (mainVideo && videoChips.length > 0) {
    videoChips.forEach(chip => {
      chip.addEventListener('click', async () => {
        videoChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const videoSrc = chip.dataset.videoSrc;
        const videoTitle = chip.dataset.videoTitle;

        if (currentTitle) currentTitle.textContent = '▶ ' + videoTitle;

        mainVideo.src = videoSrc;
        mainVideo.load();
        try {
          await mainVideo.play();
        } catch (e) {
          // Si el navegador bloquea autoplay, el usuario lo puede reproducir con los controles
        }
      });
    });
  }

  // Manejo de videos anteriores (si existen)
  const videoBtn = document.querySelector('[data-video-toggle]');
  if (videoBtn) {
    videoBtn.addEventListener('click', async () => {
      const frame = videoBtn.closest('.polaroid-frame');
      const video = frame.querySelector('.memory-video');
      const status = frame.querySelector('.media-status');

      if (!video.src) video.src = 'assets/video-1.mp4';
      video.hidden = false;

      try {
        await video.play();
        videoBtn.hidden = true;
      } catch (err) {
        video.hidden = true;
        if (status) {
          status.textContent = 'Guarda tu video en assets/video-1.mp4 para verlo aquí 🎥';
          setTimeout(() => (status.textContent = ''), 4000);
        }
      }
    });
  }
}

/* ==========================================================
   6. CURITAS INTERACTIVAS (DOCTORA JUGUETES)
   ========================================================== */
function initDocBandages() {
  const bandages = document.querySelectorAll('.bandage-btn');
  bandages.forEach(btn => {
    btn.addEventListener('click', () => {
      // Efecto de pulso
      btn.style.transform = 'scale(1.05)';
      setTimeout(() => (btn.style.transform = ''), 200);

      // Lanzar pequeños corazones
      const rect = btn.getBoundingClientRect();
      createBurstParticle(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
  });
}

/* ==========================================================
   LETRAS DE AMOR CAYENDO EN MÚLTIPLES IDIOMAS (CÓDIGO EXACTO)
   ========================================================== */
function initFallingLoveWords() {
  const isRosePage = document.body.classList.contains('rose-classic-page');
  if (!isRosePage) return;

  const loveWords = [
    "Te amo", "I love you", "Je t’aime", "Ich liebe dich", "Ti amo", "Eu te amo",
    "愛してる", "사랑해", "Я тебя люблю", "Saya cinta kamu", "Ik hou van jou",
    "Mi amas vin", "Szeretlek", "Volim te", "T'estimo", "Te iubesc", "Kocham cię",
    "Ani ohev otach", "Miluji tě", "Ngiyakuthanda", "Jeg elsker dig",
    "Ma armastan sind", "Minä rakastan sinua", "Aš tave myliu", "Es tevi mīlu",
    "Phom rak khun", "Kuv hlub koj", "Wa ai ni", "Amo-te", "Ndagukunda",
    "Ninakupenda", "Tôi yêu bạn", "Seni seviyorum", "Ek is lief vir jou",
    "Me do bhal karte hoon", "Main tujhse pyar karta hoon", "Aloha wau ia oe",
    "Ana behibek", "Mahal kita", "Oi se ongi", "T’estim molt", "Jag älskar dig",
    "Mwen renmen ou", "Mi ta stimabo", "Maite zaitut", "Is breá liom tú",
    "Ich lieb di", "Taim i ngrá leat", "Ti voglio bene", "Lubim ta", "Je t’adore"
  ];

  function createFallingText() {
    const text = document.createElement("div");
    text.className = "falling-text";
    text.innerText = loveWords[Math.floor(Math.random() * loveWords.length)];
    text.style.left = (Math.random() * 90 + 5) + "vw";
    text.style.animationDuration = (8 + Math.random() * 6) + "s";
    text.style.fontSize = (13 + Math.random() * 6) + "px";
    text.style.opacity = (Math.random() * 0.35 + 0.45).toFixed(2);
    document.body.appendChild(text);
    setTimeout(() => {
      if (text.parentNode) text.remove();
    }, 15000);
  }

  // Generar un par de palabras al inicio de forma suave
  setTimeout(createFallingText, 300);
  setTimeout(createFallingText, 1200);

  // Intervalo calmado y romántico (cada 1.6 segundos en vez de cada 0.3s)
  setInterval(createFallingText, 1600);
}

/* ==========================================================
   SINTETIZADOR DE SONIDOS SUAVES (WEB AUDIO API NATIVO)
   ========================================================== */
function playRomanticChime(type = 'bell') {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === 'bell') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.3); // A5
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc.start(now);
      osc.stop(now + 0.6);
    } else if (type === 'sparkle') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(783.99, now); // G5
      osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.25); // D6
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'fanfare') {
      // Doble nota de celebración
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.12); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.24); // G5
      osc.frequency.setValueAtTime(1046.50, now + 0.36); // C6
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
      osc.start(now);
      osc.stop(now + 0.9);
    }
  } catch (e) {
    // Si el navegador bloquea audio, continúa silenciosamente
  }
}

/* ==========================================================
   FUNCIÓN 1: MODO NOCHE DE RAY & EVANGELINE (BAYOU NIGHT)
   ========================================================== */
function initNightMode() {
  const toggleBtn = document.getElementById('night-mode-btn');
  const halo = document.getElementById('flashlight-halo');

  if (!toggleBtn) return;

  let isNight = false;

  toggleBtn.addEventListener('click', () => {
    isNight = !isNight;
    document.body.classList.toggle('bayou-night-mode', isNight);

    const icon = toggleBtn.querySelector('.toggle-icon');
    const text = toggleBtn.querySelector('.toggle-text');

    if (isNight) {
      if (icon) icon.textContent = '☀️';
      if (text) text.textContent = 'Modo Día';
      playRomanticChime('bell');
      // Lanzar estrellas
      const rect = toggleBtn.getBoundingClientRect();
      createBurstParticle(rect.left + rect.width / 2, rect.top + rect.height / 2);
    } else {
      if (icon) icon.textContent = '🌙';
      if (text) text.textContent = 'Noche de Ray';
      playRomanticChime('sparkle');
    }
  });

  // Movimiento del halo de linterna en modo noche
  if (halo) {
    window.addEventListener('pointermove', (e) => {
      if (!isNight) return;
      halo.style.left = `${e.clientX}px`;
      halo.style.top = `${e.clientY}px`;
    });

    window.addEventListener('touchmove', (e) => {
      if (!isNight || !e.touches[0]) return;
      halo.style.left = `${e.touches[0].clientX}px`;
      halo.style.top = `${e.touches[0].clientY}px`;
    }, { passive: true });
  }
}

/* ==========================================================
   FUNCIÓN 2: GIRASOL QUE FLORECE (OPCIÓN 5)
   ========================================================== */
function initSunflower() {
  const stage = document.getElementById('sunflower-stage');
  const bloomBtn = document.getElementById('btn-bloom-petal');
  const resetBtn = document.getElementById('btn-reset-sunflower');
  const counterBadge = document.getElementById('bloom-counter-badge');
  const bubbleText = document.getElementById('sunflower-bubble-text');
  const petals = document.querySelectorAll('.sunflower-petal');

  if (!stage || petals.length === 0) return;

  const romanticReasons = [
    "Tus ojitos hermosos y esa forma tan dulce en que me miras ♡",
    "Tu risa contagiosa que ilumina hasta el día más gris ✨",
    "La ternura y la bondad infinita que guardas en tu corazón 💖",
    "La paz tan bonita que siento cuando duermes en mi pecho 🕊️",
    "Tus piquitos coquetos y tus caricias que me devuelven la vida 😘",
    "Cocinar con todo mi amor para ti y verte disfrutar comiendo 🍳",
    "Nuestras videollamadas de madrugada y complicidad única 🌙",
    "¡Porque eres mi pequeña princesa y te elijo hoy, mañana y siempre! 🌻👑"
  ];

  let currentPetal = 0;

  function bloomNextPetal() {
    if (currentPetal < petals.length) {
      const petal = petals[currentPetal];
      petal.classList.add('bloomed');

      const phrase = romanticReasons[currentPetal];
      if (bubbleText) {
        bubbleText.textContent = phrase;
        bubbleText.parentElement.style.transform = 'scale(1.04)';
        setTimeout(() => {
          if (bubbleText.parentElement) bubbleText.parentElement.style.transform = '';
        }, 250);
      }

      currentPetal++;
      if (counterBadge) {
        counterBadge.textContent = `Pétalos abiertos: ${currentPetal} / ${petals.length}`;
      }

      playRomanticChime('sparkle');

      // Partículas
      const rect = petal.getBoundingClientRect();
      createBurstParticle(rect.left + rect.width / 2, rect.top + rect.height / 2);

      // Si se abrieron todos
      if (currentPetal === petals.length) {
        if (bloomBtn) {
          bloomBtn.innerHTML = '<span>🌻 ¡Girasol Florecido Completo! ♡</span>';
          bloomBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        }
        playRomanticChime('fanfare');
        // Lluvia de corazones
        for (let i = 0; i < 20; i++) {
          setTimeout(() => {
            const rx = window.innerWidth * 0.5 + (Math.random() - 0.5) * 250;
            const ry = window.innerHeight * 0.45 + (Math.random() - 0.5) * 150;
            createBurstParticle(rx, ry);
          }, i * 60);
        }
      }
    } else {
      // Ya están todos abiertos, vibración cariñosa
      if (bubbleText) {
        bubbleText.textContent = "¡Eres mi sol eterno, mi princesa Isabel! 🌻💛";
      }
      playRomanticChime('bell');
    }
  }

  function resetSunflower() {
    currentPetal = 0;
    petals.forEach(p => p.classList.remove('bloomed'));
    if (counterBadge) counterBadge.textContent = `Pétalos abiertos: 0 / ${petals.length}`;
    if (bubbleText) bubbleText.textContent = "¡Toca el botón o el girasol para abrir el primer pétalo!";
    if (bloomBtn) {
      bloomBtn.innerHTML = '<span>🌻 Tocar para Florecer</span>';
      bloomBtn.style.background = '';
    }
    playRomanticChime('bell');
  }

  stage.addEventListener('click', bloomNextPetal);
  if (bloomBtn) bloomBtn.addEventListener('click', bloomNextPetal);
  if (resetBtn) resetBtn.addEventListener('click', resetSunflower);
}

/* ==========================================================
   FUNCIÓN 3: TARJETA RASPA Y GANA DEL AMOR (OPCIÓN 2)
   ========================================================== */
function initScratchCard() {
  const canvas = document.getElementById('scratch-canvas');
  const percentText = document.getElementById('scratch-percent-text');
  const progressFill = document.getElementById('scratch-progress-fill');
  const resetBtn = document.getElementById('btn-reset-scratch');

  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let isDrawing = false;
  let isCleared = false;
  let moveCount = 0;

  function setupCanvas() {
    canvas.width = canvas.offsetWidth || 460;
    canvas.height = canvas.offsetHeight || 280;
    canvas.style.opacity = '1';
    canvas.style.pointerEvents = 'auto';
    isCleared = false;
    moveCount = 0;
    if (percentText) percentText.textContent = 'Raspado: 0%';
    if (progressFill) progressFill.style.width = '0%';

    // Dibujar lámina de oro brillante
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#f9d423');
    grad.addColorStop(0.3, '#ff4e50');
    grad.addColorStop(0.6, '#f9d423');
    grad.addColorStop(1, '#e65c00');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Patrón de destellos decorativos
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    for (let i = 0; i < 40; i++) {
      const rx = Math.random() * canvas.width;
      const ry = Math.random() * canvas.height;
      const rs = Math.random() * 4 + 2;
      ctx.beginPath();
      ctx.arc(rx, ry, rs, 0, Math.PI * 2);
      ctx.fill();
    }

    // Texto guía
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 6;
    ctx.fillText('✨ RASPA AQUÍ CON TU DEDO O RATÓN ✨', canvas.width / 2, canvas.height / 2 - 12);

    ctx.font = '14px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Descubre tu sorpresa de amor ♡', canvas.width / 2, canvas.height / 2 + 18);

    ctx.shadowColor = 'transparent';
  }

  setupCanvas();
  window.addEventListener('resize', () => {
    if (!isCleared) setupCanvas();
  });

  function getCoords(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height)
    };
  }

  function scratch(e) {
    if (!isDrawing || isCleared) return;
    const pos = getCoords(e);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 24, 0, Math.PI * 2);
    ctx.fill();

    moveCount++;
    if (moveCount % 12 === 0) {
      calculateProgress();
    }
  }

  function calculateProgress() {
    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      let transparentPixels = 0;
      const step = 24; // Muestreo para alto rendimiento

      for (let i = 3; i < data.length; i += step * 4) {
        if (data[i] === 0) transparentPixels++;
      }

      const totalSampled = data.length / (step * 4);
      const percent = Math.min(100, Math.round((transparentPixels / totalSampled) * 100));

      if (percentText) percentText.textContent = `Raspado: ${percent}%`;
      if (progressFill) progressFill.style.width = `${percent}%`;

      if (percent >= 45 && !isCleared) {
        isCleared = true;
        canvas.style.transition = 'opacity 0.6s ease';
        canvas.style.opacity = '0';
        canvas.style.pointerEvents = 'none';

        if (percentText) percentText.textContent = '¡PREMIO REVELADO! 🏆';
        if (progressFill) progressFill.style.width = '100%';

        playRomanticChime('fanfare');

        // Lanzar lluvia de estrellas
        const rect = canvas.getBoundingClientRect();
        for (let i = 0; i < 16; i++) {
          setTimeout(() => {
            const rx = rect.left + Math.random() * rect.width;
            const ry = rect.top + Math.random() * rect.height;
            createBurstParticle(rx, ry);
          }, i * 50);
        }
      }
    } catch (err) {
      // Ignorar restricciones CORS si las hubiera
    }
  }

  // Eventos de ratón
  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    scratch(e);
  });
  window.addEventListener('mouseup', () => (isDrawing = false));
  canvas.addEventListener('mousemove', scratch);

  // Eventos táctiles móviles
  canvas.addEventListener('touchstart', (e) => {
    isDrawing = true;
    scratch(e);
  }, { passive: true });
  window.addEventListener('touchend', () => (isDrawing = false));
  canvas.addEventListener('touchmove', scratch, { passive: true });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      setupCanvas();
      playRomanticChime('sparkle');
    });
  }
}

/* ==========================================================
   FUNCIÓN 4: EL FRASCO MÁGICO DE PROMESAS Y VALES (OPCIÓN 1)
   ========================================================== */
function initPromisesJar() {
  const jar = document.getElementById('magic-jar');
  const drawBtn = document.getElementById('btn-draw-ticket');
  const ticketCard = document.getElementById('active-ticket-card');
  const ticketTitle = document.getElementById('ticket-title');
  const ticketDesc = document.getElementById('ticket-desc');
  const ticketIcon = document.getElementById('ticket-icon');
  const ticketCategory = document.getElementById('ticket-category');
  const counterText = document.getElementById('jar-counter-text');

  if (!jar || !ticketCard) return;

  const tickets = [
    {
      category: "VALE OFICIAL",
      icon: "🍝",
      title: "Cena Romántica Hecha por Mí",
      desc: "Válido para una cena especial donde yo preparo todo lo que tú quieras, con velitas, tu bebida favorita y cero lavar platos."
    },
    {
      category: "VALE OFICIAL",
      icon: "💆‍♀️",
      title: "Masaje Relajante Completo",
      desc: "Válido por un masaje suave en la espalda, hombros y cuello con caricias y mimos sin límite de tiempo."
    },
    {
      category: "PROMESA SAGRADA",
      icon: "👂💖",
      title: "Escucharte con el Corazón Abierto",
      desc: "Promesa de dejar de lado cualquier orgullo, escucharte con empatía, validar cada uno de tus sentimientos y comprenderte siempre."
    },
    {
      category: "VALE OFICIAL",
      icon: "🍿",
      title: "Maratón de Series o Películas",
      desc: "Válido para ver la serie o película que tú elijas en la cama, comiendo chucherías, abrazaditos y sin quejarme de nada."
    },
    {
      category: "VALE OFICIAL",
      icon: "🫂",
      title: "Abrazo Infinito Anti-Tristeza",
      desc: "Válido para cuando te sientas cansada, triste o abrumada. Un abrazo apretado donde puedas soltarlo todo en mi pecho con seguridad."
    },
    {
      category: "PROMESA SAGRADA",
      icon: "🌙",
      title: "Nunca Irnos a Dormir Enojados",
      desc: "Prometo buscarte con amor, pedirte perdón cuando me equivoque y jamás dejar que termine la noche sin recordarte lo valiosa que eres."
    },
    {
      category: "VALE OFICIAL",
      icon: "🍦",
      title: "Postre o Helado por Antojo",
      desc: "Válido para salir o pedir tu helado o postre favorito en el momento exacto que se te antoje, sin excusas."
    },
    {
      category: "VALE OFICIAL",
      icon: "👑",
      title: "Día de Consentirte al 100%",
      desc: "Un día completo donde tú eres la jefa absoluta: pasear, comer rico, descansar y ser tratada como la reina del universo."
    },
    {
      category: "PROMESA SAGRADA",
      icon: "🌹",
      title: "Cuidar Nuestra Relación con Hechos",
      desc: "Prometo no solo decir palabras bonitas, sino demostrarte todos los días con acciones reales que mi prioridad eres tú."
    },
    {
      category: "VALE COMODÍN",
      icon: "⭐",
      title: "Comodín Dorado de la Princesa Isabel",
      desc: "¡Válido por absolutamente cualquier deseo que tengas en este instante! Charly no puede decir que no a nada."
    }
  ];

  let currentIndex = 0;

  function drawTicket() {
    // Animación de sacudida del frasco
    jar.classList.add('shaking');
    setTimeout(() => jar.classList.remove('shaking'), 500);

    const ticket = tickets[currentIndex];

    // Animación del boleto
    ticketCard.classList.remove('pop-out');
    void ticketCard.offsetWidth; // trigger reflow
    ticketCard.classList.add('pop-out');

    if (ticketCategory) ticketCategory.textContent = ticket.category;
    if (ticketIcon) ticketIcon.textContent = ticket.icon;
    if (ticketTitle) ticketTitle.textContent = ticket.title;
    if (ticketDesc) ticketDesc.textContent = ticket.desc;

    currentIndex = (currentIndex + 1) % tickets.length;
    if (counterText) {
      counterText.textContent = `Vales leídos: ${currentIndex === 0 ? tickets.length : currentIndex} de ${tickets.length}`;
    }

    playRomanticChime('bell');

    // Partículas
    const rect = jar.getBoundingClientRect();
    createBurstParticle(rect.left + rect.width / 2, rect.top + rect.height / 2);
  }

  jar.addEventListener('click', drawTicket);
  if (drawBtn) drawBtn.addEventListener('click', drawTicket);
}

/* ==========================================================
   FUNCIÓN 5: AMOR-ÓMETRO DE LA DOCTORA JUGUETES (OPCIÓN 3)
   ========================================================== */
function initLoveMeter() {
  const measureBtn = document.getElementById('btn-measure-love');
  const fill = document.getElementById('mercury-fill');
  const readout = document.getElementById('meter-readout');
  const status = document.getElementById('meter-status');
  const rxCard = document.getElementById('doctor-rx-card');

  if (!measureBtn || !fill) return;

  let isMeasuring = false;

  measureBtn.addEventListener('click', () => {
    if (isMeasuring) return;
    isMeasuring = true;

    measureBtn.disabled = true;
    measureBtn.style.opacity = '0.6';
    if (rxCard) rxCard.hidden = true;
    fill.classList.remove('overflowing');

    const stages = [
      { pct: 25, label: '25%', msg: '🩺 Iniciando chequeo... Detectando niveles de ternura...' },
      { pct: 50, label: '50%', msg: '💓 Latidos de amor acelerándose rápidamente...' },
      { pct: 75, label: '75%', msg: '💖 Nivel de enamoramiento sobrepasando la media...' },
      { pct: 100, label: '100%', msg: '✨ ¡Llegando al límite máximo del termómetro!' },
      { pct: 100, label: '1000%', msg: '🔥 ¡EXPLOSIÓN DE AMOR! ¡El amor por Isabel supera la escala científica!' }
    ];

    let currentStage = 0;

    function step() {
      if (currentStage < stages.length) {
        const s = stages[currentStage];
        fill.style.height = `${s.pct}%`;
        if (readout) readout.textContent = s.label;
        if (status) status.textContent = s.msg;

        playRomanticChime(currentStage === stages.length - 1 ? 'fanfare' : 'sparkle');

        currentStage++;
        setTimeout(step, currentStage === stages.length ? 700 : 500);
      } else {
        // Alerta y receta
        fill.classList.add('overflowing');
        if (rxCard) rxCard.hidden = false;

        measureBtn.disabled = false;
        measureBtn.style.opacity = '1';
        measureBtn.innerHTML = '<span>🩺 ¡Repetir Chequeo Médico!</span>';
        isMeasuring = false;

        // Lluvia de corazones
        for (let i = 0; i < 15; i++) {
          setTimeout(() => {
            const rx = window.innerWidth * 0.5 + (Math.random() - 0.5) * 300;
            const ry = window.innerHeight * 0.5 + (Math.random() - 0.5) * 200;
            createBurstParticle(rx, ry);
          }, i * 70);
        }
      }
    }

    step();
  });
}

/* ==========================================================
   FUNCIÓN 6: SOBRE CON SELLO DE CERA & PREGUNTA ¿ME PERDONAS?
   ========================================================== */
function initWaxSealEnvelope() {
  const sealBtn = document.getElementById('wax-seal-btn');
  const envelope = document.getElementById('vintage-envelope');
  const letterCard = document.getElementById('unfolded-letter-card');
  const yesBtn = document.getElementById('btn-forgive-yes');
  const noBtn = document.getElementById('btn-forgive-no');
  const celebration = document.getElementById('forgiveness-celebration');

  // Abrir sobre al tocar el sello de cera
  if (sealBtn && envelope) {
    sealBtn.addEventListener('click', () => {
      envelope.classList.add('unfolding');
      playRomanticChime('fanfare');

      const rect = sealBtn.getBoundingClientRect();
      for (let i = 0; i < 10; i++) {
        createBurstParticle(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }

      setTimeout(() => {
        envelope.classList.add('opened');
        if (letterCard) {
          letterCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    });
  }

  // Botón "¡Sí, te perdono!"
  if (yesBtn && celebration) {
    yesBtn.addEventListener('click', () => {
      celebration.hidden = false;
      yesBtn.style.display = 'none';
      if (noBtn) noBtn.style.display = 'none';

      playRomanticChime('fanfare');

      // Gran estallido de confeti
      for (let i = 0; i < 25; i++) {
        setTimeout(() => {
          const rx = window.innerWidth * 0.5 + (Math.random() - 0.5) * 350;
          const ry = window.innerHeight * 0.5 + (Math.random() - 0.5) * 250;
          createBurstParticle(rx, ry);
        }, i * 50);
      }
    });
  }

  // Botón travieso "Déjame pensarlo..." que se escapa
  if (noBtn) {
    const funnyTexts = [
      "¿Segura? 🥺",
      "¡Piénsalo otra vez! ❤️",
      "¡No se vale huir! 🥰",
      "¡Mira qué rico te cocino! 🍳",
      "¡Te daré mil besitos! 😘",
      "¡Di que sí, mi princesa! 👉👈"
    ];
    let textIdx = 0;

    function dodgeNoButton() {
      const offsetX = (Math.random() - 0.5) * 160;
      const offsetY = (Math.random() - 0.5) * 60;
      noBtn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      noBtn.textContent = funnyTexts[textIdx];
      textIdx = (textIdx + 1) % funnyTexts.length;
      playRomanticChime('sparkle');
    }

    noBtn.addEventListener('mouseenter', dodgeNoButton);
    noBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      dodgeNoButton();
    }, { passive: false });
    noBtn.addEventListener('click', (e) => {
      e.preventDefault();
      dodgeNoButton();
    });
  }
}

/* ==========================================================
   FUNCIÓN 7: RASTRO DE POLVO DE HADAS (SPARKLES AL MOVER)
   ========================================================== */
function initFairyDustTrail() {
  let lastX = 0;
  let lastY = 0;
  let lastTime = 0;

  function spawnSparkle(x, y) {
    const now = Date.now();
    if (now - lastTime < 65) return; // Limitar frecuencia para fluidez 60fps
    const dist = Math.hypot(x - lastX, y - lastY);
    if (dist < 22) return;

    lastX = x;
    lastY = y;
    lastTime = now;

    const sparkle = document.createElement('span');
    sparkle.className = 'fairy-dust-sparkle';
    const icons = ['✨', '✦', '⭐', '🌸', '💫'];
    sparkle.textContent = icons[Math.floor(Math.random() * icons.length)];
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.color = Math.random() > 0.5 ? '#ffd166' : '#ff96c0';
    document.body.appendChild(sparkle);

    setTimeout(() => {
      if (sparkle.parentNode) sparkle.remove();
    }, 750);
  }

  window.addEventListener('pointermove', (e) => spawnSparkle(e.clientX, e.clientY), { passive: true });
  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      spawnSparkle(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });
}

/* ==========================================================
   FUNCIÓN 8: REPRODUCTOR DE NOTA DE VOZ PERSONAL DE CHARLY
   ========================================================== */
function initPersonalVoiceNote() {
  const voiceAudio = document.getElementById('personal-voice-audio');
  const playBtn = document.getElementById('voice-play-btn');
  const playIcon = document.getElementById('voice-play-icon');
  const durationLabel = document.getElementById('voice-duration-text');
  const statusHint = document.getElementById('voice-status-hint');
  const waveContainer = document.getElementById('voice-wave-container');
  const progressFill = document.getElementById('voice-progress-fill');
  const waveBarsContainer = document.getElementById('voice-wave-bars');
  const widget = document.querySelector('.voice-player-widget');
  const bgAudio = document.getElementById('site-audio');

  if (!voiceAudio || !playBtn) return;

  const waveBars = waveBarsContainer ? waveBarsContainer.querySelectorAll('span') : [];
  let isPlayingVoice = false;
  const knownTotalDuration = 79.24; // 1:19 min

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function getAudioDuration() {
    return (voiceAudio.duration && !isNaN(voiceAudio.duration) && isFinite(voiceAudio.duration) && voiceAudio.duration > 0)
      ? voiceAudio.duration
      : knownTotalDuration;
  }

  function updateDisplayTime() {
    const dur = getAudioDuration();
    const curr = voiceAudio.currentTime || 0;
    if (durationLabel) {
      durationLabel.textContent = `${formatTime(curr)} / ${formatTime(dur)}`;
    }

    const progress = Math.min(1, Math.max(0, curr / dur));
    if (progressFill) {
      progressFill.style.width = `${progress * 100}%`;
    }

    // Actualizar barras de onda de voz activas
    if (waveBars.length > 0) {
      const activeCount = Math.floor(progress * waveBars.length);
      waveBars.forEach((bar, idx) => {
        if (idx <= activeCount) {
          bar.classList.add('active');
        } else {
          bar.classList.remove('active');
        }
      });
    }
  }

  voiceAudio.addEventListener('loadedmetadata', updateDisplayTime);
  voiceAudio.addEventListener('timeupdate', updateDisplayTime);

  // Inicializar etiqueta
  updateDisplayTime();

  // Control de volumen de música de fondo (Audio Ducking)
  function duckBackgroundMusic(duck) {
    if (!bgAudio) return;
    const targetVolume = duck ? 0.15 : 0.85;
    const step = duck ? -0.05 : 0.05;

    const fade = setInterval(() => {
      if ((duck && bgAudio.volume > targetVolume) || (!duck && bgAudio.volume < targetVolume)) {
        bgAudio.volume = Math.max(0, Math.min(1, bgAudio.volume + step));
      } else {
        bgAudio.volume = targetVolume;
        clearInterval(fade);
      }
    }, 40);
  }

  async function togglePlayVoice() {
    if (voiceAudio.paused) {
      try {
        await voiceAudio.play();
        isPlayingVoice = true;
        playBtn.classList.add('playing');
        if (playIcon) playIcon.textContent = '⏸';
        if (widget) widget.classList.add('is-playing');
        if (statusHint) statusHint.textContent = 'Escuchando la voz de Charly... 🎙️💖';

        // Bajar volumen de la música de fondo para que resalte la voz
        duckBackgroundMusic(true);

        // Destello de corazones
        const rect = playBtn.getBoundingClientRect();
        createBurstParticle(rect.left + rect.width / 2, rect.top + rect.height / 2);
      } catch (err) {
        console.warn('Voice play blocked:', err);
      }
    } else {
      voiceAudio.pause();
      isPlayingVoice = false;
      playBtn.classList.remove('playing');
      if (playIcon) playIcon.textContent = '▶';
      if (widget) widget.classList.remove('is-playing');
      if (statusHint) statusHint.textContent = 'Pausado • Toca ▶ para reanudar';

      // Restaurar volumen de música de fondo
      duckBackgroundMusic(false);
    }
  }

  playBtn.addEventListener('click', togglePlayVoice);

  voiceAudio.addEventListener('ended', () => {
    isPlayingVoice = false;
    playBtn.classList.remove('playing');
    if (playIcon) playIcon.textContent = '▶';
    if (widget) widget.classList.remove('is-playing');
    if (statusHint) statusHint.textContent = 'Audio finalizado ♡ Con todo mi amor para ti';
    duckBackgroundMusic(false);
    playRomanticChime('fanfare');
  });

  // Tocar en cualquier parte de la onda de audio para adelantar o retroceder
  if (waveContainer) {
    waveContainer.addEventListener('click', (e) => {
      const rect = waveContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));
      const dur = getAudioDuration();
      voiceAudio.currentTime = ratio * dur;
      updateDisplayTime();
    });
  }
}


