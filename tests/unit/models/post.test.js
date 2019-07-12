const { validate } = require("../../../models/post")
describe('validate post model', () => {
    it("should return validate data", () => {
        const post = { title: "new post", description: "decription for new post", imageUrl: "postimage.png", tags: ["tag1", "tag2", "tag3"] }
        const result = validate(post);
        expect(result.error).toBeNull()
    })
})