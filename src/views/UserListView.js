const viewDataStructure = [
    ['last_name', 'text'],
    ['first_name', 'text'],
    ['email', 'text'],
    ['avatar', 'img'],
]
export function renderUserList(userListObj) {
    const userList = userListObj.data;
    const container = document.body.querySelector('.container');
    let listHTMLView = [];
    for (let userObj of userList){
        let userContainer = document.createElement('div');
        userContainer.className = 'user_container';

        renderUser(userObj,userContainer);

        console.log( userContainer);
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
        let userDiv = document.createElement('div');
        userDiv.className = 'user';
        userDiv.id = key;
        if(type == 'img'){
            let userImg = document.createElement('img');
            userImg.src = userObj[key];
            userImg.alt = '';
            console.log(userImg);
            userDiv.append(...[userImg,]);
        }else {
            userDiv.innerHTML = userObj[key];
        }
        userHTMLView.push(userDiv);
    }
    userContainer.append(...userHTMLView);
}