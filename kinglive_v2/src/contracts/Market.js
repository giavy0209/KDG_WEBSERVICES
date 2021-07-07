export const _listNFTResult = {
  blockHash: '0xe40ef41a0b3ec69e048a85406b720583d0f437da69cc9e9765f24d5b3bdcd474',
  blockNumber: 10381343,
  contractAddress: null,
  cumulativeGasUsed: 7013283,
  from: '0xa83f993153f9c26a40adad46caae63400f2276f9',
  gasUsed: 273345,
  logsBloom:
    '0x00000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000001000000000000000000000000000000000000400000000000000000000002000000000000000000000000000000000001000000000000000000080002400000000000000000000080000000000000000000000000000000000000000000000800000000000000000080000000000001000000000000000000000000020000080000000000000000008000000000000000000000000000000000000000000000000000000000200000000000000080000000000',
  status: true,
  to: '0x714e125de461763d3efe99f2414890eb4b052da6',
  transactionHash: '0x6d817902cb14013c2cc091092c2e28d39d5ee5947672ca3de75c6393ef251e53',
  transactionIndex: 3,
  type: '0x0',
  events: {
    0: {
      address: '0x7e1d861F3bec6f6defeB49121B8Bd82f217794ab',
      blockNumber: 10381343,
      transactionHash: '0x6d817902cb14013c2cc091092c2e28d39d5ee5947672ca3de75c6393ef251e53',
      transactionIndex: 3,
      blockHash: '0xe40ef41a0b3ec69e048a85406b720583d0f437da69cc9e9765f24d5b3bdcd474',
      logIndex: 2,
      removed: false,
      id: 'log_cf357852',
      returnValues: {},
      signature: null,
      raw: {
        data: '0x00000000000000000000000000000000000000000000000000000000000000050000000000000000000000000000000000000000000000000000000000000001',
        topics: [
          '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
          '0x000000000000000000000000714e125de461763d3efe99f2414890eb4b052da6',
          '0x000000000000000000000000a83f993153f9c26a40adad46caae63400f2276f9',
          '0x000000000000000000000000714e125de461763d3efe99f2414890eb4b052da6',
        ],
      },
    },
    List: {
      address: '0x714e125De461763D3Efe99F2414890Eb4B052dA6',
      blockNumber: 10381343,
      transactionHash: '0x6d817902cb14013c2cc091092c2e28d39d5ee5947672ca3de75c6393ef251e53',
      transactionIndex: 3,
      blockHash: '0xe40ef41a0b3ec69e048a85406b720583d0f437da69cc9e9765f24d5b3bdcd474',
      logIndex: 3,
      removed: false,
      id: 'log_913f20ba',
      returnValues: {
        0: '0',
        1: '0xA83F993153F9C26a40adAd46cAAE63400F2276f9',
        2: '0x7e1d861F3bec6f6defeB49121B8Bd82f217794ab',
        3: '5',
        4: '1',
        5: '1',
        6: '10000',
        7: '0xB73b2e0C455F125Bbec80f41a864A33fC67aaDa0',
        8: '1000000',
        _orderId: '0',
        _owner: '0xA83F993153F9C26a40adAd46cAAE63400F2276f9',
        _tokenAddress: '0x7e1d861F3bec6f6defeB49121B8Bd82f217794ab',
        tokenId: '5',
        _quantity: '1',
        _mask: '1',
        _price: '10000',
        _paymentToken: '0xB73b2e0C455F125Bbec80f41a864A33fC67aaDa0',
        _expiration: '1000000',
      },
      event: 'List',
      signature: '0x18c768c9ab72aed1a8131b2c7e54d3e8666b16339f76ab71d05d498ad37eca43',
      raw: {
        data: '0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a83f993153f9c26a40adad46caae63400f2276f90000000000000000000000007e1d861f3bec6f6defeb49121b8bd82f217794ab0000000000000000000000000000000000000000000000000000000000000005000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000002710000000000000000000000000b73b2e0c455f125bbec80f41a864a33fc67aada000000000000000000000000000000000000000000000000000000000000f4240',
        topics: ['0x18c768c9ab72aed1a8131b2c7e54d3e8666b16339f76ab71d05d498ad37eca43'],
      },
    },
  },
}

