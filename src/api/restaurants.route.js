const express =require("express")
const restaurantController=require('./restaurants.controller')
const reviewsController=require('./reviews.controller')

const router=express.Router()

router.route('/').get(restaurantController.apiGetRestaurants)
router.route("/review")
      .post(reviewsController.apiPostReview)
      .put(reviewsController.apiUpdateReview)
      .delete(reviewsController.apiDeleteReview)
module.exports=router
