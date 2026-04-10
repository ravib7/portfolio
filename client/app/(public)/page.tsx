"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
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
import { SiTypescript, SiMongodb, SiExpress, SiNextdotjs, SiTailwindcss, SiRedux, } from "react-icons/si";
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


  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Mobile App Developer",
  ];

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
                className={`relative group transition ${active === item ? "text-purple-400" : ""
                  }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}

                {/* UNDERLINE */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-purple-400 transition-all duration-300
            ${active === item
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                    }`}
                ></span>
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
                  ? "text-purple-400"
                  : "text-gray-300"
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
      <section id="skills" className="px-6 md:px-16 py-24 bg-[#020617]">
        <h2 className="text-4xl font-bold mb-12 text-center">
          My <span className="text-purple-400">Skills</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-10">

          {/* FRONTEND */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-6 text-purple-400">
              Frontend
            </h3>

            <div className="space-y-4">
              {skillsFrontend.map((skill) => {

                const iconMap = {
                  react: <FaReact />,
                  javascript: <FaJs />,
                  typescript: <SiTypescript />,
                  html: <FaHtml5 />,
                  css: <FaCss3Alt />,
                  tailwind: <SiTailwindcss />,
                  redux: <SiRedux />,
                  next: <SiNextdotjs />,
                };

                const levelColor = {
                  beginner: "bg-red-500",
                  intermediate: "bg-yellow-500",
                  expert: "bg-green-500",
                };

                const key = skill.skillName.toLowerCase();
                const level = skill.level?.toLowerCase();

                return (
                  <div
                    key={skill._id}
                    className="flex items-center justify-between bg-slate-800 p-3 rounded-lg"
                  >
                    {/* LEFT */}
                    <div className="flex items-center gap-3">
                      <span className="text-xl">
                        {iconMap[key] || <FaReact />}
                      </span>
                      <span>{skill.skillName}</span>
                    </div>

                    {/* RIGHT LEVEL */}
                    <div className="flex items-center gap-2 w-40">
                      {/* LINE */}
                      <div className="flex-1 h-[2px] bg-gray-600 relative">
                        <div
                          className="absolute top-0 left-0 h-[2px] bg-purple-500"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>

                      {/* NUMBER */}
                      <span className="text-xs text-gray-400 w-8 text-right">
                        {skill.level}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* BACKEND */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-6 text-blue-400">
              Backend
            </h3>

            <div className="space-y-4">
              {skillsBackend.map((skill) => {

                const iconMap = {
                  node: <FaNodeJs />,
                  express: <SiExpress />,
                  mongodb: <SiMongodb />,
                  git: <FaGitAlt />,
                };

                const levelColor = {
                  beginner: "bg-red-500",
                  intermediate: "bg-yellow-500",
                  expert: "bg-green-500",
                };

                const key = skill.skillName.toLowerCase();
                const level = skill.level?.toLowerCase();

                return (
                  <div
                    key={skill._id}
                    className="flex items-center justify-between bg-slate-800 p-3 rounded-lg"
                  >
                    {/* LEFT */}
                    <div className="flex items-center gap-3">
                      <span className="text-xl">
                        {iconMap[key] || <FaNodeJs />}
                      </span>
                      <span>{skill.skillName}</span>
                    </div>

                    {/* RIGHT LEVEL */}
                    <div className="flex items-center gap-2 w-40">
                      {/* LINE */}
                      <div className="flex-1 h-[2px] bg-gray-600 relative">
                        <div
                          className="absolute top-0 left-0 h-[2px] bg-purple-500"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>

                      {/* NUMBER */}
                      <span className="text-xs text-gray-400 w-8 text-right">
                        {skill.level}
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
      <section id="education" className="px-6 md:px-16 py-24 bg-[#020617]">
        <h2 className="text-4xl font-bold mb-12 text-center">
          My <span className="text-purple-400">Education</span>
        </h2>

        <div className="relative border-l border-slate-700 pl-6 space-y-10">

          {education.map((edu) => (
            <div key={edu._id} className="relative">

              {/* CARD */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-2">

                {/* DEGREE */}
                <h3 className="text-lg font-semibold">
                  {edu.degree}{" "}
                  <span className="text-blue-400">({edu.field})</span>
                </h3>

                {/* COLLEGE */}
                <p className="text-gray-300">{edu.college}</p>

                {/* YEAR */}
                <p className="text-sm text-gray-400">
                  {edu.startYear} - {edu.endYear}
                </p>

              </div>
            </div>
          ))}

        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="px-6 md:px-16 py-24 bg-[#020617]">
        <h2 className="text-4xl font-bold mb-12 text-center">
          My <span className="text-purple-400">Experience</span>
        </h2>

        <div className="relative border-l border-slate-700 pl-6 space-y-10">

          {experience.map((exp) => (
            <div key={exp._id} className="relative">

              {/* CARD */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3">

                {/* ROLE + COMPANY */}
                <h3 className="text-lg font-semibold">
                  {exp.role} <span className="text-purple-400">@ {exp.company}</span>
                </h3>

                {/* DATE */}
                <p className="text-sm text-gray-400">
                  {new Date(exp.startDate).toLocaleDateString()} -{" "}
                  {exp.endDate
                    ? new Date(exp.endDate).toLocaleDateString()
                    : "Present"}
                </p>

                {/* DESCRIPTION */}
                {exp.description && (
                  <p className="text-gray-300">{exp.description}</p>
                )}

                {/* RESPONSIBILITIES */}
                <ul className="list-disc ml-5 text-sm text-gray-300 space-y-1">
                  {exp.responsibilities.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>

              </div>
            </div>
          ))}

        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 md:px-16 py-24 bg-[#020617]">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Get In <span className="text-purple-400">Touch</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
          <div className="space-y-8">

            <div>
              <h3 className="text-2xl font-semibold mb-3">
                Let’s build something amazing 🚀
              </h3>
              <p className="text-gray-400">
                I’m open to freelance, full-time roles, and collaborations.
              </p>
            </div>

            <div className="space-y-4">

              <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
                <span className="text-purple-400 text-xl">📍</span>
                <p>{about?.location}</p>
              </div>

              <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
                <span className="text-blue-400 text-xl">📧</span>
                <p>{about?.email}</p>
              </div>

              <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl">
                <span className="text-green-400 text-xl">📞</span>
                <p>{about?.phone}</p>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="relative">

            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 blur-2xl opacity-20 rounded-2xl"></div>

            <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-5">

              <Input
                placeholder="Your Name"
                className="bg-slate-800 border-slate-700 h-12"
              />

              <Input
                placeholder="Your Email"
                className="bg-slate-800 border-slate-700 h-12"
              />

              <Textarea
                placeholder="Your Message"
                className="bg-slate-800 border-slate-700 min-h-[120px]"
              />

              <Button className="w-full h-12 bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90">
                Send Message
              </Button>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Page;
