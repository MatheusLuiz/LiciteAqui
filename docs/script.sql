create database liciteaqui;

use liciteaqui;

CREATE TABLE status_cliente (
    id_status INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE clientes (
    id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    cnpj CHAR(14) NOT NULL UNIQUE,
    razao_social VARCHAR(255) NOT NULL,
    nome_fantasia VARCHAR(255),
    status INT NOT NULL,
    data_cadastro DATE NOT NULL,
    FOREIGN KEY (status) REFERENCES status_cliente(id_status)
);

create table tipos_telefone (
    id_tipo_telefone int primary key auto_increment,
    descricao varchar(20) not null unique
);

CREATE TABLE contato_cliente (
    id_contato INT PRIMARY KEY AUTO_INCREMENT,
    cliente INT,
    tipo_telefone INT,
    ddd CHAR(3) NOT NULL,
    telefone VARCHAR(10) NOT NULL,
    nome_completo VARCHAR(255) NOT NULL,
    sexo enum ('Masculino', 'Feminino') not null,
    data_nascimento DATE,
    cpf CHAR(11) NOT NULL UNIQUE,
    status_cadastro enum ('Ativo', 'Inativo'),
    email VARCHAR(250) NOT NULL UNIQUE,
    FOREIGN KEY (cliente) REFERENCES clientes(id_cliente),
    FOREIGN KEY (tipo_telefone) REFERENCES tipos_telefone(id_tipo_telefone)
);

create table tipo_servico (
    id_tipo_servico int primary key auto_increment,
    descricao varchar(255) not null unique
);

create table servicos_cliente (
    id_servico int primary key auto_increment,
    id_cliente int,
    id_tipo_servico int,
    foreign key (id_cliente) references clientes(id_cliente),
    foreign key (id_tipo_servico) references tipo_servico(id_tipo_servico)
);

create table usuarios (
    id_usuario  int primary key auto_increment,
    nome_completo varchar (255) not null,
    email varchar (255) not null,
    sexo enum ('Masculino', 'feminino') not null,
    data_nascimento date,
    data_cadastro date,
    cpf char(11) not null unique
);

create table login_usuarios (
    id_login int primary key auto_increment,
    usuario int,
    username varchar(50) not null unique,
    senha varchar(255) not null,
    data_cadastro timestamp default current_timestamp,
    foreign key (usuario) references usuarios(id_usuario)
);

create table status_licitacao (
    id_status int primary key auto_increment,
    nome_status varchar(30) not null unique
);

create table modalidade (
    id_modalidade int primary key auto_increment,
    nome_modalidade varchar(20) not null unique
);

CREATE TABLE licitacoes (
    id_cliente INT NOT NULL,
    id_licitacao INT PRIMARY KEY AUTO_INCREMENT,
    num_licitacao VARCHAR(50) NOT NULL UNIQUE,
    modalidade INT NOT NULL,
    orgao VARCHAR(255) NOT NULL,
    portal VARCHAR(50),
    numero_identificacao VARCHAR(100),
    status_licitacao INT NOT NULL,
    objeto TEXT,
    cidade VARCHAR(55),
    estado CHAR(2),
    data_licitacao DATE NOT NULL,
    FOREIGN KEY (modalidade) REFERENCES modalidade(id_modalidade),
    FOREIGN KEY (status_licitacao) REFERENCES status_licitacao(id_status),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);

create table tipos_documentos (
    id_documento int primary key auto_increment,
    descricao varchar(50) not null
);

create table documentos_licitacao (
	id_doc_licitacao int primary key auto_increment,
    id_documento int,
	num_licitacao VARCHAR(50) NOT NULL,
    foreign key (id_documento) references tipos_documentos(id_documento),
    foreign key (num_licitacao) references licitacoes(num_licitacao)
);

CREATE TABLE logs (
    id_log INT PRIMARY KEY AUTO_INCREMENT,
    tabela_afetada VARCHAR(255),
    operacao ENUM('inserir', 'editar', 'deletar') NOT NULL,
    id_registro INT NOT NULL,
    usuario INT, 
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    descricao TEXT
);


