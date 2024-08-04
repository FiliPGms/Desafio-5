CREATE DATABASE turismo_maranhao;
USE turismo_maranhao;

CREATE TABLE destinos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    imagem VARCHAR(255) NOT NULL,
    coordenadas VARCHAR(255) NOT NULL
);
 
INSERT INTO destinos (nome, descricao, imagem, coordenadas) VALUES
('São Luís', 'Capital do Maranhão, conhecida por seu centro histórico.', 'images/vista-aerea-centro-historico-sao-luis.jpg', '-2.53073,-44.3068'),
('Lençóis Maranhenses', 'Parque Nacional famoso por suas dunas e lagoas.', 'images/Lencois-1.jpg', '-2.60256,-43.5962'),
('Alcântara', 'Cidade histórica com muitos monumentos coloniais.', 'images/Alcântara_-_01.jpg', '-2.40553,-44.4168');

CREATE TABLE atrativos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    tipo VARCHAR(255) NOT NULL,
    destinos_id INT,
    CONSTRAINT FK_destino_atrativo FOREIGN KEY (destinos_id) REFERENCES destinos (id)
   );
   
INSERT INTO atrativos (nome, tipo, descricao, destinos_id) VALUES
('Centro Histórico', 'Monumento', 'Patrimônio Mundial da UNESCO.', 1),
('Praia de Calhau', 'Praia', 'Praia urbana popular.', 1),
('Lagoa Azul', 'Lagoa', 'Uma das mais bonitas do parque.', 2),
('Lagoa Bonita', 'Lagoa', 'Famosa pela vista panorâmica.', 2),
('Igreja Matriz', 'Monumento', 'Um dos principais pontos turísticos.', 3),
('Praça da Matriz', 'Praça', 'Centro da cidade histórica.', 3);

   
