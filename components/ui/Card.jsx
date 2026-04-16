import { cn } from '@/lib/utils'
export default function Card({ children, className, ...props }) {
  return <div className={cn('bg-white rounded-2xl border border-slate-200 shadow-sm', className)} {...props}>{children}</div>
}
