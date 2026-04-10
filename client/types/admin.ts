export type COMMON_RESPONSE = {
    message: string,
}

export type SKILLS = {
    _id?: string,
    skillName: string,
    category: "frontend" | "backend",
    level: string,
    order?: number
}

export type ADD_SKILLS_REQUEST = Omit<SKILLS, "_id" | "order">

export type GET_SKILLS_RESPONSE = {
    message: string,
    frontend: SKILLS[],
    backend: SKILLS[],
}

export type UPDATE_SKILLS_REQUEST = {
    _id: string
} & Partial<{
    skillName: string,
    category: "frontend" | "backend",
    level: string,
}>

export type DELETE_SKILLS_REQUEST = {
    _id: string
}


export type EXPERIENCE = {
    _id?: string,
    role: string,
    company: string,
    startDate: Date,
    endDate?: Date,
    description?: string,
    responsibilities: string[],
    order?: number
}

export type ADD_EXPERIENCE_REQUEST = {
    _id?: string,
    role: string,
    company: string,
    startDate: Date,
    endDate?: Date,
    description?: string,
    responsibilities: string,
    order?: number
}

export type GET_EXPERIENCE_RESPONSE = {
    message: string,
    result: EXPERIENCE[]
}

export type UPDATE_EXPERIENCE_REQUEST = {
    _id: string
} & Partial<{
    role: string,
    company: string,
    startDate: Date,
    endDate?: Date,
    description?: string,
    responsibilities: string
}>

export type DELETE_EXPERIENCE_REQUEST = {
    _id: string
}


export type PROJECT = {
    _id: string,
    title: string,
    description: string,
    category: "web" | "mobile",
    technologies: string[],
    imageURL?: string,
    liveURL?: string,
    gitHubURL?: string
}

export type ADD_PROJECT_REQUEST = {
    title: string,
    description: string,
    category: "web" | "mobile",
    technologies: string,
    imageURL?: string,
    liveURL?: string,
    gitHubURL?: string
}

export type GET_PROJECT_RESPONSE = {
    message: string,
    result: PROJECT[]
}

export type UPDATE_PROJECT_REQUEST = {
    _id: string
} & Partial<{
    title: string
    description: string
    category: "web" | "mobile"
    technologies: string
    imageURL?: string
    liveURL?: string
    gitHubURL?: string
}>

export type DELETE_PROJECT_REQUEST = {
    _id: string
}


export type ABOUT = {
    _id: string,
    name: string,
    title: string,
    introduction: string,
    journey?: string,
    currentWork?: string,
    dob?: string,
    location: string,
    email: string,
    phone: string,
    languages?: string[],
    profileImage?: string
}

export type READ_ABOUT_INFO_RESPONSE = {
    message: string,
    result: ABOUT | null
}

export type ADD_ABOUT_REQUEST = {
    name: string,
    title: string,
    introduction: string,
    journey?: string,
    currentWork?: string,
    dob?: string,
    location: string,
    email: string,
    phone: string,
    languages?: string,
    profileImage?: string
}

export type UPDATE_ABOUT_REQUEST = {
    _id: string
} & Partial<{
    name: string,
    title: string,
    introduction: string,
    journey?: string,
    currentWork?: string,
    dob?: string,
    location: string,
    email: string,
    phone: string,
    languages?: string,
    profileImage?: string
}>


export type DELETE_ABOUT_REQUEST = {
    _id: string
}



export type EDUCATION = {
    _id: string
    degree: string
    college: string
    field: string
    startYear: string
    endYear: string
}

export type ADD_EDUCATION_REQUEST = Omit<EDUCATION, "_id">

export type GET_EDUCATION_RESPONSE = {
    message: string,
    result: EDUCATION[]
}

export type UPDATE_EDUCATION_REQUEST = {
    _id: string
} & Partial<{
    degree: string
    college: string
    field: string
    startYear: string
    endYear: string
}>

export type DELETE_EDUCATION_REQUEST = {
    _id: string
}


export type GET_DASHBOARD_STATS_RESPONSE = {
    message: string,
    result: {
        projectCount: number
        experienceCount: number
        skillsCount: number
    }
}