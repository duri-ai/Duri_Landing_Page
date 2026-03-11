
function App() {

  return (
    <>
      {/* Navigation */}
      <nav className="bg-background fixed w-full z-20 top-0 border-b border-divider">
        <div className="flex items-center justify-between p-4 md:py-0 md:px-8">

          <a href="/" className="flex items-center gap-3">
            <img src="/logos/d.svg" className="h-8" alt="Duri Logo" />
            <img src="/logos/duri.svg" className="h-4" alt="Duri Logo" />
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
      </nav >

      <div className="w-full h-[500vh]"></div>
    </>
  )
}

export default App
