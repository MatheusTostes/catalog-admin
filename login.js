const urlPost = 'https://catalognodejs2022-matheustostes.vercel.app/login';
// const urlData = 'https://teste-jwt-matheustostes.vercel.app/clients';
const userName = document.getElementById('user-name');
const userPass = document.getElementById('user-pass');
const btnLogin = document.getElementById('btn-login');
const btnData = document.getElementById('btn-dados');
let token = ''

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
}

const loginError = () => {
  alert('Erro ao se conectar, contate o administrador do sistema.')
}

btnLogin.addEventListener('click', sendCredentials)

const getData = async (token) => {
  const header = {
    'x-access-token': token,
  }

  const teste = localStorage.getItem('x-access-token')
  // console.log(teste);
  // const data = await axios.get(urlData, {
  //   headers: {
  //     'x-access-token': token
  //   }
  // })
  // console.log(data);
}

btnData.addEventListener('click', getData(token))
