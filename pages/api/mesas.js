import pool from './db'
export default async function handler(req,res){
  if(req.method==='GET'){
    const r = await pool.query('SELECT * FROM mesas ORDER BY id')
    return res.status(200).json(r.rows)
  }
  if(req.method==='POST'){
    const { nome } = req.body
    const r = await pool.query('INSERT INTO mesas (nome) VALUES ($1) RETURNING *',[nome||'Mesa'])
    return res.status(201).json(r.rows[0])
  }
  if(req.method==='PUT'){
    const { id, nome } = req.body
    await pool.query('UPDATE mesas SET nome=$1 WHERE id=$2',[nome,id])
    return res.status(200).json({id,nome})
  }
  if(req.method==='DELETE'){
    const { id } = req.body
    await pool.query('DELETE FROM mesas WHERE id=$1',[id])
    return res.status(200).json({ success:true })
  }
}
