'use strict';

import {showUser, showUserList} from "../controllers/UserListController";

const viewDataStructure = [
    //name, field_type, visibility
    ['last_name', 'text', true],
    ['first_name', 'text', true],
    ['email', 'text', true],
    ['avatar', 'img', true],
    ['id', 'text', false],
]
const container = document.body.querySelector('.container_table');
const container_user_info = document.body.querySelector('.container_user_info');
const pages = document.body.querySelectorAll('.pagination > li');


export function renderUserList(userListObj) {
    const userList = userListObj.data;

    clearUserList();
    let listHTMLView = [];
    for (let userObj of userList){
        let userContainer = document.createElement('div');
        userContainer.className = 'user_container';
        renderUser(userObj,userContainer);
        userContainer.addEventListener('dblclick', showUserInfo)
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
        const visibility = field[2];
        let userDiv = document.createElement('div');
        userDiv.className = 'user';
        if(!visibility){
            userDiv.className = 'inactive';
        }
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

export function renderUserProfile(userObj){
    const userData = userObj.data;
    showUserInfoContainer(true);
    for(let field of viewDataStructure){
        const key = field[0];
        const type = field[1];
        let userInfoField = container_user_info.querySelector(`.user_${key}`);
        if(userInfoField){
            if(type === 'img'){
                userInfoField.src = userData[key];
            }else {
                userInfoField.value = userData[key];
            }
        }else{
            console.log(`Field ${key} not found in HTML container_user_info`);
        }
    }
}

export function renderPagination(curr_page, total_pages, isUpdating = false){

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
    const usersList = document.body.querySelectorAll('.container_table > .user_container:not(.list_header)')
    for(let user of usersList){
        user.remove();
    }
}
function changePage(pageNumber){
    showUserInfoContainer(false);
    showUserList('?page=' + pageNumber);
}

function showUserInfo(){
    let idField = this.querySelector('#id');
    if(idField){
        //to change in propper way
        let id = idField.innerHTML;
        showUser(id);
    }else {
        console.log('Id field not found');
    }
}
function showUserInfoContainer(show=false){
    if(show){
        container_user_info.classList.remove('inactive');
        let closeButton = container_user_info.querySelector('.edit_buttons > .cancel');
        closeButton.addEventListener('click', ()=>{showUserInfoContainer(false)})
    }else {
        container_user_info.classList.add('inactive');
    }
}