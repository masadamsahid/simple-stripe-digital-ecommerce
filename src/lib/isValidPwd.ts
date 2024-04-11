export async function isValidPwd(pwd: string, hashed_pwd: string) {
  return await hashedPwd(pwd) === hashed_pwd;
}

async function hashedPwd(pwd: string) {
  const arrayBuffer = await crypto.subtle.digest('SHA-512', new TextEncoder().encode(pwd));
  
  return Buffer.from(arrayBuffer).toString("base64");
}



