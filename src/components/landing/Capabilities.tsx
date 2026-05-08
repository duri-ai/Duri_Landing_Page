import { useState } from "react";
import {
    CheckCircle2Icon,
    CircleDotIcon,
    FileSpreadsheetIcon,
    FileTextIcon,
    GlobeIcon,
    MousePointer2Icon,
    PauseIcon,
} from "lucide-react";

type Lane = "code" | "browser" | "report";

const LANE_ORDER: Lane[] = ["code", "browser", "report"];

const LANE_META: Record<
    Lane,
    {
        index: string;
        tab: string;
        title: string;
        body: string;
    }
> = {
    code: {
        index: "01",
        tab: "Code sandbox",
        title: "An AI developer, working on your behalf.",
        body: "When the work doesn't fit a template, the workspace writes the code, runs it in a private sandbox, and shows you what changed across your systems. You never have to read the code, because you don't have to.",
    },
    browser: {
        index: "02",
        tab: "Live browser",
        title: "Beyond what an API can reach.",
        body: "Vendor portals, legacy back-ends, anything behind a login. The workspace performs the work click by click, on screen. Form filling, navigation, the whole shape of a manual flow.",
    },
    report: {
        index: "03",
        tab: "Reports & analysis",
        title: "Your business, askable.",
        body: "The workspace reads across every system you've connected and packs the answer into a PDF or a spreadsheet, in the shape the rest of the company already expects.",
    },
};

