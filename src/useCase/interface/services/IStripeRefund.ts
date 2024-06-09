import { IResponse } from "./Iresponse";

interface IStripeRefund {
    StripeService(amount: number,email: string,userId: string):Promise<IResponse>
}

export default IStripeRefund;