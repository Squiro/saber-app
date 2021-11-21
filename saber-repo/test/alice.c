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
#include <time.h>

static int alice_keypair()
{
    uint8_t pk[CRYPTO_PUBLICKEYBYTES];
    uint8_t sk[CRYPTO_SECRETKEYBYTES];

    unsigned char entropy_input[48];

    uint64_t i;
    time_t t;
   	// Intializes random number generator
   	srand((unsigned) time(&t));

    for (i = 0; i < 48; i++)
    {
        //entropy_input[i] = i;
        entropy_input[i] = rand()%256;
    }

    randombytes_init(entropy_input, NULL, 256);
    //Alice generates a public key
    //Generation of secret key sk and public key pk pair
    crypto_kem_keypair(pk, sk);

    write_bytes("public.key", pk, CRYPTO_PUBLICKEYBYTES);

    write_bytes("secret.key", sk, CRYPTO_SECRETKEYBYTES);

    return 0;
}

int main()
{
    alice_keypair();
    return 0;
}
