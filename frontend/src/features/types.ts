/* userSlice.ts */
export interface LOGIN_USER {
    id: number;
    username: string;
}

export interface CRED {
    username: string;
    password: string;
}

export interface JWT {
    refresh: string;
    access: string;
}

export interface USER {
    id: number;
    username: string;
}

export interface AUTH_STATE {
    isLoginView: boolean;
    loginUser: LOGIN_USER;
}

/* taskSlice.ts */
export interface READ_TASK {
    id: number;
    title: string;
    description: string;
    criteria: string;
    status: string;
    status_name: string;
    category: number;
    category_name: string;
    estimate: number;
    responsible: number;
    responsible_username: string;
    owner: number;
    owner_username: string;
    created_at: string;
    updated_at: string;
}
export interface POST_TASK {
    id: number;
    title: string;
    description: string;
    criteria: string;
    status: string;
    category: number;
    estimate: number;
    responsible: number;
}
export interface CATEGORY {
    id: number;
    item: string;
}
export interface TASK_STATE {
    tasks: READ_TASK[];
    editedTask: POST_TASK;
    selectedTask: READ_TASK;
    users: USER[];
    category: CATEGORY[];
}

/*TaskList.tsx*/

export interface SORT_STATE {
    rows: READ_TASK[];
    order: "desc" | "asc";
    activeKey: string;
}