"use strict"
const   express = require("express"),
        request = require("request"),
        cheerio = require("cheerio"),
        hbs = require("express-handlebars");
        // subdomain = require("express-subdomain");

let app = express(),
    router = express.Router();

app .set("views", `${__dirname}/views`)
    .set("port", process.env.PORT || 2020)
    .use(express.static(`${__dirname}/public`));

app.engine("handlebars", hbs.create({
    defaultLayout   : "common"
}).engine);
app.set("view engine", "handlebars");

router.route("/").get((req, res)=>{
    res.redirect("/techpoint");
});

router.route("/techpoint").get((req, res)=>{

    let url = "https://techpoint.ng/all-posts";
    let allPosts = [];
    let siteInfo = {}

    request(url, (err, response, html)=>{
        if(err){
            console.log("error: " + err)
        }else{
            let $ = cheerio.load(html);

            siteInfo.siteName = $(".site-title a").text();
            siteInfo.siteLink = $(".site-title a").attr("href");

            $("article").each((index, value)=>{

                let onePost = {}

                onePost.topic = $(value).find(".entry-title a").text();
                onePost.picture = $(value).find(".entry-content a img").attr("src");
                onePost.date = $(value).find("p .entry-time").text();
                onePost.postLink = $(value).find(".entry-title a").attr("href");
                onePost.website = $(".site-title a").text();
                onePost.siteLink = $(".site-title a").attr("href");

                allPosts.push(onePost);

                if(index==9){
                    return false;
                }
            })
            res.render("home", {
                "allPosts": allPosts,
                "siteInfo": siteInfo
            });
        }
    })
});

router.route("/thenation").get((req, res)=>{
    
        let url = "http://thenationonlineng.net/category/news/";
        let allPosts = [];
        let siteInfo = {}
    
        request(url, (err, response, html)=>{
            if(err){
                console.log("error: " + err)
            }else{
                let $ = cheerio.load(html);
    
                siteInfo.siteName = "The Nation";
                siteInfo.siteLink = $(".rtp-site-logo a").attr("href");
    
                $("article").each((index, value)=>{
    
                    let onePost = {}
    
                    onePost.topic = $(value).find(".entry-title a").text();
                    onePost.picture = "images/thenation.png"
                    onePost.date = $(value).find(".posted-on .entry-date").text();
                    onePost.postLink = $(value).find(".entry-title a").attr("href");
                    onePost.website = "The Nation";
                    onePost.siteLink = $(".rtp-site-logo a").attr("href");
    
                    allPosts.push(onePost);
    
                    if(index==9){
                        return false;
                    }
                })
                console.log(allPosts)
                res.render("home", {
                    "allPosts": allPosts,
                    "siteInfo": siteInfo
                });
            }
        })
    });

/* router.route("/thenation").get((req, res)=>{
    let url = "http://thenationonlineng.net/category/news/";

    request(url, (err, res, html)=>{
        if(err){
            console.log("error: " + err)
        }else{
            let $ = cheerio.load(html);


            let data = $("h2.entry-title a").text();
            console.log(data);
        }
    })
}); */

/* router.route("/punch").get((req, res)=>{
    let url = "http://punchng.com/all-posts/";

    request(url, (err, res, html)=>{
        if(err){
            console.log("error: " + err)
        }else{
            let $ = cheerio.load(html);
            let data = $("div.items div h2").text();
            console.log(data);
        }
    })
});

router.route("/vanguard").get((req, res)=>{
    let url = "https://www.vanguardngr.com/news/";

    request(url, (err, res, html)=>{
        if(err){
            console.log("error: " + err)
        }else{
            let $ = cheerio.load(html);
            let data = $("h2.entry-title a").text();
            console.log(data);
        }
    })
});

router.route("/tribune").get((req, res)=>{
    let url = "http://www.tribuneonlineng.com/category/latest-news/";

    request(url, (err, res, html)=>{
        if(err){
            console.log("error: " + err)
        }else{
            let $ = cheerio.load(html);
            let data = $("article div header h3.entry-title a").text();
            console.log(data);
        }
    })
}); */

// app.use(subdomain("allnews", router));
app.use("/", router);

app.listen(app.get("port"), ()=>console.log(`Server listening on IP: 127.0.0.1 \+ PORT: ${app.get("port")}`));