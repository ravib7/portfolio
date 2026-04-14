"use client";

import React, { useState, useEffect } from "react";
import { Building, Building2, CheckCircle, Code2, FolderOpen, GraduationCap, Menu, X } from "lucide-react";
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
import { AnimatePresence, motion } from "framer-motion"
import ThemeToggle from "@/components/theme/ThemeToggle";
import { useAppTheme } from "@/components/hooks/useAppTheme";

const Page = () => {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("projects")
  const [index, setIndex] = useState(0)

  const { theme, isDark } = useAppTheme();

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

  const titles = [
    "Frontend Developer",
    "Backend Developer",
    "Mobile App Developer",
  ]


  useEffect(() => {
    const sections = ["home", "about", "projects", "education", "contact"]

    const handleScroll = () => {
      sections.forEach((id) => {
        const section = document.getElementById(id)

        if (section) {
          const rect = section.getBoundingClientRect()

          if (rect.top <= 150 && rect.bottom >= 150) {
            setActive(id)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])


  return (
    <div className={`${theme.background} ${theme.text}`}>

      {/* NAVBAR */}
      <motion.header
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 backdrop-blur-md border-b ${theme.border} ${theme.background}/80`}
      >
        <div className="flex justify-between items-center px-6 md:px-16 py-4">

          {/* LOGO */}
          <h1 className={`text-xl font-bold ${theme.text}`}>
            RC
          </h1>

          {/* DESKTOP MENU */}
          <motion.nav layout className={`hidden md:flex gap-8 ${theme.text}`}>
            {["home", "about", "projects", "education", "contact"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.15,
                  ease: "easeOut",
                }}
                className="relative transition"
                style={{
                  color: active === item ? theme.primary : undefined,
                }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}

                {/* UNDERLINE */}
                {active === item && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 -bottom-1 h-[2px] w-full"
                    style={{ backgroundColor: theme.primary }}
                  />
                )}
              </motion.a>
            ))}
          </motion.nav>

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
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
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
          </motion.div>
        )}
      </motion.header>


      {/* HERO */}
      <motion.section
        id="home"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        className={`min-h-[90vh] md:min-h-screen pt-24 md:pt-24 flex flex-col md:flex-row items-center justify-center md:justify-between gap-10 md:gap-0 px-6 md:px-16 relative overflow-hidden z-0 ${theme.background}`}      >
        {/* glow */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 blur-3xl rounded-full -z-10"
          style={{ backgroundColor: theme.primary, opacity: 0.2 }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-10 right-10 w-72 h-72 blur-3xl rounded-full -z-10"
          style={{ backgroundColor: theme.primary, opacity: 0.1 }}
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* IMAGE */}
        <motion.div
          className="flex justify-center items-start md:items-center order-1 md:order-2 mb-8 md:mb-0 z-10 relative"
          variants={{
            hidden: { opacity: 0, x: 60 },
            show: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.9, ease: "easeOut" },
            },
          }}
        >
          <motion.div
            className="w-52 h-52 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-xl"
            style={{
              border: `2px solid ${theme.primary}`,
              backgroundColor: "#fff",
            }}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={about?.profileImage}
              alt="profile"
              className="w-full h-full object-contain object-top"
            />
          </motion.div>
        </motion.div>

        {/* TEXT */}
        <motion.div
          className="max-w-2xl space-y-6 z-10 relative order-2 md:order-1"
          variants={{
            hidden: { opacity: 0, x: -40 },
            show: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.9, ease: "easeOut" },
            },
          }}
        >
          {/* NAME */}
          <motion.h1
            className={`text-5xl md:text-6xl font-semibold ${theme.text}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            Hi, I'm{" "}
            <span style={{ color: theme.primary }}>
              {about?.name}
            </span>
          </motion.h1>

          {/* TITLE */}
          <div className={`text-xl md:text-2xl ${theme.text}`} style={{ opacity: 0.8 }}>
            <motion.div
              key={titles[index]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex"
            >
              {titles[index].split("").map((char: string, i: number) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.05,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* INTRO */}
          <motion.p
            className={`${theme.text}`}
            style={{ opacity: 0.6, maxWidth: "32rem" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            {about?.introduction}
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            className="flex gap-4 pt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Button
              className="text-white cursor-pointer p-4"
              style={{ backgroundColor: theme.primary }}
            >
              Contact Me
            </Button>

            <a href="/Ravindra_Chaudhari_Resume.pdf" download="Ravindra_CV">
              <Button
                variant="outline"
                className="cursor-pointer border"
                style={{
                  borderColor: theme.primary,
                  color: theme.primary,
                }}
              >
                Download CV
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </motion.section>


      {/* ABOUT */}
      <motion.section
        id="about"
        className={`px-6 md:px-16 py-24 md:py-20 relative overflow-hidden ${theme.background}`}
      >
        {/* background glow */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full" />

        {/* <div className="grid md:grid-cols-2 gap-16 items-stretch"> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-stretch">

          {/* LEFT SIDE GRID (STAGGER ANIMATION) */}
          <motion.div
            className="grid grid-cols-2 gap-4 h-full auto-rows-fr order-2 md:order-1"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
          >

            {[
              {
                icon: MapPin,
                label: "Location",
                value: about?.location,
              },
              {
                icon: Mail,
                label: "Email",
                value: about?.email,
              },
              {
                icon: Phone,
                label: "Phone",
                value: about?.phone,
              },
              {
                icon: Calendar,
                label: "Date of Birth",
                value:
                  about?.dob && !isNaN(new Date(about.dob).getTime())
                    ? format(new Date(about.dob), "do MMMM yyyy")
                    : "—",
              },
            ].map((item, i) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, y: 20 },
                    show: { opacity: 1, scale: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`p-4 rounded-xl border ${theme.border} ${theme.card} flex flex-col items-center justify-center text-center`}
                >
                  <Icon style={{ color: theme.primary }} className="mb-2" />
                  <p className={`text-sm ${theme.mutedText}`}>{item.label}</p>
                  <p className={theme.text}>{item.value}</p>
                </motion.div>
              );
            })}

            {/* LANGUAGES (full width card) */}
            <motion.div
              className={`p-4 rounded-xl border ${theme.border} ${theme.card} col-span-2 flex flex-col items-center justify-center text-center`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Globe style={{ color: theme.primary }} className="mb-2" />
              <p className={`text-sm ${theme.mutedText}`}>Languages</p>
              <p className={theme.text}>
                {about?.languages?.join(", ")}
              </p>
            </motion.div>

          </motion.div>

          {/* RIGHT SIDE (SLIDE UP DIFFERENT STYLE) */}
          <motion.div
            className="space-y-6 h-full flex flex-col justify-between order-1 md:order-2"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >

            <div className="space-y-6">

              <motion.h2
                className={`text-4xl font-bold ${theme.text}`}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                About <span style={{ color: theme.primary }}>Me</span>
              </motion.h2>

              {/* INTRO */}
              <motion.p
                className={theme.mutedText + " leading-relaxed"}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.9 }}
                viewport={{ once: true }}
              >
                {about?.introduction}
              </motion.p>

              {/* JOURNEY */}
              {about?.journey && (
                <motion.div
                  className={`p-5 rounded-xl border ${theme.border} ${theme.card}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                >
                  <h3 className={`font-semibold mb-2 flex items-center gap-2 ${theme.text}`}>
                    <Briefcase size={18} style={{ color: theme.primary }} />
                    My Journey
                  </h3>
                  <p className={`text-sm ${theme.mutedText}`}>
                    {about?.journey}
                  </p>
                </motion.div>
              )}

              {/* CURRENT WORK */}
              {about?.currentWork && (
                <motion.div
                  className={`p-5 rounded-xl border ${theme.border} ${theme.card}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className={`font-semibold mb-2 flex items-center gap-2 ${theme.text}`}>
                    <Briefcase size={18} style={{ color: theme.primary }} />
                    Current Work
                  </h3>
                  <p className={`text-sm ${theme.mutedText}`}>
                    {about?.currentWork}
                  </p>
                </motion.div>
              )}

            </div>

            {/* BUTTON */}
            <motion.a
              href="/Ravindra_Chaudhari_Resume.pdf"
              download="Ravindra_CV"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Button
                className="w-full py-5 rounded-md text-white transition cursor-pointer"
                style={{ backgroundColor: theme.primary }}
              >
                Download CV
              </Button>
            </motion.a>

          </motion.div>

        </div>
      </motion.section>


      {/* SHOWCASE */}
      <motion.div
        className={`px-6 md:px-16 py-12 md:py-16 relative overflow-hidden ${theme.background}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* TITLE */}
        <motion.h2
          className={`text-4xl font-bold text-center mb-6 ${theme.text}`}
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Portfolio <span style={{ color: theme.primary }}>Showcase</span>
        </motion.h2>

        {/* SUBTITLE */}
        <motion.p
          className={`text-center mb-10 ${theme.mutedText}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Explore my work, skills, and experience
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          className="flex justify-center gap-5 flex-wrap"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
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
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.9 },
                  show: { opacity: 1, y: 0, scale: 1 },
                }}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                animate={{
                  backgroundColor:
                    activeTab === tab.key ? theme.primary : "transparent",

                  borderColor:
                    activeTab === tab.key ? theme.primary : theme.border,

                  color:
                    activeTab === tab.key ? theme.onPrimary : theme.text,

                  boxShadow:
                    activeTab === tab.key
                      ? `0px 0px 20px ${theme.primary}40`
                      : "none",
                }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3 px-8 py-4 rounded-xl border text-sm font-medium cursor-pointer"
              >
                <Icon size={18} />

                {/* text animation on active change */}
                <motion.span
                  animate={{
                    scale: activeTab === tab.key ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {tab.label}
                </motion.span>
              </motion.button>
            );
          })}
        </motion.div>
      </motion.div>


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
          />

          {/* GRID */}
          <div className="grid md:grid-cols-3 gap-10 items-stretch">
            {projects.map((proj, i) => (
              <motion.div
                key={proj._id}
                className={`group relative rounded-xl overflow-hidden flex flex-col h-full
            ${isDark
                    ? "border border-[#1E293B] bg-[#020617]/80 backdrop-blur-sm hover:shadow-[0_0_25px_rgba(20,94,251,0.25)]"
                    : "border border-gray-200 bg-white hover:shadow-[0_0_25px_rgba(20,94,251,0.25)]"
                  }`}

                /* 🔥 NEW UNIQUE ANIMATION (DIFFERENT FROM ABOUT) */
                initial={{
                  opacity: 0,
                  x: i % 2 === 0 ? -70 : 70,   // alternate direction
                  scale: 0.96,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.2 }}

                /* SIMPLE HOVER ONLY */
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
              >
                {/* TOP ACCENT LINE */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#145EFB] to-transparent opacity-0 group-hover:opacity-100 transition" />

                {/* IMAGE */}
                <div className="h-60 overflow-hidden relative">
                  <img
                    src={proj.imageURL}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />

                  {isDark && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-5 flex flex-col h-full">
                  <div className="space-y-3 flex-1">

                    <h3
                      className={`text-lg font-semibold transition group-hover:text-[#145EFB] ${isDark ? "text-white" : "text-gray-900"
                        }`}
                    >
                      {proj.title}
                    </h3>

                    <p
                      className={`text-sm leading-relaxed ${isDark ? "text-[#CBD5E1]" : "text-gray-600"
                        }`}
                    >
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {proj.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className={`text-xs px-2 py-1 rounded transition ${isDark
                            ? "bg-[#0B0F19] border border-[#1E293B] text-[#CBD5E1]"
                            : "bg-gray-100 border border-gray-200 text-gray-700"
                            }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                  </div>

                  {/* BUTTONS */}
                  <div className="flex gap-3 pt-3 mt-auto">

                    {proj.liveURL && (
                      <a href={proj.liveURL} target="_blank">
                        <button className="bg-[#145EFB] hover:bg-[#0F4FD1] text-white text-sm px-4 py-1.5 rounded transition shadow-md cursor-pointer">
                          Live
                        </button>
                      </a>
                    )}

                    {proj.gitHubURL && (
                      <a href={proj.gitHubURL} target="_blank">
                        <button
                          className={`text-sm px-4 py-1.5 rounded transition cursor-pointer ${isDark
                            ? "border border-[#1E293B] text-white"
                            : "border border-gray-300 text-gray-800"
                            }`}
                        >
                          Code
                        </button>
                      </a>
                    )}

                  </div>

                </div>
              </motion.div>
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
        />

        {/* heading → animates ONLY when you reach it */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.6 }}
          className={`text-4xl font-bold mb-16 text-center ${isDark ? "text-white" : "text-gray-900"
            }`}
        >
          My <span className="text-[#145EFB]">Education</span>
        </motion.h2>

        {/* timeline wrapper */}
        <div
          className={`relative pl-8 space-y-12 ${isDark ? "border-l border-[#1E293B]" : "border-l border-gray-200"
            }`}
        >
          {education.map((edu, i) => (
            <motion.div
              key={edu._id}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative group"
            >
              {/* DOT */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                viewport={{ once: true, amount: 0.3 }}
                className={`absolute -left-[14px] top-6 w-7 h-7 rounded-full flex items-center justify-center ${isDark
                  ? "bg-[#020617] border border-[#145EFB]"
                  : "bg-white border border-[#145EFB]"
                  }`}
              >
                <GraduationCap size={14} className="text-[#145EFB]" />
              </motion.div>

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
                    <span className="text-[#145EFB] ml-1">
                      ({edu.field})
                    </span>
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
            </motion.div>
          ))}
        </div>
      </section>


      {/* CONTACT */}
      <motion.section
        id="contact"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
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
        />

        {/* heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={`text-4xl font-bold mb-16 text-center ${isDark ? "text-white" : "text-gray-900"
            }`}
        >
          Get In <span className="text-[#145EFB]">Touch</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
          <div className="space-y-8">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3
                className={`text-2xl font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"
                  }`}
              >
                Let’s build something amazing 🚀
              </h3>

              <p className={isDark ? "text-[#CBD5E1]" : "text-gray-600"}>
                I’m open to freelance, full-time roles, and collaborations.
              </p>
            </motion.div>

            <div className="space-y-4">

              {/* LOCATION */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center gap-4 p-4 rounded-xl transition ${isDark
                  ? "bg-[#020617] border border-[#1E293B] hover:border-[#145EFB]/40"
                  : "bg-white border border-gray-200 shadow-md hover:shadow-[0_0_12px_rgba(20,94,251,0.2)]"
                  }`}
              >
                <MapPin className="text-[#145EFB]" />
                <p className={isDark ? "text-white" : "text-gray-800"}>
                  {about?.location}
                </p>
              </motion.div>

              {/* EMAIL */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className={`flex items-center gap-4 p-4 rounded-xl transition ${isDark
                  ? "bg-[#020617] border border-[#1E293B]"
                  : "bg-white border border-gray-200 shadow-md"
                  }`}
              >
                <Mail className="text-[#145EFB]" />
                <p className={`${isDark ? "text-white" : "text-gray-800"} break-all`}>
                  {about?.email}
                </p>
              </motion.div>

              {/* PHONE */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className={`flex items-center gap-4 p-4 rounded-xl transition ${isDark
                  ? "bg-[#020617] border border-[#1E293B]"
                  : "bg-white border border-gray-200 shadow-md"
                  }`}
              >
                <Phone className="text-[#145EFB]" />
                <p className={isDark ? "text-white" : "text-gray-800"}>
                  {about?.phone}
                </p>
              </motion.div>

            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >

            {/* glow */}
            <div
              className={`absolute inset-0 blur-2xl opacity-20 rounded-2xl ${isDark ? "bg-[#145EFB]/20" : "bg-[#145EFB]/10"
                }`}
            />

            <div
              className={`relative rounded-2xl p-8 space-y-5 ${isDark
                ? "bg-[#020617] border border-[#1E293B]"
                : "bg-white border border-gray-200 shadow-xl"
                }`}
            >

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Input placeholder="Your Name" className="h-12" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Input placeholder="Your Email" className="h-12" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Textarea placeholder="Your Message" className="min-h-[120px]" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Button className="w-full h-12 bg-[#145EFB] text-white">
                  Send Message
                </Button>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </motion.section>

    </div >
  );
};

export default Page;
