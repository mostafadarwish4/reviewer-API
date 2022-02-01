const mongodb=require('mongodb')
const ObjectId=mongodb.ObjectId
let reviews;
module.exports= class reviewsDAO{
    static async injectDB(conn){
        if(reviews) return
        try {
            reviews=await conn.db(process.env.RESTREVIEWS_NS).collection('reviews')
            return reviews
        } catch (error) {
           console.error('Unable to connect to your database') 
        }
    }
    static async addReview(restaurantId,user,text,date){
        try {
            const reviewDoc={
                name:user.name,
                user_id:user._id,
                date,
                text,
                restaurant_id:ObjectId(restaurantId)
            }
            return await reviews.insertOne(reviewDoc)
        } catch (error) {
           console.log('Unable to insert your review try later'+error.message) 
           return {error}
        }
    }
    /////
    static async updateReview(reviewId,userId,date,text){
        try {
         const updateReview= await reviews.updateOne(
             {user_id:userId,_id:new ObjectId(reviewId)},
             {$set:{text,date}}
         )
         return updateReview
        } catch (error) {
         console.error(`Unable to update this review ${error.message}`)   
         return {error}
        }
    }
    /////
    static async deleteReview(userId,reviewId){
        try {
            const deleteResponse=await reviews.deleteOne({
                _id:ObjectId(reviewId),
                user_id:userId
            })       
            return deleteResponse
        } catch (e) {
            console.error('Unable to delete this review right now')
            return {error:e}
        }
    }
}