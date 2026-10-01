import { useEffect, useRef, useState, type PointerEvent } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowLeft, ArrowRight, Check, ChevronRight, Copy, Pause, Play } from "lucide-react";

const works = [
  { orientation: "landscape", title: "国风动画《狐桃桃与老神仙》系列", role: "署名编剧", result: "央视上线项目", image: "/胡桃桃.jpg", link: "https://v.qq.com/x/cover/mzc00200tt3iwq7.html", tone: "vermilion" },
  { orientation: "landscape", title: "喜马拉雅音频故事《山猫神捕》", role: "编剧/策划", result: "项目评分 9.6 分，170 万播放", image: "/山猫神捕.png", link: "https://www.ximalaya.com/album/77642883", tone: "blue" },
  { orientation: "landscape", title: "文史教育自媒体（百万粉丝）", role: "项目主笔/文史播客策划", result: "百万级播放，重塑历史叙事", image: "/文史账号.png", link: "https://v.douyin.com/18Yz33k7DWA", tone: "ink" },
  { orientation: "landscape", title: "海底小纵队学海探秘之超级探险家", role: "项目主力编剧", result: "专注动物与地理科普", image: "/super_explorer.png", link: "https://v.youku.com/v_show/id_XNjQzMjQ2MjI2MA==.html?spm=a2hkm.8166622.PhoneSokuProgram_1.dchapters_1&s=eaaf6adc35504c11a2a9", tone: "sky" },
  { orientation: "portrait", title: "省级科普影片／非遗展陈", role: "内容策划/现场调研", result: "让传统文化在现代空间呼吸", image: "/展览.jpg", link: "https://mp.weixin.qq.com/s/ZUYAoHh1fPoW93qwn6oo_A", tone: "sand" },
  { orientation: "landscape", title: "纪录短片《山间候鸟》", role: "导演/策划", result: "独立纪录片探索", image: "/山间候鸟新海报.png", link: "https://www.xinpianchang.com/a11740933?from=webShare&channel=copyLink", tone: "slate" },
  { orientation: "landscape", title: "安全教育主题系列动画《森林救援队》", role: "编剧/策划", result: "AIGC动画项目", image: "/forest_rescue.jpg", link: "https://v.qq.com/x/cover/mzc003a3n8k2fz2/z3296gxi797.html", tone: "green" },
];

const paths = [
  { year: "2020", title: "确立方向", brief: "大学期间参加电影频道（CCTV-6）的优创短片计划，成功入围。", detail: ["原创作品《白日梦梦》获官方支持，成功斩获组委会 10 万元资金扶持，正式踏入影视行业。", "我担任导演及编剧，负责原剧本改编、现场拍摄及制作统筹工作。"] },
  { year: "2022", title: "项目进阶", brief: "经历过从剧本到成片的完整链路，熟悉协作逻辑，不纸上谈兵。", detail: ["曾深度参与《海底小纵队》《狐桃桃与老神仙》等知名 IP 的全流程创作，作品涵盖院线电影、腾讯/优酷上线剧集及喜马拉雅音频故事。", "同时，我能将叙事能力跨界应用于文旅与科普领域，负责过中国非遗馆、省科学技术馆等多个国家级及省级展馆的剧本策划与内容落地。"] },
  { year: "2025", title: "内容主笔", brief: "在互联网摸爬滚打过，懂大众传播，也懂怎么调动情绪。", detail: ["在短视频与知识付费领域，我曾深度操盘百万级文史教育账号，担任幕后主笔，产出过多条百万播放、高互动的爆款内容，对开篇节奏与完播留存有较成熟的把控。", "我不只负责前端引流，更具备将碎片化内容“产品化”的能力。通过设计深度文学大纲，我配合团队完成了从短视频引流到视频/音频课程开发的全链路闭环，并策划、参与创作了《少年中国史》系列睡前播客。"] },
  { year: "2026", title: "AI+编剧", brief: "AI时代，尝试一些新工具，探索叙事新可能", detail: ["作为 AI 工具的深度使用者，我正在积极探索将 AI 融入前期策划、角色设定与剧本创作的工作流。这种探索不仅提升了开发效率，更让我思考如何利用新技术重构故事形态。", "目前，我独立负责少儿动画及科普项目的核心编剧工作，覆盖从前期资料研究、故事架构到分镜设计及后续修改的全流程，推动项目从创意开发到成稿交付。"] },
];

