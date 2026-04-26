import User from "../models/user.model.js"

class UserRepository {

    async create(username, email, password) {
        await User.create({
            name: username,
            email: email,
            password: password
        })
    }

    async daleteById(user_id) {
        await User.findByIdAndDelete(user_id)
    }

    async getById(user_id) {
        return await User.findById(user_id)
    }

    async  updateById(new_user_props) {
        const new_user = await User.findByIdAndUpdate(
            new_user_props.id, 
            new_user_props, 
            { new: true } //Esto hará que devuelva el objeto actualizado
        )
        return new_user
    }

    async getByEmail(email) {
        const user = await User.findOne({email: email})
        return user
    }

    // Llama a algun usuario de la DB
    async getUsers(){
        const user = await User.findOne()
        return user
    }
}


const userRepository = new UserRepository()
export default userRepository
