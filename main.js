const API_KEY = 'hrttKJYqfwf1WSJeRJL-GyqEOph8-EvZNWUhdm-fhyU'
const galleryTop = document.getElementById('gallery-top')
const galleryBottom = document.getElementById('gallery-bottom')
const changeThemeBtn = document.getElementById('changeThemeBtn')

async function loadRandomImages() {
  try {
    const res = await fetch(
      `https://api.unsplash.com/photos/random?count=24&client_id=${API_KEY}`
    )
    const data = await res.json()
    displayImagesInGalleries(data)
  } catch (error) {
    console.error('Erreur lors du chargement des images :', error)
  }
}

window.onload = loadRandomImages

if (changeThemeBtn) {
  changeThemeBtn.addEventListener('click', () => {
    loadRandomImages()
  })
}

function displayImagesInGalleries(images) {
  galleryTop.innerHTML = ''
  galleryBottom.innerHTML = ''

  const shuffled = [...images].sort(() => Math.random() - 0.5)

  const half = Math.ceil(shuffled.length / 2)
  const topImages = shuffled.slice(0, half)
  const bottomImages = shuffled.slice(half)

  topImages.forEach(img => {
    const imgEl = document.createElement('img')
    imgEl.src = img.urls.small
    imgEl.alt = img.alt_description || 'Image'
    galleryTop.appendChild(imgEl)
  })

  bottomImages.forEach(img => {
    const imgEl = document.createElement('img')
    imgEl.src = img.urls.small
    imgEl.alt = img.alt_description || 'Image'
    galleryBottom.appendChild(imgEl)
  })
}
