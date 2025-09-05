export type Post = {
    _id: string
    title?: string,
    content?: string,
    tag?: string[],
    post_author: string,
    visibility: string,
    likes: string,
}