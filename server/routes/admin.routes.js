const router = require("express").Router()
const admin = require("../controllers/admin.controller.js")

router
    .post("/add-skills", admin.addSkills)
    .get("/get-skills", admin.getSkills)
    .patch("/update-skills/:sid", admin.updateSkills)
    .delete("/delete-skills/:sid", admin.deleteSkills)

module.exports = router