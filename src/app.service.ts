import { Injectable } from '@nestjs/common';
import * as BigchainDB from 'bigchaindb-driver';
import * as bip39 from 'bip39';
import * as base58 from 'bs58';
import * as nacl from 'tweetnacl-ts';

const API_PATH = 'https://test.bigchaindb.com/api/v1/';
@Injectable()
export class AppService {
  conn = new BigchainDB.Connection(API_PATH);
  seed = bip39.mnemonicToSeed('seedPhrase').slice(0, 32);
  privateKey: any;
  publicKey: any;
  alice: any;
  constructor() {
    const keyPair = nacl.sign_keyPair_fromSeed(this.seed); // : nacl.sign.keyPair();
    this.publicKey = base58.encode(Buffer.from(keyPair.publicKey));
    // tweetnacl's generated secret key is the secret key + public key (resulting in a 64-byte buffer)
    this.privateKey = base58.encode(
      Buffer.from(keyPair.secretKey.slice(0, 32)),
    );
  }
  root(): string {
    return (
      'public key: ' +
      this.publicKey +
      '<br/>' +
      ' private key ' +
      this.privateKey
    );
  }

  makeTranscationAndCommit(data: any, metaInfo?: any): Promise<any> {
    const txCreatePaint = BigchainDB.Transaction.makeCreateTransaction(
      // Asset field
      {
        data,
      },
      // Metadata field, contains information about the transaction itself
      // (can be `null` if not needed)
      metaInfo,
      // Output. For this case we create a simple Ed25519 condition
      [
        BigchainDB.Transaction.makeOutput(
          BigchainDB.Transaction.makeEd25519Condition(this.publicKey),
        ),
      ],
      // Issuers
      this.publicKey,
    );

    return this.signTransactionAndCommit(txCreatePaint);
  }

  signTransactionAndCommit(data: any): Promise<any> {
    const txSigned = BigchainDB.Transaction.signTransaction(
      data,
      this.privateKey,
    );
    return this.conn.postTransactionCommit(txSigned);
  }
}
