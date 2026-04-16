import { cn } from '@/lib/utils'
export default function Button({ children, variant='primary', size='md', className, ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary:  'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20',
    secondary:'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200',
    outline:  'border border-blue-600 text-blue-600 hover:bg-blue-50',
    danger:   'bg-red-600 hover:bg-red-700 text-white',
    ghost:    'text-slate-600 hover:bg-slate-100',
  }
  const sizes = { sm:'text-xs px-3 py-1.5', md:'text-sm px-5 py-2.5', lg:'text-base px-7 py-3.5' }
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props}>{children}</button>
}
