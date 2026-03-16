import { useState, useEffect, useRef } from "react";

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const T = {
  en: {
    journalTag: "Artisan's Journal",
    appTitle: "The Soap Maker's Studio",
    brandPlaceholder: "Your Business Name",
    stats: ["Recipes","Batches","Curing"],
    saved: "✓ Saved",
    tabs: ["Recipe Creator","Batch Log","Cure Rack","Inventory","Testing","Cost Calc","Market"],
    export: "Export",
    exportCSV: "Download CSV",
    exportPDF: "Print / Save PDF",
    cancel: "Cancel", edit: "Edit", save: "Save", update: "Update", delete: "✕", add: "Add",
    // Recipe
    recipeTitle: "✦ Soap Recipe Creator",
    recipeTip: "Build and save your soap formulas. Each recipe card stores oils, lye data, additives, and notes so you can recreate your best batches every time.",
    soapName: "Soap Name", superfat: "Superfat %",
    oils: "Oils & Butters (with %)", additives: "Additives",
    essentialOils: "Essential Oils / Fragrance", notes: "Notes",
    saveRecipe: "Save Recipe", updateRecipe: "Update Recipe",
    noRecipes: "No recipes yet — create your first formula above.",
    oilsLabel: "Oils:", eoLabel: "EO:", additivesLabel: "Additives:",
    superfatLabel: "Superfat:",
    // Batch
    batchTitle: "◈ Soap Batch Log",
    batchTip: "Log every pour. Consistent documentation helps you replicate great batches and avoid repeating mistakes. Fill in as much as you can right after each batch.",
    date: "Date", batchNum: "Batch Number", batchSize: "Batch Size (oz/g)",
    mold: "Mold Used", lyeTemp: "Lye Temp °F", oilTemp: "Oil Temp °F",
    traceLevel: "Trace Level", ingredients: "Ingredients & Amounts",
    traceOpts: ["Light","Medium","Heavy","Very Heavy"],
    logBatch: "Log Batch", updateBatch: "Update Batch",
    noBatches: "No batches logged yet.",
    size: "Size:", moldLabel: "Mold:", trace: "Trace:", lye: "Lye:", oilsTemp: "Oils:",
    // Cure
    cureTitle: "◉ Cure Rack Tracker",
    cureTip: "Cold process soap needs 4–6 weeks to cure. Track each batch here so you never sell an under-cured bar. The status updates automatically based on today's date.",
    startCuring: "Start Curing", readyDate: "Ready Date", quantity: "Quantity (bars)",
    addRack: "Add to Rack", noRacking: "Your cure rack is empty.",
    colSoap: "Soap Name", colBatch: "Batch #", colStart: "Start", colReady: "Ready",
    colQty: "Qty", colStatus: "Status",
    statusCuring: "Curing", statusReady: "Ready!", statusDays: "d left",
    // Inventory
    invTitle: "▣ Ingredient Inventory",
    invTip: "Update this after every batch. When a row hits the reorder level it will highlight red. Use the supplier column to reorder fast.",
    ingredient: "Oil / Butter / Ingredient", type: "Type", supplier: "Supplier",
    qty: "Quantity", unit: "Unit", reorderAt: "Reorder At",
    addItem: "Add Item", noInventory: "No inventory items yet.",
    types: ["Oil","Butter","Lye","Fragrance","Colorant","Additive","Packaging","Other"],
    colIng: "Ingredient", colType: "Type", colSupplier: "Supplier",
    colQty: "Qty", colReorder: "Reorder At", colStat: "Status",
    ok: "OK", reorder: "Reorder",
    // Testing
    testTitle: "◇ Soap Testing",
    testTip: "Rate each soap after using it or getting feedback. A 5-star average across all qualities means a winning formula worth repeating!",
    testDate: "Test Date", lather: "Lather", hardness: "Hardness",
    moisturizing: "Moisturizing", scentStrength: "Scent Strength",
    feedback: "Customer Feedback", saveTest: "Save Test Results",
    noTests: "No test results recorded yet.",
    avg: "Avg:", scent: "Scent",
    // Cost
    costTitle: "◎ Cost Per Batch Calculator",
    costTip: "Know your true cost before setting prices. A healthy profit margin for handmade soap is typically 50–70%. Fill in all costs including your time!",
    barsPerBatch: "Bars Per Batch", ingCost: "Ingredient Cost ($)",
    packCost: "Packaging Cost ($)", labor: "Labor / Other ($)",
    sellPrice: "Sale Price Per Bar ($)",
    totalCost: "Total Cost", costPerBar: "Cost Per Bar", profitMargin: "Profit Margin",
    saveCost: "Save Cost Record", noCosts: "No cost records yet.",
    colSoap2:"Soap", colBatch2:"Batch", colBars:"Bars", colIng2:"Ingredients",
    colPack:"Packaging", colLabor:"Labor", colTotal:"Total",
    colPerBar:"$/Bar", colSell:"Sell", colMargin:"Margin",
    // Market
    marketTitle: "◆ Market & Inventory Tracker",
    marketTip: "Track what you bring to each market or list online. Update the Sold column in real time — the revenue and remaining count update automatically.",
    price: "Price Per Bar ($)", sold: "Sold", venue: "Venue / Market",
    addInventory: "Add to Inventory", noMarket: "No market inventory yet.",
    totalRevenue: "Total Revenue", barsRemaining: "Bars Remaining",
    productsListed: "Products Listed",
    colName: "Soap Name", colVenue: "Venue", colQtyM: "Qty",
    colPrice: "Price", colSoldM: "Sold", colRemaining: "Remaining",
    colRevenue: "Revenue",
    soldOut: "Sold Out!",
    // Branding modal
    brandTitle: "Customize Your Journal",
    brandName: "Business Name", brandTagline: "Tagline (optional)",
    brandSave: "Save Branding",
  },
  es: {
    journalTag: "Diario del Artesano",
    appTitle: "El Estudio del Jabonero",
    brandPlaceholder: "Nombre de tu Negocio",
    stats: ["Recetas","Lotes","Curando"],
    saved: "✓ Guardado",
    tabs: ["Recetas","Registro Lotes","Curado","Inventario","Pruebas","Costos","Mercado"],
    export: "Exportar",
    exportCSV: "Descargar CSV",
    exportPDF: "Imprimir / Guardar PDF",
    cancel: "Cancelar", edit: "Editar", save: "Guardar", update: "Actualizar", delete: "✕", add: "Agregar",
    recipeTitle: "✦ Creador de Recetas",
    recipeTip: "Construye y guarda tus fórmulas de jabón. Cada tarjeta almacena aceites, datos de lejía, aditivos y notas para que puedas recrear tus mejores lotes.",
    soapName: "Nombre del Jabón", superfat: "Supergrasa %",
    oils: "Aceites y Mantecas (con %)", additives: "Aditivos",
    essentialOils: "Aceites Esenciales / Fragancia", notes: "Notas",
    saveRecipe: "Guardar Receta", updateRecipe: "Actualizar Receta",
    noRecipes: "Sin recetas todavía — crea tu primera fórmula arriba.",
    oilsLabel: "Aceites:", eoLabel: "Esencias:", additivesLabel: "Aditivos:",
    superfatLabel: "Supergrasa:",
    batchTitle: "◈ Registro de Lotes",
    batchTip: "Registra cada producción. La documentación consistente te ayuda a replicar grandes lotes y evitar repetir errores. Completa la información justo después de cada lote.",
    date: "Fecha", batchNum: "Número de Lote", batchSize: "Tamaño del Lote (oz/g)",
    mold: "Molde Usado", lyeTemp: "Temp. Lejía °C", oilTemp: "Temp. Aceites °C",
    traceLevel: "Nivel de Traza", ingredients: "Ingredientes y Cantidades",
    traceOpts: ["Ligera","Media","Pesada","Muy Pesada"],
    logBatch: "Registrar Lote", updateBatch: "Actualizar Lote",
    noBatches: "Sin lotes registrados todavía.",
    size: "Tamaño:", moldLabel: "Molde:", trace: "Traza:", lye: "Lejía:", oilsTemp: "Aceites:",
    cureTitle: "◉ Estante de Curado",
    cureTip: "El jabón de proceso frío necesita 4–6 semanas para curar. Registra cada lote aquí para nunca vender un jabón sin curar. El estado se actualiza automáticamente.",
    startCuring: "Inicio del Curado", readyDate: "Fecha Lista", quantity: "Cantidad (barras)",
    addRack: "Agregar al Estante", noRacking: "Tu estante de curado está vacío.",
    colSoap: "Nombre del Jabón", colBatch: "Lote #", colStart: "Inicio", colReady: "Listo",
    colQty: "Cant.", colStatus: "Estado",
    statusCuring: "Curando", statusReady: "¡Listo!", statusDays: "d restantes",
    invTitle: "▣ Inventario de Ingredientes",
    invTip: "Actualiza esto después de cada lote. Cuando un artículo alcance el nivel de reorden se resaltará en rojo.",
    ingredient: "Aceite / Manteca / Ingrediente", type: "Tipo", supplier: "Proveedor",
    qty: "Cantidad", unit: "Unidad", reorderAt: "Reordenar En",
    addItem: "Agregar Artículo", noInventory: "Sin artículos de inventario todavía.",
    types: ["Aceite","Manteca","Lejía","Fragancia","Colorante","Aditivo","Empaque","Otro"],
    colIng: "Ingrediente", colType: "Tipo", colSupplier: "Proveedor",
    colQty: "Cant.", colReorder: "Reordenar", colStat: "Estado",
    ok: "OK", reorder: "Reordenar",
    testTitle: "◇ Pruebas de Jabón",
    testTip: "Califica cada jabón después de usarlo u obtener retroalimentación. ¡Un promedio de 5 estrellas en todas las cualidades significa una fórmula ganadora!",
    testDate: "Fecha de Prueba", lather: "Espuma", hardness: "Dureza",
    moisturizing: "Hidratación", scentStrength: "Intensidad del Aroma",
    feedback: "Opiniones de Clientes", saveTest: "Guardar Resultados",
    noTests: "Sin resultados de prueba todavía.",
    avg: "Prom:", scent: "Aroma",
    costTitle: "◎ Calculadora de Costo por Lote",
    costTip: "Conoce tu costo real antes de fijar precios. Un margen de ganancia saludable para jabón artesanal es típicamente 50–70%.",
    barsPerBatch: "Barras por Lote", ingCost: "Costo Ingredientes ($)",
    packCost: "Costo Empaque ($)", labor: "Mano de Obra / Otros ($)",
    sellPrice: "Precio de Venta / Barra ($)",
    totalCost: "Costo Total", costPerBar: "Costo por Barra", profitMargin: "Margen de Ganancia",
    saveCost: "Guardar Registro", noCosts: "Sin registros de costos todavía.",
    colSoap2:"Jabón", colBatch2:"Lote", colBars:"Barras", colIng2:"Ingredientes",
    colPack:"Empaque", colLabor:"M.Obra", colTotal:"Total",
    colPerBar:"$/Barra", colSell:"Venta", colMargin:"Margen",
    marketTitle: "◆ Rastreador de Mercado",
    marketTip: "Rastrea lo que llevas a cada mercado. Actualiza la columna Vendido en tiempo real — los ingresos y el conteo restante se actualizan automáticamente.",
    price: "Precio por Barra ($)", sold: "Vendido", venue: "Lugar / Mercado",
    addInventory: "Agregar al Inventario", noMarket: "Sin inventario de mercado todavía.",
    totalRevenue: "Ingresos Totales", barsRemaining: "Barras Restantes",
    productsListed: "Productos Listados",
    colName: "Nombre", colVenue: "Lugar", colQtyM: "Cant.",
    colPrice: "Precio", colSoldM: "Vendido", colRemaining: "Restante",
    colRevenue: "Ingreso",
    soldOut: "¡Agotado!",
    brandTitle: "Personaliza tu Diario",
    brandName: "Nombre del Negocio", brandTagline: "Eslogan (opcional)",
    brandSave: "Guardar",
  }
};

