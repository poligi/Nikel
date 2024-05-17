const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

//<-------------------- Função de logar --------------->
document.getElementById("login-form").addEventListener("submit", function(e){
   e.preventDefault();

   const email = document.getElementById("email-input").value;
   const senha = document.getElementById("password-input").value;
   const checkSession = document.getElementById("session-input").checked;

   const account = getAccount(email);

   if(!account) {
      alert("Seu e-mail ou senha estão incorretos");
      return;
   }

   if(account) {
      if(account.password !== senha) {
         alert("Seu e-mail ou senha estão incorretos");
         return;
      }

      saveSession(email, checkSession);

      window.location.href = "home.html";

   }
});

//<---------------- Criar conta --------------------->
document.getElementById("create-form").addEventListener("submit", function(e){
   e.preventDefault();

   const email = document.getElementById("email-create-input").value;
   const senha = document.getElementById("password-create-input").value;
   const confirmSenha = document.getElementById("confirm-password-create-input").value;
   if(email.length < 5) {
    alert("Preencha o campo com um e-mail válido!")
    return;
   }

   if(senha.length < 4) {
    alert("A senha deve conter no mínimo 4 dígitos")
    return;
   }
   if(senha !== confirmSenha) {
    alert("As senhas não conferem!")
    return;
   }

   saveAccount ({
      login: email,
      password: senha,
      transactions: []
   });

   myModal.hide();

   alert("Sua conta foi criada com sucesso!");
});

//<------------- Verificação de login ------------->

function checkLogged() {
   if(session) {
      sessionStorage.setItem("logged", session);
      logged = session;
   }

   if(logged) {
      saveSession(logged, session);
      window.location.href = "home.html";
   }
}

//<------------- Salvar dados da conta ------------->

function saveAccount(data) {
   localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession) {
   if(saveSession) {
      localStorage.setItem("session", data);
   }

   sessionStorage.setItem("logged", data);
}

function getAccount(key) {
   const account = localStorage.getItem(key);

   if(account){
      return JSON.parse(account);
   }

   return "";
}