function FeedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-3xl mx-auto h-full flex flex-col">
      {/* <main className="size-full flex flex-col"> */}
      <main className="h-full flex flex-col">
        <header className="bg-codeleap-blue h-20 px-6 flex items-center justify-between">
          <h1 className="text-background font-bold text-2xl">
            CodeLeap Network
          </h1>
        </header>
        <div className="bg-background flex-1 p-6">{children}</div>
      </main>
    </div>
  );
}

export default FeedLayout;
