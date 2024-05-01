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

   async sendMessageToEmail(email: string, name: string, status: string): Promise<string> {
      try {
        console.log(email,name);
        const transporter = nodemailer.createTransport({
          host:"smtp.gmail.com",
          port:587,
          secure:false,
          requireTLS:false,
          auth:{
            user:process.env.EMAIL_ID,
            pass:process.env.PASSWORD
          }
        });

        const acceptMailOption = {
          from: "testingjobee007@gmail.com",
          to: email,
          subject: "Response For Your Worker Join Request",
          html: `
          <body style="font-family: Mulish, sans-serif; background-color: white; color:white; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color:  #241F20; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <div style="text-align: center; margin-bottom: 20px;">
               <h1>Fit<span style="color:#3BE48B">Call</span><h2>
              <h2>Application<span style="color:#3BE48B"> Accepted</span></h1>
            </div>
            <div style="margin-bottom: 20px;">
              <p>Dear ${name},</p>
              <p>Congratulations! Your application to join FitCall has been accepted.</p>
              <p>We're excited to have you join FitCall! Your selection is based on your expertise and experience, making you a valuable addition to our team. With your skills, we're confident in our ability to provide top-notch fitness services to our users.
              </p>
              <p>Your adventure with FitCall begins today! We're eager to collaborate with you and craft exceptional experiences for our users. </p>
              <p> If you have any questions or require assistance, don't hesitate to contact us.</p>
              <p>Welcome to the team!</p>
            </div>
            <div style="text-align: center; color: white; font-size: 14px;">
              <p>Best regards,</p>
              <p>The FitCall Team</p>
            </div>
          </div>
        </body>`,   
        };
        const rejectMailOption = {
          from: "testingjobee007@gmail.com",
        to: email,
        subject: "Response For Your Worker Join Request",
        html: `
        <body style="font-family: Arial, sans-serif; background-color:white; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color:  #241F20; color:white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <div style="text-align: center; margin-bottom: 20px;">
      <h1>Fit<span style="color:#3BE48B">Call</span><h1>
        <h2>Application <span style="color:red">Rejected</span></h2>
    </div>
    <div style="margin-bottom: 20px;">
      <p>Dear ${name},</p>
      <p>We regret to inform you that your application for joining FitCall has been rejected.</p>
      <p>After careful consideration, we have determined that your profile does not meet our current requirements. We appreciate your interest in joining our platform and encourage you to continue enhancing your skills and experience.</p>
      <p>If you have any questions or would like more information about our decision, please feel free to contact us at admin@fitcall.com.</p>
      <p>Thank you for your understanding.</p>
    </div>
    <div style="text-align: center; color: white; font-size: 14px;">
      <p>Best regards,</p>
      <p>The FitCall Team</p>
    </div>
  </div>
</body>
`,
        };

        if(status === "accepted"){
          await transporter.sendMail(acceptMailOption);
        }else {
          await transporter.sendMail(rejectMailOption);
        }
        return "Success";
      } catch (error) {
        throw new Error(`Unable to send email to ${email}:${error}`)
      }
  }

}

export default Nodemailer;
