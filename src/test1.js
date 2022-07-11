const {ethers} = require("ethers")
const contractabi = require("./contractabi.json")
const config = require("./config.json")

console.log("contract status %s", contractabi.status)


wallet = ethers.Wallet.fromMnemonic(config["my_mnemonic"])
wallet = wallet.connect(provider)

console.log("connected my wallet!")

contractAddr = "0x715696b3AEA58920E1F5A4cF161e843405D2d384"

mycontract = new ethers.Contract(contractAddr, contractabi.result, wallet)

mycontract.name().then((x) => {console.log("contract name %s", x)

	transfer_amount = config["value"].toString()
	converted_amount = ethers.utils.parseUnits(transfer_amount, "ether")

	destination_addr = config["to_address"]

	mycontract.transfer(destination_addr, converted_amount).then(() => {
		console.log("transfer success")
	})
})
