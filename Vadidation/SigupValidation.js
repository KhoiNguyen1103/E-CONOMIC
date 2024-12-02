function Validation(values) {
    let error = {};

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const password_pattern =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    // Regex chỉ cho phép chữ cái và dấu cách
    const name_pattern = /^[A-Za-z]+$/;

if (values.name === "") {
    error.name = "Name should not be empty";
} else if (!name_pattern.test(values.name)) {
    error.name = "Name can only contain letters and no spaces";
} else {
    error.name = "";
}


    if (values.email === "") {
        error.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
        error.email = "Email Didn't match";
    } else {
        error.email = "";
    }

    if (values.password === "") {
        error.password = "Password should not be empty";
    } else if (!password_pattern.test(values.password)) {
        error.password = "Password Didn't match";
    } else {
        error.password = "";
    }

    return error;
}
export default Validation;
