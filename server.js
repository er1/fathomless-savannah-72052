#!/usr/bin/env node

const ED25519_KEY_PREFIX = 'MC4CAQAwBQYDK2VwBCIEIA==';

const crypto = require('crypto');
const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.disable('x-powered-by');
app.use(morgan('common'));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const SIGN_KEY = process.env.SIGN_KEY || 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

// create key objects
const prefixPart = Buffer.from(ED25519_KEY_PREFIX, 'base64');
const keyPart = Buffer.from(SIGN_KEY, 'base64');
const privKeyBuffer = Buffer.concat([prefixPart, keyPart]);
const privKey = crypto.createPrivateKey({
  key: privKeyBuffer,
  format: 'der',
  type: 'pkcs8',
});
// const pubKey = crypto.createPublicKey(privKey);

function fib(n) {
  let a = n.constructor(0);
  let b = n.constructor(1);
  while (n-- > 0) {
    [a, b] = [b, a + b];
  }
  return a;
}

app.get('/fib/:n', (req, res) => {
  try {
    const n = BigInt(req.params.n);
    if (n > 65537) {
      res.status(400).send();
      return;
    }
    const result = String(fib(n));

    const data = Buffer.from(result, 'utf8');
    const signature = crypto.sign(null, data, privKey);
	res.append('X-Result-Signature', signature.toString('base64'));

    res.json({
      n: String(n),
      result: result,
    });
  } catch (ex) {
    res.status(500).send();
  }
});

app.listen(process.env.PORT || 8080);
