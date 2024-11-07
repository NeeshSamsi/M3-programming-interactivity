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
