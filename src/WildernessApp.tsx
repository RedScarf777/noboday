import { useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";

const works = [
  { no: "壹", orientation: "landscape", title: "国风动画《狐桃桃与老神仙》系列", desc: "署名编剧\n央视上线项目", image: "/胡桃桃.jpg", link: "https://v.qq.com/x/cover/mzc00200tt3iwq7.html" },
  { no: "贰", orientation: "landscape", title: "喜马拉雅音频故事《山猫神捕》", desc: "编剧/策划\n项目评分 9.6 分，170 万播放", image: "/山猫神捕.png", link: "https://www.ximalaya.com/album/77642883" },
  { no: "叁", orientation: "landscape", title: "文史教育自媒体（百万粉丝）", desc: "项目主笔/文史播客策划\n百万级播放，重塑历史叙事", image: "/文史账号.png", link: "https://v.douyin.com/18Yz33k7DWA" },
  { no: "肆", orientation: "landscape", title: "海底小纵队学海探秘之超级探险家", desc: "项目主力编剧\n专注动物与地理科普", image: "/super_explorer.png", link: "https://v.youku.com/v_show/id_XNjQzMjQ2MjI2MA==.html?spm=a2hkm.8166622.PhoneSokuProgram_1.dchapters_1&s=eaaf6adc35504c11a2a9" },
  { no: "伍", orientation: "portrait", title: "省级科普影片／非遗展陈", desc: "内容策划/现场调研\n让传统文化在现代空间呼吸", image: "/展览.jpg", link: "https://mp.weixin.qq.com/s/ZUYAoHh1fPoW93qwn6oo_A" },
  { no: "陆", orientation: "landscape", title: "纪录短片《山间候鸟》", desc: "导演/策划\n独立纪录片探索", image: "/mountain_birds.png", link: "https://www.xinpianchang.com/a11740933?from=webShare&channel=copyLink" },
  { no: "柒", orientation: "landscape", title: "安全教育主题系列动画《森林救援队》", desc: "编剧/策划\nAIGC动画项目", image: "/forest_rescue.jpg", link: "https://v.qq.com/x/cover/mzc003a3n8k2fz2/z3296gxi797.html" },
];

const paths = [
  { year: "2020", title: "确立方向", brief: "大学期间参加电影频道（CCTV6）的优创短片计划，成功入围。", detail: ["原创作品《白日梦梦》获官方支持，成功斩获组委会 10 万元资金扶持，正式踏入影视行业。", "我担任导演及编剧，负责原剧本改编、现场拍摄及制作统筹工作。"] },
  { year: "2022", title: "项目进阶", brief: "深入工业化制作全流程，从剧本到成片的跨维度协作。", detail: ["曾深度参与《海底小纵队》、《狐桃桃与老神仙》等知名 IP 的全流程创作，作品涵盖院线电影、腾讯/优酷上线剧集及喜马拉雅音频故事。", "同时，我能将叙事能力跨界应用于文旅与科普领域，负责过中国非遗馆、省科学技术馆等多个国家级/省级展馆的剧本策划与内容落地。"] },
  { year: "2025", title: "内容主笔", brief: "在百万级账号中打磨叙事逻辑，掌握流量背后的情绪密码。", detail: ["在短视频与知识付费领域，我曾深度操盘百万级文史教育账号，担任幕后主笔，产出过多条百万播放、高点赞的现象级爆款，对“黄金 3 秒”的抓取和完播留存有着精准的控制力。", "我不只负责前端引流，更具备将碎片化内容“产品化”的能力。通过设计深度文学大纲，我配合团队完成了从短视频引流到视频/音频课程开发的全链路闭环，我策划并参与创作了《少年中国史》系列睡前播客。"] },
  { year: "2026", title: "AI+编剧", brief: "尝试打破传统边界，在 AI 与跨媒介中探索叙事的新可能。", detail: ["作为 AI 工具的深度使用者，我正在积极探索将 AI 融入前期策划、角色设定与剧本创作的工作流。这种探索不仅提升了开发效率，更让我思考如何利用新技术重构故事形态。", "目前，我独立负责少儿动画及科普项目的核心编剧工作，覆盖从前期资料研究、故事架构到分镜设计及后续修改的全流程，推动项目从创意开发到成稿交付。"] },
];

function LandmarkCard({ work, index }: { work: typeof works[number]; index: number; key?: string }) {
  return (
    <motion.a
      href={work.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: Math.min(index * 0.06, 0.24) }}
      whileHover={{ y: -9, rotate: index % 2 ? -0.4 : 0.4 }}
      className={`landmark-card ${work.orientation} group`}
      aria-label={`查看${work.title}`}
    >
      <span className="landmark-pin" aria-hidden="true" />
      <div className="landmark-image">
        <img src={work.image} alt={work.title} />
        <div className="landmark-shade" />
      </div>
      <div className="landmark-copy">
        <h3>{work.title}</h3>
        <p>{work.desc}</p>
      </div>
    </motion.a>
  );
}

