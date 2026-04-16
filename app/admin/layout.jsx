import Sidebar from '@/components/admin/Sidebar'
export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-6 sm:p-8 overflow-auto">{children}</main>
    </div>
  )
}
