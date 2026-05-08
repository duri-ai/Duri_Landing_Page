import {
    CalendarClockIcon,
    CheckIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    LockIcon,
    MoreHorizontalIcon,
    MousePointer2Icon,
    PlayIcon,
    RotateCcwIcon,
} from "lucide-react";
import { howItWorks } from "../../utils/marketingContent";

export default function HowItWorks() {
    return (
        <section id="how" className="w-full bg-background min-w-xs">
            <div className="mx-auto max-w-[1280px] px-4 md:px-8 py-20 md:py-32">
                <div className="max-w-3xl">
                    <span className="duri-eyebrow">How it works</span>
                    <h2 className="mt-5 duri-section-title">
                        Three steps. One conversation.
                    </h2>
                </div>

                <ol className="mt-14 md:mt-20 flex flex-col">
                    {howItWorks.map((act, i) => (
                        <li
                            key={act.index}
                            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 py-10 md:py-14 ${
                                i === 0 ? "border-y border-divider-strong" : "border-b border-divider-strong"
                            }`}
                        >
                            <div className="lg:col-span-5 flex flex-col">
                                <span className="font-mono text-[12px] tracking-wider text-brand">
                                    {act.index}
                                </span>
                                <h3 className="mt-3 text-[28px] md:text-[40px] tracking-[-0.02em] leading-[1.05] text-on-background">
                                    {act.title}
                                </h3>
                                <p className="mt-5 text-[15px] md:text-[16px] leading-relaxed text-on-background-secondary max-w-md">
                                    {act.body}
                                </p>
                            </div>
                            <div className="lg:col-span-7">
                                <StepVisual index={i} />
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

function StepVisual({ index }: { index: number }) {
    if (index === 0) return <RecordingVisual />;
    if (index === 1) return <ExecuteVisual />;
    return <ScheduleVisual />;
}

/** Step 1: faux Chrome window being demoed. Top: tab strip + REC label.
 *  Below: a real-looking Chrome address bar. Then the form skeleton with
 *  a cursor on a continuous loop. Footer: AI message expressing what it
 *  understood from the demo. */
function RecordingVisual() {
    return (
        <div className="border border-on-background rounded-xs bg-background overflow-hidden shadow-[0_18px_36px_-24px_rgba(0,50,32,0.18)]">
            {/* Top strip: REC label + tab */}
            <div className="flex items-center gap-3 px-3 py-2 border-b border-divider bg-background-warm">
                <div className="flex items-center gap-1.5">
                    <span className="block w-2 h-2 rounded-full bg-[#e15c5c] duri-rec-pulse" />
                    <span className="text-[10px] uppercase tracking-wider text-on-background font-medium">
                        Demo on browser
                    </span>
                </div>
                <div className="ml-auto inline-flex items-center gap-1">
                    <span className="block w-2 h-2 rounded-full bg-[#e15c5c]" />
                    <span className="block w-2 h-2 rounded-full bg-[#e0a93b]" />
                    <span className="block w-2 h-2 rounded-full bg-[#5fb96a]" />
                </div>
            </div>

            {/* Chrome-style toolbar */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-divider bg-background">
                <div className="flex items-center gap-1 text-on-background-secondary">
                    <ChevronLeftIcon className="w-3.5 h-3.5" />
                    <ChevronRightIcon className="w-3.5 h-3.5" />
                    <RotateCcwIcon className="w-3 h-3 ml-1" />
                </div>
                <div className="flex-1 flex items-center gap-1.5 bg-background-warm border border-divider rounded-full px-3 py-1">
                    <LockIcon className="w-3 h-3 text-on-background-secondary" />
                    <span className="text-[10.5px] text-on-background-secondary truncate">
                        admin.your-tool.com / new-invoice
                    </span>
                </div>
                <div className="text-on-background-secondary">
                    <MoreHorizontalIcon className="w-3.5 h-3.5" />
                </div>
            </div>

            {/* Form skeleton */}
            <div className="relative h-[210px] bg-background overflow-hidden px-5 pt-5 pb-3">
                <div className="text-[11px] uppercase tracking-wider text-on-background-secondary mb-3">
                    Create invoice
                </div>

                <div className="mb-3">
                    <div className="text-[10px] text-on-background-secondary mb-1">Customer</div>
                    <div className="h-7 border border-divider-strong bg-background-warm flex items-center px-2">
                        <span className="block h-1.5 w-24 bg-divider-strong" />
                    </div>
                </div>

                <div className="mb-3">
                    <div className="text-[10px] text-on-background-secondary mb-1">Line items</div>
                    <div className="h-7 border border-divider-strong bg-background-warm flex items-center px-2">
                        <span className="block h-1.5 w-32 bg-divider-strong" />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                    <div className="h-7 px-3 border border-divider-strong bg-background flex items-center text-[10px] text-on-background-secondary">
                        Cancel
                    </div>
                    <div className="h-7 px-3 bg-on-background flex items-center text-[10px] text-on-brand">
                        Save invoice
                    </div>
                </div>

                <div
                    className="duri-cursor-path absolute pointer-events-none"
                    style={{ top: "24%", left: "14%" }}
                    aria-hidden
                >
                    <MousePointer2Icon
                        className="w-4 h-4 text-on-background drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)]"
                        fill="currentColor"
                    />
                </div>
            </div>

            {/* AI understanding strip */}
            <div className="border-t border-divider bg-brand-soft/80 px-4 py-3">
                <div className="flex items-start gap-2">
                    <span
                        className="inline-flex w-4 h-4 mt-0.5 bg-brand rounded-xs items-center justify-center text-[8px] text-on-brand font-semibold flex-none"
                        aria-hidden
                    >
                        D
                    </span>
                    <p className="text-[12.5px] leading-snug text-on-background">
                        Got it, looks like a customer invoice. I'll repeat this whenever the trigger fires.
                    </p>
                </div>
            </div>
            <div className="h-[3px] w-full bg-divider relative overflow-hidden">
                <div className="duri-line-grow absolute inset-y-0 left-0 right-0 bg-brand" />
            </div>
        </div>
    );
}

/** Step 2: a chat-style sequence showing read → ask → run, with each
 *  message peaking in its own segment of the loop. */
function ExecuteVisual() {
    return (
        <div className="border border-on-background rounded-xs bg-background overflow-hidden shadow-[0_18px_36px_-24px_rgba(0,50,32,0.18)]">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-divider bg-background-warm">
                <span className="block w-2 h-2 bg-brand rounded-full animate-pulse" />
                <span className="text-[10.5px] uppercase tracking-wider text-on-background-secondary">
                    Running
                </span>
            </div>

            <div className="px-4 py-5 sm:px-5 flex flex-col gap-3 min-h-[224px]">
                <div className="duri-msg-1 inline-flex w-fit items-center gap-2 border border-divider-strong rounded-xs px-2.5 py-1.5 text-[12.5px] bg-background">
                    <CheckIcon className="w-3 h-3 text-brand" strokeWidth={3} />
                    <span className="text-on-background">Read 12 orders, 3 vendors</span>
                </div>

                <div className="duri-msg-2 max-w-[88%] border border-divider-strong bg-background rounded-xs px-3 py-2.5">
                    <div className="text-[10.5px] uppercase tracking-wider text-on-background-secondary mb-1">
                        Quick check
                    </div>
                    <p className="text-[13px] leading-snug text-on-background">
                        One SKU is missing a price. Match it by product name, or skip for review?
                    </p>
                    <div className="mt-2.5 flex gap-1.5">
                        <span className="text-[11.5px] px-2 py-1 bg-on-background text-on-brand rounded-xs">
                            Match by name
                        </span>
                        <span className="text-[11.5px] px-2 py-1 border border-on-background text-on-background rounded-xs">
                            Skip for review
                        </span>
                    </div>
                </div>

                <div className="duri-msg-3 inline-flex w-fit items-center gap-2 border border-on-background bg-brand-soft rounded-xs px-2.5 py-1.5 text-[12.5px]">
                    <CheckIcon className="w-3 h-3 text-brand" strokeWidth={3} />
                    <span className="text-on-background font-medium">Done. 12 invoiced, $4,283 booked.</span>
                </div>
            </div>
        </div>
    );
}

/** Step 3: a list of real scheduled tasks (one per session in Duri's
 *  model). The brand-soft highlight rotates between the three. The
 *  right column shows each task's actual schedule string instead of an
 *  Active badge. */
function ScheduleVisual() {
    const rows = [
        {
            name: "Daily order roll-up",
            detail: "Yesterday's Shopify orders into the books",
            schedule: "Weekdays, 9:00 AM",
            cls: "duri-sched-1",
        },
        {
            name: "Vendor bill review",
            detail: "Reconcile bills against the PO log",
            schedule: "Every Wed and Thu, 9:00 AM",
            cls: "duri-sched-2",
        },
        {
            name: "Month-end close",
            detail: "Inventory, invoices, payroll prep",
            schedule: "Last business day, 5:00 PM",
            cls: "duri-sched-3",
        },
    ];
    return (
        <div className="border border-on-background rounded-xs bg-background overflow-hidden shadow-[0_18px_36px_-24px_rgba(0,50,32,0.18)]">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-divider bg-background-warm">
                <CalendarClockIcon className="w-3.5 h-3.5 text-on-background-secondary" />
                <span className="text-[10.5px] uppercase tracking-wider text-on-background-secondary">
                    Scheduled tasks
                </span>
            </div>
            <ul className="divide-y divide-divider">
                {rows.map((r) => (
                    <li
                        key={r.name}
                        className={`flex items-center justify-between px-4 py-3 gap-3 ${r.cls}`}
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            <span className="inline-flex w-7 h-7 flex-none items-center justify-center border border-divider-strong rounded-xs bg-background text-on-background">
                                <PlayIcon className="w-3 h-3" strokeWidth={2.5} />
                            </span>
                            <div className="min-w-0">
                                <div className="text-[13px] text-on-background font-medium truncate">
                                    {r.name}
                                </div>
                                <div className="text-[11.5px] text-on-background-secondary truncate">
                                    {r.detail}
                                </div>
                            </div>
                        </div>
                        <span className="text-[11px] text-on-background-secondary whitespace-nowrap font-mono">
                            {r.schedule}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
