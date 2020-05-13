import moment from 'moment'

export const filterEmployeeAssignments = (assignments, key, sort) => {
    let arr = []
    if(assignments && assignments.length > 0){
      arr =   assignments.filter(m => m.status === key)
    }

    if(arr.length > 0 ) {
      if(sort) return arr.sort((a, b) => moment(b.deadline).diff(moment(a.deadline)))
      else return arr.sort((a, b) => moment(a.deadline).diff(moment(b.deadline)))
    }
    else return false
    
    
}