import {renderUserList} from "../views/UserListView";

let url ='https://reqres.in/api/users/';
let userListObj;
export async function getUserList(parametrs = '') {
    if (parametrs) {
        //update url w/params
    }

    let response = await fetch(url);
    if (response.ok && response.status == 200){
        userListObj = await response.json();
        renderUserList(userListObj);
    }
}

