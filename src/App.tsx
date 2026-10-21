import {
  ArrowIcon,
  BookIcon,
  DownloadIcon,
  HeadphonesIcon,
  KeyboardIcon,
  LanguagesIcon,
  LibraryIcon,
  PlayIcon,
} from '@/components/icons'
import { MeshGradient } from '@/components/mesh-gradient'

const LOGO = 'https://raw.githubusercontent.com/goldstac/quran/main/app_logo.png'
const REPO = 'https://github.com/goldstac/quran'
const RELEASES = 'https://github.com/goldstac/quran/releases'

const MESH_COLORS: [string, string, ...string[]] = [
  '#c6a15b',
  '#0d6970',
  '#8a7a52',
  '#123028',
]

const NAV = [
  { href: '#read', label: 'Read' },
  { href: '#listen', label: 'Mission' },
  { href: '#download', label: 'Download' },
]

const FEATURES = [
  {
    icon: <BookIcon />,
    title: 'Read it as it was revealed',
    body: 'All 114 surahs with full Uthmani script, Arabic and English names, and the mushaf in order or shuffled.',
  },
  {
    icon: <LanguagesIcon />,
    title: 'Meaning beside every ayah',
    body: 'English and Tamil translation sits next to the Arabic, so the meaning is always one glance away.',
  },
  {
    icon: <HeadphonesIcon />,
    title: 'Hear every word',
    body: 'Pick from 170+ reciters and play the whole mushaf, or let it carry on from where you stopped.',
  },
  {
    icon: <LibraryIcon />,
    title: 'Your library, kept locally',
    body: 'What you play is saved, likes collect your favourites, and playlists are yours to create and rename.',
  },
  {
    icon: <DownloadIcon />,
    title: 'Take it offline',
    body: 'Download any nasheed for the journey, or add your own MP3 and MP4 files to listen without wifi.',
  },
  {
    icon: <KeyboardIcon />,
    title: 'Made for the desktop',
    body: 'Space to play, arrows to seek, L for loop, M to mute. Hand built sliders, no stock browser widgets.',
  },
]

