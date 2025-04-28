document.addEventListener("DOMContentLoaded", () => {
    // Crear imágenes de placeholder locales
    createPlaceholderImages()
  
    // Ocultar el preloader después de que todo esté cargado
    window.addEventListener("load", () => {
      setTimeout(() => {
        document.getElementById("preloader").style.display = "none"
      }, 500)
    })
  
    // Crear corazones flotantes
    createFloatingHearts("floating-hearts-hero", 20)
    createFloatingHearts("floating-hearts-final", 30)
  
    // Inicializar efecto de máquina de escribir
    initTypewriter()
  
    // Inicializar animaciones al hacer scroll
    initScrollAnimations()
  
    // Efecto parallax simple para el fondo del hero
    window.addEventListener("scroll", () => {
      const scrollPosition = window.pageYOffset
      const parallaxBg = document.querySelector(".parallax-bg")
      if (parallaxBg) {
        parallaxBg.style.backgroundPositionY = scrollPosition * 0.5 + "px"
      }
    })
  })
  
  // Crear imágenes de placeholder locales
  function createPlaceholderImages() {
    // Crear directorio img si no existe
    const imgDir = "img"
  
    // Crear placeholders para las imágenes de la galería
    createPlaceholder(600, 400, "#f9d1d1", "Primer Encuentro", `${imgDir}/placeholder1.jpg`)
    createPlaceholder(600, 400, "#f6e6bc", "El Reencuentro", `${imgDir}/placeholder2.jpg`)
    createPlaceholder(600, 400, "#f9d1f9", "Nuestro Beso", `${imgDir}/placeholder3.jpg`)
  
    // Crear placeholder para el fondo del hero
    createPlaceholder(1920, 1080, "#1e1b4b", "Fondo", `${imgDir}/hero-bg.jpg`)
  }
  
  // Crear una imagen de placeholder
  function createPlaceholder(width, height, color, text, filename) {
    // Verificar si el navegador soporta canvas
    if (!document.createElement("canvas").getContext) {
      console.warn("Tu navegador no soporta canvas, no se pueden crear placeholders.")
      return
    }
  
    // Crear un canvas
    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
  
    // Obtener el contexto 2D
    const ctx = canvas.getContext("2d")
  
    // Dibujar el fondo
    ctx.fillStyle = color
    ctx.fillRect(0, 0, width, height)
  
    // Dibujar un patrón
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
    for (let i = 0; i < width; i += 20) {
      for (let j = 0; j < height; j += 20) {
        if ((i + j) % 40 === 0) {
          ctx.fillRect(i, j, 10, 10)
        }
      }
    }
  
    // Dibujar el texto
    ctx.font = "30px 'Dancing Script', cursive"
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(text, width / 2, height / 2)
  
    // Convertir el canvas a una imagen
    const dataUrl = canvas.toDataURL("image/jpeg")
  
    // Buscar todas las imágenes que usan este placeholder
    const images = document.querySelectorAll(`img[src="${filename}"]`)
    images.forEach((img) => {
      img.src = dataUrl
    })
  
    // Si es el fondo del hero, actualizar el background-image
    if (filename === "img/hero-bg.jpg") {
      const heroBg = document.querySelector(".parallax-bg")
      if (heroBg) {
        heroBg.style.backgroundImage = `url(${dataUrl})`
      }
    }
  }
  
  // Crear corazones flotantes
  function createFloatingHearts(containerId, count) {
    const container = document.getElementById(containerId)
    if (!container) return
  
    const heartSymbols = ["❤️", "💕", "💖", "💗", "💓"]
  
    for (let i = 0; i < count; i++) {
      const heart = document.createElement("div")
      heart.classList.add("floating-heart")
      heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)]
  
      // Random position
      heart.style.left = `${Math.random() * 100}%`
      heart.style.top = `${Math.random() * 100}%`
  
      // Random size
      const size = Math.random() * 20 + 10
      heart.style.fontSize = `${size}px`
  
      // Random animation duration and delay
      const duration = Math.random() * 20 + 10
      const delay = Math.random() * 5
      heart.style.animationDuration = `${duration}s`
      heart.style.animationDelay = `${delay}s`
  
      container.appendChild(heart)
    }
  }
  
  // Inicializar efecto de máquina de escribir
  function initTypewriter() {
    const lines = document.querySelectorAll(".typewriter")
    if (lines.length === 0) return
  
    const delays = [0.8, 1.2, 2.2, 2.6, 3.6, 4, 5, 5.4, 5.8, 6.2, 7.2, 7.6, 8, 8.4, 8.8]
  
    // Función para verificar si un elemento está en el viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect()
      return rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0
    }
  
    // Verificar si la sección del poema está visible
    function checkPoemVisibility() {
      const poemSection = document.querySelector(".poem")
      if (!poemSection) return
  
      if (isInViewport(poemSection)) {
        startTypewriter()
        window.removeEventListener("scroll", checkPoemVisibility)
      }
    }
  
    // Añadir listener para el scroll
    window.addEventListener("scroll", checkPoemVisibility)
  
    // Verificar al cargar la página
    checkPoemVisibility()
  
    function startTypewriter() {
      lines.forEach((line, index) => {
        const text = line.textContent
        line.textContent = ""
        line.classList.add("active")
  
        setTimeout(
          () => {
            typeText(line, text)
          },
          (delays[index] || index * 0.5) * 1000,
        )
      })
    }
  
    function typeText(element, text) {
      element.classList.add("typing")
      let i = 0
      const interval = setInterval(() => {
        if (i < text.length) {
          element.textContent += text.charAt(i)
          i++
        } else {
          clearInterval(interval)
          element.classList.remove("typing")
        }
      }, 50)
    }
  }
  
  // Inicializar animaciones al hacer scroll
  function initScrollAnimations() {
    const revealElements = document.querySelectorAll(".reveal")
  
    function checkReveal() {
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight
  
        if (elementTop < windowHeight - 100) {
          element.classList.add("active")
        }
      })
    }
  
    window.addEventListener("scroll", checkReveal)
    window.addEventListener("resize", checkReveal)
  
    // Verificar al cargar la página
    checkReveal()
  }
  