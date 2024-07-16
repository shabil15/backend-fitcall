import { getUsers } from "./getUser";
import { IAdminRepository } from "../../interface/repository/IAdminRepository";
export const getAllSubs = async (
    adminRepository: IAdminRepository,
) => {
  try {
    // const users = await adminRepository.getAllUsers();
    // const totalRevenue = users ? users.reduce((acc, user) => {
    //     if (user?.subscriptions && user?.subscriptions?.length > 0) {
    //       return acc + user?.subscriptions.reduce((subAcc, subscription) => {
    //         return subAcc + subscription?.amount;
    //       }, 0);
    //     }
    //     return acc;
    //   }, 0) : 0;

    //   const totalProfit = totalRevenue * 0.10;
    //   const totalUsers = await adminRepository.countUsers();
    //   const totalTrainers =await  adminRepository.countTrainers();

    //   return {
    //     totalRevenue,
    //     totalProfit,
    //     totalUsers,
    //     totalTrainers
    //   };

    return await adminRepository.getAllSubs();

  } catch (error) {
    throw new Error(`Error fetching users: ${error}`);
  }
};
