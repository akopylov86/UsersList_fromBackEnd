import {getUserData, getUserList} from "../models/UserListModel";
import {renderPagination, renderUserList, renderUserProfile} from "../views/UserListView";

export async function showUserList(parametrs = ''){
    const userListObj = await getUserList(parametrs);
    renderUserList(userListObj);
    renderPagination(userListObj.page, userListObj.total_pages, !!(parametrs));
}

export async function showUser(id){
    const userObj = await getUserData(id);
    renderUserProfile(userObj);
}