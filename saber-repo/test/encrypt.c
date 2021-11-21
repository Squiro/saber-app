#include "../api.h"
#include "../poly.h"
#include "../rng.h"
#include "../SABER_indcpa.h"
#include "../verify.h"
#include "cpucycles.c"
#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>
#include "../file.h"
#include "../aes-encryption.h"
#include <time.h>

static int bob()
{    
    uint8_t pk[CRYPTO_PUBLICKEYBYTES];
    uint8_t ct[CRYPTO_CIPHERTEXTBYTES];
    uint8_t ss_a[CRYPTO_BYTES];
    uint8_t *file;
    uint8_t *cipherFile;
    long fileSize;

    time_t t;

   	// Intializes random number generator
   	srand((unsigned) time(&t));

    /* A 128 bit IV */
    // Note: The IV does not need to be kept secret.
    unsigned char *iv = (unsigned char *)"0123456789012345";
    
    read_bytes("public.key", pk, CRYPTO_PUBLICKEYBYTES);

    //Bob derives a secret key and creates a response
    //Key-Encapsulation call; input: public key pk; output: ciphertext c, shared-secret ss_a;
    crypto_kem_enc(ct, ss_a, pk);
    
    // Read whole file into memory
    read_image("filetoencrypt", &file, &fileSize);

    // Make cipherFile be twice the size of the original image just in case that the ciphertext is bigger
    cipherFile = malloc(fileSize*2);
    // AES Encryption
    int cipherlen = encrypt(file, fileSize, ss_a, iv, cipherFile);
    // Realloc cipherFile to free unused space
    cipherFile = realloc(cipherFile, cipherlen);
    // Write it down to disk
    write_bytes("cipher-file.bin", cipherFile, cipherlen);
    // Saber KEM
    write_bytes("encapsulated.key", ct, CRYPTO_CIPHERTEXTBYTES);
    return 0;
}

int main()
{
    bob();
    return 0;
}
