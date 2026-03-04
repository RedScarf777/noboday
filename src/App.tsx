/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Play, 
  BookOpen, 
  Film, 
  Radio, 
  Compass, 
  ArrowUpRight, 
  MessageSquare, 
  X, 
  Send,
  Loader2
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- Components ---

const Seal = ({ text, className = "" }: { text: string; className?: string }) => (
  <div className={`relative inline-flex items-center justify-center p-2 border-2 border-cinnabar/80 text-cinnabar font-display text-sm leading-none select-none ${className}`}>
    <div className="absolute inset-0 bg-cinnabar/5 -z-10" />
    <span className="writing-vertical tracking-widest">{text}</span>
    <div className="absolute -top-1 -left-1 w-2 h-2 bg-cinnabar/20 rounded-full blur-[1px]" />
    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-cinnabar/20 rounded-full blur-[1px]" />
  </div>
);

const StoryboardCard = ({ 
  number, 
  title, 
  desc, 
  link = "#" 
}: { 
  number: string; 
  title: string; 
  desc: string; 
  link?: string 
}) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="group relative bg-white border border-gray-200 p-4 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-cinnabar/30 text-gray-700"
    style={{
      clipPath: "polygon(0% 0%, 100% 0%, 98% 100%, 2% 98%)",
    }}
  >
    <div className="absolute top-2 left-2 text-[10px] font-mono opacity-40">SCENE: {number}</div>
    <div className="absolute top-2 right-2 text-[10px] font-mono opacity-40">DUR: 02:30</div>
    
    <div className="mt-6 mb-4 aspect-video bg-xuan relative overflow-hidden border border-ink/5">
      <img 
        src={title.includes("海底小纵队") ? "/伴读马老师.png" : title.includes("文史教育") ? "/作品图片.jpg" : title.includes("白日梦梦") ? "/白日梦梦.jpg" : title.includes("山猫神捕") ? "/山猫神捕.png" : title.includes("科普") || title.includes("非遗") || title.includes("展") ? "/展览.jpg" : title.includes("狐桃桃") ? "/胡桃桃.jpg" : `https://picsum.photos/seed/${title}/800/450?grayscale`}
        alt={title}
        className={title.includes("海底小纵队") || title.includes("文史教育") || title.includes("白日梦梦") || title.includes("山猫神捕") || title.includes("科普") || title.includes("非遗") || title.includes("展") || title.includes("狐桃桃") ? "w-full h-full object-contain bg-xuan" : "w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"}
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-mineral-blue/0 group-hover:bg-mineral-blue/10 transition-colors duration-500" />
      {title.includes("海底小纵队") || title.includes("文史教育") || title.includes("白日梦梦") || title.includes("山猫神捕") || title.includes("科普") || title.includes("非遗") || title.includes("展") || title.includes("狐桃桃") ? null : (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <img src="/作品图片.jpg" alt="作品" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
    
    <a href={link} target="_blank" rel="noopener noreferrer" className="block">
      <h3 className="text-lg font-display mb-1 group-hover:text-mineral-blue transition-colors">{title}</h3>
    </a>
    <p className="text-xs font-serif italic opacity-60">{desc}</p>
    
    <div className="mt-4 pt-2 border-t border-dashed border-ink/10 flex justify-between items-center">
      <span className="text-[10px] font-mono opacity-30">CAM: WIDE / STATIC</span>
      <span className="text-[10px] font-mono opacity-30">#MOOMOO_SCRIPTS</span>
    </div>
  </motion.div>
);

const FilmStripItem = ({ 
  year, 
  title, 
  desc,
  detail
}: { 
  year: string; 
  title: string; 
  desc: string;
  detail?: string
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative pl-12 pb-12 last:pb-0 group">
      <div className="absolute left-0 top-0 w-8 h-full flex flex-col items-center">
        <div className="w-6 h-8 border-x-2 border-ink/20 flex flex-col justify-between py-1">
          <div className="w-full h-1 bg-ink/20" />
          <div className="w-full h-1 bg-ink/20" />
        </div>
        <div className="flex-grow w-0.5 bg-dashed border-l-2 border-dashed border-ink/10 my-2" />
      </div>
      
      <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 bg-cinnabar text-white text-[10px] font-mono font-bold rounded-sm shadow-lg z-10">
        {year.split('.')[0]}
      </div>

      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="bg-white/50 backdrop-blur-sm p-6 border border-ink/5 relative cursor-pointer"
        onClick={() => detail && setIsOpen(!isOpen)}
      >
        <div className="absolute -left-2 top-4 w-4 h-4 bg-white border border-ink/5 rotate-45" />
        <h4 className="text-xl font-display text-cinnabar mb-2">{title}</h4>
        <p className="text-sm font-serif leading-relaxed opacity-80">{desc}</p>
        {detail && isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 pt-4 border-t border-ink/10 text-sm font-serif leading-relaxed opacity-80"
          >
            {detail}
          </motion.div>
        )}
        {detail && (
          <div className="mt-2 text-xs text-cinnabar/60">
            {isOpen ? '点击收起' : '点击展开更多'}
          </div>
        )}
      </motion.div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const moonScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.5]);
  const moonOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const model = "gemini-3-flash-preview";
      const response = await ai.models.generateContent({
        model,
        contents: userMsg,
        config: {
          systemInstruction: "你现在是独立编剧'哞哞'的AI助手。你的语气应该像一位温文尔雅、充满故事感的编剧，偶尔带点导演视角的批注。如果用户想合作，请引导他们联系微信：RedScarf777。保持东方美学和文学气息。",
        }
      });
      
      setMessages(prev => [...prev, { role: 'model', text: response.text || "故事暂时断了线..." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "笔墨干涸了，请稍后再试。" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden paper-texture">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-cinnabar origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <motion.div 
          style={{ scale: moonScale, opacity: moonOpacity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vh] h-[80vh] rounded-full bg-cinnabar/10 blur-3xl -z-10" 
        />
        <motion.div 
          style={{ scale: moonScale }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] rounded-full border-[1px] border-cinnabar/20 -z-10"
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="relative mb-8"
            >
              <h1 className="text-7xl md:text-9xl font-display tracking-tighter text-ink leading-none">
                叙事没有边界<span className="text-cinnabar">。</span>
              </h1>
              <div className="absolute -bottom-4 left-0 w-full h-4 bg-ink/5 -skew-x-12 -z-10 opacity-50" />
            </motion.div>

            {/* Silhouette Element */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 0.1, x: 0 }}
              transition={{ delay: 1, duration: 2 }}
              className="absolute bottom-0 left-0 w-full h-64 pointer-events-none -z-10 overflow-hidden"
            >
              <svg viewBox="0 0 1000 300" className="w-full h-full preserve-3d">
                <path 
                  d="M0,300 L0,250 Q150,200 300,250 T600,230 T1000,260 L1000,300 Z" 
                  fill="currentColor" 
                  className="text-ink"
                />
                <motion.path
                  animate={{ x: [0, 20, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  d="M100,250 L120,200 L140,250 Z"
                  fill="currentColor"
                  className="text-ink opacity-50"
                />
                <motion.circle
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  cx="800" cy="150" r="40"
                  fill="currentColor"
                  className="text-cinnabar opacity-20"
                />
              </svg>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="max-w-2xl"
            >
              <p className="text-lg md:text-xl font-serif text-ink/80 leading-relaxed mb-12">
                你好，我是<span className="text-ink font-display text-2xl mx-1">哞哞</span>。<br />
                目前以独立编剧身份探索世界。<br />
                从银幕到短视频，从舞台到展厅。<br />
                我是故事的架构师，也是现实的观察者。
              </p>

              <div className="flex flex-wrap justify-center gap-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsChatOpen(true)}
                  className="px-8 py-3 bg-cinnabar text-white font-display text-lg relative group overflow-hidden"
                >
                  <span className="relative z-10">入戏（开启对话）</span>
                  <div className="absolute inset-0 bg-ink opacity-0 group-hover:opacity-10 transition-opacity" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white/20 rotate-45" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-3 border-2 border-ink text-ink font-display text-lg relative group"
                >
                  <span className="relative z-10">读档（作品存档）</span>
                  <div className="absolute inset-0 bg-ink opacity-0 group-hover:opacity-5 transition-opacity" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Perforations */}
        <div className="absolute left-4 top-0 bottom-0 w-4 flex flex-col justify-around opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="w-3 h-4 border border-ink rounded-sm" />
          ))}
        </div>
        <div className="absolute right-4 top-0 bottom-0 w-4 flex flex-col justify-around opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="w-3 h-4 border border-ink rounded-sm" />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 relative overflow-hidden bg-white/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -left-8 top-0 text-cinnabar/10 text-[200px] font-display select-none leading-none">哞</div>
              <div className="space-y-8 text-lg font-serif leading-relaxed text-ink/90 relative z-10">
                <p className="text-3xl md:text-4xl font-display text-ink leading-tight border-l-4 border-cinnabar pl-6 py-2">
                  我是一个全方面的多面手<br />更是一个纯粹的叙事者
                </p>
                <div className="space-y-4 opacity-80">
                  <p>
                    这几年折腾的东西比较杂：拍过创投里的独立短片，做过热门 IP 的动画剧集；
                    在喜马拉雅写过儿童故事，也主笔过播放千万的视频文案。
                    偶尔也会跑跑线下，为不说话的非遗做好表达。
                  </p>
                  <p>
                    工作之外，我花了很多时间在‘听’和‘记’上。
                    在田野里，我跟许多真实的个体深度交流，倾听生命的过往和闪耀。
                  </p>
                </div>
                <p className="italic font-handwriting text-3xl text-cinnabar/80 pt-4">
                  “比起那些宏大叙事，我更着迷于这种有触感的细节。”
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-6">
              {[
                { icon: <Film />, title: "影视/动画", desc: "头部 IP 深度参与者", color: "cinnabar", detail: "院线电影 & 头部动画 ：深度参与《海底小纵队》 、 《狐桃桃》等知名 IP 全流程创作。\n\n市场实绩 ：参与作品院线票房累计 3300 万 ；喜马拉雅爆款有声剧播放量 170W+ ，评分 9.6 。\n\n官方认可 ：原创作品《白日梦梦》获 CCTV-6  首届短片创投奖（全国仅 4 部），获 10 万资金扶持。" },
                { icon: <Radio />, title: "新媒体内容", desc: "高净值文史脚本、千万级账号", color: "mineral-blue", detail: "垂直赛道深耕：操盘百万级文史教育账号，擅长将硬核、碎片化的知识点转化为具有逻辑美感的叙事文本。\n\n数据验证：产出多条百万级播放量及万级点赞的原创视频，在确保内容深度与调性的前提下，实现稳定的完播指标。\n\n从叙事到产品：不仅限于流量生产，更具备将文学大纲转化为视频/音频课程的闭环开发能力，实现内容的商业价值延伸。" },
                { icon: <Compass />, title: "空间/策展", desc: "为风景和文物代言", color: "turquoise", detail: "国家级/省级项目：深度参与中国非遗馆、省科学技术馆等大型主题展馆的展陈策划，协助核心叙事逻辑构建与内容落地。\n\n跨界叙事赋能：将影视化的镜头感与节奏控制引入实体空间，主导主题展陈的文本开发，使静态展陈具备动态的情绪曲线。\n\n沉浸式 IP 设计：专注于文旅场景下的原创角色与世界观设计，通过 IP 化的叙事手段增强空间互动性，提升展项的可传播性与代入感。" },
              ].map((item, idx) => {
                const [isOpen, setIsOpen] = useState(false);
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                    className="group bg-xuan p-8 border border-ink/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer"
                    style={{ borderLeft: `4px solid var(--color-${item.color})` }}
                    onClick={() => item.detail && setIsOpen(!isOpen)}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-white shadow-inner text-${item.color}`}>
                      {item.icon}
                    </div>
                    <h4 className="text-xl font-display mb-2">{item.title}</h4>
                    <p className="text-sm font-serif opacity-60">{item.desc}</p>
                    {item.detail && isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 pt-4 border-t border-ink/10 text-sm font-serif leading-relaxed opacity-80 whitespace-pre-line"
                      >
                        {item.detail}
                      </motion.div>
                    )}
                    {item.detail && (
                      <div className="mt-2 text-xs text-cinnabar/60">
                        {isOpen ? '点击收起' : '点击展开更多'}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section id="works" className="py-24 bg-gray-100 text-gray-800 relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-20" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-5xl md:text-6xl mb-4">作品策展<span className="text-cinnabar">/</span></h2>
              <p className="font-serif opacity-60 italic">Interactive Storyboard Wall</p>
            </div>
            <div className="hidden md:block text-right">
              <span className="text-xs font-mono opacity-40">TOTAL PROJECTS: 05</span><br />
              <span className="text-xs font-mono opacity-40">LAST UPDATED: 2026.03</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <StoryboardCard 
              number="01" 
              title="院线电影《海底小纵队 3》" 
              desc="3300 万票房。编剧团队成员。"
              link="https://v.qq.com/x/cover/mzc00200y7w8giw/z4101m09fqj.html" 
            />
            <StoryboardCard 
              number="02" 
              title="央视优创计划《白日梦梦》" 
              desc="导演/编剧。探索梦境与现实的边界。"
              link="https://www.xinpianchang.com/a11616353?searchKw=%E7%99%BD%E6%97%A5%E6%A2%A6%E6%A2%A6&from=search_post" 
            />
            <StoryboardCard 
              number="03" 
              title="国风动画《狐桃桃与老神仙》系列" 
              desc="编剧，央视上线项目"
              link="https://v.qq.com/x/cover/mzc00200tt3iwq7.html"
            />
            <StoryboardCard 
              number="04" 
              title="喜马拉雅《山猫神捕》" 
              desc="评分9.6分，170万播放"
              link="https://www.ximalaya.com/album/77642883" 
            />
            <StoryboardCard 
              number="05" 
              title="省级科普/非遗展" 
              desc="内容策划。让传统文化在现代空间呼吸。"
              link="https://mp.weixin.qq.com/s/ZUYAoHh1fPoW93qwn6oo_A" 
            />
            <StoryboardCard 
              number="06" 
              title="文史教育现象级账号" 
              desc="主笔。千万级播放，重塑历史叙事。"
              link="https://v.douyin.com/18Yz33k7DWA" 
            />
          </div>
        </div>
      </section>

      {/* Path Section */}
      <section className="py-24 bg-xuan">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl mb-4">成长路径<span className="text-gold">.</span></h2>
              <p className="font-serif opacity-60">Chronology of a Storyteller</p>
            </div>

            <div className="relative">
              <FilmStripItem 
                year="2020" 
                title="确立方向" 
                desc="原创作品获官方支持，正式踏入编剧行业。"
                detail={<>该项目为电影频道（CCTV6）发起的面向新人的短片创投活动。<br /><br />首届仅有四部短片获得创投资金，《白日梦梦》成功斩获组委会 10 万元资金扶持。<br /><br />本人担任导演及编剧，负责原剧本改编、现场拍摄及制作统筹工作。</>}
              />
              <FilmStripItem 
                year="2022" 
                title="项目进阶" 
                desc="深入工业化制作全流程，从剧本到成片的跨维度协作。"
                detail={<>我具备从院线电影、头部动画到文旅策展的全维度创作与开发能力。在长视频领域，曾深度参与《海底小纵队》、《狐桃桃》等知名 IP 的全流程创作，作品涵盖院线电影（票房 3300 万）、腾讯/优酷上线剧集及喜马拉雅 9.6 分爆款有声剧（播放量 170W+）。<br /><br />除了成熟 IP 的内容再创作，我擅长文学 IP 的影视化评估与评估报告产出，能精准把控叙事节奏与市场潜力，并拥有丰富的跟组经验。同时，我能将叙事能力跨界应用于文旅与科普领域，负责过中国非遗馆、省科学技术馆等多个国家级/省级展馆的剧本策划与内容落地。</>}
              />
              <FilmStripItem 
                year="2025" 
                title="内容主笔" 
                desc="在千万级账号中打磨叙事逻辑，掌握流量背后的情绪密码。"
                detail={<>在短视频与知识付费领域，我曾深度操盘百万级文史教育账号，担任幕后主笔。我擅长将硬核文史知识进行"故事化重构"，曾产出多条千万播放、10万+点赞的现象级爆款，对"黄金 3 秒"的抓取和完播留存有着精准的控制力。<br /><br />我不只负责前端引流，更具备将碎片化内容"产品化"的能力。通过设计深度文学大纲，我配合团队完成了从短视频引流到视频/音频课程开发的全链路闭环。同时，我习惯基于抖音、小红书的算法反馈持续迭代叙事钩子，确保产出的内容既有深度，又能兼顾高互动与高转化。</>}
              />
              <FilmStripItem 
                year="2026.03" 
                title="独立编剧" 
                desc="专注个人 IP 与内容开发，探索叙事的无限可能。" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-ink/5 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl mb-12">有个好故事想聊聊？</h2>
          
          <div className="relative inline-block group">
            <div className="absolute inset-0 bg-cinnabar/5 blur-3xl group-hover:bg-cinnabar/10 transition-colors" />
            <div className="relative bg-white border border-ink/10 p-1 shadow-inner">
              <div className="border border-ink/5 p-8 md:p-12 bg-xuan/50 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                  <div className="relative">
                    <Seal text="合作洽谈" className="scale-150" />
                    <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-cinnabar/30" />
                    <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-cinnabar/30" />
                  </div>
                  <div className="text-left space-y-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-mono tracking-widest opacity-40 uppercase">WeChat ID</p>
                      <p className="text-2xl md:text-4xl font-sans font-medium text-ink selection:bg-cinnabar/30">RedScarf777</p>
                    </div>
                    <div className="flex items-center gap-4 pt-4 border-t border-ink/5">
                      <div className="w-2 h-2 rounded-full bg-cinnabar animate-pulse" />
                      <p className="text-xs font-serif italic opacity-60">“期待与您共同架构下一个动人的瞬间。”</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-24 pt-12 border-t border-dashed border-ink/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-xs font-mono opacity-40">
              © 2026 MOOMOO NARRATIVE STUDIO. ALL RIGHTS RESERVED.
            </div>
            <div className="flex gap-8">
              <a href="#" className="text-xs font-mono opacity-40 hover:opacity-100 transition-opacity">WEIBO</a>
              <a href="#" className="text-xs font-mono opacity-40 hover:opacity-100 transition-opacity">XIAOHONGSHU</a>
              <a href="#" className="text-xs font-mono opacity-40 hover:opacity-100 transition-opacity">BEHANCE</a>
            </div>
          </div>
        </div>

        {/* Bottom Ink Wash Decoration */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-ink/5 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-1/2 h-64 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-cinnabar/5 via-transparent to-transparent pointer-events-none" />
      </footer>

      {/* Chat Dialog */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-ink/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-2xl h-[80vh] bg-xuan border border-ink/10 shadow-2xl flex flex-col relative overflow-hidden"
            >
              {/* Chat Header */}
              <div className="p-6 border-b border-ink/5 flex justify-between items-center bg-white/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-cinnabar rounded-full flex items-center justify-center text-white">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl">入戏对话</h3>
                    <p className="text-[10px] font-mono opacity-50">SESSION_ID: {Math.random().toString(36).substring(7).toUpperCase()}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="p-2 hover:bg-ink/5 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]">
                {messages.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                    <BookOpen className="w-12 h-12 mb-4" />
                    <p className="font-serif italic">“故事的开头，总是由一个问题引起的。”</p>
                  </div>
                )}
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-4 rounded-sm shadow-sm font-serif text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-cinnabar text-white' 
                        : 'bg-white border border-ink/5 text-ink'
                    }`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-ink/5 p-4 rounded-sm shadow-sm">
                      <Loader2 className="w-5 h-5 animate-spin text-cinnabar" />
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleChat} className="p-6 border-t border-ink/5 bg-white/50">
                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="在这里写下你的故事或问题..."
                    className="w-full bg-xuan border border-ink/10 px-6 py-4 pr-16 font-serif text-sm focus:outline-none focus:border-cinnabar transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={isTyping || !input.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-cinnabar hover:bg-cinnabar/5 rounded-full transition-colors disabled:opacity-30"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <p className="mt-4 text-[10px] font-mono opacity-30 text-center">
                  POWERED BY GEMINI AI / MOOMOO NARRATIVE ENGINE
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
