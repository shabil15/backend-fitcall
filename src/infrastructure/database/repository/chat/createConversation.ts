import ConversationModel from "../../model/conversation";

export const createConversation = async (
    senderId:string,
    recieverId:string,
    conversationModel: typeof ConversationModel
): Promise<string> => {
    try {
        const newConversation = await conversationModel.create({
            members:[senderId,recieverId]
        })
        await newConversation.save();
        return "Successfully created a  new conversation";
    } catch (error) {
        throw error
    }
}