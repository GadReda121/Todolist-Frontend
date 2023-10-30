import toast from "./toast";

const catchError = (e) => {
  if (e.response.status == 404) {
    toast.error("User not found");
  } else if (e.response.status == 401) {
    toast.error("Wrong password");
  }
  else {
    toast.error("Something went wrong");
  }
};

export default catchError;
