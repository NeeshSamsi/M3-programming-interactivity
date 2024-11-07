// VIDEO MODAL
const videoModal = document.getElementById("video-modal")
const videoButton = document.getElementById("video-button")
const closeButton = document.querySelector(".close")

videoButton.addEventListener("click", () => {
  videoModal.showModal()
  videoModal.style.display = "flex"
})

closeButton.addEventListener("click", () => {
  videoModal.close()
  videoModal.style.display = "none"
})

// FAQs
const faqs = document.querySelectorAll(".faq")

faqs.forEach((faq) => {
  faq.addEventListener("click", () => {
    if (faq.dataset.active === "true") {
      faq.dataset.active = "false"
    } else {
      faq.dataset.active = "true"
    }
  })
})

// NEWSLETTER FORM
const newsletter = document.getElementById("newsletter-form")

newsletter.addEventListener("submit", (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)
  const { email } = Object.fromEntries(formData)

  console.log(email)

  const toast = document.getElementById("toast")
  toast.dataset.show = "true"
  setTimeout(() => {
    toast.dataset.show = "false"
  }, 3000)

  newsletter.reset()
})

// CANVAS
const canvas = document.getElementById("interactive-canvas")
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth - 300
canvas.height = window.innerHeight - 300

let isMouseDown = false

canvas.addEventListener("mousedown", () => {
  ctx.beginPath()
  isMouseDown = true
})

canvas.addEventListener("mouseup", () => {
  isMouseDown = false
})

canvas.addEventListener("mousemove", (event) => {
  const rect = canvas.getBoundingClientRect()
  const mouseX = event.clientX - rect.left
  const mouseY = event.clientY - rect.top

  if (isMouseDown) {
    drawLine(mouseX, mouseY)
  }
})

function drawLine(x, y) {
  ctx.lineTo(x, y)
  ctx.stroke()
}
