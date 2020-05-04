export const filterEmployeeAssignments = (assignments, key) => {
    let arr = []
    if(assignments && assignments.length > 0){
      arr =   assignments.filter(m => m.status === key)
    }
    if(arr.length > 0 ) return arr
    else return false
    
    
}