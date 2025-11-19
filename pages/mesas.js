import React, {useState, useEffect} from 'react'
export default function Mesas(){
  const [mesas,setMesas]=useState([])
  useEffect(()=>{fetch('/api/mesas').then(r=>r.json()).then(setMesas)},[])
  return (
    <div className="container">
      <div className="card">
        <h2>Mesas</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
          {mesas.map(m=> (
            <div key={m.id} style={{padding:12,border:'1px solid #ddd',borderRadius:8}}>
              <strong>{m.nome}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