const anchors = ["关于", "作品", "路径", "联系"];

function moveSpotlight(event: PointerEvent<HTMLElement>) {
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
  event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
}

function InkTrailCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(pointer: coarse)").matches) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    type InkPoint = { x: number; y: number; born: number; size: number };
    const points: InkPoint[] = [];
    let lastPoint: { x: number; y: number } | null = null;
    let frame = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const addPoint = (x: number, y: number) => {
      points.push({ x, y, born: performance.now(), size: 1.1 + Math.random() * 1.6 });
      if (points.length > 260) points.splice(0, points.length - 260);
    };

    const onMove = (event: globalThis.PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      const next = { x: event.clientX, y: event.clientY };
      if (lastPoint) {
        const distance = Math.hypot(next.x - lastPoint.x, next.y - lastPoint.y);
        const steps = Math.max(1, Math.floor(distance / 7));
        for (let index = 1; index <= steps; index += 1) {
          const progress = index / steps;
          addPoint(lastPoint.x + (next.x - lastPoint.x) * progress, lastPoint.y + (next.y - lastPoint.y) * progress);
        }
      } else addPoint(next.x, next.y);
      lastPoint = next;
    };
    const resetTrail = () => { lastPoint = null; };

    const draw = (now: number) => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let index = points.length - 1; index >= 0; index -= 1) {
        const point = points[index];
        const age = now - point.born;
        if (age > 500) {
          points.splice(index, 1);
          continue;
        }
        const fade = age < 100 ? 1 : 1 - (age - 100) / 400;
        context.beginPath();
        context.fillStyle = `rgba(37, 58, 54, ${Math.max(0, fade) * .18})`;
        context.arc(point.x, point.y, point.size + age / 900, 0, Math.PI * 2);
        context.fill();
      }
      frame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", resetTrail);
    frame = window.requestAnimationFrame(draw);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", resetTrail);
    };
  }, []);

  return <canvas ref={canvasRef} className="ink-trail-canvas" aria-hidden="true" />;
}

