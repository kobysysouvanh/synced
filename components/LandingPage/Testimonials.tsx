const Testimonials = () => {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Loved by couples everywhere
          </h2>
          <p className="mt-3 text-slate-600">
            Real stories from people staying in sync.
          </p>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-300 transition-colors">
            <div className="flex items-center gap-3">
              <img
                className="h-10 w-10 rounded-full ring-2 ring-slate-100 object-cover"
                src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=128&auto=format&fit=crop"
                alt=""
              />
              <div>
                <p className="text-sm font-semibold tracking-tight text-slate-900">
                  Maya & Eli
                </p>
                <p className="text-xs text-slate-500">Long distance</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-700">
              We ditched our messy notes and chats. Synced keeps our plans and
              memories together effortlessly.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-300 transition-colors">
            <div className="flex items-center gap-3">
              <img
                className="h-10 w-10 rounded-full ring-2 ring-slate-100 object-cover"
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=128&auto=format&fit=crop"
                alt=""
              />
              <div>
                <p className="text-sm font-semibold tracking-tight text-slate-900">
                  Sam & Jordan
                </p>
                <p className="text-xs text-slate-500">New city</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-700">
              The places list is our favorite—every date night is a breeze now.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-300 transition-colors">
            <div className="flex-center gap-3">
              <img
                className="h-10 w-10 rounded-full ring-2 ring-slate-100 object-cover"
                src="https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?q=80&w=128&auto=format&fit=crop"
                alt=""
              />
              <div>
                <p className="text-sm font-semibold tracking-tight text-slate-900">
                  Ava & Noor
                </p>
                <p className="text-xs text-slate-500">3 years</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-700">
              We love the shared gallery and countdowns. It’s our little home on
              the internet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
