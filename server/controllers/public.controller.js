const asyncHandler = require("express-async-handler")
const Skills = require("../models/Skills")
const Experiences = require("../models/Experiences")
const Projects = require("../models/Projects")
const About = require("../models/About")
const Education = require("../models/Education")

exports.getPublicSkills = asyncHandler(async (req, res) => {
    const frontend = await Skills.find({ category: "frontend" }).sort({ order: 1 })
    const backend = await Skills.find({ category: "backend" }).sort({ order: 1 })
    res.json({ message: "Skills Fetched Successfully", frontend, backend })
})

exports.getPublicExperience = asyncHandler(async (req, res) => {
    const result = await Experiences.find().sort({ order: 1 })
    res.json({ message: "Experience Fetched Successfully", result })
})

exports.getPublicProjects = asyncHandler(async (req, res) => {
    const result = await Projects.find().sort({ createdAt: -1 })
    res.json({ message: "Project Fetch Successfully", result })
})

exports.ReadPublicAboutInfo = asyncHandler(async (req, res) => {
    const result = await About.findOne()
    res.json({ message: "About Information Fetch Successfully", result })
})

exports.getPublicEducationInfo = asyncHandler(async (req, res) => {
    const result = await Education.find()
    res.status(201).json({ message: "Education Information Fetch Successfully", result })
})
