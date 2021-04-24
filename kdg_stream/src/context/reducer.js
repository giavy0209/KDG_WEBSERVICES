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
    copied: 'Đã sao chép địa chỉ',
    deposit: 'Nạp KDG',
    scan_here: 'Scan tại đây để nạp',
    or_copy: 'Hoặc sao chép địa chỉ tại đây',
    search: 'Tìm kiếm',
    notification: 'Thông báo',
    notihere: 'Thông báo của bạn ở đây',
    notidesc1: 'Đăng ký kênh yêu thích của bạn để nhận thông báo về video mới nhất của họ',
    followers: 'người theo dõi',
    personalinfo: 'Thông tin cá nhân',
    assetmanagement: 'Quản lí tài sản',
    logout: 'Đăng xuất',
    login: 'Đăng nhập',
    upload: 'Tải lên',
    setup: '• Live Now',
    noti101: 'data1 đã theo dõi bạn',
    noti102: 'data1 đã bình luận trong video: data2',
    noti103: 'Video data1 đã tải lên thành công',
    noti104: 'data1 đã đăng video mới: data2',
    noti105: 'data1 đang phát trực tiếp',
  },
  en: {
    copied: 'Copied address',
    deposit: 'Deposit KDG',
    scan_here: 'Scan here to deposit',
    or_copy: 'Or copy the address here',
    search: 'Search',
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
    setup: '• Live Now',
    noti101: 'data1 followed you',
    noti102: 'data1 commented on your video: data2',
    noti103: 'Video data1 uploaded',
    noti104: 'data1 uploaded new video: data2',
    noti105: 'data1 is streaming',
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
    ranking: 'Bảng xếp hạng',
    following: 'Đang theo dõi',
    watchLive: 'Xem trực tiếp',
    recommend: 'Được đề xuất',
    KDG: 'KDG',
    followers: 'người theo dõi',
    views: 'lượt xem',
  },
  en: {
    ranking: 'Ranking',
    following: 'Following',
    watchLive: 'Watch Live',
    recommend: 'Recommend',
    KDG: 'KDG',
    followers: 'followers',
    views: 'views',
  },
};

const profile = {
  vi: {
    edit: 'Chỉnh sửa',
    follow: 'Theo dõi',
    unfollow: 'Bỏ theo dõi',
    followers: 'Người theo dõi',
    following: 'Đang theo dõi',
    total_view: 'Tổng lượt xem',
    personal: 'Cá nhân',
    manage: 'Quản lí tài sản',
    topDonate: 'Đóng góp nhiều nhất',
    views: 'lượt xem',
    playlist: 'Danh sách phát',
    type: 'Loại',
    date: 'Ngày',
    amount: 'Số lượng',
    note: 'Ghi chú',
    type7: 'Tặng gift_name cho user_name',
    type8: 'Bán gift_name',
    type9: 'Donate cho user_name',
    type10: 'Nhận donate từ user_name',
    quantity: 'Số lượng',
    gift: 'Loại quà',
    action: 'Hành động',
    choose_img: 'Chọn hình',
    upload_img: 'Tải hình lên',
    change_avatar: 'Đổi Ảnh Đại Diện',
    change_cover: 'Đổi Ảnh Bìa',
    title: 'Tiêu đề',
    desc: 'Mô tả',
    tags: 'Thẻ',
  },
  en: {
    edit: 'Edit',
    follow: 'Follow',
    unfollow: 'Unfollow',
    followers: 'Followers',
    following: 'Following',
    total_view: 'Total views',
    personal: 'Personal',
    manage: 'Asset Management',
    topDonate: 'Top Donate',
    views: 'views',
    playlist: 'Playlist',
    type: 'Type',
    date: 'Date',
    amount: 'Amount',
    note: 'Note',
    type7: 'Send gift_name to user_name',
    type8: 'Sell gift_name',
    type9: 'Donate user_name',
    type10: 'Receive donate from user_name',
    quantity: 'Quantity',
    gift: 'Gift',
    action: 'Action',
    choose_img: 'Choose image',
    upload_img: 'Upload image',
    change_avatar: 'Change Avatar',
    change_cover: 'Change Cover',
    title: 'Title',
    desc: 'Description',
    tags: 'Tags',
  },
};

