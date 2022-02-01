const reviewsDAO=require('../dao/reviewsDAO')

module.exports=class reviewsController{
    static async apiPostReview(req,res,next){
    try{
        const restaurantId=req.body.restaurant_id
        const review=req.body.text
        const userInfo={
            name:req.body.name,
            _id:req.body.user_id
        }
        const date=new Date()
        console.log(req.body)
        const reviewResponse= await reviewsDAO.addReview(
            restaurantId,
            userInfo,
            review,
            date
        )
        res.json({status:'success'})
    }catch(e){
        res.status(500).json({error:e.message})
    }
    }
    /////
    static async apiUpdateReview(req,res,next){
        try {
           const reviewId=req.body.review_id
           const userId=req.body.user_id
           const text=req.body.text
           const date=new Date()
           const updateResponse=await reviewsDAO.updateReview(reviewId,userId,date,text)
           const {error}=updateResponse
           if(error){
               throw new Error(error.message)
           }
           if(updateResponse.modifiedCount===0){
               throw new Error('Unabe to update this review-User may not the original')
           }
           res.status(200).json({status:'success'})
        } catch (e) {
            res.status(500).json({error:e.message})
        }
    }
    ////
    static async apiDeleteReview(req,res,next){
        try {
            const reviewId=req.body.review_id
            const userId=req.body.user_id
            const deleteRESPONSE=await reviewsDAO.deleteReview(userId,reviewId)
            console.log(deleteRESPONSE)
            res.json({status:'success'})
        } catch (e) {
            res.status(500).json({error:e.message})
        }
        
    }
}