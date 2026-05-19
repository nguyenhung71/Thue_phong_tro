import axiosConfig from "../axiosConfig";

export const apiGetCategoryPosts = (category) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/v1/posts/${category}`,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
