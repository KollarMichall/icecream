import iceCream from "../apis"


export const getMenu = () => {
    return iceCream.get("/api/menu")
    .then(response => {
        return response.data.sort((a, b) => {
            if (a.iceCream.name < b.iceCream.name) {
                return -1
                
            }
            if (a.iceCream.name > b.iceCream.name) {
                return 1
                
            }
            return 0
        })
    })
}

export const getMenuItem = (id) => {
    return iceCream.get(`/api/menu/${id}`)
    .then(response => response.data)
    .catch(err => {
        throw err
    })
}
export const putMenuItem = menuItem => {
    return iceCream.put(`/api/menu/${menuItem.id}`, menuItem)
    .then(response => response.data)
    .catch(err => {
        throw err
    })
}