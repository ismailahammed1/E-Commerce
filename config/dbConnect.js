const {default:mongoose}=require('mongoose')

const dbConnect = ()=>{
    try {
        const  Connect=mongoose.connect(process.env.MONGODB_URL);
        
        console.log('Database Connected Successfully');
    } catch (error) {
        console.log('Databaser error');
    }
}
module.exports=dbConnect;