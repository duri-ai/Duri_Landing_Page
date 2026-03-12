
function App() {

  return (
    <>
      {/* Navigation */}
      <nav className="bg-background fixed w-full z-20 top-0 border-b border-divider min-w-xs">
        <div className="flex items-center justify-between p-4 md:py-0 md:px-8">

          <a href="/">
            <img src="/logos/duri.svg" className="h-5" alt="Duri Logo" />
          </a >

          <div className="inline-flex items-center gap-3 md:py-4">
            {/* TODO: Update href */}
            <a href="/" className="text-on-background font-normal text-sm hover:opacity-70">Log in</a>

            {/* TODO: Update href */}
            <a href="/">
              <button type="button" className="text-on-brand bg-brand hover:bg-transparent hover:text-brand box-border border-2 border-transparent hover:border-brand font-normal leading-5 rounded-xs text-sm px-3 py-[5px] md:px-5 md:py-2.5 focus:outline-none transition-colors duration-500 cursor-pointer">Sign Up</button>
            </a>
          </div>

        </div>
      </nav>

      <div className="w-full mt-[67px] md:mt-[77px] min-w-xs relative">
        <div className="absolute inset-0 bg-size-[105px_105px] bg-[linear-gradient(90deg,rgba(0,0,0,.55)_1px,transparent_0),linear-gradient(180deg,rgba(0,0,0,.55)_1px,transparent_0)] opacity-10 z-5" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#fff,transparent)] z-10" />
        <div className="w-full p-5 flex flex-col justify-center items-center text-center relative z-15">
          <div className="mb-11.25">Introducing the Fetch API: One call to pull data from any URL</div>
          <img src="/logos/d.svg" className="h-8" alt="Duri Logo" />
          <h1>We help AI use the web.</h1>
          <p className="mt-3.75">Autonomously read, write, and perform tasks on the web with a headless browser.</p>
        </div>
      </div>
    </>
  )
}

export default App
