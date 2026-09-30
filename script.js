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
   1. CANVAS DE PÉTALOS DE ROSA Y LUCIÉRNAGAS (RAY STYLE)
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
  });

  // Crear pétalos
  const petals = [];
  const petalCount = window.innerWidth < 768 ? 16 : 28;
  for (let i = 0; i < petalCount; i++) {
    petals.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 6,
      speedX: (Math.random() - 0.5) * 1.2,
      speedY: Math.random() * 1.2 + 0.6,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 1.5,
      color: Math.random() > 0.4 ? 'rgba(230, 57, 86, 0.45)' : 'rgba(255, 179, 193, 0.55)'
    });
  }

  // Crear luciérnagas (Ray)
  const fireflies = [];
  const fireflyCount = window.innerWidth < 768 ? 12 : 22;
  for (let i = 0; i < fireflyCount; i++) {
    fireflies.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 1.5,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.01,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      alpha: Math.random() * 0.8 + 0.2
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Dibujar y actualizar pétalos
    petals.forEach(p => {
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
    });

    // Dibujar y actualizar luciérnagas
    fireflies.forEach(f => {
      f.angle += f.speed;
      f.alpha = Math.abs(Math.sin(f.angle));
      f.x += f.vx;
      f.y += f.vy;

      if (f.x < 0) f.x = width;
      if (f.x > width) f.x = 0;
      if (f.y < 0) f.y = height;
      if (f.y > height) f.y = 0;

      // Resplandor cálido
      const gradient = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius * 4);
      gradient.addColorStop(0, `rgba(255, 235, 120, ${f.alpha})`);
      gradient.addColorStop(0.5, `rgba(255, 183, 3, ${f.alpha * 0.4})`);
      gradient.addColorStop(1, 'rgba(255, 183, 3, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.radius * 4, 0, Math.PI * 2);
      ctx.fill();

      // Centro brillante
      ctx.fillStyle = `rgba(255, 255, 255, ${f.alpha})`;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.radius * 0.8, 0, Math.PI * 2);
      ctx.fill();
    });

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
    text.style.left = Math.random() * 95 + "vw";
    text.style.animationDuration = (3 + Math.random() * 5) + "s";
    text.style.fontSize = (14 + Math.random() * 8) + "px";
    document.body.appendChild(text);
    setTimeout(() => {
      if (text.parentNode) text.remove();
    }, 8500);
  }

  // Generar varias al inicio
  for (let i = 0; i < 6; i++) {
    setTimeout(createFallingText, i * 150);
  }

  setInterval(createFallingText, 300);
}
