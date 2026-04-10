const asyncHandler = require("express-async-handler")
const Skills = require("../models/Skills")
const Experiences = require("../models/Experiences")
const Projects = require("../models/Projects")
const About = require("../models/About")
const Education = require("../models/Education")

// skills section start
exports.addSkills = asyncHandler(async (req, res) => {
    const { skillName, category, level } = req.body
    const lastSkill = await Skills.findOne({ category }).sort({ order: -1 })
    const order = lastSkill ? lastSkill.order + 1 : 0
    await Skills.create({ skillName, category, level, order })
    res.status(201).json({ message: "Skills Added Successfully" })
})

exports.getSkills = asyncHandler(async (req, res) => {
    const frontend = await Skills.find({ category: "frontend" }).sort({ order: 1 })
    const backend = await Skills.find({ category: "backend" }).sort({ order: 1 })
    res.json({ message: "Skills Fetched Successfully", frontend, backend })
})

exports.updateSkills = asyncHandler(async (req, res) => {
    const { sid } = req.params

    const allowedFields = ["skillName", "category", "level"]

    const updateData = {}

    for (let key in req.body) {
        if (allowedFields.includes(key) && req.body[key] !== undefined) {
            updateData[key] = req.body[key]
        }
    }

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: "No valid fields to update" })
    }

    await Skills.findByIdAndUpdate(sid, updateData,
        {
            new: true,
            runValidators: true
        })

    res.json({ message: "Skills Updated Successfully" })
})

exports.deleteSkills = asyncHandler(async (req, res) => {
    const { sid } = req.params
    await Skills.findByIdAndDelete(sid)
    res.json({ message: "Skills Deleted Successfully" })
})

// experiences section start
exports.addExperience = asyncHandler(async (req, res) => {
    const { role, company, startDate, endDate, description, responsibilities } = req.body

    let responseArray = []

    if (typeof responsibilities === "string") {
        responseArray = responsibilities
            .split("\n")
            .map(t => t.trim())
            .filter(Boolean)
    } else if (Array.isArray(responsibilities)) {
        responseArray = responsibilities
    }

    const lastExperience = await Experiences.findOne().sort({ order: -1 })
    const order = lastExperience ? lastExperience.order + 1 : 0
    await Experiences.create({ role, company, startDate, endDate, description, responsibilities: responseArray, order })
    res.status(201).json({ message: "Experience Added Successfully" })
})

exports.getExperience = asyncHandler(async (req, res) => {
    const result = await Experiences.find().sort({ order: 1 })
    res.json({ message: "Experience Fetched Successfully", result })
})

exports.updateExperience = asyncHandler(async (req, res) => {
    const { eid } = req.params

    const allowedFields = [
        "role",
        "company",
        "startDate",
        "endDate",
        "description",
        "responsibilities"
    ]

    const updateData = {}

    for (let key in req.body) {
        if (allowedFields.includes(key) && req.body[key] !== undefined) {

            if (key === "responsibilities") {
                let responseArray = []

                if (typeof req.body.responsibilities === "string") {
                    responseArray = req.body.responsibilities
                        .split("\n")
                        .map(t => t.trim())
                        .filter(Boolean)
                } else if (Array.isArray(req.body.responsibilities)) {
                    responseArray = req.body.responsibilities
                }

                updateData.responsibilities = responseArray

            } else {
                updateData[key] = req.body[key]
            }
        }
    }

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: "No valid fields to update" })
    }

    await Experiences.findByIdAndUpdate(eid, updateData, {
        new: true,
        runValidators: true
    })

    res.json({ message: "Experience Updated Successfully" })
})

exports.deleteExperience = asyncHandler(async (req, res) => {
    const { eid } = req.params
    await Experiences.findByIdAndDelete(eid)
    res.json({ message: "Experience Delete Successfully" })
})

// project section start
exports.addProject = asyncHandler(async (req, res) => {
    let { title, description, category, technologies, imageURL, liveURL, gitHubURL } = req.body

    if (typeof technologies === "string") {
        techArray = technologies.split(",").map(t => t.trim())
    } else if (Array.isArray(technologies)) {
        techArray = technologies
    }

    await Projects.create({ title, description, category, imageURL, technologies: techArray, liveURL, gitHubURL })
    res.status(201).json({ message: "Project Added Successfully" })
})

exports.getProjects = asyncHandler(async (req, res) => {
    const result = await Projects.find().sort({ createdAt: -1 })
    res.json({ message: "Project Fetch Successfully", result })
})

