const listLanguage = {
    vi: 'VI',
    en: 'EN',
};

const HomePageLanguage = {
    vi: {
        title: 'Ví đa chức năng tiên phong trong lĩnh vực Game Blockchain và lưu trữ tài sản số',
        desc1: 'An toàn',
        desc2: 'Bảo mật cao',
        desc3: 'Thuận tiện',
        sub_title1: 'KHÁM PHÁ TẠI SAO CHÚNG TÔI KHÁC BIỆT',
        sub_desc1_1: 'King Wallet là ví đa chức năng tiên phong trong lĩnh vực Game Blockchain và lưu trữ tài sản số. Người dùng có thể gửi, nhận, hoán đổi hoặc tham gia Staking tiền điện tử của mình thuận tiện và dễ dàng!',
        sub_desc1_2: 'King Wallet đáp ứng tất cả nhu cầu của cộng đồng người dùng Game token cũng như các loại tiền điện tử khác.',
        slide_title1: 'Giao dịch nhanh chóng',
        slide_desc1: 'Được xây dựng bằng công nghệ blockchain giúp tăng tốc độ giao dịch lên hàng trăm giao dịch mỗi giây. Hiệu suất cao này sẽ cho phép người dùng gửi và rút tiền một cách nhanh chóng, mất ít thời gian chờ đợi, thuận tiện và an toàn hơn.',
        slide_title2: 'Ví lưu trữ đa tiền tệ',
        slide_desc2: 'King Wallet được xây dựng để trở thành một ví blockchain có thể mở rộng để hỗ trợ các mã game token và nhiều loại tiền điện tử khác nhau trên thị trường. Tài sản của bạn có thể được truy cập một cách an toàn vào bất cứ lúc nào và bất cứ đâu.',
        slide_title3: 'Bảo mật và giao dịch an toàn',
        slide_desc3: 'King Wallet được trang bị một cơ chế bảo mật nhiều tầng để đảm bảo rằng tất cả các tài sản và giao dịch được thực hiện đều an toàn và ổn định. Người dùng có thể sử dụng sinh trắc học, mã pin, mật khẩu  và Google 2FA để nâng cao bảo mật tài khoản.',
        slide_title4: 'Cảnh báo thời gian thực',
        slide_desc4: 'Người dùng sẽ nhận được thông báo theo thời gian thực mỗi khi tài khoản có sự thay đổi về số dư, thay đổi bảo mật hoặc tin tức quan trọng. Hãy bật tính năng này để cho phép thiết bị của bạn luôn nhận được tin tức quan trọng một cách kịp thời.',
        sub_title2: 'TÍNH NĂNG NỔI BẬT',
        sub_desc2_1: 'Chúng tôi cung cấp cho bạn một dịch vụ ví ưu việt thế hệ tiếp theo phù hợp với nhu cầu của mọi người dùng Game cũng như cộng đồng người dùng tiền điện tử. Với King Wallet, người dùng còn được tận hưởng nhiều tính năng nổi bật như Staking, Token swap hay cổng Game Hub chuyên biệt cho Game thủ và Nhà phát triển.',
        list_title1: 'HỖ TRỢ GAME TOKEN, TRC-20 VÀ ERC-20 TOKEN',
        list_desc1: 'King Wallet sẽ hỗ trợ lưu trữ KDG, các loại Game token trên nền tảng ERC-20 và TRC-20 Token. Các loại mã token khác sẽ được bổ sung trong tương lai để cho phép người dùng đa dạng hóa danh mục lưu trữ và đầu tư của mình.',
        list_title2: 'GAME HUB',
        list_desc2: 'Cổng chuyên biệt về Game ứng cộng công nghệ blockchain và giải pháp thanh toán do Kingdom Game xây dựng và phát triển. GAME HUB cung cấp cho người dùng mảng Game giải trí đa dạng, cung cấp cho các Nhà phát triển một giải pháp chuyên biệt về thanh toán và phát hành sản phẩm. ',
        list_title3: 'THU NHẬP THỤ ĐỘNG',
        list_desc3: 'Ví đầu tiền hỗ trợ Staking Game token và nhiều loại tiền kỹ thuật số khác để nhận lợi tức. King Wallet cho phép người dùng gia tăng giá trị và số lượng với các loại tiền điện tử mà người dùng đang nắm giữ một cách thuận tiện và an toàn.',
        list_title4: 'HOÁN ĐỔI DỄ DÀNG',
        list_desc4: 'King Wallet cung cấp cho bạn phương tiện nhanh chóng và dễ dàng để hoán đổi Game token, Tron token cũng như Ethereum token. Các tính năng mới sẽ được cập nhật liên tục và bổ sung thêm nhiều mã token khác trong tương lai để phục vụ nhu cầu người dùng.',
    },
    en: {
        title: 'Multi-function wallet pioneers in the field of Blockchain Game and Digital Asset Storage',
        desc1: 'Safety',
        desc2: 'High security',
        desc3: 'Facilitation',
        sub_title1: 'DISCOVER WHY WE ARE UNIQUE',
        sub_desc1_1: 'King Wallet is a pioneering multi-function wallet in the field of Blockchain Game and Digital Asset Storage. Users can send, receive, swap or participate in their Crypto Staking conveniently and easily!',
        sub_desc1_2: 'King Wallet meets all the needs of the Game Token community as well as other cryptocurrencies.',
        slide_title1: 'Fast transaction',
        slide_desc1: 'Built with blockchain technology that speeds up transactions to hundreds of transactions per second. This high performance will allow users to deposit and withdraw money quickly, with less waiting time, and more convenient and secure.',
        slide_title2: 'Multi-currency storage wallets',
        slide_desc2: 'King Wallet is built to be a scalable blockchain wallet to support game tokens and various cryptocurrencies in the market. Your property can be securely accessed anytime and anywhere.',
        slide_title3: 'Security and secure transactions',
        slide_desc3: 'King Wallet is equipped with a multi-tier security mechanism to ensure that all assets and transactions made are safe and stable. Users can use biometrics, PIN code, password and Google 2FA to enhance account security.',
        slide_title4: 'Real-time alerts',
        slide_desc4: 'Users receive real-time notifications when an account has a balance change, security change or important news. Turn this feature on to allow your device to always receive important news in a timely manner.',
        sub_title2: 'PROMINENT FEATURES',
        sub_desc2_1: 'We provide you with a premium next generation wallet service tailored to the needs of all Game users and the Crypto community. With King Wallet, users also enjoy many outstanding features such as Staking, Token Swap or a specialized Game Hub portal for gamers and developers.',
        list_title1: 'SUPPORT TOKEN GAME, TRC-20 AND ERC-20 TOKEN',
        list_desc1: 'King Wallet will support KDG storage, ERC-20 and TRC-20 Token Game. More tokens will be added in the future to allow users to diversify their storage portfolio and investment.',
        list_title2: 'GAME HUB',
        list_desc2: 'A specialized portal for the Game of Blockchain technology and payment solutions built and developed by Kingdom Game. GAME HUB provides users with a diversified type of Entertainment, providing Developers a specialized solution for payment and product distribution.',
        list_title3: 'PASSIVE INCOME',
        list_desc3: 'The first wallet supports Staking Game Tokens and many other digital currencies to receive profits. King Wallet allows users to increase the value and quantity with the cryptocurrencies they are holding in a convenient and secure way.',
        list_title4: 'EASY TO SWAP',
        list_desc4: 'King Wallet provides you with a quick and easy way of swapping Game Tokens, Tron Tokens as well as Ethereum Tokens. New features will be updated continuously and added more tokens in the future to serve the needs of users.',
    },
};

