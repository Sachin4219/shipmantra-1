const users = []

// add user, remove user

function userJoin(id){
    users.push(id)
    return id
}

//user leaves 
function userLeaves(id){
    const index = users.findIndex(user => user.id === id)
    
    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}    

module.exports = {
    userJoin,
    userLeaves
}