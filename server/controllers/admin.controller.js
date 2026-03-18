const asyncHandler = require("express-async-handler")
const Skills = require("../models/Skills")
const Experiences = require("../models/Experiences")
const Projects = require("../models/Projects")
const About = require("../models/About")

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
    const { level } = req.body
    await Skills.findByIdAndUpdate(sid, req.body, { new: true })
    res.json({ message: "Skills Updated Successfully" })
})

exports.deleteSkills = asyncHandler(async (req, res) => {
    const { sid } = req.params
    await Skills.findByIdAndDelete(sid)
    res.json({ message: "Skills Deleted Successfully" })
})

// experiences section start
exports.addExperience = asyncHandler(async (req, res) => {
    const { role, company, period, description, responsibilities } = req.body
    const lastExperience = await Experiences.findOne().sort({ order: -1 })
    const order = lastExperience ? lastExperience.order + 1 : 0
    await Experiences.create({ role, company, period, description, responsibilities, order })
    res.status(201).json({ message: "Experience Added Successfully" })
})

exports.getExperience = asyncHandler(async (req, res) => {
    const result = await Experiences.find().sort({ order: 1 })
    res.json({ message: "Experience Fetch Successfully", result })
})

exports.updateExperience = asyncHandler(async (req, res) => {
    const { eid } = req.params
    const { role, company, period, responsibilities } = req.body
    await Experiences.findByIdAndUpdate(eid, req.body)
    res.json({ message: "Experience Updated Successfully" })
})

exports.deleteExperience = asyncHandler(async (req, res) => {
    const { eid } = req.params
    await Experiences.findByIdAndDelete(eid)
    res.json({ message: "Experience Delete Successfully" })
})

// project section start
exports.addProject = asyncHandler(async (req, res) => {
    const { title, description, category, technologies, imageURL, liveURL, gitHubURL } = req.body
    await Projects.create({ title, description, category, imageURL, technologies, liveURL, gitHubURL })
    res.status(201).json({ message: "Project Added Successfully" })
})

exports.getProjects = asyncHandler(async (req, res) => {
    const result = await Projects.find().sort({ createdAt: -1 })
    res.json({ message: "Project Fetch Successfully", result })
})

exports.updateProject = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const { title, description, technologies, imageURL, liveURL, gitHubURL } = req.body
    await Projects.findByIdAndUpdate(pid, req.body)
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
    await About.create({ name, title, introduction, journey, currentWork, dob, location, email, phone, languages, profileImage })
    res.status(201).json({ message: "About Information Added Successfully" })
})

exports.ReadAboutInfo = asyncHandler(async (req, res) => {
    const result = await About.find()
    res.json({ message: "About Information Fetch Successfully", result })
})

exports.updateAboutInfo = asyncHandler(async (req, res) => {
    const { aid } = req.params
    const { title, introduction, currentWork, location, email, phone, languages, profileImage } = req.body
    await About.findByIdAndUpdate(aid, req.body)
    res.status(201).json({ message: "About Information Updated Successfully" })
})

exports.deleteAboutInfo = asyncHandler(async (req, res) => {
    const { aid } = req.params
    await About.findByIdAndDelete(aid)
    res.status(201).json({ message: "About Information Deleted Successfully" })
})