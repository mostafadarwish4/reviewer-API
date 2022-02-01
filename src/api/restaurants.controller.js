const restaurantsDAO = require('../dao/restaurantsDAO')

module.exports= class restaurantController{
    static async apiGetRestaurants(req,res,next){
        const restaurantsPerPage=req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage,10):20
        const page=req.query.page ? parseInt(req.query.page,10) : 0
        
        const filters={}
        if(req.query.cuisine){
            filters.cuisine=req.query.cuisine
        }else if(req.query.zipcode){
            filters.zipcode=req.query.zipcode
        }else if(req.query.name){
            filters.name=req.query.name
        }
        //back with data
        const {restaurantsList,totalNumRestaurants}=await restaurantsDAO.getRestaurants({
            filters,
            restaurantsPerPage,
            page
        })
        let response={
            retaurants:restaurantsList,
            filters,
            page,
            entries_per_page:restaurantsPerPage,
            total_resaults:totalNumRestaurants
        }
        res.send(response)
    }
}