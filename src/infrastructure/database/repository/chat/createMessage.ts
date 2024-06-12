import {IMessage} from '../../../../domain/message';
import MessageModel from '../../model/message';

export const createMessage = async (
    newMessage :IMessage,
    messageModel:typeof MessageModel
):Promise<IMessage>=> {
    try{
        const message = await messageModel.create(newMessage);
        await message.save()
        return message;
    }catch(err){
        throw err
    }
}