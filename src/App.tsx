import { FormEvent, ReactNode, useEffect, useMemo, useRef, useState } from 'react';

type Topic =
  | 'SAP MM'
  | 'SAP WM'
  | 'Frontend'
  | 'SQL'
  | 'Server'
  | 'Node.js'
  | 'JavaScript'
  | 'CSS'
  | 'Python'
  | 'AI'
  | 'ML';

type Question = {
  id: number;
  title: string;
  answer: string;
  topic: Topic;
  course: string;
  createdAt: string;
};

type CreativeItem = {
  id: number;
  title: string;
  description: string;
  image: string;
};

type CreativeCategory = 'My Design' | 'My Thumbnail' | 'My Logo';
type CreativeLibrary = Record<CreativeCategory, CreativeItem[]>;

const topics: { name: Topic; icon: ReactNode; tone: string }[] = [
  { name: 'SAP MM', icon: <BoxIcon />, tone: 'violet' },
  { name: 'SAP WM', icon: <LayersIcon />, tone: 'blue' },
  { name: 'Frontend', icon: <CodeIcon />, tone: 'cyan' },
  { name: 'SQL', icon: <DatabaseIcon />, tone: 'amber' },
  { name: 'Server', icon: <ServerIcon />, tone: 'rose' },
  { name: 'Node.js', icon: <NodeIcon />, tone: 'green' },
  { name: 'JavaScript', icon: <BracesIcon />, tone: 'yellow' },
  { name: 'CSS', icon: <PaletteIcon />, tone: 'pink' },
  { name: 'Python', icon: <PythonIcon />, tone: 'blue' },
  { name: 'AI', icon: <SparkIcon />, tone: 'violet' },
  { name: 'ML', icon: <NetworkIcon />, tone: 'green' },
];

const starterQuestions: Question[] = [
  {
    id: 1,
    title: 'What is a Purchase Requisition in SAP MM?',
    answer:
      'A Purchase Requisition is an internal document used to request the procurement of materials or services.',
    topic: 'SAP MM',
    course: 'SAP Fundamentals',
    createdAt: 'May 24, 2025',
  },
  {
    id: 2,
    title: 'What is the difference between let and const?',
    answer:
      'Both are block scoped, but a const binding cannot be reassigned after it has been initialized.',
    topic: 'JavaScript',
    course: 'Frontend Development',
    createdAt: 'May 20, 2025',
  },
  {
    id: 3,
    title: 'What is a primary key in SQL?',
    answer:
      'A primary key uniquely identifies every row in a table and cannot contain null values.',
    topic: 'SQL',
    course: 'Database Basics',
    createdAt: 'May 18, 2025',
  },
];

const designImage =
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200';
const deskImage =
  'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200';

const starterCreativeItems: CreativeLibrary = {
  'My Design': [
    {
      id: 1,
      title: 'Brand color study',
      description: 'A vibrant visual identity exploration.',
      image: designImage,
    },
  ],
  'My Thumbnail': [
    {
      id: 2,
      title: 'Creator workspace',
      description: 'A bold editorial thumbnail concept.',
      image: deskImage,
    },
  ],
  'My Logo': [],
};

const creativeRoutes: Record<CreativeCategory, string> = {
  'My Design': 'designs',
  'My Thumbnail': 'thumbnails',
  'My Logo': 'logos',
};

