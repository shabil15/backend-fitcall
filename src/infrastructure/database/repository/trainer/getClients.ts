    import UserModel from "../../model/userModel";

    export const getClients = async (trainerId: string, userModels: typeof UserModel) => {
        try {
            const clients =  await userModels.find({ trainerId:trainerId })
            console.log('clients ',clients)
            return clients;
        } catch (error) {
            throw error
        }
    }