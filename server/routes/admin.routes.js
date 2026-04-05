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

    // projects section
    .post("/add-project", admin.addProject)
    .get("/get-projects", admin.getProjects)
    .patch("/update-project/:pid", admin.updateProject)
    .delete("/delete-project/:pid", admin.deleteProject)

    // about section
    .post("/add-about-info", admin.addAboutInfo)
    .get("/read-about-info", admin.ReadAboutInfo)
    .patch("/update-about-info/:aid", admin.updateAboutInfo)
    .delete("/delete-about-info/:aid", admin.deleteAboutInfo)

    // education section
    .post("/add-education-info", admin.addEducationInfo)
    .get("/get-education-info", admin.getEducationInfo)
    .patch("/update-education-info/:eid", admin.updateEducationInfo)
    .delete("/delete-education-info/:eid", admin.deleteEducationInfo)


    // status section 
    .get("/dashboard-stats", admin.getDashboardStats)

module.exports = router