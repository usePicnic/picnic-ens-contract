# Coinbase Offchain Resolver

```
Client                             Offchain Resolver Contract          Gateway
  |                    resolve(dnsname, lookup) |                         |
  |-------------------------------------------->|                         |
  |                                             |                         |
  | error: OffchainLookup(addr, url, data, ...) |                         |
  |<--------------------------------------------|                         |
  |                                             |                         |
  |                                             |      GET /{addr}/{data} |
  |---------------------------------------------------------------------->|
  |                                             |                         |
  | response: (result, expires, sig)            |                         |
  |<----------------------------------------------------------------------|
  |                                             |                         |
  |            resolveWithProof(response, data) |                         |
  |-------------------------------------------->|                         |
  |                                             |                         |
  | result (or an error if invalid)             |                         |
  |<--------------------------------------------|                         |
  |                                             |                         |
```

Please refer to the tests for `.resolve` and `.resolveWithProof` in
`CoinbaseResolver.test.ts` to learn more about how this works.

## Requirements

- Node.js v16
- Yarn v1.22.x

## Usage

### Install dependencies

```sh
$ yarn install
```

### Compile

Compile the smart contracts with Hardhat:

```sh
$ yarn compile
```

### TypeChain

Compile the smart contracts and generate TypeChain artifacts:

```sh
$ yarn typechain
```

### Format

```sh
$ yarn prettier
```

### Lint

```sh
$ yarn lint
```

### Test

```sh
$ yarn test
```

### Test Coverage

Ensure test coverage is at 100%

```sh
$ yarn coverage

$ open coverage/index.html
```

### Deployment

```sh
$ yarn deploy --network <NETWORK>
```

### Addresses

Contract Addresses

| Contract | Address | | --- | --- | | Network |
0xFf00e326f4EF31e69B96896c09EC67d65ae41946 | | 11155111 |
