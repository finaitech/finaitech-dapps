const FATOracleGateAddress = "0xd5503FF132056e5dc57351616BaDCbaFe1baD7be";
const USDC_ADDRESS = "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359";
const FAT_ABI = [
  "function buyWithMATIC() payable",
  "function buyWithToken(address token, uint256 amount)"
];

let provider;
let signer;
let contract;

async function connectWallet() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    const address = await signer.getAddress();
    document.getElementById("wallet").innerText = "Connected: " + address;
    contract = new ethers.Contract(FATOracleGateAddress, FAT_ABI, signer);
  } else {
    alert("Please install MetaMask.");
  }
}

async function buyFAT() {
  const token = document.getElementById("token").value;
  const amount = document.getElementById("amount").value;
  const status = document.getElementById("status");
  status.innerText = "Processing...";

  try {
    if (token === "matic") {
      const tx = await contract.buyWithMATIC({ value: ethers.utils.parseEther(amount) });
      await tx.wait();
      status.innerText = "✅ Transaction successful!";
    } else if (token === "usdc") {
      const usdc = new ethers.Contract(USDC_ADDRESS, ["function approve(address, uint256) public returns (bool)"], signer);
      const usdcAmount = ethers.utils.parseUnits(amount, 6); // USDC has 6 decimals
      const approvalTx = await usdc.approve(FATOracleGateAddress, usdcAmount);
      await approvalTx.wait();

      const tx = await contract.buyWithToken(USDC_ADDRESS, usdcAmount);
      await tx.wait();
      status.innerText = "✅ Transaction successful!";
    }
  } catch (err) {
    console.error(err);
    status.innerText = "❌ Transaction failed.";
  }
}
