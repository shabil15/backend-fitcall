import { log } from "console";
import AdminModel from "../../model/adminModel";

export const findAdmin = async (
  email: string,
  adminModel: typeof AdminModel
) => {
  try {
    console.log("Email in findByEmail in AdminRepository === >>> ", email);
    const allAdmins = await adminModel.find();
    console.log(allAdmins, "all admin");

    const existingAdmin = await adminModel.findOne({ email: email });
    console.log(existingAdmin, "is is admin");
    return existingAdmin;
  } catch (error) {
    throw error;
  }
};
