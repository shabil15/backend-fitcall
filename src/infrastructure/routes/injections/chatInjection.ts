import {ChatAdapter}  from '../../../adapter/chatAdapter';
import {ChatUseCase}  from '../../../useCase/usecases/chatUseCase';
import ConversationModel from '../../database/model/conversation';
import MessageModel from '../../database/model/message';
import {ChatRepository}  from '../../database/repository/chatRepository';
import RequestValidator from '../../services/validateRepository';

const chatRepository = new ChatRepository(ConversationModel,MessageModel);
const requestValidator = new RequestValidator();
const chatusecase = new ChatUseCase(chatRepository,requestValidator);
const chatAdapter = new ChatAdapter(chatusecase);

export {chatAdapter};