const upload = {
  vi: {
    upload: 'Tải lên',
    title: 'Tiêu đề Video',
    desc: 'Mô tả về Video',
    tag: 'Nhập tối đa 3 tag, cách nhau bởi dấu ","',
    uploading: 'Đang tải lên...',
    success: 'Tải lên thành công, chờ xử lý video...',
    error: 'Có lỗi trong quá trình xử lý video, vui lòng thử lại!',
    processing: 'Đang xử lý video...',
    encoding: 'Đang mã hóa video...',
    video99: 'Video có thể phát, xem ngay',
    video100: 'Đã xử lý xong video với chất lượng tốt nhất, xem ngay',
  },
  en: {
    upload: 'Upload',
    title: 'Title for Video',
    desc: 'Description about this Video',
    tag: 'Enter up to 3 tags, separated by ","',
    uploading: 'Uploading Video...',
    success: 'Upload successfully, wait for the video to be processed...',
    error: 'There was an error processing the video, please try again!',
    processing: 'Processing Video...',
    encoding: 'Encoding Video...',
    video99: 'Video can be played, watch now',
    video100: 'Finished video processing with the best quality, watch now',
  },
};

const setup = {
  vi: {
    copied: 'Đã sao chép',
    preview: 'Xem trước',
    connect: 'Kết nối',
    setup: 'Thiết lập',
    connect_title: 'Kết nối các luồng trực tiếp của bạn với API trực tiếp',
    connect_desc1: 'Phần mềm phát trực tiếp của người dùng hoặc phần cứng',
    connect_desc2: 'Nhập thông tin bên dưới vào cài đặt phần mềm của bạn:',
    show: 'Hiện mã',
    hide: 'Ẩn mã',
    reset: 'Tạo lại mã',
    warning:
      'Bất kỳ ai có Stream Key này đều có thể phát trực tiếp trên nền tảng livestream Kingdomgame 4.0 của bạn. Đảm bảo rằng bạn giữ mã Key này an toàn.',
    setup_title: 'Tiêu đề cho livestream',
    setup_desc: 'Mô tả về livestream',
    setup_tag: 'Nhập tối đa 3 tag, cách nhau bởi dấu ","',
    note: 'Lưu ý',
    note1:
      '- Đảm bảo trong quá trình livestream không có hành động, lời nói mang tính chất bạo động, phản cách mạng.',
    note2: '- Không sử dụng hình ảnh nghệ sĩ nổi tiếng khi chưa có sự cho phép.',
    thumb1: 'Vui lòng sử dụng định dạng JPG, JPEG, PNG. Kích thước tệp tối đa = 2MB',
    thumb2: 'Để đảm bảo hình ảnh thu hút người xem, vui lòng sử dụng hình ảnh sắc nét',
    watch: 'Theo dõi livestream của bạn tại đây',
    start: 'Bắt đầu livestream',
    end: 'Kết thúc livestream',
    noti1: 'Hãy kết nối để bắt đầu stream',
    noti2: 'Để kết thúc buổi streaming, bạn hãy ngắt kết nối trước',
    noti3:
      'Stream của bạn đang tạm dừng, bạn hãy kết nối lại để tiếp tục hoặc bấm nút kết thúc để ngừng buổi stream này',
  },
  en: {
    copied: 'Copied',
    preview: 'Preview',
    connect: 'Connect',
    setup: 'Setup',
    connect_title: 'Connect Your Live Streams To The Live API',
    connect_desc1: 'User live streaming software or a hardware',
    connect_desc2: "Enter the information below into your software's setting:",
    show: 'Show code',
    hide: 'Hide code',
    reset: 'Reset code',
    warning:
      'Anyone with this Stream Key can go live on your Kingdomgame 4.0 livestream platform. Make sure you keep this Key safe.',
    setup_title: 'Title for this livestream',
    setup_desc: 'Description about this livestream',
    setup_tag: 'Enter up to 3 tags, separated by ","',
    note: 'Note',
    note1:
      '- Ensure that there are no violent or counter-revolutionary actions and words during the livestream process.',
    note2: "- Do not use famous artist's image without permission.",
    thumb1: 'Please use the format JPG, JPEG, PNG. Maximum file size = 2MB',
    thumb2: 'To make sure images engage viewers, please use sharp images',
    watch: 'Watch your livestream here',
    start: 'Start livestream',
    end: 'End livestream',
    noti1: 'Please connect to start streaming',
    noti2: 'To end the streaming session, disconnect first',
    noti3:
      'Your stream is paused, please reconnect to continue or click the link button to stop this stream',
  },
};

