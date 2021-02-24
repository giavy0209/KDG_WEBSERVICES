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

const RegPageLanguage = {
    vi: {
        title: 'Đăng ký',
        not_valid_email: 'Email không đúng định dạng',
        sent_email: 'Đã gửi mã code vào mail của bạn',
        existed_email: 'Email đã tồn tại',
        wait_2_minutes: 'Vui lòng chờ 2 phút',
        register_success: 'Đăng ký thành công',
        wrong_code: 'Mã xác minh email không đúng',
        desc1: 'Đã có tài khoản?',
        desc2: 'Đăng nhập',
        password: 'Mật khẩu',
        error_password: 'Mật khẩu phải ít nhất 8 ký tự cả chữ và số',
        confirm_password: 'Xác nhận mật khẩu',
        password_not_match: 'Mật khẩu không khớp',
        register_code: 'Mã xác minh email',
        not_valid_register_code: 'Mã xác minh email không đúng định dạng',
        get_code: 'Nhận mã',
        referral_code: 'Mã mời (tuỳ chọn)',
        agreement: 'Tôi đồng ý với <a target="_blank" href="/terms-of-service/0">Thỏa thuận người dùng</a> | <a target="_blank" href="/terms-of-service/2">Chính sách bảo mật</a> của KDG.',
    },
    en: {
        title: 'Register',
        not_valid_email: 'Invalid email',
        sent_email: 'Have sent code to your email',
        existed_email: 'Email existed',
        wait_2_minutes: 'Please wait 2 minutes',
        register_success: 'Register success',
        wrong_code: 'Incorrect email verification code',
        desc1: 'Already have an account?',
        desc2: 'Log in',
        password: 'Password',
        error_password: 'At least 8 digits, include word and number',
        confirm_password: 'Confirm password',
        password_not_match: 'Password not match',
        register_code: 'Register code',
        not_valid_register_code: 'Invalid register code',
        get_code: 'Get code',
        referral_code: 'Referral code (optional)',
        agreement: 'I agree with the <a target="_blank" href="/terms-of-service/0">User Agreement</a> | <a target="_blank" href="/terms-of-service/2">Privacy policy</a> of KDG.',
    },
};

const ForgotPageLanguage = {
    vi: {
        title: 'Quên mật khẩu',
        not_valid_email: 'Email không đúng định dạng',
        sent_email: 'Đã gửi mã code vào mail của bạn',
        existed_email: 'Email đã tồn tại',
        not_existed_email: 'Email không tồn tại',
        wait_2_minutes: 'Vui lòng chờ 2 phút',
        reset_password_success: 'Đặt lại mật khẩu thành công',
        wrong_code: 'Mã xác minh email không đúng',
        reset_password: 'Đặt lại mật khẩu',
        desc1: 'Đã nhớ mật khẩu?',
        desc2: 'Đăng nhập',
        code_reset_password: 'Mã đặt lại mật khẩu',
        not_valid_code_reset_password: 'Mã đặt lại mật khẩu không đúng định dạng',
        get_code: 'Nhận mã',
        new_password: 'Mật khẩu mới',
        error_password: 'Mật khẩu phải ít nhất 8 ký tự cả chữ và số',
        confirm_password: 'Xác nhận mật khẩu',
        password_not_match: 'Mật khẩu không khớp',
    },
    en: {
        title: 'Forgot password',
        not_valid_email: 'Invalid email',
        sent_email: 'Have sent code to your email',
        existed_email: 'Email existed',
        not_existed_email: 'Email is not existed',
        wait_2_minutes: 'Please wait 2 minutes',
        reset_password_success: 'Reset password successfully',
        wrong_code: 'Incorrect email verification code',
        reset_password: 'Reset password',
        desc1: 'Remember your password?',
        desc2: 'Log in',
        code_reset_password: 'Reset password code',
        not_valid_code_reset_password: 'Reset password code is not valid',
        get_code: 'Get code',
        new_password: 'New password',
        error_password: 'At least 8 digits, include word and number',
        confirm_password: 'Confirm password',
        password_not_match: 'Password not match',
    },
};

export const initialState = {
    language: 'vi',
    listLanguage,
    LoginPageLanguage,
    RegPageLanguage,
    ForgotPageLanguage,
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
