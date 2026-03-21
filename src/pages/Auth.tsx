function Auth() {
    return (
        <div className="grid min-h-dvh w-full grid-cols-1 md:grid-cols-[1fr_1fr]">
            <div className="relative z-10 mx-auto flex w-full max-w-[500px] flex-col items-center justify-center bg-background px-8">
                <header className="absolute top-9 left-9">
                    <img alt="Duri Text Logo" loading="lazy" src="/logos/duri.svg" className="w-[50px] h-auto" />
                </header>
                <div className="flex min-h-dvh w-full flex-col items-center bg-background">
                    <div className="flex h-full w-full flex-col items-center justify-center">
                        <section className="w-full rounded-sm bg-background">
                            <h1 className="mb-4 text-xl font-medium text-on-background">Welcome!</h1>
                            <form className="flex flex-col gap-y-6" name="login">
                                <label htmlFor="email" className="">
                                    <div className="mb-1 flex justify-between text-xs text-on-background-secondary">Email
                                        {/* <a className="text-xs" href="/reset-password">Forgot password?</a> */}
                                    </div>
                                    <input className="border-on-background-secondary bg-background placeholder:text-on-background-secondary flex h-10 w-full rounded-sm border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50" data-testid="sign-in-email-input" type="email" name="email" placeholder="your_business@gmail.com" />
                                </label>
                                <button className="gap-2 cursor-pointer items-center justify-center whitespace-nowrap text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-80 flex rounded-sm border border-brand bg-brand text-on-brand hover:bg-brand-variant h-10 px-4 py-2" type="submit" data-testid="sign-in-email-submit-button">Continue</button>
                                <div className="text-center text-xs">Don't have an account?
                                    <a className="text-highlight" href="/">{" "}Request a Demo</a>
                                </div>
                            </form>
                            <footer className="mt-4 max-w-[600px] text-center text-xs text-on-background-secondary">By continuing, you agree to Duri’s
                                {/* TODO: Update href */}
                                <a target="_blank" className="underline" href="#">{" "}Terms of Service</a> with
                                {/* TODO: Update href */}
                                <a target="_blank" className="underline" href="#">{" "}Privacy Policy</a> and to receive periodic emails with updates.
                            </footer>
                        </section>
                    </div>
                </div>
            </div>
            <div className="z-0 hidden flex-col overflow-hidden md:flex">
                <div className="relative flex flex-1 bg-cover bg-center" style={{ backgroundImage: "url(/get-started-assets/grid-background.svg)" }}>
                    <div className="flex flex-1 flex-col items-start justify-end px-8 py-12 lg:px-12" style={{ maxWidth: "720px" }}>
                        <div className="flex flex-col gap-8 pb-10">
                            <div>
                                <h2 className="text-left text-xl font-medium text-gray-900">Browserbase is trusted at scale.</h2>
                                <p className="mt-2 text-left text-sm text-gray-500">All manual tasks on the web can now be automated with AI.</p>
                            </div>
                            <div>
                                <p className="mb-3 text-left text-sm text-gray-500">Trusted by teams at</p>
                                <div className="flex max-w-[280px] flex-wrap items-center justify-start gap-x-4 gap-y-3 lg:max-w-none lg:gap-x-6">
                                    <img src="/get-started-assets/logos/microsoft.svg" alt="Microsoft" className="h-4 w-auto max-w-[80px] opacity-70 grayscale transition-opacity hover:opacity-100 lg:h-5 lg:max-w-[100px] " />
                                    <img src="/get-started-assets/logos/vercel.svg" alt="Vercel" className="h-4 w-auto max-w-[80px] opacity-70 grayscale transition-opacity hover:opacity-100 lg:h-5 lg:max-w-[100px] scale-[0.8]" />
                                    <img src="/get-started-assets/logos/perplexity.svg" alt="Perplexity" className="h-4 w-auto max-w-[80px] opacity-70 grayscale transition-opacity hover:opacity-100 lg:h-5 lg:max-w-[100px] " />
                                    <img src="/get-started-assets/logos/vanta.svg" alt="Vanta" className="h-4 w-auto max-w-[80px] opacity-70 grayscale transition-opacity hover:opacity-100 lg:h-5 lg:max-w-[100px] " />
                                    <img src="/get-started-assets/logos/commure.svg" alt="Commure" className="h-4 w-auto max-w-[80px] opacity-70 grayscale transition-opacity hover:opacity-100 lg:h-5 lg:max-w-[100px] " />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-1/2 right-0 left-0 flex -translate-y-1/2 justify-start px-8 lg:px-12" style={{ maxWidth: "720px", marginTop: "-100px" }}>
                        <img src="/get-started-assets/browserbase-diagram.svg" alt="Browserbase automation illustration" className="w-full max-w-2xl" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth;