
//#region Генерирование страницы для постов

function generic_posts_page() {
    document.querySelector('#section').innerHTML +=
    `<div style="display: flex;" id="page_posts">
        <div class="form__block">
            <h2 class="form__block__h2">Создать пост</h2>
 
                <legend class="form__block__legend">Заголовок</legend>
                <textarea class="form__block__textarea" id="input_title"></textarea>

                <legend class="form__block__legend">Текст</legend>
                <textarea class="form__block__textarea" id="input_text"></textarea>

                <hr class="form__block__hr">

                <button class="form__block__button" onclick="create_post()">Сохранить</button>
        </div>

        <div class="posts__block" id="block">
            <div class="posts__block__text">
            </div>
        </div>
    </div>
    `
}

//#endregion
// made Andriyanov //

//#region Генерирование страницы для одного поста

function generic_post_page() {
    document.querySelector('#section').innerHTML =
    `
    <div class="posts__block" id="block" style="margin: 0 auto; padding-top: 1px; margin-top: 25px;">
            <div class="posts__block__text">
                
            </div>
    </div>
    `
}

//#endregion

//#region Получение JSON Постов

async function json_response(){
    let url = 'https://jsonplaceholder.typicode.com/posts';
    let response = await fetch(url);
    posts = await response.json(); // читаем ответ в формате JSON
    
    for (let i = 0; i < posts.length; i++){
        document.querySelector('.posts__block__text').innerHTML +=
        `<div class="json__block" id="block_post">
            <h2 class="posts__block__h2">${JSON.stringify(posts[i].title)}</h2>
            <p class="posts__block__p">${JSON.stringify(posts[i].body)}</p>
            <a class="posts__block__button" onclick="more_info_post()" id="${posts[i].id}">Подробнее</a>
        </div>
        `
    }
}

//#endregion

//#region Получение JSON Одного поста

async function json_response_post(post_id){
    let post = posts[post_id-1];
    
    let url_comment = `https://jsonplaceholder.typicode.com/posts/${post_id}/comments`;
    let response_comments = await fetch(url_comment)

    let comments = await response_comments.json();

    document.querySelector('.posts__block__text').innerHTML +=
        `<div class="json__block">
            <h2 class="posts__block__h2">${JSON.stringify(post.title)}</h2>
            <p class="posts__block__p">${JSON.stringify(post.body)}</p>
        </div>
        <div class="post__title__block">
            <h2 class="post__title__block__text">Комментарии</h2>
        <div>
        `

    for (let i = 0; i < comments.length; i++){
        document.querySelector('.posts__block__text').innerHTML +=
        `<div class="json__block">
            <h2 class="posts__block__h2">${JSON.stringify(comments[i].email)}</h2>
            <p class="posts__block__p">${JSON.stringify(comments[i].body)}</p>
        </div>
        `
    }

}

// #endregion
// made Andriyanov //

//#region Локальное создание JSON Постов

function create_post() {
    let title_value = document.getElementById("input_title")
    let text_value = document.getElementById("input_text")
    let blocks = document.querySelectorAll('#block_post')

    for (let i = 0; i < blocks.length; i++) {
        blocks[i].remove()
    }

    let length_kwarg = posts.length


    posts.push({
        userId: 7,
        id: length_kwarg + 1,
        title: title_value.value,
        body: text_value.value,
    })


    for (let i = 0; i < posts.length; i++){
        document.querySelector('.posts__block__text').innerHTML += 
        `<div class="json__block" id="block_post">
            <h2 class="posts__block__h2">${JSON.stringify(posts[i].title)}</h2>
            <p class="posts__block__p">${JSON.stringify(posts[i].body)}</p>
            <a class="posts__block__button" onclick="more_info_post()" id="${posts[i].id}">Подробнее</a>
        </div>`
    }
}

//#endregion

//#region Удаление страницы для постов
function delete_page_posts() {
    let elem = document.querySelector('#page_posts')
    elem.remove()
}
//#endregion
// made Andriyanov //

//#region В момент клика на кнопку "Подробее"
function more_info_post() 
{   
    let elem_global = document.getElementById('body');

    elem_global.addEventListener('mousemove', function(event) {
    let x = event.clientX;
    let y = event.clientY;

    elem = document.elementFromPoint(x, y)
    })

    post_id = elem.id
    page = "post";
    delete_page_posts();
    generic_post_page();
    json_response_post(post_id);
}
//#endregion

let posts, post, page = "posts";
// made Andriyanov //

json_response();
console.log(posts)

