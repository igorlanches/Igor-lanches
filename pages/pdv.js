import React, {useState, useEffect} from 'react'
export default function PDV(){
  const [itens,setItens]=useState([])
  useEffect(()=>{fetch('/api/itens').then(r=>r.json()).then(setItens)},[])
  const [cart,setCart]=useState([])
  function add(item){
    const found=cart.find(c=>c.id===item.id)
    if(found) setCart(cart.map(c=>c.id===item.id?{...c,qty:c.qty+1}:c))
    else setCart([...cart,{...item,qty:1}])
  }
  function total(){return cart.reduce((s,i)=>s+i.preco*i.qty,0)}
  async function checkout(){
    const payload={tipo:'balcao', total: total(), itens: cart.map(i=>({item_id:i.id, quantidade:i.qty, preco_unit:i.preco}))}
    const res=await fetch('/api/pedidos',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
    if(res.ok){alert('Pedido criado'); setCart([])}
  }
  return (
    <div className="container">
      <div className="card">
        <h2>PDV</h2>
        <div style={{display:'flex',gap:12}}>
          <div style={{flex:1}}>
            <h3>Produtos</h3>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:8}}>
              {itens.map(it=>(
                <div key={it.id} style={{padding:8,border:'1px solid #eee'}}>
                  <div><strong>{it.nome}</strong></div>
                  <div>R$ {Number(it.preco).toFixed(2)}</div>
                  <button className="button" onClick={()=>add(it)}>Adicionar</button>
                </div>
              ))}
            </div>
          </div>
          <div style={{width:260}}>
            <h3>Carrinho</h3>
            <ul>{cart.map(c=>(<li key={c.id}>{c.nome} x {c.qty}</li>))}</ul>
            <div>Total: R$ {total().toFixed(2)}</div>
            <button className="button" onClick={checkout}>Fechar Pedido</button>
          </div>
        </div>
      </div>
    </div>
  )
}
