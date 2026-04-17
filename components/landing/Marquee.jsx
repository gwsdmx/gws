const ITEMS = ['Retail & Comercio','Sistemas Médicos','Talleres Automotrices','Eventos & Check-in','Gobierno e Instituciones','E-Commerce','Control de Inventario','Plataformas a Medida']
export default function Marquee() {
  const rep = [...ITEMS,...ITEMS,...ITEMS,...ITEMS]
  return (
    <div className="overflow-hidden bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 py-3.5">
      <div className="flex w-max" style={{animation:'marqueeScroll 25s linear infinite'}}>
        {rep.map((item,i)=>(
          <div key={i} className="flex items-center gap-3 px-7 text-white/80 text-xs font-semibold whitespace-nowrap tracking-wide">
            {item}<span className="text-white/30 text-sm">·</span>
          </div>
        ))}
      </div>
      <style>{`@keyframes marqueeScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  )
}