const DOWNLOADS = [
  {
    os: 'Linux',
    body: 'One AppImage, runs on any modern distro.',
    meta: 'Get the AppImage',
  },
  {
    os: 'macOS',
    body: 'The installer for Apple silicon and Intel.',
    meta: 'Get the installer',
  },
  {
    os: 'Windows',
    body: 'The setup installer for Windows 10 and 11.',
    meta: 'Get the installer',
  },
]

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="hero-mesh">
        <MeshGradient
          className="size-full opacity-85"
          colors={MESH_COLORS}
          background="#f4f1e8"
          speed={0.4}
          loopSeconds={22}
          scale={0.85}
          blur={0.72}
          grain={0.05}
          seed={11}
        />
      </div>

      <header className="topbar">
        <div className="shell topbar-inner">
          <a href="#top" className="brand">
            <img src={LOGO} alt="" className="brand-mark" />
            <span className="brand-name">Quran</span>
          </a>
          <nav className="topnav">
            {NAV.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a href={RELEASES} className="btn btn-solid">
            Download
          </a>
        </div>
      </header>

      <main id="top">
        <section className="shell section-hero">
          <div className="hero-grid">
            <div>
              <span className="eyebrow">Open source · Linux, macOS, Windows</span>
              <h1 className="display stack">
                Read, listen, and carry it <em>with you</em>
              </h1>
              <p className="lede stack measure-tight">
                A free desktop app for the Quran and nasheeds. Every ayah in its
                original script with the English and Tamil meaning beside it,
                170+ reciters, and a library that stays on your own machine.
              </p>
              <div className="row-actions">
                <a href={RELEASES} className="btn btn-solid btn-arrow">
                  Download for desktop
                  <ArrowIcon />
                </a>
                <a href={REPO} className="btn btn-quiet">
                  View the source
                </a>
              </div>
              <div className="stat-row">
                <div>
                  <div className="stat-num">114</div>
                  <div className="stat-label">Surahs</div>
                </div>
                <div>
                  <div className="stat-num">170+</div>
                  <div className="stat-label">Reciters</div>
                </div>
                <div>
                  <div className="stat-num">2</div>
                  <div className="stat-label">Translations</div>
                </div>
              </div>
            </div>

            <div className="ayah-stage">
              <div className="ayah-text" lang="ar" dir="rtl">
                إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ
                <span className="ayah-marker">5</span>
              </div>
              <div className="ayah-gloss">
                <div className="gloss-row">
                  <span className="gloss-label">Tamil</span>
                  <span className="gloss-tamil" lang="ta">
                    நாங்கள் உனக்கே வணங்குகிறோம்; உனக்கே உதவி தேடுகிறோம்
                  </span>
                </div>
                <div className="gloss-row">
                  <span className="gloss-label">English</span>
                  <span className="gloss-en">
                    It is You we worship, and it is You we ask for help.
                  </span>
                </div>
              </div>
              <div className="player-strip">
                <span className="play-dot">
                  <PlayIcon />
                </span>
                <span className="track">
                  <span className="track-fill" />
                </span>
                <span className="reciter">Al-Fatihah · 1:5</span>
              </div>
            </div>
          </div>
        </section>

        <section id="read" className="rule">
          <div className="shell section">
            <span className="eyebrow">What it does</span>
            <h2 className="display-sm stack measure">
              Everything the mushaf needs, and nothing it does not
            </h2>
            <div className="feat-grid stack-lg">
              {FEATURES.map((feature) => (
                <div key={feature.title} className="feat">
                  <span className="feat-ico">{feature.icon}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="listen" className="mission">
          <div className="shell section-mission">
            <div className="mission-grid">
              <div>
                <span className="eyebrow eyebrow-gold">Why we built it</span>
                <h2 className="display-sm stack">
                  Guidance in the language you think in
                </h2>
                <p className="lede stack">
                  Most of us grew up hearing the Arabic and reaching for the
                  meaning in Tamil or English. This app keeps the two together,
                  for reading and for listening, on a desktop that asks for no
                  account and sends nothing to us.
                </p>
              </div>
              <blockquote className="mission-quote">
                <span className="quote-ar" lang="ar" dir="rtl">
                  اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ
                </span>
                Read, in the name of your Lord who created.
                <cite>Surah Al-Alaq · 96:1</cite>
              </blockquote>
            </div>
          </div>
        </section>

        <section id="download" className="shell section">
          <span className="eyebrow">Get it</span>
          <h2 className="display-sm stack">Free, and it runs where you do</h2>
          <p className="prose-soft stack measure">
            Every build comes straight from the app's own releases. Python 3.11
            and yt-dlp handle the rest.
          </p>
          <div className="dl-grid stack-lg">
            {DOWNLOADS.map((item) => (
              <a key={item.os} href={RELEASES} className="dl-card">
                <span className="feat-ico">
                  <DownloadIcon />
                </span>
                <h3>{item.os}</h3>
                <p>{item.body}</p>
                <span className="dl-meta">
                  {item.meta}
                  <ArrowIcon />
                </span>
              </a>
            ))}
          </div>
          <p className="prose-soft note-tight">
            Prefer to build it yourself?{' '}
            <a href={`${REPO}#requirements`} className="text-link">
              Clone the repo
            </a>{' '}
            and follow the setup in the README.
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-grid">
          <div className="brand">
            <img src={LOGO} alt="" className="brand-mark" />
            <span className="brand-name">Quran</span>
          </div>
          <nav className="footer-nav">
            <a href={REPO}>Source</a>
            <a href={`${REPO}/blob/main/PRIVACY.md`}>Privacy</a>
            <a href={`${REPO}/blob/main/TERMS.md`}>Terms</a>
            <a href={`${REPO}/discussions`}>Discussions</a>
          </nav>
          <p className="prose-soft footer-note">
            An open source Islamic app. No accounts, no analytics, no tracking.
          </p>
        </div>
      </footer>
    </div>
  )
}
