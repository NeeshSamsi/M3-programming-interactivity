const forms = document.querySelectorAll(".conversion-form")
const conversionsContainer = document.querySelector("#conversions-container")
const clearButton = document.querySelector("#clear-button")

// type Conversion = {
//   id: string,
//   fromUnit: {
//     full: string,
//     shorthand: string,
//   },
//   fromValue: number,
//   toUnit: {
//     full: string,
//     shorthand: string,
//   },
//   toValue: number,
// };

// Get stored conversions, render them or show no conversions message
const conversions = JSON.parse(localStorage.getItem("conversions"))

if (!conversions || conversions.length === 0) {
  renderNoConversionsMessage()
} else {
  for (const conversion of conversions) {
    renderConversion(conversion)

    // Get rendered delete buttons & add event listener
    const deleteButtons = document.querySelectorAll(".delete-button")
    deleteButtons.forEach((button) => initializeDeleteButton(button))
  }
}

for (const form of forms) {
  form.addEventListener("submit", (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)
    const value = Number(data.value)
    const unit = form.dataset.unit

    // Validate input
    // if (!value || typeof value !== "number") {
    //   throw new Error(`Invalid input for form - ${unit}`);
    // }

    // Create conversion & update localStorage
    const conversion = createConversion(value, unit)
    const conversions = JSON.parse(localStorage.getItem("conversions")) || []
    conversions.push(conversion)
    localStorage.setItem("conversions", JSON.stringify(conversions))

    // Remove message if it's there & render conversion
    const errorEl = document.querySelector("#no-history")
    if (errorEl) {
      errorEl.remove()
    }
    renderConversion(conversion)

    form.reset()
  })
}

clearButton.addEventListener("click", () => {
  localStorage.setItem("conversions", JSON.stringify([]))

  const conversionElements = document.querySelectorAll(".conversion")
  conversionElements.forEach((element) => element.remove())

  renderNoConversionsMessage()
})

function renderNoConversionsMessage() {
  conversionsContainer.innerHTML = `
  <p id="no-history">No conversion history yet.</p>
`
}

function createConversion(value, unit) {
  switch (unit) {
    case "celsius":
      const fahrenheit = (9 / 5) * value + 32

      return {
        id: `celsius-fahrenheit-${new Date().toISOString()}`,
        fromUnit: { full: "Celsius", shorthand: "°C" },
        fromValue: value,
        toUnit: { full: "Fahrenheit", shorthand: "°F" },
        toValue: fahrenheit.toFixed(2),
      }

    case "fahrenheit":
      const celsius = (value - 32) * (5 / 9)

      return {
        id: `fahrenheit-celsius-${new Date().toISOString()}`,
        fromUnit: { full: "Fahrenheit", shorthand: "°F" },
        fromValue: value,
        toUnit: { full: "Celsius", shorthand: "°C" },
        toValue: celsius.toFixed(2),
      }

    case "kilometre":
      const mile = value / 1.609

      return {
        id: `kilometre-mile-${new Date().toISOString()}`,
        fromUnit: { full: "Kilometres", shorthand: "km" },
        fromValue: value,
        toUnit: { full: "Miles", shorthand: "m" },
        toValue: mile.toFixed(2),
      }

    case "mile":
      const kilometre = value * 1.609

      return {
        id: `mile-kilometre-${new Date().toISOString()}`,
        fromUnit: { full: "Miles", shorthand: "m" },
        fromValue: value,
        toUnit: { full: "Kilometres", shorthand: "km" },
        toValue: kilometre.toFixed(2),
      }

    case "minute":
      const day = value / (24 * 60)

      return {
        id: `minute-day-${new Date().toISOString()}`,
        fromUnit: { full: "Minutes", shorthand: "m" },
        fromValue: value,
        toUnit: { full: "Days", shorthand: "d" },
        toValue: day.toFixed(2),
      }

    case "day":
      const minute = value * (24 * 60)

      return {
        id: `day-minute-${new Date().toISOString()}`,
        fromUnit: { full: "Days", shorthand: "d" },
        fromValue: value,
        toUnit: { full: "Minutes", shorthand: "m" },
        toValue: minute.toFixed(2),
      }

    default:
      throw new Error(`Invalid unit - ${unit}`)
  }
}

function renderConversion({ id, fromUnit, fromValue, toUnit, toValue }) {
  const conversion = document.createElement("div")
  conversion.classList.add("conversion")
  conversion.id = id

  const content = document.createElement("div")
  content.innerHTML = `
    <h3>${fromUnit.full} to ${toUnit.full}</h3>
    <p>${fromValue}${fromUnit.shorthand} = ${toValue}${toUnit.shorthand}</p>
  `

  const deleteButton = document.createElement("button")
  deleteButton.classList.add("delete-button")
  deleteButton.dataset.conversionId = id
  deleteButton.innerHTML = `<img src="delete.svg" class="icon" />`

  initializeDeleteButton(deleteButton)

  conversion.append(content, deleteButton)

  conversionsContainer.prepend(conversion)
}

function initializeDeleteButton(button) {
  const conversionId = button.dataset.conversionId

  button.addEventListener("click", () => {
    const storedConversions = JSON.parse(localStorage.getItem("conversions"))
    const filteredConversions = storedConversions.filter(
      (conversion) => conversion.id !== conversionId
    )
    localStorage.setItem("conversions", JSON.stringify(filteredConversions))

    const targetConversion = document.getElementById(conversionId)
    console.log(targetConversion)
    targetConversion.remove()

    if (!filteredConversions || filteredConversions.length === 0) {
      renderNoConversionsMessage()
    }
  })
}