export default function WildernessApp() {
  const [activePath, setActivePath] = useState(0);
  const [activeWork, setActiveWork] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: .25 });
  const heroY = useTransform(scrollYProgress, [0, .18], [0, 95]);
  const current = paths[activePath];
  const selectedWork = works[activeWork];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = .32;

    const beginPlayback = () => {
      if (!audio.paused) return;
      void audio.play().then(() => setIsMusicPlaying(true)).catch(() => undefined);
    };

    beginPlayback();
    const resumeAfterGesture = (event: Event) => {
      const target = event.target;
      if (target instanceof Element && target.closest(".music-player")) return;
      beginPlayback();
    };
    window.addEventListener("pointerdown", resumeAfterGesture, { once: true });
    window.addEventListener("keydown", resumeAfterGesture, { once: true });
    return () => {
      audio.pause();
      window.removeEventListener("pointerdown", resumeAfterGesture);
      window.removeEventListener("keydown", resumeAfterGesture);
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!isMusicPlaying) {
      void audio.play().then(() => setIsMusicPlaying(true)).catch(() => undefined);
    } else {
      audio.pause();
      setIsMusicPlaying(false);
    }
  };

  const copyWechat = async () => {
    await navigator.clipboard?.writeText("RedScarf777");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main className="wilderness-page">
      <InkTrailCanvas />
      <motion.div className="journey-progress" style={{ scaleX: progress }} />
      <nav className="trail-nav" aria-label="页面导航"><a href="#top" className="trail-mark"><span>哞</span>的故事宇宙</a><div>{anchors.map((label, index) => <a key={label} href={`#${["about", "works", "path", "contact"][index]}`}>{label}</a>)}</div></nav>
      <audio ref={audioRef} src="/mozart-k15a.mp3" autoPlay loop preload="auto" onPlay={() => setIsMusicPlaying(true)} onPause={() => setIsMusicPlaying(false)} />
      <motion.aside className={`music-player ${isMusicPlaying ? "is-playing" : ""}`} initial={{ opacity: 0, x: -18, scale: .9 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: .35 }} aria-label="背景音乐播放器">
        <button className="music-toggle" type="button" onClick={toggleMusic} aria-label={isMusicPlaying ? "暂停背景音乐" : "播放背景音乐"}>{isMusicPlaying ? <Pause size={17} /> : <Play size={17} />}</button>
      </motion.aside>

      <section id="top" className="wild-hero" onPointerMove={moveSpotlight}>
        <motion.div className="wild-hero-image" style={{ y: heroY }} /><div className="hero-pointer-light" /><div className="wild-hero-wash" /><div className="hero-contours" aria-hidden="true"><i /><i /><i /></div>
        <motion.div initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }} className="cliff-inscription">
          <div className="story-title" aria-label="写故事的人"><svg viewBox="0 0 620 160" aria-hidden="true"><motion.text x="8" y="118" className="story-title-stroke" initial={{ strokeDashoffset: 1800 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 1.85, ease: [0.22, 1, 0.36, 1], delay: .2 }}>写故事的人</motion.text><motion.text x="8" y="118" className="story-title-fill" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .7, delay: 1.35 }}>写故事的人</motion.text></svg></div><motion.p className="mobile-hero-subtitle" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: 1.65 }}>THE STORYTELLER</motion.p>
        </motion.div>
      </section>

      <section id="about" className="camp-section section-space"><div className="page-shell camp-layout">
        <motion.article initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .75 }} className="scroll-note" onPointerMove={moveSpotlight}>
          <span className="note-spotlight" /><h2>关于我</h2><p><strong className="about-lead">00后小登编剧，INFJ</strong>这几年折腾的东西比较杂：拍过创投里的独立短片，做过热门 IP 的动画剧集；在喜马拉雅写过儿童故事，也主笔过播放千万的视频文案。偶尔也会跑跑线下，为不说话的非遗做好表达。</p><blockquote>哞的一声就在键盘上开犁！</blockquote>
        </motion.article>
        <div className="featured-works">{[
          { orientation: "landscape", title: "院线电影《海底小纵队：海啸大危机》", image: "/海底小纵队.png", tags: ["累计3300万票房", "署名编剧"], link: "https://v.youku.com/v_show/id_XNjQ4NDY5OTMwOA==.html?spm=a2hkm.8166622.PhoneSokuProgram_1.dplaybutton&s=deaa218d0a024029ab36" },
          { orientation: "landscape", title: "创投短片《白日梦梦》", image: "/白日梦梦横版.png", tags: ["电影频道优创计划扶持", "导演、编剧"], link: "https://www.xinpianchang.com/a11616353?from=webShare&channel=copyLink" },
        ].map((item, index) => <motion.a key={item.title} href={item.link} target="_blank" rel="noopener noreferrer" onPointerMove={moveSpotlight} initial={{ opacity: 0, x: 44 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .7, delay: index * .12 }} className={`monolith ${item.orientation}`}><span className="monolith-light" /><div className="monolith-window"><img src={item.image} alt={item.title} /></div><div className="monolith-copy"><h3>{item.title}</h3><div className="monolith-tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></motion.a>)}</div>
      </div></section>

      <section id="works" className="coordinates-section section-space"><div className="page-shell"><header className="section-heading"><h2>快码加编</h2></header>
        <div className="work-player">
          <div className="work-selector" role="tablist" aria-label="作品选择">
            {works.map((work, index) => <button key={work.title} type="button" role="tab" aria-selected={activeWork === index} className={activeWork === index ? "active" : ""} onPointerEnter={() => setActiveWork(index)} onClick={() => setActiveWork(index)}><span>{work.title}</span><ChevronRight size={17} /></button>)}
          </div>
          <div className={`work-stage tone-${selectedWork.tone}`} onPointerMove={moveSpotlight}>
            <h3 className="mobile-work-title">{selectedWork.title}</h3>
            <span className="stage-glow" aria-hidden="true" />
            <AnimatePresence mode="wait">
              <motion.a key={selectedWork.title} href={selectedWork.link} target="_blank" rel="noopener noreferrer" className={`stage-content ${selectedWork.orientation}`} initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: .38, ease: [0.22, 1, 0.36, 1] }}>
                <div className={`stage-image ${selectedWork.orientation}`}><img src={selectedWork.image} alt={selectedWork.title} /></div>
                <div className="stage-copy"><dl><div><dt>职能</dt><dd>{selectedWork.role}</dd></div><div><dt>定位</dt><dd>{selectedWork.result}</dd></div></dl></div>
              </motion.a>
            </AnimatePresence>
            <div className="stage-controls"><button type="button" aria-label="上一部作品" onClick={() => setActiveWork((activeWork - 1 + works.length) % works.length)}><ArrowLeft size={19} /></button><div>{works.map((work, index) => <button key={work.title} type="button" aria-label={`切换到${work.title}`} className={activeWork === index ? "active" : ""} onClick={() => setActiveWork(index)} />)}</div><button type="button" aria-label="下一部作品" onClick={() => setActiveWork((activeWork + 1) % works.length)}><ArrowRight size={19} /></button></div>
          </div>
        </div>
      </div></section>

      <section id="path" className="path-section section-space"><div className="page-shell path-shell"><header className="section-heading path-heading"><h2>成长路径</h2></header><div className="map-panel">
        <div className="year-flags"><motion.span className="year-progress" animate={{ height: `${(activePath / (paths.length - 1)) * 100}%` }} transition={{ duration: .45, ease: "easeOut" }} />{paths.map((item, index) => <button key={item.year} type="button" onClick={() => setActivePath(index)} aria-pressed={activePath === index} className={activePath === index ? "active" : ""}><i /><span><strong>{item.year}</strong><small>{item.title}</small></span></button>)}</div>
        <AnimatePresence mode="wait"><motion.article key={current.year} initial={{ opacity: 0, y: 24, rotate: -.4 }} animate={{ opacity: 1, y: 0, rotate: 0 }} exit={{ opacity: 0, y: -18, rotate: .4 }} transition={{ duration: .42, ease: [0.22, 1, 0.36, 1] }} className="route-scroll"><h4>{current.brief}</h4>{current.detail.map(text => <p key={text}>{text}</p>)}<button className="next-path" type="button" aria-label="下一段经历" onClick={() => setActivePath((activePath + 1) % paths.length)}><ChevronRight size={18} /></button></motion.article></AnimatePresence>
      </div></div></section>

      <footer id="contact" className="cliff-footer"><div className="stars" /><div className="shooting-star" /><div className="page-shell footer-content"><div className="footer-call"><h2>有个好故事<br />想聊聊？</h2></div><div className="contact-stone"><div className="avatar-space"><img src="/momo-avatar.jpg" alt="哞哞头像" /></div><div className="contact-copy"><p>微信</p><strong>RedScarf777</strong></div><button type="button" aria-label={copied ? "微信号已复制" : "复制微信号"} onClick={copyWechat} className={copied ? "copied" : ""}>{copied ? <Check size={18} /> : <Copy size={18} />}</button></div></div><div className="cliff-edge" /></footer>
    </main>
  );
}
