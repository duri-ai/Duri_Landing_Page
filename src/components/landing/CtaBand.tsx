import { useState } from "react";
import { ArrowRightIcon, AppleIcon, CheckIcon, MonitorIcon } from "lucide-react";

type CtaBandProps = {
    refCallback: (el: HTMLElement | null) => void;
};

const MAC_DOWNLOAD =
    "https://duristorage.blob.core.windows.net/releases/desktop/latest/Duri-latest-mac.dmg";
const WIN_DOWNLOAD =
    "https://duristorage.blob.core.windows.net/releases/desktop/latest/Duri-latest-win.exe";

export default function CtaBand({ refCallback }: CtaBandProps) {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email) return;
        setSubmitted(true);
    };

    return (
        <section
            id="download"
            ref={refCallback}
            className="relative w-full bg-brand text-on-brand min-w-xs overflow-hidden"
        >
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
                    backgroundSize: "88px 88px",
                }}
                aria-hidden
            />

            <div className="relative mx-auto max-w-[1280px] px-4 md:px-8 py-20 md:py-28">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    <div className="lg:col-span-6">
                        <span
                            className="duri-eyebrow"
                            style={{ color: "rgba(255,255,255,0.7)" }}
                        >
                            Book a 20-minute demo
                        </span>
                        <h2 className="mt-5 duri-section-title" style={{ color: "var(--on-brand)" }}>
                            See AI run<br />your operations.
                        </h2>
                        <p className="mt-6 max-w-xl text-[16px] leading-snug text-on-brand-secondary">
                            We'll walk through one of your real workflows live, on your screen. Same business day.
                        </p>
                    </div>

                    <div className="lg:col-span-6 flex flex-col gap-5">
                        <div className="bg-background text-on-background border border-on-background rounded-xs">
                            <div className="px-5 pt-5 pb-3 border-b border-divider">
                                <div className="text-[11px] uppercase tracking-wider text-on-background-secondary">
                                    {submitted ? "Request received" : "Request a demo"}
                                </div>
                            </div>

                            {submitted ? (
                                <div className="p-5 sm:p-6 flex items-start gap-3">
                                    <span className="flex-none w-6 h-6 bg-brand text-on-brand inline-flex items-center justify-center rounded-xs">
                                        <CheckIcon className="w-3.5 h-3.5" strokeWidth={3} />
                                    </span>
                                    <div>
                                        <p className="text-[15px] text-on-background font-medium">
                                            Thanks. We'll reach out the same business day.
                                        </p>
                                        <p className="mt-1 text-[13px] text-on-background-secondary">
                                            We come back with a 20-minute call slot and one specific operation to demo against.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="p-5 sm:p-6 flex flex-col gap-3">
                                    <label htmlFor="cta-email" className="text-[12.5px] text-on-background-secondary">
                                        Work email
                                    </label>
                                    <input
                                        id="cta-email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="ops@yourcompany.com"
                                        className="border border-divider-strong focus:border-on-background bg-background text-on-background placeholder:text-on-background-secondary text-[14.5px] px-3.5 py-3 rounded-xs"
                                    />
                                    <button
                                        type="submit"
                                        className="group inline-flex items-center justify-center gap-2 text-on-brand bg-on-background hover:bg-brand-variant border border-on-background hover:border-brand-variant rounded-xs text-[14.5px] px-4 py-3 transition-colors duration-200 cursor-pointer"
                                    >
                                        Request a demo
                                        <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                                    </button>
                                </form>
                            )}
                        </div>

                        <div className="border border-on-brand-secondary/30 bg-brand-variant/40 rounded-xs p-5">
                            <div className="text-[11px] uppercase tracking-wider text-on-brand-secondary mb-3">
                                Or get the desktop app
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <a
                                    href={MAC_DOWNLOAD}
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-on-background bg-background hover:bg-on-background hover:text-on-brand border border-on-background rounded-xs text-[14px] px-4 py-3 transition-colors duration-200"
                                >
                                    <AppleIcon className="w-4 h-4" />
                                    Download for Mac
                                </a>
                                <a
                                    href={WIN_DOWNLOAD}
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-on-background bg-background hover:bg-on-background hover:text-on-brand border border-on-background rounded-xs text-[14px] px-4 py-3 transition-colors duration-200"
                                >
                                    <MonitorIcon className="w-4 h-4" />
                                    Download for Windows
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
