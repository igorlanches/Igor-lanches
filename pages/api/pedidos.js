import pool from './db'
export default async function handler(req,res){
  if(req.method==='GET'){
    const r = await pool.query('SELECT * FROM pedidos ORDER BY id DESC')
    return res.status(200).json(r.rows)
  }
  if(req.method==='POST'){
    const { mesa_id, cliente_id, tipo, total, itens } = req.body
    const r = await pool.query('INSERT INTO pedidos (mesa_id, cliente_id, tipo, total) VALUES ($1,$2,$3,$4) RETURNING *',[mesa_id||null,cliente_id||null,tipo||'mesa',total||0])
    const pedidoId = r.rows[0].id
    if(Array.isArray(itens)){
      for(const it of itens){
        await pool.query('INSERT INTO pedido_itens (pedido_id, item_id, quantidade, preco_unit, observacao) VALUES ($1,$2,$3,$4,$5)',[pedidoId,it.item_id,it.quantidade,it.preco_unit,it.observacao||''])
      }
    }
    return res.status(201).json({ id: pedidoId })
  }
  if(req.method==='PUT'){
    const { id, status } = req.body
    await pool.query('UPDATE pedidos SET status=$1 WHERE id=$2',[status,id])
    return res.status(200).json({ id, status })
  }
}