const TABS_IDS = ["recipes","batches","curing","inventory","testing","costs","market"];
const TAB_ICONS = ["✦","◈","◉","▣","◇","◎","◆"];

const defaultData = { recipes:[], batches:[], curing:[], inventory:[], testing:[], costs:[], market:[] };

// ─── SHARED UI ────────────────────────────────────────────────────────────────
const Input = ({ label, value, onChange, type="text", placeholder="" }) => (
  <div style={{display:"flex",flexDirection:"column",gap:4}}>
    {label && <label style={{fontSize:11,letterSpacing:"0.12em",color:"#8B7355",textTransform:"uppercase",fontWeight:600}}>{label}</label>}
    <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
      style={{background:"rgba(255,248,235,0.6)",border:"1px solid #D4B896",borderRadius:6,padding:"8px 12px",fontSize:13,color:"#3D2B1A",fontFamily:"'Crimson Text',Georgia,serif",outline:"none",width:"100%",boxSizing:"border-box"}}/>
  </div>
);
const Textarea = ({ label, value, onChange, rows=3, placeholder="" }) => (
  <div style={{display:"flex",flexDirection:"column",gap:4}}>
    {label && <label style={{fontSize:11,letterSpacing:"0.12em",color:"#8B7355",textTransform:"uppercase",fontWeight:600}}>{label}</label>}
    <textarea value={value} onChange={e=>onChange(e.target.value)} rows={rows} placeholder={placeholder}
      style={{background:"rgba(255,248,235,0.6)",border:"1px solid #D4B896",borderRadius:6,padding:"8px 12px",fontSize:13,color:"#3D2B1A",fontFamily:"'Crimson Text',Georgia,serif",outline:"none",width:"100%",resize:"vertical",boxSizing:"border-box"}}/>
  </div>
);
const Btn = ({ children, onClick, variant="primary", small=false, style:sx={} }) => {
  const styles = {
    primary:{background:"#5C3D1E",color:"#FFF8EB",border:"none"},
    secondary:{background:"transparent",color:"#8B7355",border:"1px solid #D4B896"},
    danger:{background:"transparent",color:"#C0392B",border:"1px solid #C0392B"},
    gold:{background:"#C0872A",color:"#FFF8EB",border:"none"},
  };
  return <button onClick={onClick} style={{...styles[variant],borderRadius:6,padding:small?"5px 12px":"9px 20px",fontSize:small?12:13,cursor:"pointer",fontFamily:"'Crimson Text',Georgia,serif",letterSpacing:"0.05em",fontWeight:600,transition:"opacity 0.15s",...sx}}>{children}</button>;
};
const Card = ({ children, style={} }) => (
  <div style={{background:"rgba(255,252,245,0.9)",border:"1px solid #E8D5B7",borderRadius:12,padding:20,boxShadow:"0 2px 12px rgba(92,61,30,0.06)",...style}}>{children}</div>
);
const StarRating = ({ value, onChange }) => (
  <div style={{display:"flex",gap:4}}>
    {[1,2,3,4,5].map(n=>(
      <span key={n} onClick={()=>onChange(n)} style={{cursor:"pointer",fontSize:20,color:n<=value?"#C0872A":"#D4B896",transition:"color 0.1s"}}>★</span>
    ))}
  </div>
);
const SectionTitle = ({ children }) => (
  <h2 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:22,color:"#3D2B1A",margin:"0 0 6px 0",paddingBottom:10,letterSpacing:"0.02em"}}>{children}</h2>
);
const Empty = ({ msg }) => (
  <div style={{textAlign:"center",padding:"40px 20px",color:"#B8A088",fontFamily:"'Crimson Text',Georgia,serif",fontSize:15,fontStyle:"italic"}}>{msg}</div>
);

