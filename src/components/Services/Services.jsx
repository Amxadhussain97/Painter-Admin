export function getUser(id) {

  let token = localStorage.getItem('token');
  token = token.replace(/^\"(.+)\"$/, "$1");

  const result = fetch(`http://amaderlab.xyz/api/users/${id}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  })
    .then((res) => {
      res.json()

    })
    .then(res => {
    })


}