"use client";

import React, { useEffect, useState } from "react";
import { Menu, X, BookOpen, Briefcase, Folder, Grid, User, GraduationCap } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import { useSignOutMutation } from "@/redux/apis/auth.api";
import { toast } from "sonner";

const Sidebar = ({ children }: { children: React.ReactNode }) => {

    const { admin } = useAppSelector(state => state.auth)
    const [logout, { isSuccess }] = useSignOutMutation()
    const [open, setOpen] = useState(true);
    const pathname = usePathname();

    const { push } = useRouter()

    const menuItems = [
        { id: 1, label: "Dashboard", path: "/admin", icon: Grid },
        { id: 2, label: "Skills", path: "/admin/skills", icon: BookOpen },
        { id: 3, label: "Projects", path: "/admin/projects", icon: Folder },
        { id: 4, label: "Experience", path: "/admin/experience", icon: Briefcase },
        { id: 5, label: "About", path: "/admin/about", icon: User },
        { id: 6, label: "Education", path: "/admin/education", icon: GraduationCap },
    ];

    const getPageTitle = () => {
        const current = menuItems.find(item => {
            if (item.path === "/admin") return pathname === "/admin";
            return pathname?.startsWith(item.path);
        });

        return current ? current.label : "Dashboard";
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Admin Logout Successfully");
            push("/login")
        }
    }, [isSuccess, push]);


    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside
                className={`
          fixed top-0 left-0 h-screen bg-blue-600 text-white z-40
          transition-all duration-300
          sm:w-20
          ${open ? "lg:w-64" : "lg:w-20"}
          hidden sm:flex flex-col
        `}
            >
                <div className="flex items-center justify-center lg:justify-start gap-3 p-4 border-b border-blue-500">
                    {open && (
                        <div className="hidden lg:block">
                            <h1 className="text-lg font-semibold">
                                {admin?.name || "No Name"}
                            </h1>
                        </div>
                    )}
                </div>

                <nav className="px-2 my-5 space-y-2 overflow-y-auto scrollbar-hide flex-1">
                    {menuItems.map((item, i) => {
                        const Icon = item.icon;
                        const active = item.path === "/admin"
                            ? pathname === "/admin"
                            : pathname?.startsWith(item.path); return (
                                <Link
                                    key={i}
                                    href={item.path}
                                    className={`
                  flex items-center gap-3 p-3 rounded-lg transition
                  ${active ? "bg-blue-700" : "hover:bg-blue-500"}
                  justify-center
                  lg:justify-start
                `}
                                >
                                    <Icon size={22} />
                                    {open && <span className="hidden lg:inline">{item.label}</span>}
                                </Link>
                            );
                    })}
                </nav>
            </aside>

            <main
                className={`
          flex-1 transition-all duration-300
          sm:ml-20
          ${open ? "lg:ml-64" : "lg:ml-20"}
        `}
            >
                <header className="p-4 bg-white shadow flex items-center justify-between sticky top-0 z-50">
                    <div className="flex items-center gap-3">
                        <div className="hidden lg:block">
                            {open ? (
                                <X size={28} className="cursor-pointer" onClick={() => setOpen(false)} />
                            ) : (
                                <Menu size={28} className="cursor-pointer" onClick={() => setOpen(true)} />
                            )}
                        </div>
                        <h2 className="text-lg font-semibold">{getPageTitle()}</h2>
                    </div>

                    <button
                        onClick={() => logout()}
                        className="border border-red-700 text-red-600 cursor-pointer px-4 py-2 rounded-md hover:bg-red-600 hover:text-white transition"
                    >
                        Logout
                    </button>
                </header>

                <div className="p-6 flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Sidebar;