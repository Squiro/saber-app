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
    uint8_t *image;
    uint8_t *cipherImage;
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
    
    // Read whole image into memory
    read_image("image.jpg", &image, &fileSize);

    // Make cipherImage be twice the size of the original image just in case that the ciphertext is bigger
    cipherImage = malloc(fileSize*2);
    // AES Encryption
    int cipherlen =  encrypt(image, fileSize, ss_a, iv, cipherImage);
    // Realloc cipherImage to free unused space
    cipherImage = realloc(cipherImage, cipherlen);
    // Write image into a file
    write_bytes("image-cipher.bin", cipherImage, cipherlen);
    // Saber KEM
    write_bytes("ciphertext.bin", ct, CRYPTO_CIPHERTEXTBYTES);
    return 0;
}

int main()
{
    bob();
    return 0;
}
