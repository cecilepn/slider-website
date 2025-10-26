const API_KEY = 'hrttKJYqfwf1WSJeRJL-GyqEOph8-EvZNWUhdm-fhyU'
const galleryTop = document.getElementById('gallery-top')
const galleryBottom = document.getElementById('gallery-bottom')

async function loadDefaultImages() {
  try {
    const res = await fetch(
      `https://api.unsplash.com/photos?per_page=16&client_id=${API_KEY}`
    )
    const data = await res.json()

    galleryTop.innerHTML = ''
    galleryBottom.innerHTML = ''

    data.forEach(img => {
      const imgElTop = document.createElement('img')
      imgElTop.src = img.urls.small
      imgElTop.alt = img.alt_description || 'Image'

      const imgElBottom = document.createElement('img')
      imgElBottom.src = img.urls.small
      imgElBottom.alt = img.alt_description || 'Image'

      galleryTop.appendChild(imgElTop)
      galleryBottom.appendChild(imgElBottom)
    })
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

    galleryTop.innerHTML = ''
    galleryBottom.innerHTML = ''

    data.results.forEach(img => {
      const imgElTop = document.createElement('img')
      imgElTop.src = img.urls.small
      imgElTop.alt = img.alt_description || 'Image'

      const imgElBottom = document.createElement('img')
      imgElBottom.src = img.urls.small
      imgElBottom.alt = img.alt_description || 'Image'

      galleryTop.appendChild(imgElTop)
      galleryBottom.appendChild(imgElBottom)
    })
  } catch (error) {
    console.error('Erreur lors de la recherche :', error)
  }
}
