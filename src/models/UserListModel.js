const baseUrl ='https://reqres.in/api/users';
let userListObj;
let userObj;
export async function getUserList(parametrs = '') {
    let url = baseUrl;
    if (parametrs) {
        url += parametrs;
    }
    userListObj = await getData(url);
    return userListObj
}

export async function getUserData(userId){
    if(!userId) return;
    const url = baseUrl +'/'+userId;
    userObj = await getData(url);
    return userObj;
}

async function getData(url){
    let response = await fetch(url);
    if (response.ok && response.status === 200){
        const userDataObj = await response.json();
        return userDataObj;
    }
}
