import { useEffect, useMemo, useRef, useState, type PointerEvent, type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowDownRight,
  BookOpen,
  Check,
  Compass,
  Copy,
  Film,
  Mail,
  Map,
  Pause,
  Play,
  Sparkles,
} from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';

const RAW_ASSET_ROOT = 'https://raw.githubusercontent.com/RedScarf777/noboday/main/public';
const asset = (name: string) => `${RAW_ASSET_ROOT}/${encodeURIComponent(name)}`;

const works = [
  { title: '《海底小纵队：海啸大危机》', role: '编剧', metric: '院线票房 3300 万', image: '海底小纵队.png', link: 'https://v.youku.com/v_show/id_XNjQ4NDY5OTMwOA==.html?spm=a2hkm.8166622.PhoneSokuProgram_1.dplaybutton&s=deaa218d0a024029ab36', kind: '院线电影' },
  { title: '《狐桃桃与老神仙》', role: '署名编剧', metric: '央视上线项目', image: '胡桃桃.jpg', link: 'https://v.qq.com/x/cover/mzc00200tt3iwq7.html', kind: '国风动画' },
  { title: '《山猫神捕》', role: '编剧 / 策划', metric: '9.6 分 · 170 万播放', image: '山猫神捕.png', link: 'https://www.ximalaya.com/album/77642883', kind: '音频故事' },
  { title: '文史教育自媒体', role: '项目主笔', metric: '百万粉丝 · 千万级播放', image: '文史账号.png', link: 'https://v.douyin.com/18Yz33k7DWA', kind: '知识内容' },
  { title: '《山间候鸟》', role: '导演 / 策划', metric: '独立纪录片探索', image: '山间候鸟新海报.png', link: 'https://www.xinpianchang.com/a11740933?from=webShare&channel=copyLink', kind: '纪录短片' },
  { title: '《森林救援队》', role: '编剧 / 策划', metric: 'AIGC 动画项目', image: 'forest_rescue.jpg', link: 'https://v.qq.com/x/cover/mzc003a3n8k2fz2/z3296gxi797.html', kind: '系列动画' },
];

const chapters = [
  { year: '2020', title: '第一次把故事拍出来', text: '原创短片《白日梦梦》入选电影频道优创计划，获得 10 万元创投资金。我担任导演与编剧，从纸面故事走进真实片场。' },
  { year: '2022', title: '进入工业化制作', text: '参与头部动画、院线电影、音频故事与文旅展陈，逐渐熟悉从创意开发、协作生产到成片交付的完整链路。' },
  { year: '2025', title: '理解大众传播', text: '担任百万级文史账号幕后主笔，把复杂知识重构成可感、可听、可传播的故事，并参与课程与播客的产品化。' },
  { year: '2026', title: '让 AI 成为创作搭档', text: '将 AI 带入资料研究、角色设定、故事架构与分镜工作流，继续寻找技术与叙事之间更自然的连接。' },
];

const sections = [
  { id: 'desk', label: '首页', icon: Compass },
  { id: 'about', label: '关于', icon: BookOpen },
  { id: 'works', label: '作品', icon: Film },
  { id: 'journey', label: '路径', icon: Map },
  { id: 'contact', label: '联系', icon: Mail },
];

function moveSpotlight(event: PointerEvent<HTMLElement>) {
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
  event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
}

function InkTrailCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(pointer: coarse)').matches) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    type Point = { x: number; y: number; born: number; size: number };
    const points: Point[] = [];
    let previous: { x: number; y: number } | null = null;
    let frame = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const onMove = (event: globalThis.PointerEvent) => {
      if (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
      const next = { x: event.clientX, y: event.clientY };
      const distance = previous ? Math.hypot(next.x - previous.x, next.y - previous.y) : 0;
      const steps = Math.max(1, Math.floor(distance / 7));
      for (let index = 1; index <= steps; index += 1) {
        const ratio = index / steps;
        points.push({
          x: previous ? previous.x + (next.x - previous.x) * ratio : next.x,
          y: previous ? previous.y + (next.y - previous.y) * ratio : next.y,
          born: performance.now(),
          size: 1 + Math.random() * 1.6,
        });
      }
      if (points.length > 240) points.splice(0, points.length - 240);
      previous = next;
    };
    const draw = (now: number) => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let index = points.length - 1; index >= 0; index -= 1) {
        const age = now - points[index].born;
        if (age > 520) { points.splice(index, 1); continue; }
        const alpha = Math.max(0, 1 - age / 520) * .16;
        context.beginPath();
        context.fillStyle = `rgba(35, 55, 47, ${alpha})`;
        context.arc(points[index].x, points[index].y, points[index].size + age / 850, 0, Math.PI * 2);
        context.fill();
      }
      frame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    frame = window.requestAnimationFrame(draw);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="ink-trail-canvas" aria-hidden="true" />;
}