const WalletPageLanguage = {
    vi: {
        market: 'Giá thị trường',
        balance_information: 'thông tin số dư',
        history: 'LỊCH SỬ GIAO DỊCH',
        date: 'Thời gian',
        volume: 'Số lượng',
        type: 'Kiểu',
        deposit: 'Nạp',
        withdrawal: 'Rút',
        swap: 'Swap',
        stake: 'Stake',
        receive_money_stake: 'Nhận tiền staking',
        receive_profit_stake: 'Nhận lãi staking',
        nodata: 'Không có dữ liệu',
    },
    en: {
        market: 'MARKET',
        balance_information: 'BALANCE INFORMATION',
        history: 'HISTORY',
        date: 'Date',
        volume: 'Volume',
        type: 'Type',
        deposit: 'Deposit',
        withdrawal: 'Withdrawal',
        swap: 'Swap',
        stake: 'Stake',
        receive_money_stake: 'Receive stake',
        receive_profit_stake: 'Receive profit from stake',
        nodata: 'No data',
    },
};

const StakingHomePageLanguage = {
    vi: {
        desc1: 'mô hình kinh tế chia sẻ trong thế giới số',
        desc2: 'Với hệ sinh thái Staking của Kingdom Game, người dùng không chỉ nắm giữ Token đơn thuần mà còn được tận hưởng thu nhập thụ động. King Wallet cung cấp dịch vụ Staking cho các loại Game Token và nhiều đồng tiền kỹ thuật số khác để hạn chế sự mất giá của Token từ lạm phát và tăng lợi tức cho người dùng.',
        block1: 'Lợi tức cao lên tới <br/> 48%/năm',
        block2: 'Hỗ trợ Game Token, ERC-20 <br/> và TRC-20 Token',
        block3: 'Stake KDG nhận thêm <br/> Token Game khác miễn phí',
        total_stake: 'Tổng Stake (~USDT)',
        profit: 'Lợi Nhuận (~USDT)',
        balance: 'Số dư',
        operation: 'Hoạt động',
        join: 'Tham gia',
        history: 'Lịch sử',
    },
    en: {
        desc1: 'SHARING ECONOMICS IN THE DIGITAL WORLD',
        desc2: 'With the Kingdom Game ecosystem, users not only hold tokens but also enjoy additional passive income. King Wallet provides Staking program for Game Tokens and many other digital currencies to limit the devaluation of Token from inflation and increase profit for users.',
        block1: 'High income up to <br/> 48%/year',
        block2: 'Support Game Token, ERC-20 <br/> and TRC-20 Token',
        block3: 'Stake KDG gets another <br/> Token Game khác for free',
        total_stake: 'Total Stake (~USDT)',
        profit: 'Profit (~USDT)',
        balance: 'Balance',
        operation: 'Operation',
        join: 'Join',
        history: 'History',
    },
};

