import { User } from "./User";

export interface Comment {
    id: number,
    body: string,
    postId: number,
    username: string
}