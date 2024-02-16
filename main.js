//#region Получение JSON Постов

async function json_response_posts(){
    let url = 'https://jsonplaceholder.typicode.com/posts';
    let response = await fetch(url);
    posts = await response.json(); // читаем ответ в формате JSON
    
    for (let i = 0; i < posts.length; i++){
        document.querySelector('.posts__block__text').innerHTML +=
        `<div class="json__block" id="block_post">
            <h2 class="posts__block__h2">${JSON.stringify(posts[i].title)}</h2>
            <p class="posts__block__p">${JSON.stringify(posts[i].body)}</p>
            <a class="posts__block__button" onclick="more_info_post()" id="${posts[i].id}" href="/post">Подробнее</a>
        </div>
        `
    }

    page_edit_join()
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

//#region В момент клика на кнопку "Подробее"

let elem_global = document.getElementById('body');

elem_global.addEventListener('mousemove', function(event) {
let x = event.clientX;
let y = event.clientY;

elem = document.elementFromPoint(x, y)
})
function more_info_post() 
{   
    post_id = elem.id
    json_response_post(post_id);
}
//#endregion


//#region Получение JSON Комментариев
async function json_response_comments(){
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

    page_edit_join()
}

//#endregion

//#region Получение JSON Пользователей
async function json_response_users(){
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

    page_edit_join()
}

//#endregion

//#region Словарь Пользователей

let local_users = [
    {
        email: 'user123@mail.ru',
        username: 'User',
        password: 'Qwerty123',
    },
    {
        email: 'kirill21012023@gmail.com',
        username: 'KiRiLL',
        password: '123456',
    }
]

//#endregion

//#region Аунтефикация

function auth_user() {
    let username = document.querySelector('#auth_username').value;
    let password = document.querySelector('#auth_password').value;

    for (let i = 0; i < local_users.length; i++) {
        if (local_users[i].username === username && local_users[i].password === password) {
            auth = true;
        }
    }
}

//#endregion

//#region Изменение страниц при авторизации

function page_edit_join() {
    if (auth == true)
    {
        let join_button = document.querySelector('#button_join')
        join_button.remove()
        document.querySelector('#header_wrap').innerHTML +=
        `<a class="header__wrap__a__join" style="text-decoration: none;" onclick="out_join()" id="button_join">Log out</a>`
        console.log(auth)
    }
}

function out_join() {
    auth = false;

    if (window.location.pathname === '/') {
        json_response_posts()
    }

    if (window.location.pathname === '/comments') {
        json_response_comments()
    }

    if (window.location.pathname === '/users') {
        json_response_users()
    }
}


//#endregion

//#region Регистрация

function registration() {
    let reg_email = document.querySelector('#reg_email').value;
    let reg_username = document.querySelector('#reg_username').value;
    let reg_password = document.querySelector('#reg_password').value;

    if (reg_email.length > 5 && reg_username.length > 4 && reg_password.length > 4) {
        local_users.push(
            {
                email: reg_email,
                username: reg_username,
                password: reg_password,
            }
        )
        alert('Успешная регистрация')
        console.log(local_users)
    } else {
        alert('Неверные данные')
    }
}

//#endregion


document.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
        route(e)
    }
    e.preventDefault();
});

const route = (e) => {
    window.history.pushState({}, '', e.target.href);
    handleLocation();
}

const routers = {
    '/': 'posts.html',
    '/comments': 'comments.html',
    '/users' : 'users.html',
    '/join' : 'auth.html',
    '/reg' : 'registr.html',
    '/post' : 'post.html',
}

const handleLocation = async () => {
    const path =  window.location.pathname;
    const html = await fetch(routers[path]).then((data)=> data.text());
    document.querySelector('#container').innerHTML = html;
}

let auth = false;
let elem, post_id = 0;

if (window.location.pathname === '/') {
    json_response_posts()
    page_edit_join()
}

// if (window.location.pathname === 'post') {
//     json_response_post()
//     console.log('post')
// }


window.onpopstate = handleLocation;
window.route = route;
handleLocation();


