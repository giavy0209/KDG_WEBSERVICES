const listLanguage = {
  vi: 'Việt Nam',
  en: 'English',
};

const footer = {
  vi: {
    copyright: 'Bản quyền © 2021 - kingdomgame.org. Đã đăng ký Bản quyền',
    language: 'Ngôn ngữ',
    social: 'Mạng xã hội',
  },
  en: {
    copyright: 'Copyright © 2021 - kingdomgame.org. All Rights Reserved',
    language: 'Language',
    social: 'Social',
  },
};

const login = {
  vi: {
    desc: 'Đăng nhập hoặc tạo tài khoản',
  },
  en: {
    desc: 'Sign in or create an account',
  },
};

const formLogin = {
  vi: {
    title: 'Đăng nhập',
    subtitle1: 'Người dùng mới?',
    subtitle2: 'Tạo tài khoản',
    email: 'Email',
    errorEmail: 'Email không hợp lệ',
    password: 'Mật khẩu',
    errorPassword:
      'Mật khẩu yêu cầu tối thiểu tám ký tự, ít nhất một chữ cái viết thường, một chữ cái viết hoa, một số và một ký tự đặc biệt',
    login: 'Đăng nhập',
    forgotPassword: 'Quên mật khẩu?',
    message: {
      success: 'Đăng nhập thành công!',
      error: 'Có lỗi xảy ra, vui lòng thử lại!',
      error103: 'Email chưa đăng ký, vui lòng đăng ký!',
      error104: 'Sai mật khẩu, vui lòng nhập lại!',
      error105: 'Tài khoản bị khoá, vui lòng liên hệ admin!',
    },
  },
  en: {
    title: 'Sign in',
    subtitle1: 'New user?',
    subtitle2: 'Create an account',
    email: 'Email',
    errorEmail: 'Invalid Email',
    password: 'Password',
    errorPassword:
      'The password requires a minimum of eight characters, at least one lowercase letter, one uppercase letter, a number and a special character',
    login: 'Sign in',
    forgotPassword: 'Forgot password?',
    message: {
      success: 'Success!',
      error: 'Something went wrong, please try again!',
      error103: 'Unregistered email, please register!',
      error104: 'Wrong password, please re-enter!',
      error105: 'Account is locked, please contact admin!',
    },
  },
};

const formRegister = {
  vi: {
    title: 'Đăng ký',
    subtitle1: 'Đã có tài khoản?',
    subtitle2: 'Đăng nhập',
    email: 'Email',
    errorEmail: 'Email không hợp lệ',
    password: 'Mật khẩu',
    errorPassword:
      'Mật khẩu yêu cầu tối thiểu tám ký tự, ít nhất một chữ cái viết thường, một chữ cái viết hoa, một số và một ký tự đặc biệt',
    confirmPassword: 'Xác nhận mật khẩu',
    errorConfirmPassword: 'Mật khẩu chưa trùng khớp',
    codeRegister: 'Mã đăng ký',
    getCode: 'Lấy mã',
    agree: 'Tôi đồng ý với',
    agree1: 'Điều khoản người dùng',
    agree2: 'Chính sách bảo mật của KDG',
    register: 'Đăng ký',
    submit: {
      success: 'Đăng ký thành công!',
      error: 'Có lỗi xảy ra, vui lòng thử lại!',
      error100: 'Vui lòng lấy mã trước khi đăng ký!',
      error101: 'Mã sai, vui lòng thử lại!',
      error102: 'Email đã được sử dụng, vui lòng nhập email khác!',
    },
    getCodeEvent: {
      success: 'Thành công, vui lòng kiểm tra email!',
      error: 'Có lỗi xảy ra, vui lòng thử lại!',
      error101: 'Email đã được sử dụng, vui lòng nhập email khác!',
      error102: 'Vui lòng chờ 2 phút!',
    },
  },
  en: {
    title: 'Register',
    subtitle1: 'Already have an account?',
    subtitle2: 'Sign in',
    email: 'Email',
    errorEmail: 'Invalid Email',
    password: 'Password',
    errorPassword:
      'The password requires a minimum of eight characters, at least one lowercase letter, one uppercase letter, a number and a special character',
    confirmPassword: 'Confirm Password',
    errorConfirmPassword: 'Password is not match',
    codeRegister: 'Register Code',
    getCode: 'Get Code',
    agree: 'I agree with',
    agree1: 'User Agreement',
    agree2: 'Privacy Policy of KDG',
    register: 'Register',
    submit: {
      success: 'Success!',
      error: 'Something went wrong, please try again!',
      error100: 'Please get code before signing up!',
      error101: 'Wrong code, please try again!',
      error102: 'Email already used, please enter another email!',
    },
    getCodeEvent: {
      success: 'Success, please check your email!',
      error: 'Something went wrong, please try again!',
      error101: 'Email already used, please enter another email!',
      error102: 'Please wait 2 minutes!',
    },
  },
};

