"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAddSkillsMutation, useDeleteSkillsMutation, useGetSkillsQuery, useUpdateSkillsMutation } from "@/redux/apis/admin.api";
import { ADD_SKILLS_REQUEST, DELETE_SKILLS_REQUEST, UPDATE_SKILLS_REQUEST } from "@/types/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const Skills = () => {
    const [open, setOpen] = useState(false)
    const [selectedSkill, setSelectedSkill] = useState<string | null>(null)

    const [addSkill, { isError, error }] = useAddSkillsMutation()
    const [updateSkill, { isError: updateIsError, error: updateError }] = useUpdateSkillsMutation()
    const [deleteSkill] = useDeleteSkillsMutation()
    const { data } = useGetSkillsQuery();

    const allSkills = [
        ...(data?.frontend || []),
        ...(data?.backend || [])
    ];

    const skillSchema = z.object({
        skillName: z.string().min(1),
        category: z.enum(["frontend", "backend"]),
        level: z.string().min(1),
    }) satisfies z.ZodType<ADD_SKILLS_REQUEST>;

    const { register, reset, handleSubmit, control, formState: { errors, dirtyFields } } = useForm<ADD_SKILLS_REQUEST>({
        resolver: zodResolver(skillSchema),
        defaultValues: {
            skillName: "",
            category: "frontend",
            level: "",
        }
    })

    const handleSkill = async (data: ADD_SKILLS_REQUEST) => {
        try {
            if (selectedSkill) {
                await updateSkill({ _id: selectedSkill, ...data }).unwrap()
                toast.success("Skill Updated Successfully")
                reset({ skillName: "", category: "frontend", level: "" })
                setSelectedSkill(null)
                setOpen(false);
            } else {
                await addSkill(data).unwrap();
                toast.success("Skill Added Successfully")
                reset();
                setOpen(false)
            }
        } catch (err) {
            console.log(err);
            toast.error("Unable to add or update skill")
        }
    };

    const handleDeleteSkill = async (data: DELETE_SKILLS_REQUEST) => {
        try {
            await deleteSkill(data).unwrap()
            toast.success("Skill Deleted Successfully")
        } catch (error) {
            console.log(error)
            toast.error("Skill Deleted Successfully")
        }
    }

    useEffect(() => {
        const err = error || updateError

        if (err && "data" in err) {
            let errData = err.data as any
            toast.error(errData?.message || "Something went wrong")
        }
    }, [error, updateError])

    return (
        <div className="p-6 min-h-screen bg-gray-50">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold text-gray-700">Skills</h1>

                <Button
                    onClick={() => setOpen(true)}
                    className="bg-[#145EFB] hover:bg-blue-700 text-white py-5 px-5 cursor-pointer">
                    + Add Skill
                </Button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white shadow-md rounded-xl border">
                <table className="min-w-full text-base text-gray-600">

                    {/* Table Head */}
                    <thead className="bg-[#145EFB] text-white text-lg">
                        <tr>
                            <th className="px-3 py-3 text-center font-semibold">Skill</th>
                            <th className="px-3 py-3 text-center font-semibold">Category</th>
                            <th className="px-3 py-3 text-center font-semibold">Level</th>
                            <th className="px-3 py-3 text-center font-semibold">Order</th>
                            <th className="px-3 py-3 text-center font-semibold">Actions</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {allSkills?.map((item) => (
                            <tr
                                key={item._id}
                                className="border-t hover:bg-gray-50 transition"
                            >
                                <td className="px-3 py-4 text-center font-medium text-gray-800">
                                    {item.skillName}
                                </td>

                                <td className="px-3 py-4 text-center">
                                    {item.category}
                                </td>

                                <td className="px-3 py-4 text-center">
                                    <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-600">
                                        {item.level}
                                    </span>
                                </td>

                                <td className="px-3 py-4 text-center">
                                    {item.order}
                                </td>

                                {/* Actions */}
                                <td className="px-3 py-4">
                                    <div className="flex justify-center items-center gap-3">

                                        <Button
                                            onClick={() => {
                                                setSelectedSkill(item._id as string);
                                                reset(item)
                                                setOpen(true)
                                            }}
                                            variant="ghost"
                                            size="icon"
                                            className="hover:bg-blue-100 cursor-pointer"
                                        >
                                            <Pencil className="w-4 h-4 text-blue-600" />
                                        </Button>


                                        <Button
                                            onClick={() => handleDeleteSkill({ _id: item._id as string })}
                                            variant="ghost"
                                            size="icon"
                                            className="hover:bg-red-100 cursor-pointer"
                                        >
                                            <Trash2 className="w-4 h-4 text-red-600" />
                                        </Button>

                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Skill */}
            <Dialog
                open={open}
                onOpenChange={(val) => {
                    setOpen(val)

                    if (!val) {
                        reset({
                            skillName: "",
                            category: "frontend",
                            level: "",
                        })
                        setSelectedSkill(null)
                    }
                }}
            >
                <DialogContent className="sm:max-w-md" onOpenAutoFocus={(e) => e.preventDefault()}>
                    <DialogHeader>
                        <DialogTitle>
                            {
                                selectedSkill
                                    ? "Update Skill"
                                    : "Add Skill"
                            }

                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(handleSkill)} className="flex flex-col gap-4 mt-4">
                        <Input
                            {...register("skillName")}
                            type="text"
                            placeholder="Skill Name"
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
                                            <SelectItem value="frontend">Frontend</SelectItem>
                                            <SelectItem value="backend">Backend</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />

                        <Input
                            {...register("level")}
                            type="text"
                            placeholder="Level"
                            className="border p-2 rounded-md"
                        />

                        {
                            selectedSkill
                                ? <Button type="submit" className="bg-yellow-500 hover:bg-yellow-400 text-white cursor-pointer">
                                    Update Skill
                                </Button>
                                : <Button type="submit" className="bg-[#145EFB] text-white cursor-pointer">
                                    Add Skill
                                </Button>
                        }
                    </form>
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default Skills;