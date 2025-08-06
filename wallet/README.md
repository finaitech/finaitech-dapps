# 🦊 Wallet UI Module – Fin AI Tech DApps

This module adds a floating wallet connect button to any page within the Fin AI Tech ecosystem, allowing users to connect MetaMask, verify network, and display balances of FAT and AMBR tokens.

---

## 📦 Included

- ✅ Floating wallet button (default position: left)
- ✅ MetaMask connection via Ethers.js
- ✅ Auto-detects Polygon Mainnet or Amoy Testnet
- ✅ Displays verified token balances (FAT & AMBR)
- ✅ Minimal setup – just drop into your HTML

---

## 🔧 Configuration

Modify the `CONFIG` object inside `walletconnect.js`:

```js
const CONFIG = {
  tokens: TOKEN_CONFIGS.mainnet, // ← Switch to 'testnet' for development
  position: "left",              // "left" or "right" (for UI placement)
  networkId: 137                 // 137 = Polygon Mainnet, 80002 = Amoy Testnet
};
```

You can toggle between environments by changing `CONFIG.tokens` to:

```js
TOKEN_CONFIGS.testnet
```

---

## 🪙 Token Metadata

### ✅ Mainnet Tokens
| Symbol | Address                                    | Decimals | Verified |
|--------|--------------------------------------------|----------|----------|
| FAT    | `0x398D9ae716ACb91122755d41B113b142E11Da60a` | 18       | ✅       |
| AMBR   | `0x1E56371313c2F70ac1db45C91301549C487d826c` | 18       | ✅       |

### 🧪 Testnet Tokens (Amoy)
| Symbol | Address                                    | Decimals | Verified |
|--------|--------------------------------------------|----------|----------|
| FAT    | `0xbeF2A93f1b43289Aa370825776eE618409d056FF` | 18       | ❌       |
| AMBR   | `0x89Fe8f25bfbB90C1EC7420F381B62340aDA13633` | 18       | ❌       |

---

## 🚀 How to Use

1. Add this to your HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.umd.min.js"></script>
<script src="../wallet/walletconnect.js"></script>
```

2. Tokens and network status will appear as soon as the user connects their wallet.

3. Optional: Adjust styles or extend to support WalletConnect v2.

---

## 🛡️ License

MIT – Use, modify, and extend for your own DApps.

---

Fin AI Tech – The Olympus of AI & Crypto 🏛️