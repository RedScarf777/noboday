/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion, useScroll } from 'motion/react';

// --- Components ---

const Seal = ({ text, className = "" }: { text: string; className?: string }) => (
  <div className={`relative inline-flex items-center justify-center p-2 border-2 border-cinnabar/80 text-cinnabar font-display text-sm leading-none select-none rounded-[35%_45%_38%_42%] rotate-[-3deg] ${className}`}>
    <div className="absolute inset-0 bg-cinnabar/8 -z-10 rounded-[35%_45%_38%_42%]" />
    <span className="writing-vertical tracking-widest">{text}</span>
    <div className="absolute -top-1 -left-1 w-2 h-2 bg-cinnabar/20 rounded-full blur-[1px]" />
    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-cinnabar/20 rounded-full blur-[1px]" />
  </div>
);

const StoryboardCard = ({ 
  number, 
  title, 
  desc, 
  image,
  placeholder,
  link
}: { 
  number: string; 
  title: string; 
  desc: string; 
  image?: string;
  placeholder?: string;
  link?: string 
}) => (
  <motion.div 
    whileHover={{ y: -8, rotate: number === "02" || number === "05" ? -0.6 : 0.6 }}
    className="field-card group relative h-full flex flex-col bg-[#fffaf0] border-2 border-ink/10 p-3 pb-5 shadow-[0_12px_30px_rgba(37,50,39,0.16)] transition-all duration-500 hover:shadow-[0_18px_45px_rgba(37,50,39,0.24)] text-ink rounded-[18px_12px_20px_14px]"
  >
    <div className="map-pin" aria-hidden="true" />
    <div className="flex items-center justify-between px-1 pt-2 text-[10px] font-mono tracking-[0.18em] text-ink/45">
      <span>OBSERVATION {number}</span>
      <span>FIELD LOG</span>
    </div>
    
    <div className="mt-3 mb-5 aspect-video bg-xuan relative overflow-hidden border-2 border-white rounded-[10px] shadow-inner">
      {image ? (
        <img 
          src={image}
          alt={title}
          className="w-full h-full object-cover bg-xuan transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center bg-[linear-gradient(135deg,rgba(211,47,47,0.04),rgba(48,90,154,0.08))]">
          <span className="text-[10px] font-mono tracking-[0.25em] opacity-35">IMAGE PLACEHOLDER</span>
          <span className="mt-3 text-sm font-serif text-ink/55">{placeholder}</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/15 via-transparent to-transparent opacity-50 group-hover:opacity-20 transition-opacity duration-500" />
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`查看${title}`}
          className="absolute inset-0 z-20"
        />
      )}
    </div>
    
    <div className="flex-grow">
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className="block">
          <h3 className="text-xl font-display mb-2 leading-snug group-hover:text-cinnabar transition-colors">{title}</h3>
        </a>
      ) : (
        <h3 className="text-xl font-display mb-2 leading-snug group-hover:text-cinnabar transition-colors">{title}</h3>
      )}
      <p className="text-sm font-serif opacity-65 leading-relaxed">{desc}</p>
    </div>
    
    <div className="mt-5 pt-3 border-t border-dashed border-ink/15 flex justify-between items-center">
      <span className="text-[10px] font-mono opacity-40">SPECIMEN NO.{number}</span>
      <span className="text-[10px] font-handwriting text-cinnabar text-base">story found →</span>
    </div>
  </motion.div>
);

