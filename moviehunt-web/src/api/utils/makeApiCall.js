export default function makeApiCall(body) {
  return fetch("https://staging-movie-hunt-mh-hem.canonic.dev/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(JSON.stringify(json));
      return json;
    });
}
