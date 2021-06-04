const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");

const app=express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname +"/signup.html");
    // req.sendFile(__dirname+"/style.css");
}); 

app.post("/",function(req,res){

const first=req.body.first;
const last=req.body.last;
const email=req.body.mail;

const data={
    members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:first,
                LNAME:last
            }
        }
    ]
};

let jsonData=JSON.stringify(data);

const options={
    url:"https://us18.api.mailchimp.com/3.0/lists/81e0f263ca",
    method: "POST",
    headers:{
        "Authorization": "shubham 3f06ba19a729c2a8289d487e1727f053-us18"
    },
    body:jsonData
};
  
request(options,function(error,response,body){
    if(error){
        res.sendFile(__dirname+"/failure.html");
    }
    else{
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
      
    }
});

 app.post("/failure",function(req,res){
     res.redirect("/");
 })
 
});

app.listen(process.env.PORT || 5500 , function(){
    console.log("server is running at port 3000");
})

