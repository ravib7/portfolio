const router = require("express").Router()
const public = require("../controllers/public.controller.js")

router
    .get("/get-public-skills", public.getPublicSkills)
    .get("/get-public-experience", public.getPublicExperience)
    .get("/get-public-projects", public.getPublicProjects)
    .get("/read-public-about-info", public.ReadPublicAboutInfo)
    .get("/get-public-education-info", public.getPublicEducationInfo)

module.exports = router