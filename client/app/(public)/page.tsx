"use client";

import React, { useState, useEffect } from "react";
import { Building, Building2, CheckCircle, GraduationCap, Menu, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetPublicEducationInfoQuery,
  useGetPublicExperienceQuery,
  useGetPublicProjectsQuery,
  useGetPublicSkillsQuery,
  useReadPublicAboutInfoQuery,
} from "@/redux/apis/public.api";

import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, } from "react-icons/fa";
import { SiTypescript, SiMongodb, SiExpress, SiNextdotjs, SiTailwindcss, SiRedux, SiJsonwebtokens, SiBootstrap, SiPostman, SiRender, SiVercel, } from "react-icons/si";
import { Mail, Phone, MapPin, Calendar, Globe, Briefcase } from "lucide-react";
import { format } from "date-fns";

const Page = () => {
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("projects");


  const { data: skillsData } = useGetPublicSkillsQuery();
  const { data: experienceData } = useGetPublicExperienceQuery();
  const { data: projectData } = useGetPublicProjectsQuery();
  const { data: aboutData } = useReadPublicAboutInfoQuery();
  const { data: educationData } = useGetPublicEducationInfoQuery();

  const skillsFrontend = skillsData?.frontend || [];
  const skillsBackend = skillsData?.backend || [];
  const experience = experienceData?.result || [];
  const projects = projectData?.result || [];
  const education = educationData?.result || [];
  const about = aboutData?.result;

  useEffect(() => {
    const sections = [
      "hero",
      "about",
      "projects",
      "skills",
      "experience",
      "education",
      "contact",
    ];

    const handleScroll = () => {
      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const top = section.offsetTop - 100;
          const height = section.offsetHeight;

          if (window.scrollY >= top && window.scrollY < top + height) {
            setActive(id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <div className="bg-[#020617] text-white">

      {/* NAVBAR */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="flex justify-between items-center px-6 md:px-16 py-4">

          {/* LOGO */}
          <h1 className="text-xl font-bold text-white">
            {about?.name || "Portfolio"}
          </h1>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex gap-8 text-gray-300">
            {[
              "hero",
              "about",
              "projects",
              "skills",
              "experience",
              "education",
              "contact",
            ].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className={`relative group transition ${active === item ? "text-[#145EFB]" : "hover:text-[#145EFB]"
                  }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}

                {/* UNDERLINE */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-[#145EFB] transition-all duration-300
                     ${active === item ? "w-full" : "w-0 group-hover:w-full"}
                `}
                />
              </a>
            ))}
          </nav>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden px-6 pb-6 flex flex-col gap-4 bg-black/90 backdrop-blur-md">
            {[
              "hero",
              "about",
              "projects",
              "skills",
              "experience",
              "education",
              "contact",
            ].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={() => setOpen(false)}
                className={`${active === item
                  ? "text-[#145EFB]"
                  : "text-gray-300 hover:text-[#145EFB]"
                  }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="hero"
        className="min-h-screen pt-24 flex items-center justify-between px-6 md:px-16 relative overflow-hidden bg-[#0B0F19]"
      >
        {/* background glow */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#145EFB]/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#145EFB]/10 blur-3xl rounded-full"></div>

        {/* LEFT CONTENT */}
        <div className="max-w-2xl space-y-6 z-10">
          <h1 className="text-5xl md:text-6xl font-semibold leading-tight text-white">
            Hi, I'm{" "}
            <span className="text-[#145EFB]">
              {about?.name}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-[#CBD5E1]">
            {about?.title}
          </p>

          <p className="text-[#94A3B8] max-w-lg leading-relaxed">
            {about?.introduction}
          </p>

          {/* buttons */}
          <div className="flex gap-4 pt-2">
            <Button className="bg-[#145EFB] hover:bg-[#0F4FD1] text-white px-6 py-2 rounded-md transition cursor-pointer">
              Contact Me
            </Button>

            <Button
              variant="outline"
              className="border border-[#145EFB] text-[#145EFB] hover:bg-[#145EFB] hover:text-white px-6 py-2 rounded-md transition cursor-pointer"
            >
              Download CV
            </Button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden md:flex justify-center items-center">
          <Avatar className="w-80 h-80 border border-[#1E293B]">
            <AvatarImage
              src={about?.profileImage}
              className="object-top"
            />
            <AvatarFallback className="bg-[#0B0F19] text-white">
              RC
            </AvatarFallback>
          </Avatar>
        </div>
      </section>


      {/* ABOUT */}
      <section
        id="about"
        className="px-6 md:px-16 py-24 bg-[#0B0F19] relative overflow-hidden"
      >
        {/* background glow */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#145EFB]/10 blur-3xl rounded-full"></div>

        <div className="grid md:grid-cols-2 gap-16 items-stretch">

          {/* LEFT SIDE */}
          <div className="grid grid-cols-2 gap-4 h-full auto-rows-fr">

            {/* Location */}
            <div className="p-4 rounded-xl bg-[#020617] border border-[#1E293B] h-full flex flex-col items-center justify-center text-center">
              <MapPin className="text-[#145EFB] mb-2" />
              <p className="text-sm text-[#CBD5E1]">Location</p>
              <p className="text-white font-medium">{about?.location}</p>
            </div>

            {/* Email */}
            <div className="p-4 rounded-xl bg-[#020617] border border-[#1E293B] h-full flex flex-col items-center justify-center text-center">
              <Mail className="text-[#145EFB] mb-2" />
              <p className="text-sm text-[#CBD5E1]">Email</p>
              <p className="text-white font-medium break-all">{about?.email}</p>
            </div>

            {/* Phone */}
            <div className="p-4 rounded-xl bg-[#020617] border border-[#1E293B] h-full flex flex-col items-center justify-center text-center">
              <Phone className="text-[#145EFB] mb-2" />
              <p className="text-sm text-[#CBD5E1]">Phone</p>
              <p className="text-white font-medium">{about?.phone}</p>
            </div>

            {/* DOB */}
            <div className="p-4 rounded-xl bg-[#020617] border border-[#1E293B] h-full flex flex-col items-center justify-center text-center">
              <Calendar className="text-[#145EFB] mb-2" />
              <p className="text-sm text-[#CBD5E1]">Date of Birth</p>
              <p className="text-white font-medium">
                {about?.dob && !isNaN(new Date(about.dob).getTime())
                  ? format(new Date(about.dob), "do MMMM yyyy")
                  : "—"}
              </p>
            </div>

            {/* Languages */}
            <div className="p-4 rounded-xl bg-[#020617] border border-[#1E293B] col-span-2 h-full flex flex-col items-center justify-center text-center">
              <Globe className="text-[#145EFB] mb-2" />
              <p className="text-sm text-[#CBD5E1]">Languages</p>
              <p className="text-white font-medium">
                {about?.languages?.join(", ")}
              </p>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6 h-full flex flex-col justify-between">

            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white">
                About <span className="text-[#145EFB]">Me</span>
              </h2>

              <p className="text-[#CBD5E1] leading-relaxed">
                {about?.introduction}
              </p>

              {/* Journey */}
              {about?.journey && (
                <div className="p-5 rounded-xl bg-[#020617] border border-[#1E293B]">
                  <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <Briefcase size={18} className="text-[#145EFB]" />
                    My Journey
                  </h3>
                  <p className="text-[#CBD5E1] text-sm leading-relaxed">
                    {about?.journey}
                  </p>
                </div>
              )}

              {/* Current Work */}
              {about?.currentWork && (
                <div className="p-5 rounded-xl bg-[#020617] border border-[#1E293B]">
                  <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <Briefcase size={18} className="text-[#145EFB]" />
                    Current Work
                  </h3>
                  <p className="text-[#CBD5E1] text-sm leading-relaxed">
                    {about?.currentWork}
                  </p>
                </div>
              )}
            </div>

            {/* BUTTON */}
            <button className="mt-6 bg-[#145EFB] hover:bg-[#0F4FD1] text-white px-6 py-2 rounded-md transition cursor-pointer">
              Download CV
            </button>

          </div>

        </div>
      </section>


      {/* PROJECTS */}
      <section
        id="projects"
        className="px-6 md:px-16 py-24 bg-[#0B0F19] relative overflow-hidden"
      >
        {/* background glow */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#145EFB]/10 blur-3xl rounded-full"></div>

        {/* heading */}
        <h2 className="text-4xl font-bold mb-16 text-center text-white">
          My <span className="text-[#145EFB]">Projects</span>
        </h2>

        {/* grid */}
        <div className="grid md:grid-cols-3 gap-10 items-stretch">

          {projects.map((proj) => (
            <div
              key={proj._id}
              className="group relative rounded-xl overflow-hidden 
        border border-[#1E293B] 
        bg-[#020617]/80 backdrop-blur-sm
        hover:-translate-y-3
        hover:shadow-[0_0_25px_rgba(20,94,251,0.25)]
        transition duration-300 flex flex-col h-full"
            >

              {/* TOP ACCENT LINE */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#145EFB] to-transparent opacity-0 group-hover:opacity-100 transition"></div>

              {/* IMAGE */}
              <div className="h-60 overflow-hidden relative">
                <img
                  src={proj.imageURL}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              </div>

              {/* CONTENT */}
              <div className="p-5 flex flex-col h-full">

                {/* TOP CONTENT */}
                <div className="space-y-3 flex-1">

                  <h3 className="text-lg font-semibold text-white group-hover:text-[#145EFB] transition">
                    {proj.title}
                  </h3>

                  {/* ✅ FULL DESCRIPTION (NO CLAMP) */}
                  <p className="text-sm text-[#CBD5E1] leading-relaxed">
                    {proj.description}
                  </p>

                  {/* TECH STACK */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {proj.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs bg-[#0B0F19] border border-[#1E293B] px-2 py-1 rounded text-[#CBD5E1] group-hover:border-[#145EFB]/40 transition"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>

                {/* BUTTONS (ALWAYS BOTTOM) */}
                <div className="flex gap-3 pt-1 mt-auto">

                  {proj.liveURL && (
                    <a href={proj.liveURL} target="_blank">
                      <button className="bg-[#145EFB] hover:bg-[#0F4FD1] text-white text-sm px-4 py-1.5 rounded transition shadow-md hover:shadow-[0_0_10px_rgba(20,94,251,0.6)] cursor-pointer">
                        Live
                      </button>
                    </a>
                  )}

                  {proj.gitHubURL && (
                    <a href={proj.gitHubURL} target="_blank">
                      <button className="border border-[#1E293B] text-white text-sm px-4 py-1.5 rounded hover:bg-[#0B0F19] hover:border-[#145EFB] transition cursor-pointer">
                        Code
                      </button>
                    </a>
                  )}

                </div>

              </div>
            </div>
          ))}

        </div>
      </section>


      {/* SKILLS */}
      <section id="skills" className="px-6 md:px-16 py-24 bg-[#0B0F19] relative overflow-hidden">

        {/* glow */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#145EFB]/10 blur-3xl rounded-full"></div>

        <h2 className="text-4xl font-bold mb-16 text-center text-white">
          My <span className="text-[#145EFB]">Skills</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-10">

          {/* FRONTEND */}
          <div className="bg-[#020617] border border-[#1E293B] rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-6 text-[#145EFB]">
              Frontend
            </h3>

            <div className="space-y-4">
              {skillsFrontend.map((skill) => {

                const getIcon = (name: string) => {
                  const key = name.toLowerCase();

                  const map: Record<string, React.ReactNode> = {
                    html: <FaHtml5 className="text-orange-500" />,
                    css3: <FaCss3Alt className="text-blue-500" />,
                    css: <FaCss3Alt className="text-blue-500" />,
                    javascript: <FaJs className="text-yellow-400" />,
                    react: <FaReact className="text-cyan-400" />,
                    "react.js": <FaReact className="text-cyan-400" />,
                    typescript: <SiTypescript className="text-blue-600" />,
                    tailwind: <SiTailwindcss className="text-cyan-400" />,
                    "tailwind css": <SiTailwindcss className="text-cyan-400" />,
                    redux: <SiRedux className="text-purple-500" />,
                    "redux toolkit": <SiRedux className="text-purple-500" />,
                    next: <SiNextdotjs className="text-white" />,
                    "next.js": <SiNextdotjs className="text-white" />,
                    bootstrap: <SiBootstrap className="text-purple-600" />,
                    git: <FaGitAlt className="text-orange-500" />,
                    postman: <SiPostman className="text-orange-400" />,
                    render: <SiRender className="text-purple-400" />,
                    vercel: <SiVercel className="text-white" />,
                    "rest apis": <Globe className="text-[#145EFB]" />,
                  };

                  return map[key] ?? <Globe className="text-[#145EFB]" />;
                };

                return (
                  <div
                    key={skill._id}
                    className="flex items-center justify-between bg-[#020617] border border-[#1E293B] p-4 rounded-lg hover:border-[#145EFB]/50 transition"
                  >
                    {/* LEFT */}
                    <div className="flex items-center gap-3">
                      <span className="text-xl">
                        {getIcon(skill.skillName)}
                      </span>
                      <span className="text-white">{skill.skillName}</span>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-2 w-40">
                      <div className="flex-1 h-[4px] bg-[#1E293B] rounded relative">
                        <div
                          className="absolute top-0 left-0 h-[4px] bg-[#145EFB] rounded"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>

                      <span className="text-xs text-[#CBD5E1] w-8 text-right">
                        {skill.level}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* BACKEND */}
          <div className="bg-[#020617] border border-[#1E293B] rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-6 text-[#145EFB]">
              Backend
            </h3>

            <div className="space-y-4">
              {skillsBackend.map((skill) => {

                const getIcon = (name: string) => {
                  const key = name.toLowerCase();

                  const map: Record<string, React.ReactNode> = {
                    "node.js": <FaNodeJs className="text-green-500" />,
                    node: <FaNodeJs className="text-green-500" />,
                    "express.js": <SiExpress className="text-gray-300" />,
                    express: <SiExpress className="text-gray-300" />,
                    mongodb: <SiMongodb className="text-green-600" />,
                    git: <FaGitAlt className="text-orange-500" />,
                    jsonwebtoken: <SiJsonwebtokens className="text-pink-500" />,
                  };

                  return map[key] ?? <Globe className="text-[#145EFB]" />;
                };

                return (
                  <div
                    key={skill._id}
                    className="flex items-center justify-between bg-[#020617] border border-[#1E293B] p-4 rounded-lg hover:border-[#145EFB]/50 transition"
                  >
                    {/* LEFT */}
                    <div className="flex items-center gap-3">
                      <span className="text-xl">
                        {getIcon(skill.skillName)}
                      </span>
                      <span className="text-white">{skill.skillName}</span>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-2 w-40">
                      <div className="flex-1 h-[4px] bg-[#1E293B] rounded relative">
                        <div
                          className="absolute top-0 left-0 h-[4px] bg-[#145EFB] rounded"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>

                      <span className="text-xs text-[#CBD5E1] w-8 text-right">
                        {skill.level}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>


      {/* EDUCATION */}
      <section
        id="education"
        className="px-6 md:px-16 py-24 bg-[#0B0F19] relative overflow-hidden"
      >

        {/* glow */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#145EFB]/10 blur-3xl rounded-full"></div>

        {/* heading */}
        <h2 className="text-4xl font-bold mb-16 text-center text-white">
          My <span className="text-[#145EFB]">Education</span>
        </h2>

        {/* timeline */}
        <div className="relative border-l border-[#1E293B] pl-8 space-y-12">

          {education.map((edu) => (
            <div key={edu._id} className="relative group">

              {/* DOT with icon */}
              <div className="absolute -left-[14px] top-6 w-7 h-7 rounded-full 
          bg-[#020617] border border-[#145EFB] 
          flex items-center justify-center
          shadow-[0_0_10px_rgba(20,94,251,0.6)]">
                <GraduationCap size={14} className="text-[#145EFB]" />
              </div>

              {/* CARD */}
              <div
                className="bg-[#020617] border border-[#1E293B] rounded-xl p-6 space-y-4
          hover:border-[#145EFB]/40
          hover:shadow-[0_0_25px_rgba(20,94,251,0.15)]
          transition duration-300"
              >

                {/* DEGREE */}
                <div className="flex items-center gap-2">
                  <GraduationCap size={18} className="text-[#145EFB]" />
                  <h3 className="text-lg font-semibold text-white transition">
                    {edu.degree}
                    <span className="text-[#145EFB] ml-1">({edu.field})</span>
                  </h3>
                </div>

                {/* COLLEGE */}
                <div className="flex items-center gap-2 text-[#CBD5E1]">
                  <Building size={16} className="text-[#145EFB]" />
                  <p>{edu.college}</p>
                </div>

                {/* YEAR */}
                <div className="flex items-center gap-2 text-sm text-[#CBD5E1]">
                  <Calendar size={16} className="text-[#145EFB]" />
                  <span className="px-3 py-1 rounded-full bg-[#0B0F19] border border-[#1E293B]">
                    {edu.startYear} - {edu.endYear}
                  </span>
                </div>

              </div>
            </div>
          ))}

        </div>
      </section>


      {/* EXPERIENCE */}
      <section
        id="experience"
        className="px-6 md:px-16 py-24 bg-[#0B0F19] relative overflow-hidden"
      >

        {/* glow */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#145EFB]/10 blur-3xl rounded-full"></div>

        {/* heading */}
        <h2 className="text-4xl font-bold mb-16 text-center text-white">
          My <span className="text-[#145EFB]">Experience</span>
        </h2>

        {/* timeline */}
        <div className="relative border-l border-[#1E293B] pl-8 space-y-12">

          {experience.map((exp) => (
            <div key={exp._id} className="relative group">

              {/* DOT with icon */}
              <div className="absolute -left-[14px] top-6 w-7 h-7 rounded-full 
          bg-[#020617] border border-[#145EFB] 
          flex items-center justify-center
          shadow-[0_0_10px_rgba(20,94,251,0.6)]">
                <Briefcase size={14} className="text-[#145EFB]" />
              </div>

              {/* CARD */}
              <div
                className="bg-[#020617] border border-[#1E293B] rounded-xl p-6 space-y-4
          hover:border-[#145EFB]/40
          hover:shadow-[0_0_25px_rgba(20,94,251,0.15)]
          transition duration-300"
              >

                {/* ROLE + COMPANY */}
                <div className="flex items-center gap-2">
                  <Briefcase size={18} className="text-[#145EFB]" />
                  <h3 className="text-lg font-semibold text-white group-hover:text-[#145EFB] transition">
                    {exp.role}
                  </h3>
                </div>

                {/* COMPANY NAME */}
                <div className="flex items-center gap-2 text-[#CBD5E1]">
                  <Building2 size={16} className="text-[#145EFB]" />
                  <p>{exp.company}</p>
                </div>

                {/* DATE */}
                <div className="flex items-center gap-2 text-sm text-[#CBD5E1]">
                  <Calendar size={16} className="text-[#145EFB]" />
                  <span className="px-3 py-1 rounded-full bg-[#0B0F19] border border-[#1E293B]">
                    {format(new Date(exp.startDate), "MMM yyyy")} -{" "}
                    {exp.endDate ? format(new Date(exp.endDate), "MMM yyyy") : "Present"}
                  </span>
                </div>

                {/* DESCRIPTION */}
                {exp.description && (
                  <p className="text-[#CBD5E1] leading-relaxed">
                    {exp.description}
                  </p>
                )}

                {/* RESPONSIBILITIES */}
                <ul className="space-y-2 text-sm text-[#CBD5E1]">
                  {exp.responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-[#145EFB] mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

              </div>
            </div>
          ))}

        </div>
      </section >


      {/* CONTACT */}
      <section
        id="contact"
        className="px-6 md:px-16 py-24 bg-[#0B0F19] relative overflow-hidden"
      >

        {/* glow */}
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#145EFB]/10 blur-3xl rounded-full"></div>

        {/* heading */}
        <h2 className="text-4xl font-bold mb-16 text-center text-white">
          Get In <span className="text-[#145EFB]">Touch</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
          <div className="space-y-8">

            <div>
              <h3 className="text-2xl font-semibold mb-3 text-white">
                Let’s build something amazing 🚀
              </h3>
              <p className="text-[#CBD5E1]">
                I’m open to freelance, full-time roles, and collaborations.
              </p>
            </div>

            <div className="space-y-4">

              {/* LOCATION */}
              <div className="flex items-center gap-4 bg-[#020617] border border-[#1E293B] p-4 rounded-xl hover:border-[#145EFB]/40 transition">
                <MapPin className="text-[#145EFB]" />
                <p className="text-white">{about?.location}</p>
              </div>

              {/* EMAIL */}
              <div className="flex items-center gap-4 bg-[#020617] border border-[#1E293B] p-4 rounded-xl hover:border-[#145EFB]/40 transition">
                <Mail className="text-[#145EFB]" />
                <p className="text-white break-all">{about?.email}</p>
              </div>

              {/* PHONE */}
              <div className="flex items-center gap-4 bg-[#020617] border border-[#1E293B] p-4 rounded-xl hover:border-[#145EFB]/40 transition">
                <Phone className="text-[#145EFB]" />
                <p className="text-white">{about?.phone}</p>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="relative">

            {/* glow */}
            <div className="absolute inset-0 bg-[#145EFB]/20 blur-2xl opacity-20 rounded-2xl"></div>

            <div className="relative bg-[#020617] border border-[#1E293B] rounded-2xl p-8 space-y-5">

              <Input
                placeholder="Your Name"
                className="bg-[#0B0F19] border-[#1E293B] h-12 text-white placeholder:text-[#CBD5E1]"
              />

              <Input
                placeholder="Your Email"
                className="bg-[#0B0F19] border-[#1E293B] h-12 text-white placeholder:text-[#CBD5E1]"
              />

              <Textarea
                placeholder="Your Message"
                className="bg-[#0B0F19] border-[#1E293B] min-h-[120px] text-white placeholder:text-[#CBD5E1]"
              />

              <Button className="w-full h-12 bg-[#145EFB] hover:bg-[#0F4FD1] text-white transition shadow-md hover:shadow-[0_0_12px_rgba(20,94,251,0.6)] cursor-pointer">
                Send Message
              </Button>

            </div>
          </div>

        </div>
      </section>

    </div >
  );
};

export default Page;
