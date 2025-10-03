import Logo from "@/components/Logo";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
      <Logo/>
      {children}
    </div>
  );
}
