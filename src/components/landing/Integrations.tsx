import { integrations } from "../../utils/marketingContent";

/**
 * Slow horizontal logo carousel. The track is a duplicated logo set,
 * each clone identical, animated in CSS via `duri-logo-marquee` so the
 * loop seam is invisible. No status badges, no per-tile borders, just a
 * gentle parade.
 */
export default function Integrations() {
    const reel = [...integrations, ...integrations];
    return (
        <section
            id="integrations"
            className="w-full bg-background border-t border-divider min-w-xs overflow-hidden"
        >
            <div className="mx-auto max-w-[1280px] px-4 md:px-8 pt-20 md:pt-28 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-7">
                        <span className="duri-eyebrow">Integrations</span>
                        <h2 className="mt-5 duri-section-title">
                            Speaks the systems<br className="hidden md:inline" /> your team works in.
                        </h2>
                    </div>
                    <p className="lg:col-span-5 lg:col-start-8 duri-section-lede self-end">
                        Lives inside the suite of software your team already runs the business on. Accounting, inventory, inbox, the rest.
                    </p>
                </div>
            </div>

            {/* Logo marquee, edge-to-edge, with soft fades on both sides */}
            <div className="relative w-full pb-20 md:pb-28">
                <div
                    className="absolute inset-y-0 left-0 w-24 md:w-40 z-10 pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(to right, var(--background), color-mix(in oklch, var(--background) 0%, transparent))",
                    }}
                    aria-hidden
                />
                <div
                    className="absolute inset-y-0 right-0 w-24 md:w-40 z-10 pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(to left, var(--background), color-mix(in oklch, var(--background) 0%, transparent))",
                    }}
                    aria-hidden
                />

                <div className="overflow-hidden">
                    <div
                        className="flex items-center gap-12 md:gap-20 duri-logo-marquee"
                        aria-hidden
                    >
                        {reel.map((it, idx) => (
                            <img
                                key={`${it.name}-${idx}`}
                                src={it.logo}
                                alt=""
                                className="h-9 md:h-11 w-auto max-w-[160px] object-contain flex-none opacity-90"
                                loading="lazy"
                            />
                        ))}
                    </div>
                    <ul className="sr-only">
                        {integrations.map((it) => (
                            <li key={it.name}>{it.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
