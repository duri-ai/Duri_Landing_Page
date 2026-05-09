import { ArrowRightIcon } from "lucide-react";
import HeroProductWindow from "./HeroProductWindow";
import LanguageRoulette from "./LanguageRoulette";

type HeroProps = {
    onDemoClick: () => void;
};

export default function Hero({ onDemoClick }: HeroProps) {
    return (
        <section className="relative w-full min-w-xs overflow-hidden">
            <div className="absolute inset-0 duri-grid-bg opacity-[0.55] pointer-events-none" aria-hidden />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background-warm pointer-events-none" aria-hidden />

            <div className="relative mx-auto max-w-[1280px] px-4 md:px-8 pt-12 pb-20 md:pt-20 md:pb-28">
                <div className="flex items-center gap-3">
                    <span className="duri-eyebrow">The AI workspace for back-office automation</span>
                    <span className="hidden sm:block h-px flex-1 max-w-[160px] bg-divider-strong" aria-hidden />
                </div>

                <h1 className="duri-monument mt-7 md:mt-9">
                    <span className="block">Run your back office</span>
                    <span className="block">
                        in plain <LanguageRoulette />
                    </span>
                </h1>

                <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                    <div className="lg:col-span-5 lg:pt-2">
                        <p className="duri-section-lede">
                            A workspace where the business itself becomes one thing you can ask, run, and schedule. Connected to your tools, aware of every record, working on its own.
                        </p>

                        <div className="mt-9">
                            <button
                                type="button"
                                onClick={onDemoClick}
                                className="group inline-flex items-center justify-center gap-2 whitespace-nowrap text-on-brand bg-brand hover:bg-brand-variant border border-brand hover:border-brand-variant rounded-xs text-base px-6 py-3.5 transition-colors duration-200 cursor-pointer"
                            >
                                Request a demo
                                <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <HeroProductWindow />
                    </div>
                </div>
            </div>
        </section>
    );
}
