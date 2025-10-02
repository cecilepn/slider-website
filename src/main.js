const API_KEY = 'hrttKJYqfwf1WSJeRJL-GyqEOph8-EvZNWUhdm-fhyU'
const gallery = document.getElementById('gallery')

async function loadDefaultImages() {
  const res = await fetch(
    `https://api.unsplash.com/photos?per_page=12&client_id=${API_KEY}`
  )
  const data = await res.json()
  gallery.innerHTML = ''
  data.forEach(img => {
    const imgEl = document.createElement('img')
    imgEl.src = img.urls.small
    imgEl.alt = img.alt_description || 'Image'
    gallery.appendChild(imgEl)
  })
}
window.onload = loadDefaultImages

async function searchImages(query) {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&client_id=${API_KEY}`
  )
  const data = await res.json()
  gallery.innerHTML = ''
  data.results.forEach(img => {
    const imgEl = document.createElement('img')
    imgEl.src = img.urls.small
    imgEl.alt = img.alt_description || 'Image'
    gallery.appendChild(imgEl)
  })
}
