const router = require("express").Router()
const admin = require("../controllers/admin.controller.js")

router
    // skills section
    .post("/add-skills", admin.addSkills)
    .get("/get-skills", admin.getSkills)
    .patch("/update-skills/:sid", admin.updateSkills)
    .delete("/delete-skills/:sid", admin.deleteSkills)

    // experience section
    .post("/add-experience", admin.addExperience)
    .get("/get-experience", admin.getExperience)
    .patch("/update-experience/:eid", admin.updateExperience)
    .delete("/delete-experience/:eid", admin.deleteExperience)


module.exports = router