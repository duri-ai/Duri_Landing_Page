import { useEffect, useState } from "react";

const LANGUAGES = [
    "English.",
    "한국어.",
    "Español.",
    "中文.",
    "日本語.",
    "Français.",
    "Português.",
    "Deutsch.",
];

const HOLD_MS = 1900;

/**
 * Vertical-roulette word that cycles through languages. The active word
 * is rendered absolutely over an invisible sizer; on each change React
 * unmounts the previous word (`key` is the language string) and mounts
 * a fresh one that runs a single CSS enter animation. The previous
 * word disappears in one frame, so there is never a moment when two
 * languages overlap. Descenders aren't clipped because we don't mask
 * the box at all.
 */
export default function LanguageRoulette() {
    const [active, setActive] = useState(0);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) return;
        const id = window.setInterval(() => {
            setActive((a) => (a + 1) % LANGUAGES.length);
        }, HOLD_MS);
        return () => window.clearInterval(id);
    }, []);

    const activeWord = LANGUAGES[active];

    return (
        <span className="duri-roulette" aria-label={activeWord}>
            <span className="duri-roulette__sizer" aria-hidden>
                {activeWord}
            </span>
            <span
                key={activeWord}
                aria-hidden
                className="duri-roulette__word"
            >
                {activeWord}
            </span>
        </span>
    );
}
