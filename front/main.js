const URLregex =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
fetch("http://localhost:5000/")
  .then((res) => res.json())
  .then((data) => {
    let list = document.getElementById("urls")
    data.forEach(u => {
        console.log(data)
        list.innerHTML+= `<li> <a href="http://localhost:5000/${u.path}" target='_blank'> http://localhost:5000/${u.path} </a> ${u.url} Visited: ${u.clicked} times <span class='copy' onclick="copyText('http://localhost:5000/${u.path}')" >Copy</span></li>`
    });
  });

async function shortenRequest() {
  let inputURL = document.getElementById("input").value;
  if (!URLregex.test(inputURL)) {
    document.getElementById("error").innerText = "Invalid URL, make sure to use HTTP(S)";
    return;
  }
  document.getElementById("input").value = ''
  await fetch("http://localhost:5000/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: inputURL }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (!data.error) {
        console.log(data);
        document.getElementById(
          "urls"
        ).innerHTML += `<li> <a href="http://localhost:5000/${data.path}" target='_blank'> http://localhost:5000/${data.path} </a> ${data.url} Clicked: ${data.clicked} times <span class='copy' onclick="copyText('http://localhost:5000/${data.path}')" >Copy</span></li>`;
        document.getElementById("error").innerText = "";
      }
      if (data.error) {
        document.getElementById("error").innerText = data.error;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
document.getElementById("button").addEventListener("click", () => {
  shortenRequest();
});

function copyText(text){
    navigator.clipboard.writeText(text).then(function() {
        console.log('Async: Copying to clipboard was successful!');
      }, function(err) {
        console.error('Async: Could not copy text: ', err);
      });
}