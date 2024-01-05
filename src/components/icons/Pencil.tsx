
export default function Pencil({ className, sizePx = 24 }: { sizePx?: number, className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width={sizePx} height={sizePx} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
  )
}