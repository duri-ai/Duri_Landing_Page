import {
    BrainIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    LockIcon,
    MessageCircleQuestionIcon,
    MoreHorizontalIcon,
    MousePointer2Icon,
    RotateCcwIcon,
} from "lucide-react";

/**
 * Replaces the old "Reality today" section. Strikes a thick red X
 * through "Workflow Builder" and pairs it with the new promise: an
 * AI that learns from a single demonstration or one answered question.
 * Two visuals sit side by side at matching heights: the asking-flow on
 * the left, the recorded browser demo on the right.
 */
export default function WorkflowBuilder() {
    return (
        <section className="w-full bg-background-warm border-t border-divider min-w-xs">
            <div className="mx-auto max-w-[1280px] px-4 md:px-8 py-20 md:py-28">
                <h2 className="duri-section-title">
                    <span className="duri-strike mr-3 md:mr-4">Workflow Builder</span>
                    <span>AI learns from you.</span>
                </h2>
                <p className="mt-5 text-[16px] md:text-[18px] text-on-background-secondary max-w-xl">
                    Nothing to build. Just describe the work, AI learns the rest.
                </p>

                <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-stretch">
                    <figure className="flex flex-col gap-5 h-full">
                        <div className="flex-1 flex">
                            <AskingFlowVisual />
                        </div>
                        <figcaption className="text-[15px] md:text-[16px] text-on-background leading-snug">
                            Just answer when it asks. It picks up the rule.
                        </figcaption>
                    </figure>

                    <figure className="flex flex-col gap-5 h-full">
                        <div className="flex-1 flex">
                            <BrowserDemoVisual />
                        </div>
                        <figcaption className="text-[15px] md:text-[16px] text-on-background leading-snug">
                            Or demo the work in your browser, once.
                        </figcaption>
                    </figure>
                </div>
            </div>
        </section>
    );
}

/** Full Q&A flow: user prompt at top, asking widget, the answered chip,
 *  then a "memory updated" trace at the bottom so the section's
 *  promise (the workspace learns) lands in the animation itself. */
function AskingFlowVisual() {
    return (
        <div className="w-full flex flex-col gap-3 border border-on-background rounded-xs bg-background p-5 shadow-[0_18px_36px_-24px_rgba(0,50,32,0.18)]">
            {/* User message */}
            <div className="flex justify-end">
                <div className="max-w-[80%] bg-background border border-divider-strong rounded-xs px-3 py-2.5">
                    <p className="text-[13.5px] leading-snug text-on-background">
                        Reconcile this week's vendor bills against the PO log.
                    </p>
                </div>
            </div>

            {/* AI asking */}
            <div className="relative max-w-full border border-divider-strong bg-background rounded-xs p-3.5">
                <div className="flex items-center gap-1.5 mb-2">
                    <span className="block w-1.5 h-1.5 bg-brand rounded-full animate-pulse" />
                    <span className="text-[10px] uppercase tracking-wider text-on-background-secondary">
                        Asking you
                    </span>
                </div>
                <p className="text-[13px] font-medium leading-snug text-on-background">
                    One SKU is missing a price. Match it by product name, or skip for review?
                </p>
                <div className="mt-3 flex flex-wrap gap-2 relative">
                    <span className="duri-btn-select inline-flex items-center rounded-full border text-[11.5px] px-3 py-1">
                        Match by name
                    </span>
                    <span className="inline-flex items-center rounded-full border border-divider-strong bg-background text-on-background text-[11.5px] px-3 py-1">
                        Skip for review
                    </span>
                    <span
                        className="duri-clicker pointer-events-none absolute"
                        style={{ left: 56, top: 6 }}
                        aria-hidden
                    >
                        <MousePointer2Icon
                            className="w-4 h-4 text-on-background drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)]"
                            fill="currentColor"
                        />
                    </span>
                </div>
                <div className="mt-2.5 h-7 border border-divider-strong rounded-md bg-background flex items-center px-2">
                    <span className="text-[11px] text-on-background-secondary">
                        Or type your own answer…
                    </span>
                </div>
            </div>

            {/* User's answered chip */}
            <div className="duri-respond flex justify-end">
                <div className="inline-flex flex-col items-start gap-0.5 border border-divider-strong rounded-xs bg-background px-2.5 py-1.5">
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-on-background-secondary">
                        <MessageCircleQuestionIcon className="w-3 h-3" />
                        You answered
                    </span>
                    <span className="text-[12px] text-on-background">Match by name</span>
                </div>
            </div>

            {/* The workspace commits this answer to memory */}
            <div className="duri-memory flex">
                <div className="inline-flex items-center gap-1.5 border border-on-background bg-brand-soft rounded-xs px-2.5 py-1 text-[11.5px]">
                    <BrainIcon className="w-3 h-3 text-brand flex-none" aria-hidden />
                    <span className="text-on-background">Memory updated</span>
                </div>
            </div>
        </div>
    );
}

/** Browser demo recording, matched in height to the asking flow via
 *  the items-stretch grid wrapping the section. */
function BrowserDemoVisual() {
    return (
        <div className="w-full border border-on-background rounded-xs bg-background overflow-hidden shadow-[0_18px_36px_-24px_rgba(0,50,32,0.18)]">
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

            <div className="relative bg-background overflow-hidden px-5 pt-5 pb-7">
                <div className="text-[11px] uppercase tracking-wider text-on-background-secondary mb-3">
                    Create invoice
                </div>

                <div className="mb-3.5">
                    <div className="text-[10px] text-on-background-secondary mb-1">Customer</div>
                    <div className="h-7 border border-divider-strong bg-background-warm flex items-center px-2">
                        <span className="block h-1.5 w-24 bg-divider-strong" />
                    </div>
                </div>

                <div className="mb-4">
                    <div className="text-[10px] text-on-background-secondary mb-1">Line items</div>
                    <div className="h-7 border border-divider-strong bg-background-warm flex items-center px-2">
                        <span className="block h-1.5 w-32 bg-divider-strong" />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1 pb-2">
                    <div className="h-7 px-3 border border-divider-strong bg-background flex items-center text-[10px] text-on-background-secondary">
                        Cancel
                    </div>
                    <div className="h-7 px-3 bg-on-background flex items-center text-[10px] text-on-brand">
                        Save invoice
                    </div>
                </div>

                <div
                    className="duri-cursor-path absolute pointer-events-none"
                    style={{ top: "20%", left: "14%" }}
                    aria-hidden
                >
                    <MousePointer2Icon
                        className="w-4 h-4 text-on-background drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)]"
                        fill="currentColor"
                    />
                </div>
            </div>
        </div>
    );
}
