"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, Plus } from "lucide-react"
import { useAddProjectMutation, useDeleteProjectMutation, useGetProjectsQuery, useUpdateProjectMutation } from "@/redux/apis/admin.api"
import z from "zod"
import { ADD_PROJECT_REQUEST, DELETE_PROJECT_REQUEST, PROJECT } from "@/types/admin"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

const ProjectsPage = () => {
    const [open, setOpen] = useState(false)
    const [selectedProject, setSelectedProject] = useState<PROJECT | null>(null)

    const { data } = useGetProjectsQuery()
    const [addProject] = useAddProjectMutation()
    const [updateProject] = useUpdateProjectMutation()
    const [deleteProject] = useDeleteProjectMutation()

    const ProjectSchema = z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        category: z.enum(["web", "mobile"]),
        technologies: z.string().min(1),
        imageURL: z.string().optional(),
        liveURL: z.string().optional(),
        gitHubURL: z.string().optional(),
    })

    const { register, reset, handleSubmit, control, formState: { errors, dirtyFields } } = useForm<ADD_PROJECT_REQUEST>({
        resolver: zodResolver(ProjectSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "web",
            technologies: "",
            imageURL: "",
            liveURL: "",
            gitHubURL: "",
        }
    })

    const handleProject = async (data: ADD_PROJECT_REQUEST) => {
        try {
            const formattedData = {
                ...data,
                technologies: data.technologies.split(",").map(t => t.trim())
            }

            if (selectedProject) {
                await updateProject({
                    _id: selectedProject._id,
                    ...formattedData
                })
                toast.success("Project Updated Successfully")
                reset({ title: "", description: "", category: "web", technologies: "", imageURL: "", liveURL: "", gitHubURL: "" })
                setSelectedProject(null);
                setOpen(false)
            } else {
                await addProject(data).unwrap()
                toast.success("Project Added Successfully")
                reset()
                setOpen(false)
            }
        } catch (error) {
            console.log(error)
            toast.error("Unable to add or update project")
        }
    }

    const handleDeleteProject = async (data: DELETE_PROJECT_REQUEST) => {
        try {
            await deleteProject(data).unwrap()
            toast.success("Project Deleted Successfully")
        } catch (error) {
            console.log(error)
            toast.error("Project Deleted Successfully")
        }
    }


    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold text-gray-800">
                    Projects
                </h1>

                <Button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 cursor-pointer"
                >
                    <Plus size={18} /> Add Project
                </Button>
            </div>

            {/* Project Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data && data.result.map((item, index) => (
                    <Card
                        key={index}
                        className="group relative overflow-hidden border-0 shadow-lg rounded-2xl bg-white/70 backdrop-blur-lg hover:shadow-2xl transition-all duration-300"
                    >

                        {/* Image */}
                        <div className="relative overflow-hidden rounded-t-2xl">
                            <img
                                src={item.imageURL || "/placeholder.png"}
                                alt="Project"
                                className="aspect-[16/9] w-full object-fit group-hover:scale-105 transition duration-500"
                            />

                            {/* Gradient Overlay */}
                            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80" /> */}

                            {/* Floating Buttons */}
                            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                                <Button
                                    onClick={() => {
                                        setSelectedProject(item)
                                        reset({
                                            ...item,
                                            technologies: item.technologies.join(", ")
                                        })
                                        setOpen(true)
                                    }}
                                    size="icon"
                                    variant="secondary"
                                    className="rounded-full bg-white/80 backdrop-blur hover:bg-white cursor-pointer"
                                >
                                    <Pencil className="w-4 h-4 text-blue-600" />
                                </Button>

                                <Button
                                    onClick={() => handleDeleteProject({ _id: item._id as string })}
                                    size="icon"
                                    variant="secondary"
                                    className="rounded-full bg-white/80 backdrop-blur hover:bg-white cursor-pointer"
                                >
                                    <Trash2 className="w-4 h-4 text-red-600" />
                                </Button>
                            </div>

                            {/* Category Badge */}
                            <div className="absolute bottom-3 left-3">
                                <Badge className="bg-white/90 text-gray-800 shadow">
                                    {item.category}
                                </Badge>
                            </div>
                        </div>

                        {/* Content */}
                        < CardContent className="p-4 space-y-3" >

                            {/* Title */}
                            <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition" >
                                {item.title}
                            </h2>

                            {/* Description */}
                            <p className="text-sm text-gray-600 line-clamp-2">
                                {item.description}
                            </p>

                            {/* Technologies */}
                            <div className="flex flex-wrap gap-2">
                                {item.technologies.map((tech: string, i: number) => (
                                    <span
                                        key={i}
                                        className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600 font-medium"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-between items-center pt-3">

                                <div className="flex gap-2">
                                    {item.liveURL && (
                                        <a href={item.liveURL} target="_blank">
                                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
                                                Live
                                            </Button>
                                        </a>
                                    )}

                                    {item.gitHubURL && (
                                        <a href={item.gitHubURL} target="_blank">
                                            <Button size="sm" variant="outline" className="cursor-pointer">
                                                Code
                                            </Button>
                                        </a>
                                    )}
                                </div>
                            </div>

                        </CardContent>
                    </Card >
                ))}
            </div >

            {/* Dialog Form */}
            < Dialog
                open={open}
                onOpenChange={(val) => {
                    setOpen(val)

                    if (!val) {
                        reset({
                            title: "",
                            description: "",
                            category: "web",
                            technologies: "",
                            imageURL: "",
                            liveURL: "",
                            gitHubURL: "",
                        })
                        setSelectedProject(null)
                    }
                }}
            >
                <DialogContent className="sm:max-w-md" onOpenAutoFocus={(e) => e.preventDefault()}>
                    <DialogHeader>
                        <DialogTitle>
                            {
                                selectedProject
                                    ? "Update Project"
                                    : "Add Project"
                            }

                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(handleProject)} className="flex flex-col gap-4 mt-4">
                        <Input
                            {...register("title")}
                            type="text"
                            placeholder="Enter Title"
                            className="border p-2 rounded-md"
                        />

                        <Textarea
                            {...register("description")}
                            placeholder="Enter Description"
                            className="border p-2 rounded-md"
                        />

                        <Controller
                            name="category"   // field name
                            control={control}  // useForm control
                            render={({ field }) => (
                                <Select
                                    value={field.value}  // connect value
                                    onValueChange={(value) => field.onChange(value)}  // connect value
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="web">Web</SelectItem>
                                            <SelectItem value="mobile">Mobile</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />

                        <Input
                            {...register("technologies")}
                            type="text"
                            placeholder="Enter Technologies"
                            className="border p-2 rounded-md"
                        />

                        <Input
                            {...register("imageURL")}
                            type="text"
                            placeholder="Enter imageURL"
                            className="border p-2 rounded-md"
                        />

                        <Input
                            {...register("liveURL")}
                            type="text"
                            placeholder="Enter liveURL"
                            className="border p-2 rounded-md"
                        />

                        <Input
                            {...register("gitHubURL")}
                            type="text"
                            placeholder="Enter gitHubURL"
                            className="border p-2 rounded-md"
                        />

                        {
                            selectedProject
                                ? <Button type="submit" className="bg-yellow-500 text-white cursor-pointer">
                                    Update Project
                                </Button>
                                : <Button type="submit" className="bg-[#145EFB] text-white cursor-pointer">
                                    Add Project
                                </Button>
                        }
                    </form>
                </DialogContent>
            </Dialog >
        </ div >
    )
}

export default ProjectsPage