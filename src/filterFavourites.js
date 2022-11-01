export default function filterFavourites(reduxState, moviesList) { 
   
    moviesList.map(item => {
        reduxState.map(favItem => {
          if(item.id == favItem){
            item.favourite = true
          }
        })
  
        if(item.hasOwnProperty("favourite")){
          let sanoq = 0
          reduxState.map(favItem => {
            if(item.id == favItem){
              sanoq ++
            }
          })
  
          if(sanoq == 0){
            delete item.favourite
          }
        }
      })

      return moviesList
 }