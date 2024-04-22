interface INodemailer {
  verifyEmail(otp: string, email: string): unknown;
  generateOTP(email: string): string;
  sendEmailVerification(email: string, username: string): Promise<string>;
}

export default INodemailer;