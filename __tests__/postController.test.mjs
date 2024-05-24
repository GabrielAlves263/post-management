import { v4 as uuidv4 } from 'uuid';
import PostController from '../src/controllers/PostController.js';
import Post from '../src/models/Post.js';

jest.mock('../src/models/Post');
jest.mock('uuid', () => ({ v4: jest.fn() }))

describe('PostController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAll', () => {
        test('should return all posts with pagination', async () => {
            const mockPosts = [
                { uuid: '1', title: 'Post 1', descripition: 'Description 1', created_at: new Date(), updated_at: new Date(), type: 'type1', image: 'image1' },
                { uuid: '2', title: 'Post 2', descripition: 'Description 2', created_at: new Date(), updated_at: new Date(), type: 'type2', image: 'image2' }
            ];

            Post.getAll.mockImplementation((options, callback) => {
                callback(null, mockPosts);
            });

            Post.getCount.mockImplementation((callback) => {
                callback(null, mockPosts.length);
            });

            const req = { query: { page: 1, limit: 10 } };
            const res = {
                status: jest.fn(() => res),
                send: jest.fn(),
            };

            await PostController.getAll(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
                posts: expect.any(Array),
                pagination: expect.objectContaining({
                    totalItens: expect.any(Number),
                    totalPages: expect.any(Number),
                    currentPage: expect.any(Number),
                    pageSize: expect.any(Number)
                })
            }));
            expect(Post.getAll).toHaveBeenCalled();
            expect(Post.getCount).toHaveBeenCalled();
        });

        test('should return 400 if no posts are found', async () => {
            Post.getAll.mockImplementation((options, callback) => {
                callback(null, []);
            });

            Post.getCount.mockImplementation((callback) => {
                callback(null, 0);
            });

            const req = { query: { page: 1, limit: 10 } };
            const res = {
                status: jest.fn(() => res),
                send: jest.fn(),
            };

            await PostController.getAll(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({ message: "No posts were found" });
            expect(Post.getAll).toHaveBeenCalled();
            expect(Post.getCount).toHaveBeenCalled();
        });
    });

    describe('create', () => {
        test('should create a new post successfully', async () => {
            const mockUUID = '1234-5678-91011';
            uuidv4.mockReturnValue(mockUUID);

            const req = {
                body: {
                    title: 'New Post',
                    description: 'Post Description',
                    type: 'edital'
                },
                file: { path: 'imagePath' },
                user: { email: 'user@example.com' }
            };

            const res = {
                status: jest.fn(() => res),
                send: jest.fn()
            };

            Post.create.mockImplementation((newPost, callback) => {
                callback(null, { id: mockUUID });
            });

            await PostController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Post inserted successfully!',
                post: expect.objectContaining({
                    id: mockUUID,
                    title: 'New Post',
                    description: 'Post Description',
                    type: 'edital',
                    image: 'imagePath',
                    request: expect.any(Object)
                })
            }));
            expect(Post.create).toHaveBeenCalled();
        });

        test('should return 400 if validation fails', async () => {
            const req = {
                body: { title: '', description: 'Post Description', type: 'postType' }
            };

            const res = {
                status: jest.fn(() => res),
                send: jest.fn()
            };

            await PostController.create(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
                error: expect.any(String)
            }));
        });
    })

    describe('getById', () => {
        test('should return the post for a valid id', async () => {
            const mockPost = {
                uuid: '1234-5678-91011',
                title: 'Test Post',
                descripition: 'Description of the test post',
                created_at: new Date(),
                updated_at: new Date(),
                type: 'testType',
                image: 'testImage'
            };

            Post.getById.mockImplementation((options, callback) => {
                callback(null, mockPost);
            });

            const req = { params: { id: '1234-5678-91011' } };
            const res = {
                status: jest.fn(() => res),
                send: jest.fn()
            };

            await PostController.get(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
                post: expect.objectContaining({
                    id: mockPost.uuid,
                    title: mockPost.title,
                    descripition: mockPost.descripition,
                    created_at: mockPost.created_at,
                    updated_at: mockPost.updated_at,
                    type: mockPost.type,
                    image: mockPost.image,
                    request: expect.any(Object)
                })
            }));
            expect(Post.getById).toHaveBeenCalled();
        });

        test('should return 404 if no post is found for the id', async () => {
            Post.getById.mockImplementation((options, callback) => {
                callback(null, null);
            });

            const req = { params: { id: '1234-5678-91011' } };
            const res = {
                status: jest.fn(() => res),
                send: jest.fn()
            };

            await PostController.get(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({ message: `No post was found` });
            expect(Post.getById).toHaveBeenCalled();
        });
    });

    describe('update', () => {
        test('should update a post successfully', async () => {
            Post.update.mockImplementation((id, updatePost, callback) => {
                callback(null, { affectedRows: 1 });
            });

            const req = {
                params: { id: '1234-5678-91011' },
                body: { title: 'Updated Post', description: 'Updated Description', type: 'edital' },
                file: { path: 'updatedImage' },
                user: { email: 'user@example.com' }
            };

            const res = {
                status: jest.fn(() => res),
                send: jest.fn()
            };

            await PostController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Post updated successfully!',
                post: expect.objectContaining({
                    request: expect.objectContaining({
                        type: 'GET',
                        descripition: 'Get a post by id',
                        url: `http://localhost:3000/posts/${req.params.id}`
                    })
                })
            }));
            expect(Post.update).toHaveBeenCalledWith(
                req.params.id,
                expect.objectContaining({
                    title: 'Updated Post',
                    description: 'Updated Description',
                    type: 'edital',
                    image: 'updatedImage',
                    updated_by: 'user@example.com'
                }),
                expect.any(Function)
            );
        });

        test('should return 400 if validation fails', async () => {
            const req = {
                params: { id: '1234-5678-91011' },
                body: { title: '', description: 'Updated Description', type: 'updatedType' },
            };

            const res = {
                status: jest.fn(() => res),
                send: jest.fn()
            };

            await PostController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
                error: expect.any(String)
            }));
        });

        test('should return 404 if no post is found with the given id', async () => {
            Post.update.mockImplementation((id, updatePost, callback) => {
                callback(null, { affectedRows: 0 });
            });

            const req = {
                params: { id: '1234-5678-91011' },
                body: { title: 'Updated Post', description: 'Updated Description', type: 'edital' },
                file: { path: 'updatedImage' },
                user: { email: 'user@example.com' }
            };

            const res = {
                status: jest.fn(() => res),
                send: jest.fn()
            };

            await PostController.update(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({ message: `No post with id ${req.params.id} was found` });
            expect(Post.update).toHaveBeenCalled();
        });
    });

    describe('delete', () => {
        test('should delete a post successfully', async () => {
            Post.delete.mockImplementation((id, callback) => {
                callback(null, { affectedRows: 1 });
            });

            const req = {
                params: { id: '1234-5678-91011' }
            };

            const res = {
                status: jest.fn(() => res),
                send: jest.fn()
            };

            await PostController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(202);
            expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Post deleted successfully!',
                request: expect.objectContaining({
                    type: 'POST',
                    descripition: 'Insert new post',
                    url: 'http://localhost:3000/posts',
                    body: expect.objectContaining({
                        title: 'String',
                        descripition: 'String',
                        type: 'String'
                    })
                })
            }));
            expect(Post.delete).toHaveBeenCalled();
        });

        test('should return 404 if no post is found with the given id', async () => {
            Post.delete.mockImplementation((id, callback) => {
                callback(null, { affectedRows: 0 });
            });

            const req = {
                params: { id: '1234-5678-91011' }
            };

            const res = {
                status: jest.fn(() => res),
                send: jest.fn()
            };

            await PostController.delete(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({ message: `No post with id ${req.params.id} was found` });
            expect(Post.delete).toHaveBeenCalled();
        });
    });
});
