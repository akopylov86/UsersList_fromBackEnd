'use strict';

import {showUser, showUserList} from "../controllers/UserListController";
import {getDataStructure} from "../models/UserListModel";


const container = document.body.querySelector('.container_table');
const container_user_info = document.body.querySelector('.container_user_info');
const pages = document.body.querySelectorAll('.pagination > li');
const userInfoFields = container_user_info.querySelectorAll('input');
const closeButton = container_user_info.querySelector('.edit_buttons > .close');
const cancelButton = container_user_info.querySelector('.edit_buttons > .cancel');
const saveButton = container_user_info.querySelector('.edit_buttons > .save');
const editButton = container_user_info.querySelector('.edit_buttons > .edit');

const viewDataStructure = getDataStructure();
let currUser;

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
        userDiv.classList.add('user');
        if(!visibility){
            setVisibilityOnForm(false,userDiv);
        }
        userDiv.id = key;
        if(type ===  'img'){
            let userImg = document.createElement('img');
            userImg.src = userObj[key];
            userImg.alt = '';
            userDiv.append(...[userImg]);
        }else if(type === 'parent_id'){
            userContainer.id = userObj[key];
            continue;
        }else {
            userDiv.innerHTML = userObj[key];
        }
        userHTMLView.push(userDiv);
    }
    userContainer.append(...userHTMLView);
}

export function renderUserProfile(userData){
    currUser = userData;
    showDefaultUserInfoContainer(true);
    for(let field of viewDataStructure){
        const key = field[0];
        const type = field[1];
        if(type === 'parent_id'){
            continue;
        }
        let userInfoField = container_user_info.querySelector(`.user_${key}`);
        if(userInfoField){
            userInfoField.id = key;
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
        //TODO: refactor to setVisibilityOnForm(true, field)
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
    showDefaultUserInfoContainer(false);
    showUserList(pageNumber);
}

function showUserInfo(){
    let userId = this.id;
    if(userId){
        showUser(userId);
    }else {
        console.log('Id field not found');
    }
}

function showDefaultUserInfoContainer(show=false){
    allowEditUserInfo(false);
    if(show){
        setVisibilityOnForm(true,container_user_info, closeButton, editButton);
        closeButton.addEventListener('click', ()=>{showDefaultUserInfoContainer(false)})
        editButton.addEventListener('click', ()=>{allowEditUserInfo(true)});
        setVisibilityOnForm(false,cancelButton, saveButton);
    }else {
        setVisibilityOnForm(false,container_user_info);
        closeButton.removeEventListener('click',()=>{});
        editButton.removeEventListener('click', ()=>{});
        cancelButton.removeEventListener('click', ()=>{});
        saveButton.removeEventListener('click', ()=>{});
    }
}

function allowEditUserInfo(allowEdit=true){
    userInfoFields.forEach((item)=>{
        if (allowEdit) {
            item.removeAttribute("disabled")
            item.addEventListener('input', () => {userDataOnChange(item)})
        }else {
            item.setAttribute("disabled", true);
            item.removeEventListener('input', ()=>{});
        }
    });

    if (allowEdit) {
        saveButton.addEventListener('click', () => {
            saveUserData()
        })
        cancelButton.addEventListener('click', () => {
            stopEditingUserData();
        })
        setVisibilityOnForm(true, cancelButton, saveButton);
        setVisibilityOnForm(false, closeButton, editButton);
    }
}

function userDataOnChange(element){
    currUser.wasChanged = true;
    let key = element.id;

    if(currUser[key] == element.value){
        element.classList.remove('edited');
        delete currUser['changed_'+key];
    }else{
        element.classList.add('edited');
        currUser['changed_'+key] = element.value;
    }
}

function stopEditingUserData(){
    setVisibilityOnForm(true, closeButton, saveButton);
    updateCurrentUser();
}

async function saveUserData(){
    if(currUser.updateUser()){
        stopEditingUserData();
    }
}

async function updateCurrentUser(){
    await currUser.refreshData();
    renderUserProfile(currUser);
}

function setVisibilityOnForm(visibility, ...elements){
    for(let element of elements) {
        if (visibility) {
            element.classList.remove('inactive');
        } else {
            element.classList.add('inactive');
        }
    }
}