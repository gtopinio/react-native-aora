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
}

export type { 
    Post,
    Creator
};
