import { Request, Response, Router } from "express"
require("../middlewares/Passport");
import passport from "passport";
import adminRouter from "../controllers/admin";
import userRouter from "../controllers/user";
import authentication from "../middlewares/authentication";
import { checkPermission } from "../middlewares/permission";
import filterData from "../middlewares/filterData";
import {createProxyMiddleware } from 'http-proxy-middleware'
import routerInternalApi from "../controllers/internalApi";
const router: Router = Router();

router.get("/login", (req: Request, res: Response) => {
  res.send("<a href='/google'>Login with Google</a>")
})

// google authentication with passport
router.get("/google", passport.authenticate('google', { scope: ['profile', 'email'] }));
// google authentication callback
router.get('/google/callback', passport.authenticate('google', 
{ 
failureRedirect: 'http://192.168.1.17:4200/login', 
}), (req:any,res:Response)=>{

  if(req.user === undefined){
    res.redirect('http://192.168.1.17:4200/login')
  }
    console.log("Token and Role ---> ",req.user);
    const token = req.user[0];
    const role = req.user[1];
    if(role === 'Admin'){
      res.redirect(`http://192.168.1.23:8000/homepage?Admintoken=${token}`);
    }else{
      res.redirect(`http://192.168.1.17:4200/timesheet?token=${token}`);
    }
});

router.get("/homepage", (req, res) => {
  res.send("Homepage")
});

var restream = function (proxyReq:any, req:Request, res:Response) {
  if (req.body) {
    let bodyData = JSON.stringify(req.body);

    proxyReq.setHeader("Content-Type", "application/json");
    proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
    proxyReq.write(bodyData);
  }
};

const apiProxy = createProxyMiddleware("/aggregation/v1", {
  target: 'http://192.168.1.42:3000',
  changeOrigin: true,
  onProxyReq:restream,
  onError: (err, req, res) => {
    res.status(500).json({ error: 'Error while proxying request' });
  }
})

var filestream = function (proxyReq: any, req: any, res: Response) {
  if (req.file) {
    proxyReq.setHeader("Content-Type", 'multipart/form-data');
  }
};

const mediaProxy = createProxyMiddleware("/media/v2",{
  target:"http://192.168.1.42:3001",
  changeOrigin:true,
  onProxyReq: filestream,
  onError: (err, req, res) => {
    res.status(500).json({ error: 'Error while proxying request' });
  }
})

router.use("/internalapi", routerInternalApi)
router.use(mediaProxy);         
router.use(authentication);
// router.use(checkPermisson);
router.use("/admin",checkPermission, adminRouter);
router.use("/user",checkPermission, userRouter);
router.use(checkPermission,apiProxy);



export default router