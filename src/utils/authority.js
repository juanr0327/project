// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString =
    typeof str === 'undefined' ? localStorage.getItem('antd-pro-authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority || ['admin'];
}

export function getUserTel() {
  return localStorage.getItem('tel')
}

export function setAuthority(authority, tel) {
  console.log(authority)
  let proAuthority = typeof authority === 'string' ? [authority] : authority;

  if (authority === 1) {
    proAuthority = ['user']
  } else if (authority === 2) {
    proAuthority = ['admin']
  } else {
    proAuthority = ['guest']
  }

  localStorage.setItem("tel", tel)

  return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}
