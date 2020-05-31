import {renderPagination, renderUserList, renderUserProfile} from "../views/UserListView";

const baseUrl ='https://reqres.in/api/users';
let userListObj;
let userObj;
export async function getUserList(parametrs = '') {
    let url = baseUrl;
    if (parametrs) {
        url += parametrs;
    }
    userListObj = await getData(url);
    renderUserList(userListObj);
    renderPagination(userListObj.page, userListObj.total_pages, !!(parametrs))
}

export async function getUser(userId){
    if(!userId) return;
    const url = baseUrl +'/'+userId;
    userObj = await getData(url);
    renderUserProfile(userObj);
}

async function getData(url){
    let response = await fetch(url);
    if (response.ok && response.status === 200){
        const userDataObj = await response.json();
        return userDataObj;
    }
}
