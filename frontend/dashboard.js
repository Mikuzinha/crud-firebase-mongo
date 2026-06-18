const API =
    "http://localhost:3000";

const token =
    localStorage.getItem("token");

async function carregar() {

    const resposta =
        await fetch(
            `${API}/produtos`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    const produtos =
        await resposta.json();

    const lista =
        document.getElementById("lista");

    lista.innerHTML = "";

    produtos.forEach(produto => {

        lista.innerHTML += `
            <li>
                ${produto.nome}
                - R$ ${produto.preco}
            </li>
        `;

    });
}

window.cadastrar = async () => {

    const nome =
        document.getElementById("nome").value;

    const preco =
        document.getElementById("preco").value;

    const quantidade =
        document.getElementById("quantidade").value;

    await fetch(`${API}/produtos`, {

        method: "POST",

        headers: {
            "Content-Type":
                "application/json",

            Authorization:
                `Bearer ${token}`
        },

        body: JSON.stringify({
            nome,
            preco,
            quantidade
        })

    });

    carregar();
};

carregar();