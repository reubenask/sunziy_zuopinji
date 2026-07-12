import * as React from 'react'
import { createRoot } from 'react-dom/client'
import MagicBento from './MagicBento'
import TiltedCard from './TiltedCard'
import SkillsCircularGallery from './SkillsCircularGallery'
import './style.css'

const { useEffect, useState } = React
const assetPath = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

function App() {
  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeMetric, setActiveMetric] = useState(null)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  const jump = (id) => { setMenu(false); document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' }) }
  const metrics = [
    {
      id: 'years',
      value: '4',
      suffix: '+',
      label: 'YEARS OF MAKING',
      detail: '持续参与品牌视觉、内容传播、AI 图像实验与商业落地，从单张视觉到完整 campaign 都能推进。'
    },
    {
      id: 'reach',
      value: '5',
      suffix: 'M',
      label: 'SINGLE-POST REACH',
      detail: '单条内容获得百万级传播，熟悉社交平台上的第一眼吸引力、节奏感和可分享视觉语言。'
    },
    {
      id: 'collabs',
      value: '20',
      suffix: '+',
      label: 'GLOBAL COLLABS',
      detail: '与不同地区、不同类型的品牌和创作者协作，能在审美、沟通和交付之间找到稳定平衡。'
    }
  ]

  return <main>
    <section className="hero" id="top">
      <img className="hero-image" src={assetPath('/images/hero-underwater.png')} alt="Dreamlike underwater light" />
      <div className="hero-shade" />
      <div className="grain" />
      <header className={scrolled ? 'nav scrolled' : 'nav'}>
        <button className="monogram" onClick={() => jump('#top')} aria-label="Go to top">D<span>°</span></button>
        <nav className={menu ? 'open' : ''}>
          <button onClick={() => jump('#about')}>ABOUT</button>
          <button onClick={() => jump('#work')}>SELECTED WORK</button>
          <button onClick={() => jump('#skills')}>CAPABILITIES</button>
        </nav>
        <button className="contact-mini" onClick={() => jump('#contact')}>LET&apos;S TALK <i>↗</i></button>
        <button className="menu-button" onClick={() => setMenu(!menu)}>{menu ? 'CLOSE' : 'MENU'}</button>
      </header>
      <div className="hero-copy wrap">
        <p className="eyebrow light">VISUAL DESIGNER · AI CREATIVE · BRAND DESIGNER</p>
        <h1>DESIGNING<br/><em>soft signals</em><br/>for real worlds.</h1>
        <div className="hero-bottom">
          <p>以视觉的直觉，连接品牌、图像与被看见的瞬间。<br/>Based in Hangzhou, working everywhere.</p>
          <button className="round-arrow" onClick={() => jump('#work')} aria-label="View selected work">↓</button>
        </div>
      </div>
      <p className="vertical-label">SCROLL TO ENTER</p>
    </section>

    <section className="about section wrap" id="about">
      <div className="section-kicker"><span>01</span> ABOUT / 我是谁</div>
      <div className="about-grid">
        <TiltedCard imageSrc={assetPath('/images/about-portrait.png')} altText="Delgadina Sun portrait" captionText="DELGADINA SUN / 2026" containerHeight="440px" containerWidth="100%" imageHeight="100%" imageWidth="100%" rotateAmplitude={20} scaleOnHover={1.15} showMobileWarning={false} showTooltip={true} displayOverlayContent={false} />
        <div className="about-copy">
          <h2>把策略变成<br/><em>有温度的视觉。</em></h2>
          <p>孙梓怡 / DELGADINA SUN。4 年+品牌与内容实战经验，在商业增长与图像表达之间工作。擅长从 0 到 1 完成品牌视觉、内容叙事与数字触点。</p>
          <a href="mailto:Miacheno401@gmail.com">Miacheno401@gmail.com <b>↗</b></a>
        </div>
        <div className="numbers" onMouseLeave={() => setActiveMetric(null)}>
          {metrics.map((metric) => <button
            className={activeMetric === metric.id ? 'metric active' : 'metric'}
            key={metric.id}
            onMouseEnter={() => setActiveMetric(metric.id)}
            onFocus={() => setActiveMetric(metric.id)}
            onClick={() => setActiveMetric(activeMetric === metric.id ? null : metric.id)}
            type="button"
          >
            <span className="metric-top">
              <strong>{metric.value}<span>{metric.suffix}</span></strong>
              <span className="metric-cta">DETAILS</span>
            </span>
            <p>{metric.label}</p>
            <small>{metric.detail}</small>
          </button>)}
        </div>
      </div>
    </section>

    <section className="work section" id="work">
      <div className="wrap"><div className="section-kicker"><span>02</span> SELECTED WORK / 精选项目</div><div className="work-intro"><h2>Some things<br/>I&apos;ve <em>made visible.</em></h2><p>从品牌系统到有呼吸的影像，每个项目都是一次清醒的想象。</p></div></div>
      <div className="wrap"><MagicBento /></div>
    </section>

    <section className="capabilities section wrap" id="skills">
      <div className="section-kicker"><span>03</span> CAPABILITIES / 能力</div>
      <h2>Generalist by nature.<br/><em>Precise by practice.</em></h2>
      <SkillsCircularGallery items={[
        { number: '01', title: 'Brand world', image: assetPath('/images/skill-brand-world.jpg') },
        { number: '02', title: 'Image making', image: assetPath('/images/skill-image-making.jpg') },
        { number: '03', title: 'AI native', image: assetPath('/images/skill-ai-native.jpg') },
        { number: '04', title: 'Digital touchpoints', image: assetPath('/images/skill-digital-touchpoints.jpg') },
      ]} bend={0.95} textColor="#1d2426" scrollEase={0.07} scrollSpeed={2.1} />
    </section>

    <section className="process section wrap" id="process">
      <div className="section-kicker"><span>04</span> METHOD / 工作流程</div>
      <div className="process-head">
        <h2>How I shape<br/><em>a visual world.</em></h2>
        <p>从模糊情绪到可落地系统，把灵感、AI 实验和商业传播收束到同一个视觉方向里。</p>
      </div>
      <div className="process-grid">
        <article>
          <span>01</span>
          <h3>Sense</h3>
          <p>捕捉情绪、受众直觉和品牌想被记住的瞬间。</p>
        </article>
        <article>
          <span>02</span>
          <h3>Structure</h3>
          <p>建立视觉系统：色彩、图像规则、叙事节奏和使用边界。</p>
        </article>
        <article>
          <span>03</span>
          <h3>Generate</h3>
          <p>用 AI 与影像实验快速扩展可能性，筛出真正有商业价值的方向。</p>
        </article>
        <article>
          <span>04</span>
          <h3>Refine</h3>
          <p>把视觉落到 campaign、社媒、页面和品牌触点，让它能被传播。</p>
        </article>
      </div>
    </section>

    <footer id="contact" className="contact-finale">
      <img className="footer-image" src={assetPath('/images/footer-portrait-light.png')} alt="Dreamlike portrait in light" />
      <div className="footer-vignette" />
      <div className="wrap footer-content">
        <p className="eyebrow">05 / START A CONVERSATION</p>
        <h2>Let the next<br/><em>signal find us.</em></h2>
        <p className="footer-note">Available for brand visual, AI campaign and art direction. Open to collaborations that need a visual world, not just a single image.</p>
        <div className="footer-actions">
          <a className="email" href="mailto:Miacheno401@gmail.com">Miacheno401@gmail.com <span>↗</span></a>
          <a className="wechat-link" href="tel:15564110401">WECHAT · 15564110401</a>
          <a className="wechat-link" href={assetPath('/Delgadina-Sun-CV.pdf')} download>DOWNLOAD CV</a>
          <a className="wechat-link" href="mailto:Miacheno401@gmail.com?subject=Portfolio%20link%20request">XHS / BEHANCE</a>
        </div>
        <div className="footer-meta"><span>HANGZHOU / CHINA</span><span>VISUAL · AI · BRAND DESIGN</span><span>© 2026 DELGADINA SUN</span></div>
      </div>
    </footer>
  </main>
}

createRoot(document.getElementById('root')).render(<App />)
