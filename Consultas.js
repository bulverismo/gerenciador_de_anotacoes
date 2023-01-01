// TODO:
// buscar o criar tabelas e o popular tabelas de arquivos para aqui ficar mais limpo

class Consultas {

    static queryDeletaAnotacao = (idAnotacao) => `
        DELETE FROM anotacao
        WHERE 
            id = ${idAnotacao}; 
    `
    static queryDeletaNota = (idNota) => `
        DELETE FROM nota
        WHERE 
            id = ${idNota}; 
    `
    static queryDeletaCartao = (idCartao) => `
        DELETE FROM cartao 
        WHERE 
            id = ${idCartao}; 
    `
    static queryAtualizaAnotacao = (titulo, resumo, idAnotacao) => `
        UPDATE anotacao
        SET titulo = "${titulo}" ,
            resumo = "${resumo}"
        WHERE 
            id = ${idAnotacao}; 
    `
    static queryAtualizaNota = (titulo, resumo, idNota, idAnotacao) => `
        UPDATE nota 
        SET titulo = "${titulo}" ,
            resumo = "${resumo}" ,
            id_anotacao = "${idAnotacao}" 
        WHERE 
            id = ${idNota}; 
    `
    static queryAtualizaCartao = (titulo, resumo, idNota, idCartao) => `
        UPDATE cartao 
        SET titulo = "${titulo}" ,
            resumo = "${resumo}" ,
            id_nota = "${idNota}" 
        WHERE 
            id = ${idCartao}; 
    `
    static queryInserirAnotacao = (titulo, resumo) => `
        INSERT INTO anotacao(titulo, resumo)
        VALUES ('${titulo}','${resumo}') 
    `
    static queryInserirNota = (titulo, resumo, idAnotacao) => `
        INSERT INTO nota(titulo, resumo, id_anotacao)
        VALUES ('${titulo}', '${resumo}', '${idAnotacao}') 
    `
    static queryInserirCartao = (titulo, resumo, idNota) => `
        INSERT INTO cartao(titulo, resumo, id_nota)
        VALUES ('${titulo}', '${resumo}', '${idNota}') 
    `
    static queryBuscarNotasDeUmaAnotacao = (idAnotacao) => `
        SELECT * FROM nota
        WHERE id_anotacao=${idAnotacao};
    `
    static queryBuscarCartoesDeUmaNota = (idNota) => `
        SELECT * FROM cartao 
        WHERE id_nota=${idNota};
    `
    static queryBuscarPorId = (entidade, id) => `
        SELECT * FROM ${entidade}
        WHERE id=${id};
    `
    static queryBuscarTodas = (entidade) => `
        SELECT * FROM ${entidade};
    `
    static fazValerChavesEstrangeiras = `
        PRAGMA foreign_keys=ON;
    `        
    static popularTabelas = `
        ${this.fazValerChavesEstrangeiras}

        INSERT INTO anotacao (titulo, resumo)
        VALUES ('Fisica', 'Magni minus consectetur autem nihil a omnis accusantium dolorum. Consequatur tenetur voluptates aut at corporis dolor dolorem. Eaque nam voluptatem est aspernatur corrupti laboriosam odit. Culpa veritatis voluptatem saepe ea culpa et doloremque. Aut ipsa corporis dicta eos alias debitis occaecati.');

        INSERT INTO anotacao (titulo, resumo)
        VALUES ('Matematica', 'Consequatur tenetur voluptates aut at corporis dolor dolorem. Eaque nam voluptatem est aspernatur corrupti laboriosam odit. Culpa veritatis voluptatem saepe ea culpa et doloremque. Aut ipsa corporis dicta eos alias debitis occaecati.');

        INSERT INTO anotacao (titulo, resumo)
        VALUES ('Linux', 'tenetur voluptates aut at corporis dolor dolorem. Eaque nam voluptatem est aspernatur corrupti laboriosam odit. Culpa veritatis voluptatem saepe ea culpa et doloremque. Aut ipsa corporis dicta eos alias debitis occaecati.');

        INSERT INTO nota (titulo, resumo, id_anotacao)
        VALUES ('Medidas,Unidades e Grandezas', 'Introduz a idéia do que é física e da uma idéia de medições e também sobre representação de números.', 1);

        INSERT INTO nota (titulo, resumo, id_anotacao)
        VALUES ('Calculo 1', 'Magni minus consectetur autem nihil a omnis accusantium dolorum. Consequatur tenetur voluptates aut at corporis dolor dolorem. Eaque nam voluptatem est aspernatur corrupti laboriosam odit. Culpa veritatis voluptatem saepe ea culpa et doloremque. Aut ipsa corporis dicta eos alias debitis occaecati.', 2);

        INSERT INTO nota (titulo, resumo, id_anotacao)
        VALUES ('Shell', 'Master', 3);

        INSERT INTO cartao (titulo, resumo, id_nota)
        VALUES ("Titu","Magni minus consectetur autem nihil a omnis accusantium dolorum. Consequatur tenetur voluptates aut at corporis dolor dolorem. Eaque nam voluptatem est aspernatur corrupti laboriosam odit. Culpa veritatis voluptatem saepe ea culpa et doloremque. Aut ipsa corporis dicta eos alias debitis occaecati.",1);

        INSERT INTO cartao (titulo, resumo, id_nota)
        VALUES ("Titu","Magni minus consectetur autem nihil a omnis accusantium dolorum. Consequatur tenetur voluptates aut at corporis dolor dolorem. Eaque nam voluptatem est aspernatur corrupti laboriosam odit. Culpa veritatis voluptatem saepe ea culpa et doloremque. Aut ipsa corporis dicta eos alias debitis occaecati.",1);

        INSERT INTO cartao (titulo, resumo, id_nota)
        VALUES ("Titu","Magni minus consectetur autem nihil a omnis accusantium dolorum. Consequatur tenetur voluptates aut at corporis dolor dolorem. Eaque nam voluptatem est aspernatur corrupti laboriosam odit. Culpa veritatis voluptatem saepe ea culpa et doloremque. Aut ipsa corporis dicta eos alias debitis occaecati.",1);

        INSERT INTO cartao (titulo, resumo, id_nota)
        VALUES ("Titu","Magni minus consectetur autem nihil a omnis accusantium dolorum. Consequatur tenetur voluptates aut at corporis dolor dolorem. Eaque nam voluptatem est aspernatur corrupti laboriosam odit. Culpa veritatis voluptatem saepe ea culpa et doloremque. Aut ipsa corporis dicta eos alias debitis occaecati.",1);

        INSERT INTO cartao (titulo, resumo, id_nota)
        VALUES ("Titu","Magni minus consectetur autem nihil a omnis accusantium dolorum. Consequatur tenetur voluptates aut at corporis dolor dolorem. Eaque nam voluptatem est aspernatur corrupti laboriosam odit. Culpa veritatis voluptatem saepe ea culpa et doloremque. Aut ipsa corporis dicta eos alias debitis occaecati.",1);

        INSERT INTO cartao (titulo, resumo, id_nota)
        VALUES ("Titu","Magni minus consectetur autem nihil a omnis accusantium dolorum. Consequatur tenetur voluptates aut at corporis dolor dolorem. Eaque nam voluptatem est aspernatur corrupti laboriosam odit. Culpa veritatis voluptatem saepe ea culpa et doloremque. Aut ipsa corporis dicta eos alias debitis occaecati.",1);

        INSERT INTO cartao (titulo, resumo, id_nota)
        VALUES ("Titu","Magni minus consectetur autem nihil a omnis accusantium dolorum. Consequatur tenetur voluptates aut at corporis dolor dolorem. Eaque nam voluptatem est aspernatur corrupti laboriosam odit. Culpa veritatis voluptatem saepe ea culpa et doloremque. Aut ipsa corporis dicta eos alias debitis occaecati.",2);

        INSERT INTO cartao (titulo, resumo, id_nota)
        VALUES ("Titu","Magni minus consectetur autem nihil a omnis accusantium dolorum. Consequatur tenetur voluptates aut at corporis dolor dolorem. Eaque nam voluptatem est aspernatur corrupti laboriosam odit. Culpa veritatis voluptatem saepe ea culpa et doloremque. Aut ipsa corporis dicta eos alias debitis occaecati.",2);

        INSERT INTO cartao (titulo, resumo, id_nota)
        VALUES ("Titu","Magni minus consectetur autem nihil a omnis accusantium dolorum. Consequatur tenetur voluptates aut at corporis dolor dolorem. Eaque nam voluptatem est aspernatur corrupti laboriosam odit. Culpa veritatis voluptatem saepe ea culpa et doloremque. Aut ipsa corporis dicta eos alias debitis occaecati.",2);

        INSERT INTO cartao (titulo, resumo, id_nota)
        VALUES ("Titu","Magni minus consectetur autem nihil a omnis accusantium dolorum. Consequatur tenetur voluptates aut at corporis dolor dolorem. Eaque nam voluptatem est aspernatur corrupti laboriosam odit. Culpa veritatis voluptatem saepe ea culpa et doloremque. Aut ipsa corporis dicta eos alias debitis occaecati.",2);

        INSERT INTO cartao (titulo, resumo, id_nota)
        VALUES ("Titu","Magni minus consectetur autem nihil a omnis accusantium dolorum. Consequatur tenetur voluptates aut at corporis dolor dolorem. Eaque nam voluptatem est aspernatur corrupti laboriosam odit. Culpa veritatis voluptatem saepe ea culpa et doloremque. Aut ipsa corporis dicta eos alias debitis occaecati.",2);

        INSERT INTO cartao (titulo, resumo, id_nota)
        VALUES ("Titu","Magni minus consectetur autem nihil a omnis accusantium dolorum. Consequatur tenetur voluptates aut at corporis dolor dolorem. Eaque nam voluptatem est aspernatur corrupti laboriosam odit. Culpa veritatis voluptatem saepe ea culpa et doloremque. Aut ipsa corporis dicta eos alias debitis occaecati.",2);

        INSERT INTO cartao (titulo, resumo, id_nota)
        VALUES ("Titu","Magni minus consectetur autem nihil a omnis accusantium dolorum. Consequatur tenetur voluptates aut at corporis dolor dolorem. Eaque nam voluptatem est aspernatur corrupti laboriosam odit. Culpa veritatis voluptatem saepe ea culpa et doloremque. Aut ipsa corporis dicta eos alias debitis occaecati.",2);

        INSERT INTO cartao (titulo, resumo, id_nota)
        VALUES ("Titu","Magni minus consectetur autem nihil a omnis accusantium dolorum. Consequatur tenetur voluptates aut at corporis dolor dolorem. Eaque nam voluptatem est aspernatur corrupti laboriosam odit. Culpa veritatis voluptatem saepe ea culpa et doloremque. Aut ipsa corporis dicta eos alias debitis occaecati.",2);

        INSERT INTO cartao (titulo, resumo, id_nota)
        VALUES ("Titu","Magni minus consectetur autem nihil a omnis accusantium dolorum. Consequatur tenetur voluptates aut at corporis dolor dolorem. Eaque nam voluptatem est aspernatur corrupti laboriosam odit. Culpa veritatis voluptatem saepe ea culpa et doloremque. Aut ipsa corporis dicta eos alias debitis occaecati.",2);

        INSERT INTO cartao (titulo, resumo, id_nota)
        VALUES ("Titu","Magni minus consectetur autem nihil a omnis accusantium dolorum. Consequatur tenetur voluptates aut at corporis dolor dolorem. Eaque nam voluptatem est aspernatur corrupti laboriosam odit. Culpa veritatis voluptatem saepe ea culpa et doloremque. Aut ipsa corporis dicta eos alias debitis occaecati.",2);

        INSERT INTO cartao (titulo, resumo, id_nota)
        VALUES ("builtins","comandos internos do linux.",3);

    `
    static destruirTabelas = `
        DROP TABLE IF EXISTS cartao;
        DROP TABLE IF EXISTS nota;
        DROP TABLE IF EXISTS anotacao;
    `
    static criarTabelas = `
        CREATE TABLE anotacao (
            id integer PRIMARY KEY AUTOINCREMENT,
            titulo text NOT NULL,
            resumo text 
        );
        CREATE TABLE nota (
            id integer PRIMARY KEY AUTOINCREMENT,
            titulo text NOT NULL,
            resumo text,
            id_anotacao integer,
            FOREIGN KEY (id_anotacao)
                REFERENCES anotacao (id)
                    ON DELETE CASCADE
                    ON UPDATE NO ACTION
        );
        CREATE TABLE cartao (
            id integer PRIMARY KEY AUTOINCREMENT,
            titulo text NOT NULL,
            resumo text NOT NULL,
            id_nota integer,
            FOREIGN KEY (id_nota)
                REFERENCES nota (id)
                    ON DELETE CASCADE
                    ON UPDATE NO ACTION
        );
    `
}

module.exports = Consultas
