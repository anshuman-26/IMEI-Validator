const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine','ejs');


app.get("/",(req,res)=>{
    res.render("index");
    
})

app.post('/', (req,res)=>{
    let value = req.body.imei;
    function sumDig(n)
    {
        let a = 0;
        while (n > 0)
        {
            a = a + n % 10;
            n = parseInt(n / 10, 10);
        }
        return a;
    }
    function isValidIMEI(n)
    {
 
        
        let s = n.toString();
        let len = s.length;
 
        if (len != 15)
            return false;
 
        let sum = 0;
        for(let i = len; i >= 1; i--)
        {
          let d = (n % 10);
 
          
          if (i % 2 == 0)
              d = 2 * d;
 
          
          sum += sumDig(d);
          n = parseInt(n / 10, 10);
        }
 
        return (sum % 10 == 0);
    }

    if (isValidIMEI(value))
        res.send("Valid IMEI Code");
    else
        res.send("Invalid IMEI Code");
})



app.listen(8000,()=>{
    console.log("Server started...")
})