exports.updateProject = asyncHandler(async (req, res) => {
    const { pid } = req.params

    const allowedFields = ["title", "description", "category", "technologies", "imageURL", "liveURL", "gitHubURL"]

    const updateData = {}

    for (let key in req.body) {
        //                   👇 check if something exists in a list (Is this key inside allowedFields list?)
        if (allowedFields.includes(key) && req.body[key] !== undefined) {

            if (key === "technologies") {
                let techArray = []

                if (typeof req.body.technologies === "string") {
                    techArray = req.body.technologies
                        .split(",")
                        .map(t => t.trim())
                        .filter(Boolean)
                } else if (Array.isArray(req.body.technologies)) {
                    techArray = req.body.technologies
                }

                updateData.technologies = techArray

            } else {
                updateData[key] = req.body[key]
            }
        }
    }

    //    👇 Converts object into array of keys ["title", "description"]
    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: "No valid fields to update" })
    }

    await Projects.findByIdAndUpdate(pid, updateData, {
        new: true,
        runValidators: true
    })

    res.json({ message: "Project Updated Successfully" })
})

exports.deleteProject = asyncHandler(async (req, res) => {
    const { pid } = req.params
    await Projects.findByIdAndDelete(pid)
    res.json({ message: "Project Deleted Successfully" })
})

// about section start
exports.addAboutInfo = asyncHandler(async (req, res) => {
    const { name, title, introduction, journey, currentWork, dob, location, email, phone, languages, profileImage } = req.body

    if (typeof languages === "string") {
        languagesArray = languages.split(",").map(t => t.trim())
    } else if (Array.isArray(languages)) {
        languagesArray = languages
    }

    await About.create({ name, title, introduction, journey, currentWork, dob, location, email, phone, languages: languagesArray, profileImage })
    res.status(201).json({ message: "About Information Added Successfully" })
})

exports.ReadAboutInfo = asyncHandler(async (req, res) => {
    const result = await About.findOne()
    res.json({ message: "About Information Fetch Successfully", result })
})

exports.updateAboutInfo = asyncHandler(async (req, res) => {
    const { aid } = req.params

    const allowedFields = ["name", "title", "introduction", "journey", "currentWork", "dob", "location", "email", "phone", "languages", "profileImage"]

    const updateData = {}

    for (let key in req.body) {
        if (allowedFields.includes(key) && req.body[key] !== undefined) {
            if (key === "languages") {
                let languagesArray = []

                if (typeof req.body.languages === "string") {
                    languagesArray = req.body.languages
                        .split(",")
                        .map(t => t.trim())
                        .filter(Boolean)
                } else if (Array.isArray(req.body.languages)) {
                    languagesArray = req.body.languages
                }

                updateData.languages = languagesArray

            } else {
                updateData[key] = req.body[key]
            }
        }
    }

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: "No valid fields to update" })
    }

    await About.findByIdAndUpdate(aid, updateData, { new: true, runValidators: true })

    res.json({ message: "About Information Updated Successfully" })
})

exports.deleteAboutInfo = asyncHandler(async (req, res) => {
    const { aid } = req.params
    await About.findByIdAndDelete(aid)
    res.json({ message: "About Information Deleted Successfully" })
})

// Education section Start
exports.addEducationInfo = asyncHandler(async (req, res) => {
    const { degree, college, field, startYear, endYear } = req.body
    await Education.create({ degree, college, field, startYear, endYear })
    res.status(201).json({ message: "Education Information Added Successfully" })
})

exports.getEducationInfo = asyncHandler(async (req, res) => {
    const result = await Education.find()
    res.status(201).json({ message: "Education Information Fetch Successfully", result })
})

exports.updateEducationInfo = asyncHandler(async (req, res) => {
    const { eid } = req.params

    const allowedFields = ["degree", "college", "field", "startYear", "endYear"]

    const updateData = {}

    for (let key in req.body) {
        if (allowedFields.includes(key) && req.body[key] !== undefined) {
            updateData[key] = req.body[key]
        }
    }

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: "No valid fields to update" })
    }

    await Education.findByIdAndUpdate(eid, updateData, { new: true, runValidators: true })

    res.json({ message: "Education Information Updated Successfully" })
})

exports.deleteEducationInfo = asyncHandler(async (req, res) => {
    const { eid } = req.params
    await Education.findByIdAndDelete(eid)
    res.json({ message: "Education Information Deleted Successfully" })
})

// status section start
exports.getDashboardStats = asyncHandler(async (req, res) => {
    const projectCount = await Projects.countDocuments()
    const experienceCount = await Experiences.countDocuments()
    const skillsCount = await Skills.countDocuments()

    res.json({
        message: "All Data Fetch Successfully", result: {
            projectCount,
            experienceCount,
            skillsCount
        }
    })
})