import { Check, Loader, CalendarClock, Image, NotebookPen, MapPin, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 md:px-8 pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"/>
              Private by default • For two
            </div>
            <h1 className="mt-6 text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900">
              Stay in sync with the person who matters most.
            </h1>
            <p className="mt-5 text-base md:text-lg text-slate-600">
              Synced is a shared home for your relationship—places to eat, a living photo gallery, notes, tasks, countdowns and more. All in one private space built for two.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3" id="cta">
              <Button  size="lg" onClick={() => window.location.href = '/sign-up'}>
                Get Synced
              </Button>
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
              <span>Join thousands of couples</span>
              <div className="h-3 w-px bg-slate-200"></div>
              <span>Cancel anytime</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-2xl bg-gradient-to-tr from-fuchsia-500/10 via-indigo-500/10 to-transparent blur-2xl"></div>
            <div className="relative rounded-2xl ring-1 ring-slate-200 bg-white p-4 md:p-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500/90"/>
                  <span className="text-sm text-slate-600">Your shared space</span>
                </div>

              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">

                <div className="rounded-xl border border-slate-200 bg-white p-4 hover:border-slate-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-indigo-600/15 text-indigo-600 ring-1 ring-inset ring-indigo-500/20 flex items-center justify-center">
                        <MapPin data-lucide="map-pin" className="w-4 h-4"/>
                      </div>
                      <span className="text-sm font-semibold tracking-tight text-slate-900">Places to eat</span>
                    </div>
                    <span className="text-[10px] text-slate-500">8 saved</span>
                  </div>
                  <div className="mt-3 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="truncate text-slate-700">Sora Sushi</span>
                      <span className="text-amber-500">★ 4.7</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="truncate text-slate-700">Luna Pasta Bar</span>
                      <span className="text-amber-500">★ 4.5</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-fuchsia-600/15 text-fuchsia-600 ring-1 ring-inset ring-fuchsia-500/20 flex items-center justify-center">
                      <NotebookPen data-lucide="notebook-pen" className="w-4 h-4"/>
                    </div>
                    <span className="text-sm font-semibold tracking-tight text-slate-900">Notes</span>
                  </div>
                  <p className="mt-3 text-xs text-slate-600 line-clamp-3">
                    Trip ideas: Lake weekend, moonlight cinema, ramen crawl. Remember to book tickets for Saturday’s show.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 hover:border-slate-300 transition-colors col-span-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-emerald-600/15 text-emerald-600 ring-1 ring-inset ring-emerald-500/20 flex items-center justify-center">
                      <Image data-lucide="image" className="w-4 h-4"/>
                    </div>
                    <span className="text-sm font-semibold tracking-tight text-slate-900">Photo gallery</span>
                    <span className="text-[10px] text-slate-500 ml-2">Shared • Auto-sync</span>
                  </div>
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    <img className="h-20 w-full rounded-lg object-cover ring-1 ring-slate-200" src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=400&auto=format&fit=crop" alt="gallery 1" />
                    <img className="h-20 w-full rounded-lg object-cover ring-1 ring-slate-200" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=400&auto=format&fit=crop" alt="gallery 2" />
                    <img className="h-20 w-full rounded-lg object-cover ring-1 ring-slate-200" src="https://images.unsplash.com/photo-1494883759339-0b042055a4ee?q=80&w=400&auto=format&fit=crop" alt="gallery 3" />
                    <img className="h-20 w-full rounded-lg object-cover ring-1 ring-slate-200" src="https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=400&auto=format&fit=crop" alt="gallery 4" />
                  </div>
                </div>
 
                <div className="rounded-xl border border-slate-200 bg-white p-4 hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-sky-600/15 text-sky-600 ring-1 ring-inset ring-sky-500/20 flex items-center justify-center">
                      <CheckCircle2 data-lucide="check-circle-2" className="w-4 h-4"/>
                    </div>
                    <span className="text-sm font-semibold tracking-tight text-slate-900">Shared tasks</span>
                  </div>
                  <ul className="mt-3 space-y-2 text-xs">
                    <li className="flex items-center gap-2 text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-500"/>
                      Book dinner for Friday
                    </li>
                    <li className="flex items-center gap-2 text-slate-700">
                      <Loader className="w-3.5 h-3.5 text-amber-500"/>
                      Order film tickets
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-violet-600/15 text-violet-600 ring-1 ring-inset ring-violet-500/20 flex items-center justify-center">
                      <CalendarClock data-lucide="calendar-clock" className="w-4 h-4"/>
                    </div>
                    <span className="text-sm font-semibold tracking-tight text-slate-900">Next date</span>
                  </div>
                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      <p className="text-xs text-slate-500">Saturday, 7:30 PM</p>
                      <p className="text-sm text-slate-800">Luna Pasta Bar</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-semibold tracking-tight text-slate-900">02d</p>
                      <p className="text-[10px] text-slate-500">12h 18m</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 rounded-lg bg-slate-50 ring-1 ring-inset ring-slate-200 p-3 text-xs text-slate-500">
                Tip: Invite your partner with a generated code. Everything stays private between you two.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};
export default Hero;