export default function Capabilities() {
    const [lane, setLane] = useState<Lane>("code");

    return (
        <section
            id="capabilities"
            className="relative w-full bg-background-warm border-t border-divider min-w-xs overflow-hidden"
        >
            <div className="mx-auto max-w-[1280px] px-4 md:px-8 py-20 md:py-32">
                <div className="max-w-3xl">
                    <span className="duri-eyebrow">Capabilities</span>
                    <h2 className="mt-5 duri-section-title">
                        Every shape the work takes.
                    </h2>
                </div>

                <div
                    role="tablist"
                    aria-label="Capability modes"
                    className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-3 border border-on-background bg-background"
                >
                    {LANE_ORDER.map((l, i) => {
                        const meta = LANE_META[l];
                        const isActive = lane === l;
                        const sep =
                            i < LANE_ORDER.length - 1
                                ? "border-b sm:border-b-0 sm:border-r border-divider-strong"
                                : "";
                        return (
                            <button
                                key={l}
                                role="tab"
                                aria-selected={isActive}
                                type="button"
                                onClick={() => setLane(l)}
                                className={`relative px-5 py-4 sm:py-5 text-left transition-colors duration-200 ${sep} ${
                                    isActive
                                        ? "bg-on-background text-on-brand"
                                        : "bg-background hover:bg-background-warm text-on-background"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`font-mono text-[12px] tracking-wider ${
                                            isActive
                                                ? "text-on-brand-secondary"
                                                : "text-on-background-secondary"
                                        }`}
                                    >
                                        {meta.index}
                                    </span>
                                    <span className="text-[14px] md:text-[15px] font-medium">
                                        {meta.tab}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>

                <div className="border-x border-b border-on-background bg-background">
                    <div className="grid grid-cols-1 lg:grid-cols-[7fr_8fr]">
                        <div className="p-7 md:p-10 lg:border-r border-divider-strong">
                            <h3 className="text-[24px] md:text-[32px] leading-[1.1] tracking-[-0.018em] text-on-background">
                                {LANE_META[lane].title}
                            </h3>
                            <p className="mt-5 text-[15px] leading-relaxed text-on-background-secondary max-w-prose">
                                {LANE_META[lane].body}
                            </p>
                        </div>

                        <div
                            key={lane}
                            className="p-5 md:p-8 bg-background-warm/60 border-t lg:border-t-0 border-divider-strong"
                        >
                            <div className="duri-fade-up">
                                {lane === "code" && <CodeOutcomesVisual />}
                                {lane === "browser" && <BrowserVisual />}
                                {lane === "report" && <ReportVisual />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const base = import.meta.env.BASE_URL;

/** Lane 1 — Code outcomes. We don't show the code itself; the workspace
 *  hides the program and surfaces what changed across systems instead. */
function CodeOutcomesVisual() {
    const rows = [
        {
            logo: `${base}logos/third_party/quickbooks.svg`,
            system: "QuickBooks",
            label: "Created 12 invoices",
            detail: "matched customer, line items, tax",
        },
        {
            logo: `${base}logos/third_party/shopify.svg`,
            system: "Shopify",
            label: "Marked 12 orders fulfilled",
            detail: "tracking numbers attached",
        },
        {
            logo: `${base}logos/third_party/excel.svg`,
            system: "Excel",
            label: "Updated 28 SKUs",
            detail: "inventory file synced",
        },
        {
            logo: `${base}logos/third_party/gmail.svg`,
            system: "Gmail",
            label: "Sent 12 receipts",
            detail: "delivered, no bounces",
        },
    ];
    return (
        <div className="border border-on-background rounded-xs bg-background overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-divider bg-background-warm">
                <div className="inline-flex items-center gap-2 text-[11.5px] text-on-background-secondary">
                    <CircleDotIcon className="w-3 h-3 text-brand animate-pulse" />
                    <span className="uppercase tracking-wider text-[10.5px]">Done in the background</span>
                </div>
                <div className="text-[10.5px] uppercase tracking-wider text-on-background-secondary">
                    4 systems
                </div>
            </div>
            <ul className="divide-y divide-divider">
                {rows.map((r) => (
                    <li
                        key={r.label}
                        className="flex items-center justify-between gap-3 px-4 py-3"
                    >
                        <div className="flex items-start gap-3 min-w-0">
                            <CheckCircle2Icon className="w-4 h-4 mt-0.5 text-brand flex-none" />
                            <div className="min-w-0">
                                <div className="text-[13px] text-on-background truncate">{r.label}</div>
                                <div className="text-[11.5px] text-on-background-secondary truncate">
                                    {r.detail}
                                </div>
                            </div>
                        </div>
                        <div className="inline-flex items-center gap-1.5 border border-divider-strong rounded-xs px-1.5 py-0.5 bg-background flex-none">
                            <img src={r.logo} alt="" aria-hidden className="w-3.5 h-3.5 object-contain" />
                            <span className="text-[10.5px] text-on-background-secondary">{r.system}</span>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="border-t border-divider bg-brand-soft/60 px-4 py-2.5 text-[11.5px] text-on-background flex items-center gap-2">
                <CheckCircle2Icon className="w-3.5 h-3.5 text-brand" />
                You don't read the code. The workspace ran it for you.
            </div>
        </div>
    );
}

function BrowserVisual() {
    return (
        <div className="border border-on-background rounded-xs bg-background overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-divider bg-background-warm">
                <div className="flex items-center gap-1">
                    <span className="block w-2 h-2 rounded-full bg-[#e15c5c]" />
                    <span className="block w-2 h-2 rounded-full bg-[#e0a93b]" />
                    <span className="block w-2 h-2 rounded-full bg-[#5fb96a]" />
                </div>
                <div className="flex-1 flex items-center gap-1.5 bg-background border border-divider rounded-xs px-2 py-1">
                    <GlobeIcon className="w-3 h-3 text-on-background-secondary" />
                    <span className="text-[10.5px] text-on-background-secondary truncate">
                        portal.vendor.example / orders / 4823
                    </span>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-on-background border border-divider-strong px-1.5 py-0.5 bg-background">
                    <CircleDotIcon className="w-2.5 h-2.5 text-brand animate-pulse" />
                    Driving
                </span>
            </div>

            <div className="grid grid-cols-[140px_1fr] min-h-[240px]">
                <aside className="border-r border-divider bg-background-warm/60 px-3 py-3 hidden sm:block">
                    <div className="text-[9.5px] uppercase tracking-wider text-on-background-secondary mb-2">
                        Orders
                    </div>
                    <ul className="space-y-1.5 text-[11px] text-on-background-secondary">
                        {["All", "Unfulfilled", "Unpaid", "Open", "Closed"].map((label, i) => (
                            <li
                                key={label}
                                className={i === 1 ? "text-on-background font-medium" : ""}
                            >
                                {label}
                            </li>
                        ))}
                    </ul>
                </aside>

                <div className="px-4 py-3 relative">
                    <div className="flex items-center justify-between mb-3">
                        <div className="text-[12.5px] font-medium text-on-background">Order #4823</div>
                        <div className="text-[10px] text-on-background-secondary uppercase tracking-wider">
                            Awaiting
                        </div>
                    </div>
                    <div className="border border-divider">
                        {[
                            { sku: "DRP-12oz", name: "House drip, 12oz bag", qty: "2" },
                            { sku: "ESP-08oz", name: "Espresso blend, 8oz", qty: "1" },
                            { sku: "—", name: "Custom roast, single", qty: "1" },
                        ].map((row, i) => (
                            <div
                                key={row.name}
                                className={`grid grid-cols-[64px_1fr_28px] gap-2 px-3 py-1.5 text-[11.5px] ${
                                    i < 2 ? "border-b border-divider" : ""
                                } ${row.sku === "—" ? "bg-brand-soft" : "bg-background"}`}
                            >
                                <span className="font-mono text-on-background-secondary">{row.sku}</span>
                                <span className="text-on-background">{row.name}</span>
                                <span className="text-on-background-secondary text-right">{row.qty}</span>
                            </div>
                        ))}
                    </div>

                    <div
                        className="pointer-events-none absolute"
                        style={{ top: "104px", left: "180px" }}
                        aria-hidden
                    >
                        <MousePointer2Icon
                            className="w-4 h-4 text-on-background drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)]"
                            fill="currentColor"
                        />
                        <div className="mt-1 ml-2.5 inline-flex items-center gap-1.5 bg-on-background text-on-brand text-[10px] px-2 py-0.5 rounded-xs whitespace-nowrap">
                            <span className="block w-1 h-1 bg-brand" />
                            Filling SKU on row 3
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between border-t border-divider bg-background-warm px-3 py-2 text-[11px] text-on-background-secondary">
                <span className="uppercase tracking-wider">Step 4 of 7</span>
                <span className="inline-flex items-center gap-1.5 border border-on-background rounded-xs px-2 py-0.5 text-on-background bg-background">
                    <PauseIcon className="w-3 h-3" />
                    Pause
                </span>
            </div>
        </div>
    );
}

/** Lane 3 — packaged report (PDF + CSV) instead of a dashboard. We
 *  stack a faux PDF cover with a few summary lines and a small CSV
 *  attachment chip beside it, expressing "this packs into the formats
 *  the rest of the company expects". */
function ReportVisual() {
    return (
        <div className="flex flex-col gap-3">
            {/* PDF document */}
            <div className="border border-on-background rounded-xs bg-background overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-divider bg-background-warm">
                    <div className="inline-flex items-center gap-2 text-[11px] text-on-background-secondary">
                        <FileTextIcon className="w-3.5 h-3.5" />
                        <span className="font-mono text-[10.5px]">october_close.pdf</span>
                    </div>
                    <span className="text-[10.5px] uppercase tracking-wider text-on-background-secondary">
                        14 pages
                    </span>
                </div>
                <div className="px-5 py-5">
                    <div className="text-[10px] uppercase tracking-wider text-on-background-secondary">
                        October close
                    </div>
                    <div className="mt-1 text-[18px] tracking-[-0.012em] leading-tight text-on-background">
                        Where margin went, in plain English.
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-3 text-[11px]">
                        <div>
                            <div className="text-on-background-secondary">Top vendor</div>
                            <div className="text-on-background font-medium mt-0.5">Vendor A · $24,180</div>
                        </div>
                        <div>
                            <div className="text-on-background-secondary">Late invoices</div>
                            <div className="text-on-background font-medium mt-0.5">4 over 14 days</div>
                        </div>
                        <div>
                            <div className="text-on-background-secondary">Inventory off</div>
                            <div className="text-on-background font-medium mt-0.5">12 SKUs</div>
                        </div>
                    </div>
                    <div className="mt-4 flex items-end gap-1 h-7">
                        {[60, 52, 46, 38, 32, 24, 18].map((h, i) => (
                            <div
                                key={i}
                                className="flex-1 bg-on-background"
                                style={{ height: `${h}%` }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* CSV attachment + question chip */}
            <div className="flex flex-wrap gap-1.5 text-[11.5px]">
                <span className="inline-flex items-center gap-1.5 border border-divider-strong rounded-xs px-2 py-1 bg-background text-on-background">
                    <FileSpreadsheetIcon className="w-3.5 h-3.5 text-on-background-secondary" />
                    <span className="font-mono text-[10.5px] text-on-background-secondary">
                        margin_by_day.csv
                    </span>
                </span>
                <span className="inline-flex items-center border border-divider-strong rounded-xs px-2 py-1 bg-background text-on-background-secondary">
                    Read from 4 systems
                </span>
                <span className="inline-flex items-center border border-divider-strong rounded-xs px-2 py-1 bg-background text-on-background">
                    Accounting
                </span>
                <span className="inline-flex items-center border border-divider-strong rounded-xs px-2 py-1 bg-background text-on-background">
                    Inventory
                </span>
                <span className="inline-flex items-center border border-divider-strong rounded-xs px-2 py-1 bg-background text-on-background">
                    Storefront
                </span>
            </div>
        </div>
    );
}
