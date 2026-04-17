const ITEMS = ['Sistema POS','Control de Inventario','Sistema Médico','Check-in con QR','Tienda en Línea','App para Talleres','ERP Empresarial','Software a Medida']
export default function Marquee() {
  const rep = [...ITEMS,...ITEMS,...ITEMS,...ITEMS]
  return (
    <div className="overflow-hidden bg-[#0f0a1e] py-3.5 border-y border-white/5">
      <div className="flex w-max" style={{animation:'mqscroll 25s linear infinite'}}>
        {rep.map((item,i)=>(
          <div key={i} className="flex items-center gap-3 px-7 text-white/40 text-xs font-bold whitespace-nowrap tracking-wide uppercase">
            <span className="w-1 h-1 rounded-full bg-violet-500"/>
            {item}
          </div>
        ))}
      </div>
      <style>{`@keyframes mqscroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  )
}
