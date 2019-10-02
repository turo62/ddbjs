const BASE_URL = 'https://jsonplaceholder.typicode.com';

let usersDivEl;
let postsDivEl;
let commentsDivEl;
let photosDivEl;
let albumsDivEl;
let loadButtonEl;
let postsButtonEl;
let albumsButtonEl;

function createPostsList(posts) {
    const ulEl = document.createElement('ul');

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        // creating paragraph
        const strongEl = document.createElement('strong');
        strongEl.textContent = post.title;

        const postIdAttr = document.createAttribute('post-id');
        postIdAttr.value = post.id;
        const buttonEl = document.createElement('button');
        buttonEl.appendChild(strongEl);
        buttonEl.setAttributeNode(postIdAttr);
        buttonEl.addEventListener('click', onLoadComments);

        const pEl = document.createElement('p');
        pEl.appendChild(buttonEl);
        pEl.appendChild(document.createTextNode(`: ${post.body}`));

        // creating list item
        const liEl = document.createElement('li');
        liEl.appendChild(pEl);

        ulEl.appendChild(liEl);
    }

    return ulEl;
}

function onPostsReceived() {
    postsDivEl.style.display = 'block';

    const text = this.responseText;
    const posts = JSON.parse(text);

    const divEl = document.getElementById('posts-content');
    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createPostsList(posts));
}

function onLoadPosts() {
    const el = this;
    const userId = el.getAttribute('data-user-id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onPostsReceived);
    xhr.open('GET', BASE_URL + '/posts?userId=' + userId);
    xhr.send();
}

function createCommentsList(comments) {
    const ulEl = document.createElement('ul');

    for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];
        const strongEl = document.createElement('strong');
        strongEl.textContent = comment.name;
        const iEl = document.createElement('i');
        iEl.textContent = ' - ' + comment.email;

        // creating paragraph

        const pEl = document.createElement('p');
        pEl.appendChild(strongEl);
        pEl.appendChild(document.createTextNode(`: ${comment.body}`));
        pEl.appendChild(iEl);

        // creating list item
        const liEl = document.createElement('li');
        liEl.appendChild(pEl);

        ulEl.appendChild(liEl);
    }

    return ulEl;
}

function onCommentsReceived() {
    commentsDivEl.style.display = 'inline-block';

    const text = this.responseText;
    const comments = JSON.parse(text);

    const divEl = document.getElementById('comments');
    
    divEl.appendChild(createCommentsList(comments));
}

function onLoadComments() {
    const myEl = document.getElementById("comments");
    if (myEl !== null) {
        myEl.parentNode.removeChild(myEl);
    }

    const el = this;
    const postId = el.getAttribute('post-id');

    commentsDivEl = document.createElement('div');
    commentsDivEl.id = 'comments';
    el.parentNode.appendChild(commentsDivEl);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onCommentsReceived);
    xhr.open('GET', BASE_URL + '/comments?postId=' + postId);
    xhr.send();
}

function createAlbumsList(albums) {
    const ulEl = document.createElement('ul');

    for (let i = 0; i < albums.length; i++) {
        const album = albums[i];

        // creating paragraph
        const strongEl = document.createElement('strong');
        strongEl.textContent = album.title;

        const albumIdAttr = document.createAttribute('album-id');
        albumIdAttr.value = album.id;
        const buttonEl = document.createElement('button');
        buttonEl.appendChild(strongEl);
        buttonEl.setAttributeNode(albumIdAttr);
        buttonEl.addEventListener('click', onLoadPhotos);

        const aEl = document.createElement('a');
        aEl.appendChild(buttonEl);
        
        // creating list item
        const liEl = document.createElement('li');
        liEl.appendChild(aEl);

        ulEl.appendChild(liEl);
    }

    return ulEl;
}

function onAlbumsReceived() {
    const text = this.responseText;
    const albums = JSON.parse(text);

    const divEl = document.getElementById('albums-content');
    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createAlbumsList(albums));
}

