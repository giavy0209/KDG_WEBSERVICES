const listLanguage = {
    vi: 'Việt Nam',
    en: 'English',
};

const LoginPageLanguage = {
    vi: {
        title: 'Đăng nhập',
        error101: 'Email đã tồn tại',
        error102: 'Sai tên đăng nhập hoặc mật khẩu',
        desc1: 'Bạn chưa có tài khoản?',
        desc2: 'Đăng ký',
        error_email: 'Email không đúng định dạng',
        password: 'Mật khẩu',
        error_password: 'Mật khẩu phải ít nhất 8 ký tự cả chữ và số',
        forgot_password: 'Quên mật khẩu?',
    },
    en: {
        title: 'Login',
        error101: 'Email existed',
        error102: 'Incorrect email or password',
        desc1: 'Have not account yet?',
        desc2: 'Register now',
        error_email: 'Email is not valid',
        password: 'Password',
        error_password: 'At least 8 digits, include word and number',
        forgot_password: 'Forgot password?',
    },
};

export const initialState = {
    language: 'vi',
    listLanguage,
    LoginPageLanguage,
};

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

export const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_LANGUAGE:
            return {
                ...state,
                language: action.payload,
            };
        default:
            return state;
    }
};
