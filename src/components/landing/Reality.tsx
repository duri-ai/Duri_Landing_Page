import { realityPoints } from "../../utils/marketingContent";

const base = import.meta.env.BASE_URL;

const IMAGES = [
    {
        src: `${base}misc_images/reality_paperwork.png`,
        alt: "An overwhelmed person buried under a leaning tower of office paperwork",
    },
    {
        src: `${base}misc_images/reality_tangled.png`,
        alt: "A chaotic tangled knot of cables and yarn",
    },
    {
        src: `${base}misc_images/reality_money.png`,
        alt: "A stack of cash beside a calendar with pages flying off and a clock",
    },
];

export default function Reality() {
    return (
        <section className="w-full bg-background-warm border-t border-divider min-w-xs">
            <div className="mx-auto max-w-[1280px] px-4 md:px-8 py-20 md:py-28">
                <div className="max-w-3xl">
                    <span className="duri-eyebrow">The reality today</span>
                    <h2 className="mt-5 duri-section-title">
                        Today, you've got<br className="hidden md:inline" /> these options.
                    </h2>
                    <p className="mt-6 text-[16px] md:text-[18px] text-on-background-secondary max-w-xl">
                        When the data is scattered and the work is by hand, this is the menu the market has handed you. None of it scales with your business.
                    </p>
                </div>

                <ol className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 border-t border-l border-divider-strong">
                    {realityPoints.map((p, i) => (
                        <li
                            key={p.index}
                            className="border-r border-b border-divider-strong p-7 md:p-8 bg-background flex flex-col"
                        >
                            <span className="font-mono text-[12px] tracking-wider text-brand">
                                {p.index}
                            </span>
                            <div className="mt-5 mb-6 aspect-square w-full max-w-[260px] mx-auto bg-background-warm/50 border border-divider overflow-hidden">
                                <img
                                    src={IMAGES[i].src}
                                    alt={IMAGES[i].alt}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    width={1024}
                                    height={1024}
                                />
                            </div>
                            <h3 className="text-[20px] md:text-[24px] tracking-[-0.012em] leading-tight text-on-background">
                                {p.label}
                            </h3>
                            <p className="mt-3 text-[14.5px] md:text-[15px] leading-relaxed text-on-background-secondary">
                                {p.line}
                            </p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
