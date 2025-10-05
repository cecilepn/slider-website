const API_KEY = 'hrttKJYqfwf1WSJeRJL-GyqEOph8-EvZNWUhdm-fhyU'
const carousel = document.getElementById('carousel')
const arrowIcons = document.querySelectorAll('.wrapper .arrow')

let firstImg
let isDragStart = false,
  prevPageX,
  prevScrollLeft

async function loadSliderImages() {
  const res = await fetch(
    `https://api.unsplash.com/photos/random?count=6&client_id=${API_KEY}`
  )
  const data = await res.json()

  carousel.innerHTML = ''
  data.forEach(img => {
    const imgEl = document.createElement('img')
    imgEl.src = img.urls.small
    imgEl.alt = img.alt_description || 'Image'
    carousel.appendChild(imgEl)
  })

  firstImg = carousel.querySelectorAll('img')[0]
  showHideIcons()
}

// Affiche/cache les flèches selon la position
const showHideIcons = () => {
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth
  arrowIcons[0].style.display = carousel.scrollLeft <= 0 ? 'none' : 'block'
  arrowIcons[1].style.display =
    carousel.scrollLeft >= scrollWidth ? 'none' : 'block'
}

// Navigation avec les flèches
arrowIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    let firstImgWidth = firstImg.clientWidth
    if (icon.id == 'left') {
      carousel.scrollLeft -= firstImgWidth
    } else {
      carousel.scrollLeft += firstImgWidth
    }
    setTimeout(() => showHideIcons(), 60)
  })
})

// Drag & drop
const dragStart = e => {
  isDragStart = true
  prevPageX = e.pageX
  prevScrollLeft = carousel.scrollLeft
}

const dragging = e => {
  if (!isDragStart) return
  e.preventDefault()
  carousel.classList.add('dragging')
  let positionDiff = e.pageX - prevPageX
  carousel.scrollLeft = prevScrollLeft - positionDiff
  showHideIcons()
}

const dragStop = () => {
  isDragStart = false
  carousel.classList.remove('dragging')
}

carousel.addEventListener('mousedown', dragStart)
carousel.addEventListener('mousemove', dragging)
carousel.addEventListener('mouseup', dragStop)
carousel.addEventListener('mouseleave', dragStop)

// Charger les images à l'ouverture
window.onload = loadSliderImages
