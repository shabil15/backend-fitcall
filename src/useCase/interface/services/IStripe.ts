import { IResponse } from "./Iresponse";

interface IStripe {
    createPaymentIntent(amount: number,email: string,userId: string):Promise<IResponse>

}

export default IStripe;