import nodemailer from "nodemailer";
import INodemailer from "../../useCase/interface/services/Inodemailer";

class Nodemailer implements INodemailer {
  private otps: Map<string, string> = new Map();
  generateOTP(email: string): string {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
  }

  async sendEmailVerification(email: string, name: string): Promise<string> {
    try {
      console.log(email, name);
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: false,
        auth: {
          user: process.env.EMAIL_ID,
          pass: process.env.PASSWORD,
        },
      });

      const otp = this.generateOTP(email);
      this.otps.set(email, otp);

      const mailOptions = {
        from: "brandreselling@gmail.com",
        to: email,
        subject: "Email Verification for FitCall",
        html: `
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #3BE48B;text-decoration:none;font-weight:600">FitCall</a>
    </div>
    <p style="font-size:1.1em">Hi ${name},</p>
    <p>Thank you for choosing FitCall. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
    <h2 style="background: #3BE48B;margin: 0 auto;width: max-content;padding: 0 10px;color: #000;border-radius: 4px;">${otp}</h2>
    <p style="font-size:0.9em;">Regards,<br />Fitcall</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>FitCall Inc</p>
      <p>Kinfa techno park</p>
      <p>Calicut</p>
    </div>
  </div>
</div>
        `,
      };
      await transporter.sendMail(mailOptions);
      return "Email Sent";
    } catch (error) {
      throw new Error(`Unable to send email verification to ${email}:${error}`);
    }
  }

  async verifyEmail(enteredOTP: string, email: string): Promise<boolean> {
    try {
      const expectedOTP = this.otps.get(email);
      if (expectedOTP === enteredOTP) {
        this.otps.delete(email);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error("Wrong otp");
    }
  }
}

export default Nodemailer;
