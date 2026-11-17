import { useState } from 'react';
import { Check, Copy, Download, FileCode2, X } from 'lucide-react';
import { INITIAL_GENERATED_FILES, utf8ByteLength } from './data/pythonModules';

const REPO_BASE = 'https://tejaswibhoge-tech.github.io/tejaswi-portfolio';
const TARGET_PYTHON_FILES = INITIAL_GENERATED_FILES.filter(
  (f) => f.id === 'generate_portfolio' || f.id === 'ai_study_buddy',
);

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();

  const totalAddedPythonBytes = TARGET_PYTHON_FILES.reduce(
    (sum, f) => sum + utf8ByteLength(f.content),
    0,
  );
  const existingRepoBytes = 6406 + 341; // index.html (6406) + script.js (341)
  const projectedPct = (
    (totalAddedPythonBytes / (totalAddedPythonBytes + existingRepoBytes)) *
    100
  ).toFixed(1);

  async function handleCopy(id: string, content: string) {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      // Clipboard blocked
    }
  }

  function handleDownload(path: string, content: string) {
    const blob = new Blob([content], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = path.split('/').pop() ?? path;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="portfolio-root relative">
      <div className="glow g1" />
      <div className="glow g2" />

      <header>
        <a className="brand" href="#home">
          <b>T</b> tejaswi<span>.</span>
        </a>
        <button
          id="menu"
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰
        </button>
        <nav id="nav" className={menuOpen ? 'open' : undefined}>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>
          <a href="#skills" onClick={() => setMenuOpen(false)}>
            Skills
          </a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>
            Projects
          </a>
          <a href="#certificates" onClick={() => setMenuOpen(false)}>
            Certificates
          </a>
          <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>
            Let&apos;s connect ↗
          </a>
        </nav>
      </header>

      <main>
        <section className="hero wrap" id="home">
          <div>
            <div className="status">
              <i /> OPEN TO LEARNING &amp; OPPORTUNITIES
            </div>
            <p className="eyebrow">HELLO, I&apos;M</p>
            <h1>
              Bhoge
              <br />
              <em>Tejaswi.</em>
            </h1>
            <p className="intro">
              A curious Computer Science student who enjoys learning, solving
              problems and turning ideas into useful digital experiences.
            </p>
            <div className="actions">
              <a className="primary" href="#projects">
                Explore my work ↗
              </a>
              <a className="secondary" href="#about">
                Get to know me ↓
              </a>
            </div>
            <p className="meta">
              BASED IN INDIA <span>•</span> COMPUTER SCIENCE &amp; ENGINEERING
            </p>
          </div>

          <div className="art">
            <div className="orbit" />
            <div className="profile-card">
              <small>STUDENT • CREATOR • LEARNER</small>
              <strong>
                T<span>.</span>
              </strong>
              <small className="card-foot">
                BHOGE TEJASWI <span>✦ 2026</span>
              </small>
            </div>
            <label className="chip chip1">✦ Curious mind</label>
            <label className="chip chip2">Learning every day ↗</label>
          </div>
        </section>

        <section className="wrap section" id="about">
          <p className="kicker">01 / ABOUT</p>
          <h2>
            A little about <em>me.</em>
          </h2>
          <div className="two-col">
            <h3>
              I believe every new skill starts with curiosity and every good
              solution starts with asking the right questions.
            </h3>
            <div>
              <p>
                I am Bhoge Tejaswi, a Computer Science and Engineering student
                interested in technology, logical thinking and creative
                problem-solving. I enjoy exploring new tools, strengthening my
                fundamentals and working on ideas that can make everyday tasks
                easier.
              </p>
              <div className="pills">
                <span>🎓 CSE Student</span>
                <span>📍 India</span>
                <span>✉️ Email-friendly</span>
              </div>
            </div>
          </div>
        </section>

        <section className="wrap section" id="skills">
          <p className="kicker">02 / SKILLS</p>
          <h2>
            Tools I’m learning
            <br />
            and <em>growing with.</em>
          </h2>
          <div className="skills">
            <article>
              <b>⌘</b>
              <h3>Programming</h3>
              <p>Building a foundation in programming logic and problem-solving.</p>
              <div className="tags">
                <span>Python</span>
                <span>Java</span>
                <span>Basics of C</span>
              </div>
            </article>
            <article>
              <b>◇</b>
              <h3>Web technologies</h3>
              <p>
                Exploring how to create clean, accessible and responsive websites.
              </p>
              <div className="tags">
                <span>HTML</span>
                <span>CSS</span>
                <span>JavaScript</span>
              </div>
            </article>
            <article>
              <b>✳</b>
              <h3>Core concepts</h3>
              <p>
                Strengthening analytical thinking and computer science
                fundamentals.
              </p>
              <div className="tags">
                <span>Discrete Mathematics</span>
                <span>Problem Solving</span>
              </div>
            </article>
          </div>
          <p className="note">
            Skills listed are learning areas and can be updated as experience
            grows.
          </p>
        </section>

        <section className="wrap section" id="projects">
          <p className="kicker">03 / SELECTED WORK</p>
          <h2>
            Ideas worth
            <br />
            <em>exploring.</em>
          </h2>
          <div className="projects">
            <article className="project lilac">
              <div className="project-top">
                PROJECT 01 <b>⌖</b>
              </div>
              <div className="visual map">
                <span className="road r1" />
                <span className="road r2" />
                <i>●</i>
                <i>●</i>
                <i>●</i>
                <small>CAMPUS MAP</small>
              </div>
              <h3>Smart Campus Navigator</h3>
              <p>
                A campus navigation concept that helps students locate classrooms,
                labs, the library and student facilities through a simple
                interactive map.
              </p>
              <div className="project-bottom">
                <div className="tags">
                  <span>HTML</span>
                  <span>CSS</span>
                  <span>JavaScript</span>
                </div>
                <small>ACADEMIC CONCEPT</small>
              </div>
            </article>

            <article className="project peach">
              <div className="project-top">
                PROJECT 02 <b>✧</b>
              </div>
              <div className="visual study">
                <div className="window">
                  <small>•••</small>
                  <b>MY STUDY PLAN</b>
                  <p>
                    ▣ &nbsp; Data Structures <strong>✓</strong>
                  </p>
                  <p>
                    ▣ &nbsp; Mathematics <strong>✓</strong>
                  </p>
                  <p>
                    ▣ &nbsp; Programming <strong>↗</strong>
                  </p>
                </div>
              </div>
              <h3>AI Study Buddy</h3>
              <p>
                A student productivity concept for organizing subjects, planning
                study sessions and tracking learning goals, with scope to add
                AI-powered study suggestions.
              </p>
              <div className="project-bottom">
                <div className="tags">
                  <span>Python</span>
                  <span>UI Design</span>
                  <span>AI Concept</span>
                </div>
                <small>ACADEMIC CONCEPT</small>
              </div>
            </article>
          </div>
          <p className="note">
            These are portfolio project concepts. Update the descriptions and
            technologies to match the projects when implemented.
          </p>
        </section>

        <section className="wrap section" id="certificates">
          <p className="kicker">04 / CERTIFICATES</p>
          <h2>
            Learning, one step
            <br />
            at a <em>time.</em>
          </h2>
          <p className="cert-intro">
            Certificates earned through Wolfram U, included as part of my learning
            journey.
          </p>
          <div className="certs">
            <article>
              <div className="seal">
                W<span>U</span>
              </div>
              <div>
                <small>WOLFRAM U • LEVEL 1</small>
                <h3>Discrete Mathematics</h3>
                <p>Level 1 Certificate · November 2026 · 4 Training Hours</p>
                <a
                  href={`${REPO_BASE}/wolfram-level-1-discrete-mathematics.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View certificate ↗
                </a>
              </div>
            </article>
            <article>
              <div className="seal">
                W<span>U</span>
              </div>
              <div>
                <small>WOLFRAM U • COMPLETION</small>
                <h3>Introduction to Discrete Mathematics</h3>
                <p>Completion Certificate · November 2026 · 4 Training Hours</p>
                <a
                  href={`${REPO_BASE}/introduction-to-discrete-mathematics.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View certificate ↗
                </a>
              </div>
            </article>
          </div>
        </section>

        <section className="wrap contact" id="contact">
          <div>
            <div>
              <p className="kicker">05 / GET IN TOUCH</p>
              <h2>
                Have an idea?
                <br />
                <em>Let’s connect.</em>
              </h2>
              <p>
                I’m happy to connect, learn from others and explore new
                opportunities.
              </p>
            </div>
            <a href="mailto:tejaswibhoge@gmail.com">tejaswibhoge@gmail.com ↗</a>
          </div>
        </section>
      </main>

      <footer>
        <a className="brand" href="#home">
          <b>T</b> tejaswi<span>.</span>
        </a>
        <span>
          Made with curiosity ✦ © <span id="year">{currentYear}</span> Bhoge
          Tejaswi
        </span>
        <a href="#home">BACK TO TOP ↑</a>
      </footer>

      {/* Discreet helper button to copy/download the two .py files for GitHub */}
      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#211b35] hover:bg-[#5638b3] rounded-full shadow-lg transition-colors cursor-pointer"
      >
        <FileCode2 className="w-4 h-4" />
        Get Python Files ({projectedPct}% Python)
      </button>

      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Python files for tejaswi-portfolio"
        >
          <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full max-h-[88vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Add Python to tejaswibhoge-tech/tejaswi-portfolio ({projectedPct}%
                  Python)
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Your website files stay untouched. Create these 2 files directly
                  on GitHub using <strong>Add file → Create new file</strong> (no
                  zip needed).
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close"
                className="p-2 text-slate-500 hover:text-slate-900 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5">
              {TARGET_PYTHON_FILES.map((file) => (
                <div
                  key={file.id}
                  className="border border-slate-200 rounded-xl overflow-hidden"
                >
                  <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="font-mono text-xs font-semibold text-slate-900">
                        {file.path}
                      </span>
                      <span className="text-xs text-slate-500 ml-2 font-mono">
                        ({utf8ByteLength(file.content).toLocaleString()} bytes)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopy(file.id, file.content)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-md cursor-pointer"
                      >
                        {copiedId === file.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Copy code
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownload(file.path, file.content)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#7654d8] hover:bg-[#5638b3] rounded-md cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download .py
                      </button>
                    </div>
                  </div>
                  <pre className="p-4 bg-slate-950 text-slate-100 font-mono text-xs leading-relaxed overflow-x-auto max-h-56">
                    <code>{file.content}</code>
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
