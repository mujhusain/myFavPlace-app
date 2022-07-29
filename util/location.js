 // Google map Api key
 const map_key = 'AIzaSyB1Grzz8kxP_4iXShaVuWwj4BVYXM0gcp0'
 export function getLocation(lat,lng){
     const src =`https://www.google.com/maps/embed/v1/place?key=${map_key}
         &q=${lat},${lng}&zoom=14`;
         return src;
        }
        
        // const src =`https://www.google.com/maps/embed/v1/place?key=AIzaSyB1Grzz8kxP_4iXShaVuWwj4BVYXM0gcp0
        //     &q=delhi&zoom=14`;