"use client";

import React, { useState, useEffect } from "react";
import { Building, Building2, CheckCircle, Code2, FolderOpen, GraduationCap, Menu, X } from "lucide-react";
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
import { motion } from "framer-motion"
import ThemeToggle from "@/components/theme/ThemeToggle";
import { useAppTheme } from "@/components/hooks/useAppTheme";

const Page = () => {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("projects")

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

  const { theme, isDark } = useAppTheme();


  useEffect(() => {
    const sections = [
      "home",
      "about",
      "projects",
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
    // <div className="bg-[#020617] text-white">
    <div className={`${theme.background} ${theme.text}`}>

      {/* NAVBAR */}
      <header
        className={`fixed top-0 w-full z-50 backdrop-blur-md border-b ${theme.border} ${theme.background}/80`}
      >
        <div className="flex justify-between items-center px-6 md:px-16 py-4">

          {/* LOGO */}
          <h1 className={`text-xl font-bold ${theme.text}`}>
            RC
          </h1>

          {/* DESKTOP MENU */}
          <nav className={`hidden md:flex gap-8 ${theme.text}`}>
            {["home", "about", "projects", "education", "contact"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="relative group transition"
                style={{
                  color: active === item ? theme.primary : undefined,
                }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}

                {/* UNDERLINE */}
                <span
                  className="absolute left-0 -bottom-1 h-[2px] transition-all duration-300"
                  style={{
                    backgroundColor: theme.primary,
                    width: active === item ? "100%" : "0%",
                  }}
                />
              </a>
            ))}
          </nav>

          {/* TOGGLE */}
          <ThemeToggle />

          {/* MOBILE BUTTON */}
          <button
            className={`md:hidden ${theme.text}`}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div
            className={`md:hidden px-6 pb-6 flex flex-col gap-4 border-t ${theme.border} ${theme.background}`}
          >
            {["home", "about", "projects", "education", "contact"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={() => setOpen(false)}
                className="transition"
                style={{
                  color: active === item ? theme.primary : theme.text,
                }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
          </div>
        )}
      </header>


      {/* HERO */}
      <section
        id="home"
        className={`min-h-screen pt-24 flex items-center justify-between px-6 md:px-16 relative overflow-hidden ${theme.background}`}
      >
        {/* background glow */}
        <div
          className="absolute top-20 left-10 w-72 h-72 blur-3xl rounded-full"
          style={{ backgroundColor: theme.primary, opacity: 0.2 }}
        />

        <div
          className="absolute bottom-10 right-10 w-72 h-72 blur-3xl rounded-full"
          style={{ backgroundColor: theme.primary, opacity: 0.1 }}
        />

        {/* LEFT CONTENT */}
        <div className="max-w-2xl space-y-6 z-10">
          <h1 className={`text-5xl md:text-6xl font-semibold leading-tight ${theme.text}`}>
            Hi, I'm{" "}
            <span style={{ color: theme.primary }}>
              {about?.name}
            </span>
          </h1>

          <p className={`text-xl md:text-2xl ${theme.text}`} style={{ opacity: 0.8 }}>
            {about?.title}
          </p>

          <p className={`${theme.text}`} style={{ opacity: 0.6, maxWidth: "32rem" }}>
            {about?.introduction}
          </p>

          {/* buttons */}
          <div className="flex gap-4 pt-2">
            <Button
              className="text-white transition cursor-pointer p-4"
              style={{ backgroundColor: theme.primary }}
            >
              Contact Me
            </Button>

            <Button
              variant="outline"
              className={`cursor-pointer border transition`}
              style={{
                borderColor: theme.primary,
                color: theme.primary,
              }}
            >
              Download CV
            </Button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden md:flex justify-center items-center">
          <Avatar
            className="w-80 h-80"
            style={{ border: `1px solid ${theme.border}` }}
          >
            <AvatarImage
              src={about?.profileImage}
              className="object-top"
            />

            <AvatarFallback className={theme.background + " " + theme.text}>
              RC
            </AvatarFallback>
          </Avatar>
        </div>
      </section>


      {/* ABOUT */}
      <section
        id="about"
        className={`px-6 md:px-16 py-12 md:py-16 relative overflow-hidden ${theme.background}`}
      >
        {/* background glow */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full"></div>

        <div className="grid md:grid-cols-2 gap-16 items-stretch">

          {/* LEFT SIDE */}
          <div className="grid grid-cols-2 gap-4 h-full auto-rows-fr">

            {/* Location */}
            <div className={`p-4 rounded-xl border ${theme.border} ${theme.card} flex flex-col items-center justify-center text-center`}>
              <MapPin style={{ color: theme.primary }} className="mb-2" />
              <p className={`text-sm ${theme.mutedText}`}>Location</p>
              <p className={theme.text}>{about?.location}</p>
            </div>

            {/* Email */}
            <div className={`p-4 rounded-xl border ${theme.border} ${theme.card} flex flex-col items-center justify-center text-center`}>
              <Mail style={{ color: theme.primary }} className="mb-2" />
              <p className={`text-sm ${theme.mutedText}`}>Email</p>
              <p className={`${theme.text} break-all`}>{about?.email}</p>
            </div>

            {/* Phone */}
            <div className={`p-4 rounded-xl border ${theme.border} ${theme.card} flex flex-col items-center justify-center text-center`}>
              <Phone style={{ color: theme.primary }} className="mb-2" />
              <p className={`text-sm ${theme.mutedText}`}>Phone</p>
              <p className={theme.text}>{about?.phone}</p>
            </div>

            {/* DOB */}
            <div className={`p-4 rounded-xl border ${theme.border} ${theme.card} flex flex-col items-center justify-center text-center`}>
              <Calendar style={{ color: theme.primary }} className="mb-2" />
              <p className={`text-sm ${theme.mutedText}`}>Date of Birth</p>
              <p className={theme.text}>
                {about?.dob && !isNaN(new Date(about.dob).getTime())
                  ? format(new Date(about.dob), "do MMMM yyyy")
                  : "—"}
              </p>
            </div>

            {/* Languages */}
            <div className={`p-4 rounded-xl border ${theme.border} ${theme.card} col-span-2 flex flex-col items-center justify-center text-center`}>
              <Globe style={{ color: theme.primary }} className="mb-2" />
              <p className={`text-sm ${theme.mutedText}`}>Languages</p>
              <p className={theme.text}>
                {about?.languages?.join(", ")}
              </p>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6 h-full flex flex-col justify-between">

            <div className="space-y-6">

              <h2 className={`text-4xl font-bold ${theme.text}`}>
                About <span style={{ color: theme.primary }}>Me</span>
              </h2>

              {/* INTRO */}
              <p className={theme.mutedText + " leading-relaxed"}>
                {about?.introduction}
              </p>

              {/* JOURNEY */}
              {about?.journey && (
                <div className={`p-5 rounded-xl border ${theme.border} ${theme.card}`}>
                  <h3 className={`font-semibold mb-2 flex items-center gap-2 ${theme.text}`}>
                    <Briefcase size={18} style={{ color: theme.primary }} />
                    My Journey
                  </h3>
                  <p className={`text-sm ${theme.mutedText} leading-relaxed`}>
                    {about?.journey}
                  </p>
                </div>
              )}

              {/* CURRENT WORK */}
              {about?.currentWork && (
                <div className={`p-5 rounded-xl border ${theme.border} ${theme.card}`}>
                  <h3 className={`font-semibold mb-2 flex items-center gap-2 ${theme.text}`}>
                    <Briefcase size={18} style={{ color: theme.primary }} />
                    Current Work
                  </h3>
                  <p className={`text-sm ${theme.mutedText} leading-relaxed`}>
                    {about?.currentWork}
                  </p>
                </div>
              )}
            </div>

            {/* BUTTON */}
            <button
              className="px-6 py-2 rounded-md text-white transition cursor-pointer"
              style={{ backgroundColor: theme.primary }}
            >
              Download CV
            </button>

          </div>

        </div>
      </section>


      {/* SHOWCASE */}
      <div className={`px-6 md:px-16 py-12 md:py-16 relative overflow-hidden ${theme.background}`}>

        <h2 className={`text-4xl font-bold text-center mb-6 ${theme.text}`}>
          Portfolio <span style={{ color: theme.primary }}>Showcase</span>
        </h2>

        <p className={`text-center mb-10 ${theme.mutedText}`}>
          Explore my work, skills, and experience
        </p>

        <div className="flex justify-center gap-5 flex-wrap">

          {[
            { key: "projects", label: "Projects", icon: FolderOpen },
            { key: "skills", label: "Skills", icon: Code2 },
            { key: "experience", label: "Experience", icon: Briefcase },
          ].map((tab) => {
            const Icon = tab.icon;

            return (
              <motion.button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                animate={{
                  backgroundColor:
                    activeTab === tab.key ? theme.primary : "transparent",

                  borderColor:
                    activeTab === tab.key ? theme.primary : theme.border,

                  color:
                    activeTab === tab.key ? theme.onPrimary : theme.text,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`flex items-center gap-3 px-8 py-4 rounded-xl border text-sm font-medium shadow-md cursor-pointer`}
              >
                <Icon size={18} />
                {tab.label}
              </motion.button>
            );
          })}

        </div>
      </div>


      {/* PROJECTS */}
      {activeTab === "projects" && (
        <section
          id="projects"
          className={`px-6 md:px-16 pb-12 md:pb-16 relative overflow-hidden ${isDark ? "bg-[#0B0F19]" : "bg-white"
            }`}
        >
          {/* background glow */}
          <div
            className="absolute top-10 right-10 w-72 h-72 blur-3xl rounded-full"
            style={{
              backgroundColor: isDark
                ? "rgba(20,94,251,0.1)"
                : "rgba(20,94,251,0.08)",
            }}
          ></div>

          {/* grid */}
          <div className="grid md:grid-cols-3 gap-10 items-stretch">

            {projects.map((proj) => (
              <div
                key={proj._id}
                className={`group relative rounded-xl overflow-hidden 
  hover:-translate-y-3
  transition duration-300 flex flex-col h-full
  ${isDark
                    ? "border border-[#1E293B] bg-[#020617]/80 backdrop-blur-sm hover:shadow-[0_0_25px_rgba(20,94,251,0.25)]"
                    : "border border-gray-200 bg-white hover:shadow-[0_0_25px_rgba(20,94,251,0.25)]"
                  }`}
              >

                {/* TOP ACCENT LINE */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#145EFB] to-transparent opacity-0 group-hover:opacity-100 transition"></div>

                {/* IMAGE */}
                <div className="h-60 overflow-hidden relative">
                  <img
                    src={proj.imageURL}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />

                  {/* overlay ONLY for dark */}
                  {isDark && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-5 flex flex-col h-full">

                  <div className="space-y-3 flex-1">

                    {/* TITLE */}
                    <h3
                      className={`text-lg font-semibold transition group-hover:text-[#145EFB] ${isDark ? "text-white" : "text-gray-900"
                        }`}
                    >
                      {proj.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p
                      className={`text-sm leading-relaxed ${isDark ? "text-[#CBD5E1]" : "text-gray-600"
                        }`}
                    >
                      {proj.description}
                    </p>

                    {/* TECH STACK */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {proj.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className={`text-xs px-2 py-1 rounded transition ${isDark
                            ? "bg-[#0B0F19] border border-[#1E293B] text-[#CBD5E1] group-hover:border-[#145EFB]/40"
                            : "bg-gray-100 border border-gray-200 text-gray-700"
                            }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                  </div>

                  {/* BUTTONS */}
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
                        <button
                          className={`text-sm px-4 py-1.5 rounded transition cursor-pointer ${isDark
                            ? "border border-[#1E293B] text-white hover:bg-[#0B0F19] hover:border-[#145EFB]"
                            : "border border-gray-300 text-gray-800 hover:bg-gray-100"
                            }`}
                        >
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
      )}


      {/* SKILLS */}
      {activeTab === "skills" && (
        <section
          id="skills"
          className={`px-6 pb-12 md:pb-16 relative overflow-hidden ${isDark ? "bg-[#0B0F19]" : "bg-white"
            }`}
        >

          {/* glow */}
          <div
            className="absolute top-10 left-10 w-72 h-72 blur-3xl rounded-full"
            style={{
              backgroundColor: isDark
                ? "rgba(20,94,251,0.1)"
                : "rgba(20,94,251,0.08)",
            }}
          ></div>

          <div className="grid md:grid-cols-2 gap-10">

            {/* FRONTEND */}
            <div
              className={`rounded-xl p-6 transition ${isDark
                ? "bg-[#020617] border border-[#1E293B]"
                : "bg-white border border-gray-200 shadow-md hover:shadow-[0_0_20px_rgba(20,94,251,0.25)]"
                }`}
            >
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
                      next: <SiNextdotjs className={isDark ? "text-white" : "text-black"} />,
                      "next.js": <SiNextdotjs className={isDark ? "text-white" : "text-black"} />,
                      bootstrap: <SiBootstrap className="text-purple-600" />,
                      git: <FaGitAlt className="text-orange-500" />,
                      postman: <SiPostman className="text-orange-400" />,
                      render: <SiRender className="text-purple-400" />,
                      vercel: <SiVercel className={isDark ? "text-white" : "text-black"} />,
                      "rest apis": <Globe className="text-[#145EFB]" />,
                    };

                    return map[key] ?? <Globe className="text-[#145EFB]" />;
                  };

                  return (
                    <div
                      key={skill._id}
                      className={`flex items-center justify-between p-4 rounded-lg transition ${isDark
                        ? "bg-[#020617] border border-[#1E293B] hover:border-[#145EFB]/50"
                        : "bg-gray-50 border border-gray-200 hover:border-[#145EFB] hover:shadow-[0_0_12px_rgba(20,94,251,0.2)]"
                        }`}
                    >
                      {/* LEFT */}
                      <div className="flex items-center gap-3">
                        <span className="text-xl">
                          {getIcon(skill.skillName)}
                        </span>
                        <span className={isDark ? "text-white" : "text-gray-900"}>
                          {skill.skillName}
                        </span>
                      </div>

                      {/* RIGHT */}
                      <div className="flex items-center gap-2 w-40">
                        <div
                          className={`flex-1 h-[4px] rounded relative ${isDark ? "bg-[#1E293B]" : "bg-gray-200"
                            }`}
                        >
                          <div
                            className="absolute top-0 left-0 h-[4px] bg-[#145EFB] rounded"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>

                        <span
                          className={`text-xs w-8 text-right ${isDark ? "text-[#CBD5E1]" : "text-gray-600"
                            }`}
                        >
                          {skill.level}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* BACKEND */}
            <div
              className={`rounded-xl p-6 transition ${isDark
                ? "bg-[#020617] border border-[#1E293B]"
                : "bg-white border border-gray-200 shadow-md hover:shadow-[0_0_20px_rgba(20,94,251,0.25)]"
                }`}
            >
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
                      "express.js": <SiExpress className={isDark ? "text-gray-300" : "text-gray-700"} />,
                      express: <SiExpress className={isDark ? "text-gray-300" : "text-gray-700"} />,
                      mongodb: <SiMongodb className="text-green-600" />,
                      git: <FaGitAlt className="text-orange-500" />,
                      jsonwebtoken: <SiJsonwebtokens className="text-pink-500" />,
                    };

                    return map[key] ?? <Globe className="text-[#145EFB]" />;
                  };

                  return (
                    <div
                      key={skill._id}
                      className={`flex items-center justify-between p-4 rounded-lg transition ${isDark
                        ? "bg-[#020617] border border-[#1E293B] hover:border-[#145EFB]/50"
                        : "bg-gray-50 border border-gray-200 hover:border-[#145EFB] hover:shadow-[0_0_12px_rgba(20,94,251,0.2)]"
                        }`}
                    >
                      {/* LEFT */}
                      <div className="flex items-center gap-3">
                        <span className="text-xl">
                          {getIcon(skill.skillName)}
                        </span>
                        <span className={isDark ? "text-white" : "text-gray-900"}>
                          {skill.skillName}
                        </span>
                      </div>

                      {/* RIGHT */}
                      <div className="flex items-center gap-2 w-40">
                        <div
                          className={`flex-1 h-[4px] rounded relative ${isDark ? "bg-[#1E293B]" : "bg-gray-200"
                            }`}
                        >
                          <div
                            className="absolute top-0 left-0 h-[4px] bg-[#145EFB] rounded"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>

                        <span
                          className={`text-xs w-8 text-right ${isDark ? "text-[#CBD5E1]" : "text-gray-600"
                            }`}
                        >
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
      )}


      {/* EXPERIENCE */}
      {activeTab === "experience" && (
        <section
          id="experience"
          className={`px-6 md:px-16 pb-12 md:pb-16 relative overflow-hidden ${isDark ? "bg-[#0B0F19]" : "bg-white"
            }`}
        >

          {/* glow */}
          <div
            className="absolute top-10 right-10 w-72 h-72 blur-3xl rounded-full"
            style={{
              backgroundColor: isDark
                ? "rgba(20,94,251,0.1)"
                : "rgba(20,94,251,0.08)",
            }}
          ></div>

          {/* timeline */}
          <div
            className={`relative pl-8 space-y-12 ${isDark ? "border-l border-[#1E293B]" : "border-l border-gray-200"
              }`}
          >

            {experience.map((exp) => (
              <div key={exp._id} className="relative group">

                {/* DOT */}
                <div
                  className={`absolute -left-[14px] top-6 w-7 h-7 rounded-full flex items-center justify-center ${isDark
                    ? "bg-[#020617] border border-[#145EFB] shadow-[0_0_10px_rgba(20,94,251,0.6)]"
                    : "bg-white border border-[#145EFB] shadow-md"
                    }`}
                >
                  <Briefcase size={14} className="text-[#145EFB]" />
                </div>

                {/* CARD */}
                <div
                  className={`rounded-xl p-6 space-y-4 transition duration-300 ${isDark
                    ? "bg-[#020617] border border-[#1E293B] hover:border-[#145EFB]/40 hover:shadow-[0_0_25px_rgba(20,94,251,0.15)]"
                    : "bg-white border border-gray-200 hover:shadow-[0_0_20px_rgba(20,94,251,0.2)]"
                    }`}
                >

                  {/* ROLE */}
                  <div className="flex items-center gap-2">
                    <Briefcase size={18} className="text-[#145EFB]" />
                    <h3
                      className={`text-lg font-semibold transition group-hover:text-[#145EFB] ${isDark ? "text-white" : "text-gray-900"
                        }`}
                    >
                      {exp.role}
                    </h3>
                  </div>

                  {/* COMPANY */}
                  <div
                    className={`flex items-center gap-2 ${isDark ? "text-[#CBD5E1]" : "text-gray-600"
                      }`}
                  >
                    <Building2 size={16} className="text-[#145EFB]" />
                    <p>{exp.company}</p>
                  </div>

                  {/* DATE */}
                  <div
                    className={`flex items-center gap-2 text-sm ${isDark ? "text-[#CBD5E1]" : "text-gray-600"
                      }`}
                  >
                    <Calendar size={16} className="text-[#145EFB]" />
                    <span
                      className={`px-3 py-1 rounded-full ${isDark
                        ? "bg-[#0B0F19] border border-[#1E293B]"
                        : "bg-gray-100 border border-gray-200"
                        }`}
                    >
                      {format(new Date(exp.startDate), "MMM yyyy")} -{" "}
                      {exp.endDate
                        ? format(new Date(exp.endDate), "MMM yyyy")
                        : "Present"}
                    </span>
                  </div>

                  {/* DESCRIPTION */}
                  {exp.description && (
                    <p
                      className={`leading-relaxed ${isDark ? "text-[#CBD5E1]" : "text-gray-600"
                        }`}
                    >
                      {exp.description}
                    </p>
                  )}

                  {/* RESPONSIBILITIES */}
                  <ul
                    className={`space-y-2 text-sm ${isDark ? "text-[#CBD5E1]" : "text-gray-600"
                      }`}
                  >
                    {exp.responsibilities.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle
                          size={14}
                          className="text-[#145EFB] mt-1"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                </div>
              </div>
            ))}

          </div>
        </section>
      )}


      {/* EDUCATION */}
      <section
        id="education"
        className={`px-6 py-12 md:py-16 relative overflow-hidden ${isDark ? "bg-[#0B0F19]" : "bg-white"
          }`}
      >

        {/* glow */}
        <div
          className="absolute top-10 left-10 w-72 h-72 blur-3xl rounded-full"
          style={{
            backgroundColor: isDark
              ? "rgba(20,94,251,0.1)"
              : "rgba(20,94,251,0.08)",
          }}
        ></div>

        {/* heading */}
        <h2
          className={`text-4xl font-bold mb-16 text-center ${isDark ? "text-white" : "text-gray-900"
            }`}
        >
          My <span className="text-[#145EFB]">Education</span>
        </h2>

        {/* timeline */}
        <div
          className={`relative pl-8 space-y-12 ${isDark ? "border-l border-[#1E293B]" : "border-l border-gray-200"
            }`}
        >

          {education.map((edu) => (
            <div key={edu._id} className="relative group">

              {/* DOT */}
              <div
                className={`absolute -left-[14px] top-6 w-7 h-7 rounded-full flex items-center justify-center ${isDark
                  ? "bg-[#020617] border border-[#145EFB] shadow-[0_0_10px_rgba(20,94,251,0.6)]"
                  : "bg-white border border-[#145EFB] shadow-md"
                  }`}
              >
                <GraduationCap size={14} className="text-[#145EFB]" />
              </div>

              {/* CARD */}
              <div
                className={`rounded-xl p-6 space-y-4 transition duration-300 ${isDark
                  ? "bg-[#020617] border border-[#1E293B] hover:border-[#145EFB]/40 hover:shadow-[0_0_25px_rgba(20,94,251,0.15)]"
                  : "bg-white border border-gray-200 hover:shadow-[0_0_20px_rgba(20,94,251,0.2)]"
                  }`}
              >

                {/* DEGREE */}
                <div className="flex items-center gap-2">
                  <GraduationCap size={18} className="text-[#145EFB]" />
                  <h3
                    className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"
                      }`}
                  >
                    {edu.degree}
                    <span className="text-[#145EFB] ml-1">({edu.field})</span>
                  </h3>
                </div>

                {/* COLLEGE */}
                <div
                  className={`flex items-center gap-2 ${isDark ? "text-[#CBD5E1]" : "text-gray-600"
                    }`}
                >
                  <Building size={16} className="text-[#145EFB]" />
                  <p>{edu.college}</p>
                </div>

                {/* YEAR */}
                <div
                  className={`flex items-center gap-2 text-sm ${isDark ? "text-[#CBD5E1]" : "text-gray-600"
                    }`}
                >
                  <Calendar size={16} className="text-[#145EFB]" />
                  <span
                    className={`px-3 py-1 rounded-full ${isDark
                      ? "bg-[#0B0F19] border border-[#1E293B]"
                      : "bg-gray-100 border border-gray-200"
                      }`}
                  >
                    {edu.startYear} - {edu.endYear}
                  </span>
                </div>

              </div>
            </div>
          ))}

        </div>
      </section>


      {/* CONTACT */}
      <section
        id="contact"
        className={`px-6 md:px-16 py-12 md:py-16 relative overflow-hidden ${isDark ? "bg-[#0B0F19]" : "bg-white"
          }`}
      >

        {/* glow */}
        <div
          className="absolute bottom-10 right-10 w-72 h-72 blur-3xl rounded-full"
          style={{
            backgroundColor: isDark
              ? "rgba(20,94,251,0.1)"
              : "rgba(20,94,251,0.08)",
          }}
        ></div>

        {/* heading */}
        <h2
          className={`text-4xl font-bold mb-16 text-center ${isDark ? "text-white" : "text-gray-900"
            }`}
        >
          Get In <span className="text-[#145EFB]">Touch</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
          <div className="space-y-8">

            <div>
              <h3
                className={`text-2xl font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"
                  }`}
              >
                Let’s build something amazing 🚀
              </h3>
              <p className={isDark ? "text-[#CBD5E1]" : "text-gray-600"}>
                I’m open to freelance, full-time roles, and collaborations.
              </p>
            </div>

            <div className="space-y-4">

              {/* LOCATION */}
              <div
                className={`flex items-center gap-4 p-4 rounded-xl transition ${isDark
                  ? "bg-[#020617] border border-[#1E293B] hover:border-[#145EFB]/40"
                  : "bg-white border border-gray-200 shadow-md hover:shadow-[0_0_12px_rgba(20,94,251,0.2)]"
                  }`}
              >
                <MapPin className="text-[#145EFB]" />
                <p className={isDark ? "text-white" : "text-gray-800"}>
                  {about?.location}
                </p>
              </div>

              {/* EMAIL */}
              <div
                className={`flex items-center gap-4 p-4 rounded-xl transition ${isDark
                  ? "bg-[#020617] border border-[#1E293B] hover:border-[#145EFB]/40"
                  : "bg-white border border-gray-200 shadow-md hover:shadow-[0_0_12px_rgba(20,94,251,0.2)]"
                  }`}
              >
                <Mail className="text-[#145EFB]" />
                <p className={`${isDark ? "text-white" : "text-gray-800"} break-all`}>
                  {about?.email}
                </p>
              </div>

              {/* PHONE */}
              <div
                className={`flex items-center gap-4 p-4 rounded-xl transition ${isDark
                  ? "bg-[#020617] border border-[#1E293B] hover:border-[#145EFB]/40"
                  : "bg-white border border-gray-200 shadow-md hover:shadow-[0_0_12px_rgba(20,94,251,0.2)]"
                  }`}
              >
                <Phone className="text-[#145EFB]" />
                <p className={isDark ? "text-white" : "text-gray-800"}>
                  {about?.phone}
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="relative">

            {/* glow */}
            <div
              className={`absolute inset-0 blur-2xl opacity-20 rounded-2xl ${isDark ? "bg-[#145EFB]/20" : "bg-[#145EFB]/10"
                }`}
            ></div>

            <div
              className={`relative rounded-2xl p-8 space-y-5 ${isDark
                ? "bg-[#020617] border border-[#1E293B]"
                : "bg-white border border-gray-200 shadow-xl"
                }`}
            >

              <Input
                placeholder="Your Name"
                className={`h-12 ${isDark
                  ? "bg-[#0B0F19] border-[#1E293B] text-white placeholder:text-[#CBD5E1]"
                  : "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500"
                  }`}
              />

              <Input
                placeholder="Your Email"
                className={`h-12 ${isDark
                  ? "bg-[#0B0F19] border-[#1E293B] text-white placeholder:text-[#CBD5E1]"
                  : "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500"
                  }`}
              />

              <Textarea
                placeholder="Your Message"
                className={`min-h-[120px] ${isDark
                  ? "bg-[#0B0F19] border-[#1E293B] text-white placeholder:text-[#CBD5E1]"
                  : "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500"
                  }`}
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
