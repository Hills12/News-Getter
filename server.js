"use strict"
const   express = require("express"),
        request = require("request"),
        cheerio = require("cheerio"),
        hbs = require("express-handlebars");

let app = express(),
    router = express.Router();

app .set("views", `${__dirname}/views`)
    .set("port", process.env.PORT || 2020)
    .use(express.static(`${__dirname}/public`));

app.engine("handlebars", hbs.create({
    defaultLayout   : "common"
}).engine);
app.set("view engine", "handlebars");

// Make it random please
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
                onePost.picture = "img/thenation.png"
                onePost.date = $(value).find(".posted-on .entry-date").text();
                onePost.postLink = $(value).find(".entry-title a").attr("href");
                onePost.website = "The Nation";
                onePost.siteLink = $(".rtp-site-logo a").attr("href");

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

router.route("/punch").get((req, res)=>{
    
    let url = "http://punchng.com/all-posts/";
    let allPosts = [];
    let siteInfo = {}

    request(url, (err, response, html)=>{
        if(err){
            console.log("error: " + err)
        }else{
            let $ = cheerio.load(html);

            siteInfo.siteName = "Punch";
            siteInfo.siteLink = "http://punchng.com";

            $("div.items").each((index, value)=>{

                let onePost = {}

                onePost.topic = $(value).find(".filler div .seg-title").text();
                onePost.picture = $(value).find(".filler div figure").attr("data-src");
                onePost.date = $(value).find(".filler div .seg-time").text();
                onePost.postLink = $(value).find(".items a").attr("href");
                onePost.website = "Punch";
                onePost.siteLink = "http://punchng.com";

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

router.route("/vanguard").get((req, res)=>{
    
    let url = "https://www.vanguardngr.com/news/";
    let allPosts = [];
    let siteInfo = {}

    request(url, (err, response, html)=>{
        if(err){
            console.log("error: " + err)
        }else{
            let $ = cheerio.load(html);

            siteInfo.siteName = "Vanguard";
            siteInfo.siteLink = "https://www.vanguardngr.com";

            $("article").each((index, value)=>{

                let onePost = {}

                onePost.topic = $(value).find(".entry-title a").text();
                onePost.picture = $(value).find(".rtp-post-thumbnail a img").attr("data-lazy-src");
                onePost.date = $(value).find("p .entry-time").text();
                onePost.postLink = $(value).find(".entry-title a").attr("href");
                onePost.website = "Vanguard";
                onePost.siteLink = "https://www.vanguardngr.com";

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

router.route("/tribune").get((req, res)=>{
    
    let url = "http://www.tribuneonlineng.com/category/latest-news/";
    let allPosts = [];
    let siteInfo = {}

    request(url, (err, response, html)=>{
        if(err){
            console.log("error: " + err)
        }else{
            let $ = cheerio.load(html);

            siteInfo.siteName = "Tribune";
            siteInfo.siteLink = "http://www.tribuneonlineng.com";

            $("article").each((index, value)=>{

                let onePost = {}

                onePost.topic = $(value).find(".entry-title a").text();
                onePost.picture = $(value).find(".mh-loop-thumb a img").attr("src");
                onePost.date = "";
                onePost.postLink = $(value).find(".mh-excerpt p a").attr("href");
                onePost.website = "Tribune";
                onePost.siteLink = "http://www.tribuneonlineng.com";

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

// app.use(subdomain("allnews", router));
app.use("/", router);

app.listen(app.get("port"), ()=>console.log(`Server listening on IP: 127.0.0.1 \+ PORT: ${app.get("port")}`));