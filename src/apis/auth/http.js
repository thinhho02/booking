import { API } from "../../util/configHttp";

// auth login
export const handleToken = async () => {
  try {
    const response = await API.get("/auth/handletoken");
    if (response.status === 200) {
      return response.data;
    }
  } catch (errors) {
    if (errors.response.status === 401) {
      try {
        const responseNewToken = await API.get("/auth/refreshtoken");
        if (responseNewToken.status === 200) {
          localStorage.setItem(
            "accessToken",
            responseNewToken.data.accessToken
          );
          return responseNewToken.data.user;
        }
      } catch (err) {
        const error = new Error();
        error.message = err.response.data.message;
        error.code = err.response.status;
        throw error;
      }
    }
  }
};

export const changePassword = async (password) => {
  try {
    const response = await API.post("/auth/changepassword", password);
    if (response.status === 200) {
      return response.data;
    }
  } catch (errors) {
    const error = new Error();
    error.message = errors.response.data.message;
    error.code = errors.response.status;
    throw error;
  }
};

export const authOtp = async (otp) => {
  try {
    const response = await API.post("/auth/authotp", otp);
    if (response.status === 200) {
      return response.data;
    }
  } catch (errors) {
    const error = new Error();
    error.message = errors.response.data.message;
    error.code = errors.response.status;
    throw error;
  }
};

export const forgetPassword = async (email) => {
  try {
    const response = await API.post("/auth/forgetpassword", email);
    if (response.status === 200) {
      return response.data;
    }
  } catch (errors) {
    const error = new Error();
    error.message = errors.response.data.message;
    error.code = errors.response.status;
    throw error;
  }
};

export const login = async (formData) => {
  try {
    const res = await API.post("/auth/signin", formData);
    return res.data;
  } catch (errors) {
    const error = new Error();
    error.message = errors.response.data.message;
    error.code = errors.response.status;
    throw error;
  }
};

export const signUp = async (formData) => {
  try {
    const res = await API.post("/auth/signup", formData);
    if (res.data?.success) {
      return res.data;
    }
  } catch (errors) {
    // console.log(errors.response.data.message)
    const error = new Error();
    error.message = errors.response.data.message;
    error.code = errors.response.status;
    throw error;
  }
};

export const loginGoogle = async (code) => {
  try {
    // console.log(code)
    const res = await API.post("http://localhost:3000/api/auth/google", code);
    return res;
  } catch (errors) {
    const error = new Error();
    error.message = errors.response.data.message;
    error.code = errors.response.status;
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await API.post("/auth/logout");
    if (response.status === 200) {
      return response.data;
    }
  } catch (errors) {
    const error = new Error();
    error.message = errors.response.data.message;
    error.code = errors.response.status;
    throw error;
  }
};

export const updateProfile = async (profile) => {
  try {
    const response = await API.put("/auth/profile", profile);
    if (response.status === 200) {
      return response.data;
    }
  } catch (errors) {
    const error = new Error();
    error.message = errors.response.data.message;
    error.code = errors.response.status;
    throw error;
  }
};

export const registerBusiness = async (formData) => {
  try {
    const response = await API.post("/auth/registerbusiness", formData);
    if (response.status === 200) {
      return response.data;
    }
  } catch (errors) {
    const error = new Error();
    error.message = errors.response.data.message;
    error.code = errors.response.status;
    throw error;
  }
};

export const getBusiness = async () => {
  try {
    const response = await API.get("/hotel");
    if (response.status === 200) {
      return response.data;
    }
  } catch (errors) {
    const error = new Error();
    error.message = errors.response.data.message;
    error.code = errors.response.status;
    throw error;
  }
};

export const createNewHotel = async (formData) => {
  try {
    const response = await API.post("/hotel/new", formData);
    if (response.status === 200) {
      return response.data;
    }
  } catch (errors) {
    const error = new Error();
    error.message = errors.response.data.message;
    error.code = errors.response.status;
    throw error;
  }
};

export const createNewRoom = async ({ formData, hotelId }) => {
  try {
    console.log(hotelId);
    const response = await API.post(`/hotel/${hotelId}/room/new`, formData);
    if (response.status === 200) {
      return response.data;
    }
  } catch (errors) {
    const error = new Error();
    error.message = errors.response.data.message;
    error.code = errors.response.status;
    throw error;
  }
};

export const getRoomAtHotel = async (id) => {
  try {
    const response = await API.get(`/hotel/${id}/room`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (errors) {
    const error = new Error();
    error.message = errors.response.data.message;
    error.code = errors.response.status;
    throw error;
  }
};

export const getReviewAtHotel = async (id) => {
  try {
    const response = await API.get(`/hotel/${id}/review`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (errors) {
    const error = new Error();
    error.message = errors.response.data.message;
    error.code = errors.response.status;
    throw error;
  }
};

export const getDataHotel = async (search) => {
  try {
    const response = await API.post(`/hotel/searchHotel`, search);
    if (response.status === 200) {
      return response.data;
    }
  } catch (errors) {
    const error = new Error();
    error.message = errors.response.data.message;
    error.code = errors.response.status;
    throw error;
  }
};

export const getIdHotel = async (id) => {
  try {
    const response = await API.get(`/hotel/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (errors) {
    const error = new Error();
    error.message = errors.response.data.message;
    error.code = errors.response.status;
    throw error;
  }
};

export const booking = async (formData) => {
  try {
    const response = await API.post(`/booking/create`, formData);
    if (response.status === 200) {
      return response.data;
    }
  } catch (errors) {
    const error = new Error();
    error.message = errors.response.data.message;
    error.code = errors.response.status;
    throw error;
  }
};
