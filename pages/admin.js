import React, {useState, useEffect} from 'react'

export default function Admin(){
  const [mesas,setMesas]=useState([])
  const [clientes,setClientes]=useState([])
  const [itens,setItens]=useState([])

  async function fetchAll(){
    const [m,c,i]=await Promise.all([fetch('/api/mesas').then(r=>r.json()),fetch('/api/clientes').then(r=>r.json()),fetch('/api/itens').then(r=>r.json())])
    setMesas(m); setClientes(c); setItens(i)
  }
  useEffect(()=>{fetchAll()},[])

  return (
    <div className="container">
      <div className="card">
        <h2>Admin Panel</h2>
        <h3>Mesas</h3>
        <ul>{mesas.map(x=>(<li key={x.id}>{x.nome}</li>))}</ul>
        <h3>Clientes</h3>
        <ul>{clientes.map(x=>(<li key={x.id}>{x.nome} - {x.telefone}</li>))}</ul>
        <h3>Itens</h3>
        <ul>{itens.map(x=>(<li key={x.id}>{x.nome} - R$ {Number(x.preco).toFixed(2)}</li>))}</ul>
      </div>
    </div>
  )
}
