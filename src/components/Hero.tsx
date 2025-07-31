import { useEffect, useRef, useState } from "react";
import Group from "../assets/Group 1.png";
import Group2 from "../assets/Group 2.png";
import { gsap } from "gsap";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";
import { AnimatedSubscribeButton } from "./magicui/animated-subscribe-button";
import { CheckIcon, ChevronRightIcon } from "lucide-react";

const translations: Record<string, string> = {
  heroTitle: "Save Water, Secure the Future",
  heroDescription:
    "Join us in fighting water waste and building a sustainable future for generations to come. \nEvery drop counts—let's save water together!",
  "download-presentation": "Download Presentation",
  "See Stats": "Learn More",
};

function t(key: string, options?: { defaultValue?: string }) {
  if (translations[key]) return translations[key];
  if (options && options.defaultValue) return options.defaultValue;
  return key;
}

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

const Hero = () => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const leftImageRef = useRef<HTMLImageElement | null>(null);
  const rightImageRef = useRef<HTMLImageElement | null>(null);
  const button1Ref = useRef<HTMLAnchorElement | null>(null);
  const button2Ref = useRef<HTMLAnchorElement | null>(null);
  const isMobile = useIsMobile();

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = '/water_usage.pptx';
    link.download = 'Water Usage Presentation.pptx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (contentRef.current && contentRef.current.children) {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
      );
    }
    if (leftImageRef.current) {
      gsap.fromTo(
        leftImageRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 1.2 }
      );
    }
    if (rightImageRef.current) {
      gsap.fromTo(
        rightImageRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 1.4 }
      );
    }
  }, []);

  const h1Class = isMobile
    ? "text-[36px] font-montserrat font-semibold pt-[40px] text-[#1459B8] leading-tight drop-shadow-xl mb-4"
    : "text-[150px] font-montserrat font-semibold sm:text-[150px] pt-[160px] md:text-[76.33px] text-[#1459B8] leading-tight drop-shadow-xl mb-4";
  const pClass = isMobile
    ? "text-[13px] font-poppins font-light text-[#363636] mb-6 max-w-2xl mx-auto leading-relaxed"
    : "text-base sm:text-lg md:text-[14px] font-poppins font-light text-[#363636] mb-10 max-w-2xl mx-auto leading-relaxed";
  const buttonTextClass = isMobile ? "text-[15px]" : "text-lg";

  if (isMobile) {
    return (
      <div className="relative flex flex-col items-center justify-center pt-[120px] pb-12">
        <div ref={contentRef} className="relative z-10 flex flex-col items-center w-full max-w-3xl px-4 text-center">
          <h1 className={h1Class}>{t("heroTitle")}</h1>
          <p className={pClass}>{t("heroDescription")}</p>
          <div className="flex flex-col gap-4 justify-center w-full">
            <AnimatedSubscribeButton onClick={handleDownload} className={`px-8 py-7 rounded-full text-white font-semibold ${buttonTextClass} w-full`}>
              <span className="group inline-flex items-center">
                {t("download-presentation")}
                <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="group inline-flex items-center">
                <CheckIcon className="mr-2 size-4" />
                Downloaded
              </span>
            </AnimatedSubscribeButton>
            <a href="https://drive.google.com/drive/u/2/folders/1FnDbsW8lRCFJnvLX7r4YgGbXRTQVA9IK" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full bg-[#00A591] text-white font-semibold w-full text-center block">
              {t("See Stats")}
            </a>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-6 mt-[-12px] mb-4 w-full">
          <img ref={leftImageRef} src={Group} alt="Water Usage Hero Left" className="w-[30vw] max-w-[120px] h-auto object-contain" />
          <img ref={rightImageRef} src={Group2} alt="Water Usage Hero Right" className="w-[30vw] max-w-[120px] h-auto object-contain" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center pt-12 pb-12">
      <div ref={contentRef} className="relative z-10 flex flex-col items-center w-full max-w-3xl px-4 text-center mt-[-64px]">
        <h1 className={h1Class}>{t("heroTitle")}</h1>
        <p className={pClass}>{t("heroDescription")}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a ref={button2Ref}>
            <AnimatedSubscribeButton onClick={handleDownload} className={`px-8 py-7 rounded-full text-white font-semibold ${buttonTextClass}`}>
              <span className="group inline-flex items-center">
                {t("download-presentation")}
                <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="group inline-flex items-center">
                <CheckIcon className="mr-2 size-4" />
                Downloaded
              </span>
            </AnimatedSubscribeButton>
          </a>
          <a
            ref={button1Ref}
            href="#stats"
            className="relative group rounded-full"
            onClick={e => {
              e.preventDefault();
              const button = e.currentTarget as HTMLElement;
              const circle = document.createElement("span");
              const diameter = Math.max(button.clientWidth, button.clientHeight);
              const radius = diameter / 2;
              circle.style.width = circle.style.height = `${diameter}px`;
              const rect = button.getBoundingClientRect();
              const x = (e.nativeEvent as MouseEvent).clientX - rect.left;
              const y = (e.nativeEvent as MouseEvent).clientY - rect.top;
              circle.style.left = `${x - radius}px`;
              circle.style.top = `${y - radius}px`;
              circle.classList.add("ripple-effect");
              const oldRipple = button.querySelector(".ripple-effect");
              if (oldRipple) oldRipple.remove();
              button.appendChild(circle);
              setTimeout(() => circle.remove(), 600);
              const statsSection = document.getElementById('stats');
              if (statsSection) {
                statsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            style={{ overflow: "hidden", borderRadius: "9999px" }}
          >
            <InteractiveHoverButton
              onClick={() => window.open("https://drive.google.com/drive/u/2/folders/1FnDbsW8lRCFJnvLX7r4YgGbXRTQVA9IK", "_blank", "noopener,noreferrer")}
              className={`scroll-smooth px-8 py-4 rounded-full bg-[#00A591] backdrop-blur-[40px] text-white font-semibold ${buttonTextClass} shadow-lg border-0 hover:from-[#1459B8] hover:to-[#39C0DB] transition-all duration-300`}
            >
              <span className="flex items-center gap-2">{t("See Stats")}</span>
            </InteractiveHoverButton>
            <style>{`
              .ripple-effect {
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                animation: ripple-animate 0.6s linear;
                background: rgba(255,255,255,0.4);
                pointer-events: none;
                z-index: 20;
              }
              @keyframes ripple-animate {
                to {
                  transform: scale(2.5);
                  opacity: 0;
                }
              }
            `}</style>
          </a>
        </div>
      </div>
      <div className="relative w-full max-w-[1900px] mx-auto flex items-center justify-between px-6 md:px-12 mt-[-19px]">
        <img ref={leftImageRef} src={Group} alt="Water Usage Hero Left" className="w-[28%] max-w-[900px] h-auto object-contain hidden md:block" />
        <img ref={rightImageRef} src={Group2} alt="Water Usage Hero Right" className="w-[28%] max-w-[900px] h-auto object-contain hidden md:block" />
      </div>
    </div>
  );
};

export default Hero;
