// made Andriyanov //
async function json_response(){
    let url = 'https://jsonplaceholder.typicode.com/comments';
    let response = await fetch(url);
    
    comments = await response.json(); // читаем ответ в формате JSON
    
    for (let i = 0; i < comments.length; i++){
        document.querySelector('.posts__block__text').innerHTML += 
        `<div class="json__block" id="block_post">
            <h2 class="posts__block__h2">${JSON.stringify(comments[i].email)}</h2>
            <p class="posts__block__p">${JSON.stringify(comments[i].body)}</p>
        </div>`
    }
}

// made Andriyanov //
function create_comment() {
    let title_value = document.getElementById("input_title")
    let text_value = document.getElementById("input_text")
    let blocks = document.querySelectorAll('#block_post')

    for (let i = 0; i < blocks.length; i++) {
        blocks[i].remove()
    }


    comments.push({
        "email": title_value.value,
        "body": text_value.value,
    })

    // made Andriyanov //
    for (let i = 0; i < comments.length; i++){
        document.querySelector('.posts__block__text').innerHTML += 
        `<div class="json__block" id="block_post">
            <h2 class="posts__block__h2">${JSON.stringify(comments[i].email)}</h2>
            <p class="posts__block__p">${JSON.stringify(comments[i].body)}</p>
        </div>`
    }
}

let comments;

json_response();
