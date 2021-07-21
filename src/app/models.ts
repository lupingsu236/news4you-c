export interface News {
    title: string,
    comments: string,
    image: string, 
    timestamp?: Date, 
    createdby?: string
}

export interface User {
    username: string, 
    password?: string, 
    token?: string
}