export default function WildernessApp() {
  const [activePath, setActivePath] = useState(0);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.18], [0, 90]);
  const current = paths[activePath];

  return (
    <main className="wilderness-page">
      <motion.div className="journey-progress" style={{ scaleX: scrollYProgress }} />

      <nav className="trail-nav" aria-label="页面导航">
        <a href="#top" className="trail-mark">哞的故事宇宙</a>
        <div><a href="#about">关于</a><a href="#works">作品</a><a href="#path">路径</a><a href="#contact">联系</a></div>
      </nav>

      <section id="top" className="wild-hero">
        <motion.div className="wild-hero-image" style={{ y: heroY }} />
        <div className="wild-hero-wash" />
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="cliff-inscription">
          <h1>写故事的人</h1>
          <div className="rock-intro">
            <p>你好，我是<span>哞哞</span>。</p>
            <p>专注于动画编剧与内容策划。</p>
            <p>从院线银幕到短视频，从网络播客到线下展厅。</p>
            <p>是故事的架构师，也是留意细节的观察者。</p>
          </div>
        </motion.div>
      </section>

      <section id="about" className="camp-section section-space">
        <div className="terrain-line terrain-line-one" />
        <div className="page-shell camp-layout">
          <motion.article initial={{ opacity: 0, x: -35 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="scroll-note">
            <span className="scroll-knot" />
            <h2>关于我</h2>
            <p><strong className="about-lead">00后小登编剧，INFJ</strong>这几年折腾的东西比较杂：拍过创投里的独立短片，做过热门 IP 的动画剧集；在喜马拉雅写过儿童故事，也主笔过播放千万的视频文案。偶尔也会跑跑线下，为不说话的非遗做好表达。</p>
            <blockquote>哞的一声就在键盘上开犁！</blockquote>
            <div className="campfire-mark" aria-hidden="true"><i /><b /><span /></div>
          </motion.article>

          <div className="monoliths">
            {[
              { orientation: "landscape", title: "院线电影《海底小纵队：海啸大危机》", image: "/海底小纵队.png", tags: ["累计3300万票房", "署名编剧"], link: "https://v.youku.com/v_show/id_XNjQ4NDY5OTMwOA==.html?spm=a2hkm.8166622.PhoneSokuProgram_1.dplaybutton&s=deaa218d0a024029ab36" },
              { orientation: "portrait", title: "创投短片《白日梦梦》", image: "/白日梦梦.jpg", tags: ["电影频道优创计划扶持", "导演、编剧"], link: "https://www.xinpianchang.com/a11616353?from=webShare&channel=copyLink" },
            ].map((item, index) => (
              <motion.a key={item.title} href={item.link} target="_blank" rel="noopener noreferrer" whileHover={{ y: -10 }} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .12 }} className={`monolith ${item.orientation}`}>
                <div className="monolith-window"><img src={item.image} alt={item.title} /></div>
                <div className="monolith-copy">
                  <h3>{item.title}</h3>
                  <div className="monolith-tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section id="works" className="coordinates-section section-space">
        <div className="page-shell">
          <header className="section-heading">
            <h2>快码加编</h2>
          </header>
          <div className="route-thread route-thread-a" />
          <div className="works-three">{works.slice(0, 3).map((work, index) => <LandmarkCard key={work.title} work={work} index={index} />)}</div>
          <div className="works-four">{works.slice(3).map((work, index) => <LandmarkCard key={work.title} work={work} index={index + 3} />)}</div>
        </div>
      </section>

      <section id="path" className="path-section section-space">
        <div className="page-shell path-shell">
          <header className="section-heading compact"><h2>成长路径</h2></header>
          <div className="map-panel">
            <div className="year-flags">
              {paths.map((item, index) => (
                <button key={item.year} type="button" onClick={() => setActivePath(index)} aria-pressed={activePath === index} className={activePath === index ? "active" : ""}>
                  <i /><strong>{item.year}</strong>
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.article key={current.year} initial={{ opacity: 0, y: 18, rotate: -1 }} animate={{ opacity: 1, y: 0, rotate: 0 }} exit={{ opacity: 0, y: -12, rotate: 1 }} transition={{ duration: .35 }} className="route-scroll">
                <div><span className="route-year">{current.year}</span></div>
                <h4>{current.brief}</h4>
                {current.detail.map(text => <p key={text}>{text}</p>)}
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <footer id="contact" className="cliff-footer">
        <div className="stars" />
        <div className="page-shell footer-content">
          <div className="wood-sign"><h2>有个好故事想聊聊？</h2></div>
          <div className="contact-stone">
            <div className="avatar-space"><img src="/momo-avatar.jpg" alt="哞哞头像" /></div>
            <div><p>微信</p><strong>RedScarf777</strong><small>期待与你共同架构下一个动人的瞬间。</small></div>
            <span className="contact-note">欢迎联系</span>
          </div>
        </div>
        <div className="cliff-edge" />
      </footer>
    </main>
  );
}
