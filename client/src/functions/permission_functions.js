

export const hasPermission = (user, permissions, code) => {
    let val = false
    if(user.is_manager) return true
    if(permissions && permissions.length > 0){
        val = permissions.includes(code)
    }
   
    return val

}