// made Andriyanov //
async function json_response(){
    let url = 'https://jsonplaceholder.typicode.com/users';
    let response = await fetch(url);
    
    users = await response.json(); // читаем ответ в формате JSON
    
    for (let i = 0; i < users.length; i++){
        document.querySelector('.posts__block__text').innerHTML += 
        `<div class="json__block" id="block_post">
            <h2 class="posts__block__h2">${JSON.stringify(users[i].username)}</h2>
            <p class="posts__block__p">${JSON.stringify(users[i].email)}</p>
        </div>`
    }
}

// made Andriyanov //
function create_user() {
    let title_value = document.getElementById("input_title")
    let text_value = document.getElementById("input_text")
    let blocks = document.querySelectorAll('#block_post')

    for (let i = 0; i < blocks.length; i++) {
        blocks[i].remove()
    }


    users.push({
        "username": title_value.value,
        "email": text_value.value,
    })

    // made Andriyanov //
    for (let i = 0; i < users.length; i++){
        document.querySelector('.posts__block__text').innerHTML += 
        `<div class="json__block" id="block_post">
            <h2 class="posts__block__h2">${JSON.stringify(users[i].username)}</h2>
            <p class="posts__block__p">${JSON.stringify(users[i].email)}</p>
        </div>`
    }
}

let users;
json_response();
