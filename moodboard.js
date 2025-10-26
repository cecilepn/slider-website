const API_KEY = 'hrttKJYqfwf1WSJeRJL-GyqEOph8-EvZNWUhdm-fhyU'
const searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('searchBtn')
const gallery = document.getElementById('gallery')
const slider = document.getElementById('slider')

window.addEventListener('load', renderSlider)

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

    imgEl.addEventListener('click', () => {
      addToMoodboard(img.urls.full)
      renderSlider()
    })

    gallery.appendChild(imgEl)
  })
}

function addToMoodboard(imageUrl) {
  let moodboard = JSON.parse(localStorage.getItem('moodboard')) || []
  if (!moodboard.includes(imageUrl)) {
    moodboard.push(imageUrl)
    localStorage.setItem('moodboard', JSON.stringify(moodboard))
  }
}

function renderSlider() {
  const moodboard = JSON.parse(localStorage.getItem('moodboard')) || []
  slider.innerHTML = ''

  if (moodboard.length === 0) {
    slider.innerHTML = '<p>Your moodboard is empty — add images!</p>'
    return
  }

  let currentIndex = 0

  const wrapper = document.createElement('div')
  wrapper.classList.add('slider-wrapper')

  const imgEl = document.createElement('img')
  imgEl.classList.add('slider-image')
  imgEl.src = moodboard[currentIndex]
  wrapper.appendChild(imgEl)

  const prevBtn = document.createElement('button')
  prevBtn.classList.add('slider-btn', 'prev')
  prevBtn.textContent = '❮'

  const nextBtn = document.createElement('button')
  nextBtn.classList.add('slider-btn', 'next')
  nextBtn.textContent = '❯'

  const deleteBtn = document.createElement('button')
  deleteBtn.classList.add('slider-delete')
  deleteBtn.textContent = 'X'

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + moodboard.length) % moodboard.length
    imgEl.src = moodboard[currentIndex]
  })

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % moodboard.length
    imgEl.src = moodboard[currentIndex]
  })

  deleteBtn.addEventListener('click', () => {
    if (confirm('Remove this image from your moodboard?')) {
      moodboard.splice(currentIndex, 1)
      localStorage.setItem('moodboard', JSON.stringify(moodboard))

      if (moodboard.length === 0) {
        renderSlider()
        return
      }

      currentIndex = Math.min(currentIndex, moodboard.length - 1)
      imgEl.src = moodboard[currentIndex]
    }
  })

  slider.appendChild(wrapper)
  slider.appendChild(prevBtn)
  slider.appendChild(nextBtn)
  slider.appendChild(deleteBtn)
}