const formForgot = {
  vi: {
    title: 'Quên mật khẩu',
    subtitle1: 'Đã có tài khoản?',
    subtitle2: 'Đăng nhập',
    email: 'Email',
    errorEmail: 'Email không hợp lệ',
    password: 'Mật khẩu mới',
    errorPassword:
      'Mật khẩu yêu cầu tối thiểu tám ký tự, ít nhất một chữ cái viết thường, một chữ cái viết hoa, một số và một ký tự đặc biệt',
    confirmPassword: 'Xác nhận mật khẩu mới',
    errorConfirmPassword: 'Mật khẩu chưa trùng khớp',
    codeReset: 'Mã Reset',
    getCode: 'Lấy mã',
    change: 'Đổi',
    submit: {
      success: 'Đổi mật khẩu thành công!',
      error: 'Có lỗi xảy ra, vui lòng thử lại!',
      error100: 'Mã không tồn tại, vui lòng lấy mã!',
      error101: 'Email chưa đăng ký, vui lòng nhập lại!',
      error102: 'Mã sai, vui lòng thử lại!',
    },
    getCodeEvent: {
      success: 'Thành công, vui lòng kiểm tra email!',
      error: 'Có lỗi xảy ra, vui lòng thử lại!',
      error100: 'Vui lòng chờ 2 phút!',
      error101: 'Email chưa đăng ký, vui lòng nhập lại!',
    },
  },
  en: {
    title: 'Forgot password',
    subtitle1: 'Already have an account?',
    subtitle2: 'Sign in',
    email: 'Email',
    errorEmail: 'Invalid Email',
    password: 'New Password',
    errorPassword:
      'The password requires a minimum of eight characters, at least one lowercase letter, one uppercase letter, a number and a special character',
    confirmPassword: 'Confirm New Password',
    errorConfirmPassword: 'Password is not match',
    codeReset: 'Reset Code',
    getCode: 'Get Code',
    change: 'Change',
    submit: {
      success: 'Success!',
      error: 'Something went wrong, please try again!',
      error100: 'Code does not exist, please get code!',
      error101: 'Unregistered email, please re-enter!',
      error102: 'Wrong code, please try again!',
    },
    getCodeEvent: {
      success: 'Success, please check your email!',
      error: 'Something went wrong, please try again!',
      error100: 'Please wait 2 minutes!',
      error101: 'Unregistered email, please re-enter!',
    },
  },
};

const header = {
  vi: {
    search: 'Tìm kiếm',
    buyNB: 'Mua NB',
    youhave: 'Bạn có',
    NBs: 'Ngọc Bội',
    desc1: 'Giá được hiển thị bằng Ngọc Bội, bạn có thể đổi Ngọc Bội từ KDG',
    detail: 'chi tiết tại đây',
    notification: 'Thông báo',
    notihere: 'Thông báo của bạn ở đây',
    notidesc1: 'Đăng ký kênh yêu thích của bạn để nhận thông báo về video mới nhất của họ',
    followers: 'người theo dõi',
    personalinfo: 'Thông tin cá nhân',
    assetmanagement: 'Quản lí tài sản',
    logout: 'Đăng xuất',
    login: 'Đăng nhập',
    upload: 'Tải lên',
    setup: 'Thiết lập',
  },
  en: {
    search: 'Search',
    buyNB: 'Buy JPs',
    youhave: 'You have',
    NBs: 'Jade Pendant',
    desc1: 'Prices are shown in Jade Pendant, you can swap Jade Pendant from KDG',
    detail: 'detail here',
    notification: 'Notifications',
    notihere: 'Your notifications live here',
    notidesc1:
      'Subscribe to your favourite channels to receive notifications about their latest videos.',
    followers: 'followers',
    personalinfo: 'Profile',
    assetmanagement: 'Asset management',
    logout: 'Log out',
    login: 'Sign in',
    upload: 'Upload',
    setup: 'Setup',
  },
};

const hooksNumber = {
  vi: {
    K: ' N',
    M: ' Tr',
    B: ' T',
  },
  en: {
    K: ' K',
    M: ' M',
    B: ' B',
  },
};

const card = {
  vi: {
    donate: 'Ngọc bội',
    follow: 'Theo dõi',
    view: 'Lượt xem',
  },
  en: {
    donate: 'Jade Pendant',
    follow: 'Follow',
    view: 'View',
  },
};

const cover = {
  vi: {
    live: 'Trực tiếp',
  },
  en: {
    live: 'Live',
  },
};

const home = {
  vi: {
    following: 'Đang theo dõi',
    watchLive: 'Xem trực tiếp',
    recommend: 'Được đề xuất',
    ranking: 'Bảng xếp hạng',
    donate: 'Ngọc bội',
    follow: 'Theo dõi',
    view: 'Lượt xem',
  },
  en: {
    following: 'Following',
    watchLive: 'Watch Live',
    recommend: 'Recommend',
    ranking: 'Ranking',
    donate: 'Donate',
    follow: 'Follow',
    view: 'Views',
  },
};

const profile = {
  vi: {
    follower: 'Người theo dõi',
    following: 'Đang theo dõi',
    balance: 'Số dư khả dụng',
    setting: 'Cài đặt',
    follow: 'Theo dõi',
    unfollow: 'Bỏ theo dõi',
    personal: 'Cá nhân',
    manage: 'Quản lí',
    topDonate: 'Đóng góp nhiều nhất',
    view: 'lượt xem',
    playlist: 'Danh sách phát',
  },
  en: {
    follower: 'Follower',
    following: 'Following',
    balance: 'Balance',
    setting: 'Setting',
    follow: 'Follow',
    unfollow: 'Unfollow',
    personal: 'Personal',
    manage: 'Manage',
    topDonate: 'Top Donate',
    view: 'view',
    playlist: 'Playlist',
  },
};

export const initialState = {
  language: 'vi',
  listLanguage,
  footer,
  login,
  formLogin,
  formRegister,
  formForgot,
  header,
  hooksNumber,
  card,
  cover,
  home,
  profile,
};

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

const reducer = (state, action) => {
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

export default reducer;
