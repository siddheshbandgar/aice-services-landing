type SiteFooterProps = {
  className?: string;
};

const COMPANY_ADDRESS = "8 The Green STE D, Dover, County of Kent, Delaware 19901";

export function SiteFooter({ className = "" }: SiteFooterProps) {
  return (
    <footer className={className}>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-2 pb-6 sm:flex-row sm:items-end sm:gap-6 sm:px-4">
        <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
          <p className="text-[1.6rem] font-medium leading-none tracking-[-0.04em] text-stone-100">
            <span className="font-serif">Coco</span>
            <span className="text-[#c47a3e]">.</span>
          </p>
          <address className="max-w-md text-sm not-italic leading-6 text-stone-500">
            {COMPANY_ADDRESS}
          </address>
        </div>
        <p className="text-sm text-stone-600">
          &copy; {new Date().getFullYear()} Coco Studios. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
