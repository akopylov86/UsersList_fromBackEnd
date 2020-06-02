const baseUrl ='https://reqres.in/api/users';
let userListObj;
let userObj;
const dataStructure = [
    //name, field_type, visibility
    ['last_name', 'text', true],
    ['first_name', 'text', true],
    ['email', 'text', true],
    ['avatar', 'img', true],
    ['id', 'parent_id', false],
]

export class User {
    constructor(id) {
        this.id = id;
    }
    async refreshData(){

        const obj = await getUserData(this.id);
        for(let key of Object.keys(this)){
            if(typeof obj[key] == 'undefined'){
                delete this[key];
            }
        }

        if(obj.data){
            ({id:this.id ,
                last_name: this.last_name,
                first_name: this.first_name,
                email: this.email,
                avatar: this.avatar} = (obj.data));
        }
    }

    updateUser(){
       let result = putUserData(this);
        console.log('UpdateUser');
       return result;
    }
}



export function getDataStructure(){
    return dataStructure;
}


export async function getUserList(page = '') {
    let url = baseUrl;
    if (page) {
        url += '?page=' + page;
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

function putUserData(user){
    let dataToPut = {};
    let keyInDB = '';
    for (let key of Object.keys(user)){
        if(key.startsWith('changed_')){
            keyInDB = key.slice(8);
            if(user[key] !== user[keyInDB]){
                dataToPut[keyInDB] = user[key];
            }
        }
    }
    let data = JSON.stringify(dataToPut);
    if(data == '{}'){return true};

    let url = baseUrl + '/' + user.id;
    console.log('putToBase', data);
    let result = putData(url,data);
    return result;

}

async function putData(url, data){
    const response = await fetch(url, {
        method: 'PUT',
        body: data
    });
    console.log('got data')
    if (response.ok && response.status === 200){
        return true;
    }
}