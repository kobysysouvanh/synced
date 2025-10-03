import Logo from "./Logo"

const Footer = () => {
  return (
    <footer className="relative">
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Logo/>
            <p className="mt-4 text-sm text-slate-600 max-w-md">A private shared space for couples: places to eat, photo gallery, notes, tasks, countdowns, and more—designed to keep you in sync.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-tight text-slate-900">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><a className="hover:text-slate-900" href="#">About</a></li>
              <li><a className="hover:text-slate-900" href="#">Privacy</a></li>
              <li><a className="hover:text-slate-900" href="#">Terms</a></li>
              <li><a className="hover:text-slate-900" href="#faq">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 pt-6">
          <p className="text-xs text-slate-500">© <span id="year"></span> Synced. All rights reserved.</p>
          <div className="text-xs text-slate-500">
            Built with ❤️ love for couples.
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer