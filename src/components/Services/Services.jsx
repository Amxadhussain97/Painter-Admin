export function getUser(id) {

    let token = localStorage.getItem('token');
        token = token.replace(/^\"(.+)\"$/, "$1");

        const  result = fetch(`http://127.0.0.1:8000/api/users/${id}`, {
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
                console.log(res);
            })
          

          console.log(result);
  
}