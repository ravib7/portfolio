const asyncHandler = require("express-async-handler")
const Skills = require("../models/Skills")

exports.addSkills = asyncHandler(async (req, res) => {
    const { skillName, category, level } = req.body
    const lastSkill = await Skills.findOne({ category }).sort({ order: -1 })
    const order = lastSkill ? lastSkill.order + 1 : 0
    await Skills.create({ skillName, category, level, order })
    res.status(200).json({ message: "Skills Added Successfully" })
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