function WindowFrame({
  id,
  eyebrow,
  title,
  children,
  className = '',
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      id={id}
      className={`desk-window ${className}`}
      initial={{ opacity: 0, y: 42, scale: 0.975 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ type: 'spring', stiffness: 115, damping: 20 }}
      onPointerMove={moveSpotlight}
    >
      <header className="window-bar">
        <div className="traffic-lights" aria-hidden="true"><i /><i /><i /></div>
        <div className="window-title"><span>{eyebrow}</span><strong>{title}</strong></div>
        <span className="window-status">OPEN</span>
      </header>
      {children}
    </motion.section>
  );
}

export default function DesktopPortfolio() {
  const [activeSection, setActiveSection] = useState('desk');
  const [activeChapter, setActiveChapter] = useState(0);
  const [activeWork, setActiveWork] = useState(0);
  const [copied, setCopied] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 125, damping: 28, mass: 0.25 });
  const heroY = useTransform(scrollYProgress, [0, 0.24], [0, 90]);
  const heroScale = useTransform(scrollYProgress, [0, 0.22], [1.02, 1.09]);

  const timeLabel = useMemo(
    () => new Intl.DateTimeFormat('zh-CN', { hour: '2-digit', minute: '2-digit' }).format(new Date()),
    [],
  );

  useEffect(() => {
    const observers = sections.map(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return null;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveSection(id);
      }, { rootMargin: '-38% 0px -48% 0px', threshold: 0 });
      observer.observe(element);
      return observer;
    });
    return () => observers.forEach(observer => observer?.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      await audio.play();
      setMusicPlaying(true);
    } else {
      audio.pause();
      setMusicPlaying(false);
    }
  };

  const copyWechat = async () => {
    await navigator.clipboard?.writeText('RedScarf777');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main className="narrative-desk">
      <InkTrailCanvas />
      <motion.div className="scroll-progress" style={{ scaleX: smoothProgress }} />
      <audio ref={audioRef} src={asset('mozart-k15a.mp3')} loop preload="none" />

      <header className="system-bar">
        <button type="button" onClick={() => scrollTo('desk')} className="system-brand"><span>哞</span> 哞的故事宇宙</button>
        <nav aria-label="主导航">
          {sections.slice(1).map(item => <button key={item.id} type="button" onClick={() => scrollTo(item.id)}>{item.label}</button>)}
        </nav>
        <div className="system-meta"><span>故事工作台</span><b>{timeLabel}</b></div>
      </header>

      <section id="desk" className="desktop-hero" onPointerMove={moveSpotlight}>
        <motion.div className="desktop-wallpaper" style={{ y: heroY, scale: heroScale }} />
        <div className="wallpaper-wash" />
        <motion.div
          className="hero-window"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 95, damping: 18, delay: 0.12 }}
        >
          <div className="hero-window-top"><div className="traffic-lights"><i /><i /><i /></div><span>storyteller.profile</span><span>在线</span></div>
          <div className="hero-window-body">
            <div className="hero-kicker"><Sparkles size={15} /> WRITER · STORY DESIGNER · AI EXPLORER</div>
            <h1>写故事的人</h1>
            <p>你好，我是哞哞。专注动画编剧与内容策划，从院线银幕到短视频，从网络播客到线下展厅，把复杂世界整理成让人愿意听下去的故事。</p>
            <div className="hero-actions">
              <button type="button" onClick={() => scrollTo('works')}>打开作品集 <ArrowDownRight size={17} /></button>
              <button type="button" className="quiet" onClick={() => scrollTo('about')}>认识我</button>
            </div>
          </div>
          <div className="hero-profile-card">
            <img src={asset('momo-avatar.jpg')} alt="哞哞头像" />
            <div><span>AVAILABLE FOR</span><strong>动画编剧 · 内容策划</strong><small>Beijing / Remote</small></div>
          </div>
        </motion.div>
        <div className="desktop-note"><span>今日便签</span><p>故事不是逃离现实，<br />是重新理解现实。</p></div>
      </section>

      <div className="workspace">
        <WindowFrame id="about" eyebrow="PROFILE / 个人档案" title="关于哞哞" className="about-window">
          <div className="about-grid">
            <motion.div className="about-portrait" whileHover={{ rotate: -1.2, scale: 1.015 }} transition={{ type: 'spring', stiffness: 220, damping: 18 }}>
              <img src={asset('白日梦梦横版.png')} alt="创投短片《白日梦梦》" />
              <div><span>创作手记</span><b>从第一部短片开始，我就相信细节比宏大口号更接近人。</b></div>
            </motion.div>
            <div className="about-copy">
              <h2>把观察变成故事，<br />把故事做成作品。</h2>
              <p>拍过独立短片，做过热门 IP 动画；在喜马拉雅写儿童故事，也为百万级账号写过文史内容。偶尔跑到线下，为“不说话”的非遗和展品找到表达方式。</p>
              <div className="skill-chips"><span>动画编剧</span><span>内容策划</span><span>IP 开发</span><span>文史叙事</span><span>AIGC 工作流</span></div>
              <motion.img className="idea-bear" src={asset('自嘲熊有主意了.gif')} alt="自嘲熊有主意了" drag dragElastic={0.2} whileHover={{ scale: 1.08, rotate: -4 }} title="可以拖动我" />
            </div>
          </div>
        </WindowFrame>

        <WindowFrame id="works" eyebrow="FINDER / 作品资料夹" title="代表作品">
          <div className="works-intro"><h2>快码加编中</h2></div>
          <div className="work-reel">
            <AnimatePresence mode="wait">
              <motion.a key={works[activeWork].title} href={works[activeWork].link} target="_blank" rel="noopener noreferrer" className="reel-feature" initial={{ opacity: 0, x: 45, rotate: .8 }} animate={{ opacity: 1, x: 0, rotate: 0 }} exit={{ opacity: 0, x: -36, rotate: -.6 }} transition={{ type: 'spring', stiffness: 150, damping: 20 }}>
                <div className="reel-image"><img src={asset(works[activeWork].image)} alt={works[activeWork].title} /><span>{works[activeWork].kind}</span></div>
                <div className="reel-copy"><small>{works[activeWork].role}</small><h3>{works[activeWork].title}</h3><p>{works[activeWork].metric}</p></div>
              </motion.a>
            </AnimatePresence>
            <div className="reel-controls">
              <button type="button" aria-label="上一部作品" onClick={() => setActiveWork(previous => (previous - 1 + works.length) % works.length)}><ArrowLeft /></button>
              <div>{works.map((work, index) => <button key={work.title} type="button" aria-label={`切换到${work.title}`} className={activeWork === index ? 'active' : ''} onClick={() => setActiveWork(index)}><img src={asset(work.image)} alt="" /><span>{work.title}</span></button>)}</div>
              <button type="button" aria-label="下一部作品" onClick={() => setActiveWork(previous => (previous + 1) % works.length)}><ArrowRight /></button>
            </div>
          </div>
        </WindowFrame>

        <WindowFrame id="journey" eyebrow="TIMELINE / 成长路径" title="四个故事章节" className="journey-window">
          <div className="journey-layout">
            <nav className="chapter-tabs" aria-label="成长年份">
              {chapters.map((chapter, index) => (
                <motion.button
                  layout
                  key={chapter.year}
                  type="button"
                  className={activeChapter === index ? 'active' : ''}
                  onClick={() => setActiveChapter(index)}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>{chapter.year}</span><small>{chapter.title}</small>
                </motion.button>
              ))}
            </nav>
            <div className="chapter-reader">
              <AnimatePresence mode="wait">
                <motion.article
                  key={chapters[activeChapter].year}
                  initial={{ opacity: 0, x: 28, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                  transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span>{chapters[activeChapter].year} · CREATIVE JOURNEY</span>
                  <h2>{chapters[activeChapter].title}</h2>
                  <p>{chapters[activeChapter].text}</p>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </WindowFrame>

        <WindowFrame id="contact" eyebrow="MESSAGES / 联系方式" title="一起写下一个故事" className="contact-window">
          <div className="contact-layout">
            <div><span className="live-dot" /> OPEN TO COLLABORATION<h2>有个好故事<br />想聊聊？</h2></div>
            <motion.div className="contact-card" whileHover={{ rotate: 0.4, y: -5 }}>
              <img src={asset('momo-avatar.jpg')} alt="哞哞头像" />
              <div><small>WECHAT</small><strong>RedScarf777</strong><span>点击复制微信号</span></div>
              <button type="button" onClick={copyWechat} aria-label="复制微信号">{copied ? <Check /> : <Copy />}</button>
            </motion.div>
          </div>
        </WindowFrame>
      </div>

      <motion.nav className="app-dock" aria-label="快捷导航" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 130, damping: 18, delay: 0.55 }}>
        {sections.map(item => {
          const Icon = item.icon;
          return <motion.button key={item.id} type="button" aria-label={item.label} className={activeSection === item.id ? 'active' : ''} onClick={() => scrollTo(item.id)} whileHover={{ y: -9, scale: 1.12 }} whileTap={{ scale: 0.94 }}><Icon /><span>{item.label}</span></motion.button>;
        })}
        <i />
        <motion.button type="button" aria-label={musicPlaying ? '暂停音乐' : '播放音乐'} onClick={toggleMusic} whileHover={{ y: -9, scale: 1.12 }} whileTap={{ scale: 0.94 }}>{musicPlaying ? <Pause /> : <Play />}<span>{musicPlaying ? '暂停' : '音乐'}</span></motion.button>
      </motion.nav>

      <footer className="desk-footer">© 2026 MOOMOO NARRATIVE STUDIO <span>•</span> MADE WITH CURIOSITY</footer>
    </main>
  );
}

