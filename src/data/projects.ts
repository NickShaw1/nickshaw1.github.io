export type ProjectCategory = 'Exercises' | 'GitHub' | 'Testing' | 'Sites'
export type ModalSize = 'standard' | 'expanded'

export interface ProjectDetail {
  body: string
  highlights: string[]
  codeSnippet?: string
}

export interface ProjectItem {
  id: string
  title: string
  description: string
  stack: string[]
  category: ProjectCategory
  githubUrl?: string
  liveUrl?: string
  internalUrl?: string
  featured?: boolean
  highlighted?: boolean
  modalSize?: ModalSize
  icon?: string
  detail?: ProjectDetail
}

export const projects: ProjectItem[] = [
  // ── Exercises ────────────────────────────────────────────
  {
    id: 'earthquake-tracker',
    title: 'Earthquake Tracker',
    description: 'Real-time global earthquake map with tectonic plate boundaries on a 3D globe.',
    stack: ['TypeScript', 'Three.js', 'USGS API'],
    category: 'Exercises',
    featured: true,
    modalSize: 'expanded',
    icon: 'Activity',
    detail: {
      body: 'A live earthquake tracker powered by the USGS real-time GeoJSON feeds, rendered on a rotating Three.js globe. Filter by time window and minimum magnitude. Quake markers are sized and coloured by magnitude, with tectonic plate boundaries overlaid from Peter Bird\'s PB2002 dataset. Click any marker to inspect its details.',
      highlights: [
        'Fetching and parsing [USGS GeoJSON](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) feeds with configurable time range (hour / day / week / month) and magnitude threshold (M2.5+, M4.5+, significant)',
        'Batching earthquake markers into InstancedMeshes (glow ring, core dot and invisible hit target per quake) to keep draw calls constant regardless of event count',
        'Mapping magnitude to both marker size (logarithmic-like scale) and colour band: cyan for minor, violet for light, orange for strong and red for major events',
        'Projecting tectonic plate boundary LineStrings from the PB2002 GeoJSON dataset onto the globe surface as Three.js Lines with a small radial offset to avoid z-fighting',
        'Raycasting against the InstancedMesh on click to identify and surface the selected earthquake\'s details',
        'Globe auto-orbits on load and resumes after 10 seconds of no interaction',
      ],
      codeSnippet: `// Flat disc markers — CircleGeometry keeps overdraw minimal at scale
const geo  = new THREE.CircleGeometry(1, 24)
const mat  = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, depthWrite: false })
const mesh = new THREE.InstancedMesh(geo, mat, quakes.length)

quakes.forEach((q, i) => {
  const pos = latLonToVec3(q.lat, q.lon, EARTH_R * 1.011)
  dummy.position.copy(pos)
  dummy.lookAt(0, 0, 0)                        // orient disc tangent to the globe surface
  dummy.scale.setScalar(quakeRadius(q.mag))    // magnitude → size
  dummy.updateMatrix()
  mesh.setMatrixAt(i, dummy.matrix)
  mesh.setColorAt(i, magColor(q.mag))          // magnitude → colour band
})`,
    },
  },
  {
    id: 'iss-tracker',
    title: 'ISS Tracker',
    description: 'Live ISS tracker on a 3D Earth with real-time telemetry.',
    stack: ['TypeScript', 'React', 'Three.js', 'API'],
    category: 'Exercises',
    featured: true,
    modalSize: 'expanded',
    icon: 'Satellite',
    detail: {
      body: 'A live ISS tracker built with Three.js. The Earth sphere uses a real texture map with a procedural cloud layer on top and an atmospheric glow rendered via a custom GLSL fresnel shader. The camera stays locked on the ISS at all times, smoothly tracking as it moves across the globe.',
      highlights: [
        'Atmospheric glow via a custom GLSL fresnel shader on a second transparent sphere',
        'Mapping live lat/lng coordinates to a 3D point on the sphere surface using spherical-to-Cartesian conversion',
        'Smooth camera tracking via lerp interpolation, keeping the ISS centred as position updates, with drag-to-explore and auto-recentre after five seconds',
        'Pulsing ring marker using RingGeometry, scaled and oriented toward the camera each frame for a radar-pulse effect',
        'Current crew fetched from a live API and grouped by spacecraft',
      ],
      codeSnippet: `// Convert lat/lng to a 3D point on the globe surface
function issLatLonToVec3(lat: number, lon: number, r: number) {
  const phi   = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  )
}

// Smooth camera tracking with lerp each frame
camera.position.lerp(
  issPos.clone().multiplyScalar(3.4), 0.03
)`,
    },
  },
  {
    id: 'piano',
    title: 'Synthesizer',
    description: 'A polyphonic synthesizer with ADSR envelope, filter, distortion, reverb and LFO.',
    stack: ['TypeScript', 'React', 'Web Audio API'],
    category: 'Exercises',
    featured: true,
    modalSize: 'expanded',
    icon: 'Music',
    detail: {
      body: 'A fully functional synthesizer built on the Web Audio API. Choose from four waveforms, shape the sound with an ADSR envelope, sculpt tone with a resonant lowpass filter, add grit with a distortion waveshaper, create space with a convolution reverb and add movement with an LFO.',
      highlights: [
        'Constructing a Web Audio signal chain: oscillator → ADSR gain → filter → distortion → dry/wet reverb blend → master',
        'Implementing ADSR envelope scheduling with AudioParam.setTargetAtTime and linearRampToValueAtTime',
        'Generating impulse response buffers in-code for convolution reverb',
        'Building a waveshaper distortion curve with a sigmoid function',
        'LFO modulating oscillator frequency via a separate GainNode',
        'Handling polyphonic note tracking across mouse, touch and keyboard input simultaneously',
      ],
      codeSnippet: `const ctx    = new AudioContext()
const osc    = ctx.createOscillator()
const gain   = ctx.createGain()
const filter = ctx.createBiquadFilter()
const shaper = ctx.createWaveShaper()
const reverb = ctx.createConvolver()
const master = ctx.createGain()

osc.type          = 'sawtooth'
filter.type       = 'lowpass'
filter.frequency.value = 2000

// Signal chain
osc.connect(gain)
gain.connect(filter)
filter.connect(shaper)
shaper.connect(reverb)
reverb.connect(master)
master.connect(ctx.destination)`,
    },
  },
  {
    id: 'weather-app',
    title: 'Weather App',
    description: 'Live weather data via the Open-Meteo API with current conditions and 24hr forecast across five cities.',
    stack: ['TypeScript', 'React', 'API'],
    category: 'Exercises',
    modalSize: 'standard',
    icon: 'Cloud',
    detail: {
      body: 'A live weather dashboard fetching current conditions and a 24-hour forecast from the Open-Meteo API. Switch between Belfast, London, Paris, New York and Tokyo. Temperature displayed in Celsius with Fahrenheit shown beneath.',
      highlights: [
        'Fetching and parsing structured JSON from a public weather API',
        'Caching responses per city to avoid redundant network calls',
        'Mapping WMO weather codes to human-readable labels and icons',
        'Filtering hourly forecast data to 3-hour intervals for a clean display',
      ],
      codeSnippet: `const cache: Record<string, WeatherData> = {}

async function fetchWeather(city: City) {
  if (cache[city.name]) return cache[city.name]

  const params = new URLSearchParams({
    latitude:        String(city.lat),
    longitude:       String(city.lng),
    current_weather: 'true',
    hourly:          'temperature_2m,weathercode',
    timezone:        'auto',
  })
  const res  = await fetch(\`https://api.open-meteo.com/v1/forecast?\${params}\`)
  const data = await res.json() as WeatherData
  cache[city.name] = data
  return data
}`,
    },
  },
  {
    id: 'holiday-planner',
    title: 'Holiday Planner',
    description: 'Plan and cost a holiday with an interactive itinerary builder.',
    stack: ['TypeScript', 'React'],
    category: 'Exercises',
    modalSize: 'expanded',
    icon: 'Plane',
    detail: {
      body: 'An interactive holiday planner for costing a trip of up to one month. Enter a destination, pick start and end dates, select a currency and build an itemised itinerary with individual costs that roll up into a running total.',
      highlights: [
        'Date range validation capped at one calendar month',
        'Dynamic itinerary list capped at 10 items with add, clear and remove controls',
        'Per-item cost validation with a maximum of 10,000 per line',
        'Running total derived from itinerary state on every render',
        'Night count and destination reflected live in the header',
        'Currency selector updating the symbol across the whole widget',
      ],
      codeSnippet: `const [items, setItems] = useState([{ label: '', cost: '' }])

const total = items.reduce((sum, item) => {
  const n = parseFloat(item.cost)
  return sum + (isNaN(n) ? 0 : n)
}, 0)

// Cap end date to one month after start
const maxEnd = (() => {
  const d = new Date(startDate)
  d.setMonth(d.getMonth() + 1)
  return d.toISOString().split('T')[0]
})()

// Night count
const nights = Math.round(
  (new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000
)`,
    },
  },
  {
    id: 'currency-converter',
    title: 'Currency Converter',
    description: 'Live currency conversion via the Frankfurter API.',
    stack: ['TypeScript', 'React', 'API'],
    category: 'Exercises',
    modalSize: 'standard',
    icon: 'DollarSign',
    detail: {
      body: 'A live currency converter fetching real-time exchange rates from the Frankfurter API. Select a base currency and target, enter an amount, and get the converted value instantly.',
      highlights: [
        'Fetching live exchange rates from a public REST API',
        'Handling async state across loading, success and error phases',
        'Formatting currency output with locale-aware number formatting',
      ],
      codeSnippet: `async function convert(
  amount: number,
  from: string,
  to: string
): Promise<number> {
  const params = new URLSearchParams({ from, to })
  const res    = await fetch(
    \`https://api.frankfurter.app/latest?\${params}\`
  )
  if (!res.ok) throw new Error('Rate fetch failed')
  const data = await res.json()
  return amount * data.rates[to]
}

// Locale-aware output
result.toLocaleString('en-GB', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})`,
    },
  },
  {
    id: 'reviews-carousel',
    title: 'Reviews Carousel',
    description: 'Cycles through testimonials with navigation buttons and random selection.',
    stack: ['TypeScript', 'React'],
    category: 'Exercises',
    modalSize: 'standard',
    icon: 'MessageSquare',
    detail: {
      body: 'A testimonial carousel cycling through reviews with previous, next and random navigation. Built to practise managing index state across a bounded array with wrapping logic.',
      highlights: [
        'Wrapping index arithmetic to loop seamlessly in both directions',
        'Random selection that always picks a different item from the current one',
        'Animating content transitions between slides',
      ],
      codeSnippet: `const [index, setIndex] = useState(0)

function prev() {
  setIndex(i => (i - 1 + reviews.length) % reviews.length)
}

function next() {
  setIndex(i => (i + 1) % reviews.length)
}

function random() {
  setIndex(current => {
    let next: number
    do {
      next = Math.floor(Math.random() * reviews.length)
    } while (next === current)
    return next
  })
}`,
    },
  },
  {
    id: 'tabs',
    title: 'Tabs',
    description: 'Organises content into switchable sections with active state highlighting.',
    stack: ['TypeScript', 'React'],
    category: 'Exercises',
    modalSize: 'standard',
    icon: 'Layers',
    detail: {
      body: 'A tabbed interface built to practise managing active state across sibling elements. Clicking a tab updates the highlighted tab and swaps the visible content panel without any page reload.',
      highlights: [
        'Tracking active index in state and deriving both tab and panel classes from it',
        'Separating data (tab labels + content) from presentation logic',
        'Accessible active indication with aria-selected',
      ],
      codeSnippet: `const tabs  = document.querySelectorAll('.tab')
const panels = document.querySelectorAll('.panel')

tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => {
    tabs.forEach(t  => t.classList.remove('active'))
    panels.forEach(p => p.classList.remove('active'))
    tab.classList.add('active')
    panels[i].classList.add('active')
  })
})`,
    },
  },
  {
    id: 'accordion',
    title: 'Accordion',
    description: 'Collapsible panels for organised, interactive content display.',
    stack: ['TypeScript', 'React'],
    category: 'Exercises',
    modalSize: 'standard',
    icon: 'ChevronDown',
    detail: {
      body: 'An accordion that collapses all other panels whenever a new one is opened. Built to practise toggling classes across a set of related elements and handling the "only one open at a time" constraint.',
      highlights: [
        'Closing all sibling items before opening the clicked one',
        'Using CSS max-height transitions for smooth expand/collapse',
        'Querying relative DOM siblings rather than re-selecting the full list each time',
      ],
      codeSnippet: `const items = document.querySelectorAll('.accordion-item')

items.forEach(item => {
  item.querySelector('.accordion-btn')
    .addEventListener('click', () => {
      const isOpen = item.classList.contains('open')
      items.forEach(i => i.classList.remove('open'))
      if (!isOpen) item.classList.add('open')
    })
})`,
    },
  },
  {
    id: 'calculator',
    title: 'Calculator',
    description: 'A clean in-browser calculator for everyday arithmetic.',
    stack: ['TypeScript', 'React'],
    category: 'Exercises',
    modalSize: 'standard',
    icon: 'Calculator',
    detail: {
      body: 'A fully functional calculator handling addition, subtraction, multiplication and division. Built to practise managing multi-step state (current value, pending operator, waiting for next operand) without a framework.',
      highlights: [
        'Tracking calculator state across multiple keypresses without a class or framework',
        'Handling edge cases: repeated equals, operator chaining, leading decimals',
        'Separating the compute function from the UI update logic',
      ],
      codeSnippet: `function compute(a, op, b) {
  const x = parseFloat(a), y = parseFloat(b)
  if (op === '+') return x + y
  if (op === '-') return x - y
  if (op === '*') return x * y
  if (op === '/') return y !== 0 ? x / y : 'Error'
  return b
}`,
    },
  },
  {
    id: 'simple-modal',
    title: 'Simple Modal',
    description: 'A basic modal with an overlay, content area and close button.',
    stack: ['TypeScript', 'React'],
    category: 'Exercises',
    modalSize: 'standard',
    icon: 'Square',
    detail: {
      body: 'A from-scratch modal implementation covering the three standard ways to dismiss it: the close button, clicking the backdrop and pressing Escape. Built to understand the pattern before relying on any library.',
      highlights: [
        'Three dismiss vectors: button click, backdrop click, Escape key',
        'Locking body scroll while the modal is open',
        'Toggling a single CSS class to drive all show/hide behaviour',
      ],
      codeSnippet: `const modal   = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')

function openModal()  { modal.classList.add('show') }
function closeModal() { modal.classList.remove('show') }

overlay.addEventListener('click', closeModal)
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal()
})`,
    },
  },
  {
    id: 'colour-flipper',
    title: 'Colour Flipper',
    description: 'Changes the page background colour with preset options.',
    stack: ['TypeScript', 'React'],
    category: 'Exercises',
    modalSize: 'standard',
    icon: 'Palette',
    detail: {
      body: 'Cycles through a list of preset hex colours, updating the page background and displaying the current hex value. A simple first exercise in DOM manipulation and array iteration.',
      highlights: [
        'Reading from an array and applying values directly to element styles',
        'Displaying state (the hex code) back to the user in real time',
        'Wrapping the index to loop back to the start of the colour list',
      ],
      codeSnippet: `const colors = ['#f1c40f','#e74c3c','#2ecc71','#3498db','#9b59b6']
let index = 0

btn.addEventListener('click', () => {
  index = (index + 1) % colors.length
  document.body.style.background = colors[index]
  hex.textContent = colors[index]
})`,
    },
  },
  {
    id: 'counter',
    title: 'Counter',
    description: 'Increments, decrements and resets a displayed value.',
    stack: ['TypeScript', 'React'],
    category: 'Exercises',
    modalSize: 'standard',
    icon: 'Hash',
    detail: {
      body: 'A minimal counter built to practise DOM manipulation and event handling without any framework. Three buttons (increment, decrement, reset) update a displayed value in real time, with the number colour changing to reflect positive, negative or zero state.',
      highlights: [
        'Selecting and updating DOM elements with querySelector',
        'Attaching event listeners to multiple buttons from a single handler',
        'Conditional class toggling based on runtime state',
        'Keeping logic out of HTML: all behaviour lives in JS',
      ],
      codeSnippet: `const value = document.querySelector('#value')
const btns  = document.querySelectorAll('.btn')

let count = 0

btns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('decrease')) count--
    else if (btn.classList.contains('reset')) count = 0
    else count++

    value.textContent = count
    value.className =
      count > 0 ? 'positive' : count < 0 ? 'negative' : ''
  })
})`,
    },
  },

  // ── GitHub ────────────────────────────────────────────────
  {
    id: 'freecodecamp-javascript',
    title: 'FreeCodeCamp JavaScript',
    description: '70+ beginner JavaScript exercises from the FreeCodeCamp curriculum.',
    stack: ['JavaScript'],
    category: 'GitHub',
    githubUrl: 'https://github.com/NickShaw1/freecodecamptutorialjavascript',
    icon: 'Code2',
  },
  {
    id: 'python-3-fundamentals',
    title: 'Python 3 Fundamentals',
    description: 'Exercises from Pluralsight\'s Python 3 Fundamentals course.',
    stack: ['Python'],
    category: 'GitHub',
    githubUrl: 'https://github.com/NickShaw1/Python3FundamentalsPluralsight',
    icon: 'Terminal',
  },

  // ── Sites ─────────────────────────────────────────────────
  {
    id: 'testing-kb',
    title: 'Software Testing Knowledge Base',
    description: 'A wiki-style knowledge base covering software testing concepts, techniques and tooling.',
    stack: ['Testing', 'Knowledge'],
    category: 'Sites',
    internalUrl: '/knowledge-base',
    icon: 'Monitor',
  },
  {
    id: 'stormontwatch',
    title: 'Stormont Watch',
    description: 'A civic transparency platform tracking every vote, bill and MLA expense in the Northern Ireland Assembly.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'GitHub Actions'],
    category: 'Sites',
    liveUrl: 'https://www.stormontwatch.com',
    icon: 'Monitor',
  },
  {
    id: 'asaware',
    title: 'AS Aware',
    description: 'A website raising awareness of Ankylosing Spondylitis, built with React, TypeScript and Vite.',
    stack: ['React', 'TypeScript', 'Vite'],
    category: 'Sites',
    liveUrl: 'https://www.asaware.org',
    icon: 'Monitor',
  },

  // ── Testing ───────────────────────────────────────────────
  {
    id: 'site-test-suite',
    title: 'Site Test Suite',
    description: 'Playwright test suite written for a previous version of this site. Now deprecated, but kept as a reference.',
    stack: ['TypeScript', 'Playwright'],
    category: 'Testing',
    githubUrl: 'https://github.com/NickShaw1/site_tests',
    icon: 'FlaskConical',
  },
  {
    id: 'swag-labs-playwright',
    title: 'Sauce Labs Playwright',
    description: 'JavaScript Playwright tests against the Sauce Labs demo site, covering login flows, product sorting and checkout.',
    stack: ['JavaScript', 'Playwright'],
    category: 'Testing',
    githubUrl: 'https://github.com/NickShaw1/sauce_labs_javascript_playwright_exercise',
    icon: 'Play',
  },
]

export const projectsByCategory = (category: ProjectCategory): ProjectItem[] =>
  projects.filter((p) => p.category === category)

export const featuredProjects: ProjectItem[] = projects.filter((p) => p.featured)
