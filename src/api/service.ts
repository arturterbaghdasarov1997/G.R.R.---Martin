import axios from "axios";

const API_URL = "https://anapioficeandfire.com/api/";

export const getData = async (param: string) => {
  try {
    const response = await axios.get(`${API_URL}${param}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:", error.message);
    } else {
      console.log("Unknown Error:", error);
    }
    throw error;
  }
};

const fetchDetails = async (
  idOrName: string | undefined,
  type: "book" | "character" | "house"
) => {
  try {
    const endpoint = `https://anapioficeandfire.com/api/${type}s`;

    const response = await axios.get(endpoint);

    if (type === "house" && idOrName) {
      const house = response.data.find(
        (item: any) => item.name.toLowerCase() === idOrName.toLowerCase()
      );
      return house || null;
    }

    if (type === "book" && idOrName) {
      const book = response.data.find((item: any) => item.isbn === idOrName);
      return book || null;
    }

    return response.data;
  } catch (error) {
    console.error(`Error fetching ${type} details:`, error);
    return idOrName ? null : [];
  }
};

export default fetchDetails;
