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

  let currentIndex = 0

  const wrapper = document.createElement('div')
  wrapper.classList.add('slider-wrapper')

  const track = document.createElement('div')
  track.classList.add('slider-track')

  moodboard.forEach(url => {
    const img = document.createElement('img')
    img.src = url
    img.classList.add('slider-image')
    track.appendChild(img)
  })

  wrapper.appendChild(track)

  const prevBtn = document.createElement('button')
  prevBtn.classList.add('slider-btn', 'prev')
  prevBtn.textContent = '❮'

  const nextBtn = document.createElement('button')
  nextBtn.classList.add('slider-btn', 'next')
  nextBtn.textContent = '❯'

  const deleteBtn = document.createElement('button')
  deleteBtn.classList.add('slider-delete')
  deleteBtn.textContent = 'X'

  const counter = document.createElement('div')
  counter.classList.add('slider-counter')
  counter.textContent = `${currentIndex + 1} / ${moodboard.length}`

  function updateSlide() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`
    counter.textContent = `${currentIndex + 1} / ${moodboard.length}`
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + moodboard.length) % moodboard.length
    updateSlide()
  })

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % moodboard.length
    updateSlide()
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
      renderSlider()
    }
  })

  slider.appendChild(wrapper)
  slider.appendChild(prevBtn)
  slider.appendChild(nextBtn)
  slider.appendChild(deleteBtn)
  slider.appendChild(counter)

  updateSlide()
}

const iaInput = document.getElementById('iaInput')
const iaBtn = document.getElementById('iaBtn')
const analyzeBtn = document.getElementById('analyzeBtn')
const iaResponse = document.getElementById('iaResponse')

let lastQuery = ''

const originalSearchImages = searchImages
searchImages = async function (query) {
  lastQuery = query
  await originalSearchImages(query)
}

iaBtn.addEventListener('click', async () => {
  const userText = iaInput.value.trim()
  if (!userText) return
  iaResponse.textContent = 'AI is thinking...'

  try {
    const response = await puter.ai.chat(
      `You are a creative assistant specialized in moodboards.
      The user describes their moodboard as: "${userText}".
      Reformulate and enrich this description artistically in 2 sentences.
      Use evocative, emotional, and visual language.`
    )

    const answer = response.message.content

    iaResponse.innerHTML = `
      <p><strong>AI reformulation:</strong></p>
      <p>${answer}</p>
    `
  } catch (error) {
    iaResponse.textContent = 'Error: ' + error.message
    console.error(error)
  }
})

analyzeBtn.addEventListener('click', async () => {
  iaResponse.textContent = 'AI is thinking of related ideas...'

  if (!lastQuery) {
    iaResponse.textContent =
      'No theme detected yet. Please search for a theme first!'
    return
  }

  try {
    const response = await puter.ai.chat(
      `The current moodboard theme is "${lastQuery}".
      Suggest 3 related moodboard themes or ideas the user could explore next.
      Respond as a short list with one creative line each.`
    )

    const answer = response.message.content

    iaResponse.innerHTML = `
      <p><strong>Related ideas:</strong></p>
      <p>${answer}</p>
    `
  } catch (error) {
    iaResponse.textContent = 'Error: ' + error.message
    console.error(error)
  }
})
