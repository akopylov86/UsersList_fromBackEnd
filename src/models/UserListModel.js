import {renderPagination, renderUserList, renderUserProfile} from "../views/UserListView";

const url ='https://reqres.in/api/users';
let userListObj;
let userObj;
export async function getUserList(parametrs = '') {
    let updatedUrl = url
    if (parametrs) {
        //update url w/params
        updatedUrl += parametrs;
    }

    let response = await fetch(updatedUrl);
    if (response.ok && response.status === 200){
        userListObj = await response.json();
        renderUserList(userListObj);
        renderPagination(userListObj.page, userListObj.total_pages, !!(parametrs))
    }
}

export async function getUser(userId){
    if(!userId) return;
    const updatedUrl = url +'/'+userId;
    let response = await fetch(updatedUrl);
    if (response.ok && response.status === 200){
        userObj = await response.json();
        renderUserProfile(userObj);
    }
}

