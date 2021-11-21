#include "../api.h"
#include "../poly.h"
#include "../rng.h"
#include "../SABER_indcpa.h"
#include "../verify.h"
#include "../fips202.h"
#include "cpucycles.c"
#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>

static int test_pke()
{

    uint8_t pk[CRYPTO_PUBLICKEYBYTES];
    uint8_t sk[CRYPTO_SECRETKEYBYTES];
    uint8_t ct[CRYPTO_CIPHERTEXTBYTES];
    uint8_t ss_a[CRYPTO_BYTES], ss_b[CRYPTO_BYTES];

    unsigned char entropy_input[48];

    uint64_t i;

    for (i = 0; i < 48; i++)
        entropy_input[i] = i;
    randombytes_init(entropy_input, NULL, 256);

    //Generation of secret key sk and public key pk pair
    indcpa_kem_keypair(pk, sk);


    //Key-Encapsulation call; input: pk; output: ciphertext c, shared-secret ss_a;
    unsigned char kr[89]; // Will contain key, coins
    unsigned char buf[89] = "GHOST:   Oi! Mush! HAMLET:  Yer?  GHOST:   I was fucked!   (Exit GHOST) HAMLET:  O fuck.";
    unsigned char res[89];

    // randombytes(buf, 32);

    // sha3_256(buf, buf, 32); // BUF[0:31] <-- random message (will be used as the key for client) Note: hash doesnot release system RNG output

    // sha3_256(buf + 32, pk, SABER_INDCPA_PUBLICKEYBYTES); // BUF[32:63] <-- Hash(public key);  Multitarget countermeasure for coins + contributory KEM

    sha3_512(kr, buf, 89);               // kr[0:63] <-- Hash(buf[0:63]);
                                         // K^ <-- kr[0:31]
                                         // noiseseed (r) <-- kr[32:63];
    indcpa_kem_enc(buf, kr + 32, pk, ct); // buf[0:31] contains message; kr[32:63] contains randomness r;

    printf("Buf post-encryption: %s \n", buf);
    printf("%s \n", ct);
    indcpa_kem_dec(sk, ct, res); // buf[0:31] <-- message

    printf("%s \n", res);
    return 0;
}

int main()
{

    test_pke();
    return 0;
}
