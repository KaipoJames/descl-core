import express from 'express';

const router = express.Router();
//router.use('', userRouter);

router.get("/", async (req, res) => {
    const index = { pageName: "Home", header: "DESCL Manager" }
    res.render("index", index);
});
router.get("/mongo-manager", async (req, res) => {
    const index = { pageName: "Mongo", header: "DESCL Manager" }
    res.render("index", index);
});
router.get("/api-jobs-manager", async (req, res) => {
    const index = { pageName: "Jobs", header: "DESCL Manager" }
    res.render("index", index);
});

export default router;
