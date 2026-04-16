import { cn } from '@/lib/utils'
const colors = {
  blue:   'bg-blue-50 text-blue-700 border-blue-200',
  green:  'bg-green-50 text-green-700 border-green-200',
  violet: 'bg-violet-50 text-violet-700 border-violet-200',
  orange: 'bg-orange-50 text-orange-700 border-orange-200',
  slate:  'bg-slate-100 text-slate-600 border-slate-200',
}
export default function Badge({ children, color='blue', className }) {
  return <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border', colors[color]||colors.blue, className)}>{children}</span>
}
