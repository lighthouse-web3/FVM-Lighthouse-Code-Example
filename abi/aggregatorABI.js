module.exports = [
  {
    "inputs": [
      {
        "internalType": "int256",
        "name": "errorCode",
        "type": "int256"
      }
    ],
    "name": "ActorError",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ActorNotFound",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "FailToCallActor",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "INCORRECT_FILE_ID",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
      }
    ],
    "name": "InvalidCodec",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidResponseLength",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "NotEnoughBalance",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint64",
        "name": "_dealId",
        "type": "uint64"
      }
    ],
    "name": "CompleteAggregatorRequest",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "fileLink",
        "type": "bytes"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "fileId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "miner",
        "type": "bytes"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "num_copies",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "repair_threshold",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "renew_threshold",
        "type": "uint256"
      }
    ],
    "name": "DataInfo",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "fileId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "dealId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "cid",
        "type": "bytes"
      }
    ],
    "name": "DealCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "fileId",
        "type": "uint256"
      }
    ],
    "name": "DealNotCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "_cid",
        "type": "bytes"
      }
    ],
    "name": "SubmitAggregatorRequest",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint64",
        "name": "_dealId",
        "type": "uint64"
      }
    ],
    "name": "checkDealExpire",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_fileId",
        "type": "uint256"
      }
    ],
    "name": "checkMigration",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_fileId",
        "type": "uint256"
      },
      {
        "internalType": "uint64",
        "name": "_dealId",
        "type": "uint64"
      },
      {
        "components": [
          {
            "components": [
              {
                "internalType": "uint64",
                "name": "index",
                "type": "uint64"
              },
              {
                "internalType": "bytes32[]",
                "name": "path",
                "type": "bytes32[]"
              }
            ],
            "internalType": "struct ProofData",
            "name": "proofSubtree",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint64",
                "name": "index",
                "type": "uint64"
              },
              {
                "internalType": "bytes32[]",
                "name": "path",
                "type": "bytes32[]"
              }
            ],
            "internalType": "struct ProofData",
            "name": "proofIndex",
            "type": "tuple"
          }
        ],
        "internalType": "struct InclusionProof",
        "name": "_proof",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "bytes",
            "name": "commPc",
            "type": "bytes"
          },
          {
            "internalType": "uint64",
            "name": "sizePc",
            "type": "uint64"
          }
        ],
        "internalType": "struct InclusionVerifierData",
        "name": "_verifierData",
        "type": "tuple"
      }
    ],
    "name": "complete",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bytes",
            "name": "commPa",
            "type": "bytes"
          },
          {
            "internalType": "uint64",
            "name": "sizePa",
            "type": "uint64"
          }
        ],
        "internalType": "struct InclusionAuxData",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "commDs",
            "type": "bytes32"
          },
          {
            "internalType": "uint64",
            "name": "offset",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "size",
            "type": "uint64"
          },
          {
            "internalType": "bytes16",
            "name": "checksum",
            "type": "bytes16"
          }
        ],
        "internalType": "struct SegmentDesc",
        "name": "_sd",
        "type": "tuple"
      }
    ],
    "name": "computeChecksum",
    "outputs": [
      {
        "internalType": "bytes16",
        "name": "",
        "type": "bytes16"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "components": [
              {
                "internalType": "uint64",
                "name": "index",
                "type": "uint64"
              },
              {
                "internalType": "bytes32[]",
                "name": "path",
                "type": "bytes32[]"
              }
            ],
            "internalType": "struct ProofData",
            "name": "proofSubtree",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint64",
                "name": "index",
                "type": "uint64"
              },
              {
                "internalType": "bytes32[]",
                "name": "path",
                "type": "bytes32[]"
              }
            ],
            "internalType": "struct ProofData",
            "name": "proofIndex",
            "type": "tuple"
          }
        ],
        "internalType": "struct InclusionProof",
        "name": "_ip",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "bytes",
            "name": "commPc",
            "type": "bytes"
          },
          {
            "internalType": "uint64",
            "name": "sizePc",
            "type": "uint64"
          }
        ],
        "internalType": "struct InclusionVerifierData",
        "name": "_verifierData",
        "type": "tuple"
      }
    ],
    "name": "computeExpectedAuxData",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bytes",
            "name": "commPa",
            "type": "bytes"
          },
          {
            "internalType": "uint64",
            "name": "sizePa",
            "type": "uint64"
          }
        ],
        "internalType": "struct InclusionAuxData",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint64",
        "name": "_dealId",
        "type": "uint64"
      },
      {
        "components": [
          {
            "components": [
              {
                "internalType": "uint64",
                "name": "index",
                "type": "uint64"
              },
              {
                "internalType": "bytes32[]",
                "name": "path",
                "type": "bytes32[]"
              }
            ],
            "internalType": "struct ProofData",
            "name": "proofSubtree",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint64",
                "name": "index",
                "type": "uint64"
              },
              {
                "internalType": "bytes32[]",
                "name": "path",
                "type": "bytes32[]"
              }
            ],
            "internalType": "struct ProofData",
            "name": "proofIndex",
            "type": "tuple"
          }
        ],
        "internalType": "struct InclusionProof",
        "name": "_ip",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "bytes",
            "name": "commPc",
            "type": "bytes"
          },
          {
            "internalType": "uint64",
            "name": "sizePc",
            "type": "uint64"
          }
        ],
        "internalType": "struct InclusionVerifierData",
        "name": "_verifierData",
        "type": "tuple"
      }
    ],
    "name": "computeExpectedAuxDataWithDeal",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bytes",
            "name": "commPa",
            "type": "bytes"
          },
          {
            "internalType": "uint64",
            "name": "sizePa",
            "type": "uint64"
          }
        ],
        "internalType": "struct InclusionAuxData",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_left",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "_right",
        "type": "bytes32"
      }
    ],
    "name": "computeNode",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint64",
            "name": "index",
            "type": "uint64"
          },
          {
            "internalType": "bytes32[]",
            "name": "path",
            "type": "bytes32[]"
          }
        ],
        "internalType": "struct ProofData",
        "name": "_d",
        "type": "tuple"
      },
      {
        "internalType": "bytes32",
        "name": "_subtree",
        "type": "bytes32"
      }
    ],
    "name": "computeRoot",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "failedMigration",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "fileIdToDealDetails",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "dealId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "cid",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "fileIdToDetails",
    "outputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "fileLink",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "fileToDealIds",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_fileId",
        "type": "uint256"
      }
    ],
    "name": "getDealDetails",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "data_url",
        "type": "bytes"
      }
    ],
    "name": "getDeals",
    "outputs": [
      {
        "internalType": "uint64[]",
        "name": "",
        "type": "uint64[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_fileId",
        "type": "uint256"
      }
    ],
    "name": "getFileDetails",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getLatestId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint64",
        "name": "_dealId",
        "type": "uint64"
      }
    ],
    "name": "getTimeToDealExpire",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_left",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "_right",
        "type": "bytes32"
      }
    ],
    "name": "hashNode",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "bytes32",
            "name": "commDs",
            "type": "bytes32"
          },
          {
            "internalType": "uint64",
            "name": "offset",
            "type": "uint64"
          },
          {
            "internalType": "uint64",
            "name": "size",
            "type": "uint64"
          },
          {
            "internalType": "bytes16",
            "name": "checksum",
            "type": "bytes16"
          }
        ],
        "internalType": "struct SegmentDesc",
        "name": "_sd",
        "type": "tuple"
      }
    ],
    "name": "serialize",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_fileId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_dealId",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "_isMigrated",
        "type": "bool"
      },
      {
        "internalType": "bytes",
        "name": "_cid",
        "type": "bytes"
      }
    ],
    "name": "setDealDetails",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "data_url",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "miner",
        "type": "bytes"
      },
      {
        "internalType": "uint256",
        "name": "num_copies",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "repair_threshold",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "renew_threshold",
        "type": "uint256"
      }
    ],
    "name": "submit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "truncatedHash",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint64",
            "name": "index",
            "type": "uint64"
          },
          {
            "internalType": "bytes32[]",
            "name": "path",
            "type": "bytes32[]"
          }
        ],
        "internalType": "struct ProofData",
        "name": "_proof",
        "type": "tuple"
      },
      {
        "internalType": "bytes32",
        "name": "_root",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "_leaf",
        "type": "bytes32"
      }
    ],
    "name": "verify",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  }
]
