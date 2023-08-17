import { axiosClient } from "@/services/axiosClient";
import { toast } from "react-toastify";

export async function getData(url, token) {
  try {
    const response = await axiosClient.get(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(getFirstErrorFromErrorResponse(error));
    throw error;
  }
}

export async function postData(url, body, token) {
  try {
    const response = await axiosClient.post(url, body, {
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    });
    return response.data.data;
  } catch (error) {
    toast.error(getFirstErrorFromErrorResponse(error));
    throw error;
  }
}

export async function patchData(url, body, token) {
  try {
    const response = await axiosClient.patch(url, body, {
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    });
    return response.data.data;
  } catch (error) {
    toast.error(getFirstErrorFromErrorResponse(error));
    throw error;
  }
}

export async function deleteData(url, token) {
  try {
    await axiosClient.delete(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    });
  } catch (error) {
    toast.error(getFirstErrorFromErrorResponse(error));
    throw error;
  }
}

function getFirstErrorFromErrorResponse(errorResponse) {
  const allErrors = errorResponse.response.data.errors;
  return allErrors[Object.keys(allErrors)[0]][0];
}
