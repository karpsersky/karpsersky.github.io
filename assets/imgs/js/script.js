document.addEventListener("DOMContentLoaded", () => {
  // Inicializar el preloader con corazón creciente
  initPreloader()

  // Crear partículas decorativas
  createParticles()

  // Inicializar efecto de máquina de escribir
  initTypewriter()

  // Inicializar animaciones al hacer scroll
  initScrollAnimations()

  // Inicializar efecto parallax
  initParallaxEffect()

  // Crear lluvia de pétalos de rosa
  createPetals()

  // Inicializar botón de transición especial
  initSpecialButton()
})

// Inicializar el preloader con corazón creciente
function initPreloader() {
  const preloader = document.getElementById("preloader")
  const heartLoader = document.querySelector(".heart-loader")

  // Ocultar el preloader después de la animación del corazón
  setTimeout(() => {
    preloader.style.backgroundColor = "white"

    setTimeout(() => {
      preloader.style.display = "none"

      // Animar la carta y el osito después de que se oculte el preloader
      setTimeout(() => {
        const letter = document.querySelector(".letter")
        const teddy = document.querySelector(".teddy-container")

        letter.classList.add("active")
        teddy.classList.add("active")

        // Mostrar el indicador de scroll después de que la carta y el osito se animen
        setTimeout(() => {
          const scrollIndicator = document.querySelector(".scroll-indicator")
          scrollIndicator.classList.add("active")
        }, 1500)
      }, 500)
    }, 1000)
  }, 2500) // Tiempo suficiente para que el corazón crezca
}

// Crear partículas decorativas
function createParticles() {
  const particlesContainer = document.querySelector(".particles")
  const particleCount = 50

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.classList.add("particle")

    // Estilos aleatorios para cada partícula
    const size = Math.random() * 5 + 2
    const posX = Math.random() * 100
    const posY = Math.random() * 100
    const opacity = Math.random() * 0.5 + 0.1
    const animationDuration = Math.random() * 20 + 10
    const animationDelay = Math.random() * 5

    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background-color: var(--primary-color);
      opacity: ${opacity};
      top: ${posY}%;
      left: ${posX}%;
      animation: float ${animationDuration}s infinite linear;
      animation-delay: ${animationDelay}s;
    `

    particlesContainer.appendChild(particle)
  }

  // Añadir keyframes para la animación float
  const styleSheet = document.createElement("style")
  styleSheet.textContent = `
    @keyframes float {
      0% {
        transform: translate(0, 0) rotate(0deg);
      }
      25% {
        transform: translate(10px, -10px) rotate(90deg);
      }
      50% {
        transform: translate(0, -20px) rotate(180deg);
      }
      75% {
        transform: translate(-10px, -10px) rotate(270deg);
      }
      100% {
        transform: translate(0, 0) rotate(360deg);
      }
    }
  `
  document.head.appendChild(styleSheet)
}

// Inicializar efecto de máquina de escribir
function initTypewriter() {
  const lines = document.querySelectorAll(".typewriter")
  if (lines.length === 0) return

  const delays = [0.8, 1.2, 2.2, 2.6, 3.6, 4, 5, 5.4, 5.8, 6.2, 7.2, 7.6, 8, 8.4, 8.8]

  // Función para verificar si un elemento está en el viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
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
  const revealElements = document.querySelectorAll(".reveal-block")

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

// Inicializar efecto parallax
function initParallaxEffect() {
  const parallaxItems = document.querySelectorAll(".parallax-item")

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY

    parallaxItems.forEach((item) => {
      const speed = 0.05
      const itemTop = item.getBoundingClientRect().top + scrollY
      const itemOffset = (scrollY - itemTop) * speed

      item.style.transform = `translateY(${itemOffset}px)`
    })
  })
}

// Crear lluvia de pétalos de rosa
function createPetals() {
  const petalsContainer = document.querySelector(".petals-container")
  const petalCount = 30

  for (let i = 0; i < petalCount; i++) {
    createPetal(petalsContainer)
  }

  // Crear nuevos pétalos periódicamente
  setInterval(() => {
    if (document.querySelector(".final-quote").getBoundingClientRect().top < window.innerHeight) {
      createPetal(petalsContainer)
    }
  }, 300)
}

function createPetal(container) {
  const petal = document.createElement("div")
  petal.classList.add("petal")

  // Estilos aleatorios para cada pétalo
  const size = Math.random() * 10 + 10
  const posX = Math.random() * 100
  const rotation = Math.random() * 360
  const duration = Math.random() * 10 + 5
  const delay = Math.random() * 5
  const color = Math.random() > 0.5 ? "#ffb6c1" : "#f8bbd0"

  petal.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${posX}%;
    transform: rotate(${rotation}deg);
    animation-duration: ${duration}s;
    animation-delay: ${delay}s;
    background-color: ${color};
  `

  container.appendChild(petal)

  // Eliminar el pétalo después de que termine la animación
  setTimeout(
    () => {
      petal.remove()
    },
    (duration + delay) * 1000,
  )
}

// Inicializar botón de transición especial
function initSpecialButton() {
  const specialButton = document.getElementById("special-button")
  const specialTransition = document.getElementById("special-transition")

  if (!specialButton || !specialTransition) return

  specialButton.addEventListener("click", () => {
    // Activar la transición especial
    specialTransition.classList.add("active")

    // Reproducir sonido de latido de corazón (opcional)
    // const heartbeat = new Audio('sound/heartbeat.mp3');
    // heartbeat.play();

    // Después de un tiempo, permitir que el usuario cierre la transición haciendo clic
    setTimeout(() => {
      specialTransition.addEventListener(
        "click",
        () => {
          specialTransition.classList.remove("active")
        },
        { once: true },
      )
    }, 3000)
  })
}
