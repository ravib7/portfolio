"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { useAddExperienceMutation, useDeleteExperienceMutation, useGetExperienceQuery, useUpdateExperienceMutation } from "@/redux/apis/admin.api"
import { ADD_EXPERIENCE_REQUEST, DELETE_EXPERIENCE_REQUEST, EXPERIENCE } from "@/types/admin"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { Plus, Pencil, Trash2, CalendarDays, Building2 } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const page = () => {

    const [open, setOpen] = useState(false)
    const [selectedExperience, setSelectedExperience] = useState<EXPERIENCE | null>(null)

    const { data } = useGetExperienceQuery()
    const [addExperience] = useAddExperienceMutation()
    const [updateExperience] = useUpdateExperienceMutation()
    const [deleteExperience] = useDeleteExperienceMutation()

    const ExperienceSchema = z.object({
        role: z.string().min(1),
        company: z.string().min(1),
        startDate: z.date(),
        endDate: z.date().optional(),
        description: z.string().optional(),
        responsibilities: z.string().min(1),
    }) satisfies z.ZodType<ADD_EXPERIENCE_REQUEST>

    const { register, reset, handleSubmit, control, formState: { errors, dirtyFields } } = useForm<ADD_EXPERIENCE_REQUEST>({
        resolver: zodResolver(ExperienceSchema),
        defaultValues: {
            role: "",
            company: "",
            startDate: new Date(),
            endDate: undefined,
            description: "",
            responsibilities: "",
        }
    })


    const handleExperience = async (data: ADD_EXPERIENCE_REQUEST) => {
        try {
            if (selectedExperience) {
                await updateExperience({ _id: selectedExperience._id!, ...data }).unwrap()
                toast.success("Experience Updated Successfully")
                reset({
                    role: "",
                    company: "",
                    startDate: new Date(),
                    endDate: undefined,
                    description: "",
                    responsibilities: "",
                })
                setSelectedExperience(null)
                setOpen(false);
            } else {
                await addExperience(data).unwrap();
                toast.success("Experience Added Successfully")
                reset();
                setOpen(false)
            }
        } catch (err) {
            console.log(err);
            toast.error("Unable to add or update experience")
        }
    };

    const handleDeleteSkill = async (data: DELETE_EXPERIENCE_REQUEST) => {
        try {
            await deleteExperience(data).unwrap()
            toast.success("Experience Deleted Successfully")
        } catch (error) {
            console.log(error)
            toast.error("unable to delete experience")
        }
    }


    return (
        <div className="p-6 bg-gray-50 min-h-screen space-y-6">

            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold text-gray-800">
                    Experience
                </h1>

                <Button
                    onClick={() => {
                        setSelectedExperience(null)

                        reset({
                            role: "",
                            company: "",
                            startDate: new Date(),
                            endDate: undefined,
                            description: "",
                            responsibilities: "",
                        })

                        setOpen(true)
                    }}
                    className="flex items-center gap-2 bg-[#155DFC] hover:bg-[#0f4cd1] cursor-pointer"
                >
                    + Add Experience
                </Button>
            </div>

            {/* Timeline */}
            <div className="relative border-l border-[#155DFC]/20 pl-6 space-y-10">

                {data && data.result.map((item, index) => (
                    <div key={index} className="relative">

                        <Card className="group rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-lg shadow-sm transition-all duration-300 hover:shadow-[0_20px_45px_rgba(21,93,252,0.25)] hover:-translate-y-1">

                            <CardContent className="p-6 space-y-5">

                                {/* Top Section */}
                                <div className="flex justify-between items-start">

                                    <div className="space-y-2">

                                        {/* Role */}
                                        <h2 className="text-xl font-semibold text-[#155DFC] tracking-tight">
                                            {item.role}
                                        </h2>

                                        {/* Company */}
                                        <div className="flex items-center gap-2 text-gray-700 font-medium text-base">
                                            <Building2 size={16} className="text-[#155DFC]" />
                                            {item.company}
                                        </div>

                                        {/* Date */}
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <CalendarDays size={16} className="text-[#155DFC]" />
                                            {format(new Date(item.startDate), "dd MMM yyyy")} -{" "}
                                            {item.endDate
                                                ? format(new Date(item.endDate), "dd MMM yyyy")
                                                : "Present"}
                                        </div>

                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 opacity-70 group-hover:opacity-100 transition">
                                        <Button
                                            onClick={() => {
                                                setSelectedExperience(item)
                                                reset({
                                                    ...item,
                                                    startDate: new Date(item.startDate),
                                                    endDate: item.endDate ? new Date(item.endDate) : undefined,
                                                    responsibilities: item.responsibilities.join("\n")
                                                })

                                                setOpen(true)
                                            }}
                                            size="icon"
                                            variant="outline"
                                            className="hover:border-[#155DFC] cursor-pointer"
                                        >
                                            <Pencil size={16} className="text-[#155DFC]" />
                                        </Button>

                                        <Button
                                            onClick={() => handleDeleteSkill({ _id: item._id as string })}
                                            size="icon"
                                            variant="destructive"
                                            className="cursor-pointer"
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>

                                </div>

                                {/* Divider */}
                                <div className="border-t border-gray-100" />

                                {/* Description */}
                                {item.description && (
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        {item.description}
                                    </p>
                                )}

                                {/* Responsibilities */}
                                <div className="space-y-2">
                                    <p className="text-sm font-semibold text-gray-800">
                                        Key Responsibilities
                                    </p>

                                    <ul className="space-y-2">
                                        {item.responsibilities.map((res, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                                                <span className="w-2 h-2 mt-2 bg-[#155DFC] rounded-full"></span>
                                                {res}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                            </CardContent>
                        </Card>

                    </div>
                ))}

            </div>

            {/* Modal UI */}
            <Dialog
                open={open}
                onOpenChange={(val) => {
                    setOpen(val)

                    if (!val) {
                        reset({
                            role: "",
                            company: "",
                            startDate: new Date(),
                            endDate: undefined,
                            description: "",
                            responsibilities: "",
                        })
                        setSelectedExperience(null)
                    }
                }}
            >
                <DialogContent className="sm:max-w-md" onOpenAutoFocus={(e) => e.preventDefault()}>
                    <DialogHeader>
                        <DialogTitle>
                            {
                                selectedExperience
                                    ? "Update Experience"
                                    : "Add Experience"
                            }
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-5 mt-4">
                        <form onSubmit={handleSubmit(handleExperience)} className="flex flex-col gap-4 mt-4">

                            {/* Role */}
                            <Input
                                {...register("role")} placeholder="Enter Role" />

                            {/* Company */}
                            <Input
                                {...register("company")} placeholder="Enter Company" />

                            {/* Dates */}
                            <div className="grid grid-cols-2 gap-3">

                                {/* Start Date */}
                                <Controller
                                    control={control}
                                    name="startDate"
                                    render={({ field }) => (
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className="w-full justify-start text-left font-normal"
                                                >
                                                    <CalendarDays className="mr-2 h-4 w-4 text-[#155DFC]" />

                                                    {field.value
                                                        ? format(field.value, "PPP")
                                                        : "Start Date"}
                                                </Button>
                                            </PopoverTrigger>

                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    )}
                                />

                                {/* End Date */}
                                <Controller
                                    control={control}
                                    name="endDate"
                                    render={({ field }) => (
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className="w-full justify-start text-left font-normal"
                                                >
                                                    <CalendarDays className="mr-2 h-4 w-4 text-[#155DFC]" />

                                                    {field.value
                                                        ? format(field.value, "PPP")
                                                        : "End Date"}
                                                </Button>
                                            </PopoverTrigger>

                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value ?? undefined}
                                                    onSelect={field.onChange}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    )}
                                />

                            </div>

                            {/* Description */}
                            <Textarea
                                {...register("description")} placeholder="Enter Description" />

                            {/* Responsibilities */}
                            <Textarea
                                {...register("responsibilities")}
                                className="min-h-[100px]"
                                placeholder="Enter responsibilities (one per line)"
                            />


                            {
                                selectedExperience
                                    ? <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 cursor-pointer">
                                        Update Experience
                                    </Button>
                                    : <Button type="submit" className="w-full bg-[#155DFC] hover:bg-[#0f4cd1] cursor-pointer">
                                        Save Experience
                                    </Button>
                            }

                        </form>
                    </div>
                </DialogContent>
            </Dialog>

        </div >
    )
}

export default page