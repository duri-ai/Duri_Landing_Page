import { useEffect, useRef, useState } from "react";
import {
    BoxIcon,
    Code2Icon,
    FileSpreadsheetIcon,
    FileTextIcon,
    FileTypeIcon,
    GlobeIcon,
    MousePointer2Icon,
    SearchIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

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
        tab: "Auto Scripting",
        title: "An AI developer, working on your behalf.",
        body: "When the work doesn't fit a template, the workspace writes the code, runs it in a private sandbox, and shows you what changed across your systems. You never have to read the code, because you don't have to.",
    },
    browser: {
        index: "02",
        tab: "Live Browser",
        title: "Beyond what an API can reach.",
        body: "Vendor portals, legacy back-ends, anything behind a login. The workspace performs the work click by click, on screen. Form filling, navigation, the whole shape of a manual flow.",
    },
    report: {
        index: "03",
        tab: "Report & Analysis",
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

type CellOutput =
    | { kind: "text"; value: string }
    | {
          kind: "table";
          columns: string[];
          rows: string[][];
      }
    | { kind: "status"; value: string };

type Cell = {
    code: string[];
    output: CellOutput;
};

const NOTEBOOK_TOPIC = "Inventory sync";

const NOTEBOOK_CELLS: Cell[] = [
    {
        code: ["orders = shopify.fetch(today=True)", "orders.count()"],
        output: { kind: "text", value: "12" },
    },
    {
        code: ["deltas = compute_deltas(orders)", "deltas.head()"],
        output: {
            kind: "table",
            columns: ["sku", "qty", "delta"],
            rows: [
                ["DRP-12oz", "2", "-2"],
                ["ESP-08oz", "1", "-1"],
                ["RST-008", "1", "-1"],
                ["BLD-04oz", "4", "-4"],
            ],
        },
    },
    {
        code: ['sheet.update("inventory", deltas)'],
        output: { kind: "status", value: "Inventory synced · 12 SKUs adjusted" },
    },
];

const TYPING_BASE_MS = 18;
const TYPING_JITTER_MS = 22;
const NEWLINE_PAUSE_MS = 200;
const OUTPUT_REVEAL_MS = 320;
const NEXT_CELL_MS = 1100;
const LOOP_HOLD_MS = 3200;

type CellState = {
    typed: string[];
    outputShown: boolean;
};

/** Lane 1 — Auto Scripting. Mimics a Jupyter-style notebook. The
 *  workspace types a small block of code at the top, the data output
 *  appears beneath it, and the next cell starts. Cells stack upwards
 *  so the visitor watches the notebook fill itself in. */
function CodeOutcomesVisual() {
    const [active, setActive] = useState(0);
    const [cellStates, setCellStates] = useState<Map<number, CellState>>(
        () => new Map(),
    );
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        let cancelled = false;
        let timer: number | null = null;
        const cell = NOTEBOOK_CELLS[active];

        // On a new cycle, drop everything past (and including) the active cell
        setCellStates((prev) => {
            const next = new Map(prev);
            for (let i = active; i < NOTEBOOK_CELLS.length; i += 1) next.delete(i);
            next.set(active, { typed: [""], outputShown: false });
            return next;
        });

        let lineIdx = 0;
        let charIdx = 0;
        const lines: string[] = [""];

        const update = (typed: string[], outputShown: boolean) => {
            setCellStates((prev) => {
                const next = new Map(prev);
                next.set(active, { typed, outputShown });
                return next;
            });
        };

        const tick = () => {
            if (cancelled) return;
            const full = cell.code[lineIdx];
            if (charIdx < full.length) {
                charIdx += 1;
                lines[lineIdx] = full.slice(0, charIdx);
                update([...lines], false);
                timer = window.setTimeout(
                    tick,
                    TYPING_BASE_MS + Math.random() * TYPING_JITTER_MS,
                );
            } else if (lineIdx < cell.code.length - 1) {
                lineIdx += 1;
                charIdx = 0;
                lines.push("");
                update([...lines], false);
                timer = window.setTimeout(tick, NEWLINE_PAUSE_MS);
            } else {
                timer = window.setTimeout(() => {
                    if (cancelled) return;
                    update([...lines], true);
                    if (active < NOTEBOOK_CELLS.length - 1) {
                        timer = window.setTimeout(() => {
                            if (cancelled) return;
                            setActive(active + 1);
                        }, NEXT_CELL_MS);
                    } else {
                        // Hold the completed notebook before resetting
                        timer = window.setTimeout(() => {
                            if (cancelled) return;
                            setCellStates(new Map());
                            setActive(0);
                        }, LOOP_HOLD_MS);
                    }
                }, OUTPUT_REVEAL_MS);
            }
        };

        timer = window.setTimeout(tick, 240);
        timerRef.current = timer;

        return () => {
            cancelled = true;
            if (timer) window.clearTimeout(timer);
        };
    }, [active]);

    return (
        <div className="border border-on-background rounded-xs bg-background overflow-hidden">
            {/* Notebook header: just the topic, no chrome */}
            <div className="flex items-center gap-2 px-3.5 py-2 border-b border-divider bg-on-background text-on-brand">
                <Code2Icon className="w-3.5 h-3.5" />
                <span className="font-mono text-[11px]">{NOTEBOOK_TOPIC}</span>
            </div>

            <div className="divide-y divide-divider">
                {NOTEBOOK_CELLS.map((cell, i) => {
                    const state = cellStates.get(i);
                    if (!state) return null;
                    const isTypingCell = i === active && !state.outputShown;
                    return (
                        <NotebookCell
                            key={i}
                            index={i}
                            cell={cell}
                            typed={state.typed}
                            outputShown={state.outputShown}
                            isTyping={isTypingCell}
                        />
                    );
                })}
            </div>
        </div>
    );
}

