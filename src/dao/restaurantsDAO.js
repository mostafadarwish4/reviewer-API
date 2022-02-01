

let restaurants;

 class restaurantsDAO{
   //static mean that functions are property to this class only not for any instance of the class
   //called only inside the class
    static async injectDB(conn){
        if(restaurants){return}
        try {
            restaurants=await conn.db(process.env.RESTREVIEWS_NS).collection('restaurants')
        } catch (error) {
            console.error('Unable to acess the database')
        }
        
    }
    static async getRestaurants({
        filters=null,
        page=0,
        restaurantsPerPage=0,
    }={}){
        let query;
        if(filters){
            if("name" in filters){
                query={$text:{$search:filters['name']}}
            }else if("cuisine" in filters){
                query={"cusine":{$eq:filters['cusine']}}
                
            }else if("zipcode" in filters){
                query={"address.zipcode":{$eq:filters["zipcode"]}}
            }
        }
        try {
            //estimate numbers of returns
            let cursor;
            /*
            Read operations that return multiple documents do not immediately return all values matching the query.
            Because a query can potentially match very large sets of documents,
            these operations rely upon an object called a cursor.
             A cursor fetches documents in (batches) to reduce both memory consumption and network bandwidth usage.
            Cursors are highly configurable and offer multiple interaction paradigms for different use cases.
            */
            cursor=await restaurants.find(query)
            let displayRestaurants=cursor.limit(restaurantsPerPage).skip(restaurantsPerPage*page)
            let restaurantsList= await displayRestaurants.toArray()
            let totalNumRestaurants=await restaurants.countDocuments(query)
            return {restaurantsList,totalNumRestaurants}
        } catch (error) {
           console.error('Unable to retrieve data') 
           return {restaurantsList:[],totalNumRestaurants:0}
        }
        
    }
}

module.exports=restaurantsDAO