export default function Footer() {
    return (
        <footer className="w-full bg-brand-variant text-on-brand min-w-xs">
            <div className="mx-auto max-w-[1280px] px-4 md:px-8 py-10">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <a href="/" aria-label="Duri home" className="inline-flex items-center">
                        <img
                            src={`${import.meta.env.BASE_URL}logos/duri_white.svg`}
                            alt="Duri"
                            className="h-[18px] w-auto opacity-95"
                        />
                    </a>

                    <nav className="flex items-center gap-6 text-[13.5px]">
                        <a
                            href="/privacy"
                            className="text-on-brand-secondary hover:text-on-brand transition-colors"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="/eula"
                            className="text-on-brand-secondary hover:text-on-brand transition-colors"
                        >
                            EULA
                        </a>
                    </nav>

                    <p className="text-[12px] text-on-brand-secondary">
                        © {new Date().getFullYear()} Duri.
                    </p>
                </div>
            </div>
        </footer>
    );
}
