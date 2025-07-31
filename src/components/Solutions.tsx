import { useRef, useLayoutEffect, useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import gsap from "gsap";

const SolutionsSections = [
  {
    name: "Fix Leaks Promptly",
    description:
      "A single dripping faucet can waste hundreds of liters of water each month. Regularly check your pipes, taps, and toilets for leaks and repair them as soon as possible to prevent unnecessary water loss.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Install Water-Saving Devices",
    description:
      "Use low-flow showerheads, dual-flush toilets, and aerators on taps to significantly reduce water usage without sacrificing performance or comfort.",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Smart Irrigation",
    description:
      "Water your garden early in the morning or late in the evening to minimize evaporation. Consider using drip irrigation systems and native plants that require less water.",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Proper Waste Disposal",
    description:
      "Avoid throwing garbage into water bodies. Use trash bins, support recycling, and participate in community cleanups to keep our rivers, lakes, and oceans clean and healthy.",
    image:
      "https://i.postimg.cc/VND70jjQ/Vikki-Gerrard-La-Crosse-Wisconsin-2-1024x683-png-1.jpg",
  },
  {
    name: "Educate and Raise Awareness",
    description:
      "Teach others about the importance of water conservation and pollution prevention. Schools, communities, and social media can play a vital role in spreading the message and encouraging action.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
  },
];

type Section = {
  name: string;
  description: string;
  image: string;
};

export function Solutions() {
  const [currentSection, setCurrentSection] = useState<Section>(SolutionsSections[0]);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.6 } });

    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1 }
    );

    tl.fromTo(
      imageRef.current,
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1 },
      "-=0.4"
    );
  }, [currentSection]);

  useEffect(() => {
    if (!descriptionRef.current) return;

    const words = currentSection.description.split(" ");
    descriptionRef.current.innerHTML = "";

    let currentWord = 0;

    const interval = setInterval(() => {
      if (currentWord < words.length) {
        descriptionRef.current!.innerHTML +=
          (currentWord > 0 ? " " : "") + words[currentWord];
        currentWord++;
      } else {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [currentSection]);

  return (
    <div
      className="w-full flex flex-col items-center justify-center p-2"
      style={{ zIndex: 10 }}
      id="solutions"
    >
      <div className="relative w-full flex items-center justify-center">
        <div
          className="w-[95vw] max-w-[1016px] bg-white/10 backdrop-blur-[30px] rounded-3xl shadow-2xl border border-[#00A591]/20 flex flex-row justify-between overflow-hidden"
          style={{
            marginTop: "140px", // نزّل الكارد شوية
            marginBottom: "16px",
            minHeight: "480px",
          }}
        >
          {/* Text Section */}
          <div className="flex-1 flex flex-col w-[48%] pl-6 pr-4 py-4 z-10 bg-white/0">
            <h1 className="text-[#1459B8] text-[36px] font-bold font-montserrat leading-tight">
              Solutions
            </h1>
            <div className="w-full h-[1px] bg-gray-300 rounded-full mt-2 mb-3"></div>

            <div
              ref={contentRef}
              key={currentSection.name + "-text"}
              className="mt-2"
            >
              <h2
                className="text-2xl font-bold text-primary tracking-tight mb-3"
                style={{ fontFamily: "Raleway, sans-serif" }}
              >
                {currentSection.name}
              </h2>

              <p
                ref={descriptionRef}
                className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed mb-6"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              ></p>
            </div>

            <div className="mt-auto pt-2">
              <button
                className="w-10 h-10 flex items-center justify-center text-primary hover:text-primary/80 transition-all rounded-full bg-white/60 backdrop-blur"
                onClick={() => {
                  const idx = SolutionsSections.findIndex(
                    (s) => s.name === currentSection.name
                  );
                  setCurrentSection(
                    SolutionsSections[
                      (idx - 1 + SolutionsSections.length) % SolutionsSections.length
                    ]
                  );
                }}
                aria-label="Previous Solution"
              >
                <FaPlay className="h-4 w-4 rotate-180" />
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-1 w-[52%] relative">
            <img
              ref={imageRef}
              key={currentSection.name + "-image"}
              src={currentSection.image}
              alt={currentSection.name}
              className="w-full h-full object-cover"
              style={{
                objectPosition: "center",
                borderTopRightRadius: "24px",
                borderBottomRightRadius: "24px",
              }}
            />

            {/* زر التالي */}
            <div className="absolute bottom-6 -left-14 z-20">
              <button
                className="w-10 h-10 flex items-center justify-center text-primary hover:text-primary/80 transition-all rounded-full bg-white/60 backdrop-blur"
                onClick={() => {
                  const idx = SolutionsSections.findIndex(
                    (s) => s.name === currentSection.name
                  );
                  setCurrentSection(
                    SolutionsSections[(idx + 1) % SolutionsSections.length]
                  );
                }}
                aria-label="Next Solution"
              >
                <FaPlay className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Solutions;
