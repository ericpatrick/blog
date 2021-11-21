import { PostEntity } from './../database/entities/post.entity';
import { getConnection, MoreThanOrEqual } from "typeorm";
import { PostRepository } from "../repository/post.repositoy"

export class PostService {
    private postRepository: PostRepository;

    constructor() {
        this.postRepository = getConnection("blog").getCustomRepository(PostRepository);
    }

    public async index() {
        const posts = await this.postRepository.find();
        return posts;
    }

    public async findMoreThanLikes(value: number) {
        const posts = await this.postRepository.find({likes: MoreThanOrEqual(value)});

        return posts;
    }

    public async addLike(id: number) {
        const incrementedPost =- await this.postRepository.increment({id}, "likes", 1);

        return incrementedPost;
    }

    public async create(post: PostEntity) {
        const newPost = await this.postRepository.save(post);
        return newPost;
    }

    public async update(post: PostEntity, id: number) {
        const updatedPost = await this.postRepository.update(id, post);
        return updatedPost;
    }

    public async delete(id: number) {
        const deletedPost = await this.postRepository.delete(id);
        return deletedPost;
    }
}