const API_KEY = 'hrttKJYqfwf1WSJeRJL-GyqEOph8-EvZNWUhdm-fhyU'
const galleryTop = document.getElementById('gallery-top')
const galleryBottom = document.getElementById('gallery-bottom')

async function loadDefaultImages() {
  try {
    const res = await fetch(
      `https://api.unsplash.com/photos?per_page=24&client_id=${API_KEY}`
    )
    const data = await res.json()
    displayImagesInGalleries(data)
  } catch (error) {
    console.error('Erreur lors du chargement des images :', error)
  }
}

window.onload = loadDefaultImages

async function searchImages(query) {
  if (!query.trim()) {
    loadDefaultImages()
    return
  }

  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&per_page=16&client_id=${API_KEY}`
    )
    const data = await res.json()

    displayImagesInGalleries(data.results)
  } catch (error) {
    console.error('Erreur lors de la recherche :', error)
  }
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