const StakingJoinPageLanguage = {
    vi: {
        success: 'Staking thành công',
        back: 'Trở về',
        profit_rate: 'Tỷ lệ lợi nhuận tham chiếu lên tới',
        stack_package: 'Các Gói Stake',
        choose_stack_package: 'Chọn một trong số các gói stake dưới đây:',
        days: 'Ngày',
        investment_amount: 'Số Lượng Đầu Tư',
        enter_investment_amount: 'Nhập số lượng bạn muốn đầu tư',
        available_balance: 'Số dư khả dụng:',
        enter_stake_amount: 'Nhập số lượng đầu tư:',
        minimum: 'Tối thiểu',
        maximum: 'Tối đa',
        daily_interest: 'Lợi nhuận ngày',
        total_principal_and_interest: 'Tổng gốc & lãi',
        confirm_information: 'Xác Nhận Thông Tin',
        please_read: 'Vui lòng đọc kỹ quy tắc trước khi tham gia',
        desc1: 'Lãi suất được trả lúc 8:00 hàng ngày (Tối thiểu 24 tiếng cho lần nhận lãi đầu tiên).',
        desc2: 'Kết thúc thời hạn stake, người dùng có thể rút khoản gốc đã stake trong vòng 05 ngày bằng cách nhấn xác nhận kết thúc stake. Khoản stake không được rút sẽ được tự động gia hạn.',
        agreement: 'Tôi đã đọc và hiểu rõ <a href="terms-of-service/1" target="_blank" className="link">cảnh báo rủi ro</a> trước khi tham gia',
        join_now: 'Tham gia ngay',
    },
    en: {
        success: 'Staking success',
        back: 'Back',
        profit_rate: 'Expected annual rate of return up to',
        stack_package: 'Lookup Options',
        choose_stack_package: 'Choose one of the Staking packages below:',
        days: 'Days',
        investment_amount: 'Investment Amount',
        enter_investment_amount: 'Enter the amount you want to invest',
        available_balance: 'Available balance:',
        enter_stake_amount: 'Enter amount to stake:',
        minimum: 'Minimum',
        maximum: 'Maximum',
        daily_interest: 'Daily interest',
        total_principal_and_interest: 'Total principal & interest',
        confirm_information: 'Confirm information',
        please_read: 'Please read the rules carefully before joining',
        desc1: 'Interest is paid at 8:00 every day (Min 24 hours for the first interest payment).',
        desc2: 'At the end of the Stake period, users can withdraw the Stake original within 05 days by pressing the button to confirm. Stakes that are not withdrawn will be automatically renewed.',
        agreement: 'I have read and understood the risk warning before participating <a href="terms-of-service/1" target="_blank" className="link">the risk warning</a> before participating',
        join_now: 'Join now',
    },
};

export const initialState = {
    language: 'en',
    listLanguage,
    HomePageLanguage,
    WalletPageLanguage,
    StakingHomePageLanguage,
    StakingJoinPageLanguage,
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
