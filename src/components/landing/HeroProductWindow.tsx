import { useEffect, useState } from "react";
import {
    ArrowUpIcon,
    BellIcon,
    CalendarClockIcon,
    CheckCircle2Icon,
    FileCode2Icon,
    GlobeIcon,
    PaperclipIcon,
    PlugIcon,
    PlusIcon,
    SearchIcon,
    SidebarIcon,
    Table2Icon,
    VideoIcon,
} from "lucide-react";

const FULL_PROMPT =
    "When a Shopify order comes in, draft the invoice in QuickBooks and update inventory.";

type Step = {
    kind: "text" | "event-script" | "event-table" | "event-browser";
    label: string;
    detail?: string;
    state: "running" | "done";
};

const STEPS: Step[] = [
    {
        kind: "text",
        label: "Got it. I'll watch for new orders and handle each as it arrives. Should I also notify you in Slack on the daily roll-up?",
        state: "done",
    },
    {
        kind: "event-script",
        label: "Reading 12 new orders",
        state: "done",
    },
    {
        kind: "event-script",
        label: "Drafting QuickBooks invoices",
        detail: "matching customer, line items, tax",
        state: "done",
    },
    {
        kind: "event-table",
        label: "Inventory synced to your spreadsheet",
        detail: "12 SKUs, 28 units",
        state: "done",
    },
    {
        kind: "event-browser",
        label: "Watching the orders page",
        state: "running",
    },
];

/**
 * Hero product window: a mirror of the desktop chat session. Sidebar with
 * brand mark and tab nav, header with session title and a Schedule
 * affordance, message stream with a user message + assistant reply +
 * runtime event badges (mirrors EventMessageBody styling), composer at
 * the bottom (mirrors ChatComposer InputGroup pattern). Typing animates
 * once, then the message stream and event badges reveal in sequence.
 */
export default function HeroProductWindow() {
    const reducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const [typed, setTyped] = useState(reducedMotion ? FULL_PROMPT : "");
    const [revealed, setRevealed] = useState(reducedMotion ? STEPS.length : 0);

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
                    revealNext(0);
                }, 380);
            }
        };
        const revealNext = (n: number) => {
            if (cancelled) return;
            setRevealed(n + 1);
            if (n + 1 < STEPS.length) {
                window.setTimeout(() => revealNext(n + 1), 460);
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
                {/* Window frame: traffic lights + drag region. The desktop
                    app uses a frameless window with platform-aware traffic
                    lights, so the title sits inside the main panel header
                    rather than centered up here. */}
                <div className="flex items-center gap-3 px-3.5 py-2.5 border-b border-divider bg-background-warm">
                    <div className="flex items-center gap-1.5">
                        <span className="block w-2.5 h-2.5 rounded-full bg-[#e15c5c]" aria-hidden />
                        <span className="block w-2.5 h-2.5 rounded-full bg-[#e0a93b]" aria-hidden />
                        <span className="block w-2.5 h-2.5 rounded-full bg-[#5fb96a]" aria-hidden />
                    </div>
                    <div className="flex-1" />
                    <div className="flex items-center gap-2 text-on-background-secondary">
                        <BellIcon className="w-3.5 h-3.5" aria-hidden />
                    </div>
                </div>

                <div className="grid grid-cols-[56px_1fr]">
                    {/* Sidebar (collapsed-icons style, matches the desktop's frameless sidebar) */}
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

                    {/* Main column */}
                    <div className="flex flex-col">
                        {/* Header with title + chip */}
                        <header className="flex items-center justify-between border-b border-divider px-4 py-2.5 bg-background">
                            <h3 className="text-[13.5px] text-on-background font-medium">
                                Order to invoice
                            </h3>
                        </header>

                        {/* Message stream */}
                        <div className="flex-1 px-4 py-4 sm:px-5 sm:py-5 bg-background-warm/35 min-h-[260px]">
                            {/* User message, right-aligned, max 80% */}
                            <div className="flex justify-end mb-4">
                                <div className="max-w-[80%] bg-background border border-divider-strong rounded-xs px-3 py-2.5">
                                    <p className="text-[13.5px] leading-snug text-on-background">
                                        <span className={isTyping ? "duri-typing-caret" : undefined}>
                                            {typed}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* Assistant turn: avatar + label + body */}
                            {revealed > 0 && (
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

                                    <div className="flex flex-col gap-2 max-w-[88%]">
                                        {STEPS.slice(0, revealed).map((step, i) => (
                                            <StepRow key={i} step={step} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Composer */}
                        <div className="px-4 py-3 sm:px-5 sm:py-3.5 border-t border-divider bg-background">
                            <div className="border border-divider-strong rounded-xs bg-background">
                                <div className="px-3.5 pt-2.5 pb-2 min-h-[36px] text-[13px] text-on-background-secondary">
                                    Reply, or describe a new task...
                                </div>
                                <div className="flex items-center justify-between border-t border-divider px-2.5 py-1.5">
                                    <div className="flex items-center gap-1">
                                        <span className="inline-flex items-center gap-1 text-[11.5px] text-on-background-secondary px-2 py-1 rounded-xs">
                                            <PaperclipIcon className="w-3 h-3" />
                                            Attach
                                        </span>
                                        <span className="inline-flex items-center gap-1 text-[11.5px] text-on-background-secondary px-2 py-1 rounded-xs">
                                            <VideoIcon className="w-3 h-3" />
                                            Record a demo
                                        </span>
                                    </div>
                                    <span className="inline-flex items-center justify-center w-7 h-7 bg-on-background text-on-brand rounded-xs">
                                        <ArrowUpIcon className="w-3.5 h-3.5" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Anchor mark behind the window */}
            <div
                className="absolute -z-10 -bottom-2.5 -right-2.5 w-full h-full bg-on-background pointer-events-none"
                aria-hidden
            />
        </div>
    );
}

function StepRow({ step }: { step: Step }) {
    const isRunning = step.state === "running";
    const isText = step.kind === "text";

    if (isText) {
        return (
            <p className="text-[13.5px] leading-snug text-on-background">{step.label}</p>
        );
    }

    const Icon =
        step.kind === "event-script"
            ? FileCode2Icon
            : step.kind === "event-table"
              ? Table2Icon
              : GlobeIcon;

    return (
        <div className="inline-flex w-fit items-center gap-1.5 border border-divider-strong rounded-xs px-2 py-1 text-[12px] bg-background">
            <Icon className="w-3.5 h-3.5 text-on-background-secondary flex-none" aria-hidden />
            <span className="text-on-background">
                {step.label}
                {step.detail && (
                    <span className="text-on-background-secondary"> {step.detail}</span>
                )}
                {isRunning ? (
                    <span className="ml-1 text-on-background-secondary">
                        <DotsAnim />
                    </span>
                ) : null}
            </span>
            {!isRunning && (
                <CheckCircle2Icon className="w-3 h-3 text-brand flex-none" aria-hidden />
            )}
        </div>
    );
}

/** Three pulsing dots inline, mirrors AnimatedDots in the desktop app. */
function DotsAnim() {
    return (
        <span className="inline-flex items-baseline gap-0.5">
            <span className="w-1 h-1 bg-on-background-secondary rounded-full animate-pulse" />
            <span
                className="w-1 h-1 bg-on-background-secondary rounded-full animate-pulse"
                style={{ animationDelay: "150ms" }}
            />
            <span
                className="w-1 h-1 bg-on-background-secondary rounded-full animate-pulse"
                style={{ animationDelay: "300ms" }}
            />
        </span>
    );
}
