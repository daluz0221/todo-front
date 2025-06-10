import { SideBar, TopMenu } from "@/components";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

      <main
        className={`flex antialiased bg-blue-400 min-h-screen w-full `}
      >
        <SideBar />
        <div className="w-full">
            <TopMenu />
            <div className="pl-8">
                {children}
            </div>
        </div>
      </main>

  );
}
