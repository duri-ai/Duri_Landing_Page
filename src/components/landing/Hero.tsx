import { ArrowRightIcon } from "lucide-react";
import HeroProductWindow from "./HeroProductWindow";

type HeroProps = {
    onDemoClick: () => void;
};

export default function Hero({ onDemoClick }: HeroProps) {
    return (
        <section className="relative w-full min-w-xs overflow-hidden">
            <div className="absolute inset-0 duri-grid-bg opacity-[0.55] pointer-events-none" aria-hidden />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background-warm pointer-events-none" aria-hidden />

            <div className="relative mx-auto max-w-[1280px] px-4 md:px-8 pt-16 md:pt-24 pb-20 md:pb-28">
                <h1 className="duri-monument max-w-[1100px]">
                    <span className="block">AI automates</span>
                    <span className="block">your business operations,</span>
                    <span className="block">in plain language.</span>
                </h1>

                <div className="mt-10 md:mt-12">
                    <button
                        type="button"
                        onClick={onDemoClick}
                        className="group inline-flex items-center justify-center gap-2 whitespace-nowrap text-on-brand bg-brand hover:bg-brand-variant border border-brand hover:border-brand-variant rounded-xs text-base px-6 py-3.5 transition-colors duration-200 cursor-pointer"
                    >
                        Request a demo
                        <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                </div>

                {/* Product window sits below, asymmetric to the right so the
                    monument keeps the page anchored at the top-left. */}
                <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-9 lg:col-start-4">
                        <HeroProductWindow />
                    </div>
                </div>
            </div>
        </section>
    );
}
