import Link from 'next/link'
export default function Home(){
  return (
    <div className="container">
      <div className="card">
        <h1>Igor Lanches</h1>
        <p>Bem-vindo ao painel. Use os links abaixo:</p>
        <ul>
          <li><Link href="/admin">Painel Admin</Link></li>
          <li><Link href="/mesas">Mesas</Link></li>
          <li><Link href="/pdv">PDV</Link></li>
        </ul>
      </div>
    </div>
  )
}