export const addressMarket = '0x714e125De461763D3Efe99F2414890Eb4B052dA6'

export const ABIMarket = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_bidOrderId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: '_result',
        type: 'bool',
      },
    ],
    name: 'AcceptBid',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_itemId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_toContract',
        type: 'address',
      },
    ],
    name: 'AdminMigrateData',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_bidId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_itemId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_quantity',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_bidToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_bidAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_expiration',
        type: 'uint256',
      },
    ],
    name: 'Bid',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_itemId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_quantity',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_paymentToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_paymentAmount',
        type: 'uint256',
      },
    ],
    name: 'Buy',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_itemId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_receiver',
        type: 'address',
      },
    ],
    name: 'CancelListed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'beneficiary',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'withdrawAmount',
        type: 'uint256',
      },
    ],
    name: 'FailedWithdraw',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_orderId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_tokenAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_quantity',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_mask',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_price',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_paymentToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_expiration',
        type: 'uint256',
      },
    ],
    name: 'List',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Paused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Unpaused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_bidId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_quantity',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_bidToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_bidAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_expiration',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_status',
        type: 'uint256',
      },
    ],
    name: 'UpdateBid',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_itemId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_mask',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_price',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_paymentToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_expiration',
        type: 'uint256',
      },
    ],
    name: 'UpdateItem',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'beneficiary',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'withdrawAmount',
        type: 'uint256',
      },
    ],
    name: 'Withdraw',
    type: 'event',
  },
  {
    inputs: [],
    name: 'ZOOM_FEE',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ZOOM_KING_LIVE',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ZOOM_USDT',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_bidOrderId',
        type: 'uint256',
      },
    ],
    name: 'acceptBid',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_itemId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_receiver',
        type: 'address',
      },
    ],
    name: 'adminCancelList',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_itemId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_tokenAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_paymentToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_quantity',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_expired',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_status',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_minBid',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_price',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_mask',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_lastSalePrice',
        type: 'uint256',
      },
    ],
    name: 'adminMigrateData',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'artistLoyaltyFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_itemId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_quantity',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_bidToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_bidAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_expiration',
        type: 'uint256',
      },
    ],
    name: 'bid',
    outputs: [
      {
        internalType: 'uint256',
        name: '_idx',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'bidOrders',
    outputs: [
      {
        internalType: 'address',
        name: 'fromAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'bidToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'bidAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'itemId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'expired',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'status',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_itemId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_quantity',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_paymentToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_paymentAmount',
        type: 'uint256',
      },
    ],
    name: 'buy',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_itemId',
        type: 'uint256',
      },
    ],
    name: 'cancelListed',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'check',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'farmingContract',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'firstSellFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'items',
    outputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'paymentToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'expired',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'status',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'minBid',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'mask',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'kingLiveExchangeContract',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'lastSalePrice',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_tokenAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_quantity',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_mask',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_price',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_paymentToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_expiration',
        type: 'uint256',
      },
    ],
    name: 'list',
    outputs: [
      {
        internalType: 'uint256',
        name: '_idx',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'marketFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'numberBidOrders',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'numberItems',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'values',
        type: 'uint256[]',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'onERC1155Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'referralContract',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'referralFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_farmingContract',
        type: 'address',
      },
    ],
    name: 'setFarmingContract',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_kingLiveExchangeContract',
        type: 'address',
      },
    ],
    name: 'setKingLiveExchangeContract',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_referralContract',
        type: 'address',
      },
    ],
    name: 'setReferralContract',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_marketFee',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_firstSellFee',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_artistLoyaltyFee',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_referralFee',
        type: 'uint256',
      },
    ],
    name: 'setSystemFee',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_status',
        type: 'uint256',
      },
    ],
    name: 'setWhiteListPayableToken',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unPause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_bidId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_quantity',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_bidToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_bidAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_expiration',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_status',
        type: 'uint256',
      },
    ],
    name: 'updateBid',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_itemId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_mask',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_price',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_paymentToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_expiration',
        type: 'uint256',
      },
    ],
    name: 'updateItem',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'whitelistPayableToken',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address payable',
        name: '_beneficiary',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_tokenAddress',
        type: 'address',
      },
    ],
    name: 'withdrawFunds',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
