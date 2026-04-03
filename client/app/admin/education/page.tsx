"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useAddEducationInfoMutation, useDeleteEducationInfoMutation, useGetEducationInfoQuery, useUpdateEducationInfoMutation } from '@/redux/apis/admin.api'
import { ADD_EDUCATION_REQUEST, DELETE_EDUCATION_REQUEST, UPDATE_EDUCATION_REQUEST } from '@/types/admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarDays, GraduationCap, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z, { ZodType } from 'zod';

const page = () => {

    const [open, setOpen] = useState(false)
    const [selectedEduc, setSelectedEduc] = useState<UPDATE_EDUCATION_REQUEST | null>(null)

    const { data } = useGetEducationInfoQuery()
    const [addEducationInfo] = useAddEducationInfoMutation()
    const [updateEducationInfo] = useUpdateEducationInfoMutation()
    const [deleteEducationInfo] = useDeleteEducationInfoMutation()

    const educationSchema = z.object({
        degree: z.string().min(1),
        college: z.string().min(1),
        field: z.string().min(1),
        startYear: z.string().min(1),
        endYear: z.string().min(1),
    }) satisfies ZodType<ADD_EDUCATION_REQUEST>

    const { register, reset, handleSubmit, formState: { errors, dirtyFields } } = useForm<ADD_EDUCATION_REQUEST>({
        resolver: zodResolver(educationSchema),
        defaultValues: {
            degree: "",
            college: "",
            field: "",
            startYear: "",
            endYear: "",
        }
    })

    const handleFormSubmit = async (data: ADD_EDUCATION_REQUEST) => {
        try {
            if (selectedEduc) {
                await updateEducationInfo({ _id: selectedEduc._id, ...data }).unwrap()
                toast.success("Education Information Updated Successfully")
                reset({ degree: "", college: "", field: "", startYear: "", endYear: "" })
                setSelectedEduc(null)
                setOpen(false)
            } else {
                await addEducationInfo(data).unwrap()
                toast.success("Education Information Added Successfully")
                reset()
                setOpen(false)
            }
        } catch (error) {
            console.log(error)
            toast.error("unable to update or add")
        }
    }

    const handleEducationDelete = async (data: DELETE_EDUCATION_REQUEST) => {
        try {
            await deleteEducationInfo(data).unwrap()
            toast.success("Education Information Deleted Successfully")
        } catch (error) {
            console.log(error)
            toast.error("Education Information Delete failed")
        }
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen space-y-6" >

            {/* Header */}
            < div className="flex justify-between items-center max-w-5xl mx-auto" >
                <h1 className="text-3xl font-semibold text-gray-800" >
                    Education
                </h1>

                <Button
                    onClick={() => setOpen(true)}
                    className="bg-[#155DFC] hover:bg-[#0f4cd1] cursor-pointer"
                >
                    + Add Education
                </Button>
            </div>

            {/* Cards */}
            <div className="space-y-6 max-w-5xl mx-auto" >
                {data && data.result.map((item) => (
                    <Card key={item._id} className="w-full group rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-lg shadow-sm transition-all duration-300 hover:shadow-[0_20px_45px_rgba(21,93,252,0.25)] hover:-translate-y-1">
                        <CardContent className="p-8 space-y-6 relative z-10">

                            <div className="flex items-start justify-between gap-6">

                                {/* Left Icon */}
                                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-[#155DFC]/20 to-[#155DFC]/5 shadow-inner">
                                    <GraduationCap className="text-[#155DFC] w-7 h-7" />
                                </div>

                                {/* Center Content */}
                                <div className="flex-1 space-y-3">

                                    {/* Degree */}
                                    <h2 className="text-xl font-semibold text-[#155DFC] tracking-tight">
                                        {item.degree}
                                    </h2>

                                    {/* College */}
                                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                                        🎓 <span>{item.college}</span>
                                    </div>

                                    {/* Field */}
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        📚 <span>{item.field}</span>
                                    </div>

                                    {/* Year */}
                                    <div className="flex items-center gap-2 text-sm text-gray-500 pt-1">
                                        <CalendarDays size={16} className="text-[#155DFC]" />
                                        {item.startYear} - {item.endYear}
                                    </div>

                                </div>

                                {/* Actions */}
                                <div className="flex flex-col gap-2">

                                    <Button
                                        onClick={() => {
                                            setSelectedEduc({ _id: item._id })
                                            reset(item)
                                            setOpen(true)
                                        }}
                                        size="icon"
                                        variant="outline"
                                        className="hover:border-[#155DFC] cursor-pointer"
                                    >
                                        <Pencil size={16} className="text-[#155DFC]" />
                                    </Button>

                                    <Button
                                        onClick={() => handleEducationDelete({ _id: item._id as string })}
                                        size="icon"
                                        variant="destructive"
                                        className="cursor-pointer"
                                    >
                                        <Trash2 size={16} />
                                    </Button>

                                </div>

                            </div>

                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Modal UI only */}
            <Dialog open={open}
                onOpenChange={(val) => {
                    setOpen(val)
                    if (!val) {
                        reset({ degree: "", college: "", field: "", startYear: "", endYear: "" })
                        setSelectedEduc(null)
                    }
                }}>
                <DialogContent className="sm:max-w-lg p-6" onOpenAutoFocus={(e) => e.preventDefault()}>
                    <DialogHeader>
                        <DialogTitle>
                            {
                                selectedEduc
                                    ? "Update Education"
                                    : "Add Education"
                            }
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        < div className="space-y-4 mt-4" >
                            <Input {...register("degree")} placeholder="Degree" />
                            <Input {...register("college")} placeholder="College" />
                            <Input {...register("field")} placeholder="Field" />

                            <div className="grid grid-cols-2 gap-3" >
                                <Input {...register("startYear")} placeholder="Start Year" />
                                <Input {...register("endYear")} placeholder="End Year" />
                            </div>

                            {
                                selectedEduc
                                    ? <Button type='submit' className="w-full bg-yellow-500 hover:bg-yellow-400 cursor-pointer" >
                                        Update Education
                                    </Button>
                                    : <Button type='submit' className="w-full bg-[#155DFC] hover:bg-[#0f4cd1] cursor-pointer" >
                                        Save Education
                                    </Button>
                            }


                        </div>
                    </form>
                </DialogContent>
            </Dialog>

        </div >
    );
};
export default page