function onLoadAlbums() {
    const el = this;
    const userId = el.getAttribute('data-user-id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onAlbumsReceived);
    xhr.open('GET', BASE_URL + '/albums?userId=' + userId);
    xhr.send();
}

function createPhotosList(photos) {
    const divEl = document.createElement('div');
    divEl.classList.add('photos');

    for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];

        const aEl = document.createElement('a');
        aEl.setAttribute('href', photo.url);

        const imgEl = document.createElement('img');
        imgEl.setAttribute('src', photo.thumbnailUrl);
        
        aEl.appendChild(imgEl);
        divEl.appendChild(aEl);
    }

    return divEl;
}

function onPhotosReceived() {
    const text = this.responseText;
    const photos = JSON.parse(text);

    const divEl = document.getElementById('photos');
    
    divEl.appendChild(createPhotosList(photos));
}

function onLoadPhotos() {
    const myEl = document.getElementById("photos");
    if (myEl !== null) {
        myEl.parentNode.removeChild(myEl);
    }

    const el = this;
    const albumId = el.getAttribute('album-id');

    photosDivEl = document.createElement('div');
    photosDivEl.id = 'photos';
    el.parentNode.appendChild(photosDivEl);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onPhotosReceived);
    xhr.open('GET', BASE_URL + '/photos?albumId=' + albumId);
    xhr.send();
}

function createUsersTableHeader() {
    const idTdEl = document.createElement('td');
    idTdEl.textContent = 'Id';

    const nameTdEl = document.createElement('td');
    nameTdEl.textContent = 'Name';

    const trEl = document.createElement('tr');
    trEl.appendChild(idTdEl);
    trEl.appendChild(nameTdEl);

    const theadEl = document.createElement('thead');
    theadEl.appendChild(trEl);
    return theadEl;
}

function createUsersTableBody(users) {
    const tbodyEl = document.createElement('tbody');

    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        // creating id cell
        const idTdEl = document.createElement('td');
        idTdEl.textContent = user.id;

        // creating name cell
        const dataUserIdAttr = document.createAttribute('data-user-id');
        dataUserIdAttr.value = user.id;

        const buttonEl = document.createElement('button');
        buttonEl.textContent = user.name;
        buttonEl.setAttributeNode(dataUserIdAttr);
        buttonEl.addEventListener('click', onLoadPosts);
        buttonEl.addEventListener('click', onLoadAlbums);

        const nameTdEl = document.createElement('td');
        nameTdEl.appendChild(buttonEl);

        // creating row
        const trEl = document.createElement('tr');
        trEl.appendChild(idTdEl);
        trEl.appendChild(nameTdEl);

        tbodyEl.appendChild(trEl);
    }

    return tbodyEl;
}

function createUsersTable(users) {
    const tableEl = document.createElement('table');
    tableEl.appendChild(createUsersTableHeader());
    tableEl.appendChild(createUsersTableBody(users));

    postsButtonEl.style.display = 'initial';
    postsButtonEl.addEventListener('click', () => {
        postsDivEl.style.display = 'block';
        albumsDivEl.style.display = 'none';
    });

    albumsButtonEl.style.display = 'initial';
    albumsButtonEl.addEventListener('click', () => {
        postsDivEl.style.display = 'none';
        albumsDivEl.style.display = 'block';
    });


    return tableEl;
}

function onUsersReceived() {
    loadButtonEl.remove();

    const text = this.responseText;
    const users = JSON.parse(text);

    const divEl = document.getElementById('users-content');
    divEl.appendChild(createUsersTable(users));
}

function onLoadUsers() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onUsersReceived);
    xhr.open('GET', BASE_URL + '/users');
    xhr.send();
}

document.addEventListener('DOMContentLoaded', (event) => {
    usersDivEl = document.getElementById('users');
    postsDivEl = document.getElementById('posts');
    postsDivEl.style.display = 'initial';
    albumsDivEl = document.getElementById('albums');
    loadButtonEl = document.getElementById('load-users');
    loadButtonEl.addEventListener('click', onLoadUsers);
    postsButtonEl = document.getElementById('posts-button');
    albumsButtonEl = document.getElementById('albums-button');
});