const pathEntries = [
  {
    year: "2020",
    title: "确立方向",
    desc: "原创作品获官方支持，正式踏入编剧行业。",
    detail: [
      "该项目为电影频道（CCTV6）发起的面向新人的短片创投活动。",
      "首届仅有四部短片获得创投资金，《白日梦梦》成功斩获组委会 10 万元资金扶持。",
      "本人担任导演及编剧，负责原剧本改编、现场拍摄及制作统筹工作。",
    ],
  },
  {
    year: "2022",
    title: "项目进阶",
    desc: "深入工业化制作全流程，从剧本到成片的跨维度协作。",
    detail: [
      "我具备从院线电影、头部动画到文旅策展的全维度创作与开发能力。在长视频领域，曾深度参与《海底小纵队》、《狐桃桃》等知名 IP 的全流程创作，作品涵盖院线电影（票房 3300 万）、腾讯/优酷上线剧集及喜马拉雅 9.6 分爆款有声剧（播放量 170W+）。",
      "除了成熟 IP 的内容再创作，我擅长文学 IP 的影视化评估与评估报告产出，能精准把控叙事节奏与市场潜力，并拥有丰富的跟组经验。同时，我能将叙事能力跨界应用于文旅与科普领域，负责过中国非遗馆、省科学技术馆等多个国家级/省级展馆的剧本策划与内容落地。",
    ],
  },
  {
    year: "2025",
    title: "内容主笔",
    desc: "在百万级账号中打磨叙事逻辑，掌握流量背后的情绪密码。",
    detail: [
      "在短视频与知识付费领域，我曾深度操盘百万级文史教育账号，担任幕后主笔。我擅长将硬核文史知识进行“故事化重构”，产出过多条百万播放、高点赞的现象级爆款，对“黄金 3 秒”的抓取和完播留存有着精准的控制力。",
      "我不只负责前端引流，更具备将碎片化内容“产品化”的能力。通过设计深度文学大纲，我配合团队完成了从短视频引流到视频/音频课程开发的全链路闭环。期间，我策划并参与创作了《少年中国史》系列睡前播客，根据受众定位和听觉需求，完成了相应的叙事设计与创作适配。",
    ],
  },
  {
    year: "2026",
    title: "AI+编剧",
    desc: "尝试打破传统边界，在 AI 与跨媒介中探索叙事的新可能。",
    detail: [
      "作为 AI 工具的深度使用者，我正在积极探索将 AI 融入前期策划、角色设定与剧本创作的工作流中。这种探索不仅提升了开发效率，更让我思考如何利用新技术重构故事形态。",
      "目前，我独立负责少儿动画及科普项目的核心编剧工作，覆盖从前期资料研究、故事架构到分镜设计及后续修改的全流程，推动项目从创意开发到成稿交付。",
    ],
  },
];

// --- Main App ---

