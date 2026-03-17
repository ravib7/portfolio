const asyncHandler = require("express-async-handler")
const Skills = require("../models/Skills")
const Experiences = require("../models/Experiences")

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