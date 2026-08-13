export function BorderAnimatedContainer({children}){
  return <div className="w-full h-full rounded-2xl border border-transparent animate-border  flex overflow-hidden">
      {children}
    </div>
}