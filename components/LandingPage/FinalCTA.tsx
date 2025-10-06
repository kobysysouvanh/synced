import { Heart, Image as ImageIcon, MapPin, NotebookPen } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

const FinalCTA = () => {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 md:px-8 pb-16 md:pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_85%_20%,rgba(236,72,153,0.10),transparent_60%)]"></div>
          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                Build your shared space today
              </h3>
              <p className="mt-3 text-slate-600">
                Start free, invite your person, and make it your own.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button size={"lg"}>
                  <Heart /> <p>Create your shared space</p>
                </Button>

              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 blur-2xl bg-gradient-to-tr from-indigo-500/10 to-fuchsia-500/10 rounded-2xl"></div>
              <div className="relative rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-3">
                  <Image
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=128&auto=format&fit=crop"
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full ring-2 ring-slate-100 object-cover"
                    unoptimized={true}
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=128&auto=format&fit=crop"
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full ring-2 ring-slate-100 object-cover"
                    unoptimized={true}
                  />
                  <div className="rounded-full w-2 h-2 bg-emerald-500"/>
                  <span className="text-sm text-slate-600">Connected</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-lg border border-slate-200 p-3 text-xs text-slate-700">
                    <MapPin
                      className="w-4 h-4 text-indigo-600"
                    />
                    <p className="mt-1">Places</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-3 text-xs text-slate-700">
                    <ImageIcon
                      className="w-4 h-4 text-emerald-600"
                    />
                    <p className="mt-1">Gallery</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-3 text-xs text-slate-700">
                    <NotebookPen
                      className="w-4 h-4 text-fuchsia-600"
                    />
                    <p className="mt-1">Notes</p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-slate-500">
                  Everything you add is visible to both of you instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default FinalCTA;