function Icon({
  children,
  size = 20,
  className = '',
}: {
  children: ReactNode;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

function PlusIcon() {
  return (
    <Icon size={18}>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </Icon>
  );
}
function ArrowIcon() {
  return (
    <Icon size={18}>
      <path
        d="m9 18 6-6-6-6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </Icon>
  );
}
function SearchIcon() {
  return (
    <Icon>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16 16 4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </Icon>
  );
}
function BookIcon() {
  return (
    <Icon>
      <path
        d="M5 4.5h9a3 3 0 0 1 3 3v12H8a3 3 0 0 1-3-3v-12Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path d="M8 19.5a3 3 0 0 1 3-3h6" stroke="currentColor" strokeWidth="1.7" />
    </Icon>
  );
}
function BoxIcon() {
  return (
    <Icon>
      <path d="m4 8 8-4 8 4-8 4-8-4Zm0 0v8l8 4 8-4V8M12 12v8" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.6" />
    </Icon>
  );
}
function LayersIcon() {
  return (
    <Icon>
      <path d="m4 8 8-4 8 4-8 4-8-4Zm0 4 8 4 8-4m-16 4 8 4 8-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
    </Icon>
  );
}
function CodeIcon() {
  return (
    <Icon>
      <path d="m9 7-5 5 5 5m6-10 5 5-5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </Icon>
  );
}
function DatabaseIcon() {
  return (
    <Icon>
      <ellipse cx="12" cy="6" rx="7" ry="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6m-14 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" stroke="currentColor" strokeWidth="1.6" />
    </Icon>
  );
}
function ServerIcon() {
  return (
    <Icon>
      <rect height="6" rx="2" stroke="currentColor" strokeWidth="1.6" width="16" x="4" y="4" />
      <rect height="6" rx="2" stroke="currentColor" strokeWidth="1.6" width="16" x="4" y="14" />
      <path d="M8 7h.01M8 17h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
    </Icon>
  );
}
function NodeIcon() {
  return (
    <Icon>
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.6" />
      <path d="M9 15.5V9l6 6.5V9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
    </Icon>
  );
}
function BracesIcon() {
  return (
    <Icon>
      <path d="M9 4H7a2 2 0 0 0-2 2v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h2m6-16h2a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v5a2 2 0 0 1-2 2h-2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
    </Icon>
  );
}
function PaletteIcon() {
  return (
    <Icon>
      <path d="M12 3a9 9 0 1 0 0 18h1.5a2 2 0 0 0 0-4H12a2 2 0 0 1 0-4h3a6 6 0 0 0 6-6c0-2.2-4-4-9-4Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.6" />
      <path d="M7.5 9h.01M10 6.5h.01M15 6.5h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="2.2" />
    </Icon>
  );
}
function UploadIcon() {
  return (
    <Icon>
      <path d="M12 16V4m0 0L8 8m4-4 4 4M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </Icon>
  );
}
function PythonIcon() {
  return (
    <Icon>
      <path d="M12 3c-4.5 0-4.2 2-4.2 2v2.1h4.3v.7H6.2S3 7.4 3 12.4s2.8 4.8 2.8 4.8h1.7v-2.4s-.1-2.8 2.8-2.8h4.2s2.6 0 2.6-2.6V5.7S17.5 3 12 3Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.4" />
      <path d="M12 21c4.5 0 4.2-2 4.2-2v-2.1h-4.3v-.7h5.9s3.2.4 3.2-4.6-2.8-4.8-2.8-4.8h-1.7v2.4s.1 2.8-2.8 2.8H9.5s-2.6 0-2.6 2.6v3.7S6.5 21 12 21Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.4" />
      <path d="M10 5.8h.01M14 18.2h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </Icon>
  );
}
function SparkIcon() {
  return (
    <Icon>
      <path d="M12 2.5c.8 5.3 4.2 8.7 9.5 9.5-5.3.8-8.7 4.2-9.5 9.5-.8-5.3-4.2-8.7-9.5-9.5 5.3-.8 8.7-4.2 9.5-9.5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.6" />
      <path d="M19 3v4M17 5h4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" />
    </Icon>
  );
}
function NetworkIcon() {
  return (
    <Icon>
      <circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="m7.7 7.1 3.2 8.9m5.4-8.9L13.1 16M8 6h8" stroke="currentColor" strokeWidth="1.5" />
    </Icon>
  );
}
function MenuIcon() {
  return (
    <Icon>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </Icon>
  );
}

function RainbowTitle({ children, eyebrow }: { children: ReactNode; eyebrow?: string }) {
  return (
    <div>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="rainbow-title">{children}</h2>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="brand" href="#/">
        <span className="brand-mark"><img alt="" src="/assets/ayush-logo.png" /></span>
        <span>Ayush <b>Q/A</b></span>
      </a>
      <button aria-label="Open navigation" className="menu-button" onClick={() => setOpen(!open)}>
        <MenuIcon />
      </button>
      <nav className={open ? 'nav-links nav-open' : 'nav-links'}>
        <a href="#topics" onClick={() => setOpen(false)}>Topics</a>
        <a href="#questions" onClick={() => setOpen(false)}>Q &amp; A</a>
        <a href="#work" onClick={() => setOpen(false)}>Creative work</a>
        <a href="#/about" target="_blank">About</a>
      </nav>
      <a className="button primary header-cta" href="#/add-question" target="_blank">
        <PlusIcon /> Add Q &amp; A
      </a>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <span className="brand-mark"><img alt="" src="/assets/ayush-logo.png" /></span>
        <div><strong>Ayush Q/A</strong><small>Learn. Save. Create.</small></div>
      </div>
      <p>Built as a personal knowledge &amp; creative space.</p>
      <div className="socials">
        <a aria-label="Instagram" href="https://instagram.com" target="_blank" rel="noreferrer">IG</a>
        <a aria-label="LinkedIn" href="https://linkedin.com" target="_blank" rel="noreferrer">in</a>
        <a aria-label="Contact" href="mailto:ayush@example.com">@</a>
        <a aria-label="Facebook" href="https://facebook.com" target="_blank" rel="noreferrer">f</a>
      </div>
    </footer>
  );
}

function Home({
  questions,
  setQuestions,
  creativeItems,
  setCreativeItems,
}: {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  creativeItems: CreativeLibrary;
  setCreativeItems: React.Dispatch<React.SetStateAction<CreativeLibrary>>;
}) {
  const [query, setQuery] = useState('');
  const [activeTopic, setActiveTopic] = useState<Topic | 'All'>('All');
  const [uploadType, setUploadType] = useState<CreativeCategory | null>(null);

  const filtered = useMemo(
    () =>
      questions.filter(
        (q) =>
          (activeTopic === 'All' || q.topic === activeTopic) &&
          (q.title.toLowerCase().includes(query.toLowerCase()) ||
            q.answer.toLowerCase().includes(query.toLowerCase())),
      ),
    [activeTopic, query, questions],
  );

  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="orb orb-one" />
          <div className="orb orb-two" />
          <div className="hero-content">
            <span className="hero-kicker"><span /> MY KNOWLEDGE UNIVERSE</span>
            <h1>Questions today.<br /><span className="clarity-motion">Clarity forever.</span></h1>
            <p>A personal space to capture what I learn, organize it beautifully, and turn scattered notes into lasting knowledge.</p>
            <div className="hero-actions">
              <a className="button primary" href="#/add-question" target="_blank"><PlusIcon /> Add Question &amp; Answer</a>
              <a className="button ghost" href="#topics">Explore topics <ArrowIcon /></a>
            </div>
            <div className="hero-meta">
              <div><strong>{questions.length + 21}</strong><span>Answers saved</span></div>
              <div><strong>11</strong><span>Topics covered</span></div>
              <div><strong>∞</strong><span>Always learning</span></div>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="orbit orbit-a" />
            <div className="orbit orbit-b" />
            <div className="float-card card-question"><span>Q</span><p>How does it work?</p><small>Save the answer →</small></div>
            <div className="float-card card-code"><span>&lt;/&gt;</span><p>const learn = true;</p></div>
            <div className="float-card card-sap"><BoxIcon /><strong>SAP MM</strong></div>
            <div className="spark spark-a">✦</div>
            <div className="spark spark-b">+</div>
          </div>
        </section>

        <section className="section topics-section" id="topics">
          <div className="section-heading">
            <RainbowTitle eyebrow="BROWSE THE LIBRARY">Explore by topic</RainbowTitle>
            <p>Every question has a home. Pick a topic and keep the learning going.</p>
          </div>
          <div className="topic-grid">
            {topics.map((topic, index) => (
              <button
                className={`topic-card ${topic.tone} ${activeTopic === topic.name ? 'selected' : ''}`}
                key={topic.name}
                onClick={() => {
                  setActiveTopic(activeTopic === topic.name ? 'All' : topic.name);
                  document.querySelector('#questions')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="topic-number">0{index + 1}</span>
                <span className="topic-icon">{topic.icon}</span>
                <strong>{topic.name}</strong>
                <small>{questions.filter((q) => q.topic === topic.name).length + index + 2} notes</small>
                <span className="topic-arrow"><ArrowIcon /></span>
              </button>
            ))}
          </div>
        </section>

        <section className="section question-section" id="questions">
          <div className="section-heading row">
            <RainbowTitle eyebrow="RECENTLY ADDED">Question &amp; Answer</RainbowTitle>
            <a className="text-link" href="#/add-question" target="_blank">Add a new one <ArrowIcon /></a>
          </div>
          <div className="question-toolbar">
            <label className="search-box">
              <SearchIcon />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search your knowledge..." />
            </label>
            <button className="filter-chip" onClick={() => setActiveTopic('All')}>
              {activeTopic === 'All' ? 'All topics' : activeTopic} <span>×</span>
            </button>
          </div>
          <div className="question-list">
            {filtered.map((question, index) => (
              <article className="question-card" key={question.id}>
                <div className="question-index">{String(index + 1).padStart(2, '0')}</div>
                <div className="question-copy">
                  <div className="question-tags"><span>{question.topic}</span><small>{question.course}</small></div>
                  <h3>{question.title}</h3>
                  <p>{question.answer}</p>
                  <time>{question.createdAt}</time>
                </div>
                <button aria-label="Delete question" className="question-more" onClick={() => setQuestions((current) => current.filter((q) => q.id !== question.id))}>×</button>
              </article>
            ))}
            {filtered.length === 0 && <div className="empty-state"><BookIcon /><h3>No answers found</h3><p>Try another search or add your first note in this topic.</p></div>}
          </div>
        </section>

        <section className="section creative-section" id="work">
          <div className="section-heading">
            <RainbowTitle eyebrow="BEYOND THE NOTES">The creative corner</RainbowTitle>
            <p>A growing showcase of designs, thumbnails, and marks created along the way.</p>
          </div>
          <div className="creative-grid">
            {(Object.entries(creativeItems) as [CreativeCategory, CreativeItem[]][]).map(([title, items], index) => (
              <article className={`creative-card creative-${index + 1}`} key={title}>
                <div className="creative-top">
                  <span>0{index + 1}</span>
                  <button onClick={() => setUploadType(title)}><PlusIcon /> Add</button>
                </div>
                <a className="creative-title-link" href={`#/creative/${creativeRoutes[title]}`} target="_blank">
                  <h3 className="rainbow-title small">{title}</h3>
                  <span>View all <ArrowIcon /></span>
                </a>
                <p>{index === 0 ? 'Visual stories and digital experiments.' : index === 1 ? 'Small frames with big ideas.' : 'Distinct marks with clear meaning.'}</p>
                {items[0] ? (
                  <a className="creative-preview" href={`#/creative/${creativeRoutes[title]}`} target="_blank">
                    <img alt={items[0].title} src={items[0].image} />
                    <div>
                      <strong>{items[0].title}</strong>
                      <small>{items[0].description}</small>
                      <span>{items.length} {items.length === 1 ? 'item' : 'items'} · View collection</span>
                    </div>
                  </a>
                ) : (
                  <button className="empty-creative" onClick={() => setUploadType(title)}><UploadIcon /><span>Upload your first logo</span></button>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="about-strip">
          <div className="about-monogram"><img alt="Ayush by the sea" src="/assets/ayush-photo.jpg" /></div>
          <div>
            <span className="eyebrow light">THE PERSON BEHIND THE NOTES</span>
            <h2>Hi, I'm <span>Ayush.</span></h2>
            <p>A curious learner, designer, and developer documenting the journey—one good question at a time.</p>
          </div>
          <a className="button light-button" href="#/about" target="_blank">About Ayush <ArrowIcon /></a>
        </section>
      </main>
      <Footer />
      {uploadType && (
        <UploadModal
          type={uploadType}
          onClose={() => setUploadType(null)}
          onSave={(item) => {
            setCreativeItems((current) => ({ ...current, [uploadType]: [item, ...current[uploadType]] }));
            setUploadType(null);
          }}
        />
      )}
    </>
  );
}

function UploadModal({ type, onClose, onSave }: { type: CreativeCategory; onClose: () => void; onSave: (item: CreativeItem) => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!title || !image) return;
    onSave({ id: Date.now(), title, description, image });
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <form className="modal" onSubmit={submit}>
        <button aria-label="Close" className="modal-close" onClick={onClose} type="button">×</button>
        <span className="eyebrow">NEW CREATIVE WORK</span>
        <h2>Add to {type}</h2>
        <button className={`upload-zone ${image ? 'has-image' : ''}`} onClick={() => fileRef.current?.click()} type="button">
          {image ? <img alt="Upload preview" src={image} /> : <><UploadIcon /><strong>Choose an image</strong><small>PNG or JPG</small></>}
        </button>
        <input
          accept="image/*"
          className="sr-only"
          ref={fileRef}
          type="file"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => setImage(String(reader.result));
              reader.readAsDataURL(file);
            }
          }}
        />
        <label>Title<input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Give your work a name" /></label>
        <label>Description<textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What is the idea behind it?" rows={3} /></label>
        <button className="button primary full" type="submit">Save creative work <ArrowIcon /></button>
      </form>
    </div>
  );
}

function CreativeGalleryPage({
  category,
  items,
  onAdd,
}: {
  category: CreativeCategory;
  items: CreativeItem[];
  onAdd: (item: CreativeItem) => void;
}) {
  const [showUpload, setShowUpload] = useState(false);
  const labels: Record<CreativeCategory, { eyebrow: string; intro: string }> = {
    'My Design': {
      eyebrow: 'DESIGN ARCHIVE',
      intro: 'Visual explorations, digital compositions, and design stories collected in one place.',
    },
    'My Thumbnail': {
      eyebrow: 'THUMBNAIL ARCHIVE',
      intro: 'Small frames built to tell a story, earn attention, and make an idea impossible to miss.',
    },
    'My Logo': {
      eyebrow: 'LOGO ARCHIVE',
      intro: 'Marks, symbols, and identity ideas designed to communicate with clarity.',
    },
  };

  return (
    <div className="inner-page">
      <Header />
      <main className="gallery-page">
        <a className="back-link" href="#/"><span>←</span> Back to creative corner</a>
        <section className="gallery-hero">
          <div>
            <span className="hero-kicker"><span /> {labels[category].eyebrow}</span>
            <h1 className="rainbow-title">{category}</h1>
            <p>{labels[category].intro}</p>
          </div>
          <button className="button primary" onClick={() => setShowUpload(true)}>
            <PlusIcon /> Add {category.replace('My ', '')}
          </button>
        </section>
        {items.length ? (
          <section className="gallery-grid">
            {items.map((item, index) => (
              <article className="gallery-item" key={item.id}>
                <div className="gallery-image">
                  <img alt={item.title} src={item.image} />
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="gallery-copy">
                  <h2>{item.title}</h2>
                  <p>{item.description || 'A new piece in the collection.'}</p>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <section className="gallery-empty">
            <UploadIcon />
            <h2>Your collection starts here.</h2>
            <p>Add your first {category.replace('My ', '').toLowerCase()} and it will appear in this archive.</p>
            <button className="button primary" onClick={() => setShowUpload(true)}><PlusIcon /> Add your first one</button>
          </section>
        )}
      </main>
      <Footer />
      {showUpload && (
        <UploadModal
          type={category}
          onClose={() => setShowUpload(false)}
          onSave={(item) => {
            onAdd(item);
            setShowUpload(false);
          }}
        />
      )}
    </div>
  );
}

function AddQuestionPage({ onAdd }: { onAdd: (q: Question) => void }) {
  const [saved, setSaved] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onAdd({
      id: Date.now(),
      title: String(data.get('title')),
      answer: String(data.get('answer')),
      topic: String(data.get('topic')) as Topic,
      course: String(data.get('course')),
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    });
    setSaved(true);
    event.currentTarget.reset();
  }
  return (
    <div className="inner-page">
      <Header />
      <main className="form-page">
        <a className="back-link" href="#/"><span>←</span> Back to home</a>
        <div className="form-layout">
          <div className="form-intro">
            <span className="hero-kicker"><span /> CAPTURE WHAT YOU LEARN</span>
            <h1>Turn a question into <span>lasting clarity.</span></h1>
            <p>Write the question in your own words, capture the clearest answer, and file it where future you can find it.</p>
            <div className="form-tip"><BookIcon /><div><strong>A note to future you</strong><p>Simple explanations are easier to remember. Keep it clear and add context.</p></div></div>
          </div>
          <form className="qa-form" onSubmit={submit}>
            <div className="step-label"><span>01</span> ORGANIZE</div>
            <div className="field-row">
              <label>Topic<select name="topic" required>{topics.map((t) => <option key={t.name}>{t.name}</option>)}</select></label>
              <label>Course<input name="course" placeholder="e.g. SAP Fundamentals" required /></label>
            </div>
            <div className="step-label"><span>02</span> ASK</div>
            <label>Your question<input name="title" placeholder="What would you like to remember?" required /></label>
            <div className="step-label"><span>03</span> ANSWER</div>
            <label>Your answer<textarea name="answer" placeholder="Explain it clearly, in your own words..." rows={8} required /></label>
            {saved && <p className="success-message">Saved to your knowledge library.</p>}
            <button className="button primary full" type="submit">Save Question &amp; Answer <ArrowIcon /></button>
          </form>
        </div>
      </main>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="inner-page">
      <Header />
      <main className="about-page">
        <a className="back-link" href="#/"><span>←</span> Back to home</a>
        <section className="about-hero">
          <div className="portrait">
            <div className="portrait-frame"><img alt="Ayush standing by the sea with flowers" src="/assets/ayush-photo.jpg" /></div>
            <span className="portrait-caption">Based in India · Open to ideas</span>
          </div>
          <div className="about-copy">
            <span className="hero-kicker"><span /> A LITTLE ABOUT ME</span>
            <h1>Learning loudly.<br /><span>Creating boldly.</span></h1>
            <p className="lead">I'm Ayush—a curious technologist building knowledge across SAP, frontend, databases, and design.</p>
            <p>This space is my second brain: a place where questions become useful answers and experiments become a creative portfolio. I believe the best way to learn is to explain, organize, and share.</p>
            <div className="about-actions">
              <a className="button primary" href="mailto:ayush@example.com">Let's connect <ArrowIcon /></a>
              <a className="button ghost" href="/assets/ayush-resume.docx" target="_blank" rel="noreferrer">View resume <ArrowIcon /></a>
            </div>
          </div>
        </section>
        <section className="resume-section" id="resume">
          <RainbowTitle eyebrow="MY JOURNEY">Resume</RainbowTitle>
          <div className="resume-grid">
            <div><span>Focus</span><strong>SAP &amp; Web Development</strong><p>Building practical knowledge across systems and interfaces.</p></div>
            <div><span>Creative</span><strong>Design &amp; Branding</strong><p>Exploring visual storytelling through thoughtful digital work.</p></div>
            <div><span>Mindset</span><strong>Always Learning</strong><p>Turning curiosity into clear, reusable understanding.</p></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState(window.location.hash);
  const [questions, setQuestions] = useState<Question[]>(() => {
    try {
      const saved = localStorage.getItem('ayush-questions');
      return saved ? JSON.parse(saved) : starterQuestions;
    } catch {
      return starterQuestions;
    }
  });
  const [creativeItems, setCreativeItems] = useState<CreativeLibrary>(() => {
    try {
      const saved = localStorage.getItem('ayush-creative-library');
      return saved ? JSON.parse(saved) : starterCreativeItems;
    } catch {
      return starterCreativeItems;
    }
  });

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    localStorage.setItem('ayush-questions', JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem('ayush-creative-library', JSON.stringify(creativeItems));
  }, [creativeItems]);

  useEffect(() => {
    const syncCreativeLibrary = (event: StorageEvent) => {
      if (event.key === 'ayush-creative-library' && event.newValue) {
        try {
          setCreativeItems(JSON.parse(event.newValue));
        } catch {
          // Keep the current library if another tab writes invalid data.
        }
      }
    };
    window.addEventListener('storage', syncCreativeLibrary);
    return () => window.removeEventListener('storage', syncCreativeLibrary);
  }, []);

  if (route.startsWith('#/add-question')) {
    return <AddQuestionPage onAdd={(question) => setQuestions((current) => [question, ...current])} />;
  }
  if (route.startsWith('#/about')) return <AboutPage />;
  const galleryCategory = (
    Object.entries(creativeRoutes) as [CreativeCategory, string][]
  ).find(([, path]) => route.startsWith(`#/creative/${path}`))?.[0];
  if (galleryCategory) {
    return (
      <CreativeGalleryPage
        category={galleryCategory}
        items={creativeItems[galleryCategory]}
        onAdd={(item) =>
          setCreativeItems((current) => ({
            ...current,
            [galleryCategory]: [item, ...current[galleryCategory]],
          }))
        }
      />
    );
  }
  return (
    <Home
      creativeItems={creativeItems}
      questions={questions}
      setCreativeItems={setCreativeItems}
      setQuestions={setQuestions}
    />
  );
}