const cropLang = {
  vi: {
    confirm: 'Xác nhận',
    cancel: 'Hủy',
    change_success: 'Thành công',
    change_fail: 'Thất bại. Vui lòng thử lại',
  },
  en: {
    confirm: 'Confirm',
    cancel: 'Cancel',
    change_success: 'Successfully',
    change_fail: 'Fail. Please try again',
  },
};

const live = {
  vi: {
    sent_gift: 'Gửi quà thành công',
    not_enough_money: 'Bạn không đủ tiền',
    chathere: 'Nhập để trò chuyện',
    showchat: 'Hiện trò chuyện',
    hidechat: 'Ẩn trò chuyện',
    sendgift: 'user_name đã gửi gift_name cho streamer',
    balance: 'Số dư',
  },
  en: {
    sent_gift: 'Sent gift successfully',
    not_enough_money: "You don't have enough money",
    showchat: 'Show Chat',
    hidechat: 'Hide Chat',
    sendgift: 'user_name sent gift_name to streamer',
    balance: 'Balance',
  },
};

const convert_date_ago = {
  vi: {
    ago: 'trước',
    later: 'sau',
    second: 'giây',
    seconds: 'giây',
    minute: 'phút',
    minutes: 'phút',
    hour: 'giờ',
    hours: 'giờ',
    day: 'ngày',
    days: 'ngày',
    month: 'tháng',
    months: 'tháng',
    year: 'năm',
    years: 'năm',
  },
  en: {
    ago: 'ago',
    later: 'later',
    second: 'second',
    seconds: 'seconds',
    minute: 'minute',
    minutes: 'minutes',
    hour: 'hour',
    hours: 'hours',
    day: 'day',
    days: 'days',
    month: 'month',
    months: 'months',
    year: 'year',
    years: 'years',
  },
};

const recommend = {
  vi: {
    watchlive: 'Xem trực tiếp',
    recommend: 'Được đề xuất',
    views: 'lượt xem',
    watching: 'đang xem',
  },
  en: {
    watchlive: 'Watch live',
    recommend: 'Recommend',
    views: 'views',
    watching: 'watching',
  },
};

const videoinfo = {
  vi: {
    views: 'lượt xem',
    watching: 'đang xem',
    followers: 'người theo dõi',
    hide: 'Ẩn bớt',
    showmore: 'Hiển thị thêm',
    unfollow: 'BỎ THEO DÕI',
    follow: 'THEO DÕI',
    comment: 'Bình luận',
    loadmore: 'Tải thêm',
    edit: 'Chỉnh sửa',
    delete: 'Xoá',
    title: 'Tiêu đề',
    desc: 'Mô tả',
  },
  en: {
    views: 'views',
    watching: 'watching',
    followers: 'followers',
    hide: 'HIDE',
    showmore: ' SHOW MORE',
    unfollow: 'UNFOLLOW',
    follow: 'FOLLOW',
    comment: 'Comments',
    loadmore: 'Load more',
    edit: 'Edit',
    delete: 'Delete',
    title: 'Title',
    desc: 'Description',
  },
};

export const initialState = {
  language: 'en',
  listLanguage,
  footer,
  login,
  formLogin,
  formRegister,
  formForgot,
  header,
  hooksNumber,
  cover,
  home,
  profile,
  upload,
  setup,
  cropLang,
  live,
  convert_date_ago,
  recommend,
  videoinfo,
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
