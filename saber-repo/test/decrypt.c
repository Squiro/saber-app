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

static int alice()
{
    uint8_t ct[CRYPTO_CIPHERTEXTBYTES];
    uint8_t sk[CRYPTO_SECRETKEYBYTES];
    uint8_t ss_b[CRYPTO_BYTES];
    uint8_t *file;
    uint8_t *cipherFile;
    long fileSize;
    time_t t;
   	
    // Intializes random number generator
   	srand((unsigned) time(&t));
    unsigned char *iv = (unsigned char *)"0123456789012345";
    
    read_bytes("secret.key", sk, CRYPTO_SECRETKEYBYTES);
    read_bytes("encapsulated.key", ct, CRYPTO_CIPHERTEXTBYTES);

    //Alice uses Bobs response to get her shared key
    //Key-Decapsulation call; input: secret key sk, c; output: shared-secret ss_b;
    crypto_kem_dec(ss_b, ct, sk);

    read_image("cihperfile.bin", &cipherFile, &fileSize);

    file = malloc(fileSize);
    int plainlen = decrypt(cipherFile, fileSize, ss_b, iv, file);
    file = realloc(file, plainlen);
    write_bytes("file-decrypted", file, plainlen);

    return 0;
}

int main()
{
    alice();
    return 0;
}
