import {renderPagination, renderUserList} from "../views/UserListView";

const url ='https://reqres.in/api/users';
let userListObj;
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

