import * as React from 'react'
import './magic-bento.css'

const assetPath = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

const photos = [
  {
    id: '01',
    title: 'SMOKE SIGNAL',
    meta: 'Campaign / Photography',
    image: assetPath('/images/project-smoke.jpg'),
    shape: 'wide',
    categories: ['Campaign', 'Photography'],
    background: 'A nocturne visual story for a launch mood that needed mystery without losing commercial clarity.',
    role: 'Art direction, image edit, campaign mood system.',
    goal: 'Turn smoke, shadow and skin into a recognisable visual signal.',
    output: 'Hero images, social crops, tone board, retouching direction.',
    tools: 'Photography / AI reference / Visual system / Content',
    result: 'Built a darker, more cinematic campaign language for brand recall.'
  },
  {
    id: '02',
    title: 'SURFACE TENSION',
    meta: 'AI Visual / Texture',
    image: assetPath('/images/project-water.jpg'),
    shape: 'wide water',
    categories: ['AI Visual', 'Digital'],
    background: 'A material study exploring liquid surfaces as an interface between realism and dream logic.',
    role: 'AI image direction, prompt system, visual refinement.',
    goal: 'Create a reusable texture language for digital touchpoints.',
    output: 'Image series, prompt notes, motion-ready crops, palette references.',
    tools: 'AI / Visual / Digital / Content',
    result: 'Translated an abstract material mood into usable brand atmosphere.'
  },
  {
    id: '03',
    title: 'THE LONG ROAD',
    meta: 'Brand / Field Notes',
    image: assetPath('/images/project-road.jpg'),
    shape: 'wide road',
    categories: ['Brand', 'Photography'],
    background: 'A field-note image direction for a brand world built around distance, patience and quiet travel.',
    role: 'Narrative direction, image selection, editorial sequencing.',
    goal: 'Make the brand feel expansive without becoming empty.',
    output: 'Mood board, homepage image logic, social cover system.',
    tools: 'Brand / Photography / Visual / Content',
    result: 'Created a calmer visual rhythm that supports long-form storytelling.'
  },
  {
    id: '04',
    title: 'GOLDEN HOUR',
    meta: 'AI Image / Study',
    image: assetPath('/images/project-cat.png'),
    shape: 'square cat',
    categories: ['AI Visual'],
    background: 'A dreamlike AI image study using animal presence as a soft emotional anchor.',
    role: 'AI direction, styling, composition and final image edit.',
    goal: 'Test how warmth and surreal scale can still feel tender.',
    output: 'Prompt set, final stills, visual reference sheet.',
    tools: 'AI / Visual / Art direction',
    result: 'A memorable visual with strong scroll-stopping softness.'
  },
  {
    id: '05',
    title: 'QUIET VILLAGE',
    meta: 'Place / Still Life',
    image: assetPath('/images/project-village.jpg'),
    shape: 'square',
    categories: ['Photography', 'Brand'],
    background: 'A place-based still-life series for a slower brand tone rooted in texture and daily objects.',
    role: 'Photography direction, color edit, visual sequencing.',
    goal: 'Find commercial warmth in ordinary scenes.',
    output: 'Image set, palette notes, editorial crops.',
    tools: 'Photography / Brand / Visual',
    result: 'Helped shape a grounded, human visual texture.'
  },
  {
    id: '06',
    title: 'AFTER THE RAIN',
    meta: 'Digital / Personal Work',
    image: assetPath('/images/project-stream.jpg'),
    shape: 'square stream',
    categories: ['Digital', 'Photography'],
    background: 'A digital atmosphere study using wet surfaces, reflection and low-saturation greens.',
    role: 'Image direction, retouching, interaction mood reference.',
    goal: 'Turn a quiet landscape into a web-ready emotional system.',
    output: 'Background set, texture crops, hover-state references.',
    tools: 'Digital / Photography / Visual',
    result: 'Became a reference for restrained, sensory web sections.'
  },
  {
    id: '07',
    title: 'LOOKING UP',
    meta: 'Portrait / Film',
    image: assetPath('/images/project-gaze.jpg'),
    shape: 'square gaze',
    categories: ['Campaign', 'Photography'],
    background: 'A portrait-led image direction built for emotion-first storytelling.',
    role: 'Art direction, shot selection, color mood.',
    goal: 'Make the subject feel intimate, not over-produced.',
    output: 'Portrait edits, social key visual, crop guide.',
    tools: 'Photography / Campaign / Content',
    result: 'Created a softer human entry point for campaign communication.'
  },
  {
    id: '08',
    title: 'A QUIET VISITOR',
    meta: 'Still Life / Film',
    image: assetPath('/images/project-chair-cat.jpg'),
    shape: 'square chair-cat',
    categories: ['Photography', 'Brand'],
    background: 'A still-life image concept for brands that need charm without loudness.',
    role: 'Composition, image edit, visual tone exploration.',
    goal: 'Use restraint, negative space and a small narrative object.',
    output: 'Still-life images, color references, placement tests.',
    tools: 'Brand / Photography / Visual',
    result: 'Added personality while keeping the system quiet and premium.'
  },
  {
    id: '09',
    title: 'CATCHING LIGHT',
    meta: 'AI Visual / Portrait',
    image: assetPath('/images/project-sun.jpg'),
    shape: 'square sun',
    categories: ['AI Visual', 'Campaign'],
    background: 'A portrait study on light as identity, made for campaign-facing visual language.',
    role: 'AI direction, art direction, post-editing.',
    goal: 'Make AI-generated imagery feel personal and emotionally legible.',
    output: 'Key visual, prompt direction, campaign crop set.',
    tools: 'AI / Campaign / Visual / Content',
    result: 'Balanced synthetic image-making with a human, editorial finish.'
  },
]

