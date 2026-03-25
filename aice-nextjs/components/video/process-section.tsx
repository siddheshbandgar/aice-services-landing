const process = [
  "Share the brand",
  "We shape the concepts",
  "You get videos that ship",
];

export function ProcessSection() {
  return (
    <section id="process" className="px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
      <div className="mx-auto max-w-7xl rounded-[2.25rem] border border-stone-800 bg-stone-900/60 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur sm:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-medium leading-[1.2] tracking-[-0.03em] text-stone-100 sm:text-4xl">
              Fast, simple, service-led.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {process.map((item, index) => (
              <div
                key={item}
                className="rounded-[1.5rem] border border-stone-800 bg-stone-800/50 px-5 py-4"
              >
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
                  0{index + 1}
                </p>
                <p className="mt-2 text-base font-medium leading-7 text-stone-200">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
