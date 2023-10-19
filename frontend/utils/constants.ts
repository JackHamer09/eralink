import { L2_ETH_TOKEN_ADDRESS } from "zksync-web3/build/src/utils";

import { getAddress } from "viem";

export const ETH_L1_ADDRESS = "0x0000000000000000000000000000000000000000";
export const ETH_L2_ADDRESS = getAddress(L2_ETH_TOKEN_ADDRESS);
