export interface Keypair {
    public: ArrayBuffer;
    secret: ArrayBuffer;
}

export interface EncryptedResults {
    cipherfile: ArrayBuffer;
    encapsulatedKey: ArrayBuffer;
}