interface Creator {
    $id: string;
    username: string;
    avatar: string;
}

interface Post {
    $id: string;
    title: string;
    thumbnail: string;
    prompt: string;
    video: string;
    creator: Creator;
    liked: string[];
}

interface PostForm {
    title: string, 
    prompt: string, 
    video: any, 
    thumbnail: any,
}

export type { 
    Post,
    Creator,
    PostForm
};
