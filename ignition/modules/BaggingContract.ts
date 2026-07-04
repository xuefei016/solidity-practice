import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("BaggingContractModule", (m) => {
    const baggingContract = m.contract("BeggingContract");
    return { baggingContract };
});
