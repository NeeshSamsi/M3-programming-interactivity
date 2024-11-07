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

const canvas = document.getElementById("interactive-canvas")
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth - 300
canvas.height = window.innerHeight - 300

console.log(window.innerWidth - 160, window.innerHeight - 160)

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
