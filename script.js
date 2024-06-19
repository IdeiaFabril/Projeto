document.addEventListener('DOMContentLoaded', function() {
    const formularioUsuario = document.getElementById('formulario-usuario');
    const listaUsuarios = document.getElementById('lista-usuarios');
    const botaoLimparCampos = document.getElementById('limpar-campos');
    const botaoLimparLista = document.getElementById('limpar-lista');
    const campoPesquisa = document.getElementById('campo-pesquisa');

    carregarUsuarios();

    formularioUsuario.addEventListener('submit', function(event) {
        event.preventDefault();
        const nomeUsuario = document.getElementById('nome-usuario').value;
        const email = document.getElementById('email').value;
        const data = new Date().toLocaleString();
        const id = Date.now().toString();
        const usuario = { id, nomeUsuario, email, data };


        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        adicionarUsuarioNaLista(usuario);
        formularioUsuario.reset();
    });

    function adicionarUsuarioNaLista(usuario) {
        const li = document.createElement('li');
        li.textContent = `${usuario.data} - ${usuario.nomeUsuario} - ${usuario.email}`;
        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.addEventListener('click', function() {
            excluirUsuario(usuario.id);
            listaUsuarios.removeChild(li);
        });
        li.appendChild(botaoExcluir);
        listaUsuarios.appendChild(li);
    }

    function carregarUsuarios() {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.forEach(usuario => adicionarUsuarioNaLista(usuario));
    }

    function excluirUsuario(id) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios = usuarios.filter(usuario => usuario.id !== id);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    botaoLimparCampos.addEventListener('click', function() {
        formularioUsuario.reset();
    });

    botaoLimparLista.addEventListener('click', function() {
        localStorage.removeItem('usuarios');
        listaUsuarios.innerHTML = '';
    });

    campoPesquisa.addEventListener('input', function() {
        const termoPesquisa = campoPesquisa.value.toLowerCase();
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        listaUsuarios.innerHTML = '';
        usuarios.forEach(usuario => {
            if (usuario.nomeUsuario.toLowerCase().includes(termoPesquisa) || usuario.email.toLowerCase().includes(termoPesquisa)) {
                adicionarUsuarioNaLista(usuario);
            }
        });
    });
});
