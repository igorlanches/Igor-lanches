import pool from './db'
export default async function handler(req,res){
  if(req.method==='GET'){
    const q = (req.query.q||'').toLowerCase()
    if(q){
      const r = await pool.query("SELECT * FROM clientes WHERE LOWER(nome) LIKE $1 OR telefone LIKE $1 ORDER BY id",['%'+q+'%'])
      return res.status(200).json(r.rows)
    }
    const r = await pool.query('SELECT * FROM clientes ORDER BY id')
    return res.status(200).json(r.rows)
  }
  if(req.method==='POST'){
    const { nome, telefone } = req.body
    const r = await pool.query('INSERT INTO clientes (nome, telefone) VALUES ($1,$2) RETURNING *',[nome,telefone])
    return res.status(201).json(r.rows[0])
  }
  if(req.method==='PUT'){
    const { id, nome, telefone } = req.body
    await pool.query('UPDATE clientes SET nome=$1, telefone=$2 WHERE id=$3',[nome,telefone,id])
    return res.status(200).json({id,nome,telefone})
  }
  if(req.method==='DELETE'){
    const { id } = req.body
    await pool.query('DELETE FROM clientes WHERE id=$1',[id])
    return res.status(200).json({ success:true })
  }
}
