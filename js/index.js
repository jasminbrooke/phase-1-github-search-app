document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("github-form");
    const userList = document.querySelector("#user-list")
    const reposList = document.getElementById("repos-list")
    
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        reposList.innerHTML = ""
        userList.innerHTML = ""
        fetch(`https://api.github.com/search/users?q=${event.target[0].value}`)
        .then(response => response.json())
        .then(response => {
            response.items.map(item => {
                const li = document.createElement("li")
                const h2 = document.createElement("h2")
                h2.textContent = item.login
                h2.addEventListener("click", e => showUserRepos(item.login, e))
                const img = document.createElement("img")
                img.src = item.avatar_url
                // put this a somewhere
                const a = document.createElement("a")
                a.href = item.url
                a.innerText = "Profile"

                li.append(h2, img, a)
                userList.append(li)

            })
        })
    }) 

    function showUserRepos(username, e) {
        e.preventDefault()
        fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(response => response.map(repo => {
            const li = document.createElement("li")
            const h1 = document.createElement ("h1")
            h1.textContent = repo.name
            li.append(h1)
            reposList.append(li)
        }))
    }
})