-- Schema for Igor Lanches (Postgres)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120),
  email VARCHAR(150) UNIQUE,
  password VARCHAR(255),
  role VARCHAR(20) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS mesas (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(80),
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(150),
  telefone VARCHAR(30),
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS itens (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(200),
  descricao TEXT,
  preco NUMERIC(10,2) DEFAULT 0,
  estoque INT DEFAULT 0,
  categoria VARCHAR(100),
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS pedidos (
  id SERIAL PRIMARY KEY,
  mesa_id INT REFERENCES mesas(id) ON DELETE SET NULL,
  cliente_id INT REFERENCES clientes(id) ON DELETE SET NULL,
  tipo VARCHAR(20) DEFAULT 'mesa',
  total NUMERIC(10,2) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'aberto',
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS pedido_itens (
  id SERIAL PRIMARY KEY,
  pedido_id INT REFERENCES pedidos(id) ON DELETE CASCADE,
  item_id INT REFERENCES itens(id) ON DELETE SET NULL,
  quantidade INT,
  preco_unit NUMERIC(10,2),
  observacao VARCHAR(255)
);

-- seed
INSERT INTO mesas (nome) VALUES ('Mesa 1'), ('Mesa 2'), ('Mesa 3');
INSERT INTO clientes (nome, telefone) VALUES ('João Silva','11999990000');
INSERT INTO itens (nome, descricao, preco, estoque, categoria) VALUES
('X-Burguer','Tradicional',18.90,50,'Lanches'),
('Batata Média','Porção média',9.50,30,'Porções');
