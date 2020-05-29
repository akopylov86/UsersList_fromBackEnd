import {getUserList} from "../models/UserListModel";

const viewDataStructure = [
    ['last_name', 'text'],
    ['first_name', 'text'],
    ['email', 'text'],
    ['avatar', 'img'],
]
const container = document.body.querySelector('.container');

export function renderUserList(userListObj) {
    const userList = userListObj.data;

    clearUserList();
    let listHTMLView = [];
    for (let userObj of userList){
        let userContainer = document.createElement('div');
        userContainer.className = 'user_container';
        renderUser(userObj,userContainer);
        listHTMLView.push(userContainer);
    }
    container.append(...listHTMLView);
}

function renderUser(userObj, userContainer){
    //fill properties
    let userHTMLView =[];
    for(let field of viewDataStructure){
        const key = field[0];
        const type = field[1];
        let userDiv = document.createElement('div');
        userDiv.className = 'user';
        userDiv.id = key;
        if(type ===  'img'){
            let userImg = document.createElement('img');
            userImg.src = userObj[key];
            userImg.alt = '';
            userDiv.append(...[userImg]);
        }else {
            userDiv.innerHTML = userObj[key];
        }
        userHTMLView.push(userDiv);
    }
    userContainer.append(...userHTMLView);
}

export function renderPagination(curr_page, total_pages, isUpdating = false){
    const pages = document.body.querySelectorAll('.pagination > li');
    for(let i=0; i<pages.length; i++){
        let page = pages[i];
        page.classList.remove('active','inactive');
        if(i >= total_pages){
            page.classList.add('inactive');
        }
        if(curr_page === i+1){
            page.classList.add('active');
        }
        // if(!isUpdating) {
            page.addEventListener('click', () => {
                changePage(i + 1)
            })
        // }
    }
}

function clearUserList(){
    const usersList = document.body.querySelectorAll('.container > .user_container:not(.list_header)')
    for(let user of usersList){
        user.remove();
    }
}
function changePage(pageNumber){
    getUserList('?page=' + pageNumber);
}