function NotebookCell({
    index,
    cell,
    typed,
    outputShown,
    isTyping,
}: {
    index: number;
    cell: Cell;
    typed: string[];
    outputShown: boolean;
    isTyping: boolean;
}) {
    const promptNumber = index + 1;
    return (
        <div className="px-3.5 py-3">
            {/* Code block (terminal-styled) */}
            <div className="flex gap-2.5 items-start">
                <span className="font-mono text-[10.5px] text-on-background-secondary pt-0.5 select-none">
                    In [{promptNumber}]
                </span>
                <pre className="flex-1 px-3 py-2 bg-on-background text-on-brand rounded-xs font-mono text-[10.5px] leading-[1.55] whitespace-pre overflow-x-auto">
                    {typed.map((line, j) => {
                        const isLast = j === typed.length - 1;
                        return (
                            <div key={j}>
                                {line}
                                {isTyping && isLast && (
                                    <span className="duri-typing-caret" aria-hidden />
                                )}
                            </div>
                        );
                    })}
                </pre>
            </div>

            {/* Output block, revealed after typing finishes */}
            {outputShown && (
                <div className="duri-fade-up flex gap-2.5 items-start mt-1.5">
                    <span className="font-mono text-[10.5px] text-on-background-secondary pt-0.5 select-none">
                        Out[{promptNumber}]
                    </span>
                    <div className="flex-1 min-w-0">
                        <CellOutputView output={cell.output} />
                    </div>
                </div>
            )}
        </div>
    );
}

