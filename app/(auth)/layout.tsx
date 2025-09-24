export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1
        className="font-bold text-4xl tracking-[.6em] text-neutral-900 text-center mb-10"
        style={{ textIndent: "0.6em" }}
      >
        SYNCED
      </h1>
      {children}
    </div>
  );
}
