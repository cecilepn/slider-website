const API_KEY = 'hrttKJYqfwf1WSJeRJL-GyqEOph8-EvZNWUhdm-fhyU'
const searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('searchBtn')
const gallery = document.getElementById('gallery')

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim()
  if (query) searchImages(query)
})

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const query = searchInput.value.trim()
    if (query) searchImages(query)
  }
})

async function searchImages(query) {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&per_page=20&client_id=${API_KEY}`
    )
    const data = await res.json()
    displayImages(data.results)
  } catch (error) {
    console.error('Erreur lors de la recherche :', error)
  }
}

function displayImages(images) {
  gallery.innerHTML = ''
  if (!images.length) {
    gallery.innerHTML = '<p>No results found. Try another theme!</p>'
    return
  }

  images.forEach(img => {
    const imgEl = document.createElement('img')
    imgEl.src = img.urls.small
    imgEl.alt = img.alt_description || 'Image'
    imgEl.addEventListener('click', () => addToMoodboard(img.urls.full))
    gallery.appendChild(imgEl)
  })
}

function addToMoodboard(imageUrl) {
  let moodboard = JSON.parse(localStorage.getItem('moodboard')) || []
  if (!moodboard.includes(imageUrl)) {
    moodboard.push(imageUrl)
    localStorage.setItem('moodboard', JSON.stringify(moodboard))
    alert('Image added to your moodboard!')
  } else {
    alert('This image is already in your moodboard.')
  }
}