function CellOutputView({ output }: { output: CellOutput }) {
    if (output.kind === "text") {
        return (
            <div className="font-mono text-[11.5px] text-on-background">
                {output.value}
            </div>
        );
    }

    if (output.kind === "status") {
        return (
            <div className="inline-flex items-center gap-1.5 text-[12px]">
                <span
                    className="inline-flex w-3.5 h-3.5 items-center justify-center bg-brand text-on-brand rounded-xs flex-none"
                    aria-hidden
                >
                    <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none">
                        <path
                            d="M2.5 6.5L5 9L9.5 3.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
                <span className="text-on-background">{output.value}</span>
            </div>
        );
    }

    // table
    return (
        <div className="border border-divider-strong inline-block max-w-full overflow-hidden">
            <table className="font-mono text-[10.5px] border-collapse">
                <thead>
                    <tr className="bg-background-warm">
                        {output.columns.map((c) => (
                            <th
                                key={c}
                                className="text-left text-on-background-secondary uppercase tracking-wider font-medium px-2.5 py-1 border-b border-divider"
                            >
                                {c}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {output.rows.map((row, ri) => (
                        <tr
                            key={ri}
                            className={ri < output.rows.length - 1 ? "border-b border-divider" : ""}
                        >
                            {row.map((cell, ci) => (
                                <td
                                    key={ci}
                                    className="text-on-background px-2.5 py-1"
                                >
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
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
            </div>

            <div className="grid grid-cols-[160px_1fr] min-h-[260px]">
                <aside className="border-r border-divider bg-background-warm/60 hidden sm:flex sm:flex-col">
                    {/* Faux SaaS brand header */}
                    <div className="flex items-center gap-2 px-3 py-2.5 border-b border-divider bg-background">
                        <span
                            className="inline-flex items-center justify-center w-6 h-6 bg-on-background text-on-brand rounded-xs"
                            aria-hidden
                        >
                            <BoxIcon className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-[12px] text-on-background font-semibold">
                            Vendor Portal
                        </span>
                    </div>

                    {/* Faux search */}
                    <div className="px-3 py-2 border-b border-divider">
                        <div className="flex items-center gap-1.5 border border-divider-strong rounded-xs bg-background px-2 py-1">
                            <SearchIcon className="w-3 h-3 text-on-background-secondary" />
                            <span className="text-[10px] text-on-background-secondary">Search</span>
                        </div>
                    </div>

                    {/* Section: Orders */}
                    <nav className="px-3 pt-2.5 pb-3">
                        <div className="text-[9.5px] uppercase tracking-wider text-on-background-secondary mb-1.5">
                            Orders
                        </div>
                        <ul className="space-y-0.5 text-[11px]">
                            {[
                                { label: "All", active: false },
                                { label: "Unfulfilled", active: true },
                                { label: "Unpaid", active: false },
                                { label: "Open", active: false },
                                { label: "Closed", active: false },
                            ].map((item) => (
                                <li
                                    key={item.label}
                                    className={`px-1.5 py-1 rounded-xs ${
                                        item.active
                                            ? "bg-divider/70 text-on-background font-medium"
                                            : "text-on-background-secondary"
                                    }`}
                                >
                                    {item.label}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                <div className="px-4 py-3 relative">
                    <div className="flex items-center justify-between mb-3">
                        <div className="text-[12.5px] font-medium text-on-background">Order #4823</div>
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

/** Lane 3 — packaged report (PDF + CSV) instead of a dashboard. We
 *  stack a faux PDF cover with a few summary lines and a small CSV
 *  attachment chip beside it, expressing "this packs into the formats
 *  the rest of the company expects". */
function ReportVisual() {
    return (
        <div className="flex flex-col gap-3">
            {/* PDF document */}
            <div className="border border-on-background rounded-xs bg-background overflow-hidden">
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

                    {/* Header band: report title + month-on-month delta */}
                    <div className="mt-1 flex items-baseline justify-between gap-3">
                        <div className="text-[15px] font-medium tracking-[-0.01em] leading-tight text-on-background">
                            Net margin
                        </div>
                        <div className="text-[12.5px] font-mono text-on-background">
                            $128,420
                            <span className="ml-1.5 text-[10.5px] text-brand">+8.4%</span>
                        </div>
                    </div>

                    {/* Stat row */}
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

                    {/* Mini bar chart with axis labels */}
                    <div className="mt-6">
                        <div className="text-[9.5px] uppercase tracking-wider text-on-background-secondary mb-1.5">
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

                    {/* Faux signature/disclaimer line */}
                    <div className="mt-5 flex items-center justify-between border-t border-divider pt-2 text-[9.5px] text-on-background-secondary">
                        <span>Confidential · Internal use</span>
                        <span className="font-mono">Page 1 / 14</span>
                    </div>
                </div>
            </div>

            {/* File-format attachments, three across so they sit on a
                single line at this lane width. */}
            <div className="flex flex-wrap gap-2 text-[11.5px]">
                <FileChip name="margin_by_day" ext="xlsx" />
                <FileChip name="october_close" ext="pdf" />
                <FileChip name="ops_report" ext="doc" />
            </div>
        </div>
    );
}
