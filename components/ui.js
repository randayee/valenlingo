import clsx from "clsx";

export function Card({ className, children }) {
  return (
    <div className={clsx("rounded-3xl bg-white p-6 shadow-sm", className)}>
      {children}
    </div>
  );
}

export function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
      {children}
    </span>
  );
}

export function Button({ className, ...props }) {
  return (
    <button
      className={clsx(
        "rounded-2xl px-5 py-3 font-bold shadow-sm transition active:scale-[0.99]",
        "bg-emerald-500 text-white hover:bg-emerald-600",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
}