export default function App() {
  const [activePathIndex, setActivePathIndex] = useState(0);
  const activePath = pathEntries[activePathIndex];
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen overflow-x-hidden paper-texture">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-cinnabar origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section */}
      <section className="explorer-hero relative min-h-[100svh] flex items-center overflow-hidden text-[#fff8e8]">
        <div className="absolute inset-0 bg-[url('/explorer-hero.png')] bg-cover bg-[62%_center] md:bg-center scale-[1.01]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(26,45,39,.72)_0%,rgba(26,45,39,.24)_48%,rgba(26,45,39,.06)_72%),linear-gradient(0deg,rgba(22,37,34,.52)_0%,transparent_44%)]" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink/35 to-transparent" />
        
        <div className="container mx-auto px-6 md:px-10 relative z-10 pt-16 pb-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 rounded-full border border-[#fff8e8]/50 bg-ink/20 px-4 py-2 font-mono text-[10px] tracking-[0.24em] backdrop-blur-sm"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-[#e99b61]" />
              EXPLORER'S NARRATIVE LOG · 001
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.9 }}
              className="relative mt-8"
            >
              <p className="font-handwriting text-2xl md:text-3xl text-[#ffe1b5] mb-1 rotate-[-2deg]">Stories begin where the path bends</p>
              <h1 className="text-7xl sm:text-8xl md:text-[8.5rem] font-display tracking-tight leading-[0.9] text-[#fff8e8] hero-title-shadow">
                写故事的人<span className="text-[#ee9c60]">。</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="mt-10 max-w-xl rounded-[22px_18px_26px_16px] border border-white/30 bg-[#fff8e8]/90 p-6 md:p-7 text-ink shadow-2xl backdrop-blur-md rotate-[-0.8deg]"
            >
              <p className="text-base md:text-lg font-serif leading-[1.9]">
                你好，我是<span className="font-display text-2xl mx-1 text-cinnabar">哞哞</span>。<br />
                专注于动画编剧与内容策划。<br />
                从院线银幕到短视频，从网络播客到线下展厅。<br />
                是故事的架构师，也是留意细节的观察者。
              </p>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[#fff8e8]/80">
          <span className="font-mono text-[9px] tracking-[0.28em]">TURN THE PAGE</span>
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }} className="text-xl">↓</motion.span>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-[#dfe7d5]">
        <div className="container mx-auto px-6">
          <div className="open-notebook grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto overflow-hidden rounded-[30px] shadow-[0_30px_80px_rgba(37,50,39,.2)] border border-ink/10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="notebook-page notebook-grid relative p-8 md:p-14 lg:p-16"
            >
              <div className="absolute right-8 top-8 w-20 h-20 rounded-full border-2 border-dashed border-turquoise/30 flex items-center justify-center font-mono text-[9px] tracking-widest text-turquoise/60 rotate-12">FIELD<br/>NOTE</div>
              <div className="min-h-[32rem] flex flex-col justify-center gap-12 text-lg font-serif leading-[2] text-ink/90 relative z-10">
                <p className="font-mono text-[10px] tracking-[0.3em] text-turquoise">LOG 02 / ABOUT THE EXPLORER</p>
                <p className="opacity-80 max-w-xl">
                  这几年折腾的东西比较杂：拍过创投里的独立短片，做过热门 IP 的动画剧集；
                  在喜马拉雅写过儿童故事，也主笔过播放千万的视频文案。
                  偶尔也会跑跑线下，为不说话的非遗做好表达。
                </p>
                <p className="relative italic font-handwriting text-3xl md:text-4xl leading-relaxed text-cinnabar max-w-lg rotate-[-2deg] before:absolute before:-left-5 before:top-4 before:text-xl before:content-['✦']">
                  “比起那些宏大叙事，我更着迷于这种有触感的细节。”
                </p>
              </div>
            </motion.div>

            <div className="notebook-page relative grid grid-cols-1 gap-8 p-8 md:p-12 lg:p-14 lg:border-l-2 lg:border-ink/10">
              <div className="absolute left-1/2 top-0 bottom-0 hidden lg:block w-8 -translate-x-[calc(50%+2px)] bg-gradient-to-r from-transparent via-ink/5 to-transparent pointer-events-none" />
              {[
                {
                  scene: "01",
                  title: "院线电影《海底小纵队：海啸大危机》",
                  image: "/海底小纵队.png",
                  alt: "《海底小纵队：海啸大危机》电影海报",
                  tags: ["累计3300万票房", "署名编剧"],
                  link: "https://v.youku.com/v_show/id_XNjQ4NDY5OTMwOA==.html?spm=a2hkm.8166622.PhoneSokuProgram_1.dplaybutton&s=deaa218d0a024029ab36",
                },
                {
                  scene: "02",
                  title: "创投短片《白日梦梦》",
                  image: "/白日梦梦.jpg",
                  alt: "《白日梦梦》电影海报",
                  tags: ["CCTV-6 优创计划扶持", "导演、编剧"],
                  link: "https://www.xinpianchang.com/a11616353?from=webShare&channel=copyLink",
                },
              ].map((work, idx) => (
                <motion.a
                  key={work.title}
                  href={work.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`查看${work.title}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  whileHover={{ y: -4 }}
                  className={`polaroid group relative grid grid-cols-1 md:grid-cols-[minmax(0,1.35fr)_minmax(12rem,1fr)] overflow-hidden bg-[#fffaf0] border-[10px] border-[#fffaf0] shadow-[0_16px_28px_rgba(37,50,39,.2)] hover:shadow-[0_22px_38px_rgba(37,50,39,.28)] transition-all duration-500 rounded-sm ${idx === 0 ? 'rotate-[1deg]' : 'rotate-[-1.2deg]'}`}
                >
                  <div className="relative min-h-52 overflow-hidden bg-white">
                    <img
                      src={work.image}
                      alt={work.alt}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="relative flex flex-col justify-between p-5 md:p-6 border-t md:border-t-0 md:border-l border-dashed border-ink/15">
                    <div className="flex justify-between text-[10px] font-mono tracking-widest opacity-40">
                      <span>DISCOVERY: {work.scene}</span>
                      <span>KEEP SAFE</span>
                    </div>
                    <div className="py-7">
                      <h3 className="text-2xl md:text-3xl font-display leading-snug group-hover:text-cinnabar transition-colors">
                        {work.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-5">
                        {work.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1.5 border border-cinnabar/20 bg-cinnabar/5 text-xs font-serif text-cinnabar">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-[10px] font-handwriting text-lg text-cinnabar">collected by Moomoo ✦</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section id="works" className="cork-board py-24 md:py-32 text-ink relative">
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex justify-between items-end mb-16 rounded-[20px] bg-[#fff7e8]/92 border-2 border-white/50 px-7 py-6 shadow-lg rotate-[-.4deg]">
            <div>
              <p className="font-mono text-[10px] tracking-[.28em] text-turquoise mb-3">WILDERNESS OBSERVATION BOARD</p>
              <h2 className="text-5xl md:text-6xl mb-3">沿途发现<span className="text-cinnabar">。</span></h2>
              <p className="font-serif opacity-65 italic">七份关于故事与世界的观察记录</p>
            </div>
            <div className="hidden md:block text-right">
              <span className="text-xs font-mono opacity-50">SPECIMENS: 07</span><br />
              <span className="text-xs font-mono opacity-50">EXPEDITION: 2020—2026</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            <StoryboardCard 
              number="01" 
              image="/胡桃桃.jpg"
              title="国风动画《狐桃桃与老神仙》系列" 
              desc="署名编剧，央视上线项目。"
              link="https://v.qq.com/x/cover/mzc00200tt3iwq7.html"
            />
            <StoryboardCard 
              number="02" 
              image="/山猫神捕.png"
              title="喜马拉雅《山猫神捕》" 
              desc="编剧/策划，项目评分 9.6 分，170 万播放。"
              link="https://www.ximalaya.com/album/77642883"
            />
            <StoryboardCard 
              number="03" 
              image="/文史账号.png"
              title="文史教育自媒体（百万粉丝）" 
              desc="项目主笔/文史播客策划。千万级播放，重塑历史叙事。"
              link="https://v.douyin.com/18Yz33k7DWA"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 mt-10">
            <StoryboardCard 
              number="04" 
              image="/super_explorer.png"
              title="海底小纵队学海探秘之超级探险家" 
              desc="项目主力编剧，专注动物+地理科普。"
              link="https://v.youku.com/v_show/id_XNjQzMjQ2MjI2MA==.html?spm=a2hkm.8166622.PhoneSokuProgram_1.dchapters_1&s=eaaf6adc35504c11a2a9"
            />
            <StoryboardCard 
              number="05" 
              image="/展览.jpg"
              title="省级科普影片/非遗展陈" 
              desc="内容策划/现场调研。让传统文化在现代空间呼吸。"
              link="https://mp.weixin.qq.com/s/ZUYAoHh1fPoW93qwn6oo_A" 
            />
            <StoryboardCard 
              number="06" 
              image="/mountain_birds.png"
              title="纪录短片《山间候鸟》" 
              desc="导演/策划，独立纪录片探索。"
              link="https://www.xinpianchang.com/a11740933?from=webShare&channel=copyLink"
            />
            <StoryboardCard 
              number="07" 
              image="/forest_rescue.jpg"
              title="安全教育主题系列动画《森林救援队》" 
              desc="编剧/策划，AIGC 动画项目。"
              link="https://v.qq.com/x/cover/mzc003a3n8k2fz2/z3296gxi797.html"
            />
          </div>
        </div>
      </section>

      {/* Path Section */}
      <section className="trail-map py-24 md:py-32 overflow-hidden relative">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 text-center">
              <p className="font-mono text-[10px] tracking-[.3em] text-turquoise mb-4">ROUTE MAP / FOUR WAYPOINTS</p>
              <h2 className="text-5xl md:text-6xl mb-4">成长路径<span className="text-cinnabar">。</span></h2>
              <p className="font-serif opacity-60">沿着创作留下的足迹，翻阅每一站的手记</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[15rem_minmax(0,1fr)] gap-10 lg:gap-16 items-start">
              <nav aria-label="成长年份" className="route-nav relative grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-col gap-4 lg:gap-7 lg:py-4">
                <div className="absolute hidden lg:block left-7 top-8 bottom-8 border-l-2 border-dashed border-turquoise/35" aria-hidden="true" />
                {pathEntries.map((entry, index) => {
                  const isActive = index === activePathIndex;
                  return (
                    <button
                      key={entry.year}
                      type="button"
                      onClick={() => setActivePathIndex(index)}
                      aria-pressed={isActive}
                      className={`group relative z-10 shrink-0 lg:w-full flex items-center gap-3 px-3 py-3 rounded-full border-2 text-left transition-all duration-300 ${
                        isActive
                          ? "bg-cinnabar text-white border-cinnabar shadow-lg translate-x-0 lg:translate-x-3"
                          : "bg-[#fff8e8]/80 text-ink border-ink/10 hover:border-turquoise/40 hover:bg-white"
                      }`}
                    >
                      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg ${isActive ? 'bg-white/15' : 'bg-turquoise/10'}`}>{["⛺", "↟", "🔥", "✦"][index]}</span>
                      <span>
                        <span className="block font-mono text-lg tracking-wider leading-none">{entry.year}</span>
                        <span className="block mt-1 font-serif text-[11px] whitespace-nowrap opacity-70">{entry.title}</span>
                      </span>
                    </button>
                  );
                })}
              </nav>

              <div className="relative min-h-[48rem] sm:min-h-[40rem] md:min-h-[32rem] perspective-[1200px]">
                <div className="absolute inset-5 -rotate-2 bg-[#e8d8b8] border-2 border-ink/10 shadow-sm rounded-[26px_16px_28px_20px]" />
                <div className="absolute inset-3 rotate-[1.4deg] bg-[#d9e1cf] border-2 border-ink/10 shadow-md rounded-[18px_28px_18px_24px]" />

                <AnimatePresence mode="wait">
                  <motion.article
                    key={activePath.year}
                    initial={{ opacity: 0, x: 110, y: 22, rotate: 3, scale: 0.94 }}
                    animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -90, y: -10, rotate: -2, scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 230, damping: 25 }}
                    className="field-journal absolute inset-0 z-20 bg-[#fffaf0] border-2 border-ink/10 shadow-2xl p-7 md:p-10 overflow-y-auto rounded-[24px_18px_28px_16px]"
                    style={{
                      backgroundImage: "linear-gradient(rgba(26,26,27,0.025) 1px, transparent 1px)",
                      backgroundSize: "100% 2rem",
                    }}
                  >
                    <div className="flex items-start justify-between gap-8 pb-7 border-b border-dashed border-ink/15">
                      <div>
                        <p className="text-[10px] font-mono tracking-[0.28em] text-turquoise mb-4">WAYPOINT LOG / {activePath.year}</p>
                        <h3 className="text-4xl md:text-5xl font-display text-cinnabar">{activePath.title}</h3>
                      </div>
                      <Seal text={activePath.year} className="shrink-0" />
                    </div>

                    <p className="mt-8 text-xl md:text-2xl font-serif leading-relaxed text-ink/85">
                      {activePath.desc}
                    </p>

                    <div className="mt-8 space-y-5 text-sm md:text-base font-serif leading-[1.9] text-ink/70">
                      {activePath.detail.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>

                    <div className="mt-10 pt-5 border-t border-dashed border-ink/10 flex justify-between text-[10px] font-mono tracking-widest opacity-35">
                      <span>FILE: {String(activePathIndex + 1).padStart(2, "0")}</span>
                      <span>MOOMOO / EXPLORER'S NOTE</span>
                    </div>
                  </motion.article>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="night-camp py-24 md:py-32 relative overflow-hidden text-[#fff4dc]">
        <div className="container mx-auto px-6 text-center relative z-10">
          <p className="font-mono text-[10px] tracking-[.3em] text-[#f0ad6b] mb-4">FINAL CAMP / LETTERS WELCOME</p>
          <h2 className="text-5xl md:text-6xl mb-12">有个好故事想聊聊？</h2>
          
          <div className="relative inline-block group">
            <div className="absolute inset-0 bg-[#f5a85f]/25 blur-3xl group-hover:bg-[#f5a85f]/35 transition-colors" />
            <div className="relative bg-[#fff6e5] text-ink border border-white/50 p-2 shadow-2xl rotate-[-1deg] rounded-[10px_14px_8px_12px]">
              <div className="border-2 border-dashed border-ink/10 p-8 md:p-12 bg-[linear-gradient(180deg,rgba(255,255,255,.35),transparent)]">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                  <div className="relative">
                    <Seal text="合作洽谈" className="scale-150" />
                    <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-cinnabar/30" />
                    <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-cinnabar/30" />
                  </div>
                  <div className="text-left space-y-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-mono tracking-widest opacity-45 uppercase">A LETTER BY THE CAMPFIRE · WECHAT</p>
                      <p className="text-2xl md:text-4xl font-sans font-medium text-ink selection:bg-cinnabar/30">RedScarf777</p>
                    </div>
                    <div className="flex items-center gap-4 pt-4 border-t border-ink/5">
                      <div className="w-2 h-2 rounded-full bg-[#ed8b4e] animate-pulse" />
                      <p className="text-xs font-serif italic opacity-60">“期待与您共同架构下一个动人的瞬间。”</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-24 pt-12 border-t border-dashed border-white/15 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-xs font-mono opacity-45">
              © 2026 MOOMOO NARRATIVE STUDIO. ALL RIGHTS RESERVED.
            </div>
            <div className="flex gap-8">
              <a href="#" className="text-xs font-mono opacity-45 hover:opacity-100 transition-opacity">WEIBO</a>
              <a href="#" className="text-xs font-mono opacity-45 hover:opacity-100 transition-opacity">XIAOHONGSHU</a>
              <a href="#" className="text-xs font-mono opacity-45 hover:opacity-100 transition-opacity">BEHANCE</a>
            </div>
          </div>
        </div>

        <div className="camp-mountains absolute inset-x-0 bottom-0 h-48 pointer-events-none opacity-70" />
        <div className="campfire absolute bottom-14 left-[12%] hidden md:block" aria-hidden="true"><span /><i /><b /></div>
      </footer>

    </div>
  );
}