// ─── TOOLTIP ─────────────────────────────────────────────────────────────────
const Tooltip = ({ tip }) => {
  const [show, setShow] = useState(false);
  return (
    <span style={{position:"relative",display:"inline-block",marginLeft:8}}>
      <span onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)}
        style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:18,height:18,borderRadius:"50%",background:"#E8D5B7",color:"#8B7355",fontSize:11,fontWeight:700,cursor:"help",fontFamily:"Georgia,serif"}}>?</span>
      {show && (
        <div style={{position:"absolute",left:"50%",transform:"translateX(-50%)",top:24,zIndex:999,background:"#3D2B1A",color:"#FFF8EB",padding:"10px 14px",borderRadius:8,fontSize:12,lineHeight:1.5,width:260,boxShadow:"0 4px 20px rgba(0,0,0,0.25)",fontFamily:"'Crimson Text',Georgia,serif",fontStyle:"italic"}}>
          {tip}
          <div style={{position:"absolute",top:-5,left:"50%",transform:"translateX(-50%)",width:0,height:0,borderLeft:"5px solid transparent",borderRight:"5px solid transparent",borderBottom:"5px solid #3D2B1A"}}/>
        </div>
      )}
    </span>
  );
};

const TipBar = ({ tip }) => (
  <div style={{background:"linear-gradient(135deg,#FFF8EB,#F5E6CC)",border:"1px solid #E8D5B7",borderLeft:"3px solid #C0872A",borderRadius:6,padding:"8px 14px",marginBottom:16,fontSize:12,color:"#8B7355",fontFamily:"'Crimson Text',Georgia,serif",fontStyle:"italic",lineHeight:1.5}}>
    💡 {tip}
  </div>
);

