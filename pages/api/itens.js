import pool from './db'
export default async function handler(req,res){
  if(req.method==='GET'){
    const r = await pool.query('SELECT * FROM itens ORDER BY id')
    return res.status(200).json(r.rows)
  }
  if(req.method==='POST'){
    const { nome, descricao, preco, estoque, categoria } = req.body
    const r = await pool.query('INSERT INTO itens (nome, descricao, preco, estoque, categoria) VALUES ($1,$2,$3,$4,$5) RETURNING *',[nome,descricao,preco||0,estoque||0,categoria||''])
    return res.status(201).json(r.rows[0])
  }
  if(req.method==='PUT'){
    const { id, nome, descricao, preco, estoque, categoria } = req.body
    await pool.query('UPDATE itens SET nome=$1, descricao=$2, preco=$3, estoque=$4, categoria=$5 WHERE id=$6',[nome,descricao,preco,estoque,categoria,id])
    return res.status(200).json({id,nome,descricao,preco,estoque,categoria})
  }
  if(req.method==='DELETE'){
    const { id } = req.body
    await pool.query('DELETE FROM itens WHERE id=$1',[id])
    return res.status(200).json({ success:true })
  }
}
