# solidity-practice

A Hardhat 3 practice project of Solidity contracts covering ETH donations, on-chain voting, and a few classic algorithm exercises (string reversal, Roman numeral conversion, binary search, and merging sorted arrays).

The repo started from the Hardhat 3 (`mocha` + `ethers`) template. The contracts below are the actual coursework; leftover sample files from the template are called out separately.

## Contracts

| Contract | What it does | Key functions |
| --- | --- | --- |
| `BeggingContract` | Accepts ETH donations, records each sender’s total, and lets the owner withdraw the contract balance. Donations are recorded from `donate()`, as well as from plain ETH transfers (`receive` / `fallback`). | `donate()` (payable), `withdraw()` (`onlyOwner`), `getDonation(address)`, `owner()`, `contributions(address)` |
| `Voting` | One-address-one-vote balloting. A voter cannot vote for the zero address, for themselves, or a second time. Anyone can reset the tally. | `vote(address)`, `getVotes(address)`, `resetVotes()`, `candidateVotes(address)`, `hasVoted(address)` |
| `ReverseString` | Reverses a string at the byte level and returns the result. | `reverse(string)` |
| `IntToRoman` | Converts a non-negative integer to a Roman numeral using place-value tables for thousands, hundreds, tens, and ones (standard range 0–3999). | `intToRoman(uint256)` |
| `RomanToInt` | Converts a Roman numeral string to an integer, scanning right to left and subtracting a smaller value that precedes a larger one. Invalid characters revert. | `romanToInt(string)` |
| `BinarySearch` | Binary-searches a memory array of `uint256` values and returns the matching index, or `-1` if the target is missing. The input is expected to be sorted. | `binarySearch(uint256[] arr, uint256 target)` |
| `MergeSortedArray` | Merges two sorted `uint256` arrays into one sorted array. | `mergeSortedArrays(uint256[] arr1, uint256[] arr2)` |

`Counter.sol` (plus `contracts/Counter.t.sol`) is the leftover Hardhat sample, not part of the practice set.

## Tests

Mocha tests in `test/` cover:

- **`Voting`** — rejects a self-vote and a second vote from the same voter; increments the candidate’s count on a valid vote; `resetVotes()` returns the count to zero.
- **`ReverseString`** — `reverse("hello")` returns `"olleh"`.
- **`BeggingContract`** — live Sepolia checks against a deployed contract: call `donate()`, read a contributor’s total with `getDonation()`, let the owner `withdraw()`, and confirm that a direct ETH transfer is recorded as a donation. These tests read `BEGGING_CONTRACT_ADDRESS` and connect to the `sepolia` network from `hardhat.config.ts`.
- **`Counter`** (`test/Counter.ts` and `contracts/Counter.t.sol`) — Hardhat / Foundry sample tests for the template `Counter` contract.

There are no dedicated Mocha tests yet for `IntToRoman`, `RomanToInt`, `BinarySearch`, or `MergeSortedArray`.

Install dependencies, then run the suite:

```shell
npm install
npx hardhat test
```

`package.json` also exposes `npm test` (same command) and `npm run compile`. To run only Mocha or only Solidity tests:

```shell
npx hardhat test mocha
npx hardhat test solidity
```

The Sepolia file (`test/BeggingContract.sepolia.ts`) needs a funded Sepolia setup. Configure the environment variables below, then run:

```shell
npx hardhat test test/BeggingContract.sepolia.ts
```

Note: that file currently marks one case with `it.only` (the read-donation check). Mocha will run only that case in the file until the `.only` is removed.

## Deployment

`BeggingContract` is deployed with Hardhat Ignition. The module file is `ignition/modules/BaggingContract.ts` (the filename keeps the original typo; the contract it deploys is `BeggingContract`).

Local (in-process) deploy:

```shell
npx hardhat ignition deploy ignition/modules/BaggingContract.ts
```

Sepolia deploy — `hardhat.config.ts` only registers the `sepolia` network when `SEPOLIA_RPC_URL`, `SEPOLIA_PRIVATE_KEY`, and `CONTRIBUTOR_PRIVATE_KEY` are set:

```shell
npx hardhat ignition deploy --network sepolia ignition/modules/BaggingContract.ts
```

### Sepolia deployment

`BeggingContract` is already deployed on Sepolia (chain ID 11155111):

| Contract | Address |
| --- | --- |
| `BeggingContract` | [`0x9F39fB658420b1D1dAC4911F60179E1fCF3136a6`](https://sepolia.etherscan.io/address/0x9F39fB658420b1D1dAC4911F60179E1fCF3136a6) |

Source: `ignition/deployments/chain-11155111/deployed_addresses.json` (`BaggingContractModule#BeggingContract`).

`ignition/modules/Counter.ts` is the Hardhat sample module for `Counter`, not used for the practice contracts.

## Environment variables

Used by `hardhat.config.ts` and the Sepolia tests. Set them in a local `.env` (gitignored). Names only — do not commit values:

| Variable | Used for |
| --- | --- |
| `SEPOLIA_RPC_URL` | Sepolia HTTP RPC endpoint |
| `SEPOLIA_PRIVATE_KEY` | Deployer / owner account on Sepolia |
| `CONTRIBUTOR_PRIVATE_KEY` | Second signer used as the donor in Sepolia tests |
| `BEGGING_CONTRACT_ADDRESS` | Address of the deployed `BeggingContract` for the live tests |

## Tech stack

- Solidity `0.8.28`
- [Hardhat 3](https://hardhat.org/) with `@nomicfoundation/hardhat-toolbox-mocha-ethers`
- TypeScript, mocha, chai, and ethers v6
- Hardhat Ignition for deployment
- `dotenv` for local environment variables
- `forge-std` (only used by the sample Foundry-style `Counter` test)

## Getting started

```shell
git clone https://github.com/xuefei016/solidity-practice.git
cd solidity-practice
npm install
npx hardhat compile
npx hardhat test
```

## Project structure

```
contracts/                 # Solidity contracts
  BeggingContract.sol
  Voting.sol
  ReverseString.sol
  IntToRoman.sol
  RomanToInt.sol
  BinarySearch.sol
  MergeSortedArray.sol
  Counter.sol              # Hardhat sample
  Counter.t.sol            # Hardhat / Foundry sample test
test/                      # Mocha + ethers tests
  Voting.ts
  ReverseString.ts
  BeggingContract.sepolia.ts
  Counter.ts               # Hardhat sample
ignition/
  modules/BaggingContract.ts   # deploys BeggingContract
  modules/Counter.ts           # Hardhat sample
  deployments/chain-11155111/  # Sepolia deployment artifacts
scripts/send-op-tx.ts      # Hardhat sample (simulated OP chain)
hardhat.config.ts
package.json
```
