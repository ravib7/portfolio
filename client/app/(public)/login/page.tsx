"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot, } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useEffect, useState } from "react";
import { CheckCircle2, Shield, ArrowLeft, Smartphone, Mail } from "lucide-react";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { OTP } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSendOTPMutation, useVerifyOTPMutation } from "@/redux/apis/auth.api";
import { useRouter } from "next/navigation";

const Page = () => {

    const [toggle, setToggle] = useState<"send" | "verify">("send");
    const [sendOTP, { isLoading: sending }] = useSendOTPMutation()
    const [verifyOTP, { isLoading: verifying }] = useVerifyOTPMutation()

    const { push } = useRouter()

    const loginSchema = z.object({
        otp: z.string().length(6, "OTP must be 6 digits")
    })

    const { reset, handleSubmit, control, formState: { errors, dirtyFields } } = useForm<OTP>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            otp: ""
        }
    })

    const handleSendOTP = async () => {
        try {
            await sendOTP().unwrap()
            toast.success("OTP Send Successfully")
            setToggle("verify")
            reset({ otp: "" })
        } catch (error) {
            console.log(error)
            toast.error("unable to send otp")
        }
    }

    const handleVerifyOTP = async (data: OTP) => {
        try {
            await verifyOTP(data).unwrap()
            toast.success("Admin Login Successfully")
            push("/admin")
            reset({ otp: "" })
        } catch (error) {
            console.log(error)
            toast.error("unable to login otp")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center 
       bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-400">

            {/* Wrapper */}
            <div className="w-full max-w-md mx-4 rounded-2xl overflow-hidden shadow-lg">

                {/* Top Gradient Border */}
                <div className="h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

                {/* Glass Card */}
                <Card className="rounded-t-none bg-white/20 backdrop-blur-xl border border-white/40 shadow-[0_10px_30px_rgba(0,0,0,0.15)]">

                    {/* Header */}
                    <CardHeader className="text-center space-y-3 pt-8 pb-4">
                        <div className="flex justify-center">
                            <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center">
                                <Shield className="w-7 h-7 text-white" />
                            </div>
                        </div>

                        <h1 className="text-2xl font-semibold text-gray-800">
                            Admin Portal
                        </h1>

                        <p className="text-xs text-gray-700 uppercase">
                            Secure Access
                        </p>
                    </CardHeader>

                    {/* Content */}
                    <CardContent className="px-8 pb-8 pt-2 flex flex-col items-center gap-6">

                        {toggle === "send" && (
                            <div className="w-full space-y-6">

                                <div className="text-center space-y-2">
                                    <p className="text-sm text-gray-600">
                                        Get a one-time password
                                    </p>

                                    <div className="flex justify-center gap-3 text-xs">
                                        <span className="flex items-center gap-1 px-2 py-1 bg-white/60 rounded-full text-gray-700">
                                            <Mail className="w-3 h-3" /> Email
                                        </span>
                                        <span className="flex items-center gap-1 px-2 py-1 bg-white/60 rounded-full text-gray-700">
                                            <Smartphone className="w-3 h-3" /> Phone
                                        </span>
                                    </div>
                                </div>

                                <Button
                                    disabled={sending}
                                    onClick={() => handleSendOTP()}
                                    className="w-full h-11 rounded-xl text-white shadow-md 
                                    bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
                                >
                                    {sending ? "Sending..." : "Send OTP"}
                                </Button>
                            </div>
                        )}

                        {toggle === "verify" && (
                            <form onSubmit={handleSubmit(handleVerifyOTP)}>
                                <div className="w-full space-y-6">

                                    <div className="text-center space-y-1">
                                        <p className="text-sm text-gray-600">
                                            Enter verification code
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            Sent to your email/phone
                                        </p>
                                    </div>

                                    <Field className="w-full flex flex-col items-center gap-3">

                                        {/* Center OTP */}
                                        <div className="flex justify-center w-full">

                                            <Controller
                                                name="otp"
                                                control={control}
                                                render={({ field }) => (
                                                    <InputOTP
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        maxLength={6}
                                                        pattern={REGEXP_ONLY_DIGITS}
                                                        className="w-full flex justify-center"
                                                    >
                                                        <InputOTPGroup className="gap-2">
                                                            {Array.from({ length: 6 }).map((_, index) => (
                                                                <InputOTPSlot
                                                                    key={index}
                                                                    index={index}
                                                                    className="w-11 h-11 rounded-md border border-white/50 bg-white/50 text-gray-900 backdrop-blur-sm"
                                                                />
                                                            ))}
                                                        </InputOTPGroup>
                                                    </InputOTP>
                                                )}
                                            />
                                        </div>
                                        <div className="text-center">
                                            {errors.otp && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.otp.message}
                                                </p>
                                            )}
                                        </div>

                                    </Field>

                                    <Button
                                        type="submit"
                                        disabled={verifying}
                                        className="w-full h-11 rounded-xl text-white shadow-md bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4" />
                                            {verifying ? "Verifying..." : "Verify OTP"}
                                        </div>
                                    </Button>

                                    <div className="flex items-center justify-between text-sm">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                reset({ otp: "" })
                                                setToggle("send")
                                            }}
                                            className="flex items-center gap-1 text-gray-500 hover:text-blue-600 cursor-pointer"
                                        >
                                            <ArrowLeft className="w-4 h-4" />
                                            Back
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}

                    </CardContent>

                </Card>
            </div>
        </div >
    );
};

export default Page;