const filters = ['All', 'Brand', 'AI Visual', 'Campaign', 'Photography', 'Digital']

export default function MagicBento() {
  const sectionRef = React.useRef(null)
  const [spotlight, setSpotlight] = React.useState({ x: -1000, y: -1000, active: false })
  const [activeFilter, setActiveFilter] = React.useState('All')
  const [activeProject, setActiveProject] = React.useState(null)

  const visiblePhotos = activeFilter === 'All'
    ? photos
    : photos.filter(photo => photo.categories.includes(activeFilter))

  const handleMove = (event, card) => {
    const rect = card.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    const rotateY = ((event.clientX - rect.left - rect.width / 2) / rect.width) * 5
    const rotateX = -((event.clientY - rect.top - rect.height / 2) / rect.height) * 4
    card.currentTarget.style.setProperty('--glow-x', `${x}%`)
    card.currentTarget.style.setProperty('--glow-y', `${y}%`)
    card.currentTarget.style.setProperty('--tilt-x', `${rotateX}deg`)
    card.currentTarget.style.setProperty('--tilt-y', `${rotateY}deg`)
    setSpotlight({ x: event.clientX, y: event.clientY, active: true })
  }

  return <div className="magic-bento-section" ref={sectionRef} onMouseLeave={() => setSpotlight(s => ({ ...s, active: false }))}>
    <div className="work-filter" aria-label="Filter selected work">
      {filters.map(filter => <button
        key={filter}
        className={activeFilter === filter ? 'active' : ''}
        onClick={() => setActiveFilter(filter)}
      >
        {filter}
      </button>)}
    </div>
    <div className={`bento-spotlight ${spotlight.active ? 'is-active' : ''}`} style={{ left: spotlight.x, top: spotlight.y }} />
    <div className="magic-bento-grid">
      {visiblePhotos.map((photo) => <article className={`magic-photo-card ${photo.shape}`} key={photo.id} tabIndex="0"
        onMouseMove={(e) => handleMove(e, e)}
        onMouseLeave={(e) => { e.currentTarget.style.setProperty('--tilt-x', '0deg'); e.currentTarget.style.setProperty('--tilt-y', '0deg') }}>
        <div className="photo-inner">
          <img src={photo.image} alt={photo.title} />
          <div className="card-sheen" />
          <div className="photo-label"><span>{photo.id}</span><button onClick={() => setActiveProject(photo)}>OPEN ↗</button></div>
          <div className="photo-copy"><h3>{photo.title}</h3><p>{photo.meta}</p></div>
        </div>
      </article>)}
    </div>
    {activeProject && <div className="project-layer" role="dialog" aria-modal="true" aria-label={`${activeProject.title} project details`}>
      <button className="project-layer-backdrop" aria-label="Close project details" onClick={() => setActiveProject(null)} />
      <article className="project-sheet">
        <button className="project-close" onClick={() => setActiveProject(null)}>CLOSE</button>
        <div className="project-sheet-image">
          <img src={activeProject.image} alt="" />
        </div>
        <div className="project-sheet-copy">
          <p className="project-sheet-kicker">{activeProject.id} / {activeProject.meta}</p>
          <h3>{activeProject.title}</h3>
          <p className="project-lede">{activeProject.background}</p>
          <dl>
            <div><dt>ROLE</dt><dd>{activeProject.role}</dd></div>
            <div><dt>GOAL</dt><dd>{activeProject.goal}</dd></div>
            <div><dt>OUTPUT</dt><dd>{activeProject.output}</dd></div>
            <div><dt>TOOLS</dt><dd>{activeProject.tools}</dd></div>
            <div><dt>RESULT</dt><dd>{activeProject.result}</dd></div>
          </dl>
        </div>
      </article>
    </div>}
  </div>
}
