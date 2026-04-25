import User from "../models/user.model.js";

class UserRepository {
    async create(name) {
        await User.create({
            name: name,
        });
    };
}
const userRepository = new UserRepository()
export default userRepository;
