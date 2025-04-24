document.getElementById("btnCadastrar").addEventListener("click", function () {
  // Obter valores dos campos
  const nome = document.getElementById("nome").value.trim();
  const numero = document.getElementById("numero").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  // Validações básicas
  if (!nome) {
    alert("Por favor, insira seu nome completo");
    return;
  }

  if (nome.split(" ").length < 2) {
    alert("Por favor, insira seu nome e sobrenome");
    return;
  }

  if (!numero) {
    alert("Por favor, insira seu número");
    return;
  }

  if (!email) {
    alert("Por favor, insira seu email");
    return;
  }

  // Validação simples de email
  if (!email.includes("@") || !email.includes(".")) {
    alert("Por favor, insira um email válido");
    return;
  }

  if (!senha) {
    alert("Por favor, crie uma senha");
    return;
  }

  if (senha.length < 6) {
    alert("A senha deve ter pelo menos 6 caracteres");
    return;
  }

  // Se todas as validações passarem, redireciona
  window.location.href = "/pages/cadastro-finalizado.html";
});
