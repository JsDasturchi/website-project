const initialState = []

export default function reducerFavourite(state = initialState, action) { 
    let currentFavourites = localStorage.getItem("favouriteMovies")
    let currentState = [...state]
    currentState = JSON.parse(currentFavourites)
    // console.log(currentState);
    state = currentState
    if(action.type == "setStorage"){

        let sanoq = 0
        currentState.map(item => {
            if(item == action.payload.id){
                sanoq ++
            }
        })

        if(sanoq == 0){
            currentState.push(action.payload.id)
        } else {
            currentState = currentState.filter(item => {
                return item != action.payload.id
            })
        }

        console.log(currentState)
        state = currentState
        localStorage.setItem("favouriteMovies", JSON.stringify(state))
        return state

    }


    return state
 }
 