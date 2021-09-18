import express from 'express';

const router = express.Router();
//router.use('', userRouter);

router.get("/", (req, res) => {
    const params = { pageName: "home", header: "DESCL Manager" }
    res.render("index", params);
});
router.get("/mongo-manager", (req, res) => {
    const params = { pageName: "mongo", header: "DESCL Manager" }
    res.render("index", params);
});
router.get("/jobs-manager", (req, res) => {
    const params = { pageName: "jobs", header: "DESCL Manager" }
    res.render("index", params);
});

export default router;
