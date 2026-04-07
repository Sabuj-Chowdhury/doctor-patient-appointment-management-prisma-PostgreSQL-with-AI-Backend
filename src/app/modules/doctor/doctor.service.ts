import { IOptions, paginationHelper } from "../../utils/pagination_helper";

const getAllDoctorFromDB = async (options: IOptions, filter: any) => {
  const { page, limit, skip, sort, order } = paginationHelper(options);

  const { search, ...filterData } = filter;
};

export const DoctorServices = {
  getAllDoctorFromDB,
};