// ─── EXPORT UTILITIES ─────────────────────────────────────────────────────────
function toCSV(rows, headers) {
  const escape = v => `"${String(v||"").replace(/"/g,'""')}"`;
  return [headers.map(escape).join(","), ...rows.map(r=>r.map(escape).join(","))].join("\n");
}
function downloadCSV(filename, csv) {
  const blob = new Blob([csv], {type:"text/csv"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href=url; a.download=filename; a.click();
  URL.revokeObjectURL(url);
}
function triggerPrint() { window.print(); }

function ExportMenu({ onCSV, lang }) {
  const t = T[lang];
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(()=>{
    const h = e=>{ if(ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown",h); return ()=>document.removeEventListener("mousedown",h);
  },[]);
  return (
    <div ref={ref} style={{position:"relative"}}>
      <Btn variant="gold" small onClick={()=>setOpen(o=>!o)} style={{display:"flex",alignItems:"center",gap:6}}>
        ↓ {t.export}
      </Btn>
      {open && (
        <div style={{position:"absolute",right:0,top:34,background:"#FFF8EB",border:"1px solid #D4B896",borderRadius:8,boxShadow:"0 4px 16px rgba(0,0,0,0.12)",zIndex:100,minWidth:180,overflow:"hidden"}}>
          <button onClick={()=>{onCSV();setOpen(false);}} style={{display:"block",width:"100%",padding:"10px 16px",background:"none",border:"none",textAlign:"left",fontFamily:"'Crimson Text',Georgia,serif",fontSize:13,color:"#3D2B1A",cursor:"pointer",borderBottom:"1px solid #E8D5B7"}}>
            📄 {t.exportCSV}
          </button>
          <button onClick={()=>{triggerPrint();setOpen(false);}} style={{display:"block",width:"100%",padding:"10px 16px",background:"none",border:"none",textAlign:"left",fontFamily:"'Crimson Text',Georgia,serif",fontSize:13,color:"#3D2B1A",cursor:"pointer"}}>
            🖨️ {t.exportPDF}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── BRANDING MODAL ───────────────────────────────────────────────────────────
function BrandingModal({ brand, onSave, onClose, lang }) {
  const t = T[lang];
  const [name, setName] = useState(brand.name||"");
  const [tagline, setTagline] = useState(brand.tagline||"");
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(61,43,26,0.55)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{background:"#FFF8EB",borderRadius:16,padding:32,width:420,boxShadow:"0 8px 40px rgba(0,0,0,0.2)",border:"2px solid #C0872A"}}>
        <h3 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:20,color:"#3D2B1A",margin:"0 0 20px 0"}}>{t.brandTitle}</h3>
        <div style={{display:"grid",gap:14,marginBottom:20}}>
          <Input label={t.brandName} value={name} onChange={setName} placeholder={t.brandPlaceholder}/>
          <Input label={t.brandTagline} value={tagline} onChange={setTagline} placeholder={lang==="en"?"Handcrafted with love":"Hecho con amor"}/>
        </div>
        <div style={{display:"flex",gap:10}}>
          <Btn onClick={()=>onSave({name,tagline})}>{t.brandSave}</Btn>
          <Btn variant="secondary" onClick={onClose}>{t.cancel}</Btn>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function RecipeSection({ data, setData, lang }) {
  const t = T[lang];
  const empty = {name:"",oils:"",additives:"",essentialOils:"",superfat:"",notes:""};
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const f = k => v => setForm(p=>({...p,[k]:v}));
  const save = () => {
    if(!form.name.trim()) return;
    if(editing!==null){ setData(d=>({...d,recipes:d.recipes.map((r,i)=>i===editing?{...form,id:r.id}:r)})); setEditing(null); }
    else { setData(d=>({...d,recipes:[...d.recipes,{...form,id:Date.now()}]})); }
    setForm(empty);
  };
  const exportCSV = () => {
    const csv = toCSV(data.recipes.map(r=>[r.name,r.superfat,r.oils,r.essentialOils,r.additives,r.notes]),
      [t.soapName,t.superfat,t.oils,t.essentialOils,t.additives,t.notes]);
    downloadCSV("soap-recipes.csv", csv);
  };
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
        <SectionTitle>{t.recipeTitle} <Tooltip tip={t.recipeTip}/></SectionTitle>
        <ExportMenu onCSV={exportCSV} lang={lang}/>
      </div>
      <TipBar tip={t.recipeTip}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
        <Input label={t.soapName} value={form.name} onChange={f("name")} placeholder={lang==="en"?"e.g. Lavender Dream":"ej. Sueño de Lavanda"}/>
        <Input label={t.superfat} value={form.superfat} onChange={f("superfat")} placeholder="e.g. 5%"/>
      </div>
      <div style={{display:"grid",gap:14,marginBottom:14}}>
        <Textarea label={t.oils} value={form.oils} onChange={f("oils")} placeholder="Olive 40%, Coconut 30%, Shea 15%, Castor 15%"/>
        <Textarea label={t.additives} value={form.additives} onChange={f("additives")} placeholder="Kaolin clay 1 tsp, honey 1 tbsp..."/>
        <Textarea label={t.essentialOils} value={form.essentialOils} onChange={f("essentialOils")} placeholder="Lavender 2%, Cedarwood 1%..."/>
        <Textarea label={t.notes} value={form.notes} onChange={f("notes")} rows={2}/>
      </div>
      <div style={{display:"flex",gap:10}}>
        <Btn onClick={save}>{editing!==null?t.updateRecipe:t.saveRecipe}</Btn>
        {editing!==null&&<Btn variant="secondary" onClick={()=>{setEditing(null);setForm(empty);}}>{t.cancel}</Btn>}
      </div>
      <div style={{marginTop:28,display:"grid",gap:12}}>
        {data.recipes.length===0&&<Empty msg={t.noRecipes}/>}
        {data.recipes.map((r,i)=>(
          <Card key={r.id}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:17,color:"#3D2B1A",marginBottom:6}}>{r.name}</div>
                {r.superfat&&<div style={{fontSize:12,color:"#8B7355"}}>{t.superfatLabel} {r.superfat}</div>}
                {r.oils&&<div style={{fontSize:12,color:"#666",marginTop:4}}><b>{t.oilsLabel}</b> {r.oils}</div>}
                {r.essentialOils&&<div style={{fontSize:12,color:"#666"}}><b>{t.eoLabel}</b> {r.essentialOils}</div>}
                {r.additives&&<div style={{fontSize:12,color:"#666"}}><b>{t.additivesLabel}</b> {r.additives}</div>}
                {r.notes&&<div style={{fontSize:12,color:"#999",fontStyle:"italic",marginTop:4}}>{r.notes}</div>}
              </div>
              <div style={{display:"flex",gap:8,flexShrink:0,marginLeft:12}}>
                <Btn small variant="secondary" onClick={()=>{setForm(r);setEditing(i);}}>{t.edit}</Btn>
                <Btn small variant="danger" onClick={()=>setData(d=>({...d,recipes:d.recipes.filter((_,idx)=>idx!==i)}))}>{t.delete}</Btn>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function BatchSection({ data, setData, lang }) {
  const t = T[lang];
  const empty = {date:"",batchNum:"",soapName:"",batchSize:"",mold:"",tempLye:"",tempOils:"",trace:"",ingredients:"",notes:""};
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const f = k => v => setForm(p=>({...p,[k]:v}));
  const save = () => {
    if(!form.soapName.trim()) return;
    if(editing!==null){ setData(d=>({...d,batches:d.batches.map((r,i)=>i===editing?{...form,id:r.id}:r)})); setEditing(null); }
    else { setData(d=>({...d,batches:[...d.batches,{...form,id:Date.now()}]})); }
    setForm(empty);
  };
  const exportCSV = () => {
    const csv = toCSV(data.batches.map(b=>[b.date,b.batchNum,b.soapName,b.batchSize,b.mold,b.tempLye,b.tempOils,b.trace,b.ingredients,b.notes]),
      [t.date,t.batchNum,t.soapName,t.batchSize,t.mold,t.lyeTemp,t.oilTemp,t.traceLevel,t.ingredients,t.notes]);
    downloadCSV("batch-log.csv", csv);
  };
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
        <SectionTitle>{t.batchTitle} <Tooltip tip={t.batchTip}/></SectionTitle>
        <ExportMenu onCSV={exportCSV} lang={lang}/>
      </div>
      <TipBar tip={t.batchTip}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:14}}>
        <Input label={t.date} type="date" value={form.date} onChange={f("date")}/>
        <Input label={t.batchNum} value={form.batchNum} onChange={f("batchNum")} placeholder="B-001"/>
        <Input label={t.soapName} value={form.soapName} onChange={f("soapName")}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:14,marginBottom:14}}>
        <Input label={t.batchSize} value={form.batchSize} onChange={f("batchSize")} placeholder="1000g"/>
        <Input label={t.mold} value={form.mold} onChange={f("mold")}/>
        <Input label={t.lyeTemp} value={form.tempLye} onChange={f("tempLye")} placeholder="110"/>
        <Input label={t.oilTemp} value={form.tempOils} onChange={f("tempOils")} placeholder="105"/>
      </div>
      <div style={{marginBottom:14}}>
        <label style={{fontSize:11,letterSpacing:"0.12em",color:"#8B7355",textTransform:"uppercase",fontWeight:600,display:"block",marginBottom:6}}>{t.traceLevel}</label>
        <div style={{display:"flex",gap:8}}>
          {t.traceOpts.map(tr=>(
            <button key={tr} onClick={()=>setForm(p=>({...p,trace:tr}))} style={{padding:"6px 14px",borderRadius:20,fontSize:12,background:form.trace===tr?"#5C3D1E":"transparent",color:form.trace===tr?"#FFF8EB":"#8B7355",border:"1px solid "+(form.trace===tr?"#5C3D1E":"#D4B896"),cursor:"pointer",fontFamily:"'Crimson Text',Georgia,serif"}}>{tr}</button>
          ))}
        </div>
      </div>
      <div style={{display:"grid",gap:14,marginBottom:14}}>
        <Textarea label={t.ingredients} value={form.ingredients} onChange={f("ingredients")}/>
        <Textarea label={t.notes} value={form.notes} onChange={f("notes")} rows={2}/>
      </div>
      <div style={{display:"flex",gap:10}}>
        <Btn onClick={save}>{editing!==null?t.updateBatch:t.logBatch}</Btn>
        {editing!==null&&<Btn variant="secondary" onClick={()=>{setEditing(null);setForm(empty);}}>{t.cancel}</Btn>}
      </div>
      <div style={{marginTop:28,display:"grid",gap:12}}>
        {data.batches.length===0&&<Empty msg={t.noBatches}/>}
        {[...data.batches].reverse().map((b,i)=>{
          const ri=data.batches.length-1-i;
          return (
            <Card key={b.id}>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",gap:12,alignItems:"baseline",marginBottom:6}}>
                    <span style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:17,color:"#3D2B1A"}}>{b.soapName}</span>
                    <span style={{fontSize:11,color:"#8B7355",background:"#F5E6CC",padding:"2px 8px",borderRadius:10}}>{b.batchNum}</span>
                    <span style={{fontSize:11,color:"#999"}}>{b.date}</span>
                  </div>
                  <div style={{fontSize:12,color:"#666",display:"flex",gap:16,flexWrap:"wrap"}}>
                    {b.batchSize&&<span>{t.size} {b.batchSize}</span>}
                    {b.mold&&<span>{t.moldLabel} {b.mold}</span>}
                    {b.trace&&<span>{t.trace} {b.trace}</span>}
                    {b.tempLye&&<span>{t.lye} {b.tempLye}</span>}
                    {b.tempOils&&<span>{t.oilsTemp} {b.tempOils}</span>}
                  </div>
                  {b.ingredients&&<div style={{fontSize:12,color:"#888",marginTop:4}}>{b.ingredients}</div>}
                  {b.notes&&<div style={{fontSize:12,color:"#999",fontStyle:"italic",marginTop:3}}>{b.notes}</div>}
                </div>
                <div style={{display:"flex",gap:8,flexShrink:0,marginLeft:12,alignItems:"flex-start"}}>
                  <Btn small variant="secondary" onClick={()=>{setForm(b);setEditing(ri);}}>{t.edit}</Btn>
                  <Btn small variant="danger" onClick={()=>setData(d=>({...d,batches:d.batches.filter((_,idx)=>idx!==ri)}))}>{t.delete}</Btn>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function CuringSection({ data, setData, lang }) {
  const t = T[lang];
  const empty = {soapName:"",batchNum:"",startDate:"",readyDate:"",qty:""};
  const [form, setForm] = useState(empty);
  const f = k => v => setForm(p=>({...p,[k]:v}));
  const save = () => { if(!form.soapName.trim()) return; setData(d=>({...d,curing:[...d.curing,{...form,id:Date.now()}]})); setForm(empty); };
  const today = new Date().toISOString().split("T")[0];
  const getStatus = r => {
    if(!r.readyDate) return {label:t.statusCuring,color:"#C0872A"};
    if(r.readyDate<=today) return {label:t.statusReady,color:"#27AE60"};
    const days=Math.ceil((new Date(r.readyDate)-new Date(today))/86400000);
    return {label:`${days}${t.statusDays}`,color:"#5C3D1E"};
  };
  const exportCSV = () => {
    const csv = toCSV(data.curing.map(r=>[r.soapName,r.batchNum,r.startDate,r.readyDate,r.qty,getStatus(r).label]),
      [t.colSoap,t.colBatch,t.colStart,t.colReady,t.colQty,t.colStatus]);
    downloadCSV("cure-rack.csv",csv);
  };
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
        <SectionTitle>{t.cureTitle} <Tooltip tip={t.cureTip}/></SectionTitle>
        <ExportMenu onCSV={exportCSV} lang={lang}/>
      </div>
      <TipBar tip={t.cureTip}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr",gap:14,marginBottom:14}}>
        <Input label={t.colSoap} value={form.soapName} onChange={f("soapName")}/>
        <Input label={t.colBatch} value={form.batchNum} onChange={f("batchNum")}/>
        <Input label={t.startCuring} type="date" value={form.startDate} onChange={f("startDate")}/>
        <Input label={t.readyDate} type="date" value={form.readyDate} onChange={f("readyDate")}/>
        <Input label={t.quantity} value={form.qty} onChange={f("qty")}/>
      </div>
      <Btn onClick={save}>{t.addRack}</Btn>
      {data.curing.length>0?(
        <div style={{marginTop:24,overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13,fontFamily:"'Crimson Text',Georgia,serif"}}>
            <thead><tr style={{background:"#F5E6CC"}}>
              {[t.colSoap,t.colBatch,t.colStart,t.colReady,t.colQty,t.colStatus,""].map(h=>(
                <th key={h} style={{padding:"10px 14px",textAlign:"left",fontSize:11,letterSpacing:"0.1em",color:"#8B7355",textTransform:"uppercase",fontWeight:600}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {data.curing.map((r,i)=>{const st=getStatus(r);return(
                <tr key={r.id} style={{borderBottom:"1px solid #E8D5B7"}}>
                  <td style={{padding:"10px 14px",color:"#3D2B1A",fontWeight:600}}>{r.soapName}</td>
                  <td style={{padding:"10px 14px",color:"#8B7355"}}>{r.batchNum}</td>
                  <td style={{padding:"10px 14px",color:"#666"}}>{r.startDate}</td>
                  <td style={{padding:"10px 14px",color:"#666"}}>{r.readyDate}</td>
                  <td style={{padding:"10px 14px",color:"#666"}}>{r.qty}</td>
                  <td style={{padding:"10px 14px"}}><span style={{background:st.color+"20",color:st.color,padding:"3px 10px",borderRadius:12,fontSize:12,fontWeight:600}}>{st.label}</span></td>
                  <td style={{padding:"10px 14px"}}><Btn small variant="danger" onClick={()=>setData(d=>({...d,curing:d.curing.filter((_,idx)=>idx!==i)}))}>{t.delete}</Btn></td>
                </tr>
              );})}
            </tbody>
          </table>
        </div>
      ):<Empty msg={t.noRacking}/>}
    </div>
  );
}

function InventorySection({ data, setData, lang }) {
  const t = T[lang];
  const empty = {name:"",type:t.types[0],supplier:"",qty:"",unit:"g",reorder:""};
  const [form, setForm] = useState(empty);
  const f = k => v => setForm(p=>({...p,[k]:v}));
  const save = () => { if(!form.name.trim()) return; setData(d=>({...d,inventory:[...d.inventory,{...form,id:Date.now()}]})); setForm(empty); };
  const low = item => item.reorder && parseFloat(item.qty)<=parseFloat(item.reorder);
  const exportCSV = () => {
    const csv = toCSV(data.inventory.map(r=>[r.name,r.type,r.supplier,r.qty,r.unit,r.reorder,low(r)?t.reorder:t.ok]),
      [t.colIng,t.colType,t.colSupplier,t.colQty,"Unit",t.colReorder,t.colStat]);
    downloadCSV("inventory.csv",csv);
  };
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
        <SectionTitle>{t.invTitle} <Tooltip tip={t.invTip}/></SectionTitle>
        <ExportMenu onCSV={exportCSV} lang={lang}/>
      </div>
      <TipBar tip={t.invTip}/>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 1fr",gap:14,marginBottom:14}}>
        <Input label={t.ingredient} value={form.name} onChange={f("name")}/>
        <div>
          <label style={{fontSize:11,letterSpacing:"0.12em",color:"#8B7355",textTransform:"uppercase",fontWeight:600,display:"block",marginBottom:4}}>{t.type}</label>
          <select value={form.type} onChange={e=>f("type")(e.target.value)} style={{background:"rgba(255,248,235,0.6)",border:"1px solid #D4B896",borderRadius:6,padding:"8px 12px",fontSize:13,color:"#3D2B1A",width:"100%",fontFamily:"'Crimson Text',Georgia,serif"}}>
            {t.types.map(tp=><option key={tp}>{tp}</option>)}
          </select>
        </div>
        <Input label={t.supplier} value={form.supplier} onChange={f("supplier")}/>
        <Input label={t.qty} value={form.qty} onChange={f("qty")}/>
        <Input label={t.unit} value={form.unit} onChange={f("unit")}/>
        <Input label={t.reorderAt} value={form.reorder} onChange={f("reorder")}/>
      </div>
      <Btn onClick={save}>{t.addItem}</Btn>
      {data.inventory.length>0?(
        <div style={{marginTop:24,overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13,fontFamily:"'Crimson Text',Georgia,serif"}}>
            <thead><tr style={{background:"#F5E6CC"}}>
              {[t.colIng,t.colType,t.colSupplier,t.colQty,t.colReorder,t.colStat,""].map(h=>(
                <th key={h} style={{padding:"10px 14px",textAlign:"left",fontSize:11,letterSpacing:"0.1em",color:"#8B7355",textTransform:"uppercase",fontWeight:600}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {data.inventory.map((r,i)=>(
                <tr key={r.id} style={{borderBottom:"1px solid #E8D5B7",background:low(r)?"rgba(192,57,43,0.04)":"transparent"}}>
                  <td style={{padding:"10px 14px",color:"#3D2B1A",fontWeight:600}}>{r.name}</td>
                  <td style={{padding:"10px 14px",color:"#8B7355"}}>{r.type}</td>
                  <td style={{padding:"10px 14px",color:"#666"}}>{r.supplier}</td>
                  <td style={{padding:"10px 14px",color:"#3D2B1A"}}>{r.qty} {r.unit}</td>
                  <td style={{padding:"10px 14px",color:"#999"}}>{r.reorder} {r.unit}</td>
                  <td style={{padding:"10px 14px"}}>
                    {low(r)?<span style={{background:"#C0392B20",color:"#C0392B",padding:"3px 10px",borderRadius:12,fontSize:12,fontWeight:600}}>{t.reorder}</span>
                    :<span style={{background:"#27AE6020",color:"#27AE60",padding:"3px 10px",borderRadius:12,fontSize:12,fontWeight:600}}>{t.ok}</span>}
                  </td>
                  <td style={{padding:"10px 14px"}}><Btn small variant="danger" onClick={()=>setData(d=>({...d,inventory:d.inventory.filter((_,idx)=>idx!==i)}))}>{t.delete}</Btn></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ):<Empty msg={t.noInventory}/>}
    </div>
  );
}

function TestingSection({ data, setData, lang }) {
  const t = T[lang];
  const empty = {soapName:"",batchNum:"",testDate:"",lather:0,hardness:0,moisturizing:0,scentStrength:0,feedback:"",notes:""};
  const [form, setForm] = useState(empty);
  const f = k => v => setForm(p=>({...p,[k]:v}));
  const save = () => { if(!form.soapName.trim()) return; setData(d=>({...d,testing:[...d.testing,{...form,id:Date.now()}]})); setForm(empty); };
  const avg = item => { const vals=[item.lather,item.hardness,item.moisturizing,item.scentStrength].filter(v=>v>0); return vals.length?(vals.reduce((a,b)=>a+b,0)/vals.length).toFixed(1):0; };
  const exportCSV = () => {
    const csv = toCSV(data.testing.map(r=>[r.soapName,r.batchNum,r.testDate,r.lather,r.hardness,r.moisturizing,r.scentStrength,avg(r),r.feedback,r.notes]),
      [t.soapName,t.batchNum,t.testDate,t.lather,t.hardness,t.moisturizing,t.scentStrength,"Avg",t.feedback,t.notes]);
    downloadCSV("soap-testing.csv",csv);
  };
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
        <SectionTitle>{t.testTitle} <Tooltip tip={t.testTip}/></SectionTitle>
        <ExportMenu onCSV={exportCSV} lang={lang}/>
      </div>
      <TipBar tip={t.testTip}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:14}}>
        <Input label={t.soapName} value={form.soapName} onChange={f("soapName")}/>
        <Input label={t.batchNum} value={form.batchNum} onChange={f("batchNum")}/>
        <Input label={t.testDate} type="date" value={form.testDate} onChange={f("testDate")}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
        {[[t.lather,"lather"],[t.hardness,"hardness"],[t.moisturizing,"moisturizing"],[t.scentStrength,"scentStrength"]].map(([label,key])=>(
          <div key={key}>
            <label style={{fontSize:11,letterSpacing:"0.12em",color:"#8B7355",textTransform:"uppercase",fontWeight:600,display:"block",marginBottom:6}}>{label}</label>
            <StarRating value={form[key]} onChange={f(key)}/>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gap:14,marginBottom:14}}>
        <Textarea label={t.feedback} value={form.feedback} onChange={f("feedback")} rows={2}/>
        <Textarea label={t.notes} value={form.notes} onChange={f("notes")} rows={2}/>
      </div>
      <Btn onClick={save}>{t.saveTest}</Btn>
      <div style={{marginTop:28,display:"grid",gap:12}}>
        {data.testing.length===0&&<Empty msg={t.noTests}/>}
        {[...data.testing].reverse().map(item=>(
          <Card key={item.id}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div style={{flex:1}}>
                <div style={{display:"flex",gap:12,alignItems:"baseline",marginBottom:8}}>
                  <span style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:17,color:"#3D2B1A"}}>{item.soapName}</span>
                  <span style={{fontSize:11,color:"#8B7355",background:"#F5E6CC",padding:"2px 8px",borderRadius:10}}>{item.batchNum}</span>
                  <span style={{fontSize:11,color:"#999"}}>{item.testDate}</span>
                </div>
                <div style={{display:"flex",gap:20,flexWrap:"wrap",marginBottom:6}}>
                  {[[t.lather,item.lather],[t.hardness,item.hardness],[t.moisturizing,item.moisturizing],[t.scent,item.scentStrength]].map(([label,val])=>(
                    <div key={label}><span style={{fontSize:11,color:"#8B7355"}}>{label}: </span><span style={{color:"#C0872A"}}>{"★".repeat(val)}{"☆".repeat(5-val)}</span></div>
                  ))}
                  <div><span style={{fontSize:11,color:"#8B7355"}}>{t.avg} </span><span style={{fontWeight:700,color:"#5C3D1E",fontSize:14}}>{avg(item)}/5</span></div>
                </div>
                {item.feedback&&<div style={{fontSize:12,color:"#666",fontStyle:"italic"}}>"{item.feedback}"</div>}
                {item.notes&&<div style={{fontSize:12,color:"#999"}}>{item.notes}</div>}
              </div>
              <Btn small variant="danger" onClick={()=>setData(d=>({...d,testing:d.testing.filter(x=>x.id!==item.id)}))}>{t.delete}</Btn>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CostSection({ data, setData, lang }) {
  const t = T[lang];
  const empty = {soapName:"",batchNum:"",barsPerBatch:"",ingredients:"",packaging:"",labor:"",pricePerBar:"",notes:""};
  const [form, setForm] = useState(empty);
  const f = k => v => setForm(p=>({...p,[k]:v}));
  const calc = row => {
    const bars=parseFloat(row.barsPerBatch)||0, ing=parseFloat(row.ingredients)||0;
    const pack=parseFloat(row.packaging)||0, lab=parseFloat(row.labor)||0;
    const total=ing+pack+lab, perBar=bars>0?total/bars:0, sell=parseFloat(row.pricePerBar)||0;
    const margin=sell>0&&perBar>0?((sell-perBar)/sell*100).toFixed(1):0;
    return {total,perBar,margin};
  };
  const save = () => { if(!form.soapName.trim()) return; setData(d=>({...d,costs:[...d.costs,{...form,id:Date.now()}]})); setForm(empty); };
  const prev = calc(form);
  const exportCSV = () => {
    const csv = toCSV(data.costs.map(r=>{const c=calc(r);return[r.soapName,r.batchNum,r.barsPerBatch,r.ingredients,r.packaging,r.labor,c.total.toFixed(2),c.perBar.toFixed(2),r.pricePerBar,c.margin+"%"];}),
      [t.colSoap2,t.colBatch2,t.colBars,t.colIng2,t.colPack,t.colLabor,t.colTotal,t.colPerBar,t.colSell,t.colMargin]);
    downloadCSV("cost-calculator.csv",csv);
  };
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
        <SectionTitle>{t.costTitle} <Tooltip tip={t.costTip}/></SectionTitle>
        <ExportMenu onCSV={exportCSV} lang={lang}/>
      </div>
      <TipBar tip={t.costTip}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:14}}>
        <Input label={t.soapName} value={form.soapName} onChange={f("soapName")}/>
        <Input label={t.batchNum} value={form.batchNum} onChange={f("batchNum")}/>
        <Input label={t.barsPerBatch} value={form.barsPerBatch} onChange={f("barsPerBatch")} placeholder="24"/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:14,marginBottom:14}}>
        <Input label={t.ingCost} value={form.ingredients} onChange={f("ingredients")} placeholder="12.50"/>
        <Input label={t.packCost} value={form.packaging} onChange={f("packaging")} placeholder="3.00"/>
        <Input label={t.labor} value={form.labor} onChange={f("labor")} placeholder="5.00"/>
        <Input label={t.sellPrice} value={form.pricePerBar} onChange={f("pricePerBar")} placeholder="8.00"/>
      </div>
      {(form.ingredients||form.packaging||form.labor)&&(
        <Card style={{background:"linear-gradient(135deg,#FFF8EB,#F5E6CC)",marginBottom:14,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20}}>
          {[[t.totalCost,`$${prev.total.toFixed(2)}`],[t.costPerBar,`$${prev.perBar.toFixed(2)}`],[t.profitMargin,`${prev.margin}%`]].map(([label,val])=>(
            <div key={label} style={{textAlign:"center"}}>
              <div style={{fontSize:11,letterSpacing:"0.12em",color:"#8B7355",textTransform:"uppercase",marginBottom:4}}>{label}</div>
              <div style={{fontSize:22,fontFamily:"'Playfair Display',Georgia,serif",color:label===t.profitMargin&&parseFloat(prev.margin)>0?"#27AE60":"#3D2B1A"}}>{val}</div>
            </div>
          ))}
        </Card>
      )}
      <Textarea label={t.notes} value={form.notes} onChange={f("notes")} rows={2}/>
      <div style={{marginTop:12}}><Btn onClick={save}>{t.saveCost}</Btn></div>
      {data.costs.length>0?(
        <div style={{marginTop:28,overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13,fontFamily:"'Crimson Text',Georgia,serif"}}>
            <thead><tr style={{background:"#F5E6CC"}}>
              {[t.colSoap2,t.colBatch2,t.colBars,t.colIng2,t.colPack,t.colLabor,t.colTotal,t.colPerBar,t.colSell,t.colMargin,""].map(h=>(
                <th key={h} style={{padding:"10px 14px",textAlign:"left",fontSize:11,letterSpacing:"0.1em",color:"#8B7355",textTransform:"uppercase",fontWeight:600,whiteSpace:"nowrap"}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {[...data.costs].reverse().map((r,i)=>{const c=calc(r);const ri=data.costs.length-1-i;return(
                <tr key={r.id} style={{borderBottom:"1px solid #E8D5B7"}}>
                  <td style={{padding:"10px 14px",color:"#3D2B1A",fontWeight:600}}>{r.soapName}</td>
                  <td style={{padding:"10px 14px",color:"#8B7355"}}>{r.batchNum}</td>
                  <td style={{padding:"10px 14px"}}>{r.barsPerBatch}</td>
                  <td style={{padding:"10px 14px"}}>${parseFloat(r.ingredients||0).toFixed(2)}</td>
                  <td style={{padding:"10px 14px"}}>${parseFloat(r.packaging||0).toFixed(2)}</td>
                  <td style={{padding:"10px 14px"}}>${parseFloat(r.labor||0).toFixed(2)}</td>
                  <td style={{padding:"10px 14px",fontWeight:600}}>${c.total.toFixed(2)}</td>
                  <td style={{padding:"10px 14px"}}>${c.perBar.toFixed(2)}</td>
                  <td style={{padding:"10px 14px"}}>${parseFloat(r.pricePerBar||0).toFixed(2)}</td>
                  <td style={{padding:"10px 14px"}}><span style={{color:parseFloat(c.margin)>40?"#27AE60":parseFloat(c.margin)>0?"#C0872A":"#C0392B",fontWeight:600}}>{c.margin}%</span></td>
                  <td style={{padding:"10px 14px"}}><Btn small variant="danger" onClick={()=>setData(d=>({...d,costs:d.costs.filter((_,idx)=>idx!==ri)}))}>{t.delete}</Btn></td>
                </tr>
              );})}
            </tbody>
          </table>
        </div>
      ):<Empty msg={t.noCosts}/>}
    </div>
  );
}

function MarketSection({ data, setData, lang }) {
  const t = T[lang];
  const empty = {soapName:"",qty:"",price:"",sold:"0",venue:""};
  const [form, setForm] = useState(empty);
  const f = k => v => setForm(p=>({...p,[k]:v}));
  const save = () => { if(!form.soapName.trim()) return; setData(d=>({...d,market:[...d.market,{...form,id:Date.now()}]})); setForm(empty); };
  const updateSold = (id,val) => setData(d=>({...d,market:d.market.map(m=>m.id===id?{...m,sold:val}:m)}));
  const totalRev = data.market.reduce((s,m)=>s+(parseFloat(m.sold||0)*parseFloat(m.price||0)),0);
  const totalUnsold = data.market.reduce((s,m)=>s+Math.max(0,parseFloat(m.qty||0)-parseFloat(m.sold||0)),0);
  const exportCSV = () => {
    const csv = toCSV(data.market.map(m=>{const rem=Math.max(0,parseFloat(m.qty||0)-parseFloat(m.sold||0));const rev=(parseFloat(m.sold||0)*parseFloat(m.price||0)).toFixed(2);return[m.soapName,m.venue,m.qty,m.price,m.sold,rem,"$"+rev];}),
      [t.colName,t.colVenue,t.colQtyM,t.colPrice,t.colSoldM,t.colRemaining,t.colRevenue]);
    downloadCSV("market-tracker.csv",csv);
  };
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
        <SectionTitle>{t.marketTitle} <Tooltip tip={t.marketTip}/></SectionTitle>
        <ExportMenu onCSV={exportCSV} lang={lang}/>
      </div>
      <TipBar tip={t.marketTip}/>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:14,marginBottom:14}}>
        <Input label={t.colName} value={form.soapName} onChange={f("soapName")}/>
        <Input label={t.colQtyM} value={form.qty} onChange={f("qty")} placeholder="24"/>
        <Input label={t.price} value={form.price} onChange={f("price")} placeholder="8.00"/>
        <Input label={t.venue} value={form.venue} onChange={f("venue")}/>
      </div>
      <Btn onClick={save}>{t.addInventory}</Btn>
      {data.market.length>0&&(
        <>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginTop:24,marginBottom:20}}>
            {[[t.totalRevenue,`$${totalRev.toFixed(2)}`],[t.barsRemaining,totalUnsold],[t.productsListed,data.market.length]].map(([label,val])=>(
              <Card key={label} style={{textAlign:"center",background:"linear-gradient(135deg,#FFF8EB,#F5E6CC)"}}>
                <div style={{fontSize:11,letterSpacing:"0.12em",color:"#8B7355",textTransform:"uppercase",marginBottom:4}}>{label}</div>
                <div style={{fontSize:24,fontFamily:"'Playfair Display',Georgia,serif",color:"#3D2B1A"}}>{val}</div>
              </Card>
            ))}
          </div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:13,fontFamily:"'Crimson Text',Georgia,serif"}}>
              <thead><tr style={{background:"#F5E6CC"}}>
                {[t.colName,t.colVenue,t.colQtyM,t.colPrice,t.colSoldM,t.colRemaining,t.colRevenue,""].map(h=>(
                  <th key={h} style={{padding:"10px 14px",textAlign:"left",fontSize:11,letterSpacing:"0.1em",color:"#8B7355",textTransform:"uppercase",fontWeight:600}}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {data.market.map((m,i)=>{const rem=Math.max(0,parseFloat(m.qty||0)-parseFloat(m.sold||0));const rev=(parseFloat(m.sold||0)*parseFloat(m.price||0)).toFixed(2);return(
                  <tr key={m.id} style={{borderBottom:"1px solid #E8D5B7"}}>
                    <td style={{padding:"10px 14px",color:"#3D2B1A",fontWeight:600}}>{m.soapName}</td>
                    <td style={{padding:"10px 14px",color:"#8B7355"}}>{m.venue}</td>
                    <td style={{padding:"10px 14px"}}>{m.qty}</td>
                    <td style={{padding:"10px 14px"}}>${parseFloat(m.price||0).toFixed(2)}</td>
                    <td style={{padding:"10px 14px"}}>
                      <input type="number" min="0" max={m.qty} value={m.sold} onChange={e=>updateSold(m.id,e.target.value)}
                        style={{width:60,padding:"4px 8px",border:"1px solid #D4B896",borderRadius:4,background:"#FFF8EB",fontFamily:"'Crimson Text',Georgia,serif",fontSize:13}}/>
                    </td>
                    <td style={{padding:"10px 14px"}}><span style={{color:rem===0?"#27AE60":"#3D2B1A",fontWeight:rem===0?700:400}}>{rem===0?t.soldOut:rem}</span></td>
                    <td style={{padding:"10px 14px",fontWeight:600,color:"#5C3D1E"}}>${rev}</td>
                    <td style={{padding:"10px 14px"}}><Btn small variant="danger" onClick={()=>setData(d=>({...d,market:d.market.filter((_,idx)=>idx!==i)}))}>{t.delete}</Btn></td>
                  </tr>
                );})}
              </tbody>
            </table>
          </div>
        </>
      )}
      {data.market.length===0&&<Empty msg={t.noMarket}/>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// APP SHELL
// ═══════════════════════════════════════════════════════════════════════════════

export default function SoapJournalPro() {
  const [activeTab, setActiveTab] = useState("recipes");
  const [data, setData] = useState(defaultData);
  const [saved, setSaved] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [lang, setLang] = useState("en");
  const [brand, setBrand] = useState({name:"",tagline:""});
  const [showBrand, setShowBrand] = useState(false);

  useEffect(()=>{
    (async()=>{
      try {
        const d = await window.storage.get("soap-pro-data");
        if(d?.value){ const p=JSON.parse(d.value); setData(p.data||defaultData); setLang(p.lang||"en"); setBrand(p.brand||{name:"",tagline:""}); }
      } catch(_){}
      setLoaded(true);
    })();
  },[]);

  useEffect(()=>{
    if(!loaded) return;
    (async()=>{
      try { await window.storage.set("soap-pro-data",JSON.stringify({data,lang,brand})); setSaved(true); setTimeout(()=>setSaved(false),1400); } catch(_){}
    })();
  },[data,lang,brand]);

  const t = T[lang];
  const SECTIONS = {recipes:RecipeSection,batches:BatchSection,curing:CuringSection,inventory:InventorySection,testing:TestingSection,costs:CostSection,market:MarketSection};
  const ActiveSection = SECTIONS[activeTab];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
        *{box-sizing:border-box;} body{margin:0;}
        input:focus,textarea:focus,select:focus{border-color:#8B7355!important;box-shadow:0 0 0 3px rgba(139,115,85,0.12);}
        ::-webkit-scrollbar{width:6px;height:6px;}
        ::-webkit-scrollbar-track{background:#F5E6CC;}
        ::-webkit-scrollbar-thumb{background:#C4A882;border-radius:3px;}
        @media print {
          .no-print{display:none!important;}
          body{background:white!important;}
          .print-area{box-shadow:none!important;border:none!important;}
        }
      `}</style>

      {showBrand&&<BrandingModal brand={brand} onSave={b=>{setBrand(b);setShowBrand(false);}} onClose={()=>setShowBrand(false)} lang={lang}/>}

      <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#FFF3DC 0%,#F5E3C0 40%,#EDD5A3 100%)",fontFamily:"'Crimson Text',Georgia,serif"}}>

        {/* HEADER */}
        <div className="no-print" style={{background:"linear-gradient(135deg,#3D2B1A,#5C3D1E)",padding:"22px 36px 18px",display:"flex",justifyContent:"space-between",alignItems:"flex-end",borderBottom:"3px solid #C0872A"}}>
          <div>
            <div style={{fontSize:10,letterSpacing:"0.3em",color:"#C0872A",textTransform:"uppercase",marginBottom:3}}>{brand.tagline||t.journalTag}</div>
            <h1 style={{margin:0,fontFamily:"'Playfair Display',Georgia,serif",fontSize:28,color:"#FFF8EB",letterSpacing:"0.02em",fontWeight:400,cursor:brand.name?"default":"pointer"}} onClick={()=>setShowBrand(true)}>
              {brand.name||t.appTitle}
              <span style={{fontSize:11,color:"#C0872A",marginLeft:10,fontFamily:"'Crimson Text',Georgia,serif",fontStyle:"italic",cursor:"pointer"}} onClick={e=>{e.stopPropagation();setShowBrand(true);}}>✏ customize</span>
            </h1>
          </div>
          <div style={{display:"flex",gap:20,alignItems:"center"}}>
            {/* Stats */}
            <div style={{display:"flex",gap:16,fontSize:13,color:"#C4A882"}}>
              {t.stats.map((label,i)=>{
                const counts=[data.recipes.length,data.batches.length,data.curing.length];
                return(<div key={label} style={{textAlign:"center"}}>
                  <div style={{fontFamily:"'Playfair Display'",fontSize:20,color:"#FFF8EB"}}>{counts[i]}</div>
                  <div style={{fontSize:10,letterSpacing:"0.1em",textTransform:"uppercase"}}>{label}</div>
                </div>);
              })}
            </div>
            {/* Lang toggle */}
            <div style={{display:"flex",gap:4,background:"rgba(255,255,255,0.1)",borderRadius:20,padding:3}}>
              {["en","es"].map(l=>(
                <button key={l} onClick={()=>setLang(l)} style={{padding:"5px 14px",borderRadius:16,border:"none",background:lang===l?"#C0872A":"transparent",color:lang===l?"#FFF8EB":"#C4A882",fontFamily:"'Crimson Text',Georgia,serif",fontSize:12,fontWeight:600,cursor:"pointer",letterSpacing:"0.05em",transition:"all 0.15s"}}>
                  {l==="en"?"🇺🇸 EN":"🇪🇸 ES"}
                </button>
              ))}
            </div>
            {saved&&<div style={{fontSize:12,color:"#C0872A",fontStyle:"italic"}}>{t.saved}</div>}
          </div>
        </div>

        {/* NAV */}
        <div className="no-print" style={{background:"rgba(255,248,235,0.92)",borderBottom:"1px solid #E8D5B7",display:"flex",overflowX:"auto",padding:"0 24px",gap:2}}>
          {TABS_IDS.map((id,i)=>(
            <button key={id} onClick={()=>setActiveTab(id)} style={{padding:"13px 18px",background:"none",border:"none",borderBottom:activeTab===id?"2px solid #5C3D1E":"2px solid transparent",color:activeTab===id?"#3D2B1A":"#8B7355",fontFamily:"'Crimson Text',Georgia,serif",fontSize:13,fontWeight:activeTab===id?600:400,cursor:"pointer",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:5,letterSpacing:"0.02em",transition:"color 0.15s"}}>
              <span style={{fontSize:11}}>{TAB_ICONS[i]}</span>
              {t.tabs[i]}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="print-area" style={{maxWidth:1100,margin:"0 auto",padding:"28px 28px"}}>
          {loaded&&<ActiveSection data={data} setData={setData} lang={lang}/>}
        </div>
      </div>
    </>
  );
}
