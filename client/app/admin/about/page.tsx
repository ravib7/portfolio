"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAddAboutInfoMutation, useDeleteAboutInfoMutation, useReadAboutInfoQuery, useUpdateAboutInfoMutation } from "@/redux/apis/admin.api"
import { ABOUT, ADD_ABOUT_REQUEST, DELETE_ABOUT_REQUEST } from "@/types/admin"
import { zodResolver } from "@hookform/resolvers/zod"
import { format, parse } from "date-fns"
import { CalendarDays, Mail, MapPin, Pencil, Phone, Trash2, } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"


const Page = () => {
    const [open, setOpen] = useState(false)
    const [selectedAbout, setSelectedAbout] = useState<ABOUT | null>(null)

    const { data } = useReadAboutInfoQuery()
    const [addAboutInfo] = useAddAboutInfoMutation()
    const [updateAboutInfo] = useUpdateAboutInfoMutation()
    const [deleteAboutInfo] = useDeleteAboutInfoMutation()

    const skillSchema = z.object({
        name: z.string().min(1),
        title: z.string().min(1),
        introduction: z.string().min(1),
        journey: z.string().optional(),
        currentWork: z.string().optional(),
        dob: z.string().optional(),
        location: z.string().min(1),
        email: z.string().email().min(1),
        phone: z.string().min(1),
        languages: z.string().optional(),
        profileImage: z.string().optional()
    }) satisfies z.ZodType<ADD_ABOUT_REQUEST>;

    const { register, reset, handleSubmit, control, formState: { errors, dirtyFields } } = useForm<ADD_ABOUT_REQUEST>({
        resolver: zodResolver(skillSchema),
        defaultValues: {
            name: "",
            title: "",
            introduction: "",
            journey: "",
            currentWork: "",
            dob: "",
            location: "",
            email: "",
            phone: "",
            languages: "",
            profileImage: ""
        }
    })

    const handleAboutInfo = async (data: ADD_ABOUT_REQUEST) => {
        try {
            if (selectedAbout) {
                await updateAboutInfo({ _id: selectedAbout._id!, ...data }).unwrap()
                toast.success("About Info Updated Successfully")
                reset({
                    name: "",
                    title: "",
                    introduction: "",
                    journey: "",
                    currentWork: "",
                    dob: "",
                    location: "",
                    email: "",
                    phone: "",
                    languages: "",
                    profileImage: ""
                })
                setSelectedAbout(null)
                setOpen(false);
            } else {
                await addAboutInfo(data).unwrap();
                toast.success("About Info Added Successfully")
                reset();
                setOpen(false)
            }
        } catch (err) {
            console.log(err);
            toast.error("Unable to add or update about info")
        }
    };

    const handleAboutInfoDelete = async (data: DELETE_ABOUT_REQUEST) => {
        try {
            await deleteAboutInfo(data).unwrap()
            toast.success("About Info Deleted successfully")
        } catch (error) {
            console.log(error)
            toast.error("Delete failed")
        }
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center max-w-5xl mx-auto">
                <h1 className="text-3xl font-semibold text-gray-800">About</h1>

                <Button
                    onClick={() => {
                        setSelectedAbout(null)
                        reset()
                        setOpen(true)
                    }}
                    className="bg-[#155DFC] hover:bg-[#0f4cd1] text-white cursor-pointer"
                >
                    + Add About
                </Button>
            </div>

            {/* Cards */}
            <div className="space-y-6 max-w-5xl mx-auto">

                {
                    data?.result && (
                        <Card className="w-full group rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-lg shadow-sm transition-all duration-300 hover:shadow-[0_20px_45px_rgba(21,93,252,0.25)] hover:-translate-y-1">
                            <CardContent className="p-8 space-y-6">
                                {/* Top */}
                                <div className="flex items-center justify-between">

                                    {/* LEFT IMAGE */}
                                    <img
                                        src={data.result.profileImage || "/placeholder.png"}
                                        alt="profile"
                                        className="w-16 h-16 rounded-full object-cover object-top border-2 border-[#155DFC]/20 flex-shrink-0"
                                    />

                                    {/* CENTER CONTENT (FIX HERE) */}
                                    <div className="flex-1 text-center space-y-2">
                                        <h2 className="text-2xl font-semibold text-[#155DFC]">
                                            {data.result.name}
                                        </h2>

                                        <p className="text-gray-600 text-lg">{data.result.title}</p>

                                        <div className="flex justify-center flex-wrap gap-5 text-sm text-gray-500 pt-1">
                                            <div className="flex items-center gap-2">
                                                <MapPin size={16} className="text-[#155DFC]" />
                                                {data.result.location}
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <CalendarDays size={16} className="text-[#155DFC]" />
                                                {data.result.dob
                                                    ? format(
                                                        parse(data.result.dob, "dd/MM/yyyy", new Date()),
                                                        "dd MMM yyyy"
                                                    )
                                                    : "N/A"}
                                            </div>
                                        </div>
                                    </div>

                                    {/* RIGHT ACTIONS (UNCHANGED) */}
                                    <div className="flex gap-2">
                                        <Button
                                            className="cursor-pointer"
                                            size="icon"
                                            variant="outline"
                                            onClick={() => {
                                                setSelectedAbout(data.result)
                                                reset({
                                                    ...data.result,
                                                    languages: data.result?.languages?.join(", ") || ""
                                                })
                                                setOpen(true)
                                            }}
                                        >
                                            <Pencil size={16} className="text-[#155DFC]" />
                                        </Button>

                                        <Button
                                            className="cursor-pointer"
                                            size="icon"
                                            variant="destructive"
                                            onClick={() =>
                                                handleAboutInfoDelete({ _id: data.result?._id as string })
                                            }
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100" />

                                {/* Introduction */}
                                <div className="space-y-1">
                                    <h3 className="text-sm font-semibold text-[#155DFC]">
                                        Introduction
                                    </h3>
                                    <p className="text-[15px] text-gray-700 leading-relaxed">
                                        {data.result.introduction}
                                    </p>
                                </div>

                                {/* Journey */}
                                {data.result.journey && (
                                    <div className="space-y-1">
                                        <h3 className="text-sm font-semibold text-[#155DFC]">
                                            Journey
                                        </h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {data.result.journey}
                                        </p>
                                    </div>
                                )}

                                {/* Current Work */}
                                {data.result.currentWork && (
                                    <div className="space-y-1">
                                        <h3 className="text-sm font-semibold text-[#155DFC]">
                                            Current Work
                                        </h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {data.result.currentWork}
                                        </p>
                                    </div>
                                )}

                                {/* Contact */}
                                <div className="flex flex-col gap-3 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <Mail size={16} className="text-[#155DFC]" />
                                        {data.result.email}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Phone size={16} className="text-[#155DFC]" />
                                        {data.result.phone}
                                    </div>
                                </div>

                                {/* Languages */}
                                <div className="flex flex-wrap gap-3 pt-3">
                                    {data.result.languages?.map((lang: string, i: number) => (
                                        <span
                                            key={i}
                                            className="px-4 py-1.5 text-xs rounded-full bg-[#155DFC]/10 text-[#155DFC] font-medium tracking-wide hover:bg-[#155DFC]/20 transition"
                                        >
                                            {lang}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
            </div>

            {/* Modal */}
            <Dialog
                open={open}
                onOpenChange={(val) => {
                    setOpen(val)
                    if (!val) {
                        reset({
                            name: "",
                            title: "",
                            introduction: "",
                            journey: "",
                            currentWork: "",
                            dob: "",
                            location: "",
                            email: "",
                            phone: "",
                            languages: "",
                            profileImage: ""
                        })
                        setSelectedAbout(null)
                    }
                }}
            >
                <DialogContent
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    className="sm:max-w-lg max-h-[90vh] overflow-y-auto no-scrollbar p-6"
                >
                    <DialogHeader>
                        <DialogTitle>
                            {selectedAbout ? "Update About" : "Add About"}
                        </DialogTitle>
                    </DialogHeader>

                    <form
                        onSubmit={handleSubmit(handleAboutInfo)}
                        className="space-y-4 mt-4"
                    >
                        <Input {...register("name")} placeholder="Name" />

                        <Input {...register("title")} placeholder="Title" />

                        <Input {...register("email")} placeholder="Email" />

                        <Input {...register("phone")} placeholder="Phone" />

                        <Input {...register("location")} placeholder="Location" />

                        <Input {...register("dob")} placeholder="Date of Birth" />

                        <Textarea
                            {...register("introduction")}
                            placeholder="Introduction"
                        />
                        <Textarea {...register("journey")} placeholder="Journey" />

                        <Textarea
                            {...register("currentWork")}
                            placeholder="Current Work"
                        />

                        <Input
                            {...register("languages")}
                            placeholder="Languages (comma separated)"
                        />
                        <Input
                            {...register("profileImage")}
                            placeholder="Profile Image URL"
                        />

                        {
                            selectedAbout
                                ? <Button type="submit" className="bg-yellow-500 hover:bg-yellow-400 text-white cursor-pointer w-full">
                                    Update About Info
                                </Button>
                                : <Button type="submit" className="bg-[#145EFB] text-white cursor-pointer w-full">
                                    Add About Info
                                </Button>
                        }
                    </form>
                </DialogContent>
            </Dialog>
        </div >
    )
}

export default Page