const urlPost = 'https://catalognodejs2022-matheustostes.vercel.app/login';
const urlData = 'https://catalog-admin-matheustostes.vercel.app/data.html';
const userName = document.getElementById('user-name');
const userPass = document.getElementById('user-pass');
const btnLogin = document.getElementById('btn-login');
const btnData = document.getElementById('btn-dados');

const sendCredentials = async () => {
  const data = {
    "user":userName.value,
    "password":userPass.value,
  }
  const response = await axios.post(urlPost, data).catch((err) => {
    loginError();
  })
  const { token } = response.data
  localStorage.setItem('x-access-token',token)
  window.location.href = urlData
}

const loginError = () => {
  alert('Erro ao se conectar, contate o administrador do sistema.')
}

btnLogin.addEventListener('click', sendCredentials)
