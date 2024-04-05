import toast from "react-hot-toast";
const specialCharacters = "!@#$%^&*()_+-=[]{}|;:',.<>?";

export function company_name_validation(cName: string) {
  if (cName.length === 0) {
    toast.error("Company name can't be empty!", { duration: 4000 });
    return false;
  }
  if (cName.charAt(0) !== cName.charAt(0).toUpperCase()) {
    toast.error("Company name's first letter should be in capital!", {
      duration: 4000,
    });
    return false;
  }
  if (cName.includes(" ")) {
    toast.error("Company name should not contain spaces!", { duration: 4000 });
    return false;
  }
  for (let i = 0; i < cName.length; i += 1)
    if (specialCharacters.includes(cName.charAt(i))) {
      toast.error("Company name should not contain any special characters!", {
        duration: 4000,
      });
      return false;
    }
  return true;
}

export function phone_number_validation(pNum: string) {
  if (pNum.length === 0) {
    toast.error("Phone number can't be empty!", { duration: 4000 });
    return false;
  }
  if (pNum.length >= 10) {
    toast.error("Phone number should be less than 10 digits long!", {
      duration: 4000,
    });
    return false;
  }
  let phone_num = parseInt(pNum).toString();
  if (phone_num !== pNum) {
    toast.error("Invalid phone number!", { duration: 4000 });
    return false;
  }
  return true;
}

export function email_validation(email: string) {
  if (email.length === 0) {
    toast.error("Email address can't be empty!", { duration: 4000 });
    return false;
  }
  var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!regex.test(email)) {
    toast.error("Invalid email!", { duration: 4000 });
    return false;
  }
  return true;
}
