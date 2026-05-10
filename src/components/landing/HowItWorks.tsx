import type { ReactNode } from "react";
import {
    ArrowUpIcon,
    BarChart3Icon,
    CalendarClockIcon,
    CheckCircle2Icon,
    FileSpreadsheetIcon,
    FileTextIcon,
    FileTypeIcon,
    PlayIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ITEMS: { caption: string; render: () => ReactNode }[] = [
    {
        caption: "Ask, in plain language, across every tool.",
        render: () => <ChatVisual />,
    },
    {
        caption: "Or run it on a schedule.",
        render: () => <ScheduleVisual />,
    },
    {
        caption: "Pull every record into one PDF.",
        render: () => <ReportVisual />,
    },
];

export default function HowItWorks() {
    return (
        <section id="how" className="w-full bg-background min-w-xs">
            <div className="mx-auto max-w-[1280px] px-4 md:px-8 py-20 md:py-32">
                <h2 className="duri-section-title">How it works.</h2>
                <p className="mt-5 text-[16px] md:text-[18px] text-on-background-secondary max-w-xl">
                    Ask, schedule, summarise.
                </p>

                <ol className="mt-14 md:mt-20 flex flex-col">
                    {ITEMS.map((item, i) => (
                        <li
                            key={i}
                            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 py-10 md:py-14 ${
                                i === 0 ? "border-y border-divider-strong" : "border-b border-divider-strong"
                            }`}
                        >
                            <div className="lg:col-span-5 flex flex-col">
                                <span className="font-mono text-[12px] tracking-wider text-brand">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <h3 className="mt-3 text-[24px] md:text-[34px] tracking-[-0.02em] leading-[1.05] text-on-background max-w-md">
                                    {item.caption}
                                </h3>
                            </div>
                            <div className="lg:col-span-7">{item.render()}</div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

/** Item 1: a chat exchange where the user asks across multiple apps
 *  (Outlook + Excel) and the workspace responds with both actions. */
function ChatVisual() {
    return (
        <div className="border border-on-background rounded-xs bg-background overflow-hidden shadow-[0_18px_36px_-24px_rgba(0,50,32,0.18)]">
            <div className="px-4 py-4 sm:px-5 sm:py-5 bg-background-warm/35 min-h-[200px]">
                {/* User message */}
                <div className="flex justify-end mb-4">
                    <div className="max-w-[80%] bg-background border border-divider-strong rounded-xs px-3 py-2.5">
                        <p className="text-[13.5px] leading-snug text-on-background">
                            Schedule next week's demo with Andrew via Outlook, and update our Excel of leads.
                        </p>
                    </div>
                </div>

                {/* Duri turn */}
                <div className="flex flex-col">
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
                        <ChatActionRow
                            logo="outlook.svg"
                            label="Booked Wednesday, 2:00 PM"
                            detail="Andrew confirmed via calendar invite"
                        />
                        <ChatActionRow
                            logo="excel.svg"
                            label="Updated leads sheet"
                            detail="row 142, status: demo-scheduled"
                        />
                    </div>
                </div>
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
    );
}

function ChatActionRow({
    logo,
    label,
    detail,
}: {
    logo: string;
    label: string;
    detail: string;
}) {
    return (
        <div className="inline-flex w-fit items-center gap-2 border border-divider-strong rounded-xs px-2.5 py-1.5 text-[12px] bg-background">
            <img
                src={`${import.meta.env.BASE_URL}logos/third_party/${logo}`}
                alt=""
                aria-hidden
                className="w-3.5 h-3.5 object-contain flex-none"
            />
            <span className="text-on-background">
                {label}
                <span className="text-on-background-secondary"> · {detail}</span>
            </span>
            <CheckCircle2Icon className="w-3 h-3 text-brand flex-none" aria-hidden />
        </div>
    );
}

/** Item 2: scheduled tasks panel (real cron-style schedules). */
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

/** Item 3: a real-feeling PDF report rolled up from every connected
 *  system, plus a row of file attachments in different formats. */
function ReportVisual() {
    return (
        <div className="flex flex-col gap-3">
            <div className="border border-on-background rounded-xs bg-background overflow-hidden shadow-[0_18px_36px_-24px_rgba(0,50,32,0.18)]">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-divider bg-background-warm">
                    <FileTextIcon className="w-3.5 h-3.5 text-on-background-secondary" />
                    <span className="font-mono text-[10.5px] text-on-background-secondary">
                        october_close.pdf
                    </span>
                </div>
                <div className="px-5 py-5">
                    <div className="text-[9.5px] uppercase tracking-wider text-on-background-secondary">
                        Operations summary, October 2026
                    </div>

                    <div className="mt-1 flex items-baseline justify-between gap-3">
                        <div className="text-[15px] font-medium tracking-[-0.01em] leading-tight text-on-background">
                            Net margin
                        </div>
                        <div className="text-[12.5px] font-mono text-on-background">
                            $128,420
                            <span className="ml-1.5 text-[10.5px] text-brand">+8.4%</span>
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-3 text-[11px]">
                        <div>
                            <div className="text-on-background-secondary">Top vendor</div>
                            <div className="text-on-background font-medium mt-0.5 font-mono">$24,180</div>
                            <div className="text-[10px] text-on-background-secondary">Vendor A</div>
                        </div>
                        <div>
                            <div className="text-on-background-secondary">Late invoices</div>
                            <div className="text-on-background font-medium mt-0.5 font-mono">4 / 142</div>
                            <div className="text-[10px] text-on-background-secondary">$612 outstanding</div>
                        </div>
                        <div>
                            <div className="text-on-background-secondary">Inventory off</div>
                            <div className="text-on-background font-medium mt-0.5 font-mono">12 SKUs</div>
                            <div className="text-[10px] text-on-background-secondary">value $1,840</div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="text-[9.5px] uppercase tracking-wider text-on-background-secondary mb-1.5 inline-flex items-center gap-1.5">
                            <BarChart3Icon className="w-3 h-3" />
                            Daily margin, last 14 days
                        </div>
                        <div className="flex items-end gap-1 h-9">
                            {[42, 56, 38, 64, 48, 72, 60, 54, 68, 76, 50, 62, 58, 70].map((h, i) => (
                                <div
                                    key={i}
                                    className="flex-1 bg-on-background"
                                    style={{ height: `${h}%` }}
                                />
                            ))}
                        </div>
                        <div className="mt-1 flex items-center justify-between text-[9px] font-mono text-on-background-secondary">
                            <span>Oct 12</span>
                            <span>Oct 25</span>
                        </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-divider pt-2 text-[9.5px] text-on-background-secondary">
                        <span>Confidential · Internal use</span>
                        <span className="font-mono">Page 1 / 14</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 text-[11.5px]">
                <FileChip name="margin_by_day" ext="xlsx" />
                <FileChip name="october_close" ext="pdf" />
                <FileChip name="ops_report" ext="doc" />
            </div>
        </div>
    );
}

const FILE_ICON: Record<string, LucideIcon> = {
    xlsx: FileSpreadsheetIcon,
    csv: FileSpreadsheetIcon,
    pdf: FileTextIcon,
    doc: FileTypeIcon,
    docx: FileTypeIcon,
};

function FileChip({ name, ext }: { name: string; ext: string }) {
    const Icon = FILE_ICON[ext] ?? FileTextIcon;
    return (
        <span className="inline-flex items-center gap-1.5 border border-divider-strong rounded-xs px-2 py-1.5 bg-background">
            <Icon className="w-3.5 h-3.5 text-on-background-secondary flex-none" aria-hidden />
            <span className="text-[11px] text-on-background font-mono">
                {name}.{ext}
            </span>
        </span>
    );
}
