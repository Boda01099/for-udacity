import { useRef, useLayoutEffect, useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import gsap from "gsap";

const Sections = [
    {
        name: 'Wasting Water in farming.',
        description: 'Wasting Water in Farming refers to inefficient or excessive use of water in agricultural practices. This often happens due to outdated irrigation methods, overwatering crops, poor soil management, or leaking systems. It leads to water loss through evaporation, runoff, and seepage, reducing water availability for other uses and contributing to environmental degradation, such as soil erosion and water pollution.',
        image:
            'https://www.loe.org/content/2015-04-24/DROUGHT--corn.jpg',
    },
    {
        name: 'Water waste from tape.',
        description: 'Water Waste from a Tap happens when water is left running unnecessarily—like during brushing teeth, washing dishes, or due to leaking or dripping taps. Even a slow drip can waste liters of water daily. This careless usage contributes to the global water crisis, strains water supply systems, and increases utility bills. Fixing leaks and turning off taps when not in use are simple but effective ways to conserve water.',
        image:
            'https://media.istockphoto.com/id/1182171051/photo/all-cleanliness-starts-with-water.jpg?s=612x612&w=0&k=20&c=aUVyJtGfTg7XH-AFwA4C_j5XUzopQes0ehcBflsTKuA=',
    },
    {
        name: 'Garbage thrown in water.',
        description: 'Garbage Thrown in Water refers to the act of disposing of waste—such as plastic, bottles, food wrappers, and other trash—into rivers, lakes, or oceans. This pollution harms aquatic life, disrupts ecosystems, contaminates drinking water sources, and contributes to the global water pollution crisis. It also affects human health and the beauty of natural water bodies. Proper waste disposal and recycling are essential to protect our water resources.',
        image:
            'https://i.postimg.cc/7ZSdhGsw/plastic-and-human-garbage-thrown-footage-197209533-iconl-1.jpg',
    },
];
type Section = {
  name: string;
  description: string;
  image: string;
};

export function Causes() {
  const [currentSection, setCurrentSection] = useState<Section>(Sections[0]);
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
              Causes
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
                  const idx = Sections.findIndex(
                    (s) => s.name === currentSection.name
                  );
                  setCurrentSection(
                    Sections[
                      (idx - 1 + Sections.length) % Sections.length
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
                  const idx = Sections.findIndex(
                    (s) => s.name === currentSection.name
                  );
                  setCurrentSection(
                    Sections[(idx + 1) % Sections.length]
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

export default Causes;
