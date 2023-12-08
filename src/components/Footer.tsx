export default function Footer() {
  return (
    <footer className="container">
      <hr className="mb-4"/>

      <div className="flex flex-col md:flex-row justify-between py-6 text-md text-slate-600">
        <div className="mb-4 md:mb-0">
          <a
            className="flex mb-3 mr-4 underline"
            href="https://github.com/makaroni4/lingo-email">
            <img className="w-4 mr-2" src="./github.svg" alt="Github repo" />Source Code
          </a>
          <a
            className="block underline"
            href="https://github.com/makaroni4/lingo-email/issues">Feedback</a>
        </div>

        <div>
          Made with ❤️ by <a className="underline" href="https://twitter.com/makaroni4">Anatoli Makarevich</a>
        </div>
      </div>
    </footer>
  )
}
