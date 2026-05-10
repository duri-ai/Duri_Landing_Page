import { useEffect, useState } from "react";
import {
    ArrowUpIcon,
    BellIcon,
    CalendarClockIcon,
    PlugIcon,
    PlusIcon,
    SearchIcon,
    SidebarIcon,
} from "lucide-react";

const FULL_PROMPT =
    "Can you turn Shopify order #1042 into a QuickBooks invoice?";

/** Hero product window: a one-shot exchange. The user asks for a single
 *  invoice, the workspace replies in light markdown (bold key terms,
 *  italics for accounting class, two action lines with emojis). The
 *  scroll panel is fixed-height so the window doesn't reflow when the
 *  reply lands. */
export default function HeroProductWindow() {
    const reducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const [typed, setTyped] = useState(reducedMotion ? FULL_PROMPT : "");
    const [replyShown, setReplyShown] = useState(reducedMotion);

    useEffect(() => {
        if (reducedMotion) return;
        let cancelled = false;
        let i = 0;
        const tick = () => {
            if (cancelled) return;
            i += 1;
            setTyped(FULL_PROMPT.slice(0, i));
            if (i < FULL_PROMPT.length) {
                window.setTimeout(tick, 22 + Math.random() * 20);
            } else {
                window.setTimeout(() => {
                    if (cancelled) return;
                    setReplyShown(true);
                }, 380);
            }
        };
        const id = window.setTimeout(tick, 480);
        return () => {
            cancelled = true;
            window.clearTimeout(id);
        };
    }, [reducedMotion]);

    const isTyping = typed.length < FULL_PROMPT.length;

    return (
        <div className="relative w-full">
            <div className="relative bg-background border border-on-background rounded-xs overflow-hidden shadow-[0_28px_56px_-28px_rgba(0,50,32,0.22),0_2px_0_0_rgba(0,50,32,0.06)]">
                <div className="flex items-center gap-3 px-3.5 py-2.5 border-b border-divider bg-background-warm">
                    <div className="flex items-center gap-1.5">
                        <span className="block w-2.5 h-2.5 rounded-full bg-[#e15c5c]" aria-hidden />
                        <span className="block w-2.5 h-2.5 rounded-full bg-[#e0a93b]" aria-hidden />
                        <span className="block w-2.5 h-2.5 rounded-full bg-[#5fb96a]" aria-hidden />
                    </div>
                    <div className="flex-1" />
                    <BellIcon className="w-3.5 h-3.5 text-on-background-secondary" aria-hidden />
                </div>

                <div className="grid grid-cols-[56px_1fr]">
                    <aside className="border-r border-divider bg-background-warm/70 flex flex-col items-center pt-3 pb-3 gap-2">
                        <img
                            src={`${import.meta.env.BASE_URL}logos/d.svg`}
                            alt=""
                            aria-hidden
                            className="w-7 h-7 rounded-xs"
                        />
                        <div className="mt-3 flex flex-col items-center gap-1.5">
                            <SidebarIcon className="w-4 h-4 text-on-background-secondary" />
                            <PlusIcon className="w-4 h-4 text-on-background-secondary" />
                        </div>
                        <div className="mt-auto flex flex-col items-center gap-2 text-on-background-secondary">
                            <CalendarClockIcon className="w-4 h-4" />
                            <PlugIcon className="w-4 h-4" />
                            <SearchIcon className="w-4 h-4" />
                        </div>
                    </aside>

                    <div className="flex flex-col">
                        <header className="flex items-center justify-between border-b border-divider px-4 py-2.5 bg-background">
                            <h3 className="text-[13.5px] text-on-background font-medium">
                                Order to invoice
                            </h3>
                        </header>

                        {/* Fixed-height scroll panel so the window doesn't
                            reflow when the reply renders. */}
                        <div className="px-4 py-4 sm:px-5 sm:py-5 bg-background-warm/35 h-[300px] overflow-y-auto">
                            <div className="flex justify-end mb-4">
                                <div className="max-w-[80%] bg-background border border-divider-strong rounded-xs px-3 py-2.5">
                                    <p className="text-[13.5px] leading-snug text-on-background">
                                        <span className={isTyping ? "duri-typing-caret" : undefined}>
                                            {typed}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {replyShown && (
                                <div className="duri-fade-up flex flex-col">
                                    <div className="mb-1.5 flex items-center gap-1.5">
                                        <img
                                            src={`${import.meta.env.BASE_URL}logos/d.svg`}
                                            alt=""
                                            aria-hidden
                                            className="w-4 h-4 rounded-xs"
                                        />
                                        <span className="text-[11.5px] font-semibold text-on-background">Duri</span>
                                    </div>

                                    <div className="max-w-[92%] flex flex-col gap-2 text-[13.5px] leading-relaxed text-on-background">
                                        <p>Got it!</p>
                                        <ul className="flex flex-col gap-1.5">
                                            <li className="flex items-start gap-2">
                                                <span aria-hidden>📦</span>
                                                <span>
                                                    Pulled <strong className="font-semibold">order #1042</strong>{" "}
                                                    (Maria&nbsp;L., $84.20)
                                                </span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span aria-hidden>✅</span>
                                                <span>
                                                    Posted{" "}
                                                    <strong className="font-semibold">INV-1042</strong> ·{" "}
                                                    <em className="text-on-background-secondary not-italic font-mono text-[12.5px]">
                                                        Sales:Coffee
                                                    </em>
                                                    , 13% HST, net-30
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="px-4 py-3 sm:px-5 sm:py-3.5 border-t border-divider bg-background">
                            <div className="flex items-center gap-2 border border-divider-strong rounded-xs bg-background px-3 py-2">
                                <span className="flex-1 text-[13px] text-on-background-secondary">
                                    Reply, or describe a new task...
                                </span>
                                <span className="inline-flex items-center justify-center w-7 h-7 bg-on-background text-on-brand rounded-xs">
                                    <ArrowUpIcon className="w-3.5 h-3.5" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="absolute -z-10 -bottom-2.5 -right-2.5 w-full h-full bg-on-background pointer-events-none"
                aria-hidden
            />
        </div>
    );
}
