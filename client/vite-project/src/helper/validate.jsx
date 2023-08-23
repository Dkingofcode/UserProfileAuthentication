import toast from 'react-hot-toast';

/*   validate login   */
export async function usernameValidate(values){
    const errors = usernameVerify({}, values);
     return errors;
}

/* validate password */
export async function passwordValidate(values){
    const errors = passwordVerify({}, values);

    return errors;
}

/* validate reset password  */
export async function resetPassword(values){
    const errors = passwordVerify({}, values);

    if(values.password !== values.confirm_pwd){
        error.password = toast.error("Password not match...!");
    }

    return errors;
}


/* validate password  */
function passwordVerify(errors = {}, values){
    const specialChars = /[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/;
    
    if(!values.password){
        errors.password = toast.error("Password Required...!");
    } else if(values.password.includes(" ")){
        errors.password = toast.error("Wrong Password...!");
    } else if(values.password.length < 4){
        errors.password = toast.error("Password must be more than 4 characters");
    } else if(!specialChars.test(values.password)){
        errors.password = toast.error("password must have special chracters");
    }

    return errors;
}


/*  validate username  */
export function usernameVerify(error = {}, values){
    if(!values.username){
        error.username = toast.error("Username required....!");
    }else if(values.username.includes(" ")){
        error.username = toast.error("Invalid Username")
    }
}