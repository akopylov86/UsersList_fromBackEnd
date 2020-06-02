import {getUserData, getUserList, User} from "../models/UserListModel";
import {renderPagination, renderUserList, renderUserProfile} from "../views/UserListView";

export async function showUserList(page = ''){
    const userListObj = await getUserList(page);
    renderUserList(userListObj);
    renderPagination(userListObj.page, userListObj.total_pages, !!(page));
}

export async function showUser(id){
    // const userObj = await getUserData(id);
    const user = new User(id);
    await user.refreshData();
    renderUserProfile(user);
}