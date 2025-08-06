// WalletConnect Floating Button (FAT & AMBR compatible)

(function() {
  const TOKEN_CONFIGS = {
    mainnet: [
      { symbol: "FAT", address: "0x398D9ae716ACb91122755d41B113b142E11Da60a", decimals: 18, verified: true },
      { symbol: "AMBR", address: "0x1E56371313c2F70ac1db45C91301549C487d826c", decimals: 18, verified: true }
    ],
    testnet: [
      { symbol: "FAT", address: "0xbeF2A93f1b43289Aa370825776eE618409d056FF", decimals: 18, verified: false },
      { symbol: "AMBR", address: "0x89Fe8f25bfbB90C1EC7420F381B62340aDA13633", decimals: 18, verified: false }
    ]
  };

  const CONFIG = {
    tokens: TOKEN_CONFIGS.mainnet,
    position: "left",
    networkId: 137
  };

  function injectWalletUI() {
    if (document.getElementById("wallet-box")) return;
    const positionStyle = CONFIG.position === "right" ? "right:10px;left:auto;" : "left:10px;right:auto;";
    const box = document.createElement("div");
    box.id = "wallet-box";
    box.style.cssText = `
      background:#000;
      border:2px solid gold;
      color:gold;
      font-family:monospace;
      padding:12px;
      border-radius:12px;
      max-width:250px;
      text-align:center;
      box-shadow:0 0 12px gold;
      position:fixed;
      top:10px;
      ${positionStyle}
      z-index:9999;
    `;

    const tokenBalancesHTML = CONFIG.tokens.map(token =>
      `<div><strong>${token.symbol}:</strong> 
        <span id="${token.symbol.toLowerCase()}Balance">-</span>
        ${token.verified ? '✅' : '⚠️'}
      </div>`
    ).join('');

    box.innerHTML = `
      <button id="connectWallet" style="
        background:gold;
        color:black;
        font-weight:bold;
        padding:8px 16px;
        border:none;
        border-radius:8px;
        cursor:pointer;
        width:100%;
      ">🔗 Connect Wallet</button>
      <div id="walletInfo" style="margin-top:10px;display:none;">
        <div><strong>🦊:</strong> <span id="walletAddress"></span></div>
        ${tokenBalancesHTML}
        <div id="networkStatus" style="margin-top:8px;font-size:0.8em;"></div>
      </div>`;
    document.body.appendChild(box);
    document.getElementById("connectWallet").addEventListener("click", connectWallet);
  }

  async function connectWallet() {
    try {
      if (!window.ethereum) throw new Error("MetaMask not installed");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();

      if (network.chainId !== CONFIG.networkId) {
        const networkName = CONFIG.networkId === 137 ? 'Polygon Mainnet' : 'Amoy Testnet';
        document.getElementById("networkStatus").innerHTML = 
          `<span style="color:red;">⚠️ Switch to ${networkName}</span>`;
        throw new Error(`Please connect to ${networkName}`);
      } else {
        document.getElementById("networkStatus").innerHTML = 
          `<span style="color:lightgreen;">✓ Correct Network</span>`;
      }

      const address = await provider.getSigner().getAddress();
      document.getElementById("walletAddress").textContent = `${address.slice(0, 6)}...${address.slice(-4)}`;
      document.getElementById("walletInfo").style.display = "block";

      await Promise.all(CONFIG.tokens.map(async (token) => {
        const contract = new ethers.Contract(token.address, ["function balanceOf(address) view returns (uint256)"], provider);
        const balance = await contract.balanceOf(address);
        document.getElementById(`${token.symbol.toLowerCase()}Balance`).textContent = 
          parseFloat(ethers.utils.formatUnits(balance, token.decimals)).toFixed(2);
      }));
    } catch (err) {
      alert(`⚠️ Error: ${err.message}`);
    }
  }

  let tries = 0;
  const interval = setInterval(() => {
    if (typeof ethers !== 'undefined' && document.body) {
      injectWalletUI();
      clearInterval(interval);
    } else if (++tries >= 15) {
      clearInterval(interval);
    }
  }, 400);
})();
