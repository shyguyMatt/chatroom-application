var colorPickerBtn = document.getElementById('color')
var colorPicker = document.getElementById('color-picker')
var closeBtn = document.getElementById('color-close')
const colors = [
  '#e6194B',
  '#3cb44b',
  '#ffe119',
  '#4363d8',
  '#f58231',
  '#911eb4',
  '#42d4f4',
  '#f032e6',
  '#bfef45',
  '#fabed4',
  '#469990',
  '#dcbeff',
  '#9A6324',
  '#fffac8',
  '#800000',
  '#aaffc3',
  '#808000',
  '#ffd8b1',
  '#000075',
  '#a9a9a9'
]

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

if (!localStorage.color) {
  localStorage.color = colors[getRandomInt(0,20)]
}

colorPicker.addEventListener("click", (e) => {
  e.preventDefault()

  if (e.target.classList.contains('colorBtn')) {
    localStorage.color = e.target.value
    colorPicker.classList.toggle('color-picker-up')
  }
})

colorPickerBtn.addEventListener("click", (e) => {
  e.preventDefault()
  
  colorPicker.classList.toggle('color-picker-up')
})

closeBtn.addEventListener("click", (e) => {
  e.preventDefault()

  colorPicker.classList.toggle('color-picker-up')
})

for (i in colors) {
  let newButton = document.createElement('button')
  newButton.value = colors[i]
  newButton.classList.add('colorBtn')
  newButton.style.backgroundColor = colors[i]
  colorPicker.appendChild